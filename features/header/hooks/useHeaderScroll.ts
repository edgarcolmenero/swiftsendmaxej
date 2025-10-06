'use client';

import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

const HEADER_FADE_MIN = 120;
const HEADER_FADE_MAX = 220;
const HEADER_FADE_THRESHOLD = 220;
const HERO_BUFFER_PX = 72;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const HEADER_FADE_SAFE = clamp(HEADER_FADE_THRESHOLD, HEADER_FADE_MIN, HEADER_FADE_MAX);

interface UseHeaderScrollOptions {
  headerRef: MutableRefObject<HTMLElement | null>;
  heroSelector?: string;
  navSelector?: string;
}

interface UseHeaderScrollResult {
  faded: boolean;
  setActiveFromHash: (hash?: string) => void;
  setupScrollSpy: () => () => void;
}

export function useHeaderScroll({
  headerRef,
  heroSelector = 'section.hero',
  navSelector = '.nav-pill',
}: UseHeaderScrollOptions): UseHeaderScrollResult {
  const [faded, setFaded] = useState(false);
  const fadedRef = useRef(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const navObserverRef = useRef<IntersectionObserver | null>(null);
  const navHashesRef = useRef<string[]>([]);

  const resolveHero = useCallback(() => {
    if (typeof document === 'undefined') {
      return null;
    }

    const existing = heroRef.current;
    if (existing && document.contains(existing)) {
      return existing;
    }

    heroRef.current = document.querySelector<HTMLElement>(heroSelector);
    return heroRef.current;
  }, [heroSelector]);

  const getNavItems = useCallback(() => {
    if (typeof document === 'undefined') {
      return [] as HTMLAnchorElement[];
    }

    return Array.from(document.querySelectorAll<HTMLAnchorElement>(navSelector));
  }, [navSelector]);

  const applyActiveHash = useCallback(
    (rawHash?: string) => {
      if (typeof document === 'undefined') {
        return;
      }

      const defaultHash = '#home';
      const browserHash = typeof window !== 'undefined' ? window.location.hash : '';
      const normalizedRaw = rawHash && rawHash.trim().length > 0 ? rawHash : browserHash;
      const normalized = normalizedRaw?.startsWith('#') && normalizedRaw.length > 1 ? normalizedRaw : defaultHash;

      const navItems = getNavItems();
      navHashesRef.current = navItems
        .map((item) => item.getAttribute('href') || '')
        .filter((hash) => hash.startsWith('#') && hash.length > 1);

      navItems.forEach((item) => {
        const itemHash = item.getAttribute('href') || '';
        item.classList.toggle('is-active', itemHash === normalized);
      });
    },
    [getNavItems],
  );

  const setActiveFromHash = useCallback(
    (hash?: string) => {
      if (typeof window === 'undefined') {
        return;
      }

      applyActiveHash(hash);
    },
    [applyActiveHash],
  );

  const updateFade = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const header = headerRef.current;
    if (!header) {
      return;
    }

    const hero = resolveHero();
    let heroVisible = false;

    if (hero) {
      const rect = hero.getBoundingClientRect();
      heroVisible = rect.bottom > HERO_BUFFER_PX;
    }

    const scrollY = window.scrollY || window.pageYOffset;
    const shouldFade = !heroVisible && scrollY > HEADER_FADE_MIN && scrollY >= HEADER_FADE_SAFE;

    header.classList.toggle('header-fade', shouldFade);

    if (fadedRef.current !== shouldFade) {
      fadedRef.current = shouldFade;
      setFaded(shouldFade);
    }
  }, [headerRef, resolveHero]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => updateFade();
    const handleResize = () => {
      heroRef.current = null;
      updateFade();
    };

    updateFade();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateFade]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handlePageHide = () => {
      navObserverRef.current?.disconnect();
      navObserverRef.current = null;
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, []);

  const setupScrollSpy = useCallback(() => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    navObserverRef.current?.disconnect();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || mediaQuery.matches) {
      setActiveFromHash();
      return () => {};
    }

    const navItems = getNavItems();
    const hashes = navItems.length > 0
      ? navItems
          .map((item) => item.getAttribute('href'))
          .filter((hash): hash is string => Boolean(hash && hash.startsWith('#')))
      : navHashesRef.current;

    const sections = hashes
      .map((hash) => document.getElementById(hash.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) {
          return;
        }

        const topEntry = visible[0];
        applyActiveHash(`#${topEntry.target.id}`);
      },
      { threshold: 0.35, rootMargin: '0px 0px -40% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    navObserverRef.current = observer;

    return () => {
      observer.disconnect();
      navObserverRef.current = null;
    };
  }, [applyActiveHash, getNavItems, setActiveFromHash]);

  return {
    faded,
    setActiveFromHash,
    setupScrollSpy,
  };
}
