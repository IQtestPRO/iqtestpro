"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{isLogin ? "Entrar" : "Criar Conta"}</CardTitle>
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
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      placeholder="Digite sua idade"
                      type="number"
                      min="13"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Digite seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processando..." : isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
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
            >
              {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
