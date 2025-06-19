// Sistema de Ranking Avançado com Múltiplos Fatores
export interface UserTestResult {
  id: string
  userId: string
  score: number
  timeSpent: number // em segundos
  completedAt: Date
  questionsCorrect: number
  totalQuestions: number
  testType: string
  difficulty: "Básico" | "Intermediário" | "Avançado" | "Expert"
  ipAddress: string
  userAgent: string
  sessionId: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  birthDate: Date
  education: "Fundamental" | "Médio" | "Superior" | "Pós-graduação" | "Mestrado" | "Doutorado"
  country: string
  region: string
  isVerified: boolean
  verificationLevel: "Basic" | "Email" | "Phone" | "Document" | "Premium"
  joinedAt: Date
  lastActiveAt: Date
}

export interface RankingScore {
  userId: string
  baseScore: number
  timeBonus: number
  consistencyBonus: number
  participationBonus: number
  verificationBonus: number
  fraudPenalty: number
  finalScore: number
  rank: number
  category: string
  ageGroup: string
  educationLevel: string
  region: string
  badges: string[]
  achievements: Achievement[]
  totalPoints: number
  monthlyPoints: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  pointsAwarded: number
  unlockedAt: Date
}

export class RankingAlgorithm {
  // Pesos para diferentes fatores do ranking
  private static readonly WEIGHTS = {
    BASE_SCORE: 0.4,
    TIME_EFFICIENCY: 0.2,
    CONSISTENCY: 0.15,
    PARTICIPATION: 0.1,
    VERIFICATION: 0.1,
    FRAUD_DETECTION: 0.05,
  }

  // Calcular score final do usuário
  static calculateRankingScore(
    userProfile: UserProfile,
    testResults: UserTestResult[],
    timeframe: "monthly" | "quarterly" | "yearly" = "monthly",
  ): RankingScore {
    const filteredResults = this.filterResultsByTimeframe(testResults, timeframe)

    if (filteredResults.length < 5) {
      throw new Error("Usuário não atende ao critério mínimo de 5 testes")
    }

    const baseScore = this.calculateBaseScore(filteredResults)
    const timeBonus = this.calculateTimeBonus(filteredResults)
    const consistencyBonus = this.calculateConsistencyBonus(filteredResults)
    const participationBonus = this.calculateParticipationBonus(filteredResults, timeframe)
    const verificationBonus = this.calculateVerificationBonus(userProfile)
    const fraudPenalty = this.detectAndPenalizeFraud(filteredResults, userProfile)

    const finalScore = Math.max(
      0,
      baseScore * this.WEIGHTS.BASE_SCORE +
        timeBonus * this.WEIGHTS.TIME_EFFICIENCY +
        consistencyBonus * this.WEIGHTS.CONSISTENCY +
        participationBonus * this.WEIGHTS.PARTICIPATION +
        verificationBonus * this.WEIGHTS.VERIFICATION -
        fraudPenalty * this.WEIGHTS.FRAUD_DETECTION,
    )

    const category = this.determineCategory(userProfile)
    const ageGroup = this.calculateAgeGroup(userProfile.birthDate)
    const badges = this.calculateBadges(filteredResults, userProfile)
    const achievements = this.calculateAchievements(filteredResults, userProfile)

    return {
      userId: userProfile.id,
      baseScore,
      timeBonus,
      consistencyBonus,
      participationBonus,
      verificationBonus,
      fraudPenalty,
      finalScore,
      rank: 0, // Será calculado posteriormente
      category,
      ageGroup,
      educationLevel: userProfile.education,
      region: userProfile.region,
      badges,
      achievements,
      totalPoints: this.calculateTotalPoints(achievements),
      monthlyPoints: this.calculateMonthlyPoints(achievements, timeframe),
    }
  }

  // Score base ponderado por dificuldade
  private static calculateBaseScore(results: UserTestResult[]): number {
    const weightedScores = results.map((result) => {
      const difficultyMultiplier = this.getDifficultyMultiplier(result.difficulty)
      return result.score * difficultyMultiplier
    })

    return weightedScores.reduce((sum, score) => sum + score, 0) / weightedScores.length
  }

