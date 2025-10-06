import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/features/forms/ContactForm';
import { StarfieldCanvas } from '@/features/starfield/StarfieldCanvas';
import { siteConfig } from '@/config/site';

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <StarfieldCanvas className="hero__starfield" id="fx-stars-contact" />
      <Container>
        <div className="section-heading">
          <span className="section-heading__eyebrow">Let’s Collaborate</span>
          <h2 className="section-heading__title" id="contact-heading">
            Let’s Build Together
          </h2>
          <p className="section-heading__lede">
            Share your mission, timeline, and stack. We’ll respond within one business day with next steps and a savings-first
            plan to get you shipping.
          </p>
        </div>

        <div className="contact__layout">
          <div className="contact__form-card">
            <ContactForm />
          </div>
          <div className="contact__aside">
            <div className="contact__panel">
              <h3>Savings Estimator</h3>
              <p>
                Choose a pack to unlock an estimated savings range compared to traditional agencies. We share real numbers once
                we align on scope.
              </p>
            </div>
            <div className="contact__panel">
              <h3>Get in Touch</h3>
              <p>
                Email us at <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </p>
              <p>
                DM{' '}
                <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">
                  @swiftsend
                </a>{' '}
                on Instagram
              </p>
              <p>Response time: under 1 business day</p>
              <blockquote>
                “We treat every message as day zero of your launch.”
              </blockquote>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
