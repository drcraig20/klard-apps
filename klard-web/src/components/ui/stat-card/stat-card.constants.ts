import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export const trendConfig = {
  up: {
    icon: TrendingUp,
    className: "text-green-600 dark:text-green-400",
  },
  down: {
    icon: TrendingDown,
    className: "text-red-600 dark:text-red-400",
  },
  neutral: {
    icon: Minus,
    className: "text-slate-500 dark:text-slate-400",
  },
} as const

export type TrendDirection = keyof typeof trendConfig
