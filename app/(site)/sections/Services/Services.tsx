"use client";

import { useEffect, useRef } from "react";
import { Code2, Database, Bot, CreditCard, TrendingUp } from "lucide-react";
import { setupStarfield } from "@/lib/starfield";

interface PillarData {
  title: string;
  description: string;
  icon: typeof Code2;
  gradient: string;
  bullets: string[];
}

const PILLARS: PillarData[] = [
  {
    title: "Full-Stack Development",
    description: "APIs, apps, dashboards, admin portals",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    bullets: [
      "Frontend + backend",
      "Microservices",
      "Cloud deployments",
      "CI/CD automation",
      "Databases",
    ],
  },
  {
    title: "Data Science",
    description: "Pipelines, dashboards, models, and clean data systems",
    icon: Database,
    gradient: "from-purple-500 to-pink-500",
    bullets: [
      "Predictive analytics",
      "Insight tooling",
      "Feature extraction",
      "Data cleansing",
      "Metrics dashboards",
    ],
  },
  {
    title: "AI Automations & Agents",
    description: "Voice bots, chatbots, intake copilots, smart workflows",
    icon: Bot,
    gradient: "from-teal-500 to-emerald-500",
    bullets: [
      "Autonomous pipelines",
      "Process orchestration",
      "Multi-step logic",
      "CRM automations",
      "API-based agents",
    ],
  },
  {
    title: "SwiftPay Systems",
    description: "Fee-smart checkout, subscriptions, ACH routing",
    icon: CreditCard,
    gradient: "from-orange-500 to-amber-500",
    bullets: [
      "Smart invoicing",
      "Payment routing logic",
      "User identity flows",
      "Transaction insights",
      "Custom dashboards",
    ],
  },
  {
    title: "Digital Growth",
    description: "SEO, CRM wiring, landing pages, reporting",
    icon: TrendingUp,
    gradient: "from-rose-500 to-orange-500",
    bullets: ["Funnels", "Ads", "Tracking setups", "Attribution", "Insights"],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : (null as unknown as MediaQueryList);

    const pillars = Array.from(section.querySelectorAll<HTMLElement>('[data-pillar]'));
    const prefersReduced = () => !!motionQuery && motionQuery.matches;

    let observer: IntersectionObserver | null = null;

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      pillars.forEach((pillar) => pillar.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
      );

      pillars.forEach((pillar) => observer?.observe(pillar));
    }

    const handleMotionChange = () => {
      if (prefersReduced()) {
        observer?.disconnect();
        pillars.forEach((pillar) => pillar.classList.add('is-visible'));
      }
    };

    if (motionQuery) {
      if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', handleMotionChange);
      } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(handleMotionChange);
      }
    }

    const starCleanup = starsRef.current
      ? setupStarfield({ section, canvas: starsRef.current, mediaQuery: motionQuery })
      : undefined;

    return () => {
      observer?.disconnect();
      if (motionQuery) {
        if (typeof motionQuery.removeEventListener === 'function') {
          motionQuery.removeEventListener('change', handleMotionChange);
        } else if (typeof motionQuery.removeListener === 'function') {
          motionQuery.removeListener(handleMotionChange);
        }
      }
      starCleanup?.();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section relative overflow-hidden scroll-mt-28 px-4 py-24 sm:px-6 md:scroll-mt-32 md:py-32 lg:px-8"
      aria-labelledby="services-title"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #020518 0%, rgba(7, 20, 41, 0.95) 36%, rgba(52, 16, 86, 0.92) 63%, rgba(110, 39, 10, 0.94) 100%)",
          }}
        />
        <div
          className="absolute -left-32 -top-40 h-[24rem] w-[24rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.7) 0%, rgba(59, 130, 246, 0) 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.68) 0%, rgba(249, 115, 22, 0) 70%)",
          }}
        />
      </div>

      <div className="services-stars pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <canvas ref={starsRef} className="services-stars__canvas" aria-hidden="true" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <h2
          id="services-title"
          className="mb-14 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:mb-16 lg:text-6xl xl:text-7xl"
        >
          <span className="text-white">What We </span>
          <span className="ss-text-gradient">Build</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-7">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                data-pillar
                className="pillar-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-transparent px-6 py-8 transition-all duration-500 ease-out sm:px-8 sm:py-10"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                data-gradient={pillar.gradient}
              >
                <div className="card-accent" aria-hidden="true" />
                <div className="card-glass" aria-hidden="true" />
                <div className="card-border" aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6">
                    <div className="icon-tile">
                      <div className="icon-tile__inner">
                        <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  <h3
                    className="mb-3 text-xl font-semibold tracking-tight text-[var(--accent-start)] transition-colors duration-300 group-hover:text-[var(--accent-dot)]"
                  >
                    {pillar.title}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-slate-300/90">{pillar.description}</p>

                  <ul className="mt-auto space-y-2.5 pt-1">
                    {pillar.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{
                            backgroundColor: "var(--accent-dot)",
                            boxShadow: "0 0 12px var(--accent-shadow)",
                          }}
                        />
                        <span className="text-xs leading-relaxed text-slate-400">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
