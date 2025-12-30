/**
 * Tests for ProtectionStatus Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, plural/singular messages, pulse animation, teal glow styling
 */

import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import { ProtectionStatus } from "@/components/ui/protection-status"

expect.extend(toHaveNoViolations)

describe("ProtectionStatus", () => {
  describe("Rendering", () => {
    it("displays card count with watching message (plural)", () => {
      render(<ProtectionStatus activeCards={3} />)

      expect(screen.getByText("3 cards watching")).toBeInTheDocument()
    })

    it("uses singular for 1 card", () => {
      render(<ProtectionStatus activeCards={1} />)

      expect(screen.getByText("1 card watching")).toBeInTheDocument()
    })

    it("displays zero cards correctly", () => {
      render(<ProtectionStatus activeCards={0} />)

      expect(screen.getByText("0 cards watching")).toBeInTheDocument()
    })

    it("has data-testid attribute", () => {
      render(<ProtectionStatus activeCards={3} />)

      expect(screen.getByTestId("protection-status")).toBeInTheDocument()
    })

    it("has data-slot attribute", () => {
      render(<ProtectionStatus activeCards={3} />)

      const element = screen.getByTestId("protection-status")
      expect(element).toHaveAttribute("data-slot", "protection-status")
    })
  })

  describe("Pulse Animation", () => {
    it("shows pulse animation when enabled", () => {
      render(<ProtectionStatus activeCards={3} showPulse />)

      const element = screen.getByTestId("protection-status")
      expect(element.className).toMatch(/animate-pulse/)
    })

    it("does not show pulse animation by default", () => {
      render(<ProtectionStatus activeCards={3} />)

      const element = screen.getByTestId("protection-status")
      expect(element.className).not.toMatch(/animate-pulse/)
    })

    it("does not show pulse animation when explicitly disabled", () => {
      render(<ProtectionStatus activeCards={3} showPulse={false} />)

      const element = screen.getByTestId("protection-status")
      expect(element.className).not.toMatch(/animate-pulse/)
    })
  })

  describe("Teal Glow Styling", () => {
    it("has teal glow shadow styling", () => {
      render(<ProtectionStatus activeCards={3} />)

      const element = screen.getByTestId("protection-status")
      // Check for glow-primary class or shadow styling
      expect(element.className).toMatch(/shadow|glow/)
    })
  })

  describe("Custom className", () => {
    it("merges custom className", () => {
      render(<ProtectionStatus activeCards={3} className="custom-class" />)

      const element = screen.getByTestId("protection-status")
      expect(element.className).toContain("custom-class")
    })
  })

  describe("Accessibility", () => {
    it("has appropriate aria attributes for status", () => {
      render(<ProtectionStatus activeCards={3} />)

      const element = screen.getByTestId("protection-status")
      expect(element).toHaveAttribute("role", "status")
      expect(element).toHaveAttribute("aria-live", "polite")
    })
  })

  describe("Accessibility (jest-axe)", () => {
    it("should have no accessibility violations with multiple cards", async () => {
      const { container } = render(<ProtectionStatus activeCards={3} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with single card", async () => {
      const { container } = render(<ProtectionStatus activeCards={1} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with zero cards", async () => {
      const { container } = render(<ProtectionStatus activeCards={0} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with pulse animation", async () => {
      const { container } = render(<ProtectionStatus activeCards={3} showPulse />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
