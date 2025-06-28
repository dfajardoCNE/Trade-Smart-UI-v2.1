"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Broker } from "@/app/page"
import Image from "next/image"
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars"
import type { Language } from "@/app/page"

interface BrokerSelectionScreenProps {
  onBrokerSelect: (broker: Broker) => void
  language: Language
}

interface BrokerOption {
  id: Broker
  name: string
  logo: string
}

interface Translations {
  en: {
    selectYourBroker: string
    choosePlatform: string
    selectBrokerLogo: string
    brokerPlatform: string
    chooseBrokerPlaceholder: string
    continue: string
  }
  es: {
    selectYourBroker: string
    choosePlatform: string
    selectBrokerLogo: string
    brokerPlatform: string
    chooseBrokerPlaceholder: string
    continue: string
  }
}

const brokers: BrokerOption[] = [
  {
    id: "iq-option" as Broker,
    name: "IQ Option",
    logo: "/iq-options.png?height=100&width=300",
  },
  {
    id: "tradingview" as Broker,
    name: "TradingView",
    logo: "/trading-view.png?height=100&width=300",
  },
]

const translations: Translations = {
  en: {
    selectYourBroker: "Select Your Broker",
    choosePlatform: "Choose the trading platform you want to connect with",
    selectBrokerLogo: "Select a broker to see logo",
    brokerPlatform: "Broker Platform",
    chooseBrokerPlaceholder: "Choose your broker...",
    continue: "Continue",
  },
  es: {
    selectYourBroker: "Selecciona tu Broker",
    choosePlatform: "Elige la plataforma de trading a la que quieres conectarte",
    selectBrokerLogo: "Selecciona un broker para ver el logo",
    brokerPlatform: "Plataforma de Broker",
    chooseBrokerPlaceholder: "Elige tu broker...",
    continue: "Continuar",
  },
}

const getLocalizedTranslations = (lang: Language) => {
  return translations[lang] || translations.en;
};

export function BrokerSelectionScreen({ onBrokerSelect, language }: BrokerSelectionScreenProps) {
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null)

  const selectedBrokerData = brokers.find((b) => b.id === selectedBroker)
  const t = getLocalizedTranslations(language)

  return (
    <StarsBackground className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">{t.selectYourBroker}</CardTitle>
            <p className="text-muted-foreground">{t.choosePlatform}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Broker Logo */}
            <motion.div
              className="flex justify-center h-20"
              key={selectedBroker || "empty"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedBrokerData ? (
                <Image
                  src={selectedBrokerData.logo || "/placeholder.svg"}
                  alt={selectedBrokerData.name}
                  width={200}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-lg">
                  <span className="text-muted-foreground">{t.selectBrokerLogo}</span>
                </div>
              )}
            </motion.div>

            {/* Broker Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.brokerPlatform}</label>
              <Select value={selectedBroker || ""} onValueChange={(value) => setSelectedBroker(value as Broker)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.chooseBrokerPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {brokers.map((broker) => (
                    <SelectItem key={broker.id} value={broker.id}>
                      {broker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: selectedBroker ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="w-full"
                size="lg"
                disabled={!selectedBroker}
                onClick={() => selectedBroker && onBrokerSelect(selectedBroker)}
              >
                {t.continue}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </StarsBackground>
  )
}
