// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// @ts-ignore -- resolved via custom local react-dom typings
import * as ReactDOM from "react-dom";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Logo from "@/components/shared/Logo";
import MobileDrawer from "@/components/navigation/MobileDrawer";

const SECTION_IDS = [
  "home",
  "about",
  "services",
  "labs",
  "packs",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

type LinkTarget = string | { pathname: string; hash?: string };

const isSectionId = (value: string): value is SectionId =>
  (SECTION_IDS as readonly string[]).includes(value);

type NavItem = {
  href: string;
  label: string;
  section: SectionId;
  ariaLabel?: string;
  gradient?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#about", label: "About", section: "about" },
  { href: "/#services", label: "Services", section: "services" },
  { href: "/#labs", label: "Labs", section: "labs" },
  { href: "/#packs", label: "Packs", section: "packs" },
  {
    href: "/#contact",
    label: "Save",
    section: "contact",
    ariaLabel: "Go to contact section",
    gradient: true,
  },
];

type ActionItem = {
  href: string;
  ariaLabel: string;
  icon: JSX.Element;
};

const ACTION_ITEMS: ActionItem[] = [
  {
    href: "tel:510-519-1128",
    ariaLabel: "Call 510-519-1128",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="action-icon"
      >
        <path
          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "mailto:swift.send.marketing@gmail.com",
    ariaLabel: "Email swift.send.marketing@gmail.com",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="action-icon"
      >
        <path
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/support",
    ariaLabel: "Support",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="action-icon"
      >
        <path
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.04 6.15c1.6 0 2.61 1.01 2.61 2.3 0 1-.52 1.74-1.4 2.25-.78.44-1.05.73-1.05 1.25v.26a.75.75 0 0 1-1.5 0v-.35c0-1.04.52-1.67 1.4-2.16.78-.44 1.05-.79 1.05-1.3 0-.48-.36-.8-1.11-.8-.63 0-1.1.26-1.52.73a.75.75 0 0 1-1.1-1.02c.65-.71 1.44-1.16 2.62-1.16Zm-.04 8.86a.94.94 0 1 1 .94-.94.94.94 0 0 1-.94.94Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const [hasShadow, setHasShadow] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const activeSectionRef = useRef<SectionId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    const updateShadow = () => {
      setHasShadow(window.scrollY > 8);
    };

    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  useEffect(() => {
    if (!portalTarget || !headerRef.current) {
      return;
    }

    const setHeaderHeight = () => {
      if (!headerRef.current) return;
      const height = headerRef.current.offsetHeight;
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

  const setActiveSectionIfValid = useCallback((sectionId: SectionId | null) => {
    if (sectionId && activeSectionRef.current !== sectionId) {
      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);
    }
  }, []);

  const handleAnchorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: LinkTarget, sectionId?: SectionId) => {
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetOffset = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    const destination = Math.max(targetOffset, 0);

    window.scrollTo({
      top: destination,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    if (sectionId) {
      setActiveSectionIfValid(sectionId);
    }
  }, [resolveHash, pathname, setActiveSectionIfValid]);

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
  }, [pathname, setActiveSectionIfValid]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname !== "/") {
      return;
    }

    const ratiosRef = Object.fromEntries(
      SECTION_IDS.map((section) => [section, 0])
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

        const sorted = SECTION_IDS.map((id) => ({
          id,
          ratio: ratiosRef[id] ?? 0,
        })).sort((a, b) => b.ratio - a.ratio);

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

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element)
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [pathname, setActiveSectionIfValid]);

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
  }, [pathname, setActiveSectionIfValid]);

  if (!portalTarget) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <header
        ref={headerRef}
        data-header
        className={`header ss-header header--fixed${hasShadow ? " has-shadow" : ""}`}
      >
        <div className="header-container">
          <div className="header-grid">
            <div className="header-logo">
              <Logo
                className="brand"
                showWordmark={false}
                size="md"
                priority
                ariaLabel="SwiftSend — Home"
                onClick={(event) => handleAnchorClick(event, "/#home", "home")}
              />
            </div>
            <nav className="nav-desktop" aria-label="Primary">
              <ul className="nav-list" role="list">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.section;
                  return (
                    <li key={item.section} className="nav-item">
                      <Link
                        href={item.href}
                        className={`nav-link${isActive ? " nav-link--active" : ""}`}
                        aria-label={item.ariaLabel}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(event) => handleAnchorClick(event, item.href, item.section)}
                        prefetch={false}
                      >
                        <span
                          className={`nav-label${item.gradient ? " nav-label--gradient" : ""}`}
                        >
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`nav-underline${isActive ? " nav-underline--active" : ""}`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="header-actions">
              <div className="header-actions__cluster">
                {ACTION_ITEMS.map((action) => (
                  <Link
                    key={action.ariaLabel}
                    href={action.href}
                    aria-label={action.ariaLabel}
                    className="icon-btn"
                    prefetch={false}
                  >
                    {action.icon}
                  </Link>
                ))}
              </div>
              <button 
                type="button" 
                className="hamburger" 
                aria-label="Open navigation"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <MobileDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={NAV_ITEMS}
          onNavigate={(event, href, section) => {
            handleAnchorClick(event, href, section);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </>,
    portalTarget
  );
}
