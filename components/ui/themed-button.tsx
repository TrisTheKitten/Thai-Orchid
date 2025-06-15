'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group',
  {
    variants: {
      variant: {
        default:
          'bg-white/30 text-slate-800 backdrop-blur-md shadow-lg border border-white/40 hover:bg-white/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] active:bg-white/40',
        destructive:
          'bg-red-500/30 text-red-100 backdrop-blur-md shadow-lg border border-red-500/40 hover:bg-red-500/50 hover:shadow-xl',
        outline:
          'border border-white/40 bg-transparent backdrop-blur-md text-slate-700 hover:bg-white/20 hover:text-slate-900 hover:shadow-md',
        secondary:
          'bg-slate-500/20 text-slate-700 backdrop-blur-md shadow-md border border-slate-500/30 hover:bg-slate-500/30 hover:shadow-lg',
        ghost: 'hover:bg-white/20 hover:text-slate-900 backdrop-blur-sm',
        link: 'text-primary underline-offset-4 hover:underline',
        accent:
          'bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 text-white backdrop-blur-md shadow-lg border border-warmOrange-500/40 hover:from-warmOrange-600 hover:to-deepAmber-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        default: 'h-11 px-6 py-3',
        sm: 'h-10 rounded-lg px-4',
        lg: 'h-12 rounded-2xl px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const ThemedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </Comp>
    )
  }
)
ThemedButton.displayName = 'ThemedButton'

export { ThemedButton, buttonVariants }
