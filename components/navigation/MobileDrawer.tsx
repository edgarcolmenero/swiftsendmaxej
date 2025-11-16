"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import "./mobile-drawer.css";

type SectionId = "home" | "about" | "services" | "labs" | "packs" | "contact";

type NavItem = {
  href: string;
  label: string;
  section: SectionId;
  ariaLabel?: string;
  gradient?: boolean;
};

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string, section: SectionId) => void;
}

export default function MobileDrawer({
  open,
  onClose,
  navItems,
  onNavigate,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Focus management and keyboard handling
  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    // Focus the close button when drawer opens
    closeButtonRef.current?.focus();

    // Handle ESC key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (event.key === "Tab") {
        const focusableElements = drawer.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    drawer.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when drawer is open
    document.body.style.overflow = "hidden";

    return () => {
      drawer.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={drawerRef}
      className="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      onClick={handleBackdropClick}
    >
      <div className="mobile-drawer__backdrop" aria-hidden="true" />
      <div className="mobile-drawer__panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="mobile-drawer__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          <ul className="mobile-drawer__list">
            {navItems.map((item) => (
              <li key={item.section} className="mobile-drawer__item">
                <Link
                  href={item.href}
                  className={`mobile-drawer__link${item.gradient ? " mobile-drawer__link--gradient swift-gradient-text" : ""}`}
                  onClick={(event) => onNavigate(event, item.href, item.section)}
                >
                  {item.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer__contact">
          <a href="tel:510-519-1128" className="mobile-drawer__contact-item">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
                fill="currentColor"
              />
            </svg>
            <span>510-519-1128</span>
          </a>
          <a href="mailto:swift.send.marketing@gmail.com" className="mobile-drawer__contact-item">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
                fill="currentColor"
              />
            </svg>
            <span>swift.send.marketing@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
