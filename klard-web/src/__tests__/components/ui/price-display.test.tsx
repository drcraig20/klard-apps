/**
 * Tests for PriceDisplay Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, billing cycles, price changes, accessibility
 */

import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PriceDisplay } from "@/components/ui/price-display"

describe("PriceDisplay", () => {
  describe("Basic Rendering", () => {
    it("should render the formatted price", () => {
      render(<PriceDisplay amount={9.99} />)

      expect(screen.getByText("$9.99")).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(<PriceDisplay amount={9.99} />)

      const element = screen.getByText("$9.99").closest('[data-slot="price-display"]')
      expect(element).toBeInTheDocument()
    })

    it("should format currency with two decimal places", () => {
      render(<PriceDisplay amount={100} />)

      expect(screen.getByText("$100.00")).toBeInTheDocument()
    })

    it("should handle zero amount", () => {
      render(<PriceDisplay amount={0} />)

      expect(screen.getByText("$0.00")).toBeInTheDocument()
    })

    it("should handle large amounts with thousand separators", () => {
      render(<PriceDisplay amount={1234.56} />)

      expect(screen.getByText("$1,234.56")).toBeInTheDocument()
    })
  })

  describe("Currency Support", () => {
    it("should default to USD currency", () => {
      render(<PriceDisplay amount={50} />)

      expect(screen.getByText("$50.00")).toBeInTheDocument()
    })

    it("should support EUR currency", () => {
      render(<PriceDisplay amount={50} currency="EUR" />)

      // Intl.NumberFormat uses locale-appropriate symbol placement
      expect(screen.getByText(/€50\.00|50,00\s?€/)).toBeInTheDocument()
    })

    it("should support GBP currency", () => {
      render(<PriceDisplay amount={50} currency="GBP" />)

      expect(screen.getByText("£50.00")).toBeInTheDocument()
    })
  })

  describe("Size Variants", () => {
    it("should apply sm size", () => {
      render(<PriceDisplay amount={9.99} size="sm" />)

      const element = screen.getByText("$9.99").closest('[data-slot="price-display"]')
      expect(element?.className).toMatch(/text-sm/)
    })

    it("should apply md size by default", () => {
      render(<PriceDisplay amount={9.99} />)

      const element = screen.getByText("$9.99").closest('[data-slot="price-display"]')
      expect(element?.className).toMatch(/text-base/)
    })

    it("should apply lg size", () => {
      render(<PriceDisplay amount={9.99} size="lg" />)

      const element = screen.getByText("$9.99").closest('[data-slot="price-display"]')
      expect(element?.className).toMatch(/text-lg|text-xl/)
    })
  })

  describe("Billing Cycle Labels", () => {
    it("should not show billing cycle by default", () => {
      render(<PriceDisplay amount={9.99} />)

      expect(screen.queryByText(/\/mo|\/yr|\/wk/)).not.toBeInTheDocument()
    })

    it("should show /mo for monthly billing", () => {
      render(<PriceDisplay amount={9.99} billingCycle="monthly" />)

      expect(screen.getByText("/mo")).toBeInTheDocument()
    })

    it("should show /yr for yearly billing", () => {
      render(<PriceDisplay amount={99.99} billingCycle="yearly" />)

      expect(screen.getByText("/yr")).toBeInTheDocument()
    })

    it("should show /wk for weekly billing", () => {
      render(<PriceDisplay amount={2.99} billingCycle="weekly" />)

      expect(screen.getByText("/wk")).toBeInTheDocument()
    })

    it("should show nothing for one-time billing", () => {
      render(<PriceDisplay amount={299.99} billingCycle="one-time" />)

      expect(screen.queryByText(/\/mo|\/yr|\/wk/)).not.toBeInTheDocument()
    })
  })

  describe("Price Change Indicators", () => {
    it("should not show change indicator by default", () => {
      render(<PriceDisplay amount={9.99} />)

      expect(screen.queryByTestId("price-change-indicator")).not.toBeInTheDocument()
    })

    it("should show increase indicator with destructive color", () => {
      render(
        <PriceDisplay
          amount={12.99}
          showChange={{ from: 9.99, direction: "increase" }}
        />
      )

      const indicator = screen.getByTestId("price-change-indicator")
      expect(indicator).toBeInTheDocument()
      expect(indicator.className).toContain("text-destructive")
    })

    it("should show decrease indicator with success color", () => {
      render(
        <PriceDisplay
          amount={7.99}
          showChange={{ from: 9.99, direction: "decrease" }}
        />
      )

      const indicator = screen.getByTestId("price-change-indicator")
      expect(indicator).toBeInTheDocument()
      expect(indicator.className).toContain("text-success")
    })

    it("should display the price difference amount for increase", () => {
      render(
        <PriceDisplay
          amount={12.99}
          showChange={{ from: 9.99, direction: "increase" }}
        />
      )

      // Difference is $3.00
      expect(screen.getByText("$3.00")).toBeInTheDocument()
    })

    it("should display the price difference amount for decrease", () => {
      render(
        <PriceDisplay
          amount={7.99}
          showChange={{ from: 9.99, direction: "decrease" }}
        />
      )

      // Difference is $2.00
      expect(screen.getByText("$2.00")).toBeInTheDocument()
    })

    it("should show up arrow icon for increase", () => {
      render(
        <PriceDisplay
          amount={12.99}
          showChange={{ from: 9.99, direction: "increase" }}
        />
      )

      expect(screen.getByTestId("arrow-up-icon")).toBeInTheDocument()
    })

    it("should show down arrow icon for decrease", () => {
      render(
        <PriceDisplay
          amount={7.99}
          showChange={{ from: 9.99, direction: "decrease" }}
        />
      )

      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument()
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(<PriceDisplay amount={9.99} className="custom-class" />)

      const element = screen.getByText("$9.99").closest('[data-slot="price-display"]')
      expect(element?.className).toContain("custom-class")
    })
  })

  describe("Edge Cases", () => {
    it("should handle negative amounts", () => {
      render(<PriceDisplay amount={-9.99} />)

      expect(screen.getByText("-$9.99")).toBeInTheDocument()
    })

    it("should handle very small amounts", () => {
      render(<PriceDisplay amount={0.01} />)

      expect(screen.getByText("$0.01")).toBeInTheDocument()
    })
  })
})
