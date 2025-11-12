"use client";

import Link from "next/link";
import styles from "./NavMenu.module.css";

export type HeaderSectionId = string;

export type HeaderNavItem = {
  href: string;
  label: string;
  section: HeaderSectionId;
  ariaLabel?: string;
  gradient?: boolean;
};

export interface NavMenuProps {
  items: readonly HeaderNavItem[];
  activeSection: HeaderSectionId | null;
  className?: string;
}

export default function NavMenu({
  items,
  activeSection,
  className,
}: NavMenuProps) {
  const navClassName = className
    ? `${styles.nav} ${className}`
    : styles.nav;

  return (
    <nav className={navClassName} aria-label="Primary">
      <ul className={styles.list} role="list">
        {items.map((item) => {
          const isActive = activeSection === item.section;
          const linkClasses = [styles.link];
          if (isActive) {
            linkClasses.push(styles.linkActive);
          }

          const labelClasses = [styles.label];
          if (item.gradient) {
            labelClasses.push(styles.labelGradient);
          }

          const underlineClasses = [styles.underline];
          if (isActive) {
            underlineClasses.push(styles.underlineActive);
          }

          return (
            <li key={item.section} className={styles.item}>
              <Link
                href={item.href}
                className={linkClasses.join(" ")}
                aria-label={item.ariaLabel}
                aria-current={isActive ? "true" : undefined}
                prefetch={false}
              >
                <span className={labelClasses.join(" ")}>
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className={underlineClasses.join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
