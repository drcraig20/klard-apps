// klard-mobile/src/__tests__/hooks/useShakeAnimation.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useShakeAnimation } from '@/hooks/useShakeAnimation';

describe('useShakeAnimation', () => {
  it('should return animatedStyle and shake function', () => {
    const { result } = renderHook(() => useShakeAnimation());
    expect(result.current.animatedStyle).toBeDefined();
    expect(typeof result.current.shake).toBe('function');
  });

  it('should return a stable shake function reference', () => {
    const { result, rerender } = renderHook(() => useShakeAnimation());
    const firstShake = result.current.shake;
    rerender(undefined);
    expect(result.current.shake).toBe(firstShake);
  });
});
