"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface CurrencyPairAvatarProps {
  flag1: string // URL o emoji
  flag2: string // URL o emoji
  pair: string
  compact?: boolean
}

export function CurrencyPairAvatar({ flag1, flag2, pair, compact = false }: CurrencyPairAvatarProps) {
  return (
    <div
      className={compact
        ? "flex items-center gap-2 bg-transparent rounded px-1 py-0 ml-4"
        : "flex items-center gap-3 bg-transparent rounded-xl px-4 py-2"
      }
    >
      <div className={compact ? "relative h-6 w-6" : "relative h-10 w-10"}>
        <span
          className={compact ? "absolute left-0 top-0 z-10 text-base" : "absolute left-0 top-0 z-10 text-2xl drop-shadow"}
          style={compact ? {} : { filter: 'drop-shadow(0 1px 2px #0008)' }}
        >{flag1}</span>
        <span
          className={compact ? "absolute left-3 top-1 z-20 text-base" : "absolute left-4 top-2 z-20 text-2xl drop-shadow"}
          style={compact ? {} : { filter: 'drop-shadow(0 1px 2px #0008)' }}
        >{flag2}</span>
      </div>
      <span
        className={compact
          ? "text-sm font-medium text-foreground dark:text-foreground tracking-normal"
          : "text-lg font-semibold text-white tracking-wide"
        }
      >{pair}</span>
    </div>
  )
}
