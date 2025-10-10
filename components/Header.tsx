// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Header() {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const updateShadow = () => {
      setHasShadow(window.scrollY > 8);
    };

    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  return (
    <header data-header className={`ss-header${hasShadow ? " has-shadow" : ""}`}>
      <div className="container header-row">
        <Link href="#home" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="brand-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--brand-warm)" />
                  <stop offset="100%" stopColor="var(--brand-cool)" />
                </linearGradient>
              </defs>
              <path
                d="M21.62 7.08c-1.72-1.46-4.25-2.29-6.82-1.93-3.08.42-5.57 2.43-6.24 4.92a3.1 3.1 0 0 0 2.84 3.89h4.44c.82 0 1.46.46 1.46 1.06 0 .6-.64 1.06-1.46 1.06h-5.03c-2.88 0-5.28 1.95-5.81 4.55-.7 3.43 2.13 6.41 5.7 6.41h7.02c3.54 0 6.8-2.33 7.39-5.46.46-2.44-.74-4.69-2.93-5.9l-.74-.41c-.4-.22-.48-.47-.48-.63 0-.16.08-.41.48-.63l.74-.41c2.19-1.21 3.39-3.46 2.93-5.9-.24-1.26-1.01-2.48-2.29-3.62Z"
                fill="url(#brand-mark-gradient)"
              />
            </svg>
          </span>
          <span className="brand-text">SwiftSend</span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </Link>
          ))}
          <Link href="/support" className="nav-pill nav-support">
            Support
          </Link>
        </nav>
        <div className="header-icons">
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
              <Link key={action.label} href={action.href} aria-label={action.label} className="icon-btn">
                {action.icon}
              </Link>
            )
          )}
          <button type="button" className="hamburger" aria-label="Open navigation">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
