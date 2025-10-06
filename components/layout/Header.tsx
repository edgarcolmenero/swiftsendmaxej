'use client';

import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Container } from './Container';
import { NavMenu } from '@/features/header/components/NavMenu';
import { useHeaderScroll } from '@/features/header/hooks/useHeaderScroll';

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const focusReturnRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { setActiveFromHash, setupScrollSpy } = useHeaderScroll({ headerRef });

  const closeMenu = useCallback((options?: { returnFocus?: boolean }) => {
    setMenuOpen((open) => {
      if (open && options?.returnFocus !== false) {
        focusReturnRef.current = true;
      }

      return false;
    });
  }, []);

  const handleNavClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      const targetHash = event.currentTarget.getAttribute('href') || undefined;
      closeMenu();
      setActiveFromHash(targetHash);
    },
    [closeMenu, setActiveFromHash],
  );

  useEffect(() => {
    setActiveFromHash();
    if (typeof window === 'undefined') {
      return;
    }

    const handleHashChange = () => setActiveFromHash();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setActiveFromHash]);

  useEffect(() => {
    const teardown = setupScrollSpy();
    return () => {
      teardown();
    };
  }, [setupScrollSpy]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) {
      return;
    }

    overlay.hidden = !menuOpen;

    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      }

      if (event.key === 'Tab' && focusable.length > 0) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    const handleFocusTrap = (event: FocusEvent) => {
      if (!panel.contains(event.target as Node)) {
        first?.focus();
      }
    };

    const handleOverlayClick = (event: globalThis.MouseEvent) => {
      if (event.target === overlay) {
        closeMenu();
      }
    };

    const handlePageHide = () => {
      closeMenu({ returnFocus: false });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focus', handleFocusTrap, true);
    overlay.addEventListener('click', handleOverlayClick);
    window.addEventListener('pagehide', handlePageHide);

    first?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focus', handleFocusTrap, true);
      overlay.removeEventListener('click', handleOverlayClick);
      window.removeEventListener('pagehide', handlePageHide);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!menuOpen && focusReturnRef.current) {
      focusReturnRef.current = false;
      window.requestAnimationFrame(() => {
        hamburgerRef.current?.focus();
      });
    }
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((value) => !value);
  }, []);

  const handleOverlayIconClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <header ref={headerRef} className="ss-header" data-header>
      <Container>
        <div className="header-row">
          <a href="#home" className="brand" aria-label="SwiftSend">
            <span className="brand-badge" aria-hidden="true">
              S
            </span>
            <span className="brand-text">SwiftSend</span>
          </a>

          <NavMenu className="nav-desktop" onLinkClick={handleNavClick} />

          <div className="header-icons" role="group" aria-label="Quick actions">
            <button type="button" className="icon-btn" aria-label="Search">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="M14.5 14.5L19 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <a href="tel:+1" className="icon-btn" aria-label="Call">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M6.5 4.2l2 4.1-1.6 1.6c1.1 2.4 2.9 4.2 5.3 5.3l1.6-1.6 4.1 2c-.2 1.2-1.1 2.2-2.3 2.4-4.6-.6-8.6-4.6-9.2-9.2.2-1.2 1.1-2.1 2.1-2.6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button type="button" className="icon-btn" aria-label="Account">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M5.6 17.4c.8-2.6 2.9-4 5.4-4s4.6 1.4 5.4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <button
            ref={hamburgerRef}
            type="button"
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={toggleMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </Container>

      <div
        id="mobileMenu"
        ref={overlayRef}
        className="mobile-overlay"
        hidden
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div ref={panelRef} className="overlay-panel">
          <div className="overlay-top">
            <span className="brand-badge" aria-hidden="true">
              S
            </span>
            <button type="button" className="overlay-close" aria-label="Close menu" onClick={() => closeMenu()}>
              ✕
            </button>
          </div>

          <NavMenu className="overlay-nav" ariaLabel="Mobile" onLinkClick={handleNavClick} />

          <div className="overlay-icons" role="group" aria-label="Quick actions">
            <button type="button" className="icon-btn" aria-label="Search" onClick={handleOverlayIconClick}>
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M15.5 15.5L20.5 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <a href="tel:+1" className="icon-btn" aria-label="Call" onClick={handleOverlayIconClick}>
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 4.4l2.2 4.5-1.7 1.7c1.3 2.7 3.2 4.6 6 6l1.7-1.7 4.5 2.2c-.3 1.3-1.2 2.3-2.5 2.5-5-.6-9.4-5-10-10 .2-1.3 1.1-2.2 2.3-2.7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button type="button" className="icon-btn" aria-label="Account" onClick={handleOverlayIconClick}>
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8.6" r="3.4" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M6 18.2c.9-2.7 3.1-4.2 6-4.2s5.1 1.5 6 4.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
