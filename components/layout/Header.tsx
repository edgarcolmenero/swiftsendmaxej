"use client";

import Link from "next/link";
// @ts-ignore -- resolved via custom local react-dom typings
import * as ReactDOM from "react-dom";
import { type MouseEvent } from "react";

import Logo from "@/components/shared/Logo";
import NavMenu, {
  type HeaderNavItem,
  type HeaderSectionId,
} from "@/features/header/components/NavMenu";
import {
  type LinkTarget,
  useHeaderScroll,
} from "@/features/header/hooks/useHeaderScroll";

import styles from "./Header.module.css";

const SECTION_IDS = [
  "home",
  "about",
  "services",
  "work",
  "labs",
  "packs",
  "contact",
] as const satisfies readonly HeaderSectionId[];

type SectionId = (typeof SECTION_IDS)[number];

type ActionItem = {
  href: string;
  ariaLabel: string;
  icon: JSX.Element;
};

const NAV_ITEMS: HeaderNavItem[] = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#about", label: "About", section: "about" },
  { href: "/#services", label: "Services", section: "services" },
  { href: "/#work", label: "Work", section: "work" },
  { href: "/#labs", label: "Labs", section: "labs" },
  { href: "/#packs", label: "Packs", section: "packs" },
  {
    href: "/#contact",
    label: "Save",
    section: "contact",
    ariaLabel: "Go to contact section",
    gradient: true,
  },
];

const ACTION_ITEMS: ActionItem[] = [
  {
    href: "/account",
    ariaLabel: "Account",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.actionIcon}
      >
        <path
          d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 10c4.42 0 8 2.24 8 5v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1c0-2.76 3.58-5 8-5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/schedule",
    ariaLabel: "Schedule",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.actionIcon}
      >
        <path
          d="M7 3a1 1 0 0 1 1 1v1h8V4a1 1 0 1 1 2 0v1h.5A2.5 2.5 0 0 1 21 7.5v11A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5H6V4a1 1 0 0 1 1-1Zm12 6H5v9.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V9Zm-5 3.5a1 1 0 0 1 .58.19l2 1.5a1 1 0 0 1-1.16 1.62l-.42-.32V17a1 1 0 1 1-2 0v-2.5a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/support",
    ariaLabel: "Support",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.actionIcon}
      >
        <path
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.04 6.15c1.6 0 2.61 1.01 2.61 2.3 0 1-.52 1.74-1.4 2.25-.78.44-1.05.73-1.05 1.25v.26a.75.75 0 0 1-1.5 0v-.35c0-1.04.52-1.67 1.4-2.16.78-.44 1.05-.79 1.05-1.3 0-.48-.36-.8-1.11-.8-.63 0-1.1.26-1.52.73a.75.75 0 0 1-1.1-1.02c.65-.71 1.44-1.16 2.62-1.16Zm-.04 8.86a.94.94 0 1 1 .94-.94.94.94 0 0 1-.94.94Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Header() {
  const { headerRef, portalTarget, hasShadow, activeSection, handleAnchorClick } =
    useHeaderScroll({ sections: SECTION_IDS });

  const onAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: LinkTarget,
    sectionId?: SectionId
  ) => {
    handleAnchorClick(event, href, sectionId);
  };

  if (!portalTarget) {
    return null;
  }

  const headerClassName = hasShadow
    ? `${styles.header} ${styles.withShadow}`
    : styles.header;

  return ReactDOM.createPortal(
    <header ref={headerRef} data-header className={headerClassName}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.logo}>
            <Logo
              showWordmark={false}
              size="md"
              priority
              ariaLabel="SwiftSend — Home"
              onClick={(event) => onAnchorClick(event, "/#home", "home")}
            />
          </div>
          <NavMenu
            className={styles.navDesktop}
            items={NAV_ITEMS}
            activeSection={activeSection}
            onNavigate={(event, item) =>
              onAnchorClick(event, item.href, item.section as SectionId)
            }
          />
          <div className={styles.actions}>
            <div className={styles.actionsCluster}>
              <div className={styles.icons}>
                {ACTION_ITEMS.map((action) => (
                  <Link
                    key={action.ariaLabel}
                    href={action.href}
                    aria-label={action.ariaLabel}
                    className={styles.iconButton}
                    prefetch={false}
                  >
                    {action.icon}
                  </Link>
                ))}
              </div>
            </div>
            <button type="button" className={styles.hamburger} aria-label="Open navigation">
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </div>
      </div>
    </header>,
    portalTarget
  );
}
