import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { packs } from '@/data/packs';

const addons = ['AI Bot', 'SwiftPay Mini', 'App Shell', 'DevOps Setup'];

export function Packs() {
  return (
    <section id="packs" className="packs" aria-labelledby="packs-heading">
      <Container>
        <div className="section-heading">
          <span className="section-heading__eyebrow">Pricing</span>
          <h2 className="section-heading__title" id="packs-heading">
            Choose Your Pack
          </h2>
          <p className="section-heading__lede">
            Four product engagement models tuned to where you are in the journey. Every pack keeps ownership in your hands and
            trims the bloated agency markup.
          </p>
        </div>

        <div className="packs__grid" role="list">
          {packs.map((pack) => (
            <article
              key={pack.key}
              className="packs__card"
              data-featured={pack.featured}
              role="listitem"
              aria-labelledby={`${pack.key}-title`}
              aria-describedby={`${pack.key}-desc`}
              tabIndex={0}
            >
              {pack.featured ? <span className="packs__badge">Most Popular</span> : null}
              <h3 id={`${pack.key}-title`}>{pack.title}</h3>
              <p className="packs__price">
                {pack.price} <span className="packs__price-unit">/ {pack.unit}</span>
              </p>
              <p id={`${pack.key}-desc`}>{pack.description}</p>
              <ul className="packs__bullets">
                {pack.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link href="#contact" className="hero__action hero__action--ghost" aria-label={`Start the ${pack.title} pack`}>
                Start {pack.title}
                <span className="hero__action-underline" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="packs__addons">
          <h3>Add-ons</h3>
          <div className="packs__addons-grid">
            {addons.map((addon) => (
              <div key={addon} className="packs__addon" tabIndex={0}>
                {addon}
              </div>
            ))}
          </div>
          <div className="hero__actions" style={{ marginTop: '1.5rem' }}>
            <Link href="#contact" className="hero__action hero__action--primary" aria-label="Discuss add-ons with SwiftSend">
              Build a Custom Pack
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h7.2L7.6 5.4 8.6 4l4.4 4-4.4 4-1-1.4L10.2 8H3z" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
