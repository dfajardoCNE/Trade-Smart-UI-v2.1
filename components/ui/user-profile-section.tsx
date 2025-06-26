"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Settings, User } from "lucide-react"
import type { UserData, AccountType, Language } from "@/app/page"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/tooltip"
import { AccountTypeDropdown } from "@/components/ui/account-type-dropdown"
import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface UserProfileSectionProps {
  userData: UserData
  onAccountTypeChange: (accountType: AccountType) => void
  onLogout: () => void
  language: Language
}

const translations = {
  en: {
    practice: "PRACTICE",
    real: "REAL",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    switchAccount: "Switch Account Type",
  },
  es: {
    practice: "PRÁCTICA",
    real: "REAL",
    settings: "Configuración",
    profile: "Perfil",
    logout: "Cerrar Sesión",
    switchAccount: "Cambiar Tipo de Cuenta",
  },
}

export function UserProfileSection({ userData, onAccountTypeChange, onLogout, language }: UserProfileSectionProps) {
  const [open, setOpen] = useState(false)
  const t = translations[language]
  const brokerName = userData.broker === "iq-option" ? "IQ Option" : "TradingView"

  return (
    <div className="flex items-center gap-4 flex-wrap justify-center w-full">
      {/* Avatar and User Info */}
      <div className="flex items-center gap-3">
        <Tooltip side="bottom">
          <TooltipTrigger>
            <Avatar className="h-10 w-10 border-2 border-background shadow-md">
              <AvatarImage
              src={userData.avatar || "/avatar.png"}
              alt={userData.username}
              loading="lazy"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {userData.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
        </Tooltip>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold dark:text-slate-50">{userData.username}</h1>
            <Badge variant="outline" className="text-xs">
              {brokerName}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
        </div>
      </div>

      {/* Botón de logout con diálogo de confirmación */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-red-600 hover:bg-accent/40 border"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {language === "en" ? "Confirm Logout" : "Confirmar cierre de sesión"}
          </DialogTitle>
          <p>
            {language === "en"
              ? "Are you sure you want to log out?"
              : "¿Estás seguro que deseas cerrar sesión?"}
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {language === "en" ? "Cancel" : "Cancelar"}
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false)
                onLogout()
              }}
            >
              {language === "en" ? "Logout" : "Cerrar sesión"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
