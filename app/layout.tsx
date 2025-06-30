import type { Metadata } from 'next'
import './globals.css'
import { montserrat } from '../styles/montserrat-font'

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
    <html lang="en" className={`${montserrat.variable} h-full overflow-auto`}>
      <body className="font-sans h-full overflow-auto">
        {children}
      </body>
    </html>
  )
}