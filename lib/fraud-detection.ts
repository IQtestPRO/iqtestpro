// Sistema Avançado de Detecção de Fraude
import type { UserProfile, UserTestResult } from "./types" // Declare or import the variables here

export interface FraudIndicator {
  type: "time_anomaly" | "ip_anomaly" | "score_anomaly" | "pattern_anomaly" | "session_anomaly"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  confidence: number // 0-100
  evidence: any
}

export interface FraudAnalysis {
  userId: string
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  riskScore: number // 0-100
  indicators: FraudIndicator[]
  recommendations: string[]
  requiresManualReview: boolean
  autoActions: string[]
}

export class FraudDetectionEngine {
  static analyzeFraud(
    userProfile: UserProfile,
    testResults: UserTestResult[],
    historicalData?: UserTestResult[],
  ): FraudAnalysis {
    const indicators: FraudIndicator[] = []

    // 1. Análise de Tempo Suspeito
    indicators.push(...this.analyzeTimeAnomalies(testResults))

    // 2. Análise de IP e Localização
    indicators.push(...this.analyzeIPAnomalies(testResults))

    // 3. Análise de Scores Anômalos
    indicators.push(...this.analyzeScoreAnomalies(testResults, historicalData))

    // 4. Análise de Padrões de Resposta
    indicators.push(...this.analyzeResponsePatterns(testResults))

    // 5. Análise de Sessão
    indicators.push(...this.analyzeSessionAnomalies(testResults))

    const riskScore = this.calculateRiskScore(indicators)
    const riskLevel = this.determineRiskLevel(riskScore)
    const recommendations = this.generateRecommendations(indicators, riskLevel)
    const autoActions = this.determineAutoActions(riskLevel, indicators)

    return {
      userId: userProfile.id,
      riskLevel,
      riskScore,
      indicators,
      recommendations,
      requiresManualReview: riskLevel === "High" || riskLevel === "Critical",
      autoActions,
    }
  }

  private static analyzeTimeAnomalies(results: UserTestResult[]): FraudIndicator[] {
    const indicators: FraudIndicator[] = []

    // Detectar testes muito rápidos
    const suspiciouslyFast = results.filter((result) => {
      const timePerQuestion = result.timeSpent / result.totalQuestions
      return timePerQuestion < 10 // Menos de 10 segundos por questão
    })

    if (suspiciouslyFast.length > 0) {
      const percentage = (suspiciouslyFast.length / results.length) * 100
      indicators.push({
        type: "time_anomaly",
        severity: percentage > 50 ? "critical" : percentage > 30 ? "high" : "medium",
        description: `${suspiciouslyFast.length} testes com tempo suspeito (${percentage.toFixed(1)}%)`,
        confidence: Math.min(95, percentage * 2),
        evidence: {
          suspiciousTests: suspiciouslyFast.length,
          totalTests: results.length,
          avgTimePerQuestion:
            suspiciouslyFast.reduce((sum, r) => sum + r.timeSpent / r.totalQuestions, 0) / suspiciouslyFast.length,
        },
      })
    }

    // Detectar padrões de tempo muito consistentes (bot-like)
    const times = results.map((r) => r.timeSpent / r.totalQuestions)
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length
    const variance = times.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / times.length
    const stdDev = Math.sqrt(variance)
    const coefficientOfVariation = stdDev / avgTime

    if (coefficientOfVariation < 0.1 && results.length > 5) {
      indicators.push({
        type: "time_anomaly",
        severity: "high",
        description: "Tempo de resposta excessivamente consistente (possível automação)",
        confidence: 85,
        evidence: {
          coefficientOfVariation,
          avgTime,
          stdDev,
        },
      })
    }

    return indicators
  }

  private static analyzeIPAnomalies(results: UserTestResult[]): FraudIndicator[] {
    const indicators: FraudIndicator[] = []

    // Detectar múltiplos IPs
    const uniqueIPs = new Set(results.map((r) => r.ipAddress))
    const ipCount = uniqueIPs.size
    const ipChangeRate = ipCount / results.length

    if (ipChangeRate > 0.5) {
      indicators.push({
        type: "ip_anomaly",
        severity: ipChangeRate > 0.8 ? "critical" : "high",
        description: `Múltiplos IPs detectados: ${ipCount} IPs diferentes em ${results.length} testes`,
        confidence: Math.min(90, ipChangeRate * 100),
        evidence: {
          uniqueIPs: ipCount,
          totalTests: results.length,
          ipChangeRate,
          ips: Array.from(uniqueIPs),
        },
      })
    }

    return indicators
  }

  private static analyzeScoreAnomalies(results: UserTestResult[], historicalData?: UserTestResult[]): FraudIndicator[] {
    const indicators: FraudIndicator[] = []

    // Detectar scores perfeitos excessivos
    const perfectScores = results.filter((r) => r.score >= 180)
    const perfectScoreRate = perfectScores.length / results.length

    if (perfectScoreRate > 0.7) {
      indicators.push({
        type: "score_anomaly",
        severity: perfectScoreRate > 0.9 ? "critical" : "high",
        description: `Taxa alta de scores perfeitos: ${(perfectScoreRate * 100).toFixed(1)}%`,
        confidence: Math.min(95, perfectScoreRate * 120),
        evidence: {
          perfectScores: perfectScores.length,
          totalTests: results.length,
          perfectScoreRate,
        },
      })
    }

    // Detectar melhoria súbita anômala
    if (historicalData && historicalData.length > 0) {
      const historicalAvg = historicalData.reduce((sum, r) => sum + r.score, 0) / historicalData.length
      const currentAvg = results.reduce((sum, r) => sum + r.score, 0) / results.length
      const improvement = currentAvg - historicalAvg

      if (improvement > 50) {
        indicators.push({
          type: "score_anomaly",
          severity: improvement > 80 ? "critical" : "high",
          description: `Melhoria súbita anômala: +${improvement.toFixed(1)} pontos`,
          confidence: Math.min(90, improvement),
          evidence: {
            historicalAvg,
            currentAvg,
            improvement,
          },
        })
      }
    }

    return indicators
  }

