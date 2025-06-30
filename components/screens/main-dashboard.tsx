"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserData, BotStatus, AccountType, Language, Theme } from "@/app/page"
import { TradingTab } from "@/components/tabs/trading-tab"
import { RiskManagementTab } from "@/components/tabs/risk-management-tab"
import { MartingaleTab } from "@/components/tabs/martingale-tab"
import { TooltipProvider } from "@/components/animate-ui/components/tooltip"
import { UserProfileSection } from "@/components/ui/user-profile-section"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageSelector } from "@/components/ui/language-selector"
import { NotificationBell } from "@/components/ui/notification-bell"
import { FloatingExecutionBot } from "@/components/ui/floating-execution-bot"
import { AccountTypeDropdown } from "@/components/ui/account-type-dropdown"
import { useTradingTabValidation } from "@/hooks/use-trading-tab-validation"
import { AppFooter } from "@/components/ui/app-footer"

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
}: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState("trading")
  const [profitTarget, setProfitTarget] = useState<number[]>([100])
  const [maxDailyLoss, setMaxDailyLoss] = useState<number[]>([10])
  const t = translations[initialLanguage]

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang)
  }
  const handleThemeChange = (th: Theme) => {
    onThemeChange(th)
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

  const canStartBot = useTradingTabValidation();

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="top-0 left-0 w-full bg-card dark:bg-card border-b border-border dark:border-border shadow-sm z-30 pb-4"
        >
          <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                {/* User Profile Section */}
                <UserProfileSection
                  userData={userData}
                  onAccountTypeChange={onAccountTypeChange}
                  onLogout={onLogout}
                  language={initialLanguage}
                />
              </div>

              <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0 flex-wrap">
                {/* Balance y AccountTypeDropdown juntos */}
                <div className="flex items-center gap-2">
                  <AccountTypeDropdown
                    accountType={userData.accountType}
                    balance={userData.balance}
                    language={initialLanguage}
                    onChange={onAccountTypeChange}
                  />
                </div>
                {/* Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-center mt-2 sm:mt-0">
                  <NotificationBell language={initialLanguage} tooltipSide="bottom" />
                  <LanguageSelector currentLanguage={initialLanguage} onLanguageChange={handleLanguageChange} tooltipSide="bottom" />
                  <ThemeToggle currentTheme={initialTheme} onThemeChange={handleThemeChange} tooltipSide="bottom" />
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pt-[30px] pb-[12rem] relative min-h-screen">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trading">{t.trading}</TabsTrigger>
                <TabsTrigger value="risk">{t.riskManagement}</TabsTrigger>
                <TabsTrigger value="martingale">{t.martingale}</TabsTrigger>
              </TabsList>

              <TabsContent value="trading">
                <TradingTab language={initialLanguage} />
              </TabsContent>

              <TabsContent value="risk">
                <RiskManagementTab
                  language={initialLanguage}
                  profitTarget={profitTarget}
                  setProfitTarget={setProfitTarget}
                  maxDailyLoss={maxDailyLoss}
                  setMaxDailyLoss={setMaxDailyLoss}
                />
              </TabsContent>

              <TabsContent value="martingale">
                <MartingaleTab language={initialLanguage} />
              </TabsContent>
            </Tabs>
            <FloatingExecutionBot
              botStatus={botStatus}
              getBotStatusColor={getBotStatusColor}
              getBotStatusText={getBotStatusText}
              onStart={handleStartBot}
              onStop={handleStopBot}
              t={t}
              canStart={canStartBot}
            />
          </motion.div>
        </main>
        <AppFooter className="fixed bottom-0 left-0 right-0 z-40" language={initialLanguage} />
      </div>
    </TooltipProvider>
  )
}
