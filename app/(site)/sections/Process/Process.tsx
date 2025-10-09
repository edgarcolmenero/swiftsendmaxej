"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

type StepId = "discover" | "design" | "build" | "launch";

type StepContent = {
  id: StepId;
  number: string;
  label: string;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
  cta: {
    label: string;
    href: string;
  };
  hue: number;
};

const STEP_ORDER: StepId[] = ["discover", "design", "build", "launch"];

const STEPS: Record<StepId, StepContent> = {
  discover: {
    id: "discover",
    number: "01",
    label: "Discover",
    title: "Clarity through discovery",
    summary: "Align on goals, constraints, and success signals before we draw a single pixel.",
    description:
      "We kick off with deep listening sessions, product archaeology, and data pulls so the entire team understands the north star and the guardrails.",
    bullets: [
      "Goal + stakeholder workshops",
      "Competitive and systems mapping",
      "Success metrics + analytics baseline",
    ],
    cta: {
      label: "Schedule discovery",
      href: "#contact",
    },
    hue: 210,
  },
  design: {
    id: "design",
    number: "02",
    label: "Design",
    title: "Intentional experience design",
    summary:
      "Translate insights into flows, prototypes, and UI that balance velocity with brand craft.",
    description:
      "We prototype fast, pressure-test with customers, and iterate visuals in tight loops to make every interaction feel inevitable.",
    bullets: [
      "Experience architecture",
      "Interactive prototypes + testing",
      "Design systems + visual polish",
    ],
    cta: {
      label: "Review design sprints",
      href: "#portfolio",
    },
    hue: 276,
  },
  build: {
    id: "build",
    number: "03",
    label: "Build",
    title: "Production-ready engineering",
    summary:
      "Ship stable foundations with observability, performance budgets, and clean hand-off docs.",
    description:
      "Our engineering pods wire up infrastructure, automate the mundane, and keep performance budgets top of mind so launch day feels calm.",
    bullets: [
      "Technical architecture + tooling",
      "Accessible, performant builds",
      "QA, instrumentation, and docs",
    ],
    cta: {
      label: "See build playbook",
      href: "#services",
    },
    hue: 28,
  },
  launch: {
    id: "launch",
    number: "04",
    label: "Launch",
    title: "Confident launch + iteration",
    summary:
      "Coordinate rollout, measure impact, and plan the next loop with the same team that built it.",
    description:
      "We choreograph GTM, monitor telemetry, and spin up iteration sprints so your team stays focused on momentum instead of fire drills.",
    bullets: [
      "Rollout + comms orchestration",
      "Analytics + experiment setup",
      "Hypercare + iteration roadmap",
    ],
    cta: {
      label: "Plan your launch",
      href: "#contact",
    },
    hue: 150,
  },
};

const INITIAL_STEP: StepId = STEP_ORDER[0];

