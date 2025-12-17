import { useState, useCallback } from 'react';

const SHAKE_DURATION = 200;

export function useShakeAnimation() {
  const [isShaking, setIsShaking] = useState(false);

  const shake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), SHAKE_DURATION);
  }, []);

  return {
    className: isShaking ? 'animate-shake' : '',
    shake,
  };
}
