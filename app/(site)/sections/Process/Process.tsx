'use client';

import { useMemo, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Step {
  key: string;
  title: string;
  summary: string;
  details: string;
  progress: number;
}

const steps: Step[] = [
  {
    key: 'discover',
    title: 'Discover',
    summary: 'Stakeholder syncs, goal setting, and signal hunting.',
    details:
      'We map the mission, clarify constraints, and audit your stack so the build plan lands with precision. Expect async intake, stakeholder syncs, and a prioritized playbook.',
    progress: 0,
  },
  {
    key: 'design',
    title: 'Design',
    summary: 'Product flows, UX patterns, and system diagrams.',
    details:
      'Interaction models, flows, and brand context snap together quickly. We prototype with your data, define the technical plan, and keep approvals crisp.',
    progress: 25,
  },
  {
    key: 'build',
    title: 'Build',
    summary: 'Engineering sprints with ops-ready delivery.',
    details:
      'Engineers, automation, and QA move in lockstep. We keep velocity visible, ship to staging frequently, and ensure the ops handoff is effortless.',
    progress: 50,
  },
  {
    key: 'launch',
    title: 'Launch',
    summary: 'Go-live, analytics, and post-launch acceleration.',
    details:
      'Cutover, observability, and growth experiments go live in tandem. We train your crew, leave you with tooling, and line up the next wave of improvements.',
    progress: 75,
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState<Step>(steps[0]);
  const reducedMotion = useReducedMotion();

  const progressValue = useMemo(() => activeStep.progress, [activeStep.progress]);

  return (
    <section id="process" className="process" aria-labelledby="process-heading">
      <Container>
        <div className="section-heading">
          <span className="section-heading__eyebrow">Method</span>
          <h2 className="section-heading__title" id="process-heading">
            How We Work
          </h2>
          <p className="section-heading__lede">
            A transparent, momentum-first process tuned to the way founders build. Every phase keeps you in the loop and locks
            in measurable progress.
          </p>
        </div>

        <div className="process__layout">
          <aside className="process__progress" aria-label="Project progress">
            <div className="process__meter" role="presentation">
              <div
                className="process__meter-fill"
                style={{ transform: `scaleX(${progressValue / 100})`, transition: reducedMotion ? 'none' : undefined }}
              />
            </div>
            <div className="process__stops" aria-hidden="true">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <p className="section-heading__lede" style={{ fontSize: '0.95rem' }}>
              We embed weekly demos, async updates, and transparent backlog access so you always know what landed.
            </p>
          </aside>

          <div>
            <div className="process__tabs" role="tablist" aria-label="Delivery steps">
              {steps.map((step) => (
                <button
                  key={step.key}
                  type="button"
                  role="tab"
                  aria-selected={activeStep.key === step.key}
                  aria-controls={`process-panel-${step.key}`}
                  id={`process-tab-${step.key}`}
                  className="process__tab"
                  data-active={activeStep.key === step.key}
                  onClick={() => setActiveStep(step)}
                >
                  <span className="process__tab-title">{step.title}</span>
                  <span className="process__tab-summary">{step.summary}</span>
                </button>
              ))}
            </div>

            <div
              className="process__panel"
              id={`process-panel-${activeStep.key}`}
              role="tabpanel"
              aria-labelledby={`process-tab-${activeStep.key}`}
              aria-live="polite"
            >
              <h3>{activeStep.title}</h3>
              <p>{activeStep.details}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
