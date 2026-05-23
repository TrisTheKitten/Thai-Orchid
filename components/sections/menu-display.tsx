'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { PlusCircle, Star, Clock, ChefHat } from 'lucide-react'
import { ThemedButton } from '@/components/ui/themed-button'
import {
  GlassCard,
  GlassCardMedia,
  GlassCardBadgeRow,
  GlassCardBadge,
  GlassCardBody,
  GlassCardFooter,
  GlassCardMetaRow,
} from '@/components/ui/glass-card'
import { formatPrice } from '@/lib/format-price'
import { MENU_CARD_IMAGE_SIZES } from '@/lib/image-sizes'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/types/menu'

export type { MenuItem }

const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

interface MenuDisplayProps {
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
}

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
  index?: number
}

const MenuItemCard = memo(({ item, onAddToCart, index = 0 }: MenuItemCardProps) => (
  <GlassCard variant="default" interactive glow className="h-full">
    <GlassCardMedia>
      <Image
        src={item.image}
        alt={item.name}
        width={400}
        height={300}
        sizes={MENU_CARD_IMAGE_SIZES}
        className="h-full w-full object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
        priority={index < 3}
        loading={index < 3 ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <GlassCardBadgeRow>
        <GlassCardBadge>
          <Clock className="mr-1 inline h-3 w-3 shrink-0" aria-hidden />
          15-20 min
        </GlassCardBadge>
        {item.category ? (
          <GlassCardBadge accent>
            <ChefHat className="mr-1 inline h-3 w-3 shrink-0" aria-hidden />
            {item.category}
          </GlassCardBadge>
        ) : (
          <span className="shrink-0" aria-hidden />
        )}
      </GlassCardBadgeRow>
    </GlassCardMedia>

    <GlassCardBody className="space-y-5">
      <div className="space-y-3">
        <h3 className="font-display text-lg tracking-tight text-charcoal-800 transition-colors duration-300 group-hover:text-warmOrange-700 sm:line-clamp-1 sm:text-xl md:text-2xl">
          {item.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-charcoal-600">
          {item.description}
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <p className="text-2xl font-bold bg-gradient-to-r from-warmOrange-600 to-deepAmber-600 bg-clip-text text-transparent sm:text-3xl">
          {formatPrice(item.price)}
        </p>
        <GlassCardMetaRow>
          <div
            className="flex items-center gap-1.5"
            role="img"
            aria-label="Rating 4.2 out of 5 stars"
          >
            <div className="flex items-center" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < 4
                      ? 'fill-sunshineYellow-500 text-sunshineYellow-500'
                      : 'text-charcoal-300'
                  )}
                />
              ))}
            </div>
            <span className="font-medium text-charcoal-600">(4.2)</span>
          </div>
          <div className="text-right">
            <span className="text-charcoal-500">Calories </span>
            <span className="font-semibold text-charcoal-700">{item.calories ?? 350}</span>
          </div>
        </GlassCardMetaRow>
      </div>
    </GlassCardBody>

    <GlassCardFooter>
      <ThemedButton
        type="button"
        variant="accent"
        size="default"
        className="relative z-10 w-full touch-manipulation"
        onClick={() => onAddToCart(item)}
      >
        <PlusCircle className="mr-2 h-5 w-5" aria-hidden />
        Add to Order
      </ThemedButton>
    </GlassCardFooter>
  </GlassCard>
))

MenuItemCard.displayName = 'MenuItemCard'

export function MenuDisplay({ items, onAddToCart }: MenuDisplayProps) {
  if (!items || items.length === 0) {
    return (
      <GlassCard variant="elevated" className="items-center py-24 text-center">
        <Image
          src="/placeholder.svg?height=120&width=120&query=empty-plate"
          alt=""
          width={120}
          height={120}
          className="mb-8 opacity-60"
        />
        <h3 className="mb-4 font-display text-3xl font-bold text-charcoal-800">
          Menu Coming Soon!
        </h3>
        <p className="max-w-md px-6 text-lg leading-relaxed text-charcoal-600">
          Our chefs are busy crafting new delightful dishes. Please check back shortly for an
          updated menu.
        </p>
      </GlassCard>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
      {items.map((item, index) => (
        <div key={item.id} className="h-full">
          <MenuItemCard item={item} onAddToCart={onAddToCart} index={index} />
        </div>
      ))}
    </div>
  )
}
