"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, DollarSign, Clock, BarChart3 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/tooltip"
import { CurrencyPairAvatar } from "@/components/ui/currency-pair-avatar"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/app/page"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { currencyPairs } from "@/lib/constants/currency-pairs";

interface TradingTabProps {
  language: Language
}

// Definir tipo para el estado
interface TradingTabState {
  strategy: string;
  confidence: number[];
  investmentAmount: string;
  expirationTime: string;
  candleInterval: string;
  selectedPairs: string[];
  useMarketSentiment: boolean;
  useEconomicNews: boolean;
  telegramBot: string;
  telegramChat: string;
  useTechnicalIndicators: boolean;
}

const translations = {
  en: {
    tradingStrategy: "Trading Strategy",
    strategyTooltip: "Select the trading algorithm that best fits your risk profile",
    strategyType: "Strategy Type",
    chooseStrategy: "Choose a trading strategy...",
    confidenceThreshold: "Confidence Threshold",
    confidenceDescription: "Minimum confidence level required to execute trades",

    // New trading parameters
    tradingParameters: "Trading Parameters",
    investmentAmount: "Investment Amount",
    investmentAmountDesc: "Amount to invest per trade",
    expirationTime: "Expiration Time",
    expirationTimeDesc: "Time until the option expires",
    candleInterval: "Candle Interval",
    candleIntervalDesc: "Timeframe for market analysis",
    currencyPairs: "Currency Pairs",
    currencyPairsDesc: "Select the currency pairs to trade",
    selectAll: "Select All",
    deselectAll: "Deselect All",

    enhancedPrecision: "Enhanced Precision",
    marketSentiment: "Market Sentiment Analysis",
    marketSentimentDesc: "Include social media and news sentiment",
    economicNews: "Economic News Integration",
    economicNewsDesc: "Factor in economic calendar events",
    telegramIntegration: "Telegram Integration",
    botToken: "Bot Token",
    chatId: "Chat ID",
    telegramDesc: "Receive real-time trading notifications and alerts via Telegram",

    strategies: {
      "trend-following": {
        name: "Trend Following",
        description: "Follows market trends using moving averages and momentum indicators",
      },
      "mean-reversion": {
        name: "Mean Reversion",
        description: "Trades based on price returning to historical averages",
      },
      breakout: {
        name: "Breakout Strategy",
        description: "Identifies and trades significant price breakouts from support/resistance levels",
      },
      scalping: {
        name: "Scalping",
        description: "High-frequency trading with small profit targets and quick exits",
      },
    },

    timeframes: {
      "30s": "30 Seconds",
      "1m": "1 Minute",
      "2m": "2 Minutes",
      "5m": "5 Minutes",
      "15m": "15 Minutes",
      "30m": "30 Minutes",
      "1h": "1 Hour",
    },

    intervals: {
      "1m": "1 Minute",
      "5m": "5 Minutes",
      "15m": "15 Minutes",
      "30m": "30 Minutes",
      "1h": "1 Hour",
      "4h": "4 Hours",
      "1d": "1 Day",
    },
  },
  es: {
    tradingStrategy: "Estrategia de Trading",
    strategyTooltip: "Selecciona el algoritmo de trading que mejor se adapte a tu perfil de riesgo",
    strategyType: "Tipo de Estrategia",
    chooseStrategy: "Elige una estrategia de trading...",
    confidenceThreshold: "Umbral de Confianza",
    confidenceDescription: "Nivel mínimo de confianza requerido para ejecutar operaciones",

    // New trading parameters
    tradingParameters: "Parámetros de Trading",
    investmentAmount: "Monto de Inversión",
    investmentAmountDesc: "Cantidad a invertir por operación",
    expirationTime: "Tiempo de Expiración",
    expirationTimeDesc: "Tiempo hasta que expire la opción",
    candleInterval: "Intervalo de Velas",
    candleIntervalDesc: "Marco temporal para análisis del mercado",
    currencyPairs: "Pares de Divisas",
    currencyPairsDesc: "Selecciona los pares de divisas a operar",
    selectAll: "Seleccionar Todo",
    deselectAll: "Deseleccionar Todo",

    enhancedPrecision: "Precisión Mejorada",
    marketSentiment: "Análisis de Sentimiento del Mercado",
    marketSentimentDesc: "Incluir sentimiento de redes sociales y noticias",
    economicNews: "Integración de Noticias Económicas",
    economicNewsDesc: "Considerar eventos del calendario económico",
    telegramIntegration: "Integración con Telegram",
    botToken: "Token del Bot",
    chatId: "ID del Chat",
    telegramDesc: "Recibe notificaciones y alertas de trading en tiempo real vía Telegram",

    strategies: {
      "trend-following": {
        name: "Seguimiento de Tendencia",
        description: "Sigue las tendencias del mercado usando medias móviles e indicadores de momentum",
      },
      "mean-reversion": {
        name: "Reversión a la Media",
        description: "Opera basándose en que el precio regrese a promedios históricos",
      },
      breakout: {
        name: "Estrategia de Ruptura",
        description: "Identifica y opera rupturas significativas de niveles de soporte/resistencia",
      },
      scalping: {
        name: "Scalping",
        description: "Trading de alta frecuencia con objetivos de ganancia pequeños y salidas rápidas",
      },
    },

    timeframes: {
      "30s": "30 Segundos",
      "1m": "1 Minuto",
      "2m": "2 Minutos",
      "5m": "5 Minutos",
      "15m": "15 Minutos",
      "30m": "30 Minutos",
      "1h": "1 Hora",
    },

    intervals: {
      "1m": "1 Minuto",
      "5m": "5 Minutos",
      "15m": "15 Minutos",
      "30m": "30 Minutos",
      "1h": "1 Hora",
      "4h": "4 Horas",
      "1d": "1 Día",
    },
  },
}

