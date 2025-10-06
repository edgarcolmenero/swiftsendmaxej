import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <Container className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-mark" aria-hidden="true">
              <span className="header__brand-badge">{siteConfig.shortName}</span>
            </div>
            <div>
              <h2 className="footer__brand-name">{siteConfig.name}</h2>
              <p className="footer__brand-tagline">{siteConfig.tagline}</p>
            </div>
            <p className="footer__brand-copy">{siteConfig.description}</p>
          </div>

          <div className="footer__links">
            <h3>Quick Links</h3>
            <nav aria-label="Footer">
              <ul>
                {siteConfig.footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer__connect">
            <h3>Connect</h3>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <div className="footer__social" role="group" aria-label="Social links">
              <a
                href={siteConfig.contact.instagram}
                aria-label="SwiftSend on Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M6 2h6a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4V6a4 4 0 014-4zm6 1.5H6a2.5 2.5 0 00-2.5 2.5v6A2.5 2.5 0 006 14.5h6a2.5 2.5 0 002.5-2.5V6A2.5 2.5 0 0012 3.5zm-3 2.3a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zm0 1.5a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zm3.4-.9a.8.8 0 110 1.6.8.8 0 010-1.6z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email SwiftSend">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2 4h14a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1zm13.5 1.5L9 10 2.5 5.5V5l6.5 4.5L15.5 5v.5z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <span>© 2025 SwiftSend</span>
          <div className="footer__bar-links">
            <Link href="#privacy">Privacy</Link>
            <Link href="#terms">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
