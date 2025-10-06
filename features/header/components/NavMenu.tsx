'use client';

import { MouseEventHandler } from 'react';
import { cn } from '@/lib/utils/cn';

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Labs', href: '#labs' },
  { label: 'Packs', href: '#packs' },
  { label: 'Contact', href: '#contact' },
] as const;

interface NavMenuProps {
  id?: string;
  className?: string;
  linkClassName?: string;
  ariaLabel?: string;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function NavMenu({
  id,
  className,
  linkClassName,
  ariaLabel = 'Primary',
  onLinkClick,
}: NavMenuProps) {
  return (
    <nav id={id} className={cn(className)} aria-label={ariaLabel}>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn('nav-pill', linkClassName)}
          onClick={onLinkClick}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
