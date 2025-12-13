import { cva } from "class-variance-authority"

export const switchVariants = cva(
  "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const thumbVariants = cva(
  "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "size-3 data-[state=checked]:translate-x-[calc(100%-2px)]",
        md: "size-4 data-[state=checked]:translate-x-[calc(100%-2px)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)
