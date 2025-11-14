"use client";

import { useEffect, useRef } from "react";
import { Code2, Database, Bot, CreditCard, TrendingUp } from "lucide-react";

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pillars = Array.from(section.querySelectorAll<HTMLElement>('[data-pillar]'));
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = () => mediaQuery.matches;

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      pillars.forEach((pillar) => pillar.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    pillars.forEach((pillar) => observer.observe(pillar));

    const handleMotionChange = () => {
      if (prefersReduced()) {
        observer.disconnect();
        pillars.forEach((pillar) => pillar.classList.add('is-visible'));
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    return () => {
      observer.disconnect();
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative scroll-mt-28 md:scroll-mt-32 px-4 sm:px-6 lg:px-8 py-20 md:py-28 overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Deep space gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, #020617 0%, #020b3a 40%, #020617 70%, rgba(28, 10, 2, 0.15) 100%)',
        }}
      />

      {/* Starfield overlay - subtle static effect */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(0.5px 0.5px at 33% 77%, white, transparent),
            radial-gradient(0.5px 0.5px at 66% 44%, white, transparent),
            radial-gradient(1px 1px at 15% 85%, white, transparent),
            radial-gradient(0.5px 0.5px at 75% 20%, white, transparent),
            radial-gradient(1px 1px at 40% 15%, white, transparent)
          `,
          backgroundSize: '200% 200%, 250% 250%, 300% 300%, 350% 350%, 200% 200%, 250% 250%, 300% 300%, 200% 200%, 250% 250%, 300% 300%',
          backgroundPosition: '0% 0%',
        }}
      />

      {/* Ambient orb glows */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl -z-10"
        style={{ background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl -z-10"
        style={{ background: 'radial-gradient(circle, rgb(168, 85, 247) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl -z-10"
        style={{ background: 'radial-gradient(circle, rgb(249, 115, 22) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <h2
          id="services-title"
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-16 tracking-tight"
        >
          <span className="text-white">What We </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgb(249, 115, 22) 0%, rgb(59, 130, 246) 100%)',
            }}
          >
            Build
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                data-pillar
                className="pillar-card group relative flex flex-col h-full rounded-3xl p-6 transition-all duration-500"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-20 -z-10"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                  data-gradient={pillar.gradient}
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-900/60 backdrop-blur-xl -z-10" />

                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    padding: '2px',
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                  data-gradient={pillar.gradient}
                />

                <div className="mb-6">
                  <div
                    className="icon-tile relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(2, 6, 23, 0.7)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                    data-gradient={pillar.gradient}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-5"
                      style={{
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      }}
                      data-gradient={pillar.gradient}
                    />
                    <Icon className="w-7 h-7 text-white relative z-10" strokeWidth={1.5} />
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mb-2"
                  data-gradient={pillar.gradient}
                >
                  {pillar.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4">{pillar.description}</p>

                <ul className="mt-auto space-y-2">
                  {pillar.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        data-gradient={pillar.gradient}
                      />
                      <span className="text-slate-400 text-xs">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pillar-card {
          opacity: 0;
          transform: translateY(24px);
        }

        .pillar-card.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Blue - Full-Stack Development */
        [data-gradient="from-blue-500 to-cyan-500"] {
          --tw-gradient-stops: rgb(59, 130, 246), rgb(6, 182, 212);
        }

        [data-gradient="from-blue-500 to-cyan-500"] .icon-tile {
          border-color: rgb(56, 189, 248);
        }

        [data-gradient="from-blue-500 to-cyan-500"] h3 {
          color: rgb(56, 189, 248);
        }

        [data-gradient="from-blue-500 to-cyan-500"] li > span.w-1\.5 {
          background-color: rgb(56, 189, 248);
        }

        .pillar-card:hover [data-gradient="from-blue-500 to-cyan-500"].icon-tile {
          box-shadow: 0 0 32px rgba(56, 189, 248, 0.4);
        }

        /* Magenta/Purple - Data Science */
        [data-gradient="from-purple-500 to-pink-500"] {
          --tw-gradient-stops: rgb(168, 85, 247), rgb(236, 72, 153);
        }

        [data-gradient="from-purple-500 to-pink-500"] .icon-tile {
          border-color: rgb(217, 70, 239);
        }

        [data-gradient="from-purple-500 to-pink-500"] h3 {
          color: rgb(217, 70, 239);
        }

        [data-gradient="from-purple-500 to-pink-500"] li > span.w-1\.5 {
          background-color: rgb(217, 70, 239);
        }

        .pillar-card:hover [data-gradient="from-purple-500 to-pink-500"].icon-tile {
          box-shadow: 0 0 32px rgba(217, 70, 239, 0.4);
        }

        /* Teal/Emerald - AI Automations */
        [data-gradient="from-teal-500 to-emerald-500"] {
          --tw-gradient-stops: rgb(20, 184, 166), rgb(16, 185, 129);
        }

        [data-gradient="from-teal-500 to-emerald-500"] .icon-tile {
          border-color: rgb(52, 211, 153);
        }

        [data-gradient="from-teal-500 to-emerald-500"] h3 {
          color: rgb(52, 211, 153);
        }

        [data-gradient="from-teal-500 to-emerald-500"] li > span.w-1\.5 {
          background-color: rgb(52, 211, 153);
        }

        .pillar-card:hover [data-gradient="from-teal-500 to-emerald-500"].icon-tile {
          box-shadow: 0 0 32px rgba(52, 211, 153, 0.4);
        }

        /* Orange/Amber - SwiftPay Systems */
        [data-gradient="from-orange-500 to-amber-500"] {
          --tw-gradient-stops: rgb(249, 115, 22), rgb(245, 158, 11);
        }

        [data-gradient="from-orange-500 to-amber-500"] .icon-tile {
          border-color: rgb(251, 146, 60);
        }

        [data-gradient="from-orange-500 to-amber-500"] h3 {
          color: rgb(251, 146, 60);
        }

        [data-gradient="from-orange-500 to-amber-500"] li > span.w-1\.5 {
          background-color: rgb(251, 146, 60);
        }

        .pillar-card:hover [data-gradient="from-orange-500 to-amber-500"].icon-tile {
          box-shadow: 0 0 32px rgba(251, 146, 60, 0.4);
        }

        /* Rose/Orange - Digital Growth */
        [data-gradient="from-rose-500 to-orange-500"] {
          --tw-gradient-stops: rgb(244, 63, 94), rgb(249, 115, 22);
        }

        [data-gradient="from-rose-500 to-orange-500"] .icon-tile {
          border-color: rgb(251, 113, 133);
        }

        [data-gradient="from-rose-500 to-orange-500"] h3 {
          color: rgb(251, 113, 133);
        }

        [data-gradient="from-rose-500 to-orange-500"] li > span.w-1\.5 {
          background-color: rgb(251, 113, 133);
        }

        .pillar-card:hover [data-gradient="from-rose-500 to-orange-500"].icon-tile {
          box-shadow: 0 0 32px rgba(251, 113, 133, 0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .pillar-card {
            opacity: 1;
            transform: none;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
