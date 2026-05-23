"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formatPrice } from "@/lib/format-price"
import type { DeliveryFormValues } from "@/lib/validation/checkout"

interface DeliveryStepProps {
  totalPrice: number
  onBack: () => void
  onNext: () => void
}

export function DeliveryStep({ totalPrice, onBack, onNext }: DeliveryStepProps) {
  const form = useFormContext<DeliveryFormValues>()

  return (
    <motion.div
      key="delivery"
      className="flex-1 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Form {...form}>
        <form
          className="space-y-4 flex-1"
          onSubmit={form.handleSubmit(onNext)}
          id="delivery-form"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-warmOrange-700">Full Name*</FormLabel>
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-warmOrange-700">Delivery Address*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="123 Main St"
                  />
                </FormControl>
                <FormMessage className="text-berryRed-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-warmOrange-700">Phone Number*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="(555) 123-4567"
                  />
                </FormControl>
                <FormMessage className="text-berryRed-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-warmOrange-700">Delivery Instructions (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="Leave at door, etc."
                  />
                </FormControl>
                <FormMessage className="text-berryRed-500" />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-auto glass-lg rounded-t-glass p-6 shadow-glass-md">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="outline" type="button" onClick={onBack}>
            Back to Cart
          </Button>
          <span className="font-display text-xl font-bold text-warmOrange-600">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <Button type="submit" form="delivery-form" variant="accent" className="w-full font-semibold">
          Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
