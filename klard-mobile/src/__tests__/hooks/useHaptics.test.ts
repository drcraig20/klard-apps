import { renderHook } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { useHaptics } from '@/hooks/useHaptics';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
    Rigid: 'rigid',
    Soft: 'soft',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

describe('useHaptics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all haptic methods', () => {
    const { result } = renderHook(() => useHaptics());

    expect(result.current).toHaveProperty('light');
    expect(result.current).toHaveProperty('medium');
    expect(result.current).toHaveProperty('heavy');
    expect(result.current).toHaveProperty('rigid');
    expect(result.current).toHaveProperty('soft');
    expect(result.current).toHaveProperty('success');
    expect(result.current).toHaveProperty('warning');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('selection');
  });

  it('calls impactAsync with Light style', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.light();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light
    );
  });

  it('calls impactAsync with Medium style', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.medium();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Medium
    );
  });

  it('calls impactAsync with Heavy style', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.heavy();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Heavy
    );
  });

  it('calls impactAsync with Rigid style', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.rigid();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Rigid
    );
  });

  it('calls impactAsync with Soft style', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.soft();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Soft
    );
  });

  it('calls notificationAsync with Success type', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.success();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Success
    );
  });

  it('calls notificationAsync with Warning type', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.warning();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Warning
    );
  });

  it('calls notificationAsync with Error type', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.error();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Error
    );
  });

  it('calls selectionAsync', async () => {
    const { result } = renderHook(() => useHaptics());
    await result.current.selection();
    expect(Haptics.selectionAsync).toHaveBeenCalled();
  });

  it('returns stable references', () => {
    const { result, rerender } = renderHook(() => useHaptics());
    const firstResult = result.current;

    rerender({});

    expect(result.current.light).toBe(firstResult.light);
    expect(result.current.success).toBe(firstResult.success);
  });
});
