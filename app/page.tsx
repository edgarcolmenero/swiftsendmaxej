"use client";

import { useEffect, type CSSProperties } from "react";

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
      <AboutSection />
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
