// Sistema de Recompensas e Pontos
import type { RankingScore, UserTestResult } from "./types" // Assuming RankingScore and UserTestResult are defined in a separate file

export interface Reward {
  id: string
  name: string
  description: string
  type: "physical" | "digital" | "points" | "experience"
  value: number
  pointsCost: number
  category: string
  eligibilityRank?: number
  eligibilityCategory?: string
  isLimited: boolean
  quantity?: number
  expiresAt?: Date
  imageUrl: string
}

export interface UserReward {
  id: string
  userId: string
  rewardId: string
  earnedAt: Date
  claimedAt?: Date
  status: "earned" | "claimed" | "shipped" | "delivered"
  trackingCode?: string
  deliveryAddress?: string
}

export class RewardsEngine {
  static readonly AVAILABLE_REWARDS: Reward[] = [
    // Prêmios Físicos - Top Rankings
    {
      id: "macbook-pro-m3",
      name: "MacBook Pro M3",
      description: 'MacBook Pro 14" com chip M3, 16GB RAM, 512GB SSD',
      type: "physical",
      value: 15000,
      pointsCost: 0,
      category: "premium",
      eligibilityRank: 1,
      isLimited: true,
      quantity: 1,
      imageUrl: "/rewards/macbook-pro.jpg",
    },
    {
      id: "ipad-pro-bundle",
      name: "iPad Pro + Apple Pencil",
      description: 'iPad Pro 11" + Apple Pencil (2ª geração) + Magic Keyboard',
      type: "physical",
      value: 8000,
      pointsCost: 0,
      category: "premium",
      eligibilityRank: 2,
      isLimited: true,
      quantity: 1,
      imageUrl: "/rewards/ipad-pro.jpg",
    },
    {
      id: "airpods-giftcard",
      name: "AirPods Pro + Gift Card",
      description: "AirPods Pro (2ª geração) + Gift Card R$ 1.000",
      type: "physical",
      value: 3500,
      pointsCost: 0,
      category: "premium",
      eligibilityRank: 3,
      isLimited: true,
      quantity: 1,
      imageUrl: "/rewards/airpods-pro.jpg",
    },

    // Gift Cards - Rankings 4-10
    {
      id: "giftcard-1500",
      name: "Gift Card R$ 1.500",
      description: "Vale-compras de R$ 1.500 para Amazon, Magazine Luiza ou Americanas",
      type: "digital",
      value: 1500,
      pointsCost: 0,
      category: "giftcard",
      eligibilityRank: 4,
      isLimited: true,
      quantity: 2,
      imageUrl: "/rewards/giftcard-1500.jpg",
    },
    {
      id: "giftcard-1000",
      name: "Gift Card R$ 1.000",
      description: "Vale-compras de R$ 1.000 para lojas parceiras",
      type: "digital",
      value: 1000,
      pointsCost: 0,
      category: "giftcard",
      eligibilityRank: 5,
      isLimited: true,
      quantity: 2,
      imageUrl: "/rewards/giftcard-1000.jpg",
    },

    // Recompensas por Pontos
    {
      id: "course-premium",
      name: "Curso Online Premium",
      description: "Acesso a curso premium de sua escolha (Coursera, Udemy, etc.)",
      type: "digital",
      value: 500,
      pointsCost: 5000,
      category: "education",
      isLimited: false,
      imageUrl: "/rewards/course-premium.jpg",
    },
    {
      id: "book-bundle",
      name: "Kit 5 Livros de Desenvolvimento Pessoal",
      description: "Seleção curada de 5 livros sobre inteligência e desenvolvimento cognitivo",
      type: "physical",
      value: 300,
      pointsCost: 3000,
      category: "education",
      isLimited: false,
      imageUrl: "/rewards/book-bundle.jpg",
    },
    {
      id: "netflix-annual",
      name: "Netflix Premium - 1 Ano",
      description: "Assinatura Netflix Premium por 12 meses",
      type: "digital",
      value: 600,
      pointsCost: 6000,
      category: "entertainment",
      isLimited: false,
      imageUrl: "/rewards/netflix.jpg",
    },
    {
      id: "spotify-annual",
      name: "Spotify Premium - 1 Ano",
      description: "Assinatura Spotify Premium por 12 meses",
      type: "digital",
      value: 240,
      pointsCost: 2400,
      category: "entertainment",
      isLimited: false,
      imageUrl: "/rewards/spotify.jpg",
    },

    // Experiências Especiais
    {
      id: "museum-experience",
      name: "Experiência Cultural Premium",
      description: "Visita guiada a museus + jantar cultural para 2 pessoas",
      type: "experience",
      value: 800,
      pointsCost: 8000,
      category: "experience",
      eligibilityCategory: "Sênior",
      isLimited: true,
      quantity: 10,
      imageUrl: "/rewards/museum.jpg",
    },
    {
      id: "scholarship",
      name: "Bolsa de Estudos Parcial",
      description: "Bolsa de 50% para curso técnico ou graduação",
      type: "experience",
      value: 5000,
      pointsCost: 50000,
      category: "education",
      eligibilityCategory: "Jovem",
      isLimited: true,
      quantity: 5,
      imageUrl: "/rewards/scholarship.jpg",
    },
  ]

