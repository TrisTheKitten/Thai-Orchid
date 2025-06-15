import { Inter, Playfair_Display, Roboto_Mono } from 'next/font/google'

// Define the Inter font for primary text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  adjustFontFallback: true,
})

// Define the Playfair Display font for headings and display text
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
})

// Define the Roboto Mono font for monospaced text
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: false, // Only preload if heavily used
  fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
  adjustFontFallback: true,
})
