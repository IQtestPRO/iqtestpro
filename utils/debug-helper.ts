// Utilitário para debug e monitoramento de problemas

export class DebugHelper {
  private static logs: Array<{ timestamp: number; level: string; message: string; data?: any }> = []

  static log(level: "info" | "warn" | "error", message: string, data?: any) {
    const logEntry = {
      timestamp: Date.now(),
      level,
      message,
      data,
    }

    this.logs.push(logEntry)

    // Manter apenas os últimos 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100)
    }

    // Log no console apenas em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console[level](`[${new Date().toISOString()}] ${message}`, data || "")
    }
  }

  static getLogs() {
    return [...this.logs]
  }

  static clearLogs() {
    this.logs = []
  }

  static exportLogs() {
    return JSON.stringify(this.logs, null, 2)
  }

  // Monitorar performance de componentes
  static measurePerformance(name: string, fn: () => void) {
    const start = performance.now()
    try {
      fn()
    } finally {
      const end = performance.now()
      this.log("info", `Performance: ${name}`, { duration: `${(end - start).toFixed(2)}ms` })
    }
  }

  // Detectar problemas comuns
  static checkForCommonIssues() {
    const issues: string[] = []

    // Verificar localStorage
    try {
      const testData = localStorage.getItem("purchasedTest")
      if (testData) {
        JSON.parse(testData) // Verificar se é JSON válido
      }
    } catch (e) {
      issues.push("localStorage corrompido")
      localStorage.removeItem("purchasedTest")
    }

    // Verificar se há múltiplos modais abertos
    const openModals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]')
    if (openModals.length > 1) {
      issues.push(`Múltiplos modais abertos: ${openModals.length}`)
    }

    // Verificar memory leaks potenciais
    const eventListeners = (window as any).getEventListeners?.(document) || {}
    const listenerCount = Object.values(eventListeners).reduce((total: number, listeners: any) => {
      return total + (Array.isArray(listeners) ? listeners.length : 0)
    }, 0)

    if (listenerCount > 50) {
      issues.push(`Muitos event listeners: ${listenerCount}`)
    }

    return issues
  }
}

// Função para limpar dados corrompidos
export function cleanupCorruptedData() {
  const keysToCheck = ["purchasedTest", "testPaid", "iqTestResult", "premiumTestResult"]

  keysToCheck.forEach((key) => {
    try {
      const data = localStorage.getItem(key)
      if (data && data !== "true" && data !== "false") {
        JSON.parse(data) // Verificar se é JSON válido
      }
    } catch (e) {
      console.warn(`Removendo dados corrompidos: ${key}`)
      localStorage.removeItem(key)
    }
  })
}

// Auto-limpeza na inicialização
if (typeof window !== "undefined") {
  cleanupCorruptedData()
}
