// Sistema de Saldo de Bônus Avançado
export interface BonusTransaction {
  id: string
  userId: string
  type: BonusType
  amount: number
  description: string
  status: "pending" | "completed" | "expired" | "cancelled"
  createdAt: Date
  expiresAt?: Date
  metadata?: Record<string, any>
}

export interface UserBonusBalance {
  userId: string
  totalBalance: number
  availableBalance: number
  pendingBalance: number
  expiredBalance: number
  lastUpdated: Date
  transactions: BonusTransaction[]
}

export enum BonusType {
  SIGNUP = "signup",
  REFERRAL = "referral",
  DAILY_LOGIN = "daily_login",
  TEST_COMPLETION = "test_completion",
  STREAK_BONUS = "streak_bonus",
  ACHIEVEMENT = "achievement",
  PROMOTIONAL = "promotional",
  CASHBACK = "cashback",
  VIP_BONUS = "vip_bonus",
  LOYALTY_REWARD = "loyalty_reward",
}

export interface BonusRule {
  id: string
  type: BonusType
  name: string
  description: string
  amount: number
  maxAmount?: number
  expirationDays?: number
  conditions: BonusCondition[]
  isActive: boolean
  validFrom: Date
  validUntil?: Date
}

export interface BonusCondition {
  type: "min_purchase" | "user_level" | "test_score" | "streak_days" | "referral_count"
  value: number
  operator: "gte" | "lte" | "eq" | "gt" | "lt"
}

export class BonusSystemManager {
  private static instance: BonusSystemManager
  private bonusRules: Map<string, BonusRule> = new Map()
  private userBalances: Map<string, UserBonusBalance> = new Map()

  static getInstance(): BonusSystemManager {
    if (!BonusSystemManager.instance) {
      BonusSystemManager.instance = new BonusSystemManager()
    }
    return BonusSystemManager.instance
  }

  // Inicializar regras de bônus padrão
  constructor() {
    this.initializeDefaultRules()
    this.startExpirationChecker()
  }

  private initializeDefaultRules() {
    const defaultRules: BonusRule[] = [
      {
        id: "signup-bonus",
        type: BonusType.SIGNUP,
        name: "Bônus de Cadastro",
        description: "Bônus para novos usuários",
        amount: 100,
        expirationDays: 30,
        conditions: [],
        isActive: true,
        validFrom: new Date(),
      },
      {
        id: "test-completion",
        type: BonusType.TEST_COMPLETION,
        name: "Bônus de Conclusão",
        description: "Bônus por completar teste",
        amount: 50,
        expirationDays: 7,
        conditions: [{ type: "test_score", value: 70, operator: "gte" }],
        isActive: true,
        validFrom: new Date(),
      },
      {
        id: "daily-streak",
        type: BonusType.STREAK_BONUS,
        name: "Bônus de Sequência",
        description: "Bônus por login consecutivo",
        amount: 25,
        maxAmount: 200,
        expirationDays: 3,
        conditions: [{ type: "streak_days", value: 3, operator: "gte" }],
        isActive: true,
        validFrom: new Date(),
      },
    ]

    defaultRules.forEach((rule) => {
      this.bonusRules.set(rule.id, rule)
    })
  }

  // Ganhar bônus
  async earnBonus(
    userId: string,
    bonusType: BonusType,
    metadata?: Record<string, any>,
  ): Promise<BonusTransaction | null> {
    try {
      const rule = Array.from(this.bonusRules.values()).find((r) => r.type === bonusType && r.isActive)
      if (!rule) return null

      // Verificar condições
      const meetsConditions = await this.checkBonusConditions(userId, rule.conditions, metadata)
      if (!meetsConditions) return null

      // Calcular valor do bônus
      const bonusAmount = this.calculateBonusAmount(rule, metadata)

      // Criar transação
      const transaction: BonusTransaction = {
        id: this.generateTransactionId(),
        userId,
        type: bonusType,
        amount: bonusAmount,
        description: rule.description,
        status: "completed",
        createdAt: new Date(),
        expiresAt: rule.expirationDays ? new Date(Date.now() + rule.expirationDays * 24 * 60 * 60 * 1000) : undefined,
        metadata,
      }

      // Atualizar saldo do usuário
      await this.updateUserBalance(userId, transaction)

      // Salvar transação
      await this.saveTransaction(transaction)

      return transaction
    } catch (error) {
      console.error("Erro ao processar bônus:", error)
      return null
    }
  }

  // Resgatar bônus
  async redeemBonus(userId: string, amount: number, description: string): Promise<boolean> {
    try {
      const balance = await this.getUserBalance(userId)
      if (balance.availableBalance < amount) {
        throw new Error("Saldo insuficiente")
      }

      const transaction: BonusTransaction = {
        id: this.generateTransactionId(),
        userId,
        type: BonusType.CASHBACK,
        amount: -amount,
        description: `Resgate: ${description}`,
        status: "completed",
        createdAt: new Date(),
      }

      await this.updateUserBalance(userId, transaction)
      await this.saveTransaction(transaction)

      return true
    } catch (error) {
      console.error("Erro ao resgatar bônus:", error)
      return false
    }
  }

  // Obter saldo do usuário
  async getUserBalance(userId: string): Promise<UserBonusBalance> {
    let balance = this.userBalances.get(userId)

    if (!balance) {
      balance = {
        userId,
        totalBalance: 0,
        availableBalance: 0,
        pendingBalance: 0,
        expiredBalance: 0,
        lastUpdated: new Date(),
        transactions: [],
      }
      this.userBalances.set(userId, balance)
    }

    return balance
  }

