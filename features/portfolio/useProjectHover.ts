'use client';

import { PointerEvent as ReactPointerEvent, useCallback, useRef } from 'react';
import { shouldReduceMotion } from '@/lib/utils/motion';

export function useProjectHover() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = shouldReduceMotion();

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) {
        return;
      }

      const element = imageRef.current;
      if (!element) {
        return;
      }

      const bounds = element.getBoundingClientRect();
      const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
      element.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    },
    [reduceMotion],
  );

  const reset = useCallback(() => {
    const element = imageRef.current;
    if (element) {
      element.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  return { imageRef, handlePointerMove, reset };
}
