/**
 * Tests for Toast Component (Mobile)
 */

import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { showToast } from "@/components/ui/Toast";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";

// Mock react-native-toast-message
jest.mock("react-native-toast-message", () => {
  const mockShow = jest.fn();
  const mockHide = jest.fn();
  return {
    __esModule: true,
    default: {
      show: mockShow,
      hide: mockHide,
    },
    show: mockShow,
    hide: mockHide,
  };
});

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
}));

describe("Toast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("showToast function", () => {
    it("should call Toast.show for success type", () => {
      showToast({
        type: "success",
        title: "Success!",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "success",
          text1: "Success!",
        })
      );
    });

    it("should call Toast.show for error type", () => {
      showToast({
        type: "error",
        title: "Error occurred",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
          text1: "Error occurred",
        })
      );
    });

    it("should call Toast.show for warning type", () => {
      showToast({
        type: "warning",
        title: "Warning",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "warning",
          text1: "Warning",
        })
      );
    });

    it("should call Toast.show for info type", () => {
      showToast({
        type: "info",
        title: "Info",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "info",
          text1: "Info",
        })
      );
    });

    it("should pass description as text2", () => {
      showToast({
        type: "success",
        title: "Title",
        description: "This is a description",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: "Title",
          text2: "This is a description",
        })
      );
    });

    it("should pass duration as visibilityTime", () => {
      showToast({
        type: "success",
        title: "Title",
        duration: 5000,
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          visibilityTime: 5000,
        })
      );
    });

    it("should use default duration of 3000ms when not specified", () => {
      showToast({
        type: "info",
        title: "Info",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          visibilityTime: 3000,
        })
      );
    });

    it("should trigger haptic feedback for success", async () => {
      showToast({
        type: "success",
        title: "Success",
      });

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Success
        );
      });
    });

    it("should trigger haptic feedback for error", async () => {
      showToast({
        type: "error",
        title: "Error",
      });

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Error
        );
      });
    });

    it("should trigger haptic feedback for warning", async () => {
      showToast({
        type: "warning",
        title: "Warning",
      });

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Warning
        );
      });
    });

    it("should not trigger haptic feedback for info", () => {
      showToast({
        type: "info",
        title: "Info",
      });

      expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    });

    it("should pass action via props when provided", () => {
      const handleClick = jest.fn();

      showToast({
        type: "success",
        title: "Title",
        action: {
          label: "Undo",
          onClick: handleClick,
        },
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            action: expect.objectContaining({
              label: "Undo",
              onClick: handleClick,
            }),
          }),
        })
      );
    });

    it("should use bottom position by default", () => {
      showToast({
        type: "info",
        title: "Info",
      });

      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          position: "bottom",
        })
      );
    });

    it("should warn and skip toast when title is missing", () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      showToast({
        type: "info",
        title: "",
      } as any);

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[Toast] title is required'));
      expect(Toast.show).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });
  });
});