import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  icons:"https://static.thenounproject.com/png/2023630-200.png",
  title: 'PeterTingle',
  description: 'AI-powered crime prediction for Indian cities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-mono bg-black text-green-400">
        {children}
      </body>
    </html>
  )
}
