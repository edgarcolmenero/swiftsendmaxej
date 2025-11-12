"use client";

// Duplicate placeholder version of the About SwiftSend section for easy customization
import { useEffect, type CSSProperties } from "react";

export default function AboutPlaceholder() {
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

    const observerRef = observer;

    return () => {
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }

      observerRef?.disconnect();
      body.classList.remove("is-about-js");
    };
  }, []);

  const getRevealStyle = (index: number): CSSProperties => ({
    transitionDelay: `${index * 90}ms`,
  });

  return (
    <section
      id="about"
      className="about scroll-mt-24"
      aria-labelledby="about-title"
      data-testid="section-about"
    >
      <div className="about__container">
        <header
          className="about__head"
          data-reveal
          data-reveal-index="0"
          style={getRevealStyle(0)}
        >
          <h2 id="about-title" className="about__title">
            About <span className="about__title-highlight">PlaceholderBrand</span>
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
              <img src="/placeholder.svg" alt="Jade Padilla portrait" loading="lazy" />
            </div>
            <div className="about__profile-details">
              <p className="about__name">Jade Padilla</p>
              <p className="about__role">Second-in-Command</p>
              <p className="about__bio">
                My goal is to help customers complete their goals by turning ideas into shippable
                products—aligning strategy with execution while keeping delivery fast, calm, and
                customer-first.
              </p>
            </div>
            <div
              className="about__quote"
              data-reveal
              data-reveal-index="3"
              style={getRevealStyle(3)}
            >
              <p>No limit to success.</p>
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
                  <span className="achv-card__title">Software Engineer</span>
                  <span className="achv-card__sub">Contribute clean, reliable code across front-end and back-end systems.</span>
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
                  <span className="achv-card__title">STEM Club Administrator</span>
                  <span className="achv-card__sub">Organize initiatives and support emerging builders in the community.</span>
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
                  <span className="achv-card__title">Walmart Customer Service Representative Lead</span>
                  <span className="achv-card__sub">Led service operations, resolved escalations, and improved customer experience.</span>
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
                  <span className="achv-card__title">UTA Honors Society</span>
                  <span className="achv-card__sub">Recognized for academic excellence and continuous learning.</span>
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
                  <span className="achv-card__sub">Drive weekly launch cadences that keep clients ahead.</span>
                </div>
                <span className="achv-card__status" aria-hidden="true" />
              </li>
            </ul>
          </div>
        </div>
        <div className="certs" data-reveal data-reveal-index="4" style={getRevealStyle(4)}>
          <div className="cert">
            <img src="/placeholder.svg" alt="Placeholder Tile 01" loading="lazy" />
            <a className="cert__caption underline-seq" href="#" role="link">
              Placeholder Tile 01 — Section One
            </a>
          </div>
          <div className="cert">
            <img src="/placeholder.svg" alt="Placeholder Tile 02" loading="lazy" />
            <a className="cert__caption underline-seq" href="#" role="link">
              Placeholder Tile 02 — Section Two
            </a>
          </div>
          <div className="cert">
            <img src="/placeholder.svg" alt="Placeholder Tile 03" loading="lazy" />
            <a className="cert__caption underline-seq" href="#" role="link">
              Placeholder Tile 03 — Section Three
            </a>
          </div>
          <div className="cert">
            <img src="/placeholder.svg" alt="Placeholder Tile 04" loading="lazy" />
            <a className="cert__caption underline-seq" href="#" role="link">
              Placeholder Tile 04 — Section Four
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
            “Use this space for a longer mission statement or guiding principle. Replace this text with
            a quote that captures your placeholder story.”
          </p>
        </div>
      </div>
    </section>
  );
}
