"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#labs", label: "Labs" },
  { href: "#packs", label: "Packs" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const HEADER_FADE_MIN = 120;
    const HEADER_FADE_MAX = 220;
    const HEADER_FADE_THRESHOLD = 220;
    const SAFE = Math.min(Math.max(HEADER_FADE_THRESHOLD, HEADER_FADE_MIN), HEADER_FADE_MAX);

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y <= HEADER_FADE_MIN) {
        el.classList.remove("header-fade");
        return;
      }
      el.classList.toggle("header-fade", y > SAFE);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const setActive = () => {
      const hash = window.location.hash || "#home";
      document.querySelectorAll<HTMLAnchorElement>(".nav-pill").forEach((el) => el.classList.remove("is-active"));
      const target = document.querySelector<HTMLAnchorElement>(`.nav-pill[href="${hash}"]`);
      if (target) target.classList.add("is-active");
    };

    setActive();
    window.addEventListener("hashchange", setActive);
    return () => window.removeEventListener("hashchange", setActive);
  }, []);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
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
            <a key={link.href} href={link.href} className="nav-pill">
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="header-icons">
          <button className="icon-btn" aria-label="Search">
            {SearchIcon}
          </button>
          <a className="icon-btn" aria-label="Call" href="tel:+1">
            {PhoneIcon}
          </a>
          <button className="icon-btn" aria-label="Account">
            {UserIcon}
          </button>
          <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobileMenu"
            onClick={() => setOpen(true)}
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
        hidden={!open}
        onClick={handleOverlayClick}
      >
        <div className="overlay-panel">
          <div className="overlay-top">
            <span className="brand-badge" aria-hidden="true">
              S
            </span>
            <button className="overlay-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <nav className="overlay-nav" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="overlay-icons">
            <button className="icon-btn" aria-label="Search (mobile)">
              {SearchIcon}
            </button>
            <a className="icon-btn" aria-label="Call (mobile)" href="tel:+1">
              {PhoneIcon}
            </a>
            <button className="icon-btn" aria-label="Account (mobile)">
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