  // Verificar condições do bônus
  private async checkBonusConditions(
    userId: string,
    conditions: BonusCondition[],
    metadata?: Record<string, any>,
  ): Promise<boolean> {
    for (const condition of conditions) {
      const value = await this.getConditionValue(userId, condition.type, metadata)

      switch (condition.operator) {
        case "gte":
          if (value < condition.value) return false
          break
        case "lte":
          if (value > condition.value) return false
          break
        case "eq":
          if (value !== condition.value) return false
          break
        case "gt":
          if (value <= condition.value) return false
          break
        case "lt":
          if (value >= condition.value) return false
          break
      }
    }

    return true
  }

  // Obter valor da condição
  private async getConditionValue(
    userId: string,
    conditionType: string,
    metadata?: Record<string, any>,
  ): Promise<number> {
    switch (conditionType) {
      case "test_score":
        return metadata?.testScore || 0
      case "streak_days":
        return await this.getUserStreakDays(userId)
      case "user_level":
        return await this.getUserLevel(userId)
      case "min_purchase":
        return metadata?.purchaseAmount || 0
      case "referral_count":
        return await this.getUserReferralCount(userId)
      default:
        return 0
    }
  }

  // Calcular valor do bônus
  private calculateBonusAmount(rule: BonusRule, metadata?: Record<string, any>): number {
    let amount = rule.amount

    // Aplicar multiplicadores baseados em metadata
    if (metadata?.multiplier) {
      amount *= metadata.multiplier
    }

    // Aplicar limite máximo
    if (rule.maxAmount && amount > rule.maxAmount) {
      amount = rule.maxAmount
    }

    return Math.floor(amount)
  }

  // Atualizar saldo do usuário
  private async updateUserBalance(userId: string, transaction: BonusTransaction): Promise<void> {
    const balance = await this.getUserBalance(userId)

    balance.transactions.push(transaction)
    balance.totalBalance += transaction.amount

    if (transaction.amount > 0) {
      balance.availableBalance += transaction.amount
    } else {
      balance.availableBalance += transaction.amount // Será negativo
    }

    balance.lastUpdated = new Date()

    this.userBalances.set(userId, balance)
  }

  // Salvar transação (simulado - em produção seria no banco de dados)
  private async saveTransaction(transaction: BonusTransaction): Promise<void> {
    const transactions = JSON.parse(localStorage.getItem("bonusTransactions") || "[]")
    transactions.push(transaction)
    localStorage.setItem("bonusTransactions", JSON.stringify(transactions))
  }

  // Verificar expiração de bônus
  private startExpirationChecker(): void {
    setInterval(() => {
      this.checkExpiredBonuses()
    }, 60000) // Verificar a cada minuto
  }

  private async checkExpiredBonuses(): Promise<void> {
    const now = new Date()

    for (const [userId, balance] of this.userBalances.entries()) {
      let expiredAmount = 0

      balance.transactions.forEach((transaction) => {
        if (transaction.expiresAt && transaction.expiresAt < now && transaction.status === "completed") {
          transaction.status = "expired"
          expiredAmount += transaction.amount
        }
      })

      if (expiredAmount > 0) {
        balance.availableBalance -= expiredAmount
        balance.expiredBalance += expiredAmount
        balance.lastUpdated = new Date()
      }
    }
  }

  // Métodos auxiliares
  private generateTransactionId(): string {
    return `bonus_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async getUserStreakDays(userId: string): Promise<number> {
    // Implementar lógica de streak
    return 1
  }

  private async getUserLevel(userId: string): Promise<number> {
    // Implementar lógica de nível do usuário
    return 1
  }

  private async getUserReferralCount(userId: string): Promise<number> {
    // Implementar lógica de contagem de referrals
    return 0
  }

  // API pública para gerenciamento
  async addBonusRule(rule: BonusRule): Promise<void> {
    this.bonusRules.set(rule.id, rule)
  }

  async removeBonusRule(ruleId: string): Promise<void> {
    this.bonusRules.delete(ruleId)
  }

  async getBonusRules(): Promise<BonusRule[]> {
    return Array.from(this.bonusRules.values())
  }

  async getUserTransactions(userId: string, limit?: number): Promise<BonusTransaction[]> {
    const balance = await this.getUserBalance(userId)
    const transactions = balance.transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    return limit ? transactions.slice(0, limit) : transactions
  }

  // Métodos de segurança
  async validateTransaction(transactionId: string): Promise<boolean> {
    try {
      const transactions = JSON.parse(localStorage.getItem("bonusTransactions") || "[]")
      const transaction = transactions.find((t: BonusTransaction) => t.id === transactionId)

      if (!transaction) return false

      // Verificar integridade dos dados
      const hash = this.generateTransactionHash(transaction)
      return hash === transaction.metadata?.hash
    } catch {
      return false
    }
  }

  private generateTransactionHash(transaction: BonusTransaction): string {
    const data = `${transaction.id}${transaction.userId}${transaction.amount}${transaction.createdAt.getTime()}`
    return btoa(data).slice(0, 16)
  }

  // Prevenção de fraude
  async detectFraud(userId: string): Promise<boolean> {
    const transactions = await this.getUserTransactions(userId, 100)

    // Verificar padrões suspeitos
    const recentTransactions = transactions.filter((t) => t.createdAt.getTime() > Date.now() - 24 * 60 * 60 * 1000)

    // Muitas transações em pouco tempo
    if (recentTransactions.length > 50) return true

    // Valores muito altos
    const totalToday = recentTransactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0)
    if (totalToday > 10000) return true

    return false
  }
}

// Instância singleton
export const bonusSystem = BonusSystemManager.getInstance()
