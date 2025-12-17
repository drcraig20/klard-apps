import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import {
  containerStyles,
  titleStyles,
  messageStyles,
  errorCodeStyles,
  buttonContainerStyles,
} from './network-error-sheet.styles';

export interface NetworkErrorSheetProps {
  /** Whether the bottom sheet is open */
  open: boolean;
  /** Callback when the bottom sheet is closed */
  onClose: () => void;
  /** Callback when the retry button is pressed */
  onRetry: () => void;
  /** Error information to display */
  error: {
    /** Error message to display */
    message: string;
    /** Optional error code */
    code?: string;
  };
}

export function NetworkErrorSheet({
  open,
  onClose,
  onRetry,
  error,
}: Readonly<NetworkErrorSheetProps>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <BottomSheet open={open} onClose={onClose} snapPoints={['40%']}>
      <View style={containerStyles(isDark, {})}>
        <Text style={titleStyles(isDark, {})}>Connection Error</Text>

        <Text style={messageStyles(isDark, {})}>{error.message}</Text>

        {error.code && (
          <Text style={errorCodeStyles(isDark, {})}>
            Error code: {error.code}
          </Text>
        )}

        <View style={buttonContainerStyles(isDark, {})}>
          <Button variant="primary" size="lg" fullWidth onPress={onRetry}>
            Try again
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}
