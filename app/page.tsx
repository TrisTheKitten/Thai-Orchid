'use client'

import { useState, useMemo, useCallback, useDeferredValue } from 'react'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/use-cart'
import { buildMenuMap, type MenuItem } from '@/lib/types/menu'
import { NavigationBar } from '@/components/layout/navigation-bar'
import { SearchBar } from '@/components/sections/search-bar'
import { HeroSection } from '@/components/sections/hero-section'
import menuData from '../data/menu.json'

const MenuDisplay = dynamic(
  () => import('@/components/sections/menu-display').then((mod) => ({ default: mod.MenuDisplay })),
  {
    loading: () => (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-warmOrange-600" />
      </div>
    ),
    ssr: true,
  }
)

const AboutSection = dynamic(
  () => import('@/components/sections/about-section').then((mod) => ({ default: mod.AboutSection })),
  { loading: () => null }
)

const ContactSection = dynamic(
  () =>
    import('@/components/sections/contact-section').then((mod) => ({
      default: mod.ContactSection,
    })),
  { loading: () => null }
)

const CheckoutSidebar = dynamic(
  () =>
    import('@/components/checkout/checkout-sidebar').then((mod) => ({
      default: mod.CheckoutSidebar,
    })),
  { loading: () => null, ssr: false }
)

const menuItems: MenuItem[] = menuData
const menuById = buildMenuMap(menuItems)

export default function Home() {
  const { toast } = useToast()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearch = useDeferredValue(searchQuery)

  const {
    items: cartItems,
    addToCart,
    removeFromCart,
    incrementItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart(menuById)

  const handleCartIconClick = useCallback(() => {
    setIsCartOpen((open) => !open)
  }, [])

  const filteredItems = useMemo(() => {
    if (deferredSearch.trim() === '') return menuItems
    const query = deferredSearch.toLowerCase()
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query))
    )
  }, [deferredSearch])

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      addToCart(item)
      toast({
        title: 'Added to cart',
        description: `${item.name} has been added to your cart.`,
        duration: 2000,
      })
    },
    [addToCart, toast]
  )

  const handleRemoveFromCart = useCallback(
    (itemId: string) => {
      const item = menuById.get(itemId)
      removeFromCart(itemId)
      if (item) {
        toast({
          title: 'Removed from cart',
          description: `${item.name} has been removed from your cart.`,
          duration: 2000,
        })
      }
    },
    [removeFromCart, toast]
  )

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-warmWhite via-softCream-100 to-warmOrange-50 text-charcoal-800">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="pointer-events-none absolute -left-[15%] -top-[40%] h-[70%] w-[50%] rounded-full bg-gradient-to-br from-warmOrange-200/25 to-sunshineYellow-300/20" />
        <div className="pointer-events-none absolute left-[70%] top-[50%] h-[50%] w-[35%] rounded-full bg-gradient-to-br from-berryRed-200/15 to-berryRed-300/15" />
        <div className="pointer-events-none absolute -bottom-[40%] -right-[15%] h-[70%] w-[50%] rounded-full bg-gradient-to-br from-deepAmber-200/20 to-warmOrange-300/20 motion-safe:animate-float" />
      </div>

      <div className="relative z-10">
        <NavigationBar onCartIconClick={handleCartIconClick} totalItems={totalItems} />

        <HeroSection />

        <main className="container mx-auto px-4 pb-20">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredItemsLength={filteredItems.length}
            isStale={searchQuery !== deferredSearch}
          />
        </div>

        <section id="menu" className="mt-8 px-4 sm:mt-12">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 font-display text-3xl font-bold bg-gradient-to-r from-charcoal-700 to-charcoal-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
              Our Menu
            </h2>
            <p className="mx-auto max-w-2xl px-4 text-base text-charcoal-600 sm:text-lg">
              Each dish is carefully crafted using authentic Thai ingredients and traditional
              cooking methods
            </p>
          </div>
          <MenuDisplay items={filteredItems} onAddToCart={handleAddToCart} />
        </section>

        <AboutSection />
        <ContactSection />
        </main>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <CheckoutSidebar
            onClose={() => setIsCartOpen(false)}
            cart={cartItems}
            totalPrice={totalPrice}
            onRemoveItem={handleRemoveFromCart}
            onIncrementItem={incrementItem}
            onClearCart={clearCart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
