// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
"use client";

import Link from "next/link";
// @ts-ignore -- resolved via custom local react-dom typings
import * as ReactDOM from "react-dom";
import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState
} from "react";

import {
  BRAND_LOGO_RADIUS,
  BRAND_LOGO_SOURCES,
  BRAND_NAME,
  BRAND_PLACEHOLDER_LETTER
} from "@/config/site";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#labs", label: "Labs" },
  { href: "#packs", label: "Packs" },
  { href: "#contact", label: "Contact" }
];

type ActionItem = {
  href: string;
  label: string;
  icon: JSX.Element;
  external?: boolean;
};

const ACTION_ITEMS: ActionItem[] = [
  {
    href: "mailto:hello@swiftsend.com",
    label: "Email",
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
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.5-1a1 1 0 0 0-1 1v.32l6.17 4.05a.5.5 0 0 0 .66 0L19.5 6.82V6.5a1 1 0 0 0-1-1h-11Zm11.73 3.2L13 12.18a2.5 2.5 0 0 1-3 0L5.77 8.7V17.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8.7Z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    href: "tel:+1234567890",
    label: "Call",
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
    label: "Account",
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
    label: "Schedule",
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

type BrandMarkProps = {
  size?: "sm" | "lg";
  tileClassName?: string;
  imageClassName?: string;
};

const LOGO_SOURCES = [...BRAND_LOGO_SOURCES];
const PLACEHOLDER_LETTER = BRAND_PLACEHOLDER_LETTER || "S";

function BrandMark({
  size = "sm",
  tileClassName,
  imageClassName
}: BrandMarkProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const activeSrc = sourceIndex < LOGO_SOURCES.length ? LOGO_SOURCES[sourceIndex] : null;
  const fontSize = size === "lg" ? 24 : 18;

  useEffect(() => {
    setIsVisible(false);
  }, [activeSrc]);

  const handleError = () => {
    setSourceIndex((previous) => {
      const nextIndex = previous + 1;
      return nextIndex < LOGO_SOURCES.length ? nextIndex : LOGO_SOURCES.length;
    });
  };

  return (
    <>
      <span
        className={`dynamic-brand-mark__tile${tileClassName ? ` ${tileClassName}` : ""}`}
        aria-hidden="true"
        style={{ fontSize: `${fontSize}px` }}
      >
        {PLACEHOLDER_LETTER}
      </span>
      {activeSrc ? (
        <img
          src={activeSrc}
          alt=""
          aria-hidden="true"
          className={`dynamic-brand-mark__image${imageClassName ? ` ${imageClassName}` : ""}${
            isVisible ? " is-visible" : ""
          }`}
          onLoad={() => setIsVisible(true)}
          onError={handleError}
        />
      ) : null}
      <style jsx>{`
        .dynamic-brand-mark__tile {
          position: relative;
          z-index: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: var(--logo-radius);
          background: linear-gradient(45deg, var(--brand-warm), var(--brand-cool));
          color: #fff;
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1;
          user-select: none;
          transition: transform 150ms var(--ease), opacity 200ms var(--ease);
        }

        .dynamic-brand-mark__image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: var(--logo-radius);
          object-fit: contain;
          opacity: 0;
          transition: opacity 180ms var(--ease);
        }

        .dynamic-brand-mark__image.is-visible {
          opacity: 1;
        }

        :global(.brand:hover) .dynamic-brand-mark__tile,
        :global(.brand:focus-visible) .dynamic-brand-mark__tile {
          transform: translateY(-1.5px);
        }
      `}</style>
    </>
  );
}

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

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetOffset = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    const destination = Math.max(targetOffset, 0);

    window.scrollTo({
      top: destination,
      behavior: prefersReducedMotion ? "auto" : "smooth"
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
        <Link
          href="#home"
          className="brand"
          aria-label={BRAND_NAME}
          style={{ minHeight: "44px" }}
          onClick={(event) => handleAnchorClick(event, "#home")}
        >
          <span
            className="brand-mark"
            aria-hidden="true"
            style={{
              position: "relative",
              width: "32px",
              height: "32px",
              flexShrink: 0,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "var(--logo-radius)",
              "--logo-radius": BRAND_LOGO_RADIUS
            } as CSSProperties}
          >
            <BrandMark />
          </span>
          <span className="brand-text">{BRAND_NAME}</span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-pill"
              onClick={(event) => handleAnchorClick(event, item.href)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/support" className="nav-pill nav-support">
            Support
          </Link>
        </nav>
        <div className="header-actions">
          <div className="header-actions__cluster">
            {ACTION_ITEMS.map((action) =>
              action.external ? (
                <a
                  key={action.label}
                  href={action.href}
                  aria-label={action.label}
                  className="icon-btn"
                >
                  {action.icon}
                </a>
              ) : (
                <Link
                  key={action.label}
                  href={action.href}
                  aria-label={action.label}
                  className="icon-btn"
                >
                  {action.icon}
                </Link>
              )
            )}
          </div>
          <Link href="/support" aria-label="Support" className="icon-btn icon-btn--support">
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
