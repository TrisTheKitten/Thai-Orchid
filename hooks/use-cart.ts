"use client"

import { useCallback, useMemo, useState } from "react"
import type { MenuItem } from "@/lib/types/menu"
import type { CartItemView, CartLine } from "@/lib/types/checkout"

export function useCart(menuById: Map<string, MenuItem>) {
  const [lines, setLines] = useState<CartLine[]>([])

  const addToCart = useCallback((item: MenuItem) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [...prev, { id: item.id, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map((line) =>
          line.id === itemId ? { ...line, quantity: line.quantity - 1 } : line,
        )
      }
      return prev.filter((line) => line.id !== itemId)
    })
  }, [])

  const incrementItem = useCallback(
    (itemId: string) => {
      const item = menuById.get(itemId)
      if (item) addToCart(item)
    },
    [addToCart, menuById],
  )

  const clearCart = useCallback(() => setLines([]), [])

  const items = useMemo<CartItemView[]>(() => {
    return lines.flatMap((line) => {
      const menuItem = menuById.get(line.id)
      if (!menuItem) return []
      return [{ ...menuItem, quantity: line.quantity }]
    })
  }, [lines, menuById])

  const totalItems = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  )

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  return {
    items,
    addToCart,
    removeFromCart,
    incrementItem,
    clearCart,
    totalItems,
    totalPrice,
  }
}
