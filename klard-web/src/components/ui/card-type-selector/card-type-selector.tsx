"use client"

/**
 * CardTypeSelector Component
 *
 * Allows users to choose between different card types with context-aware recommendations.
 *
 * SOLID Compliance:
 * - SRP: Handles card type selection only
 * - OCP: Extensible via CARD_TYPES config, no modification needed for new types
 * - DIP: Depends on CardType abstraction
 */

import * as React from "react"
import { Zap, RefreshCw, Tag, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  cardTypeSelectorVariants,
  cardTypeOptionVariants,
  cardTypeIconVariants,
  cardTypeLabelVariants,
  cardTypeDescriptionVariants,
  recommendedBadgeVariants,
} from "./card-type-selector.styles"

/**
 * Available card types for burner card creation
 */
export type CardType =
  | "one-time"
  | "recurring"
  | "category-locked"
  | "merchant-locked"

/**
 * Context for card type recommendations
 */
export type CardContext = "trial" | "subscription" | "general"

/**
 * Card type configuration
 */
interface CardTypeConfig {
  type: CardType
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  advanced?: boolean
}

/**
 * Card types configuration - extend by adding to this array (OCP)
 */
const CARD_TYPES: readonly CardTypeConfig[] = [
  {
    type: "one-time",
    label: "One-Time",
    description: "Single use, auto-closes after charge",
    icon: Zap,
    advanced: false,
  },
  {
    type: "recurring",
    label: "Recurring",
    description: "For subscriptions, stays open",
    icon: RefreshCw,
    advanced: false,
  },
  {
    type: "category-locked",
    label: "Category-Locked",
    description: "Locked to merchant category",
    icon: Tag,
    advanced: true,
  },
  {
    type: "merchant-locked",
    label: "Merchant-Locked",
    description: "Locked to specific merchant",
    icon: Store,
    advanced: true,
  },
] as const

/**
 * Context-to-recommended-type mapping (OCP)
 */
const CONTEXT_RECOMMENDATIONS: Record<CardContext, CardType | null> = {
  trial: "one-time",
  subscription: "recurring",
  general: null,
}

export interface CardTypeSelectorProps {
  /** Context for recommendations */
  context?: CardContext
  /** Callback when a card type is selected */
  onSelect: (type: CardType) => void
  /** Whether to show advanced options */
  showAdvanced?: boolean
  /** Currently selected value */
  value?: CardType
  /** Additional CSS class */
  className?: string
}

/**
 * CardTypeSelector - Card type selection with context-aware recommendations
 *
 * @example
 * // Trial context - recommends One-Time
 * <CardTypeSelector context="trial" onSelect={handleSelect} />
 *
 * @example
 * // Show all options including advanced
 * <CardTypeSelector showAdvanced onSelect={handleSelect} value="recurring" />
 */
export function CardTypeSelector({
  context,
  onSelect,
  showAdvanced = false,
  value,
  className,
}: Readonly<CardTypeSelectorProps>) {
  // Filter card types based on showAdvanced
  const visibleTypes = showAdvanced
    ? CARD_TYPES
    : CARD_TYPES.filter((type) => !type.advanced)

  // Get recommended type based on context
  const recommendedType = context ? CONTEXT_RECOMMENDATIONS[context] : null

  return (
    <div
      data-testid="card-type-selector"
      data-slot="card-type-selector"
      className={cn(
        cardTypeSelectorVariants({ columns: showAdvanced ? 4 : 2 }),
        className
      )}
    >
      {visibleTypes.map((cardType) => {
        const isSelected = value === cardType.type
        const isRecommended = recommendedType === cardType.type
        const Icon = cardType.icon

        return (
          <button
            key={cardType.type}
            type="button"
            onClick={() => onSelect(cardType.type)}
            data-selected={isSelected ? "true" : undefined}
            data-recommended={isRecommended ? "true" : undefined}
            aria-pressed={isSelected}
            className={cn(
              cardTypeOptionVariants({
                selected: isSelected,
                recommended: isRecommended,
              })
            )}
          >
            {isRecommended && (
              <span className={cn(recommendedBadgeVariants())}>
                Recommended
              </span>
            )}

            <div className="flex items-start gap-3">
              <div
                className={cn(
                  cardTypeIconVariants({ selected: isSelected })
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex flex-col items-start gap-1 text-left">
                <span
                  className={cn(
                    cardTypeLabelVariants({ selected: isSelected })
                  )}
                >
                  {cardType.label}
                </span>
                <span className={cn(cardTypeDescriptionVariants())}>
                  {cardType.description}
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}