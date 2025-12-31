import { cva } from "class-variance-authority"

export const segmentedControlVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
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
})

export const tabsListVariants = cva(
  "bg-muted",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
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
  "data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-background dark:data-[state=active]:text-primary",
  {
    variants: {
      size: {
        sm: "text-sm px-2",
        md: "text-sm px-3",
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
