"use client";

import { usePathname } from "next/navigation";
import {
  type MouseEvent,
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type SectionId = string;

export type LinkTarget = string | { pathname?: string; hash?: string };

export interface UseHeaderScrollOptions {
  sections: readonly SectionId[];
}

export interface HeaderScrollResult {
  headerRef: MutableRefObject<HTMLElement | null>;
  portalTarget: Element | null;
  hasShadow: boolean;
  activeSection: SectionId | null;
  handleAnchorClick: (
    event: MouseEvent<HTMLAnchorElement>,
    href: LinkTarget,
    sectionId?: SectionId
  ) => void;
}

export function useHeaderScroll({
  sections,
}: UseHeaderScrollOptions): HeaderScrollResult {
  const headerRef = useRef<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const [hasShadow, setHasShadow] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const activeSectionRef = useRef<SectionId | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateShadow = () => {
      setHasShadow(window.scrollY > 8);
    };

    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!portalTarget || !headerRef.current) {
      return;
    }

    const setHeaderHeight = () => {
      const node = headerRef.current;
      if (!node) {
        return;
      }
      const height = node.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${height}px`);
    };

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      resizeObserver = new ResizeObserver(setHeaderHeight);
      resizeObserver.observe(headerRef.current);
    } else {
      setHeaderHeight();
    }

    setHeaderHeight();
    window.addEventListener("orientationchange", setHeaderHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("orientationchange", setHeaderHeight);
    };
  }, [portalTarget]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const isSectionId = useCallback(
    (value: string): value is SectionId => sections.includes(value),
    [sections]
  );

  const setActiveSectionIfValid = useCallback((sectionId: SectionId | null) => {
    if (sectionId && activeSectionRef.current !== sectionId) {
      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);
    }
  }, []);

  const resolveHash = useCallback((href: LinkTarget): string | null => {
    if (typeof href === "string") {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) {
        return null;
      }
      return href.slice(hashIndex);
    }

    const rawHash = href.hash;
    if (!rawHash) {
      return null;
    }

    return rawHash.startsWith("#") ? rawHash : `#${rawHash}`;
  }, []);

  const handleAnchorClick = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      href: LinkTarget,
      sectionId?: SectionId
    ) => {
      const hash = resolveHash(href);
      if (!hash) {
        return;
      }

      const hrefPathname =
        typeof href === "string"
          ? (() => {
              const hashIndex = href.indexOf("#");
              if (hashIndex === -1) return href || "/";
              const rawPath = href.slice(0, hashIndex);
              return rawPath === "" ? "/" : rawPath;
            })()
          : href.pathname ?? "/";

      if (hrefPathname && hrefPathname !== "/") {
        return;
      }

      if (pathname !== "/") {
        return;
      }

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();

      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const prefersReducedMotion = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      const targetOffset =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      const destination = Math.max(targetOffset, 0);

      window.scrollTo({
        top: destination,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      if (sectionId) {
        setActiveSectionIfValid(sectionId);
      }
    },
    [pathname, resolveHash, setActiveSectionIfValid]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname !== "/") {
      setActiveSection(null);
      activeSectionRef.current = null;
      return;
    }

    const hash = window.location.hash.replace("#", "");
    if (hash && isSectionId(hash)) {
      setActiveSectionIfValid(hash);
      return;
    }

    setActiveSectionIfValid("home");
  }, [isSectionId, pathname, setActiveSectionIfValid]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname !== "/") {
      return;
    }

    const ratiosRef = Object.fromEntries(
      sections.map((section) => [section, 0])
    ) as Record<SectionId, number>;

    const observer = new IntersectionObserver(
      (entries) => {
        let didUpdate = false;
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (!sectionId || !isSectionId(sectionId)) {
            return;
          }

          ratiosRef[sectionId] = entry.intersectionRatio;
          didUpdate = true;
        });

        if (!didUpdate) {
          return;
        }

        const sorted = sections
          .map((id) => ({
            id,
            ratio: ratiosRef[id] ?? 0,
          }))
          .sort((a, b) => b.ratio - a.ratio);

        const next = sorted.find((entry) => entry.ratio > 0.05) ?? sorted[0];
        if (!next) {
          return;
        }

        setActiveSectionIfValid(next.id);
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const sectionNodes = sections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    sectionNodes.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [isSectionId, pathname, sections, setActiveSectionIfValid]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname !== "/") {
      return;
    }

    const handleHashChange = () => {
      const next = window.location.hash.replace("#", "");
      if (next && isSectionId(next)) {
        setActiveSectionIfValid(next);
      } else if (!next) {
        setActiveSectionIfValid("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isSectionId, pathname, setActiveSectionIfValid]);

  return {
    headerRef,
    portalTarget,
    hasShadow,
    activeSection,
    handleAnchorClick,
  };
}
