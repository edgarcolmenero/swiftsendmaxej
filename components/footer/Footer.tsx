"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Instagram, Music, Youtube, Linkedin } from "lucide-react";

import Logo from "@/components/shared/Logo";
import { BRAND_NAME, BRAND_PLACEHOLDER_LETTER } from "@/config/site";

import styles from "./Footer.module.css";

type LinkTarget = string | { pathname: string; hash?: string };

export interface FooterLink {
  label: string;
  href: LinkTarget;
  external?: boolean;
}

export interface FooterProps {
  brandName?: string;
  brandInitial?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
  quickLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  className?: string;
}

const DEFAULT_BRAND_NAME = BRAND_NAME;
const DEFAULT_BRAND_INITIAL = BRAND_PLACEHOLDER_LETTER || "S";
const DEFAULT_TAGLINE = "Never Stay Satisfied.";
const DEFAULT_DESCRIPTION = "Building the future of digital solutions, one project at a time.";
const DEFAULT_EMAIL = "swift.send.marketing@gmail.com";
const DEFAULT_PHONE = "+1 510-519-1128";
const DEFAULT_PHONE_HREF = "tel:+15105191128";

const DEFAULT_QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Labs", href: "/#labs" },
  { label: "Packs", href: "/#packs" },
  { label: "Save", href: "/#contact" },
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
  phone = DEFAULT_PHONE,
  phoneHref = DEFAULT_PHONE_HREF,
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

    if (typeof href === "object") {
      return (
        <Link
          key={`${label}-${href.pathname ?? ""}-${href.hash ?? ""}`}
          href={href}
          className={linkClassName}
          prefetch={false}
        >
          {label}
        </Link>
      );
    }

    const isExternal = link.external ?? (/^https?:\/\//.test(href) || href.startsWith("mailto:"));

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
        <Link key={`${label}-${href}`} href={href} className={linkClassName} prefetch={false}>
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
          <Logo
            className={styles["f-logoLink"]}
            showWordmark={false}
            size="lg"
            ariaLabel="SwiftSend — Home"
            prefetch={false}
            imageSizes="44px"
          />
          {tagline ? (
            <p className={`${styles["f-tag"]} ss-text-gradient`}>{tagline}</p>
          ) : null}
          {description ? <p className={styles["f-desc"]}>{description}</p> : null}
        </section>

        <nav className={styles["footer__links"]} aria-label="Quick Links" data-animate="true">
          <h4 className={styles["f-colTitle"]}>
            <span>Quick Links</span>
            <span
              aria-hidden="true"
              className={combineClassNames(
                "swift-gradient-bar",
                styles["f-colLine"]
              )}
            />
          </h4>
          <ul className={styles["f-cols"]}>
            {quickLinks.map((link) => (
              <li
                key={`${link.label}-${
                  typeof link.href === "string"
                    ? link.href
                    : `${link.href.pathname ?? ""}-${link.href.hash ?? ""}`
                }`}
              >
                {renderLink(link)}
              </li>
            ))}
          </ul>
        </nav>

        <section className={styles["footer__contact"]} aria-label="Connect" data-animate="true">
          <h4 className={styles["f-colTitle"]}>
            <span>Connect</span>
            <span
              aria-hidden="true"
              className={combineClassNames(
                "swift-gradient-bar",
                styles["f-colLine"]
              )}
            />
          </h4>
          <ul className={styles["f-connect"]}>
            <li>
              <a
                href="https://www.instagram.com/swiftsend.inc"
                target="_blank"
                rel="noreferrer noopener"
                style={{ display: 'contents' }}
              >
                <Instagram size={28} />
                <span>@swiftsend.inc</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@swiftsendofficial"
                target="_blank"
                rel="noreferrer noopener"
                style={{ display: 'contents' }}
              >
                <Music size={28} />
                <span>@swiftsendofficial</span>
              </a>
            </li>
          </ul>

          <div className={styles["f-social"]}>
            <a
              className={styles["f-icn"]}
              aria-label="YouTube @SwiftSendOfficial"
              href="https://www.youtube.com/@SwiftSendOfficial"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Youtube size={18} />
            </a>
            <a
              className={styles["f-icn"]}
              aria-label="LinkedIn Edgar Colmenero"
              href="https://www.linkedin.com/in/edgar-colmenero-385b6125b"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Linkedin size={18} />
            </a>
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
