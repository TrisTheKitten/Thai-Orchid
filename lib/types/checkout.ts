import type { MenuItem } from "./menu"

export type CartLine = { id: string; quantity: number }

export interface CartItemView extends MenuItem {
  quantity: number
}

export type CheckoutStep = "cart" | "delivery" | "payment" | "confirmation"

export type PaymentMethod = "card" | "qrcode"

export interface DeliveryFormData {
  name: string
  address: string
  phone: string
  instructions: string
}

export interface PaymentFormData {
  cardName: string
  cardNumber: string
  expiry: string
  cvv: string
}
