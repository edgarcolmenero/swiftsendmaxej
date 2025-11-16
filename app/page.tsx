"use client";

import Labs from "@/features/labs/LabsGlow";
import { Process } from "@/app/(site)/sections/Process";
import { Services } from "@/app/(site)/sections/Services";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const LaunchVelocityIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.45" role="presentation" aria-hidden="true">
    <path
      d="M6.5 21c0-5.25 4.25-9.5 9.5-9.5s9.5 4.25 9.5 9.5"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path d="M10 17.2 7.9 15.1" stroke="currentColor" strokeLinecap="round" />
    <path d="M22 17.2 24.1 15.1" stroke="currentColor" strokeLinecap="round" />
    <path d="M16 18.8 21 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="21" r="1.1" fill="currentColor" />
    <path d="M9 24h14" stroke="currentColor" strokeLinecap="round" />
    <path d="M12 24.5v2.4" stroke="currentColor" strokeLinecap="round" />
    <path d="M20 24.5v2.4" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

const InfrastructureIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.45" role="presentation" aria-hidden="true">
    <rect x="5.5" y="5.5" width="21" height="21" rx="5" stroke="currentColor" />
    <path d="M10 5.5v3" stroke="currentColor" strokeLinecap="round" />
    <path d="M22 5.5v3" stroke="currentColor" strokeLinecap="round" />
    <path d="M10 26.5v-3" stroke="currentColor" strokeLinecap="round" />
    <path d="M22 26.5v-3" stroke="currentColor" strokeLinecap="round" />
    <path d="M5.5 16h3" stroke="currentColor" strokeLinecap="round" />
    <path d="M26.5 16h-3" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M19.8 12.4c-.8-1.1-2.1-1.7-3.8-1.7-2.1 0-3.7 1-3.7 2.6s1.1 2.2 3.2 2.6l1.7.3c2 .4 3 1 3 2.6s-1.7 2.8-4 2.8c-1.9 0-3.4-.9-4-2.3"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path d="M16 9.6v13" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

const ReliabilityIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.45" role="presentation" aria-hidden="true">
    <path
      d="M16 5.5 8.65 8.02a1 1 0 0 0-.65.94V15c0 5.43 3.47 10.49 7.74 12.33.3.13.64.13.94 0C21.94 25.49 25 20.43 25 15V8.96a1 1 0 0 0-.65-.94Z"
      stroke="currentColor"
      strokeLinejoin="round"
    />
    <path d="M11.5 17.2c1.2-1.4 2.8-2.1 4.5-2.1s3.3.7 4.5 2.1" stroke="currentColor" strokeLinecap="round" />
    <path d="M13.8 20.6a3.4 3.4 0 0 1 4.4 0" stroke="currentColor" strokeLinecap="round" />
    <path d="M12.5 21.8l1.6 2.4 2.1-3 1.8 2.4h3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type HeroStatDefinition = {
  key: string;
  title: string;
  description: string;
  label?: string;
  tone: "velocity" | "infrastructure" | "reliability";
  icon: () => JSX.Element;
  renderValue: () => JSX.Element;
};

const HERO_STATS: HeroStatDefinition[] = [
  {
    key: "launch",
    title: "Launch Velocity",
    description: "Production-ready systems delivered fast.",
    tone: "velocity",
    icon: LaunchVelocityIcon,
    renderValue: () => (
      <p
        className="hero-stat__value hero-stat__value--range"
        aria-label="Six to eight week delivery timeline"
        aria-live="polite"
      >
        <span data-count-target="6" data-count-start="0" data-count-duration="1200" data-count-format="number">
          6
        </span>
        <span className="hero-stat__range-divider" aria-hidden="true">
          –
        </span>
        <span data-count-target="8" data-count-start="0" data-count-duration="1400" data-count-format="number">
          8
        </span>
        <span className="hero-stat__suffix">weeks</span>
      </p>
    ),
  },
  {
    key: "enterprise",
    title: "Enterprise-Scale Infrastructure",
    description: "Digital infrastructure powering a high-growth, nine-figure operation.",
    tone: "infrastructure",
    label: "Commerce Supported",
    icon: InfrastructureIcon,
    renderValue: () => (
      <p className="hero-stat__value" aria-label="Over one hundred million dollars in commerce supported" aria-live="polite">
        <span
          data-count-target="100000000"
          data-count-start="0"
          data-count-duration="1800"
          data-count-format="compactCurrency"
          data-count-suffix="+"
        >
          $100M+
        </span>
      </p>
    ),
  },
  {
    key: "reliability",
    title: "System Reliability",
    description: "Enterprise-grade stability across every deployment.",
    tone: "reliability",
    label: "Uptime",
    icon: ReliabilityIcon,
    renderValue: () => (
      <p className="hero-stat__value" aria-label="Ninety-nine point ninety-nine percent uptime" aria-live="polite">
        <span
          data-count-target="99.99"
          data-count-start="0"
          data-count-duration="1600"
          data-count-format="number"
          data-count-decimals="2"
          data-count-suffix="%"
        >
          99.99%
        </span>
      </p>
    ),
  },
];

