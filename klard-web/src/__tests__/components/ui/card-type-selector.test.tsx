/**
 * Tests for CardTypeSelector Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: card type selection, context recommendations, advanced options, styling
 *
 * SOLID Compliance:
 * - SRP: Component only handles card type selection UI
 * - OCP: Extensible via new card types in config
 * - DIP: Depends on CardType abstraction
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import { CardTypeSelector } from "@/components/ui/card-type-selector"

expect.extend(toHaveNoViolations)

describe("CardTypeSelector", () => {
  describe("Rendering", () => {
    it("should render with data-testid attribute", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.getByTestId("card-type-selector")).toBeInTheDocument()
    })

    it("should render One-Time and Recurring options by default", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.getByText("One-Time")).toBeInTheDocument()
      expect(screen.getByText("Recurring")).toBeInTheDocument()
    })
  })

  describe("Context Recommendations", () => {
    it("suggests One-Time for trial context", () => {
      render(<CardTypeSelector context="trial" onSelect={vi.fn()} />)

      const oneTimeOption = screen.getByText("One-Time").closest("button")
      expect(oneTimeOption).toHaveAttribute("data-recommended", "true")
    })

    it("suggests Recurring for subscription context", () => {
      render(<CardTypeSelector context="subscription" onSelect={vi.fn()} />)

      const recurringOption = screen.getByText("Recurring").closest("button")
      expect(recurringOption).toHaveAttribute("data-recommended", "true")
    })

    it("has no recommendation for general context", () => {
      render(<CardTypeSelector context="general" onSelect={vi.fn()} />)

      const buttons = screen.getAllByRole("button")
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("data-recommended", "true")
      })
    })

    it("has no recommendation when context is not provided", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      const buttons = screen.getAllByRole("button")
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("data-recommended", "true")
      })
    })

    it("shows recommended badge for trial context on One-Time", () => {
      render(<CardTypeSelector context="trial" onSelect={vi.fn()} />)

      expect(screen.getByText("Recommended")).toBeInTheDocument()
    })

    it("shows recommended badge for subscription context on Recurring", () => {
      render(<CardTypeSelector context="subscription" onSelect={vi.fn()} />)

      expect(screen.getByText("Recommended")).toBeInTheDocument()
    })
  })

  describe("Basic Options", () => {
    it("shows only 2 options by default", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.getAllByRole("button")).toHaveLength(2)
    })

    it("does not show Category-Locked by default", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.queryByText("Category-Locked")).not.toBeInTheDocument()
    })

    it("does not show Merchant-Locked by default", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.queryByText("Merchant-Locked")).not.toBeInTheDocument()
    })
  })

  describe("Advanced Options", () => {
    it("reveals advanced options when showAdvanced is true", () => {
      render(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)

      expect(screen.getByText("Category-Locked")).toBeInTheDocument()
      expect(screen.getByText("Merchant-Locked")).toBeInTheDocument()
    })

    it("shows 4 options when showAdvanced is true", () => {
      render(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)

      expect(screen.getAllByRole("button")).toHaveLength(4)
    })
  })

  describe("Selection Behavior", () => {
    it("calls onSelect with 'one-time' when One-Time is clicked", () => {
      const onSelect = vi.fn()
      render(<CardTypeSelector onSelect={onSelect} />)

      fireEvent.click(screen.getByText("One-Time"))
      expect(onSelect).toHaveBeenCalledWith("one-time")
    })

    it("calls onSelect with 'recurring' when Recurring is clicked", () => {
      const onSelect = vi.fn()
      render(<CardTypeSelector onSelect={onSelect} />)

      fireEvent.click(screen.getByText("Recurring"))
      expect(onSelect).toHaveBeenCalledWith("recurring")
    })

    it("calls onSelect with 'category-locked' when Category-Locked is clicked", () => {
      const onSelect = vi.fn()
      render(<CardTypeSelector onSelect={onSelect} showAdvanced />)

      fireEvent.click(screen.getByText("Category-Locked"))
      expect(onSelect).toHaveBeenCalledWith("category-locked")
    })

    it("calls onSelect with 'merchant-locked' when Merchant-Locked is clicked", () => {
      const onSelect = vi.fn()
      render(<CardTypeSelector onSelect={onSelect} showAdvanced />)

      fireEvent.click(screen.getByText("Merchant-Locked"))
      expect(onSelect).toHaveBeenCalledWith("merchant-locked")
    })
  })

  describe("Selected State", () => {
    it("highlights selected value", () => {
      render(<CardTypeSelector onSelect={vi.fn()} value="recurring" />)

      const recurringButton = screen.getByText("Recurring").closest("button")
      expect(recurringButton).toHaveAttribute("data-selected", "true")
    })

    it("does not highlight unselected options", () => {
      render(<CardTypeSelector onSelect={vi.fn()} value="recurring" />)

      const oneTimeButton = screen.getByText("One-Time").closest("button")
      expect(oneTimeButton).not.toHaveAttribute("data-selected", "true")
    })

    it("highlights one-time when selected", () => {
      render(<CardTypeSelector onSelect={vi.fn()} value="one-time" />)

      const oneTimeButton = screen.getByText("One-Time").closest("button")
      expect(oneTimeButton).toHaveAttribute("data-selected", "true")
    })

    it("highlights category-locked when selected with showAdvanced", () => {
      render(
        <CardTypeSelector
          onSelect={vi.fn()}
          value="category-locked"
          showAdvanced
        />
      )

      const categoryButton = screen.getByText("Category-Locked").closest("button")
      expect(categoryButton).toHaveAttribute("data-selected", "true")
    })
  })

  describe("Descriptions", () => {
    it("shows description for One-Time card type", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(
        screen.getByText(/single use|auto-closes after charge/i)
      ).toBeInTheDocument()
    })

    it("shows description for Recurring card type", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(
        screen.getByText(/subscriptions|stays open/i)
      ).toBeInTheDocument()
    })

    it("shows description for Category-Locked when advanced", () => {
      render(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)

      expect(
        screen.getByText(/merchant category/i)
      ).toBeInTheDocument()
    })

    it("shows description for Merchant-Locked when advanced", () => {
      render(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)

      expect(
        screen.getByText(/specific merchant/i)
      ).toBeInTheDocument()
    })
  })

  describe("Icons", () => {
    it("renders an icon for One-Time option", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      const oneTimeButton = screen.getByText("One-Time").closest("button")
      expect(oneTimeButton?.querySelector("svg")).toBeInTheDocument()
    })

    it("renders an icon for Recurring option", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      const recurringButton = screen.getByText("Recurring").closest("button")
      expect(recurringButton?.querySelector("svg")).toBeInTheDocument()
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(
        <CardTypeSelector onSelect={vi.fn()} className="custom-class" />
      )

      const selector = screen.getByTestId("card-type-selector")
      expect(selector.className).toContain("custom-class")
    })
  })

  describe("Accessibility", () => {
    it("should have accessible button roles", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.getAllByRole("button")).toHaveLength(2)
    })

    it("should have accessible labels for screen readers", () => {
      render(<CardTypeSelector onSelect={vi.fn()} />)

      expect(screen.getByText("One-Time")).toBeInTheDocument()
      expect(screen.getByText("Recurring")).toBeInTheDocument()
    })

    it("should indicate selected state accessibly", () => {
      render(<CardTypeSelector onSelect={vi.fn()} value="one-time" />)

      const oneTimeButton = screen.getByText("One-Time").closest("button")
      expect(
        oneTimeButton?.getAttribute("aria-pressed") ||
        oneTimeButton?.getAttribute("data-selected")
      ).toBeTruthy()
    })
  })

  describe("Edge Cases", () => {
    it("should handle value not matching any option", () => {
      render(
        <CardTypeSelector
          onSelect={vi.fn()}
          value={"invalid" as "one-time"}
        />
      )

      // Should not have any selected buttons
      const buttons = screen.getAllByRole("button")
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("data-selected", "true")
      })
    })

    it("should handle switching from basic to advanced options", () => {
      const { rerender } = render(
        <CardTypeSelector onSelect={vi.fn()} showAdvanced={false} />
      )
      expect(screen.getAllByRole("button")).toHaveLength(2)

      rerender(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)
      expect(screen.getAllByRole("button")).toHaveLength(4)
    })

    it("should render all four card types when advanced is enabled", () => {
      render(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)

      expect(screen.getByText("One-Time")).toBeInTheDocument()
      expect(screen.getByText("Recurring")).toBeInTheDocument()
      expect(screen.getByText("Category-Locked")).toBeInTheDocument()
      expect(screen.getByText("Merchant-Locked")).toBeInTheDocument()
    })
  })

  describe("Accessibility (jest-axe)", () => {
    it("should have no accessibility violations with basic options", async () => {
      const { container } = render(<CardTypeSelector onSelect={vi.fn()} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with advanced options", async () => {
      const { container } = render(<CardTypeSelector onSelect={vi.fn()} showAdvanced />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with selected value", async () => {
      const { container } = render(<CardTypeSelector onSelect={vi.fn()} value="recurring" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with trial context recommendation", async () => {
      const { container } = render(<CardTypeSelector onSelect={vi.fn()} context="trial" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with subscription context recommendation", async () => {
      const { container } = render(<CardTypeSelector onSelect={vi.fn()} context="subscription" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})