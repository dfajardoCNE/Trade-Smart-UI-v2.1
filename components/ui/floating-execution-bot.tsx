"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Play, Square, Activity } from "lucide-react"
import type { BotStatus } from "@/app/page"

interface TradingTabState {
  investmentAmount: string;
  expirationTime: string;
  candleInterval: string;
  selectedPairs: string[];
  strategy: string;
  confidence: [number, number];
}

interface FloatingExecutionBotProps {
  botStatus: BotStatus
  getBotStatusColor: () => string
  getBotStatusText: () => string
  onStart: () => void
  onStop: () => void
  t: { startBot: string; stopBot: string }
  canStart: boolean // Nueva prop para validación de campos obligatorios
}

export function FloatingExecutionBot({
  botStatus,
  getBotStatusColor,
  getBotStatusText,
  onStart,
  onStop,
  t,
  canStart,
}: FloatingExecutionBotProps) {
  return (
    <div className="fixed left-0 right-0 bottom-0 w-full flex justify-center items-end pointer-events-none z-40 pb-24 sm:pb-24">
      <div className="w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card/90 dark:bg-card/90 border-t border-border dark:border-border shadow-lg w-[98vw] sm:w-[90vw] md:w-[70vw] lg:w-[40vw] max-w-full sm:max-w-2xl rounded-xl sm:rounded-2xl px-2 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pointer-events-auto"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
        >
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getBotStatusColor()}`} />
              <span className="text-sm font-medium dark:text-muted-foreground">{getBotStatusText()}</span>
            </div>
            {botStatus === "connecting" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Activity className="h-4 w-4" />
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={onStart}
              disabled={!canStart || botStatus === "running" || botStatus === "connecting"}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Play className="h-4 w-4" />
              {t.startBot}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onStop}
              disabled={botStatus === "stopped"}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Square className="h-4 w-4" />
              {t.stopBot}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
