import React from "react"

export function AppFooter({ language = "es" }: { language?: "es" | "en" }) {
  const t = {
    es: {
      copyright: "© 2025 Tu Plataforma de Trading Automatizado. Todos los derechos reservados.",
      made: "Hecho con ♥ por @Darling.dev."
    },
    en: {
      copyright: "© 2025 Your Automated Trading Platform. All rights reserved.",
      made: "Made with ♥ by @Darling.dev."
    }
  }[language]

  return (
    <footer className="w-full bg-card dark:bg-card border-t border-border dark:border-border py-4 text-center text-xs text-muted-foreground">
      <div>{t.copyright}</div>
      <div className="mt-1">{t.made}</div>
    </footer>
  )
}
