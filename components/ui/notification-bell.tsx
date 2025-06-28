"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, AlertTriangle, CheckCircle, XCircle, Trash2, Eye, EyeOff } from "lucide-react"
import type { Language } from "@/app/page"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number;
  type: "success" | "warning" | "info" | "loss";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationBellProps {
  language: Language
}

const translations = {
  en: {
    notifications: "Notifications",
    markAllRead: "Mark all as read",
    clearAll: "Clear all",
    noNotifications: "No new notifications",
    tradingAlert: "Trading Alert",
    riskWarning: "Risk Warning",
    systemUpdate: "System Update",
    profitTarget: "Profit target reached for EURUSD",
    riskLimit: "Daily loss limit approaching",
    botStarted: "Trading bot started successfully",
    tradeOpened: "Trade opened",
    tradeResultWin: "Trade closed: WIN",
    tradeResultLoss: "Trade closed: LOSS",
    markAsRead: "Mark as read",
    markAsUnread: "Mark as unread",
  },
  es: {
    notifications: "Notificaciones",
    markAllRead: "Marcar todo como leído",
    clearAll: "Limpiar todo",
    noNotifications: "No hay notificaciones nuevas",
    tradingAlert: "Alerta de Trading",
    riskWarning: "Advertencia de Riesgo",
    systemUpdate: "Actualización del Sistema",
    profitTarget: "Objetivo de ganancia alcanzado para EURUSD",
    riskLimit: "Límite de pérdida diaria acercándose",
    botStarted: "Bot de trading iniciado exitosamente",
    tradeOpened: "Operación abierta",
    tradeResultWin: "Operación cerrada: GANADA",
    tradeResultLoss: "Operación cerrada: PERDIDA",
    markAsRead: "Marcar como leída",
    markAsUnread: "Marcar como no leída",
  },
}

export function NotificationBell({ language, tooltipSide = "top" }: NotificationBellProps & { tooltipSide?: "top" | "bottom" | "left" | "right" }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "success",
      title: translations[language].tradingAlert,
      message: translations[language].profitTarget,
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: translations[language].riskWarning,
      message: translations[language].riskLimit,
      time: "5m ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: translations[language].systemUpdate,
      message: translations[language].botStarted,
      time: "10m ago",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: translations[language].tradingAlert,
      message: translations[language].tradeOpened + " (EURUSD)",
      time: "Just now",
      read: false,
    },
    {
      id: 5,
      type: "success",
      title: translations[language].tradingAlert,
      message: translations[language].tradeResultWin + " (EURUSD)",
      time: "Just now",
      read: false,
    },
    {
      id: 6,
      type: "loss",
      title: translations[language].tradingAlert,
      message: translations[language].tradeResultLoss + " (EURUSD)",
      time: "Just now",
      read: false,
    },
  ])

  const t = translations[language]
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleReadStatus = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "loss":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Tooltip side={tooltipSide}>
      <DropdownMenu>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative dark:text-muted-foreground">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-popover dark:bg-popover border-border dark:border-border">
          <div className="flex items-center justify-between p-2">
            <h3 className="font-semibold">{t.notifications}</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Tooltip side="bottom">
                  <TooltipTrigger>
                    <Button variant="ghost" size="sm" className="text-xs px-2" onClick={markAllAsRead}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.markAllRead}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip side="bottom">
                <TooltipTrigger>
                  <Button variant="ghost" size="sm" className="text-xs px-2 text-red-500" onClick={clearAllNotifications}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.clearAll}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <DropdownMenuSeparator />
          <ScrollArea className="h-64">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex items-start gap-3 p-3 text-popover-foreground dark:text-popover-foreground hover:bg-accent dark:hover:bg-accent cursor-pointer"
                  onClick={() => toggleReadStatus(notification.id)}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-auto p-1 text-muted-foreground hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadStatus(notification.id);
                    }}
                  >
                    {notification.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">{t.noNotifications}</div>
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p>{t.notifications}</p>
      </TooltipContent>
    </Tooltip>
  )
}
