import type { Metadata } from 'next'
import './globals.css'
import { montserrat } from '../styles/montserrat-font'
import { AppFooter } from '@/components/ui/app-footer'

export const metadata: Metadata = {
  title: 'TradeSmart',
  description: 'A smart trading platform for modern traders',
  generator: 'TradeSmart',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.jpg', sizes: '16x16' },
      { url: '/icon.jpg', sizes: '32x32' }
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.jpg',
  },
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
