/**
 * @gorhom/bottom-sheet mock for Storybook web environment
 *
 * Provides basic View-based implementations for bottom sheet components.
 */

import React from 'react';
import { View, type ViewStyle } from 'react-native';

interface BottomSheetProps {
  children?: React.ReactNode;
  snapPoints?: (string | number)[];
  index?: number;
  onChange?: (index: number) => void;
  onClose?: () => void;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  backdropComponent?: React.ComponentType<unknown>;
  handleIndicatorStyle?: ViewStyle;
  backgroundStyle?: ViewStyle;
  style?: ViewStyle;
}

interface BottomSheetViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface BottomSheetBackdropProps {
  animatedIndex?: { value: number };
  animatedPosition?: { value: number };
  style?: ViewStyle;
  disappearsOnIndex?: number;
  appearsOnIndex?: number;
  opacity?: number;
  pressBehavior?: 'close' | 'none' | 'collapse';
  onPress?: () => void;
}

const BottomSheet = React.forwardRef<unknown, BottomSheetProps>(
  function BottomSheet({ children, backgroundStyle }, _ref) {
    return React.createElement(View, {
      style: [
        {
          position: 'absolute' as const,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        backgroundStyle,
      ],
      children,
    });
  }
);

const BottomSheetView: React.FC<BottomSheetViewProps> = ({ children, style }) => {
  return React.createElement(View, { style, children });
};

const BottomSheetBackdrop: React.FC<BottomSheetBackdropProps> = ({ style, onPress }) => {
  return React.createElement(View, {
    style: [
      {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      style,
    ],
    // @ts-expect-error onClick is web-specific
    onClick: onPress,
  });
};

const BottomSheetHandle: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  return React.createElement(View, {
    style: [
      {
        alignSelf: 'center' as const,
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
        marginVertical: 8,
      },
      style,
    ],
  });
};

const BottomSheetFlatList = View;
const BottomSheetScrollView = View;
const BottomSheetSectionList = View;
const BottomSheetTextInput = View;

export default BottomSheet;
export {
  BottomSheet,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetSectionList,
  BottomSheetTextInput,
};
