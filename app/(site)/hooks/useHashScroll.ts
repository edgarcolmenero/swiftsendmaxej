'use client';

import { useEffect } from 'react';

export function useHashScroll(containerSelector?: string) {
  useEffect(() => {
    const container = containerSelector
      ? (document.querySelector(containerSelector) as HTMLElement | null)
      : null;

    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.replace('#', ''));
      if (!id) return;

      const element = document.getElementById(id);
      if (!element) return;

      if (container) {
        const scrollMarginTop = parseInt(getComputedStyle(element).scrollMarginTop || '0', 10) || 0;
        const { top } = element.getBoundingClientRect();
        const containerScrollTop = container.scrollTop || 0;
        container.scrollTo({
          top: top + containerScrollTop - scrollMarginTop,
          behavior: 'smooth',
        });
        return;
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    scrollToHash();

    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [containerSelector]);
}
