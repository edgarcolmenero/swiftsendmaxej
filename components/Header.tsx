// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#labs", label: "Labs" },
  { href: "#packs", label: "Packs" },
  { href: "#contact", label: "Contact" }
];

export default function Header() {
  return (
    <header data-header className="ss-header">
      <div className="container header-row">
        <Link href="#home" className="brand">
          <span className="brand-badge">SS</span>
          <span className="brand-text">SwiftSend</span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-icons">
          <span role="img" aria-label="Search" className="icon-btn">
            🔍
          </span>
          <span role="img" aria-label="Call" className="icon-btn">
            📞
          </span>
          <span role="img" aria-label="Account" className="icon-btn">
            👤
          </span>
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
