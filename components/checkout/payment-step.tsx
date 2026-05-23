"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CreditCard, QrCode } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formatPrice } from "@/lib/format-price"
import type { PaymentMethod } from "@/lib/types/checkout"
import type { PaymentFormValues } from "@/lib/validation/checkout"

interface PaymentStepProps {
  totalPrice: number
  paymentMethod: PaymentMethod
  referenceNumber: string
  onPaymentMethodChange: (method: PaymentMethod) => void
  onBack: () => void
  onNext: () => void
}

export function PaymentStep({
  totalPrice,
  paymentMethod,
  referenceNumber,
  onPaymentMethodChange,
  onBack,
  onNext,
}: PaymentStepProps) {
  const form = useFormContext<PaymentFormValues>()

  return (
    <motion.div
      key="payment"
      className="flex-1 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1">
        <Tabs
          value={paymentMethod}
          onValueChange={(value) => onPaymentMethodChange(value as PaymentMethod)}
          className="w-full"
        >
          <TabsList className="glass-sm grid w-full grid-cols-2 bg-white/40 backdrop-blur-sm rounded-glass-sm overflow-hidden shadow-glass-sm border border-warmOrange-100/30">
            <TabsTrigger
              value="card"
              className="text-charcoal-700 transition-colors duration-200 data-[state=active]:bg-white/80 data-[state=active]:text-warmOrange-700 data-[state=active]:shadow-glass-inner"
            >
              <CreditCard className="mr-2 h-4 w-4" /> Credit Card
            </TabsTrigger>
            <TabsTrigger
              value="qrcode"
              className="text-charcoal-700 transition-colors duration-200 data-[state=active]:bg-white/80 data-[state=active]:text-warmOrange-700 data-[state=active]:shadow-glass-inner"
            >
              <QrCode className="mr-2 h-4 w-4" /> Thailand QR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-4 space-y-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onNext)}
                id="payment-form"
              >
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-warmOrange-700">Name on Card*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                          placeholder="John Doe"
                        />
                      </FormControl>
                      <FormMessage className="text-berryRed-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-warmOrange-700">Card Number*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                          placeholder="1234 5678 9012 3456"
                        />
                      </FormControl>
                      <FormMessage className="text-berryRed-500" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-warmOrange-700">Expiry Date*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                            placeholder="MM/YY"
                          />
                        </FormControl>
                        <FormMessage className="text-berryRed-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-warmOrange-700">CVV*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                            placeholder="123"
                          />
                        </FormControl>
                        <FormMessage className="text-berryRed-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="qrcode" className="mt-4">
            <div className="relative flex flex-col items-center justify-center space-y-4 rounded-glass glass-lg bg-white/60 p-6 backdrop-blur-md shadow-glass-md">
              <h3 className="text-lg font-medium text-warmOrange-700">Thailand PromptPay QR Code</h3>
              <div className="rounded-glass glass-sm bg-white/80 p-4 shadow-glass-sm">
                <Image
                  src="/placeholder.svg?height=200&width=200&query=qr-code"
                  alt="QR Code for payment"
                  width={200}
                  height={200}
                  className="h-48 w-48"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-warmOrange-700">Amount: {formatPrice(totalPrice)}</p>
                <p className="text-sm text-warmOrange-700">Reference: {referenceNumber}</p>
                <p className="mt-2 text-xs text-warmOrange-600">
                  Scan this QR code with any Thai banking app that supports PromptPay
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-auto glass-lg rounded-t-glass p-6 shadow-glass-md">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="outline" type="button" onClick={onBack}>
            Back
          </Button>
          <span className="font-display text-xl font-bold text-warmOrange-600">
            {formatPrice(totalPrice)}
          </span>
        </div>
        {paymentMethod === "card" ? (
          <Button type="submit" form="payment-form" variant="accent" className="w-full font-semibold">
            Complete Payment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" variant="accent" className="w-full font-semibold" onClick={onNext}>
            I&apos;ve Paid with QR Code <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}
