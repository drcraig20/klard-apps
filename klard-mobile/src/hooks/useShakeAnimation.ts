// klard-mobile/src/hooks/useShakeAnimation.ts
import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SHAKE_OFFSET = 10;
const SHAKE_DURATION = 50;

export function useShakeAnimation() {
  const translateX = useSharedValue(0);

  const shake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(-SHAKE_OFFSET, { duration: SHAKE_DURATION }),
      withTiming(SHAKE_OFFSET, { duration: SHAKE_DURATION }),
      withTiming(-SHAKE_OFFSET, { duration: SHAKE_DURATION }),
      withTiming(0, { duration: SHAKE_DURATION })
    );
  }, []); // Empty deps - translateX is a stable shared value reference

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { animatedStyle, shake };
}
