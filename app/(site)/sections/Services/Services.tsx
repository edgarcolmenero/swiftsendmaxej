import { Container } from '@/components/layout/Container';
import { services } from '@/data/services';

export function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-heading">
      <Container>
        <div className="section-heading">
          <span className="section-heading__eyebrow">Capabilities</span>
          <h2 className="section-heading__title" id="services-heading">
            What We Build
          </h2>
          <p className="section-heading__lede">
            Every engagement is a tightly scoped, velocity-first build. We embed with your crew, ship with your stack, and make
            sure the momentum sticks after launch.
          </p>
        </div>

        <div className="services__grid" role="list">
          {services.map((service) => (
            <article key={service.key} className="services__card" role="listitem" tabIndex={0}>
              <div className="services__icon" aria-hidden="true">
                {getServiceIcon(service.key)}
              </div>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__copy">{service.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function getServiceIcon(key: string) {
  switch (key) {
    case 'fullstack':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="28" height="6" rx="2" fill="url(#fs-a)" />
          <rect x="4" y="16" width="16" height="6" rx="2" fill="url(#fs-b)" />
          <rect x="4" y="26" width="22" height="6" rx="2" fill="url(#fs-c)" />
          <defs>
            <linearGradient id="fs-a" x1="4" y1="6" x2="32" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff7b39" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
            <linearGradient id="fs-b" x1="4" y1="16" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd66b" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
            <linearGradient id="fs-c" x1="4" y1="26" x2="26" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#54f7ce" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'data':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12c0-3.3 5.4-6 12-6s12 2.7 12 6-5.4 6-12 6-12-2.7-12-6z" fill="url(#data-a)" />
          <path d="M6 18c0 3.3 5.4 6 12 6s12-2.7 12-6v6c0 3.3-5.4 6-12 6S6 27.3 6 24v-6z" fill="url(#data-b)" />
          <defs>
            <linearGradient id="data-a" x1="6" y1="6" x2="30" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff7b39" />
              <stop offset="1" stopColor="#ffd66b" />
            </linearGradient>
            <linearGradient id="data-b" x1="6" y1="18" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#54f7ce" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'ai':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="10" stroke="url(#ai-a)" strokeWidth="2" />
          <circle cx="18" cy="18" r="4" fill="url(#ai-b)" />
          <path d="M18 6V2" stroke="url(#ai-c)" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 18h4" stroke="url(#ai-c)" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 34v-4" stroke="url(#ai-c)" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 18h4" stroke="url(#ai-c)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="ai-a" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#54f7ce" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
            <linearGradient id="ai-b" x1="14" y1="14" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff7b39" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
            <linearGradient id="ai-c" x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd66b" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'swiftpay':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="28" height="20" rx="4" fill="url(#pay-a)" />
          <rect x="8" y="12" width="20" height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
          <rect x="8" y="17" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
          <circle cx="26" cy="23" r="3" fill="rgba(255,255,255,0.9)" />
          <defs>
            <linearGradient id="pay-a" x1="4" y1="8" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff7b39" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'marketing':
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 12l14-6v24l-14-6v-12zm19 1a3 3 0 110 6 3 3 0 010-6z"
            fill="url(#mkt-a)"
          />
          <path d="M25 14h5v6h-5a3 3 0 000-6z" fill="url(#mkt-b)" />
          <defs>
            <linearGradient id="mkt-a" x1="6" y1="6" x2="20" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd66b" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
            <linearGradient id="mkt-b" x1="25" y1="14" x2="30" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#54f7ce" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'growth':
    default:
      return (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 26l6-8 5 6 8-12 5 5" stroke="url(#growth-a)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 30h24" stroke="url(#growth-b)" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="growth-a" x1="8" y1="18" x2="32" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff7b39" />
              <stop offset="1" stopColor="#54f7ce" />
            </linearGradient>
            <linearGradient id="growth-b" x1="6" y1="30" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd66b" />
              <stop offset="1" stopColor="#d63cff" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
}
