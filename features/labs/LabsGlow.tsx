"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  BarChart3,
  Cpu,
  CreditCard,
  FileText,
  Globe,
  Lock,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type LabStatus = "Live" | "Beta" | "Prototype" | "Coming Soon";
type LabAccent = "orange" | "purple" | "blue" | "teal" | "rose";

type LabModule = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: LabStatus;
  accent: LabAccent;
};

const LAB_MODULES: LabModule[] = [
  {
    id: "swiftpay-mini",
    title: "SwiftPay Mini",
    description: "Embedded payment widget",
    icon: CreditCard,
    status: "Live",
    accent: "orange",
  },
  {
    id: "doc-copilot",
    title: "Doc Copilot",
    description: "AI document generation",
    icon: FileText,
    status: "Beta",
    accent: "purple",
  },
  {
    id: "site-in-a-day",
    title: "Site-in-a-Day",
    description: "Instant landing pages",
    icon: Sparkles,
    status: "Live",
    accent: "blue",
  },
  {
    id: "growth-analytics",
    title: "Growth Analytics",
    description: "Conversion tracking",
    icon: BarChart3,
    status: "Prototype",
    accent: "teal",
  },
  {
    id: "api-forge",
    title: "API Forge",
    description: "No-code API builder",
    icon: Cpu,
    status: "Beta",
    accent: "rose",
  },
  {
    id: "secure-vault",
    title: "SecureVault",
    description: "Encrypted storage",
    icon: Lock,
    status: "Coming Soon",
    accent: "orange",
  },
  {
    id: "global-sync",
    title: "GlobalSync",
    description: "Multi-region sync",
    icon: Globe,
    status: "Prototype",
    accent: "purple",
  },
  {
    id: "launch-kit",
    title: "LaunchKit",
    description: "Startup toolkit",
    icon: Rocket,
    status: "Beta",
    accent: "blue",
  },
];

type StatDefinition = {
  id: string;
  label: string;
  value: string;
  accent: "orange" | "purple" | "blue" | "teal";
};

const LAB_STATS: StatDefinition[] = [
  { id: "active", label: "Active Modules", value: "8", accent: "orange" },
  { id: "development", label: "In Development", value: "4", accent: "purple" },
  { id: "version", label: "Version", value: "2.4.1", accent: "blue" },
  { id: "uptime", label: "Uptime", value: "99.9%", accent: "teal" },
];

const STATUS_CLASS: Record<LabStatus, string> = {
  Live: "blueprint-status blueprint-status--live",
  Beta: "blueprint-status blueprint-status--beta",
  Prototype: "blueprint-status blueprint-status--prototype",
  "Coming Soon": "blueprint-status blueprint-status--soon",
};

const ACCENT_CLASS: Record<LabAccent, string> = {
  orange: "blueprint-card blueprint-card--orange",
  purple: "blueprint-card blueprint-card--purple",
  blue: "blueprint-card blueprint-card--blue",
  teal: "blueprint-card blueprint-card--teal",
  rose: "blueprint-card blueprint-card--rose",
};

const formatIndex = (index: number) => `[${String(index + 1).padStart(2, "0")}]`;

