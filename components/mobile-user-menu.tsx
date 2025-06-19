"use client"

import * as React from "react"
import { User, LogOut, Settings, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function MobileUserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

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
    setOpen(false)
    router.push("/")
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "sm:hidden gap-2")}>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => handleNavigation("/dashboard")}
            className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-accent"
          >
            <User className="h-5 w-5" />
            Meu Perfil
          </button>
          <button
            onClick={() => handleNavigation("/premium")}
            className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-accent"
          >
            <Settings className="h-5 w-5" />
            Planos Premium
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-accent text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
