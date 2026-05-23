'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warmOrange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 text-white shadow-glass-sm hover:from-warmOrange-600 hover:to-deepAmber-700 hover:shadow-glass-md",
        accent:
          "bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 text-white shadow-glass-sm hover:from-warmOrange-600 hover:to-deepAmber-700 hover:shadow-glass-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-warmOrange-300/60 bg-white/80 text-charcoal-800 hover:border-warmOrange-400 hover:bg-white hover:text-charcoal-900",
        secondary:
          "border border-warmOrange-200/50 bg-warmOrange-50/80 text-charcoal-800 hover:bg-warmOrange-100/80 hover:text-charcoal-900",
        ghost:
          "text-charcoal-700 hover:bg-warmOrange-100/60 hover:text-warmOrange-800",
        link: "text-warmOrange-700 underline-offset-4 hover:text-warmOrange-800 hover:underline",
        iconOutline:
          "border border-warmOrange-300/60 bg-white/80 text-warmOrange-700 hover:border-warmOrange-500 hover:bg-warmOrange-50 hover:text-warmOrange-800",
      },
      size: {
        default: "h-11 min-h-11 px-4 py-2",
        sm: "h-9 min-h-9 rounded-lg px-3",
        lg: "h-12 min-h-12 rounded-2xl px-8 text-base",
        icon: "h-11 min-h-11 w-11 min-w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