  // Bônus por eficiência de tempo
  private static calculateTimeBonus(results: UserTestResult[]): number {
    const avgTimePerQuestion = results.map((result) => result.timeSpent / result.totalQuestions)

    const optimalTime = 60 // 60 segundos por questão é considerado ótimo
    const timeEfficiency = avgTimePerQuestion.map((time) => Math.max(0, ((optimalTime - time) / optimalTime) * 100))

    return timeEfficiency.reduce((sum, eff) => sum + eff, 0) / timeEfficiency.length
  }

  // Bônus por consistência nos resultados
  private static calculateConsistencyBonus(results: UserTestResult[]): number {
    if (results.length < 3) return 0

    const scores = results.map((r) => r.score)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const standardDeviation = Math.sqrt(variance)

    // Menor desvio padrão = maior consistência
    const consistencyScore = Math.max(0, 100 - (standardDeviation / mean) * 100)
    return consistencyScore
  }

  // Bônus por participação ativa
  private static calculateParticipationBonus(results: UserTestResult[], timeframe: string): number {
    const timeframeDays = timeframe === "monthly" ? 30 : timeframe === "quarterly" ? 90 : 365
    const expectedTests = Math.floor(timeframeDays / 7) // 1 teste por semana esperado

    const participationRate = Math.min(1, results.length / expectedTests)
    return participationRate * 100
  }

  // Bônus por verificação de identidade
  private static calculateVerificationBonus(profile: UserProfile): number {
    const bonuses = {
      Basic: 0,
      Email: 10,
      Phone: 20,
      Document: 40,
      Premium: 60,
    }

    return bonuses[profile.verificationLevel] || 0
  }

  // Sistema de detecção de fraude
  private static detectAndPenalizeFraud(results: UserTestResult[], profile: UserProfile): number {
    let fraudScore = 0

    // 1. Detecção de padrões suspeitos de tempo
    const suspiciouslyFastTests = results.filter(
      (result) => result.timeSpent / result.totalQuestions < 10, // Menos de 10 segundos por questão
    ).length

    if (suspiciouslyFastTests > results.length * 0.3) {
      fraudScore += 50 // Penalidade por velocidade suspeita
    }

    // 2. Detecção de múltiplos IPs
    const uniqueIPs = new Set(results.map((r) => r.ipAddress)).size
    if (uniqueIPs > results.length * 0.5) {
      fraudScore += 30 // Penalidade por múltiplos IPs
    }

    // 3. Detecção de padrões de resposta
    const perfectScores = results.filter((r) => r.score >= 180).length
    if (perfectScores > results.length * 0.8) {
      fraudScore += 40 // Penalidade por muitos scores perfeitos
    }

    // 4. Detecção de sessões suspeitas
    const shortSessions = results.filter(
      (result) => result.timeSpent < result.totalQuestions * 5, // Menos de 5 segundos por questão
    ).length

    if (shortSessions > 0) {
      fraudScore += shortSessions * 20
    }

    return Math.min(fraudScore, 200) // Máximo de 200 pontos de penalidade
  }

  // Determinar categoria do usuário
  private static determineCategory(profile: UserProfile): string {
    const age = this.calculateAge(profile.birthDate)

    if (age < 18) return "Jovem"
    if (age < 30) return "Adulto Jovem"
    if (age < 50) return "Adulto"
    return "Sênior"
  }

  // Calcular grupo etário
  private static calculateAgeGroup(birthDate: Date): string {
    const age = this.calculateAge(birthDate)

    if (age < 18) return "13-17"
    if (age < 25) return "18-24"
    if (age < 35) return "25-34"
    if (age < 45) return "35-44"
    if (age < 55) return "45-54"
    if (age < 65) return "55-64"
    return "65+"
  }

  private static calculateAge(birthDate: Date): number {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }

