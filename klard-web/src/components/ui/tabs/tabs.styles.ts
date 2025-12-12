import { cva } from "class-variance-authority"

export const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  {
    variants: {
      size: {
        md: "h-10 gap-1",
        sm: "h-8 gap-0.5 text-sm",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
)

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-primary",
  {
    variants: {
      size: {
        md: "py-1.5 text-sm",
        sm: "py-1 text-xs",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
)
