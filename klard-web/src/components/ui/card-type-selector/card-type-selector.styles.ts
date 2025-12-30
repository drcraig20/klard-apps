import { cva } from "class-variance-authority"

export const cardTypeSelectorVariants = cva(
  "grid gap-3",
  {
    variants: {
      columns: {
        2: "grid-cols-1 sm:grid-cols-2",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 2,
    },
  }
)

export const cardTypeOptionVariants = cva(
  [
    "relative flex flex-col gap-2 p-4 rounded-xl border transition-all duration-200",
    "cursor-pointer select-none",
    "hover:shadow-md hover:border-primary/30",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "bg-card/80 backdrop-blur-sm",
  ],
  {
    variants: {
      selected: {
        true: [
          "border-primary border-2",
          "bg-primary/5 dark:bg-primary/10",
          "shadow-md",
        ],
        false: "border-border",
      },
      recommended: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      recommended: false,
    },
  }
)

export const cardTypeIconVariants = cva(
  "flex items-center justify-center rounded-lg p-2 w-10 h-10",
  {
    variants: {
      selected: {
        true: "bg-primary text-primary-foreground",
        false: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export const cardTypeLabelVariants = cva("font-semibold text-sm", {
  variants: {
    selected: {
      true: "text-primary",
      false: "text-foreground",
    },
  },
  defaultVariants: {
    selected: false,
  },
})

export const cardTypeDescriptionVariants = cva(
  "text-xs text-muted-foreground leading-relaxed",
  {}
)

export const recommendedBadgeVariants = cva(
  [
    "absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-medium",
    "bg-primary text-primary-foreground",
    "shadow-sm",
  ],
  {}
)