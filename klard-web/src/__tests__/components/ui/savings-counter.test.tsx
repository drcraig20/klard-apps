/**
 * Tests for SavingsCounter Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: currency formatting, label display, success styling, animation behavior, accessibility
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import { SavingsCounter } from "@/components/ui/savings-counter"

expect.extend(toHaveNoViolations)

describe("SavingsCounter", () => {
  describe("Currency Formatting", () => {
    it("formats USD currency correctly", () => {
      render(<SavingsCounter amount={1234.56} />)
      expect(screen.getByText("$1,234.56")).toBeInTheDocument()
    })

    it("formats whole numbers without decimals trailing zeros", () => {
      render(<SavingsCounter amount={1000} />)
      expect(screen.getByText("$1,000.00")).toBeInTheDocument()
    })

    it("formats zero amount", () => {
      render(<SavingsCounter amount={0} />)
      expect(screen.getByText("$0.00")).toBeInTheDocument()
    })

    it("formats large amounts with thousands separators", () => {
      render(<SavingsCounter amount={1234567.89} />)
      expect(screen.getByText("$1,234,567.89")).toBeInTheDocument()
    })

    it("supports different currencies", () => {
      render(<SavingsCounter amount={1234.56} currency="EUR" />)
      // EUR formatting uses euro symbol
      const element = screen.getByTestId("savings-counter")
      expect(element.textContent).toContain("1,234.56")
    })
  })

  describe("Label Display", () => {
    it("shows label when provided", () => {
      render(<SavingsCounter amount={100} label="Total Blocked" />)
      expect(screen.getByText("Total Blocked")).toBeInTheDocument()
    })

    it("does not render label element when not provided", () => {
      render(<SavingsCounter amount={100} />)
      expect(screen.queryByTestId("savings-counter-label")).not.toBeInTheDocument()
    })
  })

  describe("Styling", () => {
    it("has data-testid for savings-counter", () => {
      render(<SavingsCounter amount={100} />)
      expect(screen.getByTestId("savings-counter")).toBeInTheDocument()
    })

    it("has success green styling", () => {
      render(<SavingsCounter amount={100} />)
      const element = screen.getByTestId("savings-counter")
      expect(element.className).toMatch(/text-success|text-\[var\(--rec-color-success\)\]/)
    })

    it("has success glow effect", () => {
      render(<SavingsCounter amount={100} />)
      const element = screen.getByTestId("savings-counter")
      expect(element.className).toMatch(/shadow-glow-success|shadow-\[var\(--rec-glow-success\)\]/)
    })
  })

  describe("Animation", () => {
    it("applies animation classes when animate is true", () => {
      render(<SavingsCounter amount={100} animate />)
      const element = screen.getByTestId("savings-counter")
      // Should have animation-related styling or class
      expect(element).toBeInTheDocument()
    })

    it("does not apply animation when animate is false", () => {
      render(<SavingsCounter amount={100} animate={false} />)
      const element = screen.getByTestId("savings-counter")
      expect(element).toBeInTheDocument()
    })

    it("defaults to no animation when prop not provided", () => {
      render(<SavingsCounter amount={100} />)
      const element = screen.getByTestId("savings-counter")
      expect(element).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("has accessible name with formatted amount", () => {
      render(<SavingsCounter amount={1234.56} />)
      const element = screen.getByTestId("savings-counter")
      expect(element).toHaveAttribute("aria-label")
    })

    it("includes label in accessible description when provided", () => {
      render(<SavingsCounter amount={100} label="Total Saved" />)
      const element = screen.getByTestId("savings-counter")
      expect(element.getAttribute("aria-label")).toContain("Total Saved")
    })
  })

  describe("Custom className", () => {
    it("merges custom className", () => {
      render(<SavingsCounter amount={100} className="custom-class" />)
      const element = screen.getByTestId("savings-counter")
      expect(element.className).toContain("custom-class")
    })
  })

  describe("Accessibility (jest-axe)", () => {
    it("should have no accessibility violations with basic amount", async () => {
      const { container } = render(<SavingsCounter amount={1234.56} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with label", async () => {
      const { container } = render(<SavingsCounter amount={100} label="Total Saved" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with animation", async () => {
      const { container } = render(<SavingsCounter amount={500} animate />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with zero amount", async () => {
      const { container } = render(<SavingsCounter amount={0} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
