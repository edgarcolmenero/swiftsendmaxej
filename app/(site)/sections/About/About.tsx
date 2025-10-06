'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { useRevealOnce } from '@/hooks/useRevealOnce';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const achievements = [
  {
    title: 'Honors Student',
    copy: 'Top 1% engineering graduate with research focused on human-centered automation.',
  },
  {
    title: 'STEM Organization Lead',
    copy: 'Scaled statewide STEM programs and scholarship ops for 2,500+ students.',
  },
  {
    title: 'Adidas Product Ops',
    copy: 'Automated global launch workflows and brand asset pipelines.',
  },
  {
    title: 'Colmenero Consulting',
    copy: 'Delivered fintech playbooks from compliance to product velocity.',
  },
  {
    title: 'SwiftSend Founder',
    copy: 'Bootstrapped a product studio tuned for founder agility and savings.',
  },
];

const certificates = [
  'Google Cloud Certified — Associate Cloud Engineer',
  'Figma Product Systems Certification',
  'HubSpot Revenue Operations Professional',
  'Scrum Alliance Certified ScrumMaster',
];

export function About() {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 900px) and (pointer: fine)');

  useRevealOnce('.about [data-reveal]');

  useEffect(() => {
    if (reducedMotion || !isDesktop) {
      return;
    }

    const container = profileRef.current;
    const avatar = avatarRef.current;
    if (!container || !avatar) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      const clampedX = Math.max(-4, Math.min(4, offsetX));
      const clampedY = Math.max(-3, Math.min(3, offsetY));
      avatar.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    };

    const reset = () => {
      avatar.style.transform = 'translate3d(0, 0, 0)';
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('resize', reset);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('resize', reset);
    };
  }, [isDesktop, reducedMotion]);

  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <Container className="about__inner">
        <div className="section-heading" data-reveal>
          <span className="section-heading__eyebrow">Founder &amp; Crew</span>
          <h2 className="section-heading__title" id="about-heading">
            About <span className="grad-word">SwiftSend</span>
          </h2>
          <p className="section-heading__lede">
            SwiftSend grew out of relentless founder energy—shipping software, automation, and growth systems with zero fluff
            and all accountability. Every engagement is built to hand teams the controls and keep spend lean.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__profile" ref={profileRef} data-reveal>
            <div className="about__avatar-wrap">
              <div className="about__avatar-ring" />
              <div className="about__avatar" ref={avatarRef} aria-hidden="true" />
            </div>
            <h3 className="about__name">EJ Colmenero</h3>
            <p className="about__role">Founder &amp; Principal Engineer</p>
            <p className="about__bio">
              I build founder-grade software systems that unlock runways. From architecture to growth motions, my obsession is
              giving teams the clarity and tools to own their stack end-to-end.
            </p>
            <div className="about__quote-card" tabIndex={0} role="listitem">
              “Every product deserves a fast orbit between idea and impact. SwiftSend keeps that orbit tight.”
            </div>
          </div>

          <div className="about__achievements" data-reveal role="list">
            {achievements.map((item) => (
              <div key={item.title} className="about__achievement" role="listitem" tabIndex={0}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about__certs" data-reveal>
          <h3>Certified to Ship</h3>
          <div className="about__cert-grid">
            {certificates.map((certificate) => (
              <div key={certificate} className="about__cert" tabIndex={0}>
                {certificate}
              </div>
            ))}
          </div>
        </div>

        <div className="about__closing" data-reveal>
          “We align your stack, your runway, and your roadmap—then ship the product your customers can’t ignore.”
        </div>
      </Container>
    </section>
  );
}
