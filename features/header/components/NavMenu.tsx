'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/cn';

interface NavMenuProps {
  onNavigate?: () => void;
}

export function NavMenu({ onNavigate }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overlay = overlayRef.current;
    const focusable = overlay?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && focusable && focusable.length > 0) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setOpen(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div className="header__mobile">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="header__icon-btn"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visually-hidden">Toggle navigation</span>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id="mobile-nav"
        ref={overlayRef}
        className={cn('header__mobile-overlay', open ? 'is-open' : undefined)}
        role="dialog"
        aria-modal="true"
      >
        <div className="header__mobile-inner" role="navigation" aria-label="Mobile">
          <button type="button" className="header__mobile-close" onClick={() => setOpen(false)}>
            <span className="visually-hidden">Close navigation</span>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4l12 12m0-12L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="header__mobile-links">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="header__mobile-icons">
            <Link href="#search" aria-label="Search SwiftSend" onClick={closeMenu}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M10.5 4a6.5 6.5 0 015.18 10.44l2.68 2.68-1.06 1.06-2.68-2.68A6.5 6.5 0 1110.5 4zm0 1.5a5 5 0 100 10 5 5 0 000-10z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <a href="tel:+15125552048" aria-label="Call SwiftSend" onClick={closeMenu}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M8.9 4.18l1.73 3.62-1.68 1.69a13.8 13.8 0 006.65 6.65l1.69-1.68 3.62 1.73-.01.05c-.39 1.45-1.78 2.46-3.29 2.31-4.7-.46-8.68-4.44-9.14-9.14-.15-1.51.86-2.9 2.31-3.29l.12-.03z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <Link href="#account" aria-label="Account" onClick={closeMenu}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 3.5a3.5 3.5 0 013.5 3.5A3.5 3.5 0 1111 3.5zm0 8.25c3.22 0 6.5 1.6 6.5 4.25v1.5h-13v-1.5c0-2.65 3.28-4.25 6.5-4.25z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
