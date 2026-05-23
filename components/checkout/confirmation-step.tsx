"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PaymentMethod } from "@/lib/types/checkout"

interface ConfirmationStepProps {
  paymentMethod: PaymentMethod
  referenceNumber: string
  onComplete: () => void
}

export function ConfirmationStep({
  paymentMethod,
  referenceNumber,
  onComplete,
}: ConfirmationStepProps) {
  return (
    <motion.div
      key="confirmation"
      className="flex flex-1 flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="rounded-full bg-gradient-to-r from-freshMint-300 to-freshMint-400 p-4 shadow-glass-sm">
        <Check strokeWidth={2} className="h-16 w-16 text-freshMint-700" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold text-warmOrange-700">Order Confirmed!</h3>
      <p className="mt-2 text-warmOrange-600">
        Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>
      <div className="mt-8 rounded-glass glass-lg border border-warmOrange-100/30 bg-white/60 p-6 backdrop-blur-md shadow-glass-md">
        <p className="text-lg font-semibold text-warmOrange-700">Estimated Delivery Time:</p>
        <p className="font-display text-2xl font-bold text-warmOrange-600">30-45 minutes</p>
        {paymentMethod === "qrcode" && (
          <p className="mt-2 text-sm text-warmOrange-500">Payment Reference: {referenceNumber}</p>
        )}
      </div>
      <Button variant="accent" className="mt-8 font-semibold" onClick={onComplete}>
        Back to Menu
      </Button>
    </motion.div>
  )
}
