import { Container } from '@/components/layout/Container';
import { LabsGlow } from '@/features/labs/LabsGlow';

export function Labs() {
  return (
    <section id="labs" className="labs-section" aria-labelledby="labs-heading">
      <Container>
        <div className="section-heading">
          <span className="section-heading__eyebrow">R&D</span>
          <h2 className="section-heading__title" id="labs-heading">
            SwiftSend Labs
          </h2>
          <p className="section-heading__lede">
            Product experiments and internal tools that explore the edges of automation, AI copilots, and new go-to-market
            blueprints before they hit client roadmaps.
          </p>
        </div>
        <div className="labs-section__grid" data-labs-grid>
          <LabsGlow className="labs-section__glow" />
          <p>
            Labs is where we prototype new stacks, validate AI workflows, and spin up playbooks for founders who love a first
            look. Join the beta to get access as drops go live.
          </p>
        </div>
        <div className="hero__actions" style={{ marginTop: '2.5rem' }}>
          <a className="hero__action hero__action--ghost" href="#contact" aria-label="Join the Labs beta program">
            Join the Labs Beta Program
            <span className="hero__action-underline" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
