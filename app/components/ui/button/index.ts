import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        generate:
          "w-full bg-esp-900 text-text-on-dark border border-esp-700 hover:bg-esp-800 hover:border-primary/40 hover:shadow-accent transition-all duration-300",
        "primary-gradient":
          "bg-gradient-to-r from-primary to-accent text-white shadow-button-glow hover:brightness-110 transition-all duration-300",
      },
      size: {
        "sm": "h-8 rounded-md gap-1.5 px-3 text-sm",
        "md": "h-9 rounded-md gap-2 px-4 text-sm",
        "lg": "h-11 rounded-md gap-2 px-6 text-base",
        "xl": "h-14 rounded-md gap-2 px-6 text-base",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
        "pill": "h-9 px-6 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
