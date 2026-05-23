import { ShoppingBag, Truck, CreditCard, Check, type LucideIcon } from "lucide-react"
import type { CheckoutStep } from "@/lib/types/checkout"

interface StepConfig {
  title: string
  subtitle: string
  icon: LucideIcon
  progress: string
}

export const CHECKOUT_STEP_CONFIG: Record<CheckoutStep, StepConfig> = {
  cart: {
    title: "Your Cart",
    subtitle: "Review your order",
    icon: ShoppingBag,
    progress: "25%",
  },
  delivery: {
    title: "Delivery Details",
    subtitle: "Where should we deliver?",
    icon: Truck,
    progress: "50%",
  },
  payment: {
    title: "Payment",
    subtitle: "Choose your payment method",
    icon: CreditCard,
    progress: "75%",
  },
  confirmation: {
    title: "Order Confirmed",
    subtitle: "Thank you for your order!",
    icon: Check,
    progress: "100%",
  },
}

export function getCartSubtitle(itemCount: number): string {
  return `${itemCount} items selected`
}
