/**
 * Tests for BlockCelebration Component (Mobile)
 *
 * TDD: Tests verify compound component structure, haptic triggers,
 * accessibility, and merchant anonymization.
 *
 * Note: react-native-reanimated and expo-haptics are mocked globally in jest.setup.ts
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { AccessibilityInfo } from 'react-native';

import { BlockCelebration } from '@/components/ui/BlockCelebration';

// Mock AccessibilityInfo
jest.spyOn(AccessibilityInfo, 'announceForAccessibility').mockImplementation(() => {});

describe('BlockCelebration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders amount prominently', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
        </BlockCelebration>
      );
      expect(screen.getByText('$47.98')).toBeTruthy();
    });

    it('renders with correct testID', () => {
      render(
        <BlockCelebration level="first" testID="celebration">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(screen.getByTestId('celebration')).toBeTruthy();
    });

    it('renders merchant name', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" />
        </BlockCelebration>
      );
      expect(screen.getByText('TrialService')).toBeTruthy();
    });

    it('renders ShareZone with children', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareZone>
            <BlockCelebration.Amount value={10} />
          </BlockCelebration.ShareZone>
        </BlockCelebration>
      );
      expect(screen.getByTestId('block-celebration-share-zone')).toBeTruthy();
    });

    it('renders ShareButton with label', () => {
      const handleShare = jest.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );
      expect(screen.getByTestId('block-celebration-share-button')).toBeTruthy();
      expect(screen.getByText('Share')).toBeTruthy();
    });
  });

  describe('Haptic Behavior', () => {
    it('triggers success haptic on first level', async () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Success
        );
      });
    });

    it('triggers success haptic on milestone level', async () => {
      render(
        <BlockCelebration level="milestone">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Success
        );
      });
    });

    it('triggers warning haptic on streak level', async () => {
      render(
        <BlockCelebration level="streak">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Warning
        );
      });
    });

    it('skips haptic on subtle level', async () => {
      render(
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );

      // Wait a moment to ensure no haptic is called
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    });
  });

  describe('Merchant Anonymization', () => {
    it('anonymizes merchant when requested', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" anonymize />
        </BlockCelebration>
      );
      expect(screen.getByText('[Hidden]')).toBeTruthy();
      expect(screen.queryByText('TrialService')).toBeNull();
    });

    it('shows merchant name when not anonymized', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" anonymize={false} />
        </BlockCelebration>
      );
      expect(screen.getByText('TrialService')).toBeTruthy();
      expect(screen.queryByText('[Hidden]')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('announces to screen reader', async () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
          <BlockCelebration.Merchant name="TrialService" />
        </BlockCelebration>
      );

      await waitFor(() => {
        expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
          'Blocked $47.98 from TrialService'
        );
      });
    });

    it('announces with anonymized merchant', async () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={25.00} />
          <BlockCelebration.Merchant name="TrialService" anonymize />
        </BlockCelebration>
      );

      await waitFor(() => {
        expect(AccessibilityInfo.announceForAccessibility).toHaveBeenCalledWith(
          'Blocked $25.00 from [Hidden]'
        );
      });
    });

    it('has accessible share button', () => {
      const handleShare = jest.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );
      const button = screen.getByTestId('block-celebration-share-button');
      expect(button.props.accessibilityRole).toBe('button');
      expect(button.props.accessibilityLabel).toBe('Share blocked charge celebration');
    });

    it('has alert role on container', () => {
      render(
        <BlockCelebration level="first" testID="celebration">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      const container = screen.getByTestId('celebration');
      expect(container.props.accessibilityRole).toBe('alert');
    });
  });

  describe('ShareButton Interaction', () => {
    it('calls onShare when pressed', () => {
      const handleShare = jest.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );

      fireEvent.press(screen.getByTestId('block-celebration-share-button'));
      expect(handleShare).toHaveBeenCalledTimes(1);
    });

    it('triggers haptic on press', async () => {
      const handleShare = jest.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );

      // Clear previous haptic calls from mount
      jest.clearAllMocks();

      fireEvent.press(screen.getByTestId('block-celebration-share-button'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });

    it('renders custom label', () => {
      const handleShare = jest.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} label="Share Victory" />
        </BlockCelebration>
      );
      expect(screen.getByText('Share Victory')).toBeTruthy();
    });
  });

  describe('Currency Formatting', () => {
    it('formats USD by default', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={99.99} />
        </BlockCelebration>
      );
      expect(screen.getByText('$99.99')).toBeTruthy();
    });

    it('formats EUR currency', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={99.99} currency="EUR" />
        </BlockCelebration>
      );
      // EUR formatting varies by locale
      expect(screen.getByText(/99\.99/)).toBeTruthy();
    });

    it('formats GBP currency', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={50.00} currency="GBP" />
        </BlockCelebration>
      );
      expect(screen.getByText(/50\.00/)).toBeTruthy();
    });
  });

  describe('Compound Usage', () => {
    it('renders full compound structure', () => {
      const handleShare = jest.fn();
      render(
        <BlockCelebration level="first" testID="celebration">
          <BlockCelebration.Amount value={47.98} />
          <BlockCelebration.Merchant name="TrialService" anonymize={false} />
          <BlockCelebration.ShareZone>
            <BlockCelebration.Amount value={47.98} />
          </BlockCelebration.ShareZone>
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );

      expect(screen.getByTestId('celebration')).toBeTruthy();
      expect(screen.getByText('TrialService')).toBeTruthy();
      expect(screen.getByTestId('block-celebration-share-zone')).toBeTruthy();
      expect(screen.getByTestId('block-celebration-share-button')).toBeTruthy();
    });

    it('works with minimal children', () => {
      render(
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={5.99} />
        </BlockCelebration>
      );
      expect(screen.getByText('$5.99')).toBeTruthy();
    });
  });

  describe('Level Variants', () => {
    it('renders first level', () => {
      render(
        <BlockCelebration level="first" testID="celebration">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(screen.getByTestId('celebration')).toBeTruthy();
    });

    it('renders milestone level', () => {
      render(
        <BlockCelebration level="milestone" testID="celebration">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(screen.getByTestId('celebration')).toBeTruthy();
    });

    it('renders streak level', () => {
      render(
        <BlockCelebration level="streak" testID="celebration">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(screen.getByTestId('celebration')).toBeTruthy();
    });

    it('renders subtle level', () => {
      render(
        <BlockCelebration level="subtle" testID="celebration">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(screen.getByTestId('celebration')).toBeTruthy();
    });
  });
});