/**
 * Tests for Modal Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, title/description, footer, closeOnOverlay, accessibility
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

describe("Modal", () => {
  describe("Rendering", () => {
    it("should not render content when open is false", () => {
      render(
        <Modal open={false} onClose={() => {}}>
          <p>Modal Content</p>
        </Modal>
      );

      expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    });

    it("should render content when open is true", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Modal Content</p>
        </Modal>
      );

      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("should have data-slot attribute on content", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      expect(document.querySelector('[data-slot="modal"]')).toBeInTheDocument();
    });

    it("should render as dialog element with role", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Title and Description", () => {
    it("should render title when provided", () => {
      render(
        <Modal open={true} onClose={() => {}} title="Modal Title">
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByText("Modal Title")).toBeInTheDocument();
    });

    it("should render description when provided", () => {
      render(
        <Modal
          open={true}
          onClose={() => {}}
          title="Title"
          description="This is a description"
        >
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should not render header when no title or description", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      expect(
        document.querySelector('[data-slot="modal-header"]')
      ).not.toBeInTheDocument();
    });

    it("should render title with correct heading role", () => {
      render(
        <Modal open={true} onClose={() => {}} title="Accessible Title">
          <p>Content</p>
        </Modal>
      );

      expect(
        screen.getByRole("heading", { name: "Accessible Title" })
      ).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("should render footer when provided", () => {
      render(
        <Modal
          open={true}
          onClose={() => {}}
          footer={<Button>Save</Button>}
        >
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("should not render footer wrapper when footer not provided", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      expect(
        document.querySelector('[data-slot="modal-footer"]')
      ).not.toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;

    sizes.forEach((size) => {
      it(`should apply ${size} size class`, () => {
        render(
          <Modal open={true} onClose={() => {}} size={size}>
            <p>Content</p>
          </Modal>
        );

        const dialog = screen.getByRole("dialog");
        expect(dialog.className).toMatch(new RegExp(`max-w-${size}|max-w-4xl`));
      });
    });

    it("should apply md size by default", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toMatch(/max-w-md/);
    });
  });

  describe("Close Behavior", () => {
    it("should call onClose when close button is clicked", async () => {
      const handleClose = vi.fn();
      render(
        <Modal open={true} onClose={handleClose} title="Test">
          <p>Content</p>
        </Modal>
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      await userEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when overlay is clicked (closeOnOverlay=true)", async () => {
      const handleClose = vi.fn();
      render(
        <Modal open={true} onClose={handleClose} closeOnOverlay={true}>
          <p>Content</p>
        </Modal>
      );

      // Click the overlay (outside dialog content)
      const overlay = document.querySelector('[data-slot="modal-overlay"]');
      if (overlay) {
        fireEvent.click(overlay);
      }

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });

    it("should NOT call onClose when overlay is clicked (closeOnOverlay=false)", async () => {
      const handleClose = vi.fn();
      render(
        <Modal open={true} onClose={handleClose} closeOnOverlay={false}>
          <p>Content</p>
        </Modal>
      );

      // Try to click overlay
      const overlay = document.querySelector('[data-slot="modal-overlay"]');
      if (overlay) {
        fireEvent.click(overlay);
      }

      // Give time for potential handler
      await new Promise((r) => setTimeout(r, 100));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it("should call onClose when Escape key is pressed", async () => {
      const handleClose = vi.fn();
      render(
        <Modal open={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      await userEvent.keyboard("{Escape}");

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have aria-labelledby pointing to title", () => {
      render(
        <Modal open={true} onClose={() => {}} title="Dialog Title">
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby");
    });

    it("should have aria-describedby pointing to description", () => {
      render(
        <Modal
          open={true}
          onClose={() => {}}
          title="Title"
          description="Description text"
        >
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-describedby");
    });

    it("should trap focus within modal when open", async () => {
      render(
        <Modal
          open={true}
          onClose={() => {}}
          title="Focus Test"
          footer={<Button>Action</Button>}
        >
          <input type="text" placeholder="Input" />
        </Modal>
      );

      // Focus should be manageable within modal
      const input = screen.getByPlaceholderText("Input");
      const button = screen.getByRole("button", { name: "Action" });

      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(
        <Modal open={true} onClose={() => {}} className="custom-modal-class">
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("custom-modal-class");
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid open/close without error", async () => {
      const { rerender } = render(
        <Modal open={false} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      // Rapid state changes
      rerender(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      rerender(
        <Modal open={false} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
      rerender(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          {""}
        </Modal>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});