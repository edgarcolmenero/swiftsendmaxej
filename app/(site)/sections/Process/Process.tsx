"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

type Phase = {
  id: number;
  label: "DISCOVER" | "DESIGN" | "BUILD" | "LAUNCH";
  title: string;
  summary: string;
  duration: string;
  deliverable: string;
  bullets: string[];
  colorClass: string;
  borderClass: string;
  glowClass: string;
  ringClass: string;
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
    colorClass: "from-cyan-400 to-cyan-600",
    borderClass: "border-cyan-500/30",
    glowClass: "shadow-cyan-500/40",
    ringClass: "ring-cyan-500/50",
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
    colorClass: "from-violet-400 to-fuchsia-500",
    borderClass: "border-violet-500/30",
    glowClass: "shadow-violet-500/40",
    ringClass: "ring-violet-500/50",
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
    colorClass: "from-orange-400 to-amber-500",
    borderClass: "border-orange-500/30",
    glowClass: "shadow-orange-500/35",
    ringClass: "ring-orange-500/50",
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
    colorClass: "from-emerald-400 to-emerald-500",
    borderClass: "border-emerald-500/30",
    glowClass: "shadow-emerald-500/35",
    ringClass: "ring-emerald-500/50",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
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
    if (!section) return;

    const revealTargets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-process-reveal]")
    );

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

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`process relative overflow-hidden ${prefersReducedMotion ? "process--reduced-motion" : ""}`}
      aria-labelledby="process-heading"
      data-process-section
    >
      <div className="process-stars" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-20 md:py-24 lg:py-28">
        <header className="mx-auto max-w-4xl text-center" data-process-reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">Process</p>
          <h2 id="process-heading" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">How we work, from spark to ship.</p>
          <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base sm:leading-relaxed">
            Every engagement follows the same four-part cadence so you always know what comes next. Each phase hands off cleanly
            to the next with clear artifacts, owners, and success metrics.
          </p>
        </header>

        <div className="relative mt-12 space-y-4 sm:mt-14" data-process-reveal>
          <div
            className="pointer-events-none absolute left-8 top-8 bottom-8 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgb(34,211,238) 0%, rgb(139,92,246) 35%, rgb(251,146,60) 70%, rgb(52,211,153) 100%)",
            }}
          />

          {phases.map((phase) => {
            const isExpanded = expandedPhaseId === phase.id;

            return (
              <div
                key={phase.id}
                className={`relative overflow-hidden rounded-2xl border bg-white/5 ${phase.borderClass} backdrop-blur-xl transition duration-300 ease-out ${
                  isExpanded ? `${phase.glowClass} shadow-lg` : "hover:bg-white/8 hover:shadow-md"
                }`}
              >
                <div
                  className={`absolute left-[30px] top-6 h-3 w-3 rounded-full border border-white/20 transition duration-200 ${
                    isExpanded
                      ? `scale-110 bg-gradient-to-r ${phase.colorClass} shadow-lg ${phase.glowClass} ring-4 ${phase.ringClass}`
                      : "bg-[#0a0e27]"
                  }`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  aria-expanded={isExpanded}
                  className="flex w-full items-start justify-between gap-4 px-10 pb-6 pt-6 text-left sm:px-12"
                  onClick={() => setExpandedPhaseId(phase.id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">{phase.label}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium text-transparent shadow-sm backdrop-blur ${
                          phase.borderClass
                        } bg-white/5 bg-clip-text bg-gradient-to-r ${phase.colorClass}`}
                      >
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{phase.title}</h3>
                    <p className="text-sm text-white/60 sm:text-base">{phase.summary}</p>
                  </div>

                  <ChevronRight
                    className={`mt-1 h-5 w-5 text-white/60 transition duration-300 ${isExpanded ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isExpanded && (
                  <div className="px-10 pb-8 pt-1 sm:px-12">
                    <ul className="mt-3 space-y-3">
                      {phase.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-white/70">
                          <span className={`mt-1 h-2 w-2 rounded-full bg-gradient-to-r ${phase.colorClass}`} aria-hidden="true" />
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

        <div className="mt-10 flex justify-center sm:mt-12" data-process-reveal>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-transparent shadow-[0_0_25px_rgba(255,150,43,0.15)] transition duration-300 hover:shadow-[0_0_40px_rgba(255,150,43,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500"
          >
            Schedule discovery
          </a>
        </div>
      </div>
    </section>
  );
}

export const STEP_DATA = phases;
export const PROCESS_STEPS = phases.map((phase) => phase.id);
