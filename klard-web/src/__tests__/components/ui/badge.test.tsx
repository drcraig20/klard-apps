/**
 * Tests for Badge Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, variants, sizes, icons, removable, asChild, accessibility
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Badge } from "@/components/ui/badge"

describe("Badge", () => {
  describe("Rendering", () => {
    it("should render with children text", () => {
      render(<Badge>Status</Badge>)

      expect(screen.getByText("Status")).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(<Badge>Badge</Badge>)

      const badge = screen.getByText("Badge")
      expect(badge.closest('[data-slot="badge"]')).toBeInTheDocument()
    })

    it("should render as a span element by default", () => {
      render(<Badge>Badge</Badge>)

      const badge = screen.getByText("Badge")
      expect(badge.tagName).toBe("SPAN")
    })
  })

  describe("Variants", () => {
    const variants = [
      "default",
      "primary",
      "success",
      "warning",
      "error",
      "outline",
    ] as const

    variants.forEach((variant) => {
      it(`should render ${variant} variant without error`, () => {
        render(<Badge variant={variant}>{variant} Badge</Badge>)

        expect(screen.getByText(`${variant} Badge`)).toBeInTheDocument()
      })
    })

    it("should apply default variant when none specified", () => {
      render(<Badge>Default</Badge>)

      const badge = screen.getByText("Default")
      // Default variant has slate background
      expect(badge.className).toMatch(/bg-slate-100|slate/)
    })

    it("should apply primary variant with teal colors", () => {
      render(<Badge variant="primary">Primary</Badge>)

      const badge = screen.getByText("Primary")
      expect(badge.className).toMatch(/bg-teal-100|teal/)
    })

    it("should apply success variant with green colors", () => {
      render(<Badge variant="success">Success</Badge>)

      const badge = screen.getByText("Success")
      expect(badge.className).toMatch(/bg-green-100|green/)
    })

    it("should apply warning variant with amber colors", () => {
      render(<Badge variant="warning">Warning</Badge>)

      const badge = screen.getByText("Warning")
      expect(badge.className).toMatch(/bg-amber-100|amber/)
    })

    it("should apply error variant with red colors", () => {
      render(<Badge variant="error">Error</Badge>)

      const badge = screen.getByText("Error")
      expect(badge.className).toMatch(/bg-red-100|red/)
    })

    it("should apply outline variant with border only", () => {
      render(<Badge variant="outline">Outline</Badge>)

      const badge = screen.getByText("Outline")
      expect(badge.className).toMatch(/border|outline/)
      expect(badge.className).toMatch(/bg-transparent|transparent/)
    })
  })

  describe("Sizes", () => {
    it("should apply md size by default", () => {
      render(<Badge>Medium</Badge>)

      const badge = screen.getByText("Medium")
      expect(badge.className).toMatch(/text-sm|px-2\.5/)
    })

    it("should apply sm size when specified", () => {
      render(<Badge size="sm">Small</Badge>)

      const badge = screen.getByText("Small")
      expect(badge.className).toMatch(/text-xs|px-1\.5/)
    })

    it("should apply md size when specified", () => {
      render(<Badge size="md">Medium</Badge>)

      const badge = screen.getByText("Medium")
      expect(badge.className).toMatch(/text-sm|px-2\.5/)
    })
  })

  describe("Icon Support", () => {
    it("should render icon when provided", () => {
      const icon = <span data-testid="test-icon">★</span>
      render(<Badge icon={icon}>With Icon</Badge>)

      expect(screen.getByTestId("test-icon")).toBeInTheDocument()
    })

    it("should render icon before children", () => {
      const icon = <span data-testid="badge-icon">I</span>
      render(<Badge icon={icon}>Text</Badge>)

      const badge = screen.getByText("Text").closest('[data-slot="badge"]')
      const children = Array.from(badge?.childNodes || [])

      const iconIndex = children.findIndex(
        (child) =>
          (child as Element).querySelector?.('[data-testid="badge-icon"]') ||
          (child as Element).getAttribute?.("data-testid") === "badge-icon"
      )
      const textIndex = children.findIndex((child) =>
        child.textContent?.includes("Text")
      )

      expect(iconIndex).toBeLessThan(textIndex)
    })

    it("should not render icon wrapper when icon not provided", () => {
      render(<Badge>No Icon</Badge>)

      const badge = screen.getByText("No Icon").closest('[data-slot="badge"]')
      // Should only have the text, no empty icon container
      expect(badge?.children.length).toBeLessThanOrEqual(1)
    })
  })

  describe("Removable", () => {
    it("should show remove button when removable is true", () => {
      render(<Badge removable>Removable</Badge>)

      expect(
        screen.getByRole("button", { name: /remove/i })
      ).toBeInTheDocument()
    })

    it("should not show remove button by default", () => {
      render(<Badge>Not Removable</Badge>)

      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("should call onRemove when remove button is clicked", () => {
      const handleRemove = vi.fn()
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      )

      fireEvent.click(screen.getByRole("button", { name: /remove/i }))

      expect(handleRemove).toHaveBeenCalledTimes(1)
    })

    it("should not call onRemove when badge itself is clicked", () => {
      const handleRemove = vi.fn()
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      )

      fireEvent.click(screen.getByText("Removable"))

      // Only the button click should trigger, not badge click
      expect(handleRemove).not.toHaveBeenCalled()
    })

    it("should have accessible label on remove button", () => {
      render(<Badge removable>Tag</Badge>)

      const button = screen.getByRole("button")
      expect(button).toHaveAccessibleName(/remove/i)
    })
  })

  describe("asChild", () => {
    it("should render child element with badge styling when asChild is true", () => {
      render(
        <Badge asChild>
          <a href="/test">Link Badge</a>
        </Badge>
      )

      const link = screen.getByRole("link", { name: "Link Badge" })
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe("A")
      expect(link.getAttribute("href")).toBe("/test")
    })

    it("should apply badge classes to child element", () => {
      render(
        <Badge asChild variant="primary">
          <button type="button">Button Badge</button>
        </Badge>
      )

      const button = screen.getByRole("button", { name: "Button Badge" })
      expect(button.className).toMatch(/teal/)
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(<Badge className="custom-class">Custom</Badge>)

      const badge = screen.getByText("Custom")
      expect(badge.className).toContain("custom-class")
      expect(badge.className).toContain("inline-flex") // Default class
    })
  })

  describe("Glow Effects", () => {
    it("should apply success glow effect", () => {
      render(<Badge variant="success">Active</Badge>)

      const badge = screen.getByText("Active")
      expect(badge.className).toMatch(/shadow-\[0_0_8px/)
    })

    it("should apply warning glow effect", () => {
      render(<Badge variant="warning">Pending</Badge>)

      const badge = screen.getByText("Pending")
      expect(badge.className).toMatch(/shadow-\[0_0_8px/)
    })

    it("should apply error glow effect", () => {
      render(<Badge variant="error">Failed</Badge>)

      const badge = screen.getByText("Failed")
      expect(badge.className).toMatch(/shadow-\[0_0_8px/)
    })

    it("should apply primary glow effect", () => {
      render(<Badge variant="primary">Primary</Badge>)

      const badge = screen.getByText("Primary")
      expect(badge.className).toMatch(/shadow-\[0_0_8px/)
    })

    it("should not apply glow to default variant", () => {
      render(<Badge>Default</Badge>)

      const badge = screen.getByText("Default")
      expect(badge.className).not.toMatch(/shadow-\[0_0_8px/)
    })

    it("should not apply glow to outline variant", () => {
      render(<Badge variant="outline">Outline</Badge>)

      const badge = screen.getByText("Outline")
      expect(badge.className).not.toMatch(/shadow-\[0_0_8px/)
    })
  })

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      render(<Badge>{""}</Badge>)

      // Should render without crashing
      expect(document.querySelector('[data-slot="badge"]')).toBeInTheDocument()
    })

    it("should handle React node children", () => {
      render(
        <Badge>
          <span>Complex</span> <strong>Children</strong>
        </Badge>
      )

      expect(screen.getByText("Complex")).toBeInTheDocument()
      expect(screen.getByText("Children")).toBeInTheDocument()
    })

    it("should pass through additional props", () => {
      render(
        <Badge data-custom="value" id="my-badge">
          Props
        </Badge>
      )

      const badge = screen.getByText("Props")
      expect(badge.getAttribute("data-custom")).toBe("value")
      expect(badge.getAttribute("id")).toBe("my-badge")
    })
  })
})
