"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Save } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Language } from "@/app/page"

interface MartingaleTabProps {
  language: Language
}

interface MartingaleTabState {
  martingaleEnabled: boolean;
  multiplier: number;
  maxSteps: number;
}

const translations = {
  en: {
    warning: "Warning:",
    warningText:
      "Martingale strategy involves exponentially increasing trade sizes after losses. Use with extreme caution and proper risk management.",
    martingaleSettings: "Martingale Settings",
    enableMartingale: "Enable Martingale System",
    enableDescription: "Double down after losses to recover",
    multiplier: "Multiplier",
    multiplierDescription: "Trade size multiplier after each loss",
    maxSteps: "Maximum Steps",
    maxStepsDescription: "Maximum number of consecutive martingale steps",
    riskAnalysis: "Risk Analysis",
    totalRiskMultiplier: "Total Risk Multiplier:",
    stepProgression: "Step Progression:",
    step: "Step",
    riskWarning: "If you lose {steps} trades in a row, you'll risk {multiplier}x your initial trade amount to recover.",
    enableToSeeRisk: "Enable Martingale to see risk analysis",
    saveConfiguration: "Save Configuration",
  },
  es: {
    warning: "Advertencia:",
    warningText:
      "La estrategia Martingala implica aumentar exponencialmente el tamaño de las operaciones después de las pérdidas. Úsala con extrema precaución y gestión de riesgo adecuada.",
    martingaleSettings: "Configuración de Martingala",
    enableMartingale: "Habilitar Sistema Martingala",
    enableDescription: "Doblar después de pérdidas para recuperar",
    multiplier: "Multiplicador",
    multiplierDescription: "Multiplicador del tamaño de operación después de cada pérdida",
    maxSteps: "Pasos Máximos",
    maxStepsDescription: "Número máximo de pasos consecutivos de martingala",
    riskAnalysis: "Análisis de Riesgo",
    totalRiskMultiplier: "Multiplicador de Riesgo Total:",
    stepProgression: "Progresión de Pasos:",
    step: "Paso",
    riskWarning:
      "Si pierdes {steps} operaciones seguidas, arriesgarás {multiplier}x tu cantidad inicial de operación para recuperarte.",
    enableToSeeRisk: "Habilita Martingala para ver el análisis de riesgo",
    saveConfiguration: "Guardar Configuración",
  },
}

// Custom hook for localStorage management
function useMartingaleLocalStorage() {
  const STORAGE_KEY = "martingaleTab_state";

  const defaultState: MartingaleTabState = {
    martingaleEnabled: false,
    multiplier: 2,
    maxSteps: 3,
  };

  function getStoredState(): MartingaleTabState {
    if (typeof window === "undefined") return defaultState;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultState, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error("Failed to parse martingaleTab_state from localStorage:", error);
    }
    return defaultState;
  }

  function setStoredState(newState: MartingaleTabState) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to save martingaleTab_state to localStorage:", error);
    }
  }

  return { getStoredState, setStoredState, STORAGE_KEY, defaultState };
}

export function MartingaleTab({ language }: MartingaleTabProps) {
  const t = translations[language]
  const { getStoredState, setStoredState, STORAGE_KEY, defaultState } = useMartingaleLocalStorage();

  // State
  const [state, setState] = useState<MartingaleTabState>(getStoredState());

  // Sync state with localStorage on mount and storage events
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setState(getStoredState());
      }
    }
    window.addEventListener("storage", handleStorage);
    // On mount, sync state
    setState(getStoredState());
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Update localStorage whenever state changes
  useEffect(() => {
    setStoredState(state);
  }, [state]);

  // Handlers
  const handleEnableChange = (checked: boolean) => {
    setState((s) => ({ ...s, martingaleEnabled: checked }));
  };
  const handleMultiplierChange = (val: number[]) => {
    setState((s) => ({ ...s, multiplier: val[0] }));
  };
  const handleMaxStepsChange = (val: number[]) => {
    setState((s) => ({ ...s, maxSteps: val[0] }));
  };

  const calculateRisk = () => {
    if (!state.martingaleEnabled) return 0
    let totalRisk = 1
    for (let i = 1; i < state.maxSteps; i++) {
      totalRisk += Math.pow(state.multiplier, i)
    }
    return totalRisk
  }

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>{t.warning}</strong> {t.warningText}
          </AlertDescription>
        </Alert>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Martingale Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t.martingaleSettings}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t.enableMartingale}</Label>
                <p className="text-xs text-muted-foreground">{t.enableDescription}</p>
              </div>
              <Switch checked={state.martingaleEnabled} onCheckedChange={handleEnableChange} />
            </div>

            {state.martingaleEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>
                    {t.multiplier}: {state.multiplier}x
                  </Label>
                  <Slider
                    value={[state.multiplier]}
                    onValueChange={handleMultiplierChange}
                    max={5}
                    min={1.5}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">{t.multiplierDescription}</p>
                </div>

                <div className="space-y-2">
                  <Label>
                    {t.maxSteps}: {state.maxSteps}
                  </Label>
                  <Slider value={[state.maxSteps]} onValueChange={handleMaxStepsChange} max={10} min={1} step={1} className="w-full" />
                  <p className="text-xs text-muted-foreground">{t.maxStepsDescription}</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              {t.riskAnalysis}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.martingaleEnabled ? (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t.totalRiskMultiplier}</span>
                    <Badge variant="destructive">{calculateRisk().toFixed(1)}x</Badge>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">{t.stepProgression}</Label>
                    <div className="space-y-1">
                      {Array.from({ length: state.maxSteps }, (_, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span>
                            {t.step} {i + 1}:
                          </span>
                          <span>{Math.pow(state.multiplier, i).toFixed(1)}x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertDescription className="text-xs">
                    {t.riskWarning
                      .replace("{steps}", state.maxSteps.toString())
                      .replace("{multiplier}", calculateRisk().toFixed(1))}
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto" />
                <p>{t.enableToSeeRisk}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-start"
      >
        <Button size="lg" className="hidden items-center gap-2"> {/* TODO: oculto temporalmente */}
          <Save className="h-4 w-4" />
          {t.saveConfiguration}
        </Button>
      </motion.div>
    </div>
  )
}
