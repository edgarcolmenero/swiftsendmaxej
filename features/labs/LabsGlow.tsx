'use client';

import { useEffect, useRef } from 'react';
import { shouldReduceMotion } from '@/lib/utils/motion';

interface LabsGlowProps {
  className?: string;
}

export function LabsGlow({ className }: LabsGlowProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldReduceMotion()) {
      return;
    }

    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    let raf: number | null = null;
    let start = performance.now();

    const loop = (time: number) => {
      const elapsed = (time - start) / 1000;
      const x = Math.sin(elapsed) * 24;
      const y = Math.cos(elapsed * 0.6) * 18;
      const scale = 0.95 + Math.sin(elapsed * 0.8) * 0.05;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return <div ref={glowRef} className={className} data-labs-orb aria-hidden="true" />;
}
