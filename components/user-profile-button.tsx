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
          <Comp className={cn(buttonVariants({ variant, size }), "gap-2", className)} ref={ref} {...props}>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            {showFullName && <span className="hidden sm:inline-block font-medium">Olá, {user.name.split(" ")[0]}</span>}
          </Comp>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            <User className="mr-2 h-4 w-4" />
            Meu Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/premium")}>
            <Settings className="mr-2 h-4 w-4" />
            Planos Premium
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)

UserProfileButton.displayName = "UserProfileButton"

export { UserProfileButton }
