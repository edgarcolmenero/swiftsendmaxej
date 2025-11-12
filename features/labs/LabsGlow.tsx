"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * SwiftSend — Labs Section (TSX)
 * - Reveal-on-view for items
 * - Starfield builder (CSS-powered twinkles)
 * - Parallax glow orb on scroll (desktop only)
 * - “Comet rail” micro animation on hover / first reveal
 * - Reduced-motion safe
 *
 * NOTE: Only edits to this existing file. No new files created.
 */

type LabsItem = {
  id: string;
  title: string;
  blurb: string;
  status: "Beta" | "Live" | "Coming Soon" | "Prototype";
  accent: "orange" | "green" | "cyan" | "purple" | "rose" | "blueCyan";
  statusClass:
    | "labs-status--beta"
    | "labs-status--live"
    | "labs-status--coming"
    | "labs-status--prototype"
    | "labs-status--beta-alt";
  href: string;
  icon: string; // inline SVG string
};

export default function Labs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  const isBrowser = typeof window !== "undefined";
  const items: LabsItem[] = useMemo(
    () => [
      {
        id: "swiftpay-mini",
        title: "SwiftPay Mini",
        blurb: "One-page checkout links with auto receipts.",
        status: "Beta",
        accent: "orange",
        statusClass: "labs-status--beta",
        href: "#",
        icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5.5" y="7.5" width="21" height="13" rx="2.6" ry="2.6"></rect><path d="M5 13.5h22"></path><path d="M10.5 17h6" stroke-linecap="round"></path><path d="M8.5 22.5h6.5" stroke-linecap="round"></path></svg>`,
      },
      {
        id: "site-in-a-day",
        title: "Site-in-a-Day",
        blurb: "Flat-rate, brand-colored sites shipped fast.",
        status: "Live",
        accent: "green",
        statusClass: "labs-status--live",
        href: "#",
        icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="6.5" width="22" height="18" rx="3" ry="3"></rect><path d="M5 12.5h22"></path><path d="M11 18.5h6" stroke-linecap="round"></path><path d="M11 22.5h10" stroke-linecap="round"></path></svg>`,
      },
      {
        id: "fee-optimizer",
        title: "Fee Optimizer Widget",
        blurb: `"Pay by Bank & save" nudges + estimator.`,
        status: "Coming Soon",
        accent: "cyan",
        statusClass: "labs-status--coming",
        href: "#",
        icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="9"></circle><path d="M16 10v12" stroke-linecap="round"></path><path d="M12 14h8" stroke-linecap="round"></path><path d="M12 18h4" stroke-linecap="round"></path></svg>`,
      },
      {
        id: "leads-autopilot",
        title: "Leads Autopilot",
        blurb: "Form → CRM → AI triage → calendar booking.",
        status: "Beta",
        accent: "purple",
        statusClass: "labs-status--beta",
        href: "#",
        icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8.5 9.5h15" stroke-linecap="round"></path><path d="M8.5 15.5h10" stroke-linecap="round"></path><path d="M8.5 21.5h5.5" stroke-linecap="round"></path><path d="M21 15.5 24.5 19l-3.5 3.5" stroke-linecap="round"></path></svg>`,
      },
      {
        id: "doc-copilot",
        title: "Doc Copilot",
        blurb: "PDFs into Q&A bots with citations.",
        status: "Prototype",
        accent: "rose",
        statusClass: "labs-status--prototype",
        href: "#",
        icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 6.5h9.5L25.5 12v13.5H11z"></path><path d="M20 6.5v6h6" stroke-linecap="round"></path><path d="M14 16.5h8" stroke-linecap="round"></path><path d="M14 20.5h5" stroke-linecap="round"></path></svg>`,
      },
      {
        id: "site-health-monitor",
        title: "Site Health Monitor",
        blurb: "Uptime + Lighthouse snapshots with alerts.",
        status: "Beta",
        accent: "blueCyan",
        statusClass: "labs-status--beta-alt",
        href: "#",
        icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.5 22.5 11 14.5l4 7 4.5-10 5 11" stroke-linecap="round"></path><path d="M6 25.5h20" stroke-linecap="round"></path><path d="M7.5 9.5h17" stroke-linecap="round"></path></svg>`,
      },
    ],
    []
  );

  // Reveal-on-view & dynamic build
  useEffect(() => {
    const section = sectionRef.current;
    if (!isBrowser || !section) return;

    document.body.classList.add("is-labs-js");

    // Build cards
    const grid = gridRef.current!;
    if (grid && !grid.hasChildNodes()) {
      const frag = document.createDocumentFragment();
      items.forEach((item, idx) => {
        const li = document.createElement("li");
        li.className = `labs-card labs-card--${item.accent}`;
        li.setAttribute("role", "article");
        li.dataset.reveal = "";
        li.dataset.revealIndex = String(idx + 2);

        const status = document.createElement("span");
        status.className = `labs-status ${item.statusClass}`;
        status.textContent = item.status;

        const iconWrap = document.createElement("div");
        iconWrap.className = "labs-icon";
        iconWrap.innerHTML = item.icon;
        iconWrap.setAttribute("aria-hidden", "true");

        const body = document.createElement("div");
        body.className = "labs-card-body";

        const h3 = document.createElement("h3");
        h3.className = "labs-card-title";
        h3.textContent = item.title;

        const p = document.createElement("p");
        p.className = "labs-card-blurb";
        p.textContent = item.blurb;

        const cta = document.createElement("a");
        cta.className = "labs-cta";
        cta.href = item.href;
        cta.textContent = "Learn More";

        const rail = document.createElement("div");
        rail.className = "labs-rail labs-rail--comet";

        body.append(h3, p, cta, rail);
        li.append(iconWrap, status, body);
        frag.appendChild(li);
      });
      grid.appendChild(frag);
    }

    // Build twinkle points once
    const stars = starsRef.current!;
    if (stars && !stars.dataset.built) {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const starCount = (desktop ? 60 : 30) + Math.floor(Math.random() * 40);
      const glowCount = (desktop ? 10 : 6) + Math.floor(Math.random() * 10);
      const make = (cls: string, style: Record<string, string>) => {
        const el = document.createElement("span");
        el.className = cls;
        Object.entries(style).forEach(([k, v]) => el.style.setProperty(k, v));
        stars.appendChild(el);
      };
      const rand = (a: number, b: number) => Math.random() * (b - a) + a;

      for (let i = 0; i < starCount; i++) {
        make("labs-star", {
          "--left": `${rand(-4, 104).toFixed(2)}%`,
          "--top": `${rand(-6, 106).toFixed(2)}%`,
          "--size": `${rand(1, 2.2).toFixed(2)}px`,
          "--twinkle-duration": `${rand(2.5, 5).toFixed(2)}s`,
          "--twinkle-delay": `${rand(0, 3).toFixed(2)}s`,
          "--twinkle-min": rand(0.32, 0.52).toFixed(2),
          "--twinkle-max": rand(0.65, 0.95).toFixed(2),
        });
      }
      for (let i = 0; i < glowCount; i++) {
        make("labs-glow", {
          "--left": `${rand(-8, 108).toFixed(2)}%`,
          "--top": `${rand(-12, 112).toFixed(2)}%`,
          "--size": `${rand(3.2, 6.4).toFixed(2)}px`,
          "--twinkle-duration": `${rand(3, 5.4).toFixed(2)}s`,
          "--twinkle-delay": `${rand(0, 3).toFixed(2)}s`,
          "--twinkle-min": rand(0.18, 0.32).toFixed(2),
          "--twinkle-max": rand(0.5, 0.78).toFixed(2),
          "--blur": `${rand(4, 8).toFixed(2)}px`,
        });
      }
      stars.dataset.built = "true";
    }

    // Reveal-on-view + comet trigger
    const revealEls = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();
    const cooldown = new WeakMap<Element, number>();
    const canComet = () => !reduced;
    const playComet = (rail: Element | null) => {
      if (!rail || !canComet()) return;
      rail.classList.remove("is-playing");
      requestAnimationFrame(() => rail.classList.add("is-playing"));
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting || seen.has(e.target)) return;
            seen.add(e.target);
            const idx = Number((e.target as HTMLElement).dataset.revealIndex || 0);
            const delay = Math.min(80 + idx * 20, 220);
            setTimeout(() => {
              (e.target as HTMLElement).classList.add("is-in");
              if ((e.target as HTMLElement).classList.contains("labs-card")) {
                const rail = e.target.querySelector(".labs-rail--comet");
                const now = performance.now();
                if ((cooldown.get(e.target) ?? 0) + 1500 < now) {
                  cooldown.set(e.target, now);
                  playComet(rail);
                }
              }
            }, delay);
            io.unobserve(e.target);
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -10%" }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-in"));
    }

    // Parallax orb (desktop only)
    const orb = orbRef.current;
    let raf: number | null = null;
    const desktopMQ = window.matchMedia("(min-width: 768px)");
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tick = () => {
      raf = null;
      if (!orb) return;
      const allow = desktopMQ.matches && !reducedMQ.matches;
      if (!allow) {
        orb.style.transform = "translate3d(0,0,0)";
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(Math.max(1 - (rect.top + rect.height * 0.5) / (vh + rect.height), -1), 1);
      const y = Math.max(Math.min(progress * 12, 10), -10);
      const x = Math.max(Math.min(progress * 6, 5), -5);
      orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const req = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req, { passive: true });
    desktopMQ.addEventListener?.("change", req);
    reducedMQ.addEventListener?.("change", req);

    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      desktopMQ.removeEventListener?.("change", req);
      reducedMQ.removeEventListener?.("change", req);
    };
  }, [items, isBrowser]);

  return (
    <section
      id="labs"
      className="anchor-section labs-section scroll-mt-24"
      aria-labelledby="labs-title"
      ref={sectionRef}
      data-testid="section-labs"
    >
      <div className="labs-backdrop pointer-events-none" aria-hidden="true" />
      <div className="labs-inner">
        <div className="labs-stars pointer-events-none" aria-hidden="true" ref={starsRef}>
          <div className="labs-orb" data-labs-orb aria-hidden="true" ref={orbRef} />
        </div>

        <header className="labs-head">
          <h2 id="labs-title" className="labs-title" data-reveal data-reveal-index="0">
            SwiftSend <span className="labs-title-gradient">Labs</span>
          </h2>
          <div className="labs-subtitle" data-reveal data-reveal-index="1">
            <p>Affordable, Personalized, Innovative</p>
            <p>Labs = testing ground for affordable experiments clients can actually use.</p>
          </div>
        </header>

        <ul className="labs-grid" role="list" data-labs-grid ref={gridRef} />

        <div className="labs-beta-cta" data-reveal data-reveal-index="8">
          <a className="labs-beta-button" href="#save">
            Join the Labs Beta Program
          </a>
        </div>
      </div>
    </section>
  );
}
