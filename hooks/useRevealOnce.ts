'use client';

import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Options = {
  threshold?: number;
  rootMargin?: string;
};

export function useRevealOnce(selector: string, options: Options = {}): void {
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      elements.forEach((element) => {
        element.classList.add('is-in');
      });
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!('IntersectionObserver' in window) || elements.length === 0) {
      elements.forEach((element) => element.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.18,
        rootMargin: options.rootMargin ?? '0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [isReduced, options.rootMargin, options.threshold, selector]);
}
