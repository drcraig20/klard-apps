/**
 * Tests for Spinner Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, label, accessibility, custom className
 */

import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Spinner } from "@/components/ui/spinner"

describe("Spinner", () => {
  describe("Rendering", () => {
    it("should render an SVG element", () => {
      render(<Spinner />)

      const spinner = screen.getByRole("status")
      expect(spinner.tagName.toLowerCase()).toBe("svg")
    })

    it("should have animate-spin class for animation", () => {
      render(<Spinner />)

      const spinner = screen.getByRole("status")
      const className = spinner.getAttribute("class") ?? ""
      expect(className).toContain("animate-spin")
    })

    it("should have aria-label for accessibility", () => {
      render(<Spinner />)

      const spinner = screen.getByRole("status")
      expect(spinner.getAttribute("aria-label")).toBe("Loading")
    })
  })

  describe("Sizes", () => {
    it("should apply md size by default", () => {
      render(<Spinner />)

      const spinner = screen.getByRole("status")
      const className = spinner.getAttribute("class") ?? ""
      expect(className).toMatch(/size-6|h-6|w-6/)
    })

    it("should apply sm size when specified", () => {
      render(<Spinner size="sm" />)

      const spinner = screen.getByRole("status")
      const className = spinner.getAttribute("class") ?? ""
      expect(className).toMatch(/size-4|h-4|w-4/)
    })

    it("should apply lg size when specified", () => {
      render(<Spinner size="lg" />)

      const spinner = screen.getByRole("status")
      const className = spinner.getAttribute("class") ?? ""
      expect(className).toMatch(/size-8|h-8|w-8/)
    })
  })

  describe("Label", () => {
    it("should render label text when provided", () => {
      render(<Spinner label="Loading..." />)

      expect(screen.getByText("Loading...")).toBeInTheDocument()
    })

    it("should not render label container when label not provided", () => {
      render(<Spinner />)

      // Only the spinner SVG should be rendered
      const container = screen.getByRole("status").parentElement
      expect(container?.querySelectorAll("span").length).toBeLessThanOrEqual(1)
    })

    it("should render spinner and label in flex container when label provided", () => {
      render(<Spinner label="Please wait" />)

      const container = screen.getByText("Please wait").parentElement
      expect(container?.className).toContain("flex")
      expect(container?.className).toContain("items-center")
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(<Spinner className="text-red-500" />)

      const spinner = screen.getByRole("status")
      const className = spinner.getAttribute("class") ?? ""
      expect(className).toContain("text-red-500")
      expect(className).toContain("animate-spin")
    })
  })

  describe("Props passthrough", () => {
    it("should pass through additional SVG props", () => {
      render(<Spinner data-testid="custom-spinner" />)

      expect(screen.getByTestId("custom-spinner")).toBeInTheDocument()
    })
  })
})
