"use client"

import { motion } from "motion/react"
import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-50 transition-opacity duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card/70 dark:bg-card/70 animate-pulse-slow"
      >
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-lg font-semibold text-foreground">Loading...</p>
      </motion.div>
    </div>
  );
} 