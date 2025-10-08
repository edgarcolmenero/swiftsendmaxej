"use client";

import { useEffect } from "react";

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
      <section id="about" className="section-shell">
        <h2>About SwiftSend</h2>
        <p>
          Learn how SwiftSend pairs modern engineering with practical execution to deliver reliable,
          scalable products for ambitious teams.
        </p>
      </section>
      <section id="services" className="section-shell">
        <h2>Services</h2>
        <p>
          From product strategy to platform maintenance, this placeholder outlines the service
          spectrum that will be detailed soon.
        </p>
      </section>
      <section id="work" className="section-shell">
        <h2>Work</h2>
        <p>
          Case studies, proof points, and success stories will live here once the production content
          is finalized.
        </p>
      </section>
      <section id="labs" className="section-shell">
        <h2>Labs</h2>
        <p>
          Labs will showcase SwiftSend experiments, prototypes, and research snapshots for early
          feedback.
        </p>
      </section>
      <section id="packs" className="section-shell">
        <h2>Packs</h2>
        <p>
          Product bundles and starter packs will be highlighted to simplify onboarding for partners
          and clients.
        </p>
      </section>
      <section id="contact" className="section-shell">
        <h2>Contact</h2>
        <p>
          Reach out to the SwiftSend crew to start a conversation about your upcoming launches and
          the support you need.
        </p>
      </section>
    </>
  );
}
