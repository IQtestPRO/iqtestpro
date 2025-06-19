// Validações de pagamento
export class PaymentValidator {
  static validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, "")

    // Luhn Algorithm
    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(cleaned.charAt(i), 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0 && cleaned.length >= 13 && cleaned.length <= 19
  }

  static validateExpiryDate(expiryDate: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(expiryDate)) return false

    const [month, year] = expiryDate.split("/").map(Number)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1

    if (year < currentYear) return false
    if (year === currentYear && month < currentMonth) return false

    return true
  }

  static validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv)
  }

  static validateCPF(cpf: string): boolean {
    const cleaned = cpf.replace(/\D/g, "")

    if (cleaned.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleaned)) return false

    // Validate first digit
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cleaned.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cleaned.charAt(9))) return false

    // Validate second digit
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(cleaned.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cleaned.charAt(10))) return false

    return true
  }

  static validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  static getCardType(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, "")

    if (/^4/.test(cleaned)) return "visa"
    if (/^5[1-5]/.test(cleaned)) return "mastercard"
    if (/^3[47]/.test(cleaned)) return "amex"
    if (/^6(?:011|5)/.test(cleaned)) return "discover"
    if (/^4011|^4312|^4389|^4514|^4573/.test(cleaned)) return "elo"

    return "unknown"
  }
}