    return age
  }

  private static getDifficultyMultiplier(difficulty: string): number {
    const multipliers = {
      Básico: 1.0,
      Intermediário: 1.2,
      Avançado: 1.5,
      Expert: 2.0,
    }
    return multipliers[difficulty] || 1.0
  }

  private static filterResultsByTimeframe(results: UserTestResult[], timeframe: string): UserTestResult[] {
    const now = new Date()
    const cutoffDate = new Date()

    switch (timeframe) {
      case "monthly":
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      case "quarterly":
        cutoffDate.setMonth(now.getMonth() - 3)
        break
      case "yearly":
        cutoffDate.setFullYear(now.getFullYear() - 1)
        break
    }

    return results.filter((result) => result.completedAt >= cutoffDate)
  }

  private static calculateBadges(results: UserTestResult[], profile: UserProfile): string[] {
    const badges: string[] = []

    // Badge de Consistência
    if (this.calculateConsistencyBonus(results) > 80) {
      badges.push("Consistente")
    }

    // Badge de Velocidade
    const avgTimePerQuestion = results.reduce((sum, r) => sum + r.timeSpent / r.totalQuestions, 0) / results.length
    if (avgTimePerQuestion < 30) {
      badges.push("Relâmpago")
    }

    // Badge de Participação
    if (results.length >= 20) {
      badges.push("Participativo")
    }

    // Badge de Excelência
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length
    if (avgScore > 140) {
      badges.push("Gênio")
    }

    return badges
  }

  private static calculateAchievements(results: UserTestResult[], profile: UserProfile): Achievement[] {
    const achievements: Achievement[] = []

    // Achievement: Primeira Vitória
    if (results.length >= 1) {
      achievements.push({
        id: "first-test",
        name: "Primeiro Passo",
        description: "Completou seu primeiro teste de QI",
        icon: "🎯",
        rarity: "Common",
        pointsAwarded: 100,
        unlockedAt: results[0].completedAt,
      })
    }

    // Achievement: Maratonista
    if (results.length >= 50) {
      achievements.push({
        id: "marathon",
        name: "Maratonista Mental",
        description: "Completou 50 testes de QI",
        icon: "🏃‍♂️",
        rarity: "Epic",
        pointsAwarded: 1000,
        unlockedAt: results[49].completedAt,
      })
    }

    // Achievement: Score Perfeito
    const perfectScores = results.filter((r) => r.score >= 180)
    if (perfectScores.length >= 1) {
      achievements.push({
        id: "perfect-score",
        name: "Perfeição",
        description: "Alcançou um score perfeito",
        icon: "⭐",
        rarity: "Legendary",
        pointsAwarded: 2000,
        unlockedAt: perfectScores[0].completedAt,
      })
    }

    return achievements
  }

  private static calculateTotalPoints(achievements: Achievement[]): number {
    return achievements.reduce((sum, achievement) => sum + achievement.pointsAwarded, 0)
  }

  private static calculateMonthlyPoints(achievements: Achievement[], timeframe: string): number {
    const now = new Date()
    const cutoffDate = new Date()
    cutoffDate.setMonth(now.getMonth() - 1)

    return achievements
      .filter((achievement) => achievement.unlockedAt >= cutoffDate)
      .reduce((sum, achievement) => sum + achievement.pointsAwarded, 0)
  }
}

// Sistema de Recompensas
export class RewardSystem {
  static readonly MONTHLY_REWARDS = {
    1: { prize: "MacBook Pro M3", value: 15000, points: 10000 },
    2: { prize: "iPad Pro + Apple Pencil", value: 8000, points: 7500 },
    3: { prize: "AirPods Pro + Gift Card R$1000", value: 3500, points: 5000 },
    4: { prize: "Gift Card R$1500", value: 1500, points: 3000 },
    5: { prize: "Gift Card R$1000", value: 1000, points: 2500 },
    6: { prize: "Gift Card R$750", value: 750, points: 2000 },
    7: { prize: "Gift Card R$500", value: 500, points: 1500 },
    8: { prize: "Gift Card R$400", value: 400, points: 1200 },
    9: { prize: "Gift Card R$300", value: 300, points: 1000 },
    10: { prize: "Gift Card R$200", value: 200, points: 800 },
  }

  static readonly CATEGORY_REWARDS = {
    Jovem: { multiplier: 1.2, specialPrize: "Bolsa de Estudos" },
    "Adulto Jovem": { multiplier: 1.1, specialPrize: "Curso Online Premium" },
    Adulto: { multiplier: 1.0, specialPrize: "Certificação Profissional" },
    Sênior: { multiplier: 1.3, specialPrize: "Experiência Cultural" },
  }

  static calculateReward(rank: number, category: string, points: number) {
    const baseReward = this.MONTHLY_REWARDS[rank]
    if (!baseReward) return null

    const categoryBonus = this.CATEGORY_REWARDS[category]
    const finalPoints = Math.floor(baseReward.points * (categoryBonus?.multiplier || 1))

    return {
      ...baseReward,
      finalPoints,
      categoryBonus: categoryBonus?.specialPrize,
      eligibleForPhysicalPrize: rank <= 3,
    }
  }
}
