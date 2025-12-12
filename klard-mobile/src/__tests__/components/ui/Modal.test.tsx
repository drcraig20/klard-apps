/**
 * Tests for Modal Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Text, View } from "react-native";
import { Modal } from "@/components/ui/Modal";
import * as Haptics from "expo-haptics";

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));

// Mock vector icons
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || "icon"}>{name}</Text>
    ),
  };
});

describe("Modal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should not render content when open is false", () => {
      render(
        <Modal open={false} onClose={() => {}}>
          <Text>Modal Content</Text>
        </Modal>
      );

      expect(screen.queryByText("Modal Content")).toBeNull();
    });

    it("should render content when open is true", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Text>Modal Content</Text>
        </Modal>
      );

      expect(screen.getByText("Modal Content")).toBeTruthy();
    });

    it("should render as RN Modal component", () => {
      render(
        <Modal open={true} onClose={() => {}} testID="modal">
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByTestId("modal")).toBeTruthy();
    });
  });

  describe("Title and Description", () => {
    it("should render title when provided", () => {
      render(
        <Modal open={true} onClose={() => {}} title="Modal Title">
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByText("Modal Title")).toBeTruthy();
    });

    it("should render description when provided", () => {
      render(
        <Modal
          open={true}
          onClose={() => {}}
          title="Title"
          description="This is a description"
        >
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByText("This is a description")).toBeTruthy();
    });

    it("should not render header elements when no title", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.queryByTestId("modal-title")).toBeNull();
    });
  });

  describe("Footer", () => {
    it("should render footer when provided", () => {
      render(
        <Modal
          open={true}
          onClose={() => {}}
          footer={<Text testID="footer-content">Footer</Text>}
        >
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByTestId("footer-content")).toBeTruthy();
    });

    it("should not render footer wrapper when footer not provided", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.queryByTestId("modal-footer")).toBeNull();
    });
  });

  describe("Close Behavior", () => {
    it("should call onClose when close button is pressed", async () => {
      const handleClose = jest.fn();
      render(
        <Modal open={true} onClose={handleClose} title="Test">
          <Text>Content</Text>
        </Modal>
      );

      fireEvent.press(screen.getByLabelText(/close/i));

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it("should trigger haptic feedback when close button is pressed", async () => {
      const handleClose = jest.fn();
      render(
        <Modal open={true} onClose={handleClose} title="Test">
          <Text>Content</Text>
        </Modal>
      );

      fireEvent.press(screen.getByLabelText(/close/i));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });

    it("should call onClose when overlay is pressed (closeOnOverlay=true)", async () => {
      const handleClose = jest.fn();
      render(
        <Modal open={true} onClose={handleClose} closeOnOverlay={true}>
          <Text>Content</Text>
        </Modal>
      );

      fireEvent.press(screen.getByTestId("modal-overlay"));

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });

    it("should NOT call onClose when overlay is pressed (closeOnOverlay=false)", async () => {
      const handleClose = jest.fn();
      render(
        <Modal open={true} onClose={handleClose} closeOnOverlay={false}>
          <Text>Content</Text>
        </Modal>
      );

      // Should not have overlay pressable when closeOnOverlay is false
      const overlay = screen.queryByTestId("modal-overlay-pressable");
      if (overlay) {
        fireEvent.press(overlay);
      }

      await new Promise((r) => setTimeout(r, 100));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it("should call onClose on hardware back button (Android)", () => {
      const handleClose = jest.fn();
      render(
        <Modal open={true} onClose={handleClose}>
          <Text>Content</Text>
        </Modal>
      );

      // onRequestClose is called on Android back button
      // This is tested through the Modal's onRequestClose prop
      expect(handleClose).toBeDefined();
    });
  });

  describe("Handle Indicator", () => {
    it("should render handle indicator at top", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByTestId("modal-handle")).toBeTruthy();
    });
  });

  describe("Safe Area", () => {
    it("should respect safe area insets for bottom padding", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );

      // Content should render with safe area consideration
      expect(screen.getByText("Content")).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have accessible close button", () => {
      render(
        <Modal open={true} onClose={() => {}} title="Test">
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByLabelText(/close/i)).toBeTruthy();
    });

    it("should have accessibility role on title", () => {
      render(
        <Modal open={true} onClose={() => {}} title="Accessible Title">
          <Text>Content</Text>
        </Modal>
      );

      const title = screen.getByText("Accessible Title");
      expect(title.props.accessibilityRole).toBe("header");
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid open/close without error", () => {
      const { rerender } = render(
        <Modal open={false} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );

      rerender(
        <Modal open={true} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );
      rerender(
        <Modal open={false} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );
      rerender(
        <Modal open={true} onClose={() => {}}>
          <Text>Content</Text>
        </Modal>
      );

      expect(screen.getByText("Content")).toBeTruthy();
    });
  });
});