const getStepFromIndex = (index: number): StepId => STEP_ORDER[(index + STEP_ORDER.length) % STEP_ORDER.length];

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<StepId, HTMLButtonElement | null>>({
    discover: null,
    design: null,
    build: null,
    launch: null,
  });
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState<StepId>(INITIAL_STEP);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [progressVisible, setProgressVisible] = useState<boolean>(false);
  const [isInitialReveal, setIsInitialReveal] = useState<boolean>(true);

  const activeIndex = useMemo(() => STEP_ORDER.indexOf(activeStep), [activeStep]);

  const progressPercent = useMemo(() => {
    if (STEP_ORDER.length <= 1) return 0;
    const raw = (activeIndex / (STEP_ORDER.length - 1)) * 100;
    return Math.min(100, Math.max(0, raw));
  }, [activeIndex]);

  const displayedPercent = progressVisible ? progressPercent : 0;
  const roundedPercent = Math.round(displayedPercent);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const hue = STEPS[activeStep].hue;
    section.style.setProperty("--accent-hue", String(hue));
    section.style.setProperty("--step-hue", String(hue));
    section.style.setProperty("--active-step-index", String(activeIndex));
  }, [activeStep, activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const revealTargets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-process-reveal]")
    );

    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.setAttribute("data-reveal-state", "visible"));
      setProgressVisible(true);
      setIsInitialReveal(false);
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-state", "visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    const progressEl = progressRef.current;
    if (progressEl) {
      const progressObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-reveal-state", "visible");
            setProgressVisible(true);
            progressObserver.disconnect();
          });
        },
        { threshold: 0.4, rootMargin: "0px 0px -10%" }
      );

      progressObserver.observe(progressEl);
      return () => {
        revealObserver.disconnect();
        progressObserver.disconnect();
      };
    }

    return () => {
      revealObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInitialReveal(false);
      return;
    }

    if (!progressVisible) return;

    const timeout = window.setTimeout(() => {
      setIsInitialReveal(false);
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [progressVisible, prefersReducedMotion]);

  const focusTab = useCallback((step: StepId) => {
    const node = tabRefs.current[step];
    if (node) {
      node.focus();
    }
  }, []);

  const handleTabActivation = useCallback(
    (step: StepId, focus?: boolean) => {
      if (step === activeStep) {
        if (focus) focusTab(step);
        return;
      }
      setActiveStep(step);
      if (focus) focusTab(step);
    },
    [activeStep, focusTab]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const { key } = event;
      const currentIndex = STEP_ORDER.indexOf(activeStep);

      if (key === "ArrowRight" || key === "ArrowDown") {
        event.preventDefault();
        const nextStep = getStepFromIndex(currentIndex + 1);
        handleTabActivation(nextStep, true);
        return;
      }

      if (key === "ArrowLeft" || key === "ArrowUp") {
        event.preventDefault();
        const prevStep = getStepFromIndex(currentIndex - 1);
        handleTabActivation(prevStep, true);
        return;
      }

      if (key === "Home") {
        event.preventDefault();
        handleTabActivation(STEP_ORDER[0], true);
        return;
      }

      if (key === "End") {
        event.preventDefault();
        handleTabActivation(STEP_ORDER[STEP_ORDER.length - 1], true);
        return;
      }

      if (key === " " || key === "Enter") {
        event.preventDefault();
        handleTabActivation(activeStep, true);
      }
    },
    [activeStep, handleTabActivation]
  );

  const progressClassName = useMemo(() => {
    const classes = ["process__progress"];
    if (progressVisible) classes.push("is-active");
    if (isInitialReveal) classes.push("is-revealing");
    return classes.join(" ");
  }, [progressVisible, isInitialReveal]);

  const sectionClassName = useMemo(() => {
    const classes = ["process"];
    if (prefersReducedMotion) classes.push("process--reduced-motion");
    return classes.join(" ");
  }, [prefersReducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      data-process-section
      className={sectionClassName}
      aria-labelledby="process-heading"
    >
      <div className="process-stars" aria-hidden="true" />
      <div className="process__inner">
        <header className="process__intro" data-process-reveal>
          <p className="process__eyebrow">Process</p>
          <h2 id="process-heading" className="process__heading">
            How we work, from spark to ship
          </h2>
          <p className="process__lede">
            Every engagement follows the same four-part cadence so you always know what comes next.
            Each phase hands off cleanly to the next with clear artifacts, owners, and success metrics.
          </p>
        </header>

        <div
          className={progressClassName}
          data-process-progress
          data-process-reveal
          ref={progressRef}
        >
          <div className="process__progress-meta">
            <span className="process__progress-label">Progress</span>
            <span className="process__progress-value">{roundedPercent}%</span>
          </div>
          <div className="process__progress-track" aria-hidden="true">
            <div
              className="process__progress-fill"
              style={{ width: `${displayedPercent}%` }}
            />
            <div
              className="process__progress-indicator"
              style={{ left: `${displayedPercent}%` }}
            />
          </div>
          <div className="visually-hidden" aria-live="polite">
            {`Process progress ${roundedPercent} percent complete`}
          </div>
        </div>

        <div className="process__layout">
          <div
            className="process__tiles"
            role="tablist"
            aria-label="SwiftSend process steps"
            data-process-reveal
          >
            {STEP_ORDER.map((stepId) => {
              const step = STEPS[stepId];
              const isActive = stepId === activeStep;
              const tileStyle = {
                "--tile-hue": String(step.hue),
              } as CSSProperties;

              return (
                <button
                  key={step.id}
                  ref={(node) => {
                    tabRefs.current[step.id] = node;
                  }}
                  id={`process-tab-${step.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="process-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={"process__tile" + (isActive ? " is-active" : "")}
                  data-step={step.id}
                  style={tileStyle}
                  onClick={() => handleTabActivation(step.id)}
                  onKeyDown={handleKeyDown}
                >
                  <span className="process__badge" aria-hidden="true">
                    <span className="process__badge-number">{step.number}</span>
                    <span className="process__badge-label">{step.label}</span>
                  </span>
                  <span className="process__tile-title">{step.title}</span>
                  <span className="process__tile-summary">{step.summary}</span>
                </button>
              );
            })}
          </div>

          <aside className="process__detail" data-process-reveal>
            <div
              id="process-panel"
              role="tabpanel"
              aria-labelledby={`process-tab-${activeStep}`}
              tabIndex={0}
              className="process__detail-card"
            >
              <span className="process__detail-eyebrow" aria-live="polite">
                {STEPS[activeStep].number} · {STEPS[activeStep].label}
              </span>
              <h3 className="process__detail-title">{STEPS[activeStep].title}</h3>
              <p className="process__detail-description">{STEPS[activeStep].description}</p>
              <ul className="process__detail-list">
                {STEPS[activeStep].bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="process__cta" href={STEPS[activeStep].cta.href}>
                <span>{STEPS[activeStep].cta.label}</span>
                <span className="process__cta-icon" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export const STEP_DATA = STEPS;
export const PROCESS_STEPS = STEP_ORDER;
