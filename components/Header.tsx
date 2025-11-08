// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
"use client";

import Link from "next/link";
// @ts-ignore -- resolved via custom local react-dom typings
import * as ReactDOM from "react-dom";
import {
  type MouseEvent,
  useEffect,
  useRef,
  useState
} from "react";

import Logo from "@/components/shared/Logo";

type LinkTarget = string | { pathname: string; hash?: string };

type NavItem = {
  href: LinkTarget;
  label: string;
  ariaLabel?: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: { pathname: "/", hash: "home" }, label: "Home" },
  { href: { pathname: "/", hash: "about" }, label: "About" },
  { href: { pathname: "/", hash: "services" }, label: "Services" },
  { href: { pathname: "/", hash: "work" }, label: "Work" },
  { href: { pathname: "/", hash: "labs" }, label: "Labs" },
  { href: { pathname: "/", hash: "packs" }, label: "Packs" },
  {
    href: { pathname: "/", hash: "contact" },
    label: "Start",
    ariaLabel: "Go to contact section",
  },
];

type ActionItem = {
  href: LinkTarget;
  ariaLabel: string;
  icon: JSX.Element;
  external?: boolean;
};

const ACTION_ITEMS: ActionItem[] = [
  {
    href: { pathname: "/", hash: "contact" },
    ariaLabel: "Start a build",
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
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.5-1a1 1 0 0 0-1 1v.32l6.17 4.05a.5.5 0 0 0 .66 0L19.5 6.82V6.5a1 1 0 0 0-1-1h-11Zm11.73 3.2L13 12.18a2.5 2.5 0 0 1-3 0L5.77 8.7V17.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8.7Z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    href: "tel:+1234567890",
    ariaLabel: "Call SwiftSend",
    external: true,
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
          d="M7.06 2.94a2.5 2.5 0 0 1 3.57 0l1.19 1.19a2.5 2.5 0 0 1 .45 2.94l-.53 1.06a1 1 0 0 0 .21 1.15l2.92 2.92a1 1 0 0 0 1.15.21l1.06-.53a2.5 2.5 0 0 1 2.94.45l1.19 1.19a2.5 2.5 0 0 1 0 3.57l-1.01 1.01c-1.65 1.65-4.25 1.9-6.2.58a33.35 33.35 0 0 1-9.73-9.73c-1.32-1.95-1.07-4.55.58-6.2l1.01-1.01Z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    href: "/account",
    ariaLabel: "Open account",
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
          d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 10c4.42 0 8 2.24 8 5v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1c0-2.76 3.58-5 8-5Z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    href: "/schedule",
    ariaLabel: "Open schedule",
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
          d="M7 3a1 1 0 0 1 1 1v1h8V4a1 1 0 1 1 2 0v1h.5A2.5 2.5 0 0 1 21 7.5v11A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5H6V4a1 1 0 0 1 1-1Zm12 6H5v9.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V9Zm-5 3.5a1 1 0 0 1 .58.19l2 1.5a1 1 0 0 1-1.16 1.62l-.42-.32V17a1 1 0 1 1-2 0v-2.5a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    )
  }
];

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const [hasShadow, setHasShadow] = useState(false);

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

  const resolveHash = (href: LinkTarget): string | null => {
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
  };

  const getLinkKey = (href: LinkTarget) =>
    typeof href === "string"
      ? href
      : `${href.pathname ?? ""}#${href.hash ?? ""}`;

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: LinkTarget) => {
    const hash = resolveHash(href);
    if (!hash) {
      return;
    }

    const pathname =
      typeof href === "string"
        ? (() => {
            const hashIndex = href.indexOf("#");
            if (hashIndex === -1) return href || "/";
            const rawPath = href.slice(0, hashIndex);
            return rawPath === "" ? "/" : rawPath;
          })()
        : href.pathname ?? "/";

    if (pathname && pathname !== "/") {
      return;
    }

    if (window.location.pathname !== "/") {
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
  };

  if (!portalTarget) {
    return null;
  }

  return ReactDOM.createPortal(
    <header
      ref={headerRef}
      data-header
      className={`header ss-header header--fixed${hasShadow ? " has-shadow" : ""}`}
    >
      <div className="container header-row">
        <Logo
          className="brand"
          showWordmark={false}
          size="md"
          priority
          ariaLabel="SwiftSend — Home"
          onClick={(event) => handleAnchorClick(event, { pathname: "/", hash: "home" })}
        />
        <nav className="nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={getLinkKey(item.href)}
              href={item.href}
              className="nav-pill"
              aria-label={item.ariaLabel}
              onClick={(event) => handleAnchorClick(event, item.href)}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-actions__cluster">
            {ACTION_ITEMS.map((action) =>
              action.external ? (
                <a
                  key={action.ariaLabel}
                  href={typeof action.href === "string" ? action.href : action.href.pathname ?? "/"}
                  aria-label={action.ariaLabel}
                  className="icon-btn"
                >
                  {action.icon}
                </a>
              ) : (
                <Link
                  key={action.ariaLabel}
                  href={action.href}
                  aria-label={action.ariaLabel}
                  className="icon-btn"
                  prefetch={false}
                  onClick={(event) => handleAnchorClick(event, action.href)}
                >
                  {action.icon}
                </Link>
              )
            )}
          </div>
          <Link
            href="/support"
            aria-label="Support"
            className="icon-btn icon-btn--support"
            prefetch={false}
          >
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
          </Link>
          <button type="button" className="hamburger" aria-label="Open navigation">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>,
    portalTarget
  );
}
