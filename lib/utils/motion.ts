export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const motionDurations = {
  fast: 0.18,
  base: 0.28,
  slow: 0.46,
} as const;

export const motionEasings = {
  standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
  emphasized: 'cubic-bezier(0.33, 1, 0.68, 1)',
} as const;
