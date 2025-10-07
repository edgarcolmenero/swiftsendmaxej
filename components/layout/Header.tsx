"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, MouseEventHandler } from "react";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#labs", label: "Labs" },
  { href: "#packs", label: "Packs" },
  { href: "#contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef<string>("");
  const hasOpenedOnce = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const headerElement = headerRef.current;
    if (!headerElement) {
      return;
    }

    heroRef.current =
      document.querySelector<HTMLElement>("[data-hero]") ??
      document.querySelector<HTMLElement>("#home");

    const HEADER_FADE_MIN = 120;
    const HEADER_FADE_MAX = 220;
    const HEADER_FADE_THRESHOLD = 220;
    const SAFE = Math.min(
      Math.max(HEADER_FADE_THRESHOLD, HEADER_FADE_MIN),
      HEADER_FADE_MAX
    );

    let frame = 0;

    const updateHeaderFade = () => {
      frame = 0;
      const y = window.scrollY || document.documentElement.scrollTop;
      let shouldFade = y > SAFE;

      if (!heroRef.current) {
        heroRef.current =
          document.querySelector<HTMLElement>("[data-hero]") ??
          document.querySelector<HTMLElement>("#home");
      }

      const heroElement = heroRef.current;
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        if (heroRect.bottom > 72) {
          shouldFade = false;
        }
      }

      if (y <= HEADER_FADE_MIN) {
        shouldFade = false;
      }

      headerElement.classList.toggle("header-fade", shouldFade);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateHeaderFade);
    };

    updateHeaderFade();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      heroRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const setActive = () => {
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      const hash = window.location.hash || "#home";
      const navLinks = headerElement.querySelectorAll<HTMLAnchorElement>(".nav-pill");
      navLinks.forEach((anchor) => {
        anchor.classList.remove("is-active");
        anchor.removeAttribute("aria-current");
        if (anchor.getAttribute("href") === hash) {
          anchor.classList.add("is-active");
          anchor.setAttribute("aria-current", "page");
        }
      });
    };

    setActive();
    window.addEventListener("hashchange", setActive);
    return () => window.removeEventListener("hashchange", setActive);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const body = document.body;
    const overlayElement = overlayRef.current;
    if (!body || !overlayElement) {
      return;
    }

    if (open) {
      previousOverflow.current = body.style.overflow;
      body.style.overflow = "hidden";
      overlayElement.hidden = false;
      overlayElement.removeAttribute("hidden");
      hasOpenedOnce.current = true;

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      });
    } else {
      overlayElement.hidden = true;
      overlayElement.setAttribute("hidden", "");
      body.style.overflow = previousOverflow.current;
      if (hasOpenedOnce.current) {
        requestAnimationFrame(() => {
          hamburgerRef.current?.focus({ preventScroll: true });
        });
      }
    }

    return () => {
      body.style.overflow = previousOverflow.current;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeEl = document.activeElement;
        if (!activeEl) return;
        const overlayElement = overlayRef.current;
        if (overlayElement && overlayElement.contains(activeEl)) {
          event.preventDefault();
          setOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const openMenu = useCallback(() => {
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  };

  const handleOverlayLinkClick: MouseEventHandler<HTMLAnchorElement> = () => {
    closeMenu();
  };

  return (
    <header ref={headerRef} className="ss-header" data-header>
      <div className="container header-row">
        <a href="#home" className="brand" aria-label="SwiftSend">
          <span className="brand-badge">S</span>
          <span className="brand-text">SwiftSend</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-pill${link.href === "#home" ? " is-active" : ""}`}
              aria-current={link.href === "#home" ? "page" : undefined}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="header-icons">
          <button type="button" className="icon-btn" aria-label="Search">
            {SearchIcon}
          </button>
          <a className="icon-btn" aria-label="Call" href="tel:+1">
            {PhoneIcon}
          </a>
          <button type="button" className="icon-btn" aria-label="Account">
            {UserIcon}
          </button>
          <button
            ref={hamburgerRef}
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobileMenu"
            type="button"
            onClick={openMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobileMenu"
        className="mobile-overlay"
        hidden
        ref={overlayRef}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="SwiftSend navigation"
      >
        <div className="overlay-panel">
          <div className="overlay-top">
            <span className="brand-badge" aria-hidden="true">
              S
            </span>
            <button
              ref={closeButtonRef}
              className="overlay-close"
              aria-label="Close menu"
              type="button"
              onClick={closeMenu}
            >
              ✕
            </button>
          </div>

          <nav className="overlay-nav" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={handleOverlayLinkClick}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="overlay-icons">
            <button type="button" className="icon-btn" aria-label="Search">
              {SearchIcon}
            </button>
            <a className="icon-btn" aria-label="Call" href="tel:+1">
              {PhoneIcon}
            </a>
            <button type="button" className="icon-btn" aria-label="Account">
              {UserIcon}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

const SearchIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PhoneIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.11 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.2a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
  </svg>
);

const UserIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 21a8 8 0 1 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
