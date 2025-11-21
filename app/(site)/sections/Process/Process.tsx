"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { GradientPillButton } from "@/components/ui/GradientPillButton";
import { setupStarfield } from "@/lib/starfield";

type Phase = {
  id: number;
  label: "DISCOVER" | "DESIGN" | "BUILD" | "LAUNCH";
  title: string;
  summary: string;
  duration: string;
  deliverable: string;
  bullets: string[];
  accentStart: string;
  accentEnd: string;
  accentDot: string;
  accentShadow: string;
  accentGradient: string;
};

const phases: Phase[] = [
  {
    id: 1,
    label: "DISCOVER",
    title: "Discovery & Strategy",
    summary: "Understanding your business, users, and goals.",
    duration: "1–2 weeks",
    deliverable: "Strategy brief",
    bullets: [
      "Stakeholder interviews & competitive analysis",
      "User research and persona development",
      "Technical feasibility assessment",
      "Project scope and timeline definition",
      "Success metrics and KPI framework",
    ],
    accentStart: "#22d3ee",
    accentEnd: "#38bdf8",
    accentDot: "#7dd3fc",
    accentShadow: "rgba(56, 189, 248, 0.35)",
    accentGradient: "from-cyan-400 to-sky-400",
  },
  {
    id: 2,
    label: "DESIGN",
    title: "Design & Prototyping",
    summary: "Transform insights into beautiful, functional designs.",
    duration: "2–3 weeks",
    deliverable: "Experience blueprint",
    bullets: [
      "Journey maps, IA, and interaction models",
      "High-fidelity prototypes with rapid iteration",
      "Design systems tuned for scalability",
      "Motion, accessibility, and handoff specs",
    ],
    accentStart: "#a855f7",
    accentEnd: "#ec4899",
    accentDot: "#e9d5ff",
    accentShadow: "rgba(168, 85, 247, 0.38)",
    accentGradient: "from-fuchsia-400 to-violet-400",
  },
  {
    id: 3,
    label: "BUILD",
    title: "Development & Integration",
    summary: "Bringing designs to life with clean, scalable code.",
    duration: "4–8 weeks",
    deliverable: "Production release",
    bullets: [
      "Full-stack implementation with observability",
      "API, data, and authentication wiring",
      "Performance budgets and accessibility baked in",
      "QA, rollout plans, and documentation",
    ],
    accentStart: "#f97316",
    accentEnd: "#f59e0b",
    accentDot: "#fdba74",
    accentShadow: "rgba(249, 115, 22, 0.38)",
    accentGradient: "from-orange-400 to-amber-400",
  },
  {
    id: 4,
    label: "LAUNCH",
    title: "Launch & Optimization",
    summary: "Deploy with confidence and continuously improve.",
    duration: "Ongoing",
    deliverable: "Growth roadmap",
    bullets: [
      "Release orchestration and comms",
      "Telemetry, analytics, and experiment setup",
      "Hypercare, iteration, and growth sprints",
    ],
    accentStart: "#34d399",
    accentEnd: "#10b981",
    accentDot: "#6ee7b7",
    accentShadow: "rgba(16, 185, 129, 0.35)",
    accentGradient: "from-emerald-400 to-teal-300",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const starsRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [expandedPhaseId, setExpandedPhaseId] = useState<number>(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = starsRef.current;
    if (!section || !canvas) return;

    const revealTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-process-reveal]"));

    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.setAttribute("data-reveal-state", "visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-state", "visible");
          revealObserver.unobserve(entry.target as Element);
        });
      },
      { threshold: 0.35 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = starsRef.current;

    if (!section || !canvas) return;

    const motionQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : (null as unknown as MediaQueryList);

    return setupStarfield({ section, canvas, mediaQuery: motionQuery, densityScale: 1.2 });
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`process relative overflow-hidden ${prefersReducedMotion ? "process--reduced-motion" : ""}`}
      aria-labelledby="process-heading"
      data-process-section
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #020415 0%, rgba(5, 8, 20, 0.96) 40%, rgba(7, 10, 22, 0.96) 70%, #04050f 100%)",
          }}
        />
        <div
          className="absolute -left-24 -top-20 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.5), rgba(109, 40, 217, 0))",
          }}
        />
        <div
          className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0))",
          }}
        />
        <div
          className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0))",
          }}
        />
      </div>

      <div className="process-stars pointer-events-none absolute inset-0" aria-hidden="true">
        <canvas ref={starsRef} className="process-stars__canvas" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-14 lg:py-16">
        <header className="mx-auto max-w-4xl text-center" data-process-reveal>
          <h2 id="process-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">How we work, from spark to ship.</p>
          <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm sm:leading-relaxed">
            Every engagement follows the same four-part cadence so you always know what comes next. Each phase hands off cleanly
            to the next with clear artifacts, owners, and success metrics.
          </p>
        </header>

        <div className="relative mt-8 space-y-3 sm:mt-10" data-process-reveal>
          {phases.map((phase, idx) => {
            const isExpanded = expandedPhaseId === phase.id;
            const stepNumber = `${(idx + 1).toString().padStart(2, "0")}`;

            const accentStyles = {
              "--accent-start": phase.accentStart,
              "--accent-end": phase.accentEnd,
              "--accent-dot": phase.accentDot,
              "--accent-shadow": phase.accentShadow,
            } as CSSProperties;

            return (
              <div
                key={phase.id}
                style={accentStyles}
                className={`group relative overflow-hidden rounded-[26px] border border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-300 ease-out ${
                  isExpanded
                    ? "shadow-[0_0_36px_var(--accent-shadow)]"
                    : "hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/5 hover:shadow-[0_0_26px_rgba(255,255,255,0.06)]"
                }`}
              >
                <div className="card-accent" aria-hidden="true" />
                <div className="card-glass" aria-hidden="true" />
                <div
                  className={`card-border ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-90"}`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  aria-expanded={isExpanded}
                  className="relative z-10 flex w-full items-start justify-between gap-4 px-6 pb-4 pt-5 text-left sm:px-8"
                  onClick={() => setExpandedPhaseId(phase.id)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div
                      className={`flex items-center gap-3 ${isExpanded ? "drop-shadow-[0_0_8px_var(--accent-shadow)]" : ""}`}
                    >
                      <div
                        className={`relative flex h-11 w-11 items-center justify-center rounded-2xl p-[2px] transition-shadow duration-300 ${
                          isExpanded ? "shadow-[0_0_20px_var(--accent-shadow)]" : ""
                        }`}
                        style={{ backgroundImage: `linear-gradient(140deg, ${phase.accentStart}, ${phase.accentEnd})` }}
                        aria-hidden="true"
                      >
                        <div className="relative flex h-full w-full items-center justify-center rounded-[18px] border border-white/10 bg-[#050915]">
                          <span
                            className={`bg-gradient-to-r ${phase.accentGradient} bg-clip-text text-sm font-semibold text-transparent`}
                          >
                            {stepNumber}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45"
                          style={{ color: `${phase.accentStart}cc` }}
                        >
                          {phase.label}
                        </span>
                        <span className="text-base font-semibold text-white sm:text-lg">{phase.title}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:ml-auto">
                      <span
                        className="inline-flex items-center gap-1 rounded-full border bg-[#0b1226]/70 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur sm:text-xs"
                        style={{
                          borderColor: `${phase.accentStart}66`,
                          backgroundImage: `linear-gradient(120deg, ${phase.accentStart}, ${phase.accentEnd})`,
                        }}
                      >
                        {phase.duration}
                      </span>
                    </div>

                    <p className="max-w-2xl text-xs text-white/65 sm:text-sm">{phase.summary}</p>
                  </div>

                  <ChevronRight
                    className={`mt-1 h-5 w-5 text-white/60 transition duration-300 ${isExpanded ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isExpanded && (
                  <div className="relative z-10 px-6 pb-7 pt-1 sm:px-8">
                    <ul className="mt-3 space-y-2.5">
                      {phase.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-xs text-white/70 sm:text-sm">
                          <span
                            className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{
                                backgroundColor: phase.accentDot,
                                boxShadow: `0 0 12px ${phase.accentShadow}`,
                              }}
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10" data-process-reveal>
          <GradientPillButton href="#contact">
            <span className="ss-text-gradient">Schedule discovery</span>
          </GradientPillButton>
        </div>
      </div>
    </section>
  );
}

export const STEP_DATA = phases;
export const PROCESS_STEPS = phases.map((phase) => phase.id);
