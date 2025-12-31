import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export const trendConfig = {
  up: {
    icon: TrendingUp,
    className: "text-success",
  },
  down: {
    icon: TrendingDown,
    className: "text-destructive",
  },
  neutral: {
    icon: Minus,
    className: "text-muted-foreground",
  },
} as const

export type TrendDirection = keyof typeof trendConfig
