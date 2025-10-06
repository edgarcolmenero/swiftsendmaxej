import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { siteMetadata } from '@/lib/seo/metadata';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import '@/styles/tokens.css';
import '@/styles/animations.css';
import '@/styles/globals.css';

export const metadata: Metadata = siteMetadata;

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
