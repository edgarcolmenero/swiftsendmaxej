'use client';

import { ChangeEvent } from 'react';
import { useContactForm } from './useContactForm';

const projectOptions = [
  { value: '', label: 'Select a pack' },
  { value: 'Starter', label: 'Starter' },
  { value: 'Builder', label: 'Builder' },
  { value: 'Engine', label: 'Engine' },
  { value: 'Growth', label: 'Growth' },
];

export function ContactForm() {
  const { values, status, error, summary, onChange, onSubmit, reset } = useContactForm();

  const handleChange = (field: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field, event.target.value);
  };

  return (
    <form className="contact__form" onSubmit={onSubmit} aria-labelledby="contact-heading">
      <div className="contact__fields">
        <div className="contact__field">
          <label htmlFor="contact-name">Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={handleChange('name')}
            autoComplete="name"
          />
        </div>
        <div className="contact__field">
          <label htmlFor="contact-email">Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange('email')}
            autoComplete="email"
          />
        </div>
        <div className="contact__field">
          <label htmlFor="contact-project">Project Type *</label>
          <select
            id="contact-project"
            name="projectType"
            required
            value={values.projectType}
            onChange={handleChange('projectType')}
          >
            {projectOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={option.value === '' && option.value !== values.projectType}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="contact__field">
          <label htmlFor="contact-industry">Industry</label>
          <input
            id="contact-industry"
            name="industry"
            type="text"
            value={values.industry}
            onChange={handleChange('industry')}
            autoComplete="organization"
            placeholder="Optional"
          />
        </div>
        <div className="contact__field contact__field--full">
          <label htmlFor="contact-message">Project Notes *</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={handleChange('message')}
            placeholder="Share your goals, team, and timeline."
          />
        </div>
      </div>

      <div className="contact__actions">
        <button type="submit" className="contact__submit" disabled={status === 'submitting'}>
          <span>Start a Build</span>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 9h9.6l-3.2-3.2L10.2 4l5.8 5-5.8 5-0.8-1.8L12.6 9H3z"
              fill="currentColor"
            />
          </svg>
        </button>
        {status === 'success' ? (
          <button type="button" className="contact__reset" onClick={reset}>
            Submit another project
          </button>
        ) : null}
      </div>

      <div className="contact__status" aria-live="polite" role="status">
        {status === 'submitting' ? 'Sending your project details…' : null}
        {status === 'success' ? 'We received your project. Expect a reply within one business day.' : null}
        {status === 'error' && error ? error : null}
      </div>

      {summary ? (
        <div className="contact__estimator" role="note">
          <strong>{summary.plan}</strong>
          <span>{summary.note}</span>
        </div>
      ) : (
        <p className="contact__estimator contact__estimator--empty">
          Select a project type to see potential savings.
        </p>
      )}
    </form>
  );
}
