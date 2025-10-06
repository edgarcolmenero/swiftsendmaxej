import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { StarfieldCanvas } from '@/features/starfield/StarfieldCanvas';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <StarfieldCanvas className="hero__starfield" />
      <Container className="hero__inner">
        <span className="hero__badge">Founder-first product studio</span>
        <h1 id="hero-heading" className="hero__title">
          <span className="grad-word">Your</span> Software.
          <br />
          <span className="grad-word">Your</span> Stack.
          <br />
          <span className="grad-word">Your</span> Savings.
        </h1>
        <p className="hero__lede">
          SwiftSend powers ambitious teams with full-stack builds, automation, and growth systems that plug directly into the
          stack you already trust. We meet you where you ship, then push every product milestone forward faster than the
          agency status quo.
        </p>
        <div className="hero__actions">
          <Link href="#contact" className="hero__action hero__action--primary" aria-label="Start a build with SwiftSend">
            Start a Build
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h7.2L7.6 5.4 8.6 4l4.4 4-4.4 4-1-1.4L10.2 8H3z" fill="currentColor" />
            </svg>
          </Link>
          <Link href="#work" className="hero__action hero__action--ghost" aria-label="See SwiftSend work">
            See Our Work
            <span className="hero__action-underline" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
