/**
 * Tests for EmptyState Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sub-components, variants, actions, sizes, accessibility
 *
 * SOLID Compliance:
 * - SRP: Tests only EmptyState component behavior
 * - OCP: Tests extensible via new variant test cases
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import {
  EmptyState,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"

expect.extend(toHaveNoViolations)

describe("EmptyState", () => {
  describe("Rendering", () => {
    it("should render with all sub-components", () => {
      render(
        <EmptyState>
          <EmptyStateMedia>
            <span data-testid="illustration">icon</span>
          </EmptyStateMedia>
          <EmptyStateTitle>No subscriptions yet</EmptyStateTitle>
          <EmptyStateDescription>
            Add your first subscription to start tracking.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button>Add Subscription</Button>
          </EmptyStateActions>
        </EmptyState>
      )

      expect(screen.getByTestId("illustration")).toBeInTheDocument()
      expect(screen.getByText("No subscriptions yet")).toBeInTheDocument()
      expect(
        screen.getByText("Add your first subscription to start tracking.")
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Add Subscription" })
      ).toBeInTheDocument()
    })

    it("should have data-slot attribute on root", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Empty</EmptyStateTitle>
        </EmptyState>
      )

      expect(
        document.querySelector('[data-slot="empty-state"]')
      ).toBeInTheDocument()
    })

    it("should render without optional sub-components", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>No items</EmptyStateTitle>
        </EmptyState>
      )

      expect(screen.getByText("No items")).toBeInTheDocument()
    })
  })

  describe("Variants", () => {
    it("renders first-time variant with educational tone", () => {
      render(
        <EmptyState variant="first-time">
          <EmptyStateTitle>Create your first card</EmptyStateTitle>
        </EmptyState>
      )
      expect(screen.getByTestId("empty-state-first-time")).toBeInTheDocument()
    })

    it("renders cleared variant with celebratory tone", () => {
      render(
        <EmptyState variant="cleared">
          <EmptyStateTitle>All clear!</EmptyStateTitle>
        </EmptyState>
      )
      expect(screen.getByTestId("empty-state-cleared")).toBeInTheDocument()
    })

    it("renders error variant with recovery focus", () => {
      render(
        <EmptyState variant="error">
          <EmptyStateTitle>Something went wrong</EmptyStateTitle>
        </EmptyState>
      )
      expect(screen.getByTestId("empty-state-error")).toBeInTheDocument()
    })

    it("applies first-time variant styling", () => {
      render(
        <EmptyState variant="first-time">
          <EmptyStateTitle>Welcome</EmptyStateTitle>
        </EmptyState>
      )
      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toContain("border-primary")
    })

    it("applies cleared variant styling", () => {
      render(
        <EmptyState variant="cleared">
          <EmptyStateTitle>All done</EmptyStateTitle>
        </EmptyState>
      )
      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toContain("border-success")
    })

    it("applies error variant styling", () => {
      render(
        <EmptyState variant="error">
          <EmptyStateTitle>Error occurred</EmptyStateTitle>
        </EmptyState>
      )
      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toContain("border-destructive")
    })
  })

  describe("EmptyStateMedia", () => {
    it("should render children as illustration", () => {
      render(
        <EmptyState>
          <EmptyStateMedia>
            <img src="/empty.svg" alt="Empty" data-testid="img" />
          </EmptyStateMedia>
          <EmptyStateTitle>Empty</EmptyStateTitle>
        </EmptyState>
      )

      expect(screen.getByTestId("img")).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(
        <EmptyState>
          <EmptyStateMedia>
            <span>Icon</span>
          </EmptyStateMedia>
          <EmptyStateTitle>Empty</EmptyStateTitle>
        </EmptyState>
      )

      expect(
        document.querySelector('[data-slot="empty-state-media"]')
      ).toBeInTheDocument()
    })
  })

  describe("EmptyStateTitle", () => {
    it("should render title text", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>No data found</EmptyStateTitle>
        </EmptyState>
      )

      expect(screen.getByText("No data found")).toBeInTheDocument()
    })

    it("should render as h3 element", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Title</EmptyStateTitle>
        </EmptyState>
      )

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Title"
      )
    })

    it("should have data-slot attribute", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Title</EmptyStateTitle>
        </EmptyState>
      )

      expect(
        document.querySelector('[data-slot="empty-state-title"]')
      ).toBeInTheDocument()
    })
  })

  describe("EmptyStateDescription", () => {
    it("should render description text", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Empty</EmptyStateTitle>
          <EmptyStateDescription>
            Start by adding your first item.
          </EmptyStateDescription>
        </EmptyState>
      )

      expect(
        screen.getByText("Start by adding your first item.")
      ).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Empty</EmptyStateTitle>
          <EmptyStateDescription>Description</EmptyStateDescription>
        </EmptyState>
      )

      expect(
        document.querySelector('[data-slot="empty-state-description"]')
      ).toBeInTheDocument()
    })
  })

  describe("EmptyStateActions", () => {
    it("shows action button when provided", () => {
      const onClick = vi.fn()
      render(
        <EmptyState variant="first-time">
          <EmptyStateTitle>Test</EmptyStateTitle>
          <EmptyStateActions>
            <Button onClick={onClick}>Get Started</Button>
          </EmptyStateActions>
        </EmptyState>
      )
      expect(
        screen.getByRole("button", { name: "Get Started" })
      ).toBeInTheDocument()
    })

    it("should render primary action button", () => {
      const handleClick = vi.fn()
      render(
        <EmptyState>
          <EmptyStateTitle>Empty</EmptyStateTitle>
          <EmptyStateActions>
            <Button onClick={handleClick}>Add Item</Button>
          </EmptyStateActions>
        </EmptyState>
      )

      const button = screen.getByRole("button", { name: "Add Item" })
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should render multiple action buttons", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Empty</EmptyStateTitle>
          <EmptyStateActions>
            <Button>Primary Action</Button>
            <Button variant="ghost">Secondary Action</Button>
          </EmptyStateActions>
        </EmptyState>
      )

      expect(
        screen.getByRole("button", { name: "Primary Action" })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Secondary Action" })
      ).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Empty</EmptyStateTitle>
          <EmptyStateActions>
            <Button>Action</Button>
          </EmptyStateActions>
        </EmptyState>
      )

      expect(
        document.querySelector('[data-slot="empty-state-actions"]')
      ).toBeInTheDocument()
    })
  })

  describe("Sizes", () => {
    it("should apply sm size", () => {
      render(
        <EmptyState size="sm">
          <EmptyStateTitle>Small</EmptyStateTitle>
        </EmptyState>
      )

      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toMatch(/py-6/)
      expect(container?.className).toMatch(/gap-3/)
    })

    it("should apply md size by default", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Medium</EmptyStateTitle>
        </EmptyState>
      )

      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toMatch(/py-12/)
      expect(container?.className).toMatch(/gap-4/)
    })

    it("should apply lg size", () => {
      render(
        <EmptyState size="lg">
          <EmptyStateTitle>Large</EmptyStateTitle>
        </EmptyState>
      )

      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toMatch(/py-16/)
      expect(container?.className).toMatch(/gap-6/)
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(
        <EmptyState className="custom-class">
          <EmptyStateTitle>Custom</EmptyStateTitle>
        </EmptyState>
      )

      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.className).toContain("custom-class")
      expect(container?.className).toContain("flex") // Default class
    })
  })

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Accessible Title</EmptyStateTitle>
          <EmptyStateDescription>Accessible description.</EmptyStateDescription>
        </EmptyState>
      )

      expect(
        screen.getByRole("heading", { name: "Accessible Title" })
      ).toBeInTheDocument()
    })

    it("should support aria-label on root", () => {
      render(
        <EmptyState aria-label="Empty subscriptions state">
          <EmptyStateTitle>No subscriptions</EmptyStateTitle>
        </EmptyState>
      )

      expect(
        screen.getByLabelText("Empty subscriptions state")
      ).toBeInTheDocument()
    })

    it("should have aria-live for dynamic content updates", () => {
      render(
        <EmptyState>
          <EmptyStateTitle>Dynamic content</EmptyStateTitle>
        </EmptyState>
      )

      const container = document.querySelector('[data-slot="empty-state"]')
      expect(container?.getAttribute("aria-live")).toBe("polite")
    })
  })

  describe("Accessibility (jest-axe)", () => {
    it("should have no accessibility violations with full structure", async () => {
      const { container } = render(
        <EmptyState>
          <EmptyStateMedia>
            <span>Icon</span>
          </EmptyStateMedia>
          <EmptyStateTitle>No subscriptions</EmptyStateTitle>
          <EmptyStateDescription>Add your first subscription.</EmptyStateDescription>
          <EmptyStateActions>
            <Button>Add Subscription</Button>
          </EmptyStateActions>
        </EmptyState>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with first-time variant", async () => {
      const { container } = render(
        <EmptyState variant="first-time">
          <EmptyStateTitle>Welcome</EmptyStateTitle>
          <EmptyStateDescription>Get started by creating your first card.</EmptyStateDescription>
        </EmptyState>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with cleared variant", async () => {
      const { container } = render(
        <EmptyState variant="cleared">
          <EmptyStateTitle>All clear!</EmptyStateTitle>
          <EmptyStateDescription>No pending items.</EmptyStateDescription>
        </EmptyState>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations with error variant", async () => {
      const { container } = render(
        <EmptyState variant="error">
          <EmptyStateTitle>Something went wrong</EmptyStateTitle>
          <EmptyStateDescription>Please try again later.</EmptyStateDescription>
          <EmptyStateActions>
            <Button>Retry</Button>
          </EmptyStateActions>
        </EmptyState>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})