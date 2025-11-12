import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./Hero.module.css";

const SPARKS: Array<{
  left: string;
  top: string;
  size: string;
  delay: string;
  twinkleDelay: string;
  duration: string;
  twinkleDuration: string;
  amplitude: string;
  tone?: "orange" | "purple";
}> = [
  {
    left: "18%",
    top: "22%",
    size: "16px",
    delay: "0s",
    twinkleDelay: "1.4s",
    duration: "8s",
    twinkleDuration: "5.6s",
    amplitude: "18px",
    tone: "orange",
  },
  {
    left: "72%",
    top: "28%",
    size: "10px",
    delay: "1.2s",
    twinkleDelay: "0.4s",
    duration: "7.2s",
    twinkleDuration: "4.8s",
    amplitude: "14px",
    tone: "purple",
  },
  {
    left: "34%",
    top: "64%",
    size: "12px",
    delay: "0.8s",
    twinkleDelay: "2s",
    duration: "6.8s",
    twinkleDuration: "5.2s",
    amplitude: "16px",
  },
  {
    left: "58%",
    top: "70%",
    size: "8px",
    delay: "1.8s",
    twinkleDelay: "1.2s",
    duration: "7.6s",
    twinkleDuration: "5.8s",
    amplitude: "12px",
  },
];

export default function HomeSection() {
  return (
    <section
      id="home"
      className={`anchor-section ${styles.hero}`}
      aria-labelledby="home-title"
      data-testid="section-home"
    >
      <div id="fx-stars" aria-hidden="true" style={{ pointerEvents: "none" }} />
      <div
        className={styles["spark-field"]}
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        {SPARKS.map((spark, index) => {
          const sparkStyle = {
            '--l': spark.left,
            '--t': spark.top,
            '--sz': spark.size,
            '--d1': spark.delay,
            '--d2': spark.twinkleDelay,
            '--dur': spark.duration,
            '--tw': spark.twinkleDuration,
            '--amp': spark.amplitude,
          } as CSSProperties;

          const toneClass = spark.tone ? styles[spark.tone] : undefined;
          const sparkClassName = toneClass
            ? `${styles.spark} ${toneClass}`
            : styles.spark;

          return <span key={index} className={sparkClassName} style={sparkStyle} />;
        })}
      </div>
      <div className={styles["hero-inner"]}>
        <div className={styles["tile-wrap"]}>
          <div className={styles.tile}>
            <span className={styles["tile-s"]}>S</span>
            <span className={`${styles.orbit} ${styles.o1}`} aria-hidden="true" />
            <span className={`${styles.orbit} ${styles.o2}`} aria-hidden="true" />
            <span className={`${styles.orbit} ${styles.o3}`} aria-hidden="true" />
          </div>
        </div>
        <div className={styles.display} id="home-title">
          SwiftSend <span className={styles["grad-word"]}>Max</span>
        </div>
        <p className={styles.lede}>
          Strategy, product, and polished engineering for fintech teams shipping at startup speed.
          We help you land the story, build the flows, and launch with confidence.
        </p>
        <div className={styles.cta}>
          <Link href="/#services" className={`${styles.btn} ${styles["btn-primary"]}`}>
            Explore Services
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/#work" className={`${styles.btn} ${styles["btn-ghost"]}`}>
            See Recent Work
          </Link>
        </div>
        <p className={styles.lede}>
          <span className={styles["underline-seq"]}>Scroll</span> to see how we help payment
          innovators deliver faster launches without sacrificing craft.
        </p>
      </div>
    </section>
  );
}