// Helpers para localStorage con objeto único
function getTradingTabState() {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem("tradingTab_state");
    if (!val) return null;
    return JSON.parse(val);
  } catch {
    return null;
  }
}
function setTradingTabState(newState: any) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("tradingTab_state", JSON.stringify(newState));
  } catch {}
}

// Helpers para otros tabs
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
function getMartingaleTabState() {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem("martingaleTab_state");
    if (!val) return null;
    return JSON.parse(val);
  } catch {
    return null;
  }
}

// Default values
const defaultState: TradingTabState = {
  strategy: "",
  confidence: [75], // Valor por defecto para el slider
  investmentAmount: "",
  expirationTime: "",
  candleInterval: "",
  selectedPairs: [],
  useMarketSentiment: false,
  useEconomicNews: false,
  telegramBot: "",
  telegramChat: "",
  useTechnicalIndicators: false
};

const initialState: TradingTabState = typeof window !== "undefined" && getTradingTabState() ? getTradingTabState() : defaultState;

export function TradingTab({ language }: TradingTabProps) {
  const t = translations[language];

  // Estado persistente
  const [state, setState] = useState<TradingTabState>(() => {
    if (typeof window !== "undefined") {
      const saved = getTradingTabState();
      return saved || {
        strategy: "trend-following",
        confidence: [75],
        investmentAmount: "10",
        expirationTime: "1m",
        candleInterval: "1m",
        selectedPairs: [],
        useMarketSentiment: false,
        useEconomicNews: false,
        telegramBot: "",
        telegramChat: "",
        useTechnicalIndicators: false,
      };
    }
    return defaultState;
  });

  // Effect to save state to localStorage and dispatch event on state change
  useEffect(() => {
    setTradingTabState(state); // Save to localStorage
    // Dispatch custom event with the current state
    window.dispatchEvent(new CustomEvent('tradingTabStateChanged', { detail: state }));
  }, [state]); // Re-run whenever the state object changes

  // Leer siempre el estado más reciente de localStorage al montar y cuando cambie la clave desde otra pestaña
  useEffect(() => {
    function syncFromStorage() {
      const latest = getTradingTabState();
      if (latest) setState(latest);
    }
    window.addEventListener("storage", syncFromStorage);
    syncFromStorage(); // Initial sync on mount
    return () => {
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const handlePairToggle = (pairId: string) => {
    setState((prev) => {
      const newSelectedPairs = prev.selectedPairs.includes(pairId)
        ? prev.selectedPairs.filter((id) => id !== pairId)
        : [...prev.selectedPairs, pairId];
      return { ...prev, selectedPairs: newSelectedPairs };
    });
  };

  const handleSelectAll = () => {
    setState((prev) => ({
      ...prev,
      selectedPairs: currencyPairs.map((pair) => pair.id),
    }));
  };

  const handleDeselectAll = () => {
    setState((prev) => ({ ...prev, selectedPairs: [] }));
  };

  const selectedStrategy = state.strategy ? t.strategies[state.strategy as keyof typeof t.strategies] : null

  return (
    <div className="space-y-6">
      {/* Trading Parameters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground dark:text-card-foreground">
              <DollarSign className="h-5 w-5 text-green-500" />
              {t.tradingParameters}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Investment Amount */}
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.investmentAmount}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min={1}
                  step={1}
                  placeholder="10"
                  value={state.investmentAmount}
                  onChange={(e) => setState(s => ({...s, investmentAmount: e.target.value}))}
                  className="pl-9 bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input"
                />
              </div>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.investmentAmountDesc}</p>
            </div>

            {/* Expiration Time */}
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.expirationTime}</Label>
              <Select value={state.expirationTime} onValueChange={v => setState(s => ({...s, expirationTime: v}))}>
                <SelectTrigger className="bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder={language === "en" ? "Select time..." : "Seleccionar tiempo..."} />
                </SelectTrigger>
                <SelectContent className="bg-popover dark:bg-popover border-border dark:border-border">
                  {Object.entries(t.timeframes).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="text-popover-foreground dark:text-popover-foreground">
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.expirationTimeDesc}</p>
            </div>

            {/* Candle Interval */}
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.candleInterval}</Label>
              <Select value={state.candleInterval} onValueChange={v => setState(s => ({...s, candleInterval: v}))}>
                <SelectTrigger className="bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input">
                  <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder={language === "en" ? "Select interval..." : "Seleccionar intervalo..."} />
                </SelectTrigger>
                <SelectContent className="bg-popover dark:bg-popover border-border dark:border-border">
                  {Object.entries(t.intervals).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="text-popover-foreground dark:text-popover-foreground">
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.candleIntervalDesc}</p>
            </div>
            {/* Selected Pairs Count & Dropdown */}
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.currencyPairs}</Label>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input hover:bg-accent dark:hover:bg-accent"
                    >
                      <span>
                        {state.selectedPairs.length} {language === "en" ? "pairs selected" : "pares seleccionados"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto bg-popover dark:bg-popover border-border dark:border-border p-2">
                    <div className="flex gap-2 mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                        className="flex-1 bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input hover:bg-accent dark:hover:bg-accent"
                      >
                        {t.selectAll}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeselectAll}
                        className="flex-1 bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input hover:bg-accent dark:hover:bg-accent"
                      >
                        {t.deselectAll}
                      </Button>
                    </div>
                    {currencyPairs.map((pair) => (
                      <DropdownMenuCheckboxItem
                        key={pair.id}
                        onCheckedChange={() => handlePairToggle(pair.id)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-foreground dark:text-foreground focus:bg-accent dark:focus:bg-accent justify-between"
                      >
                        {/* Banderas */}
                        <span className="flex items-center">
                          <span className="w-6 h-6 rounded-full border shadow bg-white flex items-center justify-center overflow-hidden dark:bg-slate-700 dark:border-slate-700">
                            <span className="w-full h-full object-cover flex items-center justify-center dark:bg-slate-700">{pair.flag1}</span>
                          </span>
                          <span className="w-6 h-6 rounded-full border shadow bg-white flex items-center justify-center overflow-hidden -ml-2 z-10 translate-y-1 dark:bg-slate-700 dark:border-slate-700">
                            <span className="w-full h-full object-cover flex items-center justify-center dark:bg-slate-700">{pair.flag2}</span>
                          </span>
                        </span>
                        {/* Nombre del par */}
                        <span className="flex-1">{pair.name}</span>
                        {/* Checkbox visual a la derecha */}
                        <span className="ml-2">
                          <input
                            type="checkbox"
                            checked={state.selectedPairs.includes(pair.id)}
                            readOnly
                            className="accent-primary w-4 h-4 cursor-pointer"
                            tabIndex={-1}
                            style={{ pointerEvents: 'none' }}
                          />
                        </span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.currencyPairsDesc}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategy Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground dark:text-card-foreground">
              {t.tradingStrategy}
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.strategyTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.strategyType}</Label>
              <Select value={state.strategy} onValueChange={v => setState(s => ({...s, strategy: v}))}>
                <SelectTrigger className="bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input">
                  <SelectValue placeholder={t.chooseStrategy} />
                </SelectTrigger>
                <SelectContent className="bg-popover dark:bg-popover border-border dark:border-border">
                  {Object.entries(t.strategies).map(([key, strat]) => (
                    <SelectItem key={key} value={key} className="text-popover-foreground dark:text-popover-foreground">
                      {strat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStrategy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 bg-muted dark:bg-muted rounded-lg border border-border dark:border-border"
              >
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  {selectedStrategy.description}
                </p>
              </motion.div>
            )}

            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">
                {t.confidenceThreshold}: {state.confidence[0]}%
              </Label>
              <Slider value={state.confidence} onValueChange={v => setState(s => ({...s, confidence: v}))} max={100} min={50} step={5} className="w-full" />
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.confidenceDescription}</p>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Precision */}
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground dark:text-card-foreground">{t.enhancedPrecision}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground dark:text-foreground">{t.marketSentiment}</Label>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.marketSentimentDesc}</p>
              </div>
              <Switch
                checked={state.useMarketSentiment}
                onCheckedChange={v => setState(s => ({...s, useMarketSentiment: v}))}
                className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground dark:text-foreground">{t.economicNews}</Label>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.economicNewsDesc}</p>
              </div>
              <Switch
                checked={state.useEconomicNews}
                onCheckedChange={v => setState(s => ({...s, useEconomicNews: v}))}
                className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground dark:text-foreground">{language === "es" ? "Integración de Indicadores Técnicos" : "Technical Indicators Integration"}</Label>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                  {language === "es"
                    ? "Activa el uso de indicadores técnicos como RSI, MACD, etc. para mejorar la precisión."
                    : "Enable the use of technical indicators like RSI, MACD, etc. to improve precision."}
                </p>
              </div>
              <Switch
                checked={state.useTechnicalIndicators}
                onCheckedChange={v => setState(s => ({...s, useTechnicalIndicators: v}))}
                className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary"
              />
            </div>

            {(state.useMarketSentiment || state.useEconomicNews || state.useTechnicalIndicators) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                {state.useMarketSentiment && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground"
                  >
                    Sentiment
                  </Badge>
                )}
                {state.useEconomicNews && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground"
                  >
                    Economic News
                  </Badge>
                )}
                {state.useTechnicalIndicators && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground"
                  >
                    Indicators
                  </Badge>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Telegram Integration */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground dark:text-card-foreground">{t.telegramIntegration}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="telegram-bot" className="text-foreground dark:text-foreground">
                  {t.botToken}
                </Label>
                <Input
                  id="telegram-bot"
                  type="password"
                  placeholder={`${language === "en" ? "Enter your Telegram bot token" : "Ingresa tu token del bot de Telegram"}`}
                  value={state.telegramBot}
                  onChange={(e) => setState(s => ({...s, telegramBot: e.target.value}))}
                  className="bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram-chat" className="text-foreground dark:text-foreground">
                  {t.chatId}
                </Label>
                <Input
                  id="telegram-chat"
                  placeholder={`${language === "en" ? "Enter your Telegram chat ID" : "Ingresa tu ID de chat de Telegram"}`}
                  value={state.telegramChat}
                  onChange={(e) => setState(s => ({...s, telegramChat: e.target.value}))}
                  className="bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.telegramDesc}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
