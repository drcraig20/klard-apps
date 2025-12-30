/**
 * Tests for Toast Component (Web)
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { showToast, showCelebrationToast } from "@/components/ui/toast";

// Store the custom toast callback for testing
let customToastCallback: ((t: string) => React.ReactNode) | null = null;

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    custom: vi.fn((callback, _options) => {
      customToastCallback = callback;
      return "toast-id";
    }),
    dismiss: vi.fn(),
  },
  Toaster: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="toaster">{children}</div>
  ),
}));

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

describe("Toast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    customToastCallback = null;
  });

  describe("showToast function", () => {
    it("should call toast.success for success type", async () => {
      const { toast } = await import("sonner");

      showToast({
        type: "success",
        title: "Success!",
      });

      expect(toast.success).toHaveBeenCalledWith("Success!", expect.any(Object));
    });

    it("should call toast.error for error type", async () => {
      const { toast } = await import("sonner");

      showToast({
        type: "error",
        title: "Error occurred",
      });

      expect(toast.error).toHaveBeenCalledWith("Error occurred", expect.any(Object));
    });

    it("should call toast.warning for warning type", async () => {
      const { toast } = await import("sonner");

      showToast({
        type: "warning",
        title: "Warning",
      });

      expect(toast.warning).toHaveBeenCalledWith("Warning", expect.any(Object));
    });

    it("should call toast.info for info type", async () => {
      const { toast } = await import("sonner");

      showToast({
        type: "info",
        title: "Info",
      });

      expect(toast.info).toHaveBeenCalledWith("Info", expect.any(Object));
    });

    it("should pass description to toast options", async () => {
      const { toast } = await import("sonner");

      showToast({
        type: "success",
        title: "Title",
        description: "This is a description",
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Title",
        expect.objectContaining({
          description: "This is a description",
        })
      );
    });

    it("should pass duration to toast options", async () => {
      const { toast } = await import("sonner");

      showToast({
        type: "success",
        title: "Title",
        duration: 5000,
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Title",
        expect.objectContaining({
          duration: 5000,
        })
      );
    });

    it("should pass action to toast options when provided", async () => {
      const { toast } = await import("sonner");
      const handleClick = vi.fn();

      showToast({
        type: "success",
        title: "Title",
        action: {
          label: "Undo",
          onClick: handleClick,
        },
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Title",
        expect.objectContaining({
          action: expect.objectContaining({
            label: "Undo",
            onClick: handleClick,
          }),
        })
      );
    });

    it("should warn and skip toast when title is missing", async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { toast } = await import("sonner");

      showToast({
        type: "info",
        title: "",
      } as any);

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[Toast] title is required'));
      expect(toast.info).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });
  });

  describe("showCelebrationToast function", () => {
    it("calls toast.custom with top-center position", async () => {
      const { toast } = await import("sonner");

      showCelebrationToast({ amount: 47.98, merchant: "Test" });

      expect(toast.custom).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          position: "top-center",
        })
      );
    });

    it("renders celebration toast with fixed-center class", async () => {
      showCelebrationToast({ amount: 47.98, merchant: "Test" });

      // Render the custom toast content
      if (customToastCallback) {
        const { container } = render(<>{customToastCallback("test-id")}</>);
        const toastElement = container.querySelector('[data-testid="celebration-toast"]');
        expect(toastElement).toHaveClass("fixed-center");
      }
    });

    it("triggers confetti on full celebration", async () => {
      const confetti = (await import("canvas-confetti")).default;

      showCelebrationToast({ amount: 47.98, celebrationLevel: "full" });

      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 150,
          spread: 360,
        })
      );
    });

    it("triggers confetti with medium settings", async () => {
      const confetti = (await import("canvas-confetti")).default;

      showCelebrationToast({ amount: 47.98, celebrationLevel: "medium" });

      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 80,
          spread: 180,
        })
      );
    });

    it("triggers confetti with subtle settings", async () => {
      const confetti = (await import("canvas-confetti")).default;

      showCelebrationToast({ amount: 47.98, celebrationLevel: "subtle" });

      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 30,
          spread: 90,
        })
      );
    });

    it("does not trigger confetti when level is none", async () => {
      const confetti = (await import("canvas-confetti")).default;

      showCelebrationToast({ amount: 47.98, celebrationLevel: "none" });

      expect(confetti).not.toHaveBeenCalled();
    });

    it("shows amount in toast", async () => {
      showCelebrationToast({ amount: 47.98 });

      if (customToastCallback) {
        render(<>{customToastCallback("test-id")}</>);
        expect(screen.getByText("$47.98")).toBeInTheDocument();
      }
    });

    it("shows merchant when provided", async () => {
      showCelebrationToast({ amount: 47.98, merchant: "Netflix" });

      if (customToastCallback) {
        render(<>{customToastCallback("test-id")}</>);
        expect(screen.getByText("Netflix")).toBeInTheDocument();
      }
    });

    it("does not show merchant when not provided", async () => {
      showCelebrationToast({ amount: 47.98 });

      if (customToastCallback) {
        render(<>{customToastCallback("test-id")}</>);
        expect(screen.queryByTestId("celebration-merchant")).not.toBeInTheDocument();
      }
    });

    it("formats amount correctly with two decimal places", async () => {
      showCelebrationToast({ amount: 100 });

      if (customToastCallback) {
        render(<>{customToastCallback("test-id")}</>);
        expect(screen.getByText("$100.00")).toBeInTheDocument();
      }
    });

    it("warns and skips toast when amount is invalid", async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { toast } = await import("sonner");

      showCelebrationToast({ amount: NaN });

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[Toast] amount must be a valid number'));
      expect(toast.custom).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it("defaults celebration level to full", async () => {
      const confetti = (await import("canvas-confetti")).default;

      showCelebrationToast({ amount: 47.98 });

      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 150,
        })
      );
    });

    it("has role alert for accessibility", async () => {
      showCelebrationToast({ amount: 47.98, merchant: "Test" });

      if (customToastCallback) {
        render(<>{customToastCallback("test-id")}</>);
        expect(screen.getByRole("alert")).toBeInTheDocument();
      }
    });
  });
});