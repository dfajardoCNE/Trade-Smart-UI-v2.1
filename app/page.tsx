"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Transition } from "motion"
import { BrokerSelectionScreen } from "@/components/screens/broker-selection-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { MainDashboard } from "@/components/screens/main-dashboard"

export type Broker = "iq-option" | "tradingview"
export type AccountType = "REAL" | "PRACTICE"
export type BotStatus = "stopped" | "running" | "connecting"
export type Language = "en" | "es"
export type Theme = "light" | "dark"

export interface UserData {
  username: string
  email: string
  accountType: AccountType
  balance: number
  broker: Broker
  avatar?: string
}

export interface AppState {
  currentScreen: "broker-selection" | "login" | "dashboard"
  selectedBroker: Broker | null
  userData: UserData | null
  botStatus: BotStatus
  language: Language
  theme: Theme
}
const screenTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

export default function TradingBotApp() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [appState, setAppState] = useState<AppState>(() => {
    let language: Language = "en"
    let theme: Theme = "light"
    if (typeof window !== "undefined") {
      language = (localStorage.getItem("language") as Language) || "en"
      theme = (localStorage.getItem("theme") as Theme) || "light"
    }
    return {
      currentScreen: "broker-selection",
      selectedBroker: null,
      userData: null,
      botStatus: "stopped",
      language,
      theme,
    }
  })

  // Sincronizar localStorage cuando cambian idioma o tema
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", appState.language)
      localStorage.setItem("theme", appState.theme)
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(appState.theme)
    }
  }, [appState.language, appState.theme])

  if (!mounted) return null

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState((prev) => ({ ...prev, ...updates }))
  }

  const goToScreen = (screen: AppState["currentScreen"]) => {
    setAppState((prev) => ({ ...prev, currentScreen: screen }))
  }

  const handleBrokerSelect = (broker: Broker) => {
    updateAppState({
      selectedBroker: broker,
      currentScreen: "login",
    })
  }

  const handleLogin = (userData: UserData) => {
    updateAppState({
      userData,
      currentScreen: "dashboard",
    })
  }

  const handleLogout = () => {
    updateAppState({
      userData: null,
      selectedBroker: null,
      currentScreen: "broker-selection",
      botStatus: "stopped",
    })
  }

  return (
    <div className={`min-h-screen ${appState.theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <AnimatePresence mode="wait">
          {appState.currentScreen === "broker-selection" && (
            <motion.div
              key="broker-selection"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={screenTransition}
              className="h-screen"
            >
              <BrokerSelectionScreen onBrokerSelect={handleBrokerSelect} />
            </motion.div>
          )}

          {appState.currentScreen === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={screenTransition}
              className="h-screen"
            >
              <LoginScreen
                broker={appState.selectedBroker!}
                onLogin={handleLogin}
                onBack={() => goToScreen("broker-selection")}
              />
            </motion.div>
          )}

          {appState.currentScreen === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={screenTransition}
              className="min-h-screen"
            >
              <MainDashboard
                userData={appState.userData!}
                botStatus={appState.botStatus}
                language={appState.language}
                theme={appState.theme}
                onLogout={handleLogout}
                onBotStatusChange={(status) => updateAppState({ botStatus: status })}
                onAccountTypeChange={(accountType) =>
                  updateAppState({
                    userData: { ...appState.userData!, accountType },
                  })
                }
                onLanguageChange={(language) => updateAppState({ language })}
                onThemeChange={(theme) => updateAppState({ theme })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
