import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-emerald-500 via-primary-500 to-teal-500 text-dark-950 font-bold hover:from-emerald-400 hover:to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] border-none",
        primary:
          "bg-gradient-to-r from-emerald-500 via-primary-500 to-teal-500 text-dark-950 font-bold hover:from-emerald-400 hover:to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] border-none",
        secondary:
          "bg-dark-800 text-dark-100 hover:bg-dark-700 hover:text-white border border-white/10",
        destructive:
          "bg-red-500/15 text-red-300 hover:bg-red-500/25 border border-red-500/30",
        danger:
          "bg-red-500/15 text-red-300 hover:bg-red-500/25 border border-red-500/30",
        outline:
          "border border-white/15 bg-transparent text-dark-200 hover:bg-white/[0.06] hover:text-white hover:border-white/30",
        ghost:
          "text-dark-300 hover:bg-white/[0.08] hover:text-white border border-transparent",
        link: "text-primary-400 underline-offset-4 hover:underline",
        energy:
          "bg-gradient-to-r from-energy-500 via-energy-400 to-amber-500 text-dark-950 font-bold hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.35)]",
        ai:
          "bg-gradient-to-r from-ai-500 via-ai-600 to-purple-600 text-white font-bold hover:brightness-110 shadow-[0_0_20px_rgba(168,85,247,0.35)]",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs",
        xs: "h-7 px-2.5 text-[11px] rounded-lg",
        sm: "h-8 px-3 text-xs rounded-lg",
        md: "h-10 px-5 text-xs rounded-xl",
        lg: "h-12 px-8 text-sm rounded-2xl font-bold",
        icon: "h-9 w-9 p-0 rounded-xl",
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
  loading?: boolean
  glow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, glow, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
