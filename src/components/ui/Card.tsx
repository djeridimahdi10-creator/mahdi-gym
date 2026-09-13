import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'hover' | 'static' | 'premium' | 'glass' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    default: 'rounded-2xl border border-white/10 bg-dark-900/80 text-dark-100 shadow-xl backdrop-blur-xl',
    hover: 'rounded-2xl border border-white/10 bg-dark-900/80 text-dark-100 shadow-xl backdrop-blur-xl hover:border-white/20 hover:-translate-y-1 transition-all duration-300',
    static: 'rounded-2xl border border-white/10 bg-dark-900/90 text-dark-100 shadow-lg',
    premium: 'rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-950/40 via-dark-900/90 to-dark-950 shadow-2xl backdrop-blur-2xl',
    glass: 'rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md',
  }

  return (
    <div
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display font-bold text-lg text-white leading-tight tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-dark-400 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
