// Script para verificar problemas antes do build
import { execSync } from "child_process"
import fs from "fs"
import path from "path"

interface BuildIssue {
  type: "error" | "warning"
  message: string
  solution: string
}

class BuildChecker {
  private issues: BuildIssue[] = []

  async checkAll() {
    console.log("🔍 Verificando problemas de build...\n")

    this.checkPackageJson()
    this.checkNextConfig()
    this.checkTypeScript()
    this.checkDependencies()
    this.checkFileSize()
    this.checkMemoryUsage()

    this.reportIssues()
  }

  private checkPackageJson() {
    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

      // Verificar scripts essenciais
      if (!packageJson.scripts?.build) {
        this.issues.push({
          type: "error",
          message: "Script de build não encontrado",
          solution: 'Adicione "build": "next build" em scripts',
        })
      }

      // Verificar dependências críticas
      const criticalDeps = ["next", "react", "react-dom"]
      criticalDeps.forEach((dep) => {
        if (!packageJson.dependencies?.[dep]) {
          this.issues.push({
            type: "error",
            message: `Dependência crítica ausente: ${dep}`,
            solution: `Execute: npm install ${dep}`,
          })
        }
      })
    } catch (error) {
      this.issues.push({
        type: "error",
        message: "package.json inválido ou não encontrado",
        solution: "Verifique se o package.json existe e está bem formatado",
      })
    }
  }

  private checkNextConfig() {
    const configFiles = ["next.config.js", "next.config.mjs", "next.config.ts"]
    const configExists = configFiles.some((file) => fs.existsSync(file))

    if (configExists) {
      try {
        // Verificar configurações problemáticas
        const configContent = fs.readFileSync(configFiles.find((file) => fs.existsSync(file))!, "utf8")

        if (configContent.includes('runtime: "edge"')) {
          this.issues.push({
            type: "warning",
            message: "Runtime edge pode causar problemas com AI SDK",
            solution: 'Remova runtime: "edge" das rotas de API que usam AI SDK',
          })
        }
      } catch (error) {
        this.issues.push({
          type: "warning",
          message: "Erro ao ler next.config",
          solution: "Verifique a sintaxe do arquivo de configuração",
        })
      }
    }
  }

  private checkTypeScript() {
    if (fs.existsSync("tsconfig.json")) {
      try {
        execSync("npx tsc --noEmit", { stdio: "pipe" })
        console.log("✅ TypeScript: Sem erros de tipo")
      } catch (error) {
        this.issues.push({
          type: "error",
          message: "Erros de TypeScript encontrados",
          solution: 'Execute "npx tsc --noEmit" para ver os erros detalhados',
        })
      }
    }
  }

  private checkDependencies() {
    try {
      execSync("npm ls", { stdio: "pipe" })
      console.log("✅ Dependências: Todas instaladas corretamente")
    } catch (error) {
      this.issues.push({
        type: "warning",
        message: "Problemas com dependências detectados",
        solution: 'Execute "npm install" ou "npm audit fix"',
      })
    }
  }

  private checkFileSize() {
    const checkDirectory = (dir: string, maxSize: number = 50 * 1024 * 1024) => {
      if (!fs.existsSync(dir)) return

      const files = fs.readdirSync(dir, { recursive: true })
      let totalSize = 0

      files.forEach((file) => {
        const filePath = path.join(dir, file.toString())
        if (fs.statSync(filePath).isFile()) {
          const size = fs.statSync(filePath).size
          totalSize += size

          if (size > 10 * 1024 * 1024) {
            // 10MB
            this.issues.push({
              type: "warning",
              message: `Arquivo muito grande: ${file} (${(size / 1024 / 1024).toFixed(2)}MB)`,
              solution: "Considere otimizar ou mover para CDN",
            })
          }
        }
      })

      if (totalSize > maxSize) {
        this.issues.push({
          type: "warning",
          message: `Diretório ${dir} muito grande: ${(totalSize / 1024 / 1024).toFixed(2)}MB`,
          solution: "Otimize assets ou use CDN para arquivos grandes",
        })
      }
    }

    checkDirectory("public")
    checkDirectory("components")
  }

  private checkMemoryUsage() {
    const memUsage = process.memoryUsage()
    const heapUsedMB = memUsage.heapUsed / 1024 / 1024

    if (heapUsedMB > 500) {
      this.issues.push({
        type: "warning",
        message: `Alto uso de memória: ${heapUsedMB.toFixed(2)}MB`,
        solution: "Considere otimizar imports e componentes",
      })
    }
  }

  private reportIssues() {
    console.log("\n📋 RELATÓRIO DE PROBLEMAS:\n")

    if (this.issues.length === 0) {
      console.log("✅ Nenhum problema encontrado! Projeto pronto para build.")
      return
    }

    const errors = this.issues.filter((i) => i.type === "error")
    const warnings = this.issues.filter((i) => i.type === "warning")

    if (errors.length > 0) {
      console.log("🚨 ERROS CRÍTICOS:")
      errors.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.message}`)
        console.log(`   💡 Solução: ${issue.solution}\n`)
      })
    }

    if (warnings.length > 0) {
      console.log("⚠️  AVISOS:")
      warnings.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.message}`)
        console.log(`   💡 Solução: ${issue.solution}\n`)
      })
    }

    console.log(`\n📊 Total: ${errors.length} erros, ${warnings.length} avisos`)

    if (errors.length > 0) {
      console.log("\n❌ Corrija os erros críticos antes de fazer o deploy!")
      process.exit(1)
    }
  }
}

// Executar verificação
const checker = new BuildChecker()
checker.checkAll().catch(console.error)
