// klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import BottomSheetLib, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { styles, backdropColor } from './bottom-sheet.styles';

export interface BottomSheetProps {
  /** Whether the bottom sheet is open */
  open: boolean;
  /** Callback when the bottom sheet is closed */
  onClose: () => void;
  /** Snap points for the bottom sheet (e.g., ['25%', '50%', '90%']) */
  snapPoints?: Array<string | number>;
  /** Children to render inside the bottom sheet */
  children: React.ReactNode;
  /** Whether dragging to close is enabled (default: true) */
  enableDrag?: boolean;
}

export function BottomSheet({
  open,
  onClose,
  snapPoints,
  children,
  enableDrag = true,
}: BottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetLib>(null);
  const insets = useSafeAreaInsets();

  const snaps = useMemo(() => snapPoints ?? ['50%'], [snapPoints]);

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
        style={[props.style, { backgroundColor: backdropColor }]}
        {...({ testID: 'bottom-sheet-backdrop' } as any)}
      />
    ),
    []
  );

  return (
    <BottomSheetLib
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snaps}
      enablePanDownToClose={enableDrag}
      onChange={handleSheetChanges}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
    >
      <BottomSheetView
        style={[styles.contentContainer, { paddingBottom: insets.bottom + 16 }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetLib>
  );
}
