/**
 * Tests for SegmentedControl Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, selection, variants, sizes, fullWidth, accessibility
 */

import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SegmentedControl } from "@/components/ui/segmented-control"

const defaultOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
]

describe("SegmentedControl", () => {
  describe("Rendering", () => {
    it("should render all options", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
        />
      )

      expect(screen.getByText("Option 1")).toBeInTheDocument()
      expect(screen.getByText("Option 2")).toBeInTheDocument()
      expect(screen.getByText("Option 3")).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
        />
      )

      expect(
        document.querySelector('[data-slot="segmented-control"]')
      ).toBeInTheDocument()
    })

    it("should render with correct accessibility role", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
        />
      )

      expect(screen.getByRole("tablist")).toBeInTheDocument()
    })
  })

  describe("Selection", () => {
    it("should highlight the selected option", () => {
      render(
        <SegmentedControl
          value="option2"
          onChange={() => {}}
          options={defaultOptions}
        />
      )

      const selectedTab = screen.getByRole("tab", { name: "Option 2" })
      expect(selectedTab).toHaveAttribute("data-state", "active")
    })

    it("should call onChange when an option is clicked", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <SegmentedControl
          value="option1"
          onChange={handleChange}
          options={defaultOptions}
        />
      )

      // Click on the tab button using userEvent for proper Radix interaction
      await user.click(screen.getByRole("tab", { name: "Option 2" }))

      expect(handleChange).toHaveBeenCalledWith("option2")
    })

    it("should not call onChange when clicking already selected option", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <SegmentedControl
          value="option1"
          onChange={handleChange}
          options={defaultOptions}
        />
      )

      await user.click(screen.getByRole("tab", { name: "Option 1" }))

      // Tabs don't call onChange when clicking already selected
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe("Sizes", () => {
    it("should render with md size by default", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
        />
      )

      const tabsList = screen.getByRole("tablist")
      expect(tabsList.className).toMatch(/h-10/)
    })

    it("should render with sm size when specified", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          size="sm"
        />
      )

      const tabsList = screen.getByRole("tablist")
      expect(tabsList.className).toMatch(/h-8/)
    })
  })

  describe("Full Width", () => {
    it("should not be full width by default", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
        />
      )

      const container = document.querySelector('[data-slot="segmented-control"]')
      expect(container?.className).not.toMatch(/w-full/)
    })

    it("should be full width when fullWidth is true", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          fullWidth
        />
      )

      const container = document.querySelector('[data-slot="segmented-control"]')
      expect(container?.className).toMatch(/w-full/)
    })

    it("should have flex-1 on triggers when fullWidth", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          fullWidth
        />
      )

      const tabs = screen.getAllByRole("tab")
      tabs.forEach((tab) => {
        expect(tab.className).toMatch(/flex-1/)
      })
    })
  })

  describe("Icons", () => {
    it("should render icon when provided", () => {
      const optionsWithIcon = [
        { value: "opt1", label: "With Icon", icon: <span data-testid="test-icon">★</span> },
        { value: "opt2", label: "No Icon" },
      ]

      render(
        <SegmentedControl
          value="opt1"
          onChange={() => {}}
          options={optionsWithIcon}
        />
      )

      expect(screen.getByTestId("test-icon")).toBeInTheDocument()
    })

    it("should render icon before label", () => {
      const optionsWithIcon = [
        { value: "opt1", label: "Label", icon: <span data-testid="icon">I</span> },
      ]

      render(
        <SegmentedControl
          value="opt1"
          onChange={() => {}}
          options={optionsWithIcon}
        />
      )

      const tab = screen.getByRole("tab")
      const icon = screen.getByTestId("icon")
      const label = screen.getByText("Label")

      // Icon should come before label in DOM
      expect(tab.innerHTML.indexOf("icon")).toBeLessThan(
        tab.innerHTML.indexOf("Label")
      )
    })
  })

  describe("Disabled State", () => {
    it("should disable all tabs when disabled is true", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          disabled
        />
      )

      const tabs = screen.getAllByRole("tab")
      tabs.forEach((tab) => {
        expect(tab).toBeDisabled()
      })
    })

    it("should not call onChange when disabled", async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <SegmentedControl
          value="option1"
          onChange={handleChange}
          options={defaultOptions}
          disabled
        />
      )

      await user.click(screen.getByRole("tab", { name: "Option 2" }))

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe("Custom className", () => {
    it("should merge custom className", () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          className="custom-class"
        />
      )

      const container = document.querySelector('[data-slot="segmented-control"]')
      expect(container?.className).toContain("custom-class")
    })
  })

  describe("Edge Cases", () => {
    it("should handle single option", () => {
      render(
        <SegmentedControl
          value="only"
          onChange={() => {}}
          options={[{ value: "only", label: "Only Option" }]}
        />
      )

      expect(screen.getByText("Only Option")).toBeInTheDocument()
    })

    it("should handle empty options gracefully", () => {
      render(
        <SegmentedControl value="" onChange={() => {}} options={[]} />
      )

      expect(screen.getByRole("tablist")).toBeInTheDocument()
    })
  })
})
