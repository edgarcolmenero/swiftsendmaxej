'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Container } from './Container';
import { useHeaderScroll } from '@/features/header/hooks/useHeaderScroll';
import { NavMenu } from '@/features/header/components/NavMenu';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const hasShadow = useHeaderScroll(10);

  return (
    <header className={cn('header', hasShadow ? 'has-shadow' : undefined)}>
      <Container className="header__inner">
        <Link href="#home" className="header__brand">
          <span className="header__brand-badge">{siteConfig.shortName}</span>
          <span className="header__brand-text">{siteConfig.name}</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="header__nav-link">
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header__icons" role="group" aria-label="Quick actions">
          <Link href="#search" aria-label="Search SwiftSend" className="header__icon-btn">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9 3a6 6 0 014.8 9.6l2.2 2.2-1 1-2.2-2.2A6 6 0 119 3zm0 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <a href="tel:+15125552048" aria-label="Call SwiftSend" className="header__icon-btn">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.9 3.3l1.6 3.4-1.6 1.6a12.4 12.4 0 005.9 5.9l1.6-1.6 3.4 1.6-.01.04c-.36 1.34-1.64 2.27-3.03 2.14-4.3-.42-7.95-4.07-8.37-8.37-.13-1.39.8-2.67 2.14-3.03L7.9 3.3z"
                fill="currentColor"
              />
            </svg>
          </a>
          <Link href="#account" aria-label="Account" className="header__icon-btn">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3a3 3 0 013 3 3 3 0 11-6 0 3 3 0 013-3zm0 7.5c2.75 0 5.5 1.37 5.5 3.65V16h-11v-1.85c0-2.28 2.75-3.65 5.5-3.65z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>

        <NavMenu />
      </Container>
    </header>
  );
}
