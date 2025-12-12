/**
 * Tests for Toast Component (Web)
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { showToast } from "@/components/ui/toast";

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
  Toaster: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="toaster">{children}</div>
  ),
}));

describe("Toast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
});