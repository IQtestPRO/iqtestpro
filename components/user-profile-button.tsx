"use client"

import * as React from "react"
import { User, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonProps } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Brain, Trophy, Crown, BarChart3, HelpCircle } from "lucide-react"

interface UserProfileButtonProps extends Omit<ButtonProps, "children"> {
  showFullName?: boolean
}

const UserProfileButton = React.forwardRef<HTMLButtonElement, UserProfileButtonProps>(
  ({ className, variant = "ghost", size = "default", showFullName = true, ...props }, ref) => {
    const { user, logout } = useAuth()
    const router = useRouter()

    if (!user) return null

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    const handleLogout = () => {
      logout()
      router.push("/")
    }

    const Comp = "button" as const

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Comp
            className={cn(
              buttonVariants({ variant, size }),
              "gap-2 relative group hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 rounded-full border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-md",
              className,
            )}
            ref={ref}
            {...props}
          >
            <div className="relative">
              <Avatar className="h-7 w-7 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-blue-600 text-white font-semibold group-hover:from-primary/90 group-hover:to-blue-600/90 transition-all duration-300">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full animate-pulse" />
            </div>
            {showFullName && (
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {user.name.split(" ")[0]}
                </span>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Comp>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-72 p-2 bg-background/95 backdrop-blur-md border border-border/50 shadow-xl rounded-xl"
        >
          {/* User Info Header */}
          <div className="px-3 py-4 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/30">
                <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-blue-600 text-white font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online agora</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="py-2">
            <DropdownMenuLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navegação
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => router.push("/dashboard")}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group cursor-pointer"
            >
              <User className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium">Meu Perfil</div>
                <div className="text-xs text-muted-foreground">Gerenciar conta e configurações</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/test")}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group cursor-pointer"
            >
              <Brain className="mr-3 h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium">Fazer Teste</div>
                <div className="text-xs text-muted-foreground">Iniciar novo teste de QI</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/ranking")}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group cursor-pointer"
            >
              <Trophy className="mr-3 h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium">Ranking</div>
                <div className="text-xs text-muted-foreground">Ver classificação global</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/premium")}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 dark:hover:from-amber-900/20 dark:hover:to-yellow-900/20 transition-all duration-200 group cursor-pointer"
            >
              <Crown className="mr-3 h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium flex items-center">
                  Premium
                  <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full">
                    PRO
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Recursos exclusivos</div>
              </div>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="my-2 bg-border/50" />

          {/* Account Section */}
          <div className="py-2">
            <DropdownMenuLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Conta
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => router.push("/results")}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group cursor-pointer"
            >
              <BarChart3 className="mr-3 h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium">Meus Resultados</div>
                <div className="text-xs text-muted-foreground">Histórico de testes</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/faq")}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group cursor-pointer"
            >
              <HelpCircle className="mr-3 h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium">Ajuda & FAQ</div>
                <div className="text-xs text-muted-foreground">Perguntas frequentes</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="mx-1 px-3 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group cursor-pointer">
              <Settings className="mr-3 h-5 w-5 text-gray-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-medium">Configurações</div>
                <div className="text-xs text-muted-foreground">Preferências da conta</div>
              </div>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="my-2 bg-border/50" />

          {/* Sign Out Section */}
          <div className="p-2">
            <DropdownMenuItem
              onClick={handleLogout}
              className="mx-1 px-3 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 group cursor-pointer border border-transparent hover:border-red-200 dark:hover:border-red-800"
            >
              <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              <div className="flex-1">
                <div className="font-semibold">Sair da Conta</div>
                <div className="text-xs opacity-75">Fazer logout com segurança</div>
              </div>
            </DropdownMenuItem>
          </div>

          {/* Footer */}
          <div className="px-3 py-2 border-t border-border/50 mt-2">
            <div className="text-xs text-muted-foreground text-center">
              Logado há {Math.floor(Math.random() * 24) + 1}h
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)

UserProfileButton.displayName = "UserProfileButton"

export { UserProfileButton }
