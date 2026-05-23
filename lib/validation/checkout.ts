import { z } from "zod"

export const deliverySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  address: z.string().trim().min(1, "Address is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((value) => /^\d{10}$/.test(value.replace(/\D/g, "")), {
      message: "Please enter a valid phone number",
    }),
  instructions: z.string(),
})

export const paymentSchema = z.object({
  cardName: z.string().trim().min(1, "Name on card is required"),
  cardNumber: z
    .string()
    .trim()
    .min(1, "Card number is required")
    .refine((value) => /^\d{16}$/.test(value.replace(/\D/g, "")), {
      message: "Please enter a valid 16-digit card number",
    }),
  expiry: z
    .string()
    .trim()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\/\d{2}$/, "Please use MM/YY format"),
  cvv: z
    .string()
    .trim()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "Please enter a valid CVV"),
})

export type DeliveryFormValues = z.infer<typeof deliverySchema>
export type PaymentFormValues = z.infer<typeof paymentSchema>
