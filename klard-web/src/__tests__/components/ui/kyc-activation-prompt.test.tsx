/**
 * Tests for KYCActivationPrompt Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: activation framing, card name display, variant rendering, onActivate callback
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import { KYCActivationPrompt } from "@/components/ui/kyc-activation-prompt"

expect.extend(toHaveNoViolations)

describe("KYCActivationPrompt", () => {
  describe("Activation Framing", () => {
    it("uses activation framing not verification", () => {
      render(<KYCActivationPrompt cardName="Test Card" onActivate={vi.fn()} />)

      // Title uses "Activate" framing
      expect(screen.getByText("Activate your protection")).toBeInTheDocument()
      // Ensure no "Verify your identity" style wording
      expect(screen.queryByText(/verify your identity/i)).not.toBeInTheDocument()
    })

    it("displays activation title", () => {
      render(<KYCActivationPrompt cardName="Test Card" onActivate={vi.fn()} />)

      expect(screen.getByText("Activate your protection")).toBeInTheDocument()
    })
  })

  describe("Card Name Display", () => {
    it("shows card name in description", () => {
      render(<KYCActivationPrompt cardName="Netflix Blocker" onActivate={vi.fn()} />)

      expect(screen.getByText(/Netflix Blocker/)).toBeInTheDocument()
    })

    it("includes card name in verification message", () => {
      render(<KYCActivationPrompt cardName="Spotify Guard" onActivate={vi.fn()} />)

      expect(screen.getByText(/Complete a quick verification to start using Spotify Guard/)).toBeInTheDocument()
    })
  })

  describe("Variant Rendering", () => {
    it("renders inline variant by default", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} />)

      expect(screen.getByTestId("kyc-prompt-inline")).toBeInTheDocument()
    })

    it("renders modal variant when specified", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} variant="modal" />)

      expect(screen.getByTestId("kyc-prompt-modal")).toBeInTheDocument()
    })

    it("renders card-overlay variant when specified", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} variant="card-overlay" />)

      expect(screen.getByTestId("kyc-prompt-card-overlay")).toBeInTheDocument()
    })
  })

  describe("Activate Button", () => {
    it("has activate button with correct text", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} />)

      expect(screen.getByRole("button", { name: /activate now/i })).toBeInTheDocument()
    })

    it("calls onActivate when button clicked", () => {
      const onActivate = vi.fn()
      render(<KYCActivationPrompt cardName="Test" onActivate={onActivate} />)

      fireEvent.click(screen.getByRole("button", { name: /activate now/i }))

      expect(onActivate).toHaveBeenCalledTimes(1)
    })
  })

  describe("Accessibility", () => {
    it("has appropriate aria-label for the prompt section", () => {
      render(<KYCActivationPrompt cardName="Test Card" onActivate={vi.fn()} />)

      const promptElement = screen.getByTestId("kyc-prompt-inline")
      expect(promptElement).toHaveAttribute("role", "region")
      expect(promptElement).toHaveAttribute("aria-label", "KYC activation prompt")
    })

    it("has shield icon hidden from screen readers", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} />)

      const icon = screen.getByTestId("shield-icon")
      expect(icon).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("Styling", () => {
    it("has data-slot attribute", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} />)

      const element = screen.getByTestId("kyc-prompt-inline")
      expect(element).toHaveAttribute("data-slot", "kyc-activation-prompt")
    })

    it("merges custom className", () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={vi.fn()} className="custom-class" />)

      const element = screen.getByTestId("kyc-prompt-inline")
      expect(element.className).toContain("custom-class")
    })
  })

  describe("Accessibility (jest-axe)", () => {
    it("should have no accessibility violations with inline variant", async () => {
      const { container } = render(
        <KYCActivationPrompt cardName="Netflix Blocker" onActivate={vi.fn()} />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with modal variant", async () => {
      const { container } = render(
        <KYCActivationPrompt cardName="Spotify Guard" onActivate={vi.fn()} variant="modal" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with card-overlay variant", async () => {
      const { container } = render(
        <KYCActivationPrompt cardName="Amazon Shield" onActivate={vi.fn()} variant="card-overlay" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})