  static calculateEligibleRewards(
    userRanking: RankingScore,
    userPoints: number,
    timeframe: "monthly" | "quarterly" | "yearly",
  ): Reward[] {
    return this.AVAILABLE_REWARDS.filter((reward) => {
      // Verificar elegibilidade por ranking
      if (reward.eligibilityRank && userRanking.rank > reward.eligibilityRank) {
        return false
      }

      // Verificar elegibilidade por categoria
      if (reward.eligibilityCategory && userRanking.category !== reward.eligibilityCategory) {
        return false
      }

      // Verificar se tem pontos suficientes
      if (reward.pointsCost > 0 && userPoints < reward.pointsCost) {
        return false
      }

      // Verificar se ainda está disponível (para recompensas limitadas)
      if (reward.isLimited && reward.quantity !== undefined && reward.quantity <= 0) {
        return false
      }

      // Verificar se não expirou
      if (reward.expiresAt && reward.expiresAt < new Date()) {
        return false
      }

      return true
    })
  }

  static calculateMonthlyRewards(rankings: RankingScore[]): UserReward[] {
    const rewards: UserReward[] = []
    const now = new Date()

    // Distribuir prêmios para top 10
    const topUsers = rankings.slice(0, 10)

    topUsers.forEach((user, index) => {
      const rank = index + 1
      const eligibleRewards = this.AVAILABLE_REWARDS.filter((r) => r.eligibilityRank === rank)

      eligibleRewards.forEach((reward) => {
        rewards.push({
          id: `${user.userId}-${reward.id}-${now.getTime()}`,
          userId: user.userId,
          rewardId: reward.id,
          earnedAt: now,
          status: "earned",
        })
      })
    })

    return rewards
  }

  static calculateCategoryBonuses(userRanking: RankingScore): number {
    const categoryMultipliers = {
      Jovem: 1.2,
      "Adulto Jovem": 1.1,
      Adulto: 1.0,
      Sênior: 1.3,
    }

    const basePoints = userRanking.monthlyPoints
    const multiplier = categoryMultipliers[userRanking.category] || 1.0

    return Math.floor(basePoints * multiplier) - basePoints
  }

  static generateRewardNotification(userReward: UserReward, reward: Reward): string {
    switch (reward.type) {
      case "physical":
        return `🎉 Parabéns! Você ganhou: ${reward.name}! Entraremos em contato para organizar a entrega.`
      case "digital":
        return `🎁 Recompensa desbloqueada: ${reward.name}! Verifique seu email para instruções de resgate.`
      case "experience":
        return `✨ Experiência especial conquistada: ${reward.name}! Nossa equipe entrará em contato para agendar.`
      default:
        return `🏆 Nova recompensa: ${reward.name}! Verifique sua conta para mais detalhes.`
    }
  }

  static trackRewardDelivery(userRewardId: string, trackingCode: string): void {
    // Implementar integração com correios/transportadoras
    console.log(`Tracking reward delivery: ${userRewardId} - ${trackingCode}`)
  }

  static calculateLoyaltyBonus(userHistory: UserTestResult[], joinDate: Date): number {
    const monthsActive = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
    const testsPerMonth = userHistory.length / Math.max(monthsActive, 1)

    // Bônus por fidelidade
    let loyaltyBonus = 0

    if (monthsActive >= 12) loyaltyBonus += 1000 // 1 ano
    if (monthsActive >= 24) loyaltyBonus += 2000 // 2 anos
    if (testsPerMonth >= 4) loyaltyBonus += 500 // Usuário ativo

    return loyaltyBonus
  }
}
