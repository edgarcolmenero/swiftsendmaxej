// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
// TODO: consolidate with components/Header.tsx placeholder before production launch
"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import MobileMenu, { type MobileMenuItem } from "../navigation/MobileMenu";

type NavLink = MobileMenuItem;

const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  {
    href: "#about",
    label: "About",
    children: [
      { href: "#about", label: "Overview" },
      { href: "#labs", label: "Labs" }
    ]
  },
  {
    href: "#services",
    label: "Services",
    children: [
      { href: "#services", label: "What We Build" },
      { href: "#portfolio", label: "Work" }
    ]
  },
  { href: "#portfolio", label: "Work" },
  { href: "#labs", label: "Labs" },
  {
    href: "#packs",
    label: "Packs",
    children: [
      { href: "#packs", label: "Packages" },
      { href: "#contact", label: "Get a Quote" }
    ]
  },
  { href: "#contact", label: "Contact" }
];

const EMAIL_ADDRESS = "hello@swiftsend.dev";
const SUPPORT_EMAIL = "support@swiftsend.dev";
const PHONE_NUMBER = "+1234567890";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
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
    if (!body) {
      return;
    }

    if (open) {
      previousOverflow.current = body.style.overflow;
      body.style.overflow = "hidden";
      hasOpenedOnce.current = true;
    } else {
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
        event.preventDefault();
        setOpen(false);
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

  return (
    <header ref={headerRef} className="ss-header" data-header>
      <div className="container header-row">
        <a href="#home" className="brand" aria-label="SwiftSend">
          <span className="brand-mark" aria-hidden="true">
            <HeroMark size={32} />
          </span>
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
          <a className="icon-btn" aria-label="Email" href={`mailto:${EMAIL_ADDRESS}`}>
            <MailIcon />
          </a>
          <a className="icon-btn" aria-label="Call" href={`tel:${PHONE_NUMBER}`}>
            <PhoneIcon />
          </a>
          <button type="button" className="icon-btn" aria-label="Account">
            <UserIcon />
          </button>
          <a className="icon-btn" aria-label="Schedule" href="#contact">
            <CalendarIcon />
          </a>
          <a
            className="icon-btn icon-btn--support"
            aria-label="Support"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            <SupportIcon />
          </a>
          <button
            ref={hamburgerRef}
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobileNavigation"
            type="button"
            onClick={openMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu
        brandMark={<HeroMark size={44} />}
        id="mobileNavigation"
        items={NAV_LINKS}
        open={open}
        onClose={closeMenu}
        onNavigate={closeMenu}
      />
    </header>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-glyph"
    >
      <path
        d="M4.5 5h15a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11A1.5 1.5 0 0 1 4.5 5Zm.75 2.24v9.01h13.5V7.24l-6.46 4.31a1.5 1.5 0 0 1-1.58 0Z"
        fill="currentColor"
      />
      <path d="m12 10.72 7.5-5.03H4.5Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-glyph"
    >
      <path
        d="M7.65 3.5H9.2a1.8 1.8 0 0 1 1.77 1.44l.4 1.92a1.8 1.8 0 0 1-.44 1.58l-1.07 1.12c1.44 2.63 3.56 4.75 6.19 6.19l1.12-1.07a1.8 1.8 0 0 1 1.58-.44l1.92.4A1.8 1.8 0 0 1 22 16.63v1.55A2.32 2.32 0 0 1 19.51 20 16.51 16.51 0 0 1 4 4.49 2.32 2.32 0 0 1 6.48 2h1.17Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-glyph"
    >
      <path
        d="M12 12.5a4.75 4.75 0 1 1 4.75-4.75A4.75 4.75 0 0 1 12 12.5Zm0-7a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 12 5.5Zm0 10c4.24 0 7.75 2.66 7.75 5.75a1.25 1.25 0 0 1-2.5 0c0-1.79-2.27-3.25-5.25-3.25s-5.25 1.46-5.25 3.25a1.25 1.25 0 0 1-2.5 0c0-3.09 3.51-5.75 7.75-5.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-glyph"
    >
      <path
        d="M7 3a1 1 0 0 1 2 0v1h6V3a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 21 6.5v12A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-12A2.5 2.5 0 0 1 5.5 4H7Zm11 6H6v9.5c0 .55.45 1 1 1h10c.55 0 1-.45 1-1Z"
        fill="currentColor"
      />
      <path d="M6 10h12V8.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-glyph"
    >
      <path
        d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2Zm0 5.25A3.25 3.25 0 0 0 8.75 10a1.25 1.25 0 0 0 2.5 0 0.75 0.75 0 0 1 1.5 0c0 .42-.2.68-.93 1.1-.94.52-1.82 1.25-1.82 2.64v.31a1.25 1.25 0 0 0 2.5 0v-.21c0-.41.12-.54.8-.92 1.1-.61 2.45-1.46 2.45-3.12A3.25 3.25 0 0 0 12 7.25Zm0 8.45a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeroMark({ size = 32 }: { size?: number }) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="brand-mark__svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="18%" y1="82%" x2="82%" y2="18%">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="55%" stopColor="#ff7a3f" />
          <stop offset="100%" stopColor="#3a7bff" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="18" fill={`url(#${gradientId})`} />
      <path
        d="M42.6 19.2c0-5.66-5.56-9.4-12.6-9.4-7.74 0-13.56 4.43-13.56 10.68 0 4.58 3.26 7.68 9.4 9.57l6.26 1.95c3.84 1.2 5.52 2.6 5.52 4.8 0 3.1-3.42 5.2-8.64 5.2-5.06 0-8.48-2.17-8.48-5.37 0-1.54.86-2.96 2.48-4.12l-4.04-3.45c-2.7 1.83-4.28 4.56-4.28 7.66 0 6.38 6.38 10.77 14.44 10.77 9.32 0 15.36-4.95 15.36-11.52 0-5.62-3.74-9.35-10.52-11.36l-5.68-1.75c-3.22-.96-4.78-2.16-4.78-3.78 0-2.26 2.84-3.77 6.94-3.77 4.12 0 6.86 1.66 6.86 4.08 0 1.46-.72 2.78-2.07 3.74l3.66 3.3c2.42-1.86 3.94-4.38 3.94-7.35Z"
        fill="#ffffff"
      />
    </svg>
  );
}
