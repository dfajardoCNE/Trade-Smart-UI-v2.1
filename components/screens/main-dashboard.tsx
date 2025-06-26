"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Square, Activity } from "lucide-react"
import type { UserData, BotStatus, AccountType, Language, Theme } from "@/app/page"
import { TradingTab } from "@/components/tabs/trading-tab"
import { RiskManagementTab } from "@/components/tabs/risk-management-tab"
import { MartingaleTab } from "@/components/tabs/martingale-tab"
import { TooltipProvider } from "@/components/animate-ui/components/tooltip"
import { UserProfileSection } from "@/components/ui/user-profile-section"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelector } from "@/components/ui/language-selector"
import { NotificationBell } from "@/components/ui/notification-bell"
import { Badge } from "@/components/ui/badge"
import { FloatingExecutionBot } from "@/components/ui/floating-execution-bot"
import { AccountTypeDropdown } from "@/components/ui/account-type-dropdown"

interface MainDashboardProps {
  userData: UserData
  botStatus: BotStatus
  language: Language
  theme: Theme
  onLogout: () => void
  onBotStatusChange: (status: BotStatus) => void
  onAccountTypeChange: (accountType: AccountType) => void
  onLanguageChange: (language: Language) => void
  onThemeChange: (theme: Theme) => void
}

const translations = {
  en: {
    back: "Back",
    balance: "Balance",
    running: "Running",
    connecting: "Connecting...",
    stopped: "Stopped",
    startBot: "Start Bot",
    stopBot: "Stop Bot",
    trading: "Trading",
    riskManagement: "Risk Management",
    martingale: "Martingale",
    notifications: "Notifications",
  },
  es: {
    back: "Atrás",
    balance: "Saldo",
    running: "Ejecutándose",
    connecting: "Conectando...",
    stopped: "Detenido",
    startBot: "Iniciar Bot",
    stopBot: "Detener Bot",
    trading: "Trading",
    riskManagement: "Gestión de Riesgo",
    martingale: "Martingala",
    notifications: "Notificaciones",
  },
}

export function MainDashboard({
  userData,
  botStatus,
  language: initialLanguage,
  theme: initialTheme,
  onLogout,
  onBotStatusChange,
  onAccountTypeChange,
  onLanguageChange,
  onThemeChange,
}: Omit<MainDashboardProps, 'onBack'>) {
  // Leer idioma y tema de localStorage si existen, si no usar los props
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || initialLanguage
    }
    return initialLanguage
  })
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || initialTheme
    }
    return initialTheme
  })
  const [activeTab, setActiveTab] = useState("trading")
  const [profitTarget, setProfitTarget] = useState<number[]>([100])
  const [maxDailyLoss, setMaxDailyLoss] = useState<number[]>([10])
  const t = translations[language]

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  // Aplica la clase de tema globalmente al <html> cuando cambia el tema
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(theme)
    }
  }, [theme])

  // Sincronizar localStorage con el padre al montar (solo si hay diferencia)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language") as Language | null
      if (storedLang && storedLang !== initialLanguage) {
        onLanguageChange(storedLang)
      }
      const storedTheme = localStorage.getItem("theme") as Theme | null
      if (storedTheme && storedTheme !== initialTheme) {
        onThemeChange(storedTheme)
      }
    }
    // Solo en el primer render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Setters que actualizan localStorage y llaman a los callbacks externos
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    onLanguageChange(lang)
  }
  const handleThemeChange = (th: Theme) => {
    setTheme(th)
    onThemeChange(th)
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(th)
    }
  }

  const handleStartBot = () => {
    onBotStatusChange("connecting")
    setTimeout(() => onBotStatusChange("running"), 2000)
  }

  const handleStopBot = () => {
    onBotStatusChange("stopped")
  }

  const getBotStatusColor = () => {
    switch (botStatus) {
      case "running":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "stopped":
        return "bg-red-500"
    }
  }

  const getBotStatusText = () => {
    switch (botStatus) {
      case "running":
        return t.running
      case "connecting":
        return t.connecting
      case "stopped":
        return t.stopped
    }
  }

  const getBalanceColor = () => {
    return userData.accountType === "REAL"
      ? "text-green-600 dark:text-green-400"
      : "text-orange-600 dark:text-orange-400"
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card dark:bg-card border-b border-border dark:border-border shadow-sm"
        >
          <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                {/* User Profile Section */}
                <UserProfileSection
                  userData={userData}
                  onAccountTypeChange={onAccountTypeChange}
                  onLogout={onLogout}
                  language={language}
                />
              </div>

              <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0 flex-wrap">
                {/* Balance y AccountTypeDropdown juntos */}
                <div className="flex items-center gap-2">
                  <AccountTypeDropdown
                    accountType={userData.accountType}
                    balance={userData.balance}
                    language={language}
                    onChange={onAccountTypeChange}
                  />
                </div>
                {/* Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-center mt-2 sm:mt-0">
                  <NotificationBell language={language} tooltipSide="bottom" />
                  <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} tooltipSide="bottom" />
                  <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} tooltipSide="bottom" />
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 pb-32 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trading">{t.trading}</TabsTrigger>
                <TabsTrigger value="risk">{t.riskManagement}</TabsTrigger>
                <TabsTrigger value="martingale">{t.martingale}</TabsTrigger>
              </TabsList>

              <TabsContent value="trading">
                <TradingTab language={language} />
              </TabsContent>

              <TabsContent value="risk">
                <RiskManagementTab
                  language={language}
                  profitTarget={profitTarget}
                  setProfitTarget={setProfitTarget}
                  maxDailyLoss={maxDailyLoss}
                  setMaxDailyLoss={setMaxDailyLoss}
                />
              </TabsContent>

              <TabsContent value="martingale">
                <MartingaleTab language={language} />
              </TabsContent>
            </Tabs>
            <FloatingExecutionBot
              botStatus={botStatus}
              getBotStatusColor={getBotStatusColor}
              getBotStatusText={getBotStatusText}
              onStart={handleStartBot}
              onStop={handleStopBot}
              t={t}
            />
          </motion.div>
        </main>
      </div>
    </TooltipProvider>
  )
}
