// klard-mobile/src/components/ui/BottomSheet/bottom-sheet.styles.ts
import { StyleSheet } from 'react-native';

export const lightColors = {
  handleIndicator: 'rgba(148, 163, 184, 0.2)',
  background: '#FFFFFF',
  backdrop: 'rgba(15, 23, 42, 0.5)',
};

export const darkColors = {
  handleIndicator: 'rgba(148, 163, 184, 0.12)',
  background: '#1E293B',
  backdrop: 'rgba(15, 23, 42, 0.5)',
};

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  handleIndicator: {
    backgroundColor: lightColors.handleIndicator,
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  background: {
    backgroundColor: lightColors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export const backdropColor = lightColors.backdrop;