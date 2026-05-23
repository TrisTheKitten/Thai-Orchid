'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Menu, X, Star, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { scrollToSection } from '@/lib/scroll'
import type React from 'react'

interface NavigationBarProps {
  onCartIconClick: () => void
  totalItems: number
}

const navItems = [
  { href: '#menu', label: 'Menu', icon: null },
  { href: '#about', label: 'About', icon: Star },
  { href: '#contact', label: 'Contact', icon: Award },
]

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  e.preventDefault()
  onNavigate?.()
  scrollToSection(href.replace('#', ''))
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onCartIconClick, totalItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav
        className="glass-blur animate-fade-in fixed left-0 right-0 top-0 z-50 border-b border-white/30 shadow-glass-lg"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">
              <span className="bg-gradient-to-r from-warmOrange-500 via-deepAmber-600 to-berryRed-600 bg-clip-text text-transparent">
                Thai Orchid
              </span>
            </h1>

            <div className="hidden items-center space-x-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative flex items-center gap-2 font-medium text-charcoal-700 transition-colors duration-200 hover:text-warmOrange-600"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.icon ? <item.icon className="h-4 w-4" aria-hidden /> : null}
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-warmOrange-400 to-deepAmber-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="iconOutline"
                size="icon"
                className="relative sm:h-12 sm:w-12"
                onClick={onCartIconClick}
                aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-berryRed-500 to-berryRed-600 text-xs font-bold text-white sm:-right-1 sm:-top-1 sm:h-6 sm:w-6">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                ) : null}
              </Button>

              <div className="md:hidden">
                <Button
                  variant="iconOutline"
                  size="icon"
                  className="sm:h-12 sm:w-12"
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 z-0 bg-black/20"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />

          <motion.div
            className="glass-blur pointer-events-auto absolute left-4 right-4 top-20 z-10 rounded-3xl border border-white/40 p-6 shadow-glass-lg"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.22 }}
          >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl p-3 font-medium text-charcoal-700 transition-colors duration-200 hover:bg-warmOrange-100/50 hover:text-warmOrange-700"
                    onClick={(e) =>
                      handleNavClick(e, item.href, () => setIsMobileMenuOpen(false))
                    }
                  >
                    {item.icon ? <item.icon className="h-5 w-5" aria-hidden /> : null}
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default NavigationBar
export { NavigationBar }
