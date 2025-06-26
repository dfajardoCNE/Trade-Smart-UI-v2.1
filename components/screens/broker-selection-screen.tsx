"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Broker } from "@/app/page"
import Image from "next/image"
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars"

interface BrokerSelectionScreenProps {
  onBrokerSelect: (broker: Broker) => void
}

const brokers = [
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

export function BrokerSelectionScreen({ onBrokerSelect }: BrokerSelectionScreenProps) {
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null)

  const selectedBrokerData = brokers.find((b) => b.id === selectedBroker)

  return (
    <StarsBackground className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Select Your Broker</CardTitle>
            <p className="text-muted-foreground">Choose the trading platform you want to connect with</p>
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
                  <span className="text-muted-foreground">Select a broker to see logo</span>
                </div>
              )}
            </motion.div>

            {/* Broker Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Broker Platform</label>
              <Select value={selectedBroker || ""} onValueChange={(value) => setSelectedBroker(value as Broker)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your broker..." />
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
                Continue
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </StarsBackground>
  )
}
