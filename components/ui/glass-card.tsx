'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glassCardVariants = cva(
  'relative flex flex-col overflow-hidden border ring-1 ring-white/20 glass-blur transition-shadow duration-200 ease-out',
  {
    variants: {
      variant: {
        default:
          'rounded-3xl border-white/50 shadow-glass-lg hover:shadow-glass-hover md:hover:bg-white/40',
        compact:
          'rounded-2xl border-white/50 shadow-glass-sm hover:shadow-glass-hover md:hover:bg-white/40',
        elevated: 'rounded-3xl border-white/50 shadow-glass-lg',
        feature: 'rounded-2xl border-white/50 shadow-glass-lg',
      },
      interactive: {
        true: 'group h-full glass-card-hover',
        false: '',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
      glow: false,
    },
  }
)

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, interactive, glow, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(glassCardVariants({ variant, interactive, glow, className }))}
      {...props}
    >
      {children}
    </div>
  )
)
GlassCard.displayName = 'GlassCard'

const GlassCardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative aspect-[4/3] overflow-hidden', className)}
    {...props}
  >
    {children}
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden
    />
  </div>
))
GlassCardMedia.displayName = 'GlassCardMedia'

const GlassCardBadgeRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3 sm:p-4',
      className
    )}
    {...props}
  />
))
GlassCardBadgeRow.displayName = 'GlassCardBadgeRow'

const GlassCardBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { accent?: boolean }
>(({ className, accent = false, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex max-w-[45%] items-center truncate rounded-full border px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs',
      accent
        ? 'border-white/30 bg-gradient-to-r from-warmOrange-500/90 to-deepAmber-600/90 font-semibold text-white shadow-glass-sm'
        : 'border-white/20 bg-black/50 text-white',
      className
    )}
    {...props}
  />
))
GlassCardBadge.displayName = 'GlassCardBadge'

const GlassCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-grow flex-col p-4 sm:p-6 md:p-7', className)}
    {...props}
  />
))
GlassCardBody.displayName = 'GlassCardBody'

const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative z-10 p-4 pt-0 sm:p-6 sm:pt-0 md:px-7 md:pb-7', className)}
    {...props}
  />
))
GlassCardFooter.displayName = 'GlassCardFooter'

const GlassCardMetaRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-between gap-3 text-xs text-charcoal-600',
      className
    )}
    {...props}
  />
))
GlassCardMetaRow.displayName = 'GlassCardMetaRow'

export {
  GlassCard,
  GlassCardMedia,
  GlassCardBadgeRow,
  GlassCardBadge,
  GlassCardBody,
  GlassCardFooter,
  GlassCardMetaRow,
  glassCardVariants,
}
