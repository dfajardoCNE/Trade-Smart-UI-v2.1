"use client"

import { useState } from "react"
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

interface TradingTabProps {
  language: Language
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

const currencyPairs = [
  {
    id: "EURUSD",
    name: "EUR/USD",
    flag1: <span className="fi fi-eu rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "GBPUSD",
    name: "GBP/USD",
    flag1: <span className="fi fi-gb rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "USDJPY",
    name: "USD/JPY",
    flag1: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-jp rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "USDCHF",
    name: "USD/CHF",
    flag1: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-ch rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "AUDUSD",
    name: "AUD/USD",
    flag1: <span className="fi fi-au rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "USDCAD",
    name: "USD/CAD",
    flag1: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-ca rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "NZDUSD",
    name: "NZD/USD",
    flag1: <span className="fi fi-nz rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "EURGBP",
    name: "EUR/GBP",
    flag1: <span className="fi fi-eu rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-gb rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "EURJPY",
    name: "EUR/JPY",
    flag1: <span className="fi fi-eu rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-jp rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
  {
    id: "GBPJPY",
    name: "GBP/JPY",
    flag1: <span className="fi fi-gb rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block" />,
    flag2: <span className="fi fi-jp rounded-full w-6 h-6 border-2 border-white shadow inline-block" />,
  },
]

export function TradingTab({ language, canStartBot, onStartBot }: TradingTabProps & { canStartBot?: boolean; onStartBot?: () => void }) {
  const [strategy, setStrategy] = useState("")
  const [confidence, setConfidence] = useState([75])
  const [investmentAmount, setInvestmentAmount] = useState("10")
  const [expirationTime, setExpirationTime] = useState("")
  const [candleInterval, setCandleInterval] = useState("")
  const [selectedPairs, setSelectedPairs] = useState<string[]>(["EURUSD", "GBPUSD"])
  const [useMarketSentiment, setUseMarketSentiment] = useState(false)
  const [useEconomicNews, setUseEconomicNews] = useState(false)
  const [telegramBot, setTelegramBot] = useState("")
  const [telegramChat, setTelegramChat] = useState("")
  const [useTechnicalIndicators, setUseTechnicalIndicators] = useState(false)

  // Simulación de saldo (reemplazar por prop o contexto real)
  const balance = 10; // <-- Cambia esto por el valor real de saldo

  // Validaciones
  const investment = parseFloat(investmentAmount);
  const isInvestmentValid = !isNaN(investment) && investment >= 1;
  const isExpirationValid = !!expirationTime;
  const isIntervalValid = !!candleInterval;
  const isPairsValid = selectedPairs.length > 0;
  const isStrategyValid = !!strategy;
  const hasBalance = balance > 0;

  const canStartBotLocal = hasBalance && isInvestmentValid && isExpirationValid && isIntervalValid && isPairsValid && isStrategyValid;

  const t = translations[language]
  const selectedStrategy = strategy ? t.strategies[strategy as keyof typeof t.strategies] : null

  const handlePairToggle = (pairId: string) => {
    setSelectedPairs((prev) => (prev.includes(pairId) ? prev.filter((id) => id !== pairId) : [...prev, pairId]))
  }

  const handleSelectAll = () => {
    setSelectedPairs(currencyPairs.map((pair) => pair.id))
  }

  const handleDeselectAll = () => {
    setSelectedPairs([])
  }

  // Usar canStartBot si viene por prop, si no usar el local
  const canStart = typeof canStartBot === "boolean" ? canStartBot : canStartBotLocal;

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
                  value={investmentAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d.]/g, "");
                    setInvestmentAmount(val.startsWith("-") ? val.slice(1) : val);
                  }}
                  className="pl-9 bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input"
                />
              </div>
              {!isInvestmentValid && (
                <p className="text-xs text-red-500">{language === "en" ? "Minimum investment is $1" : "La inversión mínima es $1"}</p>
              )}
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.investmentAmountDesc}</p>
            </div>

            {/* Expiration Time */}
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.expirationTime}</Label>
              <Select value={expirationTime} onValueChange={setExpirationTime}>
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
              {!isExpirationValid && (
                <p className="text-xs text-red-500">{language === "en" ? "Expiration time is required" : "El tiempo de expiración es obligatorio"}</p>
              )}
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.expirationTimeDesc}</p>
            </div>

            {/* Candle Interval */}
            <div className="space-y-2">
              <Label className="text-foreground dark:text-foreground">{t.candleInterval}</Label>
              <Select value={candleInterval} onValueChange={setCandleInterval}>
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
              {!isIntervalValid && (
                <p className="text-xs text-red-500">{language === "en" ? "Candle interval is required" : "El intervalo de vela es obligatorio"}</p>
              )}
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
                        {selectedPairs.length} {language === "en" ? "pairs selected" : "pares seleccionados"}
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
                        <span className="flex items-center mr-4">
                          <span className="w-6 h-6 rounded-full border shadow bg-white flex items-center justify-center overflow-hidden">
                            <span className="w-full h-full object-cover flex items-center justify-center">{pair.flag1}</span>
                          </span>
                          <span className="w-6 h-6 rounded-full border shadow bg-white flex items-center justify-center overflow-hidden -ml-2 z-10 translate-y-1">
                            <span className="w-full h-full object-cover flex items-center justify-center">{pair.flag2}</span>
                          </span>
                        </span>
                        {/* Nombre del par */}
                        <span className="flex-1">{pair.name}</span>
                        {/* Checkbox visual a la derecha */}
                        <span className="ml-2">
                          <input
                            type="checkbox"
                            checked={selectedPairs.includes(pair.id)}
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
              {!isPairsValid && (
                <p className="text-xs text-red-500">{language === "en" ? "Select at least one pair" : "Selecciona al menos un par"}</p>
              )}
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
              <Select value={strategy} onValueChange={setStrategy}>
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
              {!isStrategyValid && (
                <p className="text-xs text-red-500">{language === "en" ? "Strategy is required" : "La estrategia es obligatoria"}</p>
              )}
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
                {t.confidenceThreshold}: {confidence[0]}%
              </Label>
              <Slider value={confidence} onValueChange={setConfidence} max={100} min={50} step={5} className="w-full" />
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
                checked={useMarketSentiment}
                onCheckedChange={setUseMarketSentiment}
                className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground dark:text-foreground">{t.economicNews}</Label>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.economicNewsDesc}</p>
              </div>
              <Switch
                checked={useEconomicNews}
                onCheckedChange={setUseEconomicNews}
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
                checked={useTechnicalIndicators}
                onCheckedChange={setUseTechnicalIndicators}
                className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary"
              />
            </div>

            {(useMarketSentiment || useEconomicNews || useTechnicalIndicators) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                {useMarketSentiment && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground"
                  >
                    Sentiment
                  </Badge>
                )}
                {useEconomicNews && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground"
                  >
                    Economic News
                  </Badge>
                )}
                {useTechnicalIndicators && (
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
                  value={telegramBot}
                  onChange={(e) => setTelegramBot(e.target.value)}
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
                  value={telegramChat}
                  onChange={(e) => setTelegramChat(e.target.value)}
                  className="bg-background dark:bg-background text-foreground dark:text-foreground border-input dark:border-input"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.telegramDesc}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Botón para iniciar bot (eliminado, usar FloatingExecutionBot) */}
      {/* <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          disabled={!canStartBot}
          className="mt-2"
        >
          {language === "en" ? "Start Bot" : "Iniciar Bot"}
        </Button>
      </div> */}
    </div>
  )
}
