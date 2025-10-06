'use client';

import { FocusEvent as ReactFocusEvent, MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { Container } from './Container';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Packs', href: '#packs' },
  { label: 'Contact', href: '#contact' },
  { label: 'Services', href: '#services' },
  { label: 'Labs', href: '#labs' },
  { label: 'About', href: '#about' },
] as const;

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const footer = footerRef.current;
    if (!footer) {
      return;
    }

    const targets = Array.from(
      footer.querySelectorAll<HTMLElement>('.footer__inner > *, .footer__bar'),
    );

    if (targets.length === 0) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const revealAll = () => {
      targets.forEach((target) => target.classList.add('is-visible'));
    };

    const resetTargets = () => {
      targets.forEach((target) => target.classList.remove('is-visible'));
    };

    const disconnectObserver = () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };

    const enableReducedMotion = () => {
      disconnectObserver();
      footer.removeAttribute('data-anim-ready');
      revealAll();
    };

    const enableObserver = () => {
      footer.setAttribute('data-anim-ready', '');
      resetTargets();
      disconnectObserver();

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
      );

      targets.forEach((target) => observer.observe(target));
      observerRef.current = observer;
    };

    const setup = () => {
      if (mediaQuery.matches) {
        enableReducedMotion();
      } else {
        enableObserver();
      }
    };

    setup();

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        enableReducedMotion();
      } else {
        enableObserver();
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    const handlePageHide = () => {
      disconnectObserver();
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('pagehide', handlePageHide);
      disconnectObserver();
    };
  }, []);

  const emailHref = `mailto:${siteConfig.contact.email}`;

  const handleSocialEnter = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.classList.add('is-hover');
  };

  const handleSocialLeave = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.classList.remove('is-hover');
  };

  const handleSocialFocus = (event: ReactFocusEvent<HTMLAnchorElement>) => {
    event.currentTarget.classList.add('is-hover');
  };

  const handleSocialBlur = (event: ReactFocusEvent<HTMLAnchorElement>) => {
    event.currentTarget.classList.remove('is-hover');
  };

  return (
    <footer ref={footerRef} className="footer" data-footer data-anim-ready>
      <Container>
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="f-logo" aria-hidden="true">
              <span className="f-logo__grad">S</span>
            </div>
            <div className="f-name">SwiftSend</div>
            <div className="f-tag">Never Stay Satisfied.</div>
            <p className="f-desc">{siteConfig.description}</p>
          </div>

          <div className="footer__links">
            <div className="f-colTitle">Quick Links</div>
            <div className="f-cols">
              {QUICK_LINKS.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__contact">
            <div className="f-colTitle">Connect</div>
            <ul className="f-connect">
              <li>
                <a href={emailHref}>
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect
                      x="3"
                      y="5"
                      width="16"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M4.6 6.5l6.4 4.8 6.4-4.8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect
                      x="4"
                      y="4"
                      width="14"
                      height="14"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="15.2" cy="6.8" r="0.8" fill="currentColor" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>

            <div className="f-social" role="group" aria-label="SwiftSend social links">
              <a
                className="f-icn"
                href={emailHref}
                aria-label="Email SwiftSend"
                onMouseEnter={handleSocialEnter}
                onMouseLeave={handleSocialLeave}
                onFocus={handleSocialFocus}
                onBlur={handleSocialBlur}
              >
                <span aria-hidden="true">✉</span>
              </a>
              <a
                className="f-icn"
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="SwiftSend on Instagram"
                onMouseEnter={handleSocialEnter}
                onMouseLeave={handleSocialLeave}
                onFocus={handleSocialFocus}
                onBlur={handleSocialBlur}
              >
                <span aria-hidden="true">✦</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <div className="f-copy">© 2025 SwiftSend. All Rights Reserved.</div>
          <div className="f-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
