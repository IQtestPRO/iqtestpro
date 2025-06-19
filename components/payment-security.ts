// Utilitários de segurança para pagamento
export class PaymentSecurity {
  static maskCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, "")
    if (cleaned.length < 4) return cardNumber

    const lastFour = cleaned.slice(-4)
    const masked = "*".repeat(cleaned.length - 4)

    return this.formatCardNumber(masked + lastFour)
  }

  static formatCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, "")
    const groups = cleaned.match(/.{1,4}/g) || []
    return groups.join(" ")
  }

  static sanitizeInput(input: string): string {
    return input.replace(/[<>"'&]/g, "")
  }

  static generateTransactionId(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 9)
    return `txn_${timestamp}_${random}`
  }

  static encryptSensitiveData(data: any): string {
    // Em produção, usar uma biblioteca de criptografia real
    return btoa(JSON.stringify(data))
  }

  static validateSSL(): boolean {
    return window.location.protocol === "https:"
  }
}
