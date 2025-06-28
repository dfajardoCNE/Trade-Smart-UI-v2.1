"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Transition } from "motion"
import { BrokerSelectionScreen } from "@/components/screens/broker-selection-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { MainDashboard } from "@/components/screens/main-dashboard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export type Broker = "iq-option" | "tradingview"
export type AccountType = "REAL" | "PRACTICE"
export type BotStatus = "stopped" | "running" | "connecting"
export type Language = "en" | "es"
export type Theme = "light" | "dark"

const isValidLanguage = (lang: string | null): lang is Language => {
  return lang === "en" || lang === "es";
};

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const storedLang = localStorage.getItem("language");
    if (isValidLanguage(storedLang)) {
      return storedLang;
    }
  }
  return "en";
};

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  }
  return "light";
};

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
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [appState, setAppState] = useState<AppState>(() => {
    const language = getInitialLanguage();
    const theme = getInitialTheme();
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

  if (!mounted) return <LoadingSpinner />

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState((prev) => ({ ...prev, ...updates }))
  }

  const goToScreen = (screen: AppState["currentScreen"]) => {
    setIsTransitioning(true);
    setAppState((prev) => ({ ...prev, currentScreen: screen }))
  }

  const handleBrokerSelect = (broker: Broker) => {
    setIsTransitioning(true);
    updateAppState({
      selectedBroker: broker,
      currentScreen: "login",
    })
  }

  const handleLogin = (userData: UserData) => {
    setIsTransitioning(true);
    updateAppState({
      userData,
      currentScreen: "dashboard",
    })
  }

  const handleLogout = () => {
    setIsTransitioning(true);
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
          {isTransitioning && (
            <motion.div
              key="loading-spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center z-40 bg-background/50 backdrop-blur-sm"
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {appState.currentScreen === "broker-selection" && (
            <motion.div
              key="broker-selection"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={screenTransition}
              className="h-screen"
              onAnimationComplete={() => setIsTransitioning(false)}
            >
              <BrokerSelectionScreen onBrokerSelect={handleBrokerSelect} language={appState.language} />
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
              onAnimationComplete={() => setIsTransitioning(false)}
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
              onAnimationComplete={() => setIsTransitioning(false)}
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