export default function Labs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasStatsAnimated, setHasStatsAnimated] = useState(false);
  const [showVersionPatch, setShowVersionPatch] = useState(false);

  const modules = useMemo(() => LAB_MODULES, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    document.body.classList.add("is-labs-js");

    const stars = starsRef.current;
    if (stars && !stars.dataset.built) {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const baseStarCount = desktop ? 120 : 60;
      const starVariance = desktop ? 42 : 28;
      const starCount = baseStarCount + Math.floor(Math.random() * starVariance);
      const glowCount = (desktop ? 14 : 8) + Math.floor(Math.random() * 10);
      const rand = (min: number, max: number) => Math.random() * (max - min) + min;

      const build = (cls: string, style: Record<string, string>) => {
        const node = document.createElement("span");
        node.className = cls;
        Object.entries(style).forEach(([key, value]) => node.style.setProperty(key, value));
        stars.appendChild(node);
      };

      for (let i = 0; i < starCount; i += 1) {
        build("labs-star", {
          "--left": `${rand(-4, 104).toFixed(2)}%`,
          "--top": `${rand(-6, 106).toFixed(2)}%`,
          "--size": `${rand(1, 2.4).toFixed(2)}px`,
          "--twinkle-duration": `${rand(2.6, 5.2).toFixed(2)}s`,
          "--twinkle-delay": `${rand(0, 3).toFixed(2)}s`,
          "--twinkle-min": rand(0.32, 0.5).toFixed(2),
          "--twinkle-max": rand(0.6, 0.95).toFixed(2),
        });
      }

      for (let i = 0; i < glowCount; i += 1) {
        build("labs-glow", {
          "--left": `${rand(-8, 108).toFixed(2)}%`,
          "--top": `${rand(-12, 112).toFixed(2)}%`,
          "--size": `${rand(3.2, 7).toFixed(2)}px`,
          "--twinkle-duration": `${rand(3.2, 6).toFixed(2)}s`,
          "--twinkle-delay": `${rand(0, 3).toFixed(2)}s`,
          "--twinkle-min": rand(0.18, 0.3).toFixed(2),
          "--twinkle-max": rand(0.52, 0.82).toFixed(2),
          "--blur": `${rand(4, 8).toFixed(2)}px`,
        });
      }

      stars.dataset.built = "true";
    }

    const revealTargets = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if ("IntersectionObserver" in window) {
      const seen = new WeakSet<Element>();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || seen.has(entry.target)) return;
            seen.add(entry.target);
            const idx = Number((entry.target as HTMLElement).dataset.revealIndex || 0);
            const delay = reduced ? 0 : Math.min(80 + idx * 40, 320);
            window.setTimeout(() => {
              (entry.target as HTMLElement).classList.add("is-in");
            }, delay);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.25, rootMargin: "0px 0px -10%" }
      );
      revealTargets.forEach((target) => observer.observe(target));
      return () => observer.disconnect();
    }

    revealTargets.forEach((target) => target.classList.add("is-in"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (hasStatsAnimated) return;

    if (prefersReducedMotion) {
      setHasStatsAnimated(true);
      return;
    }

    if (typeof window === "undefined" || !statsRef.current) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setHasStatsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setHasStatsAnimated(true);
          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [hasStatsAnimated, prefersReducedMotion]);

  const handleVersionDone = useCallback(() => {
    setShowVersionPatch(true);
  }, []);

  const activeValue = useCountUp({
    target: 8,
    durationMs: 900,
    isActive: hasStatsAnimated,
    reducedMotion: prefersReducedMotion,
  });

  const developmentValue = useCountUp({
    target: 4,
    durationMs: 900,
    isActive: hasStatsAnimated,
    reducedMotion: prefersReducedMotion,
  });

  const versionValue = useCountUp({
    target: 2.4,
    durationMs: 1200,
    isActive: hasStatsAnimated,
    reducedMotion: prefersReducedMotion,
    onDone: handleVersionDone,
  });

  const uptimeValue = useCountUp({
    target: 99.9,
    durationMs: 1300,
    isActive: hasStatsAnimated,
    reducedMotion: prefersReducedMotion,
  });

  const statDisplays: Record<StatDefinition["id"], ReactNode> = {
    active: Math.round(activeValue).toString(),
    development: Math.round(developmentValue).toString(),
    version: (
      <>
        {versionValue.toFixed(1)}
        <span className={`blueprint-version-patch${showVersionPatch ? " is-visible" : ""}`}>
          .1
        </span>
      </>
    ),
    uptime: `${uptimeValue.toFixed(1)}%`,
  };

  return (
    <section id="labs" className="labs-section labs-section--blueprint" aria-labelledby="labs-title" ref={sectionRef}>
      <div className="labs-backdrop" aria-hidden="true" />
      <div className="labs-blueprint-grid" aria-hidden="true" />
      <div className="labs-blueprint-rings" aria-hidden="true" />

      <div className="labs-stars" aria-hidden="true" ref={starsRef} />

      <div className="labs-inner blueprint-inner">
        <header className="blueprint-head" data-reveal data-reveal-index="0">
          <span className="blueprint-tag">
            <span className="ss-text-gradient">Concept 06 — Blueprint / Wireframe Theme</span>
          </span>
          <h2 id="labs-title" className="blueprint-title">
            SwiftSend <span className="labs-title-gradient ss-text-gradient">Labs</span>
          </h2>
          <p className="blueprint-subtitle">
            Affordable, personalized experiments you can actually ship.
          </p>
          <div className="blueprint-measure" aria-label="Labs version 2.4.1 calibration">
            <span className="blueprint-measure-line" aria-hidden="true" />
            <span className="blueprint-measure-label">LABS_v2.4.1</span>
            <span className="blueprint-measure-line" aria-hidden="true" />
          </div>
        </header>

        <div className="blueprint-grid" role="list">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <article
                key={module.id}
                className={ACCENT_CLASS[module.accent]}
                data-reveal
                data-reveal-index={index + 2}
              >
                <span className="blueprint-card-index" aria-hidden="true">
                  {formatIndex(index)}
                </span>
                <div className="blueprint-card-overlay" aria-hidden="true" />
                <div className="blueprint-card-grid-overlay" aria-hidden="true" />
                <div className="blueprint-card-body">
                  <div className="blueprint-card-top">
                    <div className="blueprint-card-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.7} />
                    </div>
                    <span className={STATUS_CLASS[module.status]}>{module.status}</span>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <a className="blueprint-card-cta" href="#contact">
                    <span>Learn more</span>
                    <span className="blueprint-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="blueprint-stats" data-reveal data-reveal-index="12" ref={statsRef}>
          {LAB_STATS.map((stat) => {
            const valueClass = `blueprint-stat-value blueprint-stat-value--${stat.accent}${stat.id === "version" ? " blueprint-stat-value-version" : ""}`;
            return (
              <div key={stat.id} className="blueprint-stats-item">
                <span className={valueClass}>{statDisplays[stat.id]}</span>
                <span className="blueprint-stat-label">{stat.label}</span>
              </div>
            );
          })}
        </div>


        <div className="blueprint-cta" data-reveal data-reveal-index="13">
          <a className="blueprint-cta-button" href="#contact">
            <span className="ss-text-gradient">Join the Labs Beta Program</span>
          </a>
        </div>
      </div>
    </section>
  );
}

type UseCountUpOptions = {
  target: number;
  durationMs: number;
  isActive: boolean;
  reducedMotion: boolean;
  onDone?: () => void;
};

function useCountUp({ target, durationMs, isActive, reducedMotion, onDone }: UseCountUpOptions) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setValue(0);
      return;
    }

    if (reducedMotion || typeof window === "undefined") {
      setValue(target);
      onDone?.();
      return;
    }

    let frame: number;
    let start: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = easeOut(progress);
      setValue(target * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };

    frame = window.requestAnimationFrame(step);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [durationMs, isActive, onDone, reducedMotion, target]);

  return value;
}