  private static analyzeResponsePatterns(results: UserTestResult[]): FraudIndicator[] {
    const indicators: FraudIndicator[] = []

    // Detectar padrão de acertos muito linear
    const accuracyRates = results.map((r) => r.questionsCorrect / r.totalQuestions)
    const avgAccuracy = accuracyRates.reduce((sum, rate) => sum + rate, 0) / accuracyRates.length
    const accuracyVariance =
      accuracyRates.reduce((sum, rate) => sum + Math.pow(rate - avgAccuracy, 2), 0) / accuracyRates.length

    if (accuracyVariance < 0.01 && avgAccuracy > 0.8) {
      indicators.push({
        type: "pattern_anomaly",
        severity: "medium",
        description: "Padrão de acertos excessivamente consistente",
        confidence: 70,
        evidence: {
          avgAccuracy,
          accuracyVariance,
          accuracyRates,
        },
      })
    }

    return indicators
  }

  private static analyzeSessionAnomalies(results: UserTestResult[]): FraudIndicator[] {
    const indicators: FraudIndicator[] = []

    // Detectar sessões muito curtas
    const shortSessions = results.filter((r) => r.timeSpent < r.totalQuestions * 5)

    if (shortSessions.length > 0) {
      indicators.push({
        type: "session_anomaly",
        severity: shortSessions.length > results.length * 0.3 ? "high" : "medium",
        description: `${shortSessions.length} sessões anormalmente curtas detectadas`,
        confidence: 80,
        evidence: {
          shortSessions: shortSessions.length,
          totalSessions: results.length,
        },
      })
    }

    // Detectar user agents suspeitos
    const userAgents = new Set(results.map((r) => r.userAgent))
    const botLikeAgents = Array.from(userAgents).filter(
      (ua) => ua.includes("bot") || ua.includes("crawler") || ua.includes("spider") || ua.length < 20,
    )

    if (botLikeAgents.length > 0) {
      indicators.push({
        type: "session_anomaly",
        severity: "high",
        description: "User agents suspeitos detectados",
        confidence: 90,
        evidence: {
          suspiciousAgents: botLikeAgents,
        },
      })
    }

    return indicators
  }

  private static calculateRiskScore(indicators: FraudIndicator[]): number {
    if (indicators.length === 0) return 0

    const weights = {
      low: 1,
      medium: 2,
      high: 4,
      critical: 8,
    }

    const totalWeight = indicators.reduce((sum, indicator) => {
      return sum + weights[indicator.severity] * (indicator.confidence / 100)
    }, 0)

    return Math.min(100, totalWeight * 5)
  }

  private static determineRiskLevel(riskScore: number): "Low" | "Medium" | "High" | "Critical" {
    if (riskScore >= 80) return "Critical"
    if (riskScore >= 60) return "High"
    if (riskScore >= 30) return "Medium"
    return "Low"
  }

  private static generateRecommendations(indicators: FraudIndicator[], riskLevel: string): string[] {
    const recommendations: string[] = []

    if (riskLevel === "Critical") {
      recommendations.push("Suspender conta imediatamente")
      recommendations.push("Revisar todos os testes do usuário")
      recommendations.push("Investigar padrões de IP e dispositivo")
    } else if (riskLevel === "High") {
      recommendations.push("Solicitar verificação adicional de identidade")
      recommendations.push("Monitorar próximos testes de perto")
      recommendations.push("Aplicar penalização temporária no ranking")
    } else if (riskLevel === "Medium") {
      recommendations.push("Aumentar frequência de monitoramento")
      recommendations.push("Solicitar re-verificação de email/telefone")
    }

    // Recomendações específicas por tipo de indicador
    const timeAnomalies = indicators.filter((i) => i.type === "time_anomaly")
    if (timeAnomalies.length > 0) {
      recommendations.push("Implementar captcha em testes futuros")
    }

    const ipAnomalies = indicators.filter((i) => i.type === "ip_anomaly")
    if (ipAnomalies.length > 0) {
      recommendations.push("Restringir testes a IP verificado")
    }

    return recommendations
  }

  private static determineAutoActions(riskLevel: string, indicators: FraudIndicator[]): string[] {
    const actions: string[] = []

    switch (riskLevel) {
      case "Critical":
        actions.push("account_suspension")
        actions.push("remove_from_ranking")
        actions.push("flag_for_manual_review")
        break
      case "High":
        actions.push("require_additional_verification")
        actions.push("apply_ranking_penalty")
        actions.push("increase_monitoring")
        break
      case "Medium":
        actions.push("request_email_verification")
        actions.push("add_monitoring_flag")
        break
      case "Low":
        actions.push("log_for_analysis")
        break
    }

    return actions
  }
}
