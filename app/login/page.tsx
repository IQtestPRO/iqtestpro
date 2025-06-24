"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { OptimizedBackground } from "@/components/optimized-background"
import { Brain, Mail, Lock, User, Calendar } from "lucide-react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login, register } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha.",
      })
      return
    }

    setIsLoading(true)
    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para os planos premium...",
        })
        setTimeout(() => {
          router.push("/premium")
        }, 1500)
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao realizar login",
          description: "Email ou senha incorretos.",
        })
      }
    } catch (error) {
      console.error("Erro durante o login:", error)
      toast({
        variant: "destructive",
        title: "Erro ao realizar login",
        description: "Ocorreu um erro inesperado.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!name || !email || !age || !password) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
      })
      return
    }

    if (Number.parseInt(age) < 13 || Number.parseInt(age) > 120) {
      toast({
        variant: "destructive",
        title: "Idade inválida",
        description: "Por favor, insira uma idade válida (13-120 anos).",
      })
      return
    }

    setIsLoading(true)
    try {
      const success = await register(name, email, Number.parseInt(age), password)

      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Redirecionando para os planos premium...",
        })
        setTimeout(() => {
          router.push("/premium")
        }, 1500)
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao criar conta",
          description: "Email já cadastrado ou dados inválidos.",
        })
      }
    } catch (error) {
      console.error("Erro durante o registro:", error)
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Ocorreu um erro inesperado.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <OptimizedBackground />
      <div className="relative z-10 flex justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full animate-pulse" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold text-white">
              {isLogin ? "Entrar" : "Criar Conta"}
            </CardTitle>
            <p className="text-slate-400 text-sm mt-2">
              {isLogin ? "Acesse sua conta para continuar" : "Junte-se à nossa comunidade"}
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                isLogin ? handleLogin() : handleRegister()
              }}
            >
              <div className="grid gap-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Digite seu nome completo"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLogin}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Idade
                      </Label>
                      <Input
                        id="age"
                        placeholder="Digite sua idade"
                        type="number"
                        min="13"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required={!isLogin}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Digite seu email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Senha
                  </Label>
                  <Input
                    id="password"
                    placeholder="Digite sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : isLogin ? (
                    "Entrar"
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin)
                  // Limpar campos ao trocar de modo
                  setName("")
                  setAge("")
                  setEmail("")
                  setPassword("")
                }}
                disabled={isLoading}
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  Seguro
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Rápido
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Confiável
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
