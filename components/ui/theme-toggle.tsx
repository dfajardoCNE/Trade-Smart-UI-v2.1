"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor } from "lucide-react"
import type { Theme } from "@/app/page"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/tooltip"

interface ThemeToggleProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeToggle({ currentTheme, onThemeChange, tooltipSide = "top" }: ThemeToggleProps & { tooltipSide?: "top" | "bottom" | "left" | "right" }) {
  const getThemeIcon = () => {
    switch (currentTheme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <Tooltip side={tooltipSide}>
      <DropdownMenu>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 px-0 dark:text-muted-foreground">
              {getThemeIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent align="end" className="bg-popover dark:bg-popover border-border dark:border-border">
          <DropdownMenuItem
            onClick={() => onThemeChange("light")}
            className="flex items-center gap-2 text-popover-foreground dark:text-popover-foreground hover:bg-accent dark:hover:bg-accent"
          >
            <Sun className="h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onThemeChange("dark")}
            className="flex items-center gap-2 text-popover-foreground dark:text-popover-foreground hover:bg-accent dark:hover:bg-accent"
          >
            <Moon className="h-4 w-4" />
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  )
}
