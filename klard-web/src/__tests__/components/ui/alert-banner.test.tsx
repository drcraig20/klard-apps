/**
 * Tests for AlertBanner Component
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AlertBanner } from "@/components/ui/alert-banner";

describe("AlertBanner", () => {
  describe("Rendering", () => {
    it("should render with children text", () => {
      render(<AlertBanner type="info">Test message</AlertBanner>);

      expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("should have data-slot attribute", () => {
      render(<AlertBanner type="info">Message</AlertBanner>);

      expect(
        document.querySelector('[data-slot="alert-banner"]')
      ).toBeInTheDocument();
    });

    it("should have role=alert for accessibility", () => {
      render(<AlertBanner type="info">Message</AlertBanner>);

      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should render title when provided", () => {
      render(
        <AlertBanner type="info" title="Alert Title">
          Message
        </AlertBanner>
      );

      expect(screen.getByText("Alert Title")).toBeInTheDocument();
    });
  });

  describe("Type Variants", () => {
    const types = ["success", "error", "warning", "info"] as const;

    types.forEach((type) => {
      it(`should render ${type} variant without error`, () => {
        render(<AlertBanner type={type}>{type} message</AlertBanner>);

        expect(screen.getByText(`${type} message`)).toBeInTheDocument();
      });
    });

    it("should apply success variant with green colors", () => {
      render(<AlertBanner type="success">Success</AlertBanner>);

      const alert = screen.getByRole("alert");
      expect(alert.className).toMatch(/success/);
    });

    it("should apply error variant with red colors", () => {
      render(<AlertBanner type="error">Error</AlertBanner>);

      const alert = screen.getByRole("alert");
      expect(alert.className).toMatch(/error/);
    });

    it("should apply warning variant with amber colors", () => {
      render(<AlertBanner type="warning">Warning</AlertBanner>);

      const alert = screen.getByRole("alert");
      expect(alert.className).toMatch(/warning/);
    });

    it("should apply info variant with teal colors", () => {
      render(<AlertBanner type="info">Info</AlertBanner>);

      const alert = screen.getByRole("alert");
      expect(alert.className).toMatch(/info/);
    });
  });

  describe("Icons", () => {
    it("should render checkmark icon for success type", () => {
      render(<AlertBanner type="success">Success</AlertBanner>);

      expect(document.querySelector("svg")).toBeInTheDocument();
    });

    it("should render alert icon for error type", () => {
      render(<AlertBanner type="error">Error</AlertBanner>);

      expect(document.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("should apply default size by default", () => {
      render(<AlertBanner type="info">Message</AlertBanner>);

      const alert = screen.getByRole("alert");
      expect(alert.className).toContain("alert-default");
    });

    it("should apply compact size when specified", () => {
      render(
        <AlertBanner type="info" size="compact">
          Message
        </AlertBanner>
      );

      const alert = screen.getByRole("alert");
      expect(alert.className).toContain("alert-compact");
    });
  });

  describe("Dismissible", () => {
    it("should show dismiss button when dismissible is true", () => {
      render(
        <AlertBanner type="info" dismissible>
          Message
        </AlertBanner>
      );

      expect(
        screen.getByRole("button", { name: /dismiss/i })
      ).toBeInTheDocument();
    });

    it("should not show dismiss button by default", () => {
      render(<AlertBanner type="info">Message</AlertBanner>);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should call onDismiss when dismiss button is clicked", () => {
      const handleDismiss = vi.fn();
      render(
        <AlertBanner type="info" dismissible onDismiss={handleDismiss}>
          Message
        </AlertBanner>
      );

      fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));

      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("Action", () => {
    it("should render action element when provided", () => {
      render(
        <AlertBanner
          type="info"
          action={<button type="button">Take Action</button>}
        >
          Message
        </AlertBanner>
      );

      expect(
        screen.getByRole("button", { name: "Take Action" })
      ).toBeInTheDocument();
    });
  });

  describe("Custom Icon", () => {
    it("should support custom icon override", () => {
      const customIcon = <span data-testid="custom-icon">!</span>;
      render(
        <AlertBanner type="info" icon={customIcon}>
          Info content
        </AlertBanner>
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(
        <AlertBanner type="info" className="custom-class">
          Message
        </AlertBanner>
      );

      const alert = screen.getByRole("alert");
      expect(alert.className).toContain("custom-class");
    });
  });
});