// SwiftSend: placeholder scaffold added 2025-10-07T23:34:08Z — real implementation to follow
export default function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = document.getElementById("fx-stars") as HTMLCanvasElement | null;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReduced = mediaQuery.matches;

    type Star = {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      offset: number;
    };

    let stars: Star[] = [];
    let animationFrameId: number | null = null;
    let resizeTimer: number | undefined;

    const generateStars = (width: number, height: number) => {
      const starTotal = 160;
      stars = Array.from({ length: starTotal }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        baseAlpha: 0.2 + Math.random() * 0.4,
        twinkleSpeed: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
      }));
    };

    const setCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      generateStars(innerWidth, innerHeight);
    };

    const drawFrame = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const alpha = isReduced
          ? star.baseAlpha
          : star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.offset) * 0.25;
        context.globalAlpha = Math.min(1, Math.max(0.1, alpha));
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = "#f4f0ff";
        context.fill();
      });

      context.globalAlpha = 1;
    };

    const startAnimation = () => {
      if (isReduced) {
        drawFrame(performance.now());
        return;
      }

      const render = (timestamp: number) => {
        drawFrame(timestamp);
        animationFrameId = window.requestAnimationFrame(render);
      };

      animationFrameId = window.requestAnimationFrame(render);
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(() => {
        setCanvasSize();
        if (isReduced) {
          drawFrame(performance.now());
        }
      }, 180);
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      isReduced = event.matches;
      stopAnimation();
      if (isReduced) {
        drawFrame(performance.now());
      } else {
        startAnimation();
      }
    };

    setCanvasSize();
    startAnimation();

    window.addEventListener("resize", handleResize);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.location.hash) {
      return;
    }

    const scrollToHash = () => {
      const targetId = window.location.hash.replace("#", "");
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      const header = document.querySelector<HTMLElement>("[data-header]");
      const headerHeight = header?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

      window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
    };

    const timeoutId = window.setTimeout(scrollToHash, 80);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const field = document.querySelector<HTMLDivElement>(".spark-field");
    if (!field) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReduced = mediaQuery.matches;

    const generateSparks = () => {
      field.innerHTML = "";

      const total = 36;
      for (let i = 0; i < total; i += 1) {
        const spark = document.createElement("span");
        spark.className = "spark";

        if (Math.random() < 0.22) {
          spark.classList.add(Math.random() < 0.5 ? "purple" : "orange");
        }

        spark.style.setProperty("--l", `${(Math.random() * 100).toFixed(2)}%`);
        spark.style.setProperty("--t", `${(Math.random() * 100).toFixed(2)}%`);
        spark.style.setProperty("--sz", `${(Math.random() * 6 + 2).toFixed(2)}px`);

        const floatDuration = (Math.random() * 4 + 6).toFixed(2);
        const twinkleDuration = (Math.random() * 2 + 3).toFixed(2);
        const amplitude = (Math.random() * 18 + 6).toFixed(2);
        const delayOne = (Math.random() * 6).toFixed(2);
        const delayTwo = (Math.random() * 5).toFixed(2);

        spark.style.setProperty("--dur", isReduced ? "0s" : `${floatDuration}s`);
        spark.style.setProperty("--tw", isReduced ? "0s" : `${twinkleDuration}s`);
        spark.style.setProperty("--amp", isReduced ? "0px" : `${amplitude}px`);
        spark.style.setProperty("--d1", isReduced ? "0s" : `${delayOne}s`);
        spark.style.setProperty("--d2", isReduced ? "0s" : `${delayTwo}s`);

        if (isReduced) {
          spark.style.setProperty("--spark-opacity", `${(0.3 + Math.random() * 0.4).toFixed(2)}`);
        }

        field.appendChild(spark);
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      isReduced = event.matches;
      generateSparks();
    };

    generateSparks();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      field.innerHTML = "";
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero || hero.dataset.heroReady === "enhanced") return;
    hero.dataset.heroReady = "enhanced";

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduceMotion = () => reduceMotionQuery.matches;
    const supportsIntersectionObserver = "IntersectionObserver" in window;
    const shouldAnimateMotion = () => supportsIntersectionObserver && !shouldReduceMotion();

    const revealables = Array.from(
      hero.querySelectorAll<HTMLElement>('[data-hero-reveal]')
    );
    const counters = Array.from(
      hero.querySelectorAll<HTMLElement>('[data-count-target]')
    );

    if (shouldAnimateMotion()) {
      revealables.forEach((el) => el.classList.add("is-prepped"));
    }

    const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const applyValue = (element: HTMLElement, value: number) => {
      const format = element.dataset.countFormat ?? "number";
      const decimals = Number(element.dataset.countDecimals ?? "0");
      const suffix = element.dataset.countSuffix ?? "";
      let text: string;

      if (format === "compactCurrency") {
        text = compactCurrencyFormatter.format(value);
      } else if (format === "currency") {
        text = currencyFormatter.format(value);
      } else {
        if (decimals > 0) {
          text = value.toFixed(decimals);
        } else {
          const safeValue = value < 0 ? 0 : value;
          text = Math.floor(safeValue).toString();
        }
      }

      element.textContent = `${text}${suffix}`;
    };

    const setInitialValues = () => {
      counters.forEach((counter) => {
        const targetValue = Number(counter.dataset.countTarget ?? "0");
        const startValue = Number(counter.dataset.countStart ?? "0");
        const value = shouldAnimateMotion() ? startValue : targetValue;
        applyValue(counter, value);
      });
    };

    setInitialValues();

    let animatedCounters = new WeakSet<HTMLElement>();
    const rafMap = new Map<HTMLElement, number>();

    const animateCounter = (counter: HTMLElement) => {
      if (animatedCounters.has(counter)) return;

      const targetValue = Number(counter.dataset.countTarget ?? "0");
      if (!Number.isFinite(targetValue)) return;

      if (!shouldAnimateMotion()) {
        applyValue(counter, targetValue);
        animatedCounters.add(counter);
        return;
      }

      const startValue = Number(counter.dataset.countStart ?? "0");
      const duration = Number(counter.dataset.countDuration ?? "1400");

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const startTimestamp = performance.now();
      animatedCounters.add(counter);

      const tick = (now: number) => {
        const progress = Math.min((now - startTimestamp) / duration, 1);
        const eased = easeOutCubic(progress);
        const currentValue = startValue + (targetValue - startValue) * eased;

        if (progress >= 1) {
          applyValue(counter, targetValue);
          rafMap.delete(counter);
          return;
        }

        applyValue(counter, currentValue);
        const rafId = requestAnimationFrame(tick);
        rafMap.set(counter, rafId);
      };

      const rafId = requestAnimationFrame(tick);
      rafMap.set(counter, rafId);
    };

    const revealElement = (element: HTMLElement) => {
      element.classList.add("is-visible");
      element.classList.remove("is-prepped");
      element.style.removeProperty("--hero-delay");
      if (!shouldAnimateMotion()) {
        return;
      }
      element
        .querySelectorAll<HTMLElement>('[data-count-target]')
        .forEach(animateCounter);
    };

    const assignDelays = () => {
      if (!shouldAnimateMotion()) {
        revealables.forEach((el) => el.style.removeProperty("--hero-delay"));
        return;
      }

      revealables.forEach((el) => {
        const order = Number(el.dataset.heroOrder ?? "0");
        const clamped = Math.max(0, Math.min(order, 8));
        el.style.setProperty("--hero-delay", `${clamped * 90}ms`);
      });
    };

    assignDelays();

    let observer: IntersectionObserver | null = null;

    const startObserver = () => {
      if (observer || !shouldAnimateMotion()) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            revealElement(target);
            observer?.unobserve(target);
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
      );

      revealables
        .filter((el) => !el.classList.contains("is-visible"))
        .forEach((el) => observer?.observe(el));
    };

    const stopObserver = () => {
      if (!observer) return;
      observer.disconnect();
      observer = null;
    };

    if (!shouldAnimateMotion()) {
      revealables.forEach(revealElement);
    } else {
      // For hero section, immediately reveal elements that are in viewport
      // to avoid the disappearing bug on initial load
      const heroRect = hero.getBoundingClientRect();
      const isHeroInView = heroRect.top < window.innerHeight && heroRect.bottom > 0;
      
      if (isHeroInView) {
        // Hero is in viewport on load, reveal immediately with staggered delays
        revealables.forEach((el) => {
          const delay = parseInt(el.style.getPropertyValue("--hero-delay") || "0", 10);
          setTimeout(() => revealElement(el), delay);
        });
      } else {
        // Hero not in viewport, use observer
        startObserver();
      }
    }

    const cancelAllRafs = () => {
      rafMap.forEach((rafId) => cancelAnimationFrame(rafId));
      rafMap.clear();
    };

    const handleMotionChange = () => {
      cancelAllRafs();
      animatedCounters = new WeakSet<HTMLElement>();
      setInitialValues();
      assignDelays();

      if (!shouldAnimateMotion()) {
        stopObserver();
        revealables.forEach(revealElement);
        return;
      }

      revealables.forEach((el) => {
        el.classList.add("is-prepped");
        el.classList.remove("is-visible");
      });

      stopObserver();
      startObserver();
    };

    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", handleMotionChange);
    } else {
      reduceMotionQuery.addListener(handleMotionChange);
    }

    return () => {
      stopObserver();
      cancelAllRafs();
      if (typeof reduceMotionQuery.removeEventListener === "function") {
        reduceMotionQuery.removeEventListener("change", handleMotionChange);
      } else {
        reduceMotionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Portfolio section: starfield + reveals + hover polish
    (() => {
      const section = document.getElementById("portfolio") as HTMLElement | null;
      if (!section) return;

      if (section.dataset.portfolioInit === "done") return;
      section.dataset.portfolioInit = "done";

      const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const prefersReduced = () => mqReduce.matches;

      const starRoot =
        (section.querySelector(".pf-stars") as HTMLDivElement | null) ??
        (() => {
          const n = document.createElement("div");
          n.className = "pf-stars";
          section.insertBefore(n, section.firstChild);
          return n;
        })();

      const makeStars = () => {
        if (!starRoot) return;
        starRoot.innerHTML = "";
        const wide = window.matchMedia("(min-width: 720px)").matches;
        const count = wide ? 110 : 70;

        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
          const s = document.createElement("span");
          s.className = "pf-star";
          const left = Math.random() * 120 - 10;
          const top = Math.random() * 120 - 10;
          const size = (Math.random() * 1.6 + 0.8).toFixed(2);
          const d = (Math.random() * 4 + 3).toFixed(2);
          const delay = (Math.random() * 3).toFixed(2);
          const min = (Math.random() * 0.35 + 0.25).toFixed(2);
          const max = (Number(min) + Math.random() * 0.4 + 0.25).toFixed(2);
          const palette = [
            "rgba(255,255,255,0.95)",
            "rgba(214,60,255,0.85)",
            "rgba(255,140,64,0.75)",
            "rgba(123,206,255,0.85)",
          ];
          s.style.setProperty("--left", `${left}%`);
          s.style.setProperty("--top", `${top}%`);
          s.style.setProperty("--size", `${size}px`);
          s.style.setProperty("--twinkle-duration", `${d}s`);
          s.style.setProperty("--twinkle-delay", `${delay}s`);
          s.style.setProperty("--twinkle-min", min);
          s.style.setProperty("--twinkle-max", max);
          s.style.setProperty("--color", palette[(Math.random() * palette.length) | 0]);
          frag.appendChild(s);
        }
        starRoot.appendChild(frag);
      };

      let rafId: number | null = null;
      const parallax = () => {
        rafId = null;
        if (!starRoot) return;
        if (prefersReduced()) {
          starRoot.style.transform = "translate3d(0,0,0)";
          return;
        }
        const r = section.getBoundingClientRect();
        const vh = Math.max(1, window.innerHeight);
        const centerProgress = 1 - (r.top + r.height * 0.5) / (vh + r.height);
        const y = Math.max(-10, Math.min(10, centerProgress * 10));
        const x = Math.max(-6, Math.min(6, centerProgress * 6));
        starRoot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const scheduleParallax = () => {
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(parallax);
      };

      makeStars();
      window.addEventListener("scroll", scheduleParallax, { passive: true });
      window.addEventListener("resize", () => {
        makeStars();
        scheduleParallax();
      });
      if (typeof mqReduce.addEventListener === "function") {
        mqReduce.addEventListener("change", () => {
          makeStars();
          scheduleParallax();
        });
      } else if (typeof (mqReduce as any).addListener === "function") {
        (mqReduce as any).addListener(() => {
          makeStars();
          scheduleParallax();
        });
      }

      const cards = Array.from(section.querySelectorAll<HTMLElement>(".pf-card"));
      const title = section.querySelector<HTMLElement>(".portfolio__title");
      const lede = section.querySelector<HTMLElement>(".portfolio__lede");
      const revealables = [title, lede, ...cards].filter(Boolean) as HTMLElement[];

      if (!revealables.length) return;

      section.classList.add("is-enhanced");

      const STAGGER_STEP = 0.07;
      revealables.forEach((el, i) => el.style.setProperty("--io-delay", `${(i * STAGGER_STEP).toFixed(2)}s`));

      const FILL_BASE_DELAY = 140;
      const FILL_STAGGER_MS = 70;
      cards.forEach((card, i) => {
        const target = card as HTMLElement & { dataset: DOMStringMap & { fillDelay?: string } };
        target.dataset.fillDelay = String(i * FILL_STAGGER_MS);
      });

      const pending = new Set<HTMLElement>(revealables);

      const onIntersect: IntersectionObserverCallback = (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const tgt = entry.target as HTMLElement;
          tgt.classList.add("is-inview");
          pending.delete(tgt);
          obs.unobserve(tgt);

          if (tgt.classList.contains("pf-card")) {
            const delay = Number((tgt as HTMLElement & { dataset: DOMStringMap & { fillDelay?: string } }).dataset.fillDelay || 0);
            if (prefersReduced()) {
              tgt.classList.add("is-filled");
            } else {
              window.setTimeout(() => tgt.classList.add("is-filled"), FILL_BASE_DELAY + delay);
            }
          }
        }
        if (!pending.size) obs.disconnect();
      };

      const io = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.35,
      });
      pending.forEach((el) => io.observe(el));

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) io.disconnect();
        else pending.forEach((el) => io.observe(el));
      });

      const toggleHot = (card: HTMLElement, on: boolean) => {
        if (prefersReduced() && !on) card.classList.remove("is-hot");
        else card.classList.toggle("is-hot", on);
      };
      const finePointer = window.matchMedia("(pointer:fine)").matches;
      cards.forEach((card) => {
        if (finePointer) {
          card.addEventListener("mouseenter", () => toggleHot(card, true), { passive: true });
          card.addEventListener("mouseleave", () => toggleHot(card, false), { passive: true });
        }
        card.addEventListener("focusin", () => toggleHot(card, true));
        card.addEventListener("focusout", (e) => {
          const next = (e as FocusEvent).relatedTarget as Node | null;
          if (!next || !card.contains(next)) toggleHot(card, false);
        });
      });
    })();

    // Contact section: starfield + form UX + savings estimator
    (() => {
      const section = document.querySelector<HTMLElement>('[data-contact-section]');
      if (!section) return;
      const sectionEl = section;

      const prefersReducedMotion =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)')
          : (null as unknown as MediaQueryList);

      const reduceMotion = () => !!prefersReducedMotion && prefersReducedMotion.matches;

      // ---------- Starfield (canvas) ----------
      const canvas = sectionEl.querySelector<HTMLCanvasElement>('#contact-stars');
      const ctx = canvas ? canvas.getContext('2d') : null;

      interface Star {
        x: number;
        y: number;
        radius: number;
        speed: number;
        drift: number;
        parallax: number;
        color: string;
        alpha: number;
      }

      let width = 0;
      let height = 0;
      let dpr = 1;
      let stars: Star[] = [];
      let rafId: number | null = null;
      let isInView = false;
      let scrollOffset = 0;
      let resizeTimer: number | null = null;
      let observer: IntersectionObserver | null = null;
      let scrollScheduled = false;

      const STAR_COLORS = [
        'rgba(255,255,255,0.85)',
        'rgba(214,60,255,0.78)',
        'rgba(255,150,43,0.72)',
      ] as const;

      function initStars(): void {
        const count = 80 + Math.floor(Math.random() * 41); // 80–121
        stars = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.6 + Math.random() * 1.6,
          speed: 0.08 + Math.random() * 0.12,
          drift: (Math.random() - 0.5) * 0.05,
          parallax: 0.04 + Math.random() * 0.18,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          alpha: 0.45 + Math.random() * 0.45,
        }));
      }

      function sizeCanvas(): void {
        if (!canvas || !ctx) return;
        const rect = sectionEl.getBoundingClientRect();
        width = Math.max(1, Math.floor(rect.width));
        height = Math.max(1, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        initStars();
        renderFrame(true);
      }

      function renderFrame(skipUpdate = false): void {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        const parallaxShift = scrollOffset * 0.12;

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          if (!skipUpdate && !reduceMotion()) {
            s.y += s.speed;
            s.x += s.drift;

            if (s.y > height + 20) s.y = -20;
            if (s.x > width + 20) s.x = -20;
            else if (s.x < -20) s.x = width + 20;
          }

          const drawY = s.y + parallaxShift * s.parallax;
          ctx.globalAlpha = s.alpha;
          ctx.beginPath();
          ctx.fillStyle = s.color;
          ctx.arc(s.x, drawY, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (!skipUpdate && !reduceMotion() && isInView) {
          rafId = window.requestAnimationFrame(() => renderFrame(false));
        }
      }

      function startStars(): void {
        if (reduceMotion()) {
          renderFrame(true);
          return;
        }
        if (rafId == null) {
          rafId = window.requestAnimationFrame(() => renderFrame(false));
        }
      }

      function stopStars(): void {
        if (rafId != null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
      }

      function handleScroll(): void {
        if (reduceMotion() || !isInView) return;
        if (scrollScheduled) return;
        scrollScheduled = true;
        window.requestAnimationFrame(() => {
          scrollScheduled = false;
          const rect = sectionEl.getBoundingClientRect();
          const visible = Math.max(0, Math.min(rect.height, window.innerHeight - rect.top));
          scrollOffset = visible * 0.2;
        });
      }

      function handleResize(): void {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => sizeCanvas(), 150) as unknown as number;
      }

      if (canvas && ctx) {
        sizeCanvas();

        if (!reduceMotion()) {
          observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.target !== sectionEl) continue;
                isInView = entry.isIntersecting;
                if (isInView) startStars();
                else stopStars();
              }
            },
            { threshold: 0.15 }
          );
          observer.observe(sectionEl);
        } else {
          renderFrame(true);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
      }

      const handleMotionChange = (): void => {
        stopStars();
        sizeCanvas();
        if (!reduceMotion() && isInView) startStars();
      };

      if (prefersReducedMotion) {
        // modern + legacy listeners
        (prefersReducedMotion as any).addEventListener?.('change', handleMotionChange);
        (prefersReducedMotion as any).addListener?.(handleMotionChange);
      }

      // ---------- Card hover polish ----------
      sectionEl.querySelectorAll<HTMLElement>('.cardlike').forEach((card) => {
        const enter = () => card.classList.add('is-hover');
        const leave = (e?: FocusEvent) => {
          if (e && e.relatedTarget && card.contains(e.relatedTarget as Node)) return;
          card.classList.remove('is-hover');
        };
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', () => leave());
        card.addEventListener('focusin', enter);
        card.addEventListener('focusout', leave);
      });

      // ---------- Form validation + shimmer ----------
      const form = sectionEl.querySelector<HTMLFormElement>('#build-form');
      const statusEl = sectionEl.querySelector<HTMLElement>('#form-status');
      const submitBtn = form?.querySelector<HTMLButtonElement>('.cform__submit') || null;
      const inputs = form
        ? Array.from(
            form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
              '.cform__input'
            )
          )
        : [];

      function setStatus(message: string, variant?: 'is-success' | 'is-error'): void {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.classList.remove('is-success', 'is-error');
        if (variant) statusEl.classList.add(variant);
      }

      function validateForm(): boolean {
        if (!form) return false;
        const nameField = form.querySelector<HTMLInputElement>('#name');
        const emailField = form.querySelector<HTMLInputElement>('#email');

        if (nameField && nameField.value.trim() === '') {
          nameField.setAttribute('aria-invalid', 'true');
          setStatus('Please enter your name.', 'is-error');
          nameField.focus();
          return false;
        }

        if (emailField) {
          const emailValue = emailField.value.trim();
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailValue)) {
            emailField.setAttribute('aria-invalid', 'true');
            setStatus('Enter a valid email address.', 'is-error');
            emailField.focus();
            return false;
          }
        }

        setStatus('Thanks! We’ll be in touch within 24 hours.', 'is-success');
        return true;
      }

      function clearFieldState(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
        field.removeAttribute('aria-invalid');
      }

      if (form) {
        form.addEventListener('submit', (ev) => {
          ev.preventDefault();
          inputs.forEach(clearFieldState);
          const ok = validateForm();
          if (ok && submitBtn && !reduceMotion()) {
            submitBtn.classList.add('is-shimmer');
            window.setTimeout(() => submitBtn.classList.remove('is-shimmer'), 1200);
          }
        });

        form.addEventListener('input', (ev) => {
          const t = ev.target as EventTarget | null;
          if (
            t &&
            (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)
          ) {
            t.removeAttribute('aria-invalid');
            if (statusEl) {
              statusEl.textContent = '';
              statusEl.classList.remove('is-success', 'is-error');
            }
          }
        });
      }

      if (submitBtn) {
        const triggerShimmer = () => {
          if (reduceMotion()) return;
          submitBtn.classList.add('is-shimmer');
          window.setTimeout(() => submitBtn.classList.remove('is-shimmer'), 1200);
        };
        submitBtn.addEventListener('mouseenter', triggerShimmer);
        submitBtn.addEventListener('focus', triggerShimmer);
      }

      // ---------- Savings Estimator ----------
      const estimatorSelect = sectionEl.querySelector<HTMLSelectElement>('#ptype');
      const estimatorPlaceholder = sectionEl.querySelector<HTMLElement>('.est__placeholder');
      const estimatorResult = sectionEl.querySelector<HTMLElement>('.est__result');
      const estimatorPill = sectionEl.querySelector<HTMLElement>('[data-est-pill]');

      const savingsMap: Record<string, { text: string; tone: 'gold' | 'green' }> = {
        Starter: { text: 'Save ~10–20%', tone: 'gold' },
        Builder: { text: 'Save ~25–35%', tone: 'green' },
        Engine: { text: 'Save ~20–30%', tone: 'green' },
        Growth: { text: 'Save ~15–25%', tone: 'gold' },
      };

      function updateEstimator(value: string): void {
        if (!estimatorPlaceholder || !estimatorResult || !estimatorPill) return;
        const info = savingsMap[value];
        if (!info) {
          estimatorPlaceholder.hidden = false;
          estimatorResult.hidden = true;
          estimatorPill.textContent = '';
          estimatorPill.classList.remove('est__pill--gold', 'est__pill--green');
          return;
        }
        estimatorPlaceholder.hidden = true;
        estimatorResult.hidden = false;
        estimatorPill.textContent = info.text;
        estimatorPill.classList.remove('est__pill--gold', 'est__pill--green');
        estimatorPill.classList.add(info.tone === 'green' ? 'est__pill--green' : 'est__pill--gold');
      }

      if (estimatorSelect) {
        estimatorSelect.addEventListener('change', (e) => {
          const val = (e.target as HTMLSelectElement).value;
          updateEstimator(val);
        });
      }

      // ---------- Cleanup ----------
      function cleanup(): void {
        stopStars();
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        observer?.disconnect();
        if (prefersReducedMotion) {
          (prefersReducedMotion as any).removeEventListener?.('change', handleMotionChange);
          (prefersReducedMotion as any).removeListener?.(handleMotionChange);
        }
      }
      window.addEventListener('pagehide', cleanup, { once: true });
    })();
  }, []);

  return (
    <>
      <section id="home" data-hero className="hero scroll-mt-28 md:scroll-mt-32">
        <canvas id="fx-stars" aria-hidden="true" />
        <div className="spark-field" data-spark-field aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero__crest-wrap" aria-hidden="true" data-hero-reveal data-hero-order="0">
            <div className="hero__crest">
              <span className="hero__crest-neon" />
              <div className="hero__crest-inner">
                <span className="hero__crest-halo" />
                <img src="/brand/swiftsend-logo.png" alt="SwiftSend monogram" width={96} height={96} loading="lazy" />
              </div>
            </div>
          </div>
          <div className="hero__content">
            <span className="hero__badge" data-hero-reveal data-hero-order="1">
              FULL-STACK INNOVATION PARTNER
            </span>
            <h1 className="display hero__title" data-hero-reveal data-hero-order="2">
              <span className="hero__accent hero__accent--sunset">Your</span> Systems.
              <br />
              <span className="hero__accent hero__accent--violet">Your</span> Savings.
              <br />
              <span className="hero__accent hero__accent--aqua">Your</span> Future.
            </h1>
            <div className="hero__lede-block" data-hero-reveal data-hero-order="3">
              <p className="lede hero__lede">
                Full-stack engineering, intelligent automation, real-time data systems, and seamless digital experiences —
                delivered with precision and velocity.
              </p>
              <span className="hero__lede-line" aria-hidden="true" />
            </div>
            <div className="cta" data-hero-reveal data-hero-order="4">
              <a href="#contact" className="btn btn-primary btn-primary--purple-blue">
                Start a Build
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9h8.586l-2.793-2.793L10.5 5.5 15 10l-4.5 4.5-0.707-0.707L12.586 10H4V9z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#services" className="btn btn-ghost btn-ghost--night">
                Explore Services
              </a>
            </div>
          </div>
          <div className="hero__stats" role="list">
            {HERO_STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <article
                  key={stat.key}
                  className={`hero-stat pillar-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-transparent px-6 py-8 transition-all duration-500 ease-out sm:px-8 sm:py-10 hero-stat--${stat.tone}`}
                  data-hero-reveal
                  data-hero-order={5 + index}
                  role="listitem"
                >
                  <div className="card-accent" aria-hidden="true" />
                  <div className="card-glass" aria-hidden="true" />
                  <div className="card-border" aria-hidden="true" />

                  <div className="hero-stat__body relative z-10 flex h-full flex-col">
                    <div className="hero-stat__icon" aria-hidden="true">
                      <div className="icon-tile">
                        <div className="icon-tile__inner">
                          <Icon />
                        </div>
                      </div>
                    </div>
                    <div className="hero-stat__meta">
                      <h3 className="hero-stat__title">{stat.title}</h3>
                      {stat.renderValue()}
                      {stat.label ? <p className="hero-stat__label">{stat.label}</p> : null}
                    </div>
                    <p className="hero-stat__description">{stat.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <AboutSection />
      <Services />
      <section
        id="work"
        className="scroll-mt-28 md:scroll-mt-32"
        data-section="portfolio"
        aria-labelledby="portfolio-title"
      >
        <div id="portfolio" className="portfolio" aria-labelledby="portfolio-title">
          <div className="pf-stars" aria-hidden="true" />

          <div className="portfolio__inner">
            <header className="portfolio__head">
            <h2 id="portfolio-title" className="portfolio__title">
              Work That <span className="grad">Stands Out</span>
            </h2>
            <p className="portfolio__lede">Real projects, real results, real impact.</p>
          </header>

          <div className="portfolio__grid">
            <article className="pf-card" data-key="realtor" tabIndex={0} role="group">
              <div className="pf-card__media" aria-hidden="true">
                <img
                  src="/images/portfolio-realtor.jpg"
                  alt="Real estate platform interface"
                  loading="lazy"
                />
                <span className="pf-card__pill">Real Estate Platform</span>
                <button className="pf-card__ext" type="button" aria-label="Open RealtorDemo case study">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </button>
              </div>
              <div className="pf-card__body">
                <h3 className="pf-card__title">RealtorDemo</h3>
                <p className="pf-card__row">
                  <span className="label label--problem">Problem:</span> Traditional MLS listings with poor lead
                  generation
                </p>
                <p className="pf-card__row">
                  <span className="label label--build">Build:</span> Modern property search with integrated lead
                  capture system
                </p>
                <p className="pf-card__row">
                  <span className="label label--outcome">Outcome:</span> <span>+32% leads</span>{" "}
                  <span className="pf-card__trend" aria-hidden="true">
                    ▲
                  </span>
                </p>
                <div className="pf-card__bar">
                  <span className="pf-card__fill" />
                </div>
              </div>
            </article>

            <article className="pf-card" data-key="nailtech" tabIndex={0} role="group">
              <div className="pf-card__media" aria-hidden="true">
                <img
                  src="/images/portfolio-nailtech.jpg"
                  alt="Beauty &amp; wellness booking environment"
                  loading="lazy"
                />
                <span className="pf-card__pill">Beauty &amp; Wellness</span>
                <button className="pf-card__ext" type="button" aria-label="Open NailTechDemo case study">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </button>
              </div>
              <div className="pf-card__body">
                <h3 className="pf-card__title">NailTechDemo</h3>
                <p className="pf-card__row">
                  <span className="label label--problem">Problem:</span> Manual booking process losing potential clients
                </p>
                <p className="pf-card__row">
                  <span className="label label--build">Build:</span> Sleek booking system with integrated payments
                </p>
                <p className="pf-card__row">
                  <span className="label label--outcome">Outcome:</span> Dark elegance meets functionality
                </p>
                <div className="pf-card__bar">
                  <span className="pf-card__fill" />
                </div>
              </div>
            </article>

            <article className="pf-card" data-key="photographer" tabIndex={0} role="group">
              <div className="pf-card__media" aria-hidden="true">
                <img
                  src="/images/portfolio-photographer.jpg"
                  alt="Professional camera and lens"
                  loading="lazy"
                />
                <span className="pf-card__pill">Creative Services</span>
                <button className="pf-card__ext" type="button" aria-label="Open PhotographerDemo case study">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </button>
              </div>
              <div className="pf-card__body">
                <h3 className="pf-card__title">PhotographerDemo</h3>
                <p className="pf-card__row">
                  <span className="label label--problem">Problem:</span> Cumbersome photo proofing and booking workflow
                </p>
                <p className="pf-card__row">
                  <span className="label label--build">Build:</span> Streamlined gallery with integrated booking
                  system
                </p>
                <p className="pf-card__row">
                  <span className="label label--outcome">Outcome:</span> Creative-driven user experience
                </p>
                <div className="pf-card__bar">
                  <span className="pf-card__fill" />
                </div>
              </div>
            </article>
          </div>

            <div className="portfolio__cta">
              <a className="portfolio__link" href="#">
                View All Projects
              </a>
              <div className="portfolio__cta-underline">
                <span className="fill" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Labs />
      <Packs />
      <Process />
      <section
        id="contact"
        className="contact scroll-mt-28 md:scroll-mt-32"
        aria-labelledby="contact-title"
        data-contact-section
      >
        <canvas id="contact-stars" aria-hidden="true" />

        <div className="contact__inner">
          <header className="contact__head">
            <h2 id="contact-title" className="contact__title">
              Let’s Build <span className="grad-word">Together</span>
            </h2>
            <p className="contact__lede">
              Ready to transform your vision into reality? Get in touch and let’s start building.
            </p>
          </header>

          <div className="contact__grid">
            {/* Form */}
            <form className="cform cardlike" id="build-form" noValidate aria-describedby="form-status">
              <div className="cform__row">
                <label className="cform__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="cform__input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="cform__row">
                <label className="cform__label" htmlFor="email">
                  Email
                </label>
                <input
                  className="cform__input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="cform__row">
                <label className="cform__label" htmlFor="ptype">
                  Project Type
                </label>
                <div className="cform__selectWrap">
                  <select
                    className="cform__input cform__select"
                    id="ptype"
                    name="ptype"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select project type
                    </option>
                    <option>Starter</option>
                    <option>Builder</option>
                    <option>Engine</option>
                    <option>Growth</option>
                  </select>
                  <svg className="cform__chev" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M7 10l5 5 5-5z" />
                  </svg>
                </div>
              </div>

              <div className="cform__row">
                <label className="cform__label" htmlFor="industry">
                  Industry <span className="cform__opt">(optional)</span>
                </label>
                <input
                  className="cform__input"
                  id="industry"
                  name="industry"
                  type="text"
                  placeholder="e.g., Real Estate, E-commerce, Healthcare"
                />
              </div>

              <div className="cform__row cform__row--area">
                <label className="cform__label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="cform__input cform__area"
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={6}
                />
              </div>

              <p id="form-status" className="cform__status" aria-live="polite" />

              <button className="cform__submit" type="submit">
                <span>Start a Build</span>
                <svg viewBox="0 0 24 24" className="cform__spark" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2z"
                  />
                </svg>
              </button>
            </form>

            {/* Right stack */}
            <div className="contact__stack">
              {/* Estimator */}
              <section className="est cardlike" aria-labelledby="est-title">
                <div className="est__icon" aria-hidden="true">
                  <span className="est__iconWrap">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 4v2h8V6H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z"
                      />
                    </svg>
                  </span>
                </div>
                <h3 id="est-title" className="est__title">
                  Savings Estimator
                </h3>
                <p className="est__lede">See how much you could save with SwiftSend</p>

                <div className="est__panel" aria-live="polite">
                  <p className="est__placeholder">
                    Select a project type above to estimate your savings
                  </p>
                  <div className="est__result" hidden>
                    <span className="est__pill" data-est-pill />
                    <p className="est__note">Estimated savings vs. typical agency rates</p>
                  </div>
                </div>
              </section>

              {/* Get in Touch */}
              <section className="touch cardlike" aria-labelledby="touch-title">
                <h3 id="touch-title" className="touch__title">
                  Get in Touch
                </h3>
                <dl className="touch__list">
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href="mailto:hello@swiftsend.dev">hello@swiftsend.dev</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Instagram</dt>
                    <dd>
                      <a href="https://instagram.com/swiftsend.dev" target="_blank" rel="noopener">
                        @swiftsend.dev
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Response Time</dt>
                    <dd>Within 24 hours</dd>
                  </div>
                </dl>
                <blockquote className="touch__quote">“Building the future, one project at a time.”</blockquote>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Packs() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    document.body.classList.add("is-packs-js");

    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const syncReduced = (e?: MediaQueryList | MediaQueryListEvent) => {
      const on = !!(e && "matches" in e ? e.matches : mq?.matches);
      document.body.classList.toggle("is-packs-reduced", on);
    };
    if (mq) {
      syncReduced(mq);
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", syncReduced);
      // Safari
      // @ts-ignore
      else if (typeof mq.addListener === "function") mq.addListener(syncReduced);
    }

    const revealEls = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
      );
      revealEls.forEach((el) => io!.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-in"));
    }

    const bindHover = (el: Element) => {
      const card = el as HTMLElement;
      const enter = () => card.classList.add("is-hover");
      const leave = () => card.classList.remove("is-hover");

      if (window.matchMedia && window.matchMedia("(pointer:fine)").matches) {
        card.addEventListener("mouseenter", enter, { passive: true });
        card.addEventListener("mouseleave", leave, { passive: true });
      }
      card.addEventListener("focusin", enter);
      card.addEventListener("focusout", (e) => {
        if (!card.contains(e.relatedTarget as Node)) leave();
      });

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
        card.removeEventListener("focusin", enter);
        card.removeEventListener("focusout", leave as any);
      };
    };

    const unbinders: Array<() => void> = [];
    section.querySelectorAll(".pack, .addon").forEach((n) => unbinders.push(bindHover(n)));

    section.querySelectorAll<HTMLAnchorElement>(".pack__cta, .addons__cta").forEach((a) => {
      if (a.getAttribute("href") !== "#contact") a.setAttribute("href", "#contact");
    });

    return () => {
      io?.disconnect();
      unbinders.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="packs"
      className="packs scroll-mt-28 md:scroll-mt-32"
      aria-labelledby="packs-title"
      data-packs-section
      ref={sectionRef}
    >
      <div className="packs__inner">
        <header className="packs__head" data-reveal data-reveal-index="0">
          <h2 id="packs-title" className="packs__title">
            Choose Your <span className="grad-word">Pack</span>
          </h2>
          <p className="packs__lede">
            Transparent pricing for every stage of your digital journey
          </p>
        </header>

        <ul className="packs__grid" role="list" data-packs-grid data-reveal data-reveal-index="1">
          <li>
            <article
              className="pack"
              data-accent="starter"
              aria-labelledby="pack-starter-title"
              aria-describedby="pack-starter-price pack-starter-desc"
            >
              <div className="pack__icon" aria-hidden="true">
                <svg viewBox="0 0 28 28" width="28" height="28" role="img" aria-hidden="true">
                  <path
                    d="M14 2.5 17 10h7l-5.8 4.2 2.2 7-6.4-4.5-6.4 4.5 2.2-7L4 10h7z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 id="pack-starter-title" className="pack__title">
                Starter
              </h3>
              <p id="pack-starter-desc" className="pack__desc">
                Perfect for businesses getting online
              </p>
              <p id="pack-starter-price" className="pack__price">
                <span className="val">$2,999</span> <span className="unit">/one-time</span>
              </p>
              <ul className="pack__list" role="list">
                <li>Industry-specific website</li>
                <li>CMS basics</li>
                <li>Contact forms</li>
                <li>Mobile responsive</li>
                <li>3 months support</li>
              </ul>
              <a
                className="pack__cta"
                href="#contact"
                aria-label="Get started: Starter, $2,999 one-time"
              >
                Get Started
              </a>
            </article>
          </li>

          <li>
            <article
              className="pack is-featured"
              data-accent="builder"
              aria-labelledby="pack-builder-title"
              aria-describedby="pack-builder-price pack-builder-desc"
              aria-label="Most Popular plan"
            >
              <div className="pack__badge" aria-hidden="true">
                Most Popular
              </div>
              <div className="pack__icon" aria-hidden="true">
                <svg viewBox="0 0 28 28" width="28" height="28" role="img" aria-hidden="true">
                  <path
                    d="M13.5 2v9.5H8L14.5 26V16.5H20L13.5 2Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 id="pack-builder-title" className="pack__title">
                Builder
              </h3>
              <p id="pack-builder-desc" className="pack__desc">
                Advanced functionality and integrations
              </p>
              <p id="pack-builder-price" className="pack__price">
                <span className="val">$7,999</span> <span className="unit">/project</span>
              </p>
              <ul className="pack__list" role="list">
                <li>Custom APIs</li>
                <li>Admin dashboards</li>
                <li>CRM integration</li>
                <li>Payment processing</li>
                <li>Advanced analytics</li>
                <li>6 months support</li>
              </ul>
              <a
                className="pack__cta pack__cta--primary"
                href="#contact"
                aria-label="Get started: Builder, $7,999 per project"
              >
                Get Started
              </a>
            </article>
          </li>

          <li>
            <article
              className="pack"
              data-accent="engine"
              aria-labelledby="pack-engine-title"
              aria-describedby="pack-engine-price pack-engine-desc"
            >
              <div className="pack__icon" aria-hidden="true">
                <svg viewBox="0 0 28 28" width="28" height="28" role="img" aria-hidden="true">
                  <path
                    d="M6 8.5c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5-3.6 5.5-8 5.5-8-2.2-8-5.5Zm0 5c0 3.3 3.6 5.5 8 5.5s8-2.2 8-5.5M6 18.5c0 3.3 3.6 5.5 8 5.5s8-2.2 8-5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <h3 id="pack-engine-title" className="pack__title">
                Engine
              </h3>
              <p id="pack-engine-desc" className="pack__desc">
                Data-driven enterprise solutions
              </p>
              <p id="pack-engine-price" className="pack__price">
                <span className="val">$15,999</span> <span className="unit">/project</span>
              </p>
              <ul className="pack__list" role="list">
                <li>Data pipelines</li>
                <li>Data warehouses</li>
                <li>BI dashboards</li>
                <li>Real-time analytics</li>
                <li>Machine learning</li>
                <li>12 months support</li>
              </ul>
              <a
                className="pack__cta"
                href="#contact"
                aria-label="Get started: Engine, $15,999 per project"
              >
                Get Started
              </a>
            </article>
          </li>

          <li>
            <article
              className="pack"
              data-accent="growth"
              aria-labelledby="pack-growth-title"
              aria-describedby="pack-growth-price pack-growth-desc"
            >
              <div className="pack__icon" aria-hidden="true">
                <svg viewBox="0 0 28 28" width="28" height="28" role="img" aria-hidden="true">
                  <path
                    d="M4 18.5 11.5 11l4 4L24 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18 6h6v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 id="pack-growth-title" className="pack__title">
                Growth
              </h3>
              <p id="pack-growth-desc" className="pack__desc">
                Complete digital marketing solution
              </p>
              <p id="pack-growth-price" className="pack__price">
                <span className="val">$12,999</span> <span className="unit">/campaign</span>
              </p>
              <ul className="pack__list" role="list">
                <li>SEO optimization</li>
                <li>Lead generation flows</li>
                <li>Fee-smart checkout</li>
                <li>Marketing automation</li>
                <li>Analytics &amp; reporting</li>
                <li>Ongoing optimization</li>
              </ul>
              <a
                className="pack__cta"
                href="#contact"
                aria-label="Get started: Growth, $12,999 per campaign"
              >
                Get Started
              </a>
            </article>
          </li>
        </ul>

        <section className="addons" aria-labelledby="addons-title" data-reveal data-reveal-index="2">
          <header className="addons__head">
            <h3 id="addons-title" className="addons__title">
              Add-ons
            </h3>
            <p className="addons__lede">Enhance your pack with additional features</p>
          </header>

          <ul className="addons__grid" role="list">
            <li>
              <article className="addon" data-accent="ai">
                <h4 className="addon__title">AI Bot</h4>
                <p className="addon__price">$1,999</p>
              </article>
            </li>
            <li>
              <article className="addon" data-accent="swiftpay">
                <h4 className="addon__title">SwiftPay Mini</h4>
                <p className="addon__price">$999</p>
              </article>
            </li>
            <li>
              <article className="addon" data-accent="app">
                <h4 className="addon__title">App Shell</h4>
                <p className="addon__price">$3,999</p>
              </article>
            </li>
            <li>
              <article className="addon" data-accent="devops">
                <h4 className="addon__title">DevOps Setup</h4>
                <p className="addon__price">$2,499</p>
              </article>
            </li>
          </ul>

          <div className="addons__ctaRow">
            <p className="addons__prompt">
              Need a custom solution? Let’s talk about your specific requirements.
            </p>
            <a className="addons__cta" href="#contact" aria-label="Request a custom quote">
              Get Custom Quote
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}

type AchievementVariant = "honors" | "stem" | "adidas" | "consult";

type Achievement = {
  variant: AchievementVariant;
  title: string;
  subtitle: string;
};

type LeaderKey = "edgar" | "jaden";

type LeaderProfile = {
  name: string;
  title: string;
  toggleTitle?: string;
  avatar: string;
  bio: string;
  mantra: string;
  achievements: Achievement[];
};

const leaderOrder: LeaderKey[] = ["edgar", "jaden"];

const leaders: Record<LeaderKey, LeaderProfile> = {
  edgar: {
    name: "Edgar Colmenero",
    title: "Founder & Delivery Principal",
    toggleTitle: "Delivery Principal",
    avatar: "/me1.jpg",
    bio: "Edgar guides SwiftSend's delivery practice, helping multi-disciplinary squads ship resilient platforms across fintech, retail, and consumer tech. He blends systems thinking with rapid prototyping to align product vision and velocity.",
    mantra: "Never Stay Satisfied.",
    achievements: [
      {
        variant: "honors",
        title: "National Honors Scholar",
        subtitle: "Top 1% recognition for computational design research.",
      },
      {
        variant: "stem",
        title: "STEM Innovation Fellow",
        subtitle: "Launched robotics programs empowering 200+ emerging builders.",
      },
      {
        variant: "adidas",
        title: "Adidas Future Lab Partner",
        subtitle: "Engineered personalization pilots across global product drops.",
      },
      {
        variant: "consult",
        title: "Fractional Product Consultant",
        subtitle: "Scaled delivery rituals for fintech, health, and climate ventures.",
      },
    ],
  },
  jaden: {
    name: "Jaden Padilla",
    title: "Co-Founder & Systems Architect",
    toggleTitle: "Systems Architect",
    avatar: "/me2.jpg",
    bio: "Jaden architects SwiftSend's technical runway, pairing infrastructure rigor with a brand-first mindset. He connects product strategy to platform decisions so every release stays fast, stable, and unmistakably polished.",
    mantra: "Design Momentum. Deliver Proof.",
    achievements: [
      {
        variant: "honors",
        title: "Global Hackathon Finalist",
        subtitle: "Piloted AI logistics tools recognized across three product summits.",
      },
      {
        variant: "stem",
        title: "SaaS Platform Architect",
        subtitle: "Stabilized multi-tenant stacks serving millions of on-demand requests.",
      },
      {
        variant: "adidas",
        title: "Creative Systems Builder",
        subtitle: "Unified brand and engineering workflows for Fortune 500 concept labs.",
      },
      {
        variant: "consult",
        title: "Fractional CTO Partner",
        subtitle: "Guides founders through go-to-market readiness and technical audits.",
      },
    ],
  },
};

function renderAchievementIcon(variant: AchievementVariant): JSX.Element {
  switch (variant) {
    case "honors":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 21c2.5-1.6 4-4.4 4-7.4V7l4-2 4 2v6.6c0 3 1.5 5.8 4 7.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="21" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "stem":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 8.5C8.2 10 11.1 10.8 14 10.8c2.9 0 5.8-.8 9-2.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 19.5c3.2-1.5 6.1-2.3 9-2.3s5.8.8 9 2.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "adidas":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18.5l14-9.5M7 14l14-9.5M7 23l14-9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6.5 6.5h3v3h-3zM18.5 18.5h3v3h-3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "consult":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 9.5l5.5-3 5.5 3v6l-5.5 3-5.5-3v-6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M14 6V3M6 14H3M25 14h-3M14 25v-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 19l2.5-7h5L14 25l-1.8-4.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 12L15 3l3.5 3.5-3 5.5H11.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M7 21.5l2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function AboutSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    body.classList.add("is-about-js");

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(".about [data-reveal]")
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const disableObserver = motionQuery.matches || !("IntersectionObserver" in window);
    let observer: IntersectionObserver | null = null;

    const showAll = () => {
      revealElements.forEach((element) => {
        element.classList.add("is-in");
      });
    };

    if (disableObserver) {
      showAll();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 }
      );

      revealElements.forEach((element) => observer?.observe(element));
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        showAll();
        observer?.disconnect();
        observer = null;
      }
    };

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }

      observer?.disconnect();
      body.classList.remove("is-about-js");
    };
  }, []);

  const [activeLeader, setActiveLeader] = useState<LeaderKey>("edgar");
  const leader = leaders[activeLeader];

  const getRevealStyle = (index: number): CSSProperties => ({
    transitionDelay: `${index * 90}ms`,
  });

  return (
    <section
      id="about"
      className="about scroll-mt-28 md:scroll-mt-32"
      aria-labelledby="about-title"
    >
      <div className="about__container">
        <header
          className="about__head"
          data-reveal
          data-reveal-index="0"
          style={getRevealStyle(0)}
        >
          <h2 id="about-title" className="about__title">
            About <span className="about__title-highlight">SwiftSend</span>
          </h2>
          <div className="about__leaders" role="group" aria-label="SwiftSend leadership">
            {leaderOrder.map((key) => {
              const item = leaders[key];
              const isActive = key === activeLeader;

              return (
                <button
                  key={key}
                  type="button"
                  className={`about__leaderBtn${isActive ? " is-active" : ""}`}
                  onClick={() => setActiveLeader(key)}
                  aria-pressed={isActive}
                >
                  <span
                    className="about__leaderThumb"
                    aria-hidden="true"
                    style={{ backgroundImage: `url(${item.avatar})` }}
                  />
                  <span className="about__leaderCopy">
                    <span className="about__leaderName">{item.name}</span>
                    <span className="about__leaderRole">{item.toggleTitle ?? item.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </header>
        <div className="about__inner">
          <div
            className="about__profile"
            data-reveal
            data-reveal-index="1"
            style={getRevealStyle(1)}
          >
            <div className="about__avatar">
              <img src={leader.avatar} alt={leader.name} loading="lazy" />
            </div>
            <div className="about__profile-details">
              <p className="about__name">{leader.name}</p>
              <p className="about__role">{leader.title}</p>
              <p className="about__bio">{leader.bio}</p>
            </div>
          </div>
          <div
            className="about__achievements"
            data-reveal
            data-reveal-index="2"
            style={getRevealStyle(2)}
          >
            <h3 className="about__subhead" aria-hidden="true">
              Experience &amp; Achievements
            </h3>
            <ul className="achv-list">
              {leader.achievements.slice(0, 4).map((achievement) => (
                <li
                  key={achievement.title}
                  className="achv-card"
                  data-variant={achievement.variant}
                  tabIndex={0}
                >
                  <span className="achv-card__icon" aria-hidden="true">
                    {renderAchievementIcon(achievement.variant)}
                  </span>
                  <div className="achv-card__text">
                    <span className="achv-card__title">{achievement.title}</span>
                    <span className="achv-card__sub">{achievement.subtitle}</span>
                  </div>
                  <span className="achv-card__status" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="about__mission"
          data-reveal
          data-reveal-index="3"
          style={getRevealStyle(3)}
        >
          <div className="about__missionHead">
            <div className="about__quote">
              <p>{leader.mantra}</p>
            </div>
          </div>
          <div className="certs">
            <div className="cert">
              <img src="/color1.jpg" alt="SwiftSend spectrum tile 01" loading="lazy" />
              <a className="cert__caption underline-seq" href="#" role="link">
                Platform Velocity
              </a>
            </div>
            <div className="cert">
              <img src="/color2.jpg" alt="SwiftSend spectrum tile 02" loading="lazy" />
              <a className="cert__caption underline-seq" href="#" role="link">
                Creative Systems
              </a>
            </div>
            <div className="cert">
              <img src="/color3.jpg" alt="SwiftSend spectrum tile 03" loading="lazy" />
              <a className="cert__caption underline-seq" href="#" role="link">
                Delivery Ops
              </a>
            </div>
            <div className="cert">
              <img src="/color4.jpg" alt="SwiftSend spectrum tile 04" loading="lazy" />
              <a className="cert__caption underline-seq" href="#" role="link">
                R&amp;D Sprint Labs
              </a>
            </div>
          </div>
        </div>
        <div
          className="about__quote about__quote--long"
          data-reveal
          data-reveal-index="4"
          style={getRevealStyle(4)}
        >
          <p>
            “We engineer clarity and tempo so every launch feels intentional, confident, and
            unmistakably SwiftSend.”
          </p>
        </div>
      </div>
    </section>
  );
}
