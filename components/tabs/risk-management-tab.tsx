"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Target } from "lucide-react"
import type { Language } from "@/app/page"

interface RiskManagementTabProps {
  language: Language
}

const translations = {
  en: {
    dailyWinLimit: "Daily Win Limit",
    profitTarget: "Profit Target",
    lossProtection: "Loss Protection",
    maxWinningTrades: "Maximum Winning Trades",
    stopAfterWins: "Stop after {count} wins",
    targetPerTrade: "Target per Trade",
    perTrade: "${amount} per trade",
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
    perTrade: "${amount} por operación",
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

export function RiskManagementTab({ language, profitTarget, setProfitTarget, maxDailyLoss, setMaxDailyLoss }: RiskManagementTabProps & {
  profitTarget: number[];
  setProfitTarget: (v: number[]) => void;
  maxDailyLoss: number[];
  setMaxDailyLoss: (v: number[]) => void;
}) {
  const t = translations[language]

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
                {t.targetPerTrade}: ${profitTarget[0]}
              </Label>
              <Slider
                value={profitTarget}
                onValueChange={setProfitTarget}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
            </div>
            <Badge variant="outline" className="w-full justify-center">
              {t.perTrade.replace("{amount}", profitTarget[0].toString())}
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
                {t.maxDailyLoss}: ${maxDailyLoss[0]}
              </Label>
              <Slider
                value={maxDailyLoss}
                onValueChange={setMaxDailyLoss}
                max={100}
                min={10}
                step={1}
                className="w-full"
              />
            </div>
            <Badge variant="destructive" className="w-full justify-center">
              {t.stopAtLoss.replace("{amount}", maxDailyLoss[0].toString())}
            </Badge>
          </CardContent>
        </Card>
      </motion.div>

      {/* Barra de progreso visual de riesgo */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>{t.riskProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-red-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min((profitTarget[0] / maxDailyLoss[0]) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between w-full text-xs text-muted-foreground mt-1">
                <span>{t.objective}: ${profitTarget[0]}</span>
                <span>{t.lossLimit}: ${maxDailyLoss[0]}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Checklist de buenas prácticas */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
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
