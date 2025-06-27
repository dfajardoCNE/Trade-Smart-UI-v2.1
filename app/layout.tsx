import type { Metadata } from 'next'
import './globals.css'
import { montserrat } from '../styles/montserrat-font'
import { AppFooter } from '@/components/ui/app-footer'

export const metadata: Metadata = {
  title: 'TradeSmart',
  description: 'A smart trading platform for modern traders',
  generator: 'TradeSmart',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">
        {children}
        <AppFooter />
      </body>
    </html>
  )
}
