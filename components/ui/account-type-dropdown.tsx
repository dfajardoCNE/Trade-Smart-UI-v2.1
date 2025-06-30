"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AccountType, Language } from "@/app/page"

const translations = {
  en: {
    practice: "PRACTICE",
    real: "REAL",
    practiceLabel: "Practice",
    realLabel: "Real",
    reload: "Reload",
  },
  es: {
    practice: "PRÁCTICA",
    real: "REAL",
    practiceLabel: "Práctica",
    realLabel: "Real",
    reload: "Recargar",
  },
}

interface AccountTypeDropdownProps {
  accountType: AccountType
  balance: number
  language: Language
  onChange: (type: AccountType) => void
}

export function AccountTypeDropdown({ accountType, balance, language, onChange }: AccountTypeDropdownProps) {
  const t = translations[language]
  const isPractice = accountType === "PRACTICE"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 dark:bg-card/80 border border-border shadow-md hover:bg-accent/60 focus:outline-none"
        >
          <span className={`text-base font-semibold ${isPractice ? "text-orange-600 dark:text-orange-400" : "text-green-600 dark:text-green-400"}`}>
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-muted-foreground uppercase">
            {isPractice ? t.practiceLabel : t.realLabel}
          </span>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => onChange("PRACTICE")}
          className={isPractice ? "font-bold text-orange-600 dark:text-orange-400 flex items-center justify-between" : "flex items-center justify-between"}
        >
          <span>{t.practiceLabel}</span>
          {isPractice && (
            <button
              type="button"
              className="ml-2 text-xs text-blue-600 hover:underline focus:outline-none"
              onClick={e => {
                e.stopPropagation();
                // TODO: Implementar la lógica de recarga aquí
                alert(t.reload);
              }}
            >
              {t.reload}
            </button>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("REAL")}
          className={!isPractice ? "font-bold text-green-600 dark:text-green-400" : ""}
        >
          {t.realLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
