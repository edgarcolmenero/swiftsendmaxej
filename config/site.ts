import { sectionHref } from '@/lib/utils/routing';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'labs', label: 'Labs' },
  { id: 'packs', label: 'Packs' },
  { id: 'contact', label: 'Contact' },
] as const;

export const siteConfig = {
  name: 'SwiftSend',
  shortName: 'S',
  tagline: 'Your Software. Your Stack. Your Savings.',
  description:
    'SwiftSend is a cosmic-grade product studio shipping software, automation, and growth experiments for founders who move fast.',
  navigation: sections.map((section) => ({
    label: section.label,
    href: sectionHref(section.id),
  })),
  footerLinks: sections.map((section) => ({
    label: section.label,
    href: sectionHref(section.id),
  })),
  contact: {
    email: 'build@swiftsend.com',
    phone: '+1-512-555-2048',
    instagram: 'https://instagram.com/swiftsend',
  },
} as const;

export type SiteConfig = typeof siteConfig;
