"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";

import styles from "./Footer.module.css";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterProps {
  brandName?: string;
  brandInitial?: string;
  tagline?: string;
  description?: string;
  email?: string;
  instagramHandle?: string;
  instagramHref?: string;
  quickLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  className?: string;
}

const DEFAULT_BRAND_NAME = "SwiftSend";
const DEFAULT_BRAND_INITIAL = "S";
const DEFAULT_TAGLINE = "Never Stay Satisfied.";
const DEFAULT_DESCRIPTION = "Building the future of digital solutions, one project at a time.";
const DEFAULT_EMAIL = "hello@swiftsend.dev";
const DEFAULT_INSTAGRAM_HANDLE = "@swiftsend.dev";
const DEFAULT_INSTAGRAM_HREF = "https://instagram.com/swiftsend.dev";

const DEFAULT_QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#portfolio" },
  { label: "Packs", href: "#packs" },
  { label: "Contact", href: "#contact" },
  { label: "Services", href: "#services" },
  { label: "Labs", href: "#labs" },
  { label: "About", href: "#about" },
];

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const combineClassNames = (...values: Array<string | undefined>): string =>
  values.filter(Boolean).join(" ");

const Footer = ({
  brandName = DEFAULT_BRAND_NAME,
  brandInitial: _brandInitial = DEFAULT_BRAND_INITIAL,
  tagline = DEFAULT_TAGLINE,
  description = DEFAULT_DESCRIPTION,
  email = DEFAULT_EMAIL,
  instagramHandle = DEFAULT_INSTAGRAM_HANDLE,
  instagramHref = DEFAULT_INSTAGRAM_HREF,
  quickLinks = DEFAULT_QUICK_LINKS,
  legalLinks = DEFAULT_LEGAL_LINKS,
  className,
}: FooterProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const currentYear = new Date().getFullYear();
  void _brandInitial;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    node.dataset.animReady = "true";

    const animatedElements = Array.from(
      node.querySelectorAll<HTMLElement>("[data-animate='true']")
    );

    if (animatedElements.length === 0) {
      return;
    }

    const visibleClass = styles["is-visible"];
    if (!visibleClass) {
      return;
    }

    const applyVisibility = (isVisible: boolean) => {
      animatedElements.forEach((element) => {
        if (isVisible) {
          element.classList.add(visibleClass);
        } else {
          element.classList.remove(visibleClass);
        }
      });
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    const disconnectObserver = () => {
      observer?.disconnect();
      observer = null;
    };

    const observe = () => {
      disconnectObserver();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            applyVisibility(entry.isIntersecting);
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(node);
    };

    if (mediaQuery.matches) {
      applyVisibility(true);
    } else {
      applyVisibility(false);
      observe();
    }

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disconnectObserver();
        applyVisibility(true);
      } else {
        applyVisibility(false);
        observe();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      disconnectObserver();
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  const renderLink = (link: FooterLink, linkClassName?: string) => {
    const { href, label } = link;
    const isExternal = link.external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          key={`${label}-${href}`}
          href={href}
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }

    if (href.startsWith("/")) {
      return (
        <Link key={`${label}-${href}`} href={href} className={linkClassName}>
          {label}
        </Link>
      );
    }

    return (
      <a key={`${label}-${href}`} href={href} className={linkClassName}>
        {label}
      </a>
    );
  };

  const rootClassName = combineClassNames(styles.root, className);

  return (
    <footer ref={rootRef} className={rootClassName} data-footer>
      <div className={styles.inner}>
        <section className={styles["footer__brand"]} data-animate="true">
          <span className={styles["f-logo"]} aria-hidden="true">
            <FooterHeroMark />
          </span>
          <h3 className={styles["f-name"]}>{brandName}</h3>
          {tagline ? <p className={styles["f-tag"]}>{tagline}</p> : null}
          {description ? <p className={styles["f-desc"]}>{description}</p> : null}
        </section>

        <nav className={styles["footer__links"]} aria-label="Quick Links" data-animate="true">
          <h4 className={styles["f-colTitle"]}>Quick Links</h4>
          <ul className={styles["f-cols"]}>
            {quickLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                {renderLink(link)}
              </li>
            ))}
          </ul>
        </nav>

        <section className={styles["footer__contact"]} aria-label="Connect" data-animate="true">
          <h4 className={styles["f-colTitle"]}>Connect</h4>
          <ul className={styles["f-connect"]}>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true" role="img">
                <path fill="currentColor" d="M4 4h16v16H4z" opacity="0.08" />
                <path fill="currentColor" d="M4 6l8 5 8-5v12H4z" />
                <path fill="currentColor" d="M20 6H4l8 5z" />
              </svg>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true" role="img">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                  opacity="0.08"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
              {instagramHref ? (
                <a href={instagramHref} target="_blank" rel="noopener noreferrer">
                  {instagramHandle}
                </a>
              ) : (
                <span>{instagramHandle}</span>
              )}
            </li>
          </ul>

          <div className={styles["f-social"]}>
            <a
              className={styles["f-icn"]}
              aria-label="Email"
              href={`mailto:${email}`}
            >
              <span>✉️</span>
            </a>
            {instagramHref ? (
              <a
                className={styles["f-icn"]}
                aria-label="Instagram"
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>◎</span>
              </a>
            ) : null}
          </div>
        </section>
      </div>

      <div className={styles["footer__bar"]} data-animate="true">
        <p className={styles["f-copy"]}>© {currentYear} {brandName}. All Rights Reserved.</p>
        <nav className={styles["f-legal"]} aria-label="Legal">
          {legalLinks.map((link) =>
            renderLink(link, styles["underline-seq"])
          )}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

const FooterHeroMark = () => {
  const gradientId = useId();

  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={styles["f-logoSvg"]}
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
};
