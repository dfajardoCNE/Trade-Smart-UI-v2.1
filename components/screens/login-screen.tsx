"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import type { Broker, UserData } from "@/app/page"
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars"

interface LoginScreenProps {
  broker: Broker
  onLogin: (userData: UserData) => void
  onBack: () => void
}

export function LoginScreen({ broker, onLogin, onBack }: LoginScreenProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    apiKey: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const brokerName = broker === "iq-option" ? "IQ Option" : "TradingView"
  const useApiKey = broker === "tradingview"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful login
    const userData: UserData = {
      username: credentials.username || "darling.dev",
      email: credentials.email || "darlingf1998@gmail.com",
      accountType: "PRACTICE",
      balance: 10000,
      broker,
      avatar: "/avatar.png?height=40&width=40",
    }

    onLogin(userData)
    setIsLoading(false)
  }

  return (
    <StarsBackground className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2 dark:text-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </motion.div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Connect to {brokerName}</CardTitle>
            <p className="text-muted-foreground">
              Enter your {useApiKey ? "API credentials" : "login credentials"} to continue
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!useApiKey ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="text"
                    placeholder="Enter your API key"
                    value={credentials.apiKey}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, apiKey: e.target.value }))}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Connect"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </StarsBackground>
  )
}
