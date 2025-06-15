import type React from "react"
import "@/app/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { inter, playfair, robotoMono } from "@/lib/fonts"

export const metadata = {
  title: "Thai Orchid - Authentic Thai Cuisine",
  description: "Experience the vibrant flavors of Thailand with traditional recipes and fresh ingredients. Order online for delivery or takeout.",
  keywords: "Thai food, authentic cuisine, restaurant, delivery, takeout, pad thai, curry, bangkok",
  authors: [{ name: "Thai Orchid Restaurant" }],
  creator: "Thai Orchid",
  publisher: "Thai Orchid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "Thai Orchid - Authentic Thai Cuisine",
    description: "Experience the vibrant flavors of Thailand with traditional recipes and fresh ingredients.",
    url: 'http://localhost:3000',
    siteName: 'Thai Orchid',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fef7ed' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${robotoMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-sans bg-warmWhite-100 text-charcoal-700 overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
