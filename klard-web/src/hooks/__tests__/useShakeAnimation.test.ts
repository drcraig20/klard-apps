import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useShakeAnimation } from '../useShakeAnimation';

describe('useShakeAnimation', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('should return className and shake function', () => {
    const { result } = renderHook(() => useShakeAnimation());
    expect(result.current.className).toBe('');
    expect(typeof result.current.shake).toBe('function');
  });

  it('should add shake class when shake is called', () => {
    const { result } = renderHook(() => useShakeAnimation());
    act(() => { result.current.shake(); });
    expect(result.current.className).toBe('animate-shake');
  });

  it('should remove shake class after 200ms', () => {
    const { result } = renderHook(() => useShakeAnimation());
    act(() => { result.current.shake(); });
    expect(result.current.className).toBe('animate-shake');
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current.className).toBe('');
  });
});
