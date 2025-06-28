"use client"

import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Target } from "lucide-react"
import type { Language } from "@/app/page"

interface RiskManagementTabProps {
  language: Language
  profitTarget: number[]
  setProfitTarget: Dispatch<SetStateAction<number[]>>
  maxDailyLoss: number[]
  setMaxDailyLoss: Dispatch<SetStateAction<number[]>>
}

const translations = {
  en: {
    dailyWinLimit: "Daily Win Limit",
    profitTarget: "Profit Target",
    lossProtection: "Loss Protection",
    maxWinningTrades: "Maximum Winning Trades",
    stopAfterWins: "Stop after {count} wins",
    targetPerTrade: "Target per Trade",
    generalTarget: "${amount} de objetivo general",
    maxDailyLoss: "Maximum Daily Loss",
    stopAtLoss: "Stop at -${amount}",
    riskSummary: "Risk Management Summary",
    maxDailyWins: "Max Daily Wins",
    maxLoss: "Max Loss",
    // NUEVAS CLAVES
    riskProgress: "Daily Risk Progress",
    objective: "Objective",
    lossLimit: "Loss Limit",
    checklistTitle: "Pre-trade Checklist",
    checklist: [
      "Have I defined my maximum risk for today?",
      "Is my profit target clear?",
      "Am I trading with discipline and without emotions?",
      "Have I reviewed market conditions?",
      "Am I willing to stop if I reach the limit?",
    ],
    adviceTitle: "Tip",
    adviceText:
      "Remember: risk management is key to success. Do not increase risk after a losing streak and avoid trading under emotions.",
  },
  es: {
    dailyWinLimit: "Límite Diario de Ganancias",
    profitTarget: "Objetivo de Ganancia",
    lossProtection: "Protección de Pérdidas",
    maxWinningTrades: "Máximo de Operaciones Ganadoras",
    stopAfterWins: "Parar después de {count} ganancias",
    targetPerTrade: "Objetivo por Operación",
    generalTarget: "${amount} de objetivo general",
    maxDailyLoss: "Máxima Pérdida Diaria",
    stopAtLoss: "Parar en -${amount}",
    riskSummary: "Resumen de Gestión de Riesgo",
    maxDailyWins: "Máx. Ganancias Diarias",
    maxLoss: "Máx. Pérdida",
    // NUEVAS CLAVES
    riskProgress: "Progreso de riesgo diario",
    objective: "Objetivo",
    lossLimit: "Límite de pérdida",
    checklistTitle: "Checklist antes de operar",
    checklist: [
      "¿He definido mi riesgo máximo para hoy?",
      "¿Tengo claro mi objetivo de ganancia?",
      "¿Estoy operando con disciplina y sin emociones?",
      "¿He revisado las condiciones del mercado?",
      "¿Estoy dispuesto a detenerme si alcanzo el límite?",
    ],
    adviceTitle: "Consejo",
    adviceText:
      "Recuerda: la gestión de riesgo es clave para el éxito. No aumentes el riesgo tras una racha de pérdidas y evita operar bajo emociones.",
  },
}

// Helpers para localStorage con objeto único para este tab
function getRiskManagementTabState() {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem("riskManagementTab_state");
    if (!val) return null;
    return JSON.parse(val);
  } catch {
    return null;
  }
}
function setRiskManagementTabState(newState: any) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("riskManagementTab_state", JSON.stringify(newState));
  } catch {}
}

export function RiskManagementTab({ language, profitTarget, setProfitTarget, maxDailyLoss, setMaxDailyLoss }: RiskManagementTabProps) {
  const t = translations[language]
  // Estado persistente
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = getRiskManagementTabState();
      return saved || {
        profitTarget: [100],
        maxDailyLoss: [20],
        profitPercentPerTrade: [50],
      };
    }
    return {
      profitTarget: [100],
      maxDailyLoss: [20],
      profitPercentPerTrade: [50],
    };
  });

  // Sincronizar localStorage cuando cambie el estado
  useEffect(() => {
    setRiskManagementTabState(state);
  }, [state]);

  // Leer siempre el estado más reciente de localStorage al montar y cuando cambie la clave desde otra pestaña
  useEffect(() => {
    function syncFromStorage() {
      const latest = getRiskManagementTabState();
      if (latest) setState(latest);
    }
    window.addEventListener("storage", syncFromStorage);
    syncFromStorage();
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 md:grid-cols-2">
        {/* Profit Target */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-500" />
              {t.profitTarget}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                {t.profitTarget}: ${state.profitTarget[0]}
              </Label>
              <Slider
                value={state.profitTarget}
                onValueChange={v => setState((s: typeof state) => ({ ...s, profitTarget: v }))}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
            </div>
            <Badge variant="outline" className="w-full justify-center">
              {t.generalTarget.replace("{amount}", state.profitTarget[0].toString())}
            </Badge>
          </CardContent>
        </Card>

        {/* Porcentaje de ganancia por trade */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-green-500" />
              {language === "es" ? "Ganancia por Trade" : "Profit per Trade"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                {language === "es" ? "Porcentaje deseado por operación" : "Desired percent per trade"}: {state.profitPercentPerTrade[0]}%
              </Label>
              <Slider
                value={state.profitPercentPerTrade}
                onValueChange={v => setState((s: typeof state) => ({ ...s, profitPercentPerTrade: v }))}
                max={99}
                min={50}
                step={1}
                className="w-full"
              />
            </div>
            <Badge variant="outline" className="w-full justify-center">
              {state.profitPercentPerTrade[0]}% {language === "es" ? "de ganancia por operación" : "profit per trade"}
            </Badge>
          </CardContent>
        </Card>

        {/* Max Daily Loss */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="h-5 w-5 text-red-500" />
              {t.lossProtection}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                {t.maxDailyLoss}: ${state.maxDailyLoss[0]}
              </Label>
              <Slider
                value={state.maxDailyLoss}
                onValueChange={v => setState((s: typeof state) => ({ ...s, maxDailyLoss: v }))}
                max={100}
                min={10}
                step={1}
                className="w-full"
              />
            </div>
            <Badge variant="destructive" className="w-full justify-center">
              {t.stopAtLoss.replace("{amount}", state.maxDailyLoss[0].toString())}
            </Badge>
          </CardContent>
        </Card>

        {/* Checklist de buenas prácticas */}
        <Card>
          <CardHeader>
            <CardTitle>{t.checklistTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {t.checklist.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Consideración extra: sugerencia de no operar con emociones */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>{t.adviceTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-left text-sm text-muted-foreground">
              {t.adviceText}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
