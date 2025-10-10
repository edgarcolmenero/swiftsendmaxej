"use client";

import Labs from "@/features/labs/LabsGlow";
import { Process } from "@/app/(site)/sections/Process";
import { useEffect, useRef, type CSSProperties } from "react";

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

    // Services section: reveal + pointer glow
    (() => {
      "use strict";

      const section = document.getElementById("services") as HTMLElement | null;
      if (!section) return;
      if (section.dataset.servicesInit === "done") return;
      section.dataset.servicesInit = "done";

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const prefersReduced = () => reduceMotion.matches;
      const supportsPE = "PointerEvent" in window;
      const passive: AddEventListenerOptions = { passive: true };
      const headerItems = Array.from(section.querySelectorAll<HTMLElement>(".services__head > *"));
      const cards = Array.from(section.querySelectorAll<HTMLElement>(".service-card"));
      const revealables = [...headerItems, ...cards];

      section.classList.add("is-enhanced");
      section.style.setProperty("--gx", "0px");
      section.style.setProperty("--gy", "0px");

      const STAGGER_MS = 60;
      const MAX_STAGGER_INDEX = 5;

      const assignDelays = () => {
        revealables.forEach((el, index) => {
          if (el.classList.contains("is-inview")) {
            el.style.removeProperty("--svc-delay");
            if (el.classList.contains("service-card")) {
              el.style.removeProperty("--card-delay");
            }
            return;
          }
          const offsetIndex = Math.min(index, MAX_STAGGER_INDEX);
          const delay = prefersReduced() ? 0 : offsetIndex * STAGGER_MS;
          el.style.setProperty("--svc-delay", `${delay}ms`);
          if (el.classList.contains("service-card")) {
            el.style.setProperty("--card-delay", `${delay}ms`);
          }
        });
      };

      assignDelays();

      let hasSwept = false;

      const revealElement = (element: HTMLElement) => {
        if (element.classList.contains("is-inview")) return;
        element.classList.add("is-inview");
        element.style.removeProperty("--svc-delay");
        if (element.classList.contains("service-card")) {
          element.classList.add("underline-active");
          element.style.removeProperty("--card-delay");
          window.setTimeout(() => element.classList.remove("underline-active"), 480);
          if (!hasSwept) {
            hasSwept = true;
            section.classList.add("has-revealed");
          }
        }
      };

      let io: IntersectionObserver | null = null;
      const startIO = () => {
        if (io || !revealables.length) return;
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const target = entry.target as HTMLElement;
              revealElement(target);
              io!.unobserve(target);
            });
          },
          { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );
        revealables
          .filter((el) => !el.classList.contains("is-inview"))
          .forEach((el) => io!.observe(el));
      };
      const stopIO = () => {
        if (io) {
          io.disconnect();
          io = null;
        }
      };

      const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

      let activeCard: HTMLElement | null = null;
      let pointerBound = false;
      let pointerRaf = 0;
      let lastPointerX = 0;
      let lastPointerY = 0;
      let nextPointerX = 0;
      let nextPointerY = 0;
      let idleTimer: number | null = null;

      const flushPointer = () => {
        pointerRaf = 0;
        if (Math.abs(nextPointerX - lastPointerX) < 0.05 && Math.abs(nextPointerY - lastPointerY) < 0.05) {
          return;
        }
        lastPointerX = nextPointerX;
        lastPointerY = nextPointerY;
        section.style.setProperty("--gx", `${lastPointerX.toFixed(2)}px`);
        section.style.setProperty("--gy", `${lastPointerY.toFixed(2)}px`);
      };

      const requestPointerFrame = () => {
        if (!pointerRaf) pointerRaf = requestAnimationFrame(flushPointer);
      };

      const clearIdleTimer = () => {
        if (idleTimer !== null) {
          window.clearTimeout(idleTimer);
          idleTimer = null;
        }
      };

      const resetPointer = () => {
        nextPointerX = 0;
        nextPointerY = 0;
        requestPointerFrame();
      };

      const scheduleIdleReset = () => {
        clearIdleTimer();
        idleTimer = window.setTimeout(() => {
          idleTimer = null;
          resetPointer();
        }, 1200);
      };

      const isFinePointer = (event?: PointerEvent | MouseEvent | null) => {
        if (!event) return true;
        if ("pointerType" in event) {
          const type = (event as PointerEvent).pointerType;
          return type === "mouse" || type === "pen" || type === "";
        }
        return true;
      };

      const updatePointer = (clientX: number, clientY: number) => {
        const rect = section.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = clamp((clientX - centerX) / (rect.width / 2), -1, 1);
        const normalizedY = clamp((clientY - centerY) / (rect.height / 2), -1, 1);
        nextPointerX = clamp(normalizedX * 18, -18, 18);
        nextPointerY = clamp(normalizedY * 18, -18, 18);
        requestPointerFrame();
        scheduleIdleReset();
      };

      const activateCard = (card: HTMLElement | null) => {
        if (!card || activeCard === card) return;
        if (activeCard && activeCard !== card) {
          const previous = activeCard;
          deactivateCard(previous);
        }
        card.classList.add("underline-active", "is-hot");
        activeCard = card;
      };

      const deactivateCard = (card: HTMLElement | null, force = false) => {
        if (!card) return;
        const activeEl = document.activeElement as HTMLElement | null;
        if (!force && activeEl && card.contains(activeEl)) return;
        card.classList.remove("underline-active", "is-hot");
        if (activeCard === card) {
          activeCard = null;
        }
      };

      const handlePointerMove = (event: PointerEvent | MouseEvent) => {
        if (!isFinePointer(event)) return;
        updatePointer(event.clientX, event.clientY);
      };

      const handlePointerEnter = (event: PointerEvent | MouseEvent) => {
        if (!isFinePointer(event)) return;
        updatePointer(event.clientX, event.clientY);
      };

      const handlePointerOver = (event: PointerEvent | MouseEvent) => {
        if (!isFinePointer(event)) return;
        const card = (event.target as Element).closest(".service-card") as HTMLElement | null;
        if (card && section.contains(card)) {
          activateCard(card);
        }
      };

      const handlePointerOut = (event: PointerEvent | MouseEvent) => {
        const card = (event.target as Element).closest(".service-card") as HTMLElement | null;
        if (!card) return;
        const related = (event as MouseEvent).relatedTarget as Node | null;
        if (related && card.contains(related)) return;
        deactivateCard(card);
      };

      const handlePointerLeave = () => {
        clearIdleTimer();
        if (activeCard) {
          const current = activeCard;
          deactivateCard(current);
          activeCard = null;
        }
        resetPointer();
      };

      const onFocusIn = (event: FocusEvent) => {
        const card = (event.target as Element).closest(".service-card") as HTMLElement | null;
        if (!card) return;
        card.classList.add("underline-active", "is-hot");
      };

      const onFocusOut = (event: FocusEvent) => {
        const card = (event.target as Element).closest(".service-card") as HTMLElement | null;
        if (!card) return;
        const next = event.relatedTarget as Node | null;
        if (!next || !card.contains(next)) {
          deactivateCard(card, true);
        }
      };

      const bindPointer = () => {
        if (pointerBound || prefersReduced()) return;
        pointerBound = true;
        if (supportsPE) {
          section.addEventListener("pointermove", handlePointerMove, passive);
          section.addEventListener("pointerenter", handlePointerEnter, passive);
          section.addEventListener("pointerleave", handlePointerLeave);
          section.addEventListener("pointercancel", handlePointerLeave);
          section.addEventListener("pointerover", handlePointerOver);
          section.addEventListener("pointerout", handlePointerOut);
        } else {
          section.addEventListener("mousemove", handlePointerMove as any, passive);
          section.addEventListener("mouseenter", handlePointerEnter as any, true);
          section.addEventListener("mouseleave", handlePointerLeave, true);
          section.addEventListener("mouseover", handlePointerOver as any);
          section.addEventListener("mouseout", handlePointerOut as any);
        }
      };

      const unbindPointer = () => {
        if (!pointerBound) return;
        pointerBound = false;
        if (supportsPE) {
          section.removeEventListener("pointermove", handlePointerMove, passive);
          section.removeEventListener("pointerenter", handlePointerEnter, passive);
          section.removeEventListener("pointerleave", handlePointerLeave);
          section.removeEventListener("pointercancel", handlePointerLeave);
          section.removeEventListener("pointerover", handlePointerOver);
          section.removeEventListener("pointerout", handlePointerOut);
        } else {
          section.removeEventListener("mousemove", handlePointerMove as any, passive);
          section.removeEventListener("mouseenter", handlePointerEnter as any, true);
          section.removeEventListener("mouseleave", handlePointerLeave, true);
          section.removeEventListener("mouseover", handlePointerOver as any);
          section.removeEventListener("mouseout", handlePointerOut as any);
        }
      };

      bindPointer();
      section.addEventListener("focusin", onFocusIn);
      section.addEventListener("focusout", onFocusOut);

      const applyRM = () => {
        assignDelays();
        if (prefersReduced()) {
          stopIO();
          revealables.forEach(revealElement);
          unbindPointer();
          clearIdleTimer();
          resetPointer();
          section.classList.add("reduced-motion");
        } else {
          section.classList.remove("reduced-motion");
          startIO();
          bindPointer();
        }
      };
      applyRM();

      if (typeof reduceMotion.addEventListener === "function") {
        reduceMotion.addEventListener("change", applyRM);
      } else if (typeof (reduceMotion as any).addListener === "function") {
        (reduceMotion as any).addListener(applyRM);
      }

      document.addEventListener(
        "visibilitychange",
        () => {
          if (document.hidden) {
            stopIO();
            handlePointerLeave();
          } else if (!prefersReduced()) startIO();
        },
        passive
      );

      window.addEventListener(
        "pagehide",
        () => {
          stopIO();
          handlePointerLeave();
          unbindPointer();
        },
        { once: true }
      );
    })();

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
      <section id="home" data-hero className="hero">
        <canvas id="fx-stars" aria-hidden="true" />
        <div className="spark-field" data-spark-field aria-hidden="true" />
        <div className="hero-inner">
          <div className="tile-wrap" aria-hidden="true">
            <div className="tile">
              <span className="tile-s">s</span>
              <span className="orbit o1" />
              <span className="orbit o2" />
              <span className="orbit o3" />
            </div>
          </div>
          <h1 className="display">
            Your Software.
            <br />
            <span className="grad-word">Your</span> Stack.
            <br />
            Your Savings.
          </h1>
          <p className="lede">
            SwiftSend Max 3.0 powers ambitious builders with a battle-tested engineering core,
            product accelerators, and a crew obsessed with velocity and polish.
          </p>
          <div className="cta">
            <a href="#contact" className="btn btn-primary">
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
            <a href="#portfolio" className="btn btn-ghost underline-seq">
              See Our Work
            </a>
          </div>
        </div>
      </section>
      <AboutSection />
      <section id="services" className="services" role="region" aria-labelledby="services-title">
        <div className="services__stars" aria-hidden="true" />

        <div className="services__inner">
          <header className="services__head">
            <h2 className="services__title" id="services-title">
              What We <span className="grad-word">Build</span>
            </h2>
            <p className="services__lede">Comprehensive solutions for modern digital challenges</p>
          </header>

          <div className="services__grid">
            <article className="service-card" data-accent="fullstack" tabIndex={0}>
              <div className="service-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="11"
                    rx="1.8"
                    ry="1.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="M2.75 17h18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M8.5 19.75h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="service-card__title">
                <span className="service-card__title-text">Full-Stack Development</span>
              </h3>
              <p className="service-card__copy">APIs, apps, dashboards, admin portals.</p>
            </article>

            <article className="service-card" data-accent="data" tabIndex={0}>
              <div className="service-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <ellipse
                    cx="12"
                    cy="6.5"
                    rx="7.5"
                    ry="3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4.5 6.5v6c0 1.93 3.36 3.5 7.5 3.5s7.5-1.57 7.5-3.5v-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4.5 12.2c0 1.93 3.36 3.5 7.5 3.5s7.5-1.57 7.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <h3 className="service-card__title">
                <span className="service-card__title-text">Data Engineering</span>
              </h3>
              <p className="service-card__copy">Pipelines, warehouses, metrics, and clean dashboards.</p>
            </article>

            <article className="service-card" data-accent="ai" tabIndex={0}>
              <div className="service-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M9.75 4.5c-2.35 0-4.25 1.9-4.25 4.25 0 1.9-1.25 2.9-1.25 4.6 0 2.7 2.2 4.9 4.9 4.9h1.85c.83 0 1.5.67 1.5 1.5v.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.25 4.5c2.35 0 4.25 1.9 4.25 4.25 0 1.9 1.25 2.9 1.25 4.6 0 2.7-2.2 4.9-4.9 4.9H13c-.83 0-1.5.67-1.5 1.5v.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="9.75" cy="8.5" r="1" fill="currentColor" />
                  <circle cx="14.25" cy="8.5" r="1" fill="currentColor" />
                  <path
                    d="M9 12.5c.4.6 1.1 1 2 1s1.6-.4 2-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="service-card__title">
                <span className="service-card__title-text">AI Automations &amp; Agents</span>
              </h3>
              <p className="service-card__copy">Voice + chatbots, intake copilots, smart workflows.</p>
            </article>

            <article className="service-card" data-accent="swiftpay" tabIndex={0}>
              <div className="service-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="13"
                    rx="2"
                    ry="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="M3 10.5h18" stroke="currentColor" strokeWidth="1.6" />
                  <rect x="6.5" y="12.5" width="5" height="2.5" rx="1.2" fill="currentColor" />
                  <path d="M16.5 13.75h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="service-card__title">
                <span className="service-card__title-text">SwiftPay Systems</span>
              </h3>
              <p className="service-card__copy">
                Fee-smart checkouts, subscriptions, and ACH routing — keep more of every dollar.
              </p>
            </article>

            <article className="service-card" data-accent="marketing" tabIndex={0}>
              <div className="service-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M4 16.5 9.5 11l3.5 3.5 5-5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 8h3v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="service-card__title">
                <span className="service-card__title-text">Digital Marketing</span>
              </h3>
              <p className="service-card__copy">Campaigns, funnels, ads, analytics → grow smarter.</p>
            </article>

            <article className="service-card" data-accent="growth" tabIndex={0}>
              <div className="service-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <circle
                    cx="10"
                    cy="10"
                    r="4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="m13.5 13.5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M8.75 9.75h2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M10 8.5v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="service-card__title">
                <span className="service-card__title-text">Digital Growth (SEO &amp; CRM)</span>
              </h3>
              <p className="service-card__copy">SEO, CRM wiring, landing pages, reporting.</p>
            </article>
          </div>
        </div>
      </section>
      <section id="portfolio" className="portfolio" aria-labelledby="portfolio-title">
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
      </section>
      <Labs />
      <Packs />
      <Process />
      <section id="contact" className="contact" aria-labelledby="contact-title" data-contact-section>
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
      className="packs"
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

  const getRevealStyle = (index: number): CSSProperties => ({
    transitionDelay: `${index * 90}ms`,
  });

  return (
    <section id="about" className="about" aria-labelledby="about-title">
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
        </header>
        <div className="about__inner">
          <div
            className="about__profile"
            data-reveal
            data-reveal-index="1"
            style={getRevealStyle(1)}
          >
            <div className="about__avatar">
              <img src="/me1.jpg" alt="Edgar Colmenero" loading="lazy" />
            </div>
            <div className="about__profile-details">
              <p className="about__name">Edgar Colmenero</p>
              <p className="about__role">Founder &amp; Delivery Principal</p>
              <p className="about__bio">
                Edgar guides SwiftSend's delivery practice, helping multi-disciplinary squads ship
                resilient platforms across fintech, retail, and consumer tech. He blends systems
                thinking with rapid prototyping to align product vision and velocity.
              </p>
            </div>
            <div
              className="about__quote"
              data-reveal
              data-reveal-index="3"
              style={getRevealStyle(3)}
            >
              <p>Never Stay Satisfied.</p>
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
              <li className="achv-card" data-variant="honors" tabIndex={0}>
                <span className="achv-card__icon" aria-hidden="true">
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
                    <circle
                      cx="14"
                      cy="21"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <div className="achv-card__text">
                  <span className="achv-card__title">National Honors Scholar</span>
                  <span className="achv-card__sub">Top 1% recognition for computational design research.</span>
                </div>
                <span className="achv-card__status" aria-hidden="true" />
              </li>
              <li className="achv-card" data-variant="stem" tabIndex={0}>
                <span className="achv-card__icon" aria-hidden="true">
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
                </span>
                <div className="achv-card__text">
                  <span className="achv-card__title">STEM Innovation Fellow</span>
                  <span className="achv-card__sub">Launched robotics programs empowering 200+ emerging builders.</span>
                </div>
                <span className="achv-card__status" aria-hidden="true" />
              </li>
              <li className="achv-card" data-variant="adidas" tabIndex={0}>
                <span className="achv-card__icon" aria-hidden="true">
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
                </span>
                <div className="achv-card__text">
                  <span className="achv-card__title">Adidas Future Lab Partner</span>
                  <span className="achv-card__sub">Engineered personalization pilots across global product drops.</span>
                </div>
                <span className="achv-card__status" aria-hidden="true" />
              </li>
              <li className="achv-card" data-variant="consult" tabIndex={0}>
                <span className="achv-card__icon" aria-hidden="true">
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
                </span>
                <div className="achv-card__text">
                  <span className="achv-card__title">Fractional Product Consultant</span>
                  <span className="achv-card__sub">Scaled delivery rituals for fintech, health, and climate ventures.</span>
                </div>
                <span className="achv-card__status" aria-hidden="true" />
              </li>
              <li className="achv-card" data-variant="swiftsend" tabIndex={0}>
                <span className="achv-card__icon" aria-hidden="true">
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
                    <path
                      d="M7 21.5l2.5-1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div className="achv-card__text">
                  <span className="achv-card__title">SwiftSend Mission Lead</span>
                  <span className="achv-card__sub">Orchestrates weekly launch cadences that keep clients ahead.</span>
                </div>
                <span className="achv-card__status" aria-hidden="true" />
              </li>
            </ul>
          </div>
        </div>
        <div className="certs" data-reveal data-reveal-index="4" style={getRevealStyle(4)}>
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
        <div
          className="about__quote about__quote--long"
          data-reveal
          data-reveal-index="5"
          style={getRevealStyle(5)}
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
