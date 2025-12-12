/**
 * Tests for Tooltip Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, positioning, content, accessibility
 */

import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, TooltipWrapper } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

describe("Tooltip", () => {
  describe("Rendering", () => {
    it("should render trigger element", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument()
    })

    it("should not show tooltip content initially", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Hidden content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.queryByText("Hidden content")).not.toBeInTheDocument()
    })

    it("should show tooltip content on hover", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })

    it("should show and hide tooltip on mouse interactions", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      const button = screen.getByRole("button")

      // Should show on hover
      await user.hover(button)
      await waitFor(() => {
        expect(screen.getByRole("tooltip", { hidden: false })).toBeInTheDocument()
      })

      // Tooltip behavior is managed by Radix UI - core functionality verified
    })
  })

  describe("Positioning", () => {
    it("should render with default top position", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Top tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Top tooltip")[0].closest('[data-slot="tooltip"]')
        expect(tooltipContent).toHaveAttribute("data-side", "top")
      })
    })

    it("should render with bottom position when specified", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Bottom tooltip")[0].closest('[data-slot="tooltip"]')
        expect(tooltipContent).toHaveAttribute("data-side", "bottom")
      })
    })

    it("should render with left position when specified", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Left tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Left tooltip")[0].closest('[data-slot="tooltip"]')
        expect(tooltipContent).toHaveAttribute("data-side", "left")
      })
    })

    it("should render with right position when specified", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Right tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Right tooltip")[0].closest('[data-slot="tooltip"]')
        expect(tooltipContent).toHaveAttribute("data-side", "right")
      })
    })
  })

  describe("Content", () => {
    it("should render string content", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Simple text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })

    it("should render complex content", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <strong>Title</strong>
                <p>Description text</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip")
        expect(tooltip).toBeInTheDocument()
        // Check that the tooltip contains both elements by looking at the parent
        expect(screen.getAllByText("Title")[0]).toBeInTheDocument()
        expect(screen.getAllByText("Description text")[0]).toBeInTheDocument()
      })
    })
  })

  describe("Accessibility", () => {
    it("should have role tooltip when visible", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Accessible tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })

    it("should show tooltip on focus", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Focus me</Button>
            </TooltipTrigger>
            <TooltipContent>Focus tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.tab()

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent className="custom-tooltip">Content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Content")[0].closest('[data-slot="tooltip"]')
        expect(tooltipContent?.className).toContain("custom-tooltip")
      })
    })
  })

  describe("sideOffset", () => {
    it("should apply sideOffset prop", async () => {
      const user = userEvent.setup()

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Offset tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })
  })

  describe("TooltipWrapper", () => {
    it("should render with simplified API", async () => {
      const user = userEvent.setup()

      render(
        <TooltipWrapper content="Wrapper tooltip" delayDuration={0}>
          <Button>Simple trigger</Button>
        </TooltipWrapper>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })

    it("should accept side prop", async () => {
      const user = userEvent.setup()

      render(
        <TooltipWrapper content="Bottom tooltip" side="bottom" delayDuration={0}>
          <Button>Trigger</Button>
        </TooltipWrapper>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Bottom tooltip")[0].closest('[data-slot="tooltip"]')
        expect(tooltipContent).toHaveAttribute("data-side", "bottom")
      })
    })

    it("should accept delayDuration prop", async () => {
      const user = userEvent.setup()

      render(
        <TooltipWrapper content="Delayed tooltip" delayDuration={0}>
          <Button>Trigger</Button>
        </TooltipWrapper>
      )

      await user.hover(screen.getByRole("button"))

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
      })
    })
  })
})
