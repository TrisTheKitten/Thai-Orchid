"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CartStep } from "@/components/checkout/cart-step"
import { DeliveryStep } from "@/components/checkout/delivery-step"
import { PaymentStep } from "@/components/checkout/payment-step"
import { ConfirmationStep } from "@/components/checkout/confirmation-step"
import { CHECKOUT_STEP_CONFIG, getCartSubtitle } from "@/components/checkout/step-config"
import {
  deliverySchema,
  paymentSchema,
  type DeliveryFormValues,
  type PaymentFormValues,
} from "@/lib/validation/checkout"
import type { CartItemView, CheckoutStep, PaymentMethod } from "@/lib/types/checkout"

interface CheckoutSidebarProps {
  onClose: () => void
  cart: CartItemView[]
  totalPrice: number
  onRemoveItem: (itemId: string) => void
  onIncrementItem: (itemId: string) => void
  onClearCart: () => void
}

export function CheckoutSidebar({
  onClose,
  cart,
  totalPrice,
  onRemoveItem,
  onIncrementItem,
  onClearCart,
}: CheckoutSidebarProps) {
  const { toast } = useToast()
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const referenceNumberRef = useRef<string | null>(null)

  const deliveryForm = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { name: "", address: "", phone: "", instructions: "" },
  })

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardName: "", cardNumber: "", expiry: "", cvv: "" },
  })

  const ensureReferenceNumber = useCallback(() => {
    if (!referenceNumberRef.current) {
      referenceNumberRef.current = Math.floor(10000000 + Math.random() * 90000000).toString()
    }
    return referenceNumberRef.current
  }, [])

  const resetCheckout = useCallback(() => {
    setCheckoutStep("cart")
    setPaymentMethod("card")
    referenceNumberRef.current = null
    deliveryForm.reset()
    paymentForm.reset()
  }, [deliveryForm, paymentForm])

  useEffect(() => {
    return () => resetCheckout()
  }, [resetCheckout])

  const handleCartNext = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }
    setCheckoutStep("delivery")
  }

  const handleDeliveryNext = () => {
    ensureReferenceNumber()
    setCheckoutStep("payment")
  }

  const handlePaymentNext = () => {
    setCheckoutStep("confirmation")
    toast({
      title: "Order placed successfully!",
      description: "Your order has been confirmed.",
    })
  }

  const handleComplete = () => {
    onClose()
    onClearCart()
    resetCheckout()
  }

  const prevCheckoutStep = () => {
    if (checkoutStep === "delivery") setCheckoutStep("cart")
    else if (checkoutStep === "payment") setCheckoutStep("delivery")
    else if (checkoutStep === "confirmation") setCheckoutStep("payment")
  }

  const stepConfig = CHECKOUT_STEP_CONFIG[checkoutStep]
  const StepIcon = stepConfig.icon
  const subtitle =
    checkoutStep === "cart" ? getCartSubtitle(cart.length) : stepConfig.subtitle

  const panelTransition = { type: "tween" as const, ease: [0.32, 0.72, 0, 1] as const, duration: 0.28 }

  return (
    <>
      <motion.button
        type="button"
        key="sidebar-backdrop"
        className="fixed inset-0 z-40 bg-charcoal-900/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        aria-label="Close cart"
        onClick={onClose}
      />
      <motion.div
        key="sidebar"
        className="fixed inset-0 z-50 flex w-full flex-col bg-gradient-to-br from-white/98 via-warmOrange-50/95 to-sunshineYellow-50/90 shadow-glass-xl sm:inset-y-0 sm:left-auto sm:max-w-lg sm:rounded-l-3xl sm:border-l sm:border-white/40 md:backdrop-blur-md"
        style={{ willChange: "transform" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={panelTransition}
      >
      <div className="relative flex shrink-0 items-center justify-between gap-3 border-b border-white/30 bg-gradient-to-r from-warmOrange-50/80 to-deepAmber-50/80 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pb-6 sm:pt-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div
            className="shrink-0 rounded-full bg-gradient-to-br from-warmOrange-500 to-deepAmber-600 p-2.5 text-white shadow-glass-sm sm:p-3"
            aria-hidden
          >
            <StepIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-bold text-charcoal-800 sm:text-2xl">{stepConfig.title}</h2>
            <p className="truncate text-xs text-charcoal-700 sm:text-sm">{subtitle}</p>
          </div>
        </div>
        <Button
          variant="iconOutline"
          size="icon"
          onClick={onClose}
          aria-label="Close cart"
        >
          <X className="h-4 w-4" aria-hidden />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40" aria-hidden>
          <div
            className="h-full rounded-full bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 transition-[width] duration-300 ease-out"
            style={{ width: stepConfig.progress }}
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          {checkoutStep === "cart" && (
            <motion.div
              key="cart-items"
              className="flex flex-1 flex-col"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <CartStep
                cart={cart}
                totalPrice={totalPrice}
                onClose={onClose}
                onRemoveItem={onRemoveItem}
                onIncrementItem={onIncrementItem}
                onNext={handleCartNext}
              />
            </motion.div>
          )}

          {checkoutStep === "delivery" && (
            <FormProvider {...deliveryForm}>
              <DeliveryStep
                totalPrice={totalPrice}
                onBack={prevCheckoutStep}
                onNext={handleDeliveryNext}
              />
            </FormProvider>
          )}

          {checkoutStep === "payment" && (
            <FormProvider {...paymentForm}>
              <PaymentStep
                totalPrice={totalPrice}
                paymentMethod={paymentMethod}
                referenceNumber={ensureReferenceNumber()}
                onPaymentMethodChange={setPaymentMethod}
                onBack={prevCheckoutStep}
                onNext={handlePaymentNext}
              />
            </FormProvider>
          )}

          {checkoutStep === "confirmation" && (
            <ConfirmationStep
              paymentMethod={paymentMethod}
              referenceNumber={ensureReferenceNumber()}
              onComplete={handleComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </>
  )
}
