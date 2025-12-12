/**
 * Tests for StatCard Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, trend variants, icon support, size variants, muted tone, click handling, accessibility
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { StatCard } from "@/components/ui/stat-card"

describe("StatCard", () => {
  describe("Rendering", () => {
    it("should render label and value", () => {
      render(<StatCard label="Total Savings" value="$1,234" />)

      expect(screen.getByText("Total Savings")).toBeInTheDocument()
      expect(screen.getByText("$1,234")).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(<StatCard label="Metrics" value={100} />)

      const card = screen.getByText("Metrics").closest('[data-slot="stat-card"]')
      expect(card).toBeInTheDocument()
    })

    it("should render numeric value", () => {
      render(<StatCard label="Count" value={42} />)

      expect(screen.getByText("42")).toBeInTheDocument()
    })
  })

  describe("Trend Indicator", () => {
    it("should render up trend with green color", () => {
      render(
        <StatCard
          label="Growth"
          value="$500"
          trend={{ direction: "up", value: "+12%" }}
        />
      )

      const trendElement = screen.getByText("+12%")
      expect(trendElement).toBeInTheDocument()
      expect(trendElement.closest('[data-trend]')).toHaveAttribute('data-trend', 'up')
    })

    it("should render down trend with red color", () => {
      render(
        <StatCard
          label="Decline"
          value="$200"
          trend={{ direction: "down", value: "-8%" }}
        />
      )

      const trendElement = screen.getByText("-8%")
      expect(trendElement).toBeInTheDocument()
      expect(trendElement.closest('[data-trend]')).toHaveAttribute('data-trend', 'down')
    })

    it("should render neutral trend with slate color", () => {
      render(
        <StatCard
          label="Stable"
          value="$100"
          trend={{ direction: "neutral", value: "0%" }}
        />
      )

      const trendElement = screen.getByText("0%")
      expect(trendElement).toBeInTheDocument()
      expect(trendElement.closest('[data-trend]')).toHaveAttribute('data-trend', 'neutral')
    })

    it("should not render trend when not provided", () => {
      render(<StatCard label="No Trend" value="$50" />)

      expect(screen.queryByTestId("trend-indicator")).not.toBeInTheDocument()
    })
  })

  describe("Icon Support", () => {
    it("should render icon when provided", () => {
      const icon = <span data-testid="test-icon">💰</span>
      render(<StatCard label="Savings" value="$100" icon={icon} />)

      expect(screen.getByTestId("test-icon")).toBeInTheDocument()
    })

    it("should not render icon container when icon not provided", () => {
      render(<StatCard label="No Icon" value="$100" />)

      expect(screen.queryByTestId("stat-card-icon")).not.toBeInTheDocument()
    })
  })

  describe("Size Variants", () => {
    it("should apply sm size classes", () => {
      render(<StatCard label="Small" value="100" size="sm" />)

      const card = screen.getByText("Small").closest('[data-slot="stat-card"]')
      expect(card?.className).toMatch(/py-3|px-4|text-sm/)
    })

    it("should apply md size classes (default)", () => {
      render(<StatCard label="Medium" value="100" />)

      const card = screen.getByText("Medium").closest('[data-slot="stat-card"]')
      expect(card).toBeTruthy()
    })

    it("should apply lg size classes", () => {
      render(<StatCard label="Large" value="100" size="lg" />)

      const card = screen.getByText("Large").closest('[data-slot="stat-card"]')
      expect(card?.className).toMatch(/py-5|px-5|text-lg/)
    })
  })

  describe("Muted Tone", () => {
    it("should apply muted styling when muted prop is true", () => {
      render(<StatCard label="Muted Stat" value="100" muted />)

      const card = screen.getByText("Muted Stat").closest('[data-slot="stat-card"]')
      expect(card?.className).toMatch(/opacity|text-muted/)
    })
  })

  describe("Click Handling", () => {
    it("should call onClick when clicked", () => {
      const handleClick = vi.fn()
      render(<StatCard label="Clickable" value="$100" onClick={handleClick} />)

      fireEvent.click(screen.getByText("Clickable").closest('[data-slot="stat-card"]')!)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should render as button when onClick provided", () => {
      const handleClick = vi.fn()
      render(<StatCard label="Button" value="100" onClick={handleClick} />)

      const card = screen.getByText("Button").closest('[data-slot="stat-card"]')
      expect(card?.tagName).toBe("BUTTON")
    })

    it("should render as div when onClick not provided", () => {
      render(<StatCard label="Static" value="100" />)

      const card = screen.getByText("Static").closest('[data-slot="stat-card"]')
      expect(card?.tagName).toBe("DIV")
    })

    it("should have interactive styles when clickable", () => {
      const handleClick = vi.fn()
      render(<StatCard label="Interactive" value="100" onClick={handleClick} />)

      const card = screen.getByText("Interactive").closest('[data-slot="stat-card"]')
      expect(card?.className).toMatch(/cursor-pointer|hover/)
    })
  })

  describe("Accessibility", () => {
    it("should have accessible role for clickable card", () => {
      const handleClick = vi.fn()
      render(<StatCard label="Accessible" value="100" onClick={handleClick} />)

      expect(screen.getByRole("button")).toBeInTheDocument()
    })
  })

  describe("Custom className", () => {
    it("should merge custom className", () => {
      render(<StatCard label="Custom" value="100" className="custom-class" />)

      const card = screen.getByText("Custom").closest('[data-slot="stat-card"]')
      expect(card?.className).toContain("custom-class")
    })
  })
})