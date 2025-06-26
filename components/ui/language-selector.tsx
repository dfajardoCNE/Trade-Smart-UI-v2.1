"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import type { Language } from "@/app/page"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/tooltip"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
}

export function LanguageSelector({ currentLanguage, onLanguageChange, tooltipSide = "top" }: LanguageSelectorProps & { tooltipSide?: "top" | "bottom" | "left" | "right" }) {
  return (
    <Tooltip side={tooltipSide}>
      <DropdownMenu>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 dark:text-muted-foreground">
              <Languages className="h-4 w-4" />
              <span className="text-sm">{languages[currentLanguage].flag}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent align="end" className="bg-popover dark:bg-popover border-border dark:border-border">
          {Object.entries(languages).map(([code, lang]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => onLanguageChange(code as Language)}
              className="flex items-center gap-2 text-popover-foreground dark:text-popover-foreground hover:bg-accent dark:hover:bg-accent"
            >
              <span>{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p>Change language</p>
      </TooltipContent>
    </Tooltip>
  )
}
