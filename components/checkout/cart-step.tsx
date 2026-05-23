"use client"

import Image from "next/image"
import { Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GlassCard } from "@/components/ui/glass-card"
import { formatPrice } from "@/lib/format-price"
import { CART_ITEM_IMAGE_SIZES } from "@/lib/image-sizes"
import type { CartItemView } from "@/lib/types/checkout"

interface CartStepProps {
  cart: CartItemView[]
  totalPrice: number
  onClose: () => void
  onRemoveItem: (itemId: string) => void
  onIncrementItem: (itemId: string) => void
  onNext: () => void
}

export function CartStep({
  cart,
  totalPrice,
  onClose,
  onRemoveItem,
  onIncrementItem,
  onNext,
}: CartStepProps) {
  if (cart.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-12 animate-fade-in">
        <div className="mb-6 rounded-full bg-gradient-to-br from-warmOrange-100 to-deepAmber-100 p-8">
          <ShoppingBag className="h-12 w-12 text-warmOrange-400" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-charcoal-800">Your cart is empty</h3>
        <p className="mb-6 px-4 text-center text-charcoal-600">
          Add some delicious items from our menu to get started!
        </p>
        <Button variant="accent" onClick={onClose} className="rounded-full px-8 font-semibold">
          Browse Menu
        </Button>
      </div>
    )
  }

  return (
    <>
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {cart.map((item) => (
            <GlassCard key={item.id} variant="compact" interactive className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="relative shrink-0 overflow-hidden rounded-xl ring-1 ring-white/30">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      sizes={CART_ITEM_IMAGE_SIZES}
                      className="h-16 w-16 object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h4 className="truncate font-semibold text-charcoal-800 transition-colors group-hover:text-warmOrange-700">
                      {item.name}
                    </h4>
                    <p className="text-lg font-bold bg-gradient-to-r from-warmOrange-600 to-deepAmber-600 bg-clip-text text-transparent">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-charcoal-500">
                      @ {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <Button
                    variant="iconOutline"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="flex h-11 min-w-[2rem] items-center justify-center rounded-full bg-white/70 px-2 text-center font-bold text-charcoal-800">
                    {item.quantity}
                  </span>
                  <Button
                    variant="iconOutline"
                    size="icon"
                    onClick={() => onIncrementItem(item.id)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </ScrollArea>

      <div className="glass-blur mt-auto rounded-t-2xl border-t border-white/50 p-4 shadow-glass-lg sm:p-6">
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal-600">Subtotal</span>
            <span className="font-medium text-charcoal-800">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal-600">Delivery Fee</span>
            <span className="font-medium text-freshMint-600">Free</span>
          </div>
          <div className="border-t border-white/30 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-charcoal-800">Total</span>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-warmOrange-600 to-deepAmber-600 bg-clip-text text-transparent">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>
        <Button variant="accent" className="w-full rounded-2xl py-4 font-semibold" onClick={onNext}>
          <span className="flex items-center justify-center gap-2">
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Button>
      </div>
    </>
  )
}
