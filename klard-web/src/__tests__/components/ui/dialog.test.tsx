/**
 * Tests for Dialog Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, overlay backdrop blur, close behavior, accessibility
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogOverlay,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

describe("Dialog", () => {
  describe("Rendering", () => {
    it("should not render content when open is false", () => {
      render(
        <Dialog open={false}>
          <DialogContent>
            <p>Dialog Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();
    });

    it("should render content when open is true", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Dialog Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    });

    it("should have data-slot attribute on dialog content", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(document.querySelector('[data-slot="dialog-content"]')).toBeInTheDocument();
    });

    it("should render as dialog element with role", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Overlay with Backdrop Blur", () => {
    it("should render overlay with data-slot attribute", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      expect(overlay).toBeInTheDocument();
    });

    it("should apply backdrop-blur-[24px] to overlay", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      expect(overlay).toHaveClass("backdrop-blur-[24px]");
    });

    it("should have dark semi-transparent background", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      expect(overlay).toHaveClass("bg-black/50");
    });
  });

  describe("Header Components", () => {
    it("should render DialogTitle when provided", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    });

    it("should render DialogDescription when provided", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>This is a description</DialogDescription>
            </DialogHeader>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should render DialogTitle with correct heading role", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accessible Title</DialogTitle>
            </DialogHeader>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(
        screen.getByRole("heading", { name: "Accessible Title" })
      ).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("should render DialogFooter with actions", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });

  describe("Close Behavior", () => {
    it("should call onOpenChange when close button is clicked", async () => {
      const handleOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test</DialogTitle>
            </DialogHeader>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      await userEvent.click(closeButton);

      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it("should call onOpenChange when Escape key is pressed", async () => {
      const handleOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={handleOpenChange}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      await userEvent.keyboard("{Escape}");

      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it("should call onOpenChange when overlay is clicked", async () => {
      const handleOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={handleOpenChange}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      expect(overlay).toBeInTheDocument();

      // Radix UI handles pointer events on overlay
      if (overlay) {
        await userEvent.click(overlay);
      }

      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Trigger", () => {
    it("should open dialog when trigger is clicked", async () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <p>Dialog Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText("Dialog Content")).not.toBeInTheDocument();

      const trigger = screen.getByRole("button", { name: "Open Dialog" });
      await userEvent.click(trigger);

      expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-labelledby pointing to title", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby");
    });

    it("should have aria-describedby pointing to description", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Description text</DialogDescription>
            </DialogHeader>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-describedby");
    });
  });

  describe("Custom className", () => {
    it("should merge custom className with default classes on content", () => {
      render(
        <Dialog open={true}>
          <DialogContent className="custom-dialog-class">
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("custom-dialog-class");
    });
  });

  describe("showCloseButton prop", () => {
    it("should show close button by default", () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    });

    it("should hide close button when showCloseButton is false", () => {
      render(
        <Dialog open={true}>
          <DialogContent showCloseButton={false}>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid open/close without error", async () => {
      const { rerender } = render(
        <Dialog open={false}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      rerender(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );
      rerender(
        <Dialog open={false}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );
      rerender(
        <Dialog open={true}>
          <DialogContent>
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
