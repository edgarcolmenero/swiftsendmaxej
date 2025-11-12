import Link from "next/link";

import styles from "./Packs.module.css";

const PACKS = [
  {
    id: "launch",
    name: "Launch Readiness",
    description:
      "Discovery, prototype, and go-to-market runway for new payment products. Includes stakeholder workshops, UX flows, and launch comms kit.",
    features: ["4-week sprint", "Cross-functional squad", "Instrumented hand-off"],
    href: "#",
  },
  {
    id: "optimize",
    name: "Conversion Optimization",
    description:
      "Weekly experimentation loop focused on checkout completion, fraud reduction, and trust messaging tuned to your audience.",
    features: ["A/B roadmap", "Analytics instrumentation", "Copy & design support"],
    href: "#",
  },
  {
    id: "care",
    name: "Customer Care Automation",
    description:
      "Blend AI assistance with human service rituals. We blueprint triage states, route to humans when needed, and keep everything measurable.",
    features: ["LLM playbooks", "QA dashboard", "Team training"],
    href: "#",
  },
];

export default function PacksSection() {
  return (
    <section
      id="packs"
      className={`anchor-section ${styles.packs}`}
      aria-labelledby="packs-title"
      data-testid="section-packs"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="packs-title" className={styles.title}>
            Pick a pack, or mix to fit your roadmap
          </h2>
          <p className={styles.lede}>
            Modular engagements designed to meet teams where they are—each one focused on traction,
            not busywork.
          </p>
        </header>
        <div className={styles.grid}>
          {PACKS.map((pack) => (
            <article key={pack.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{pack.name}</h3>
              <p className={styles.cardCopy}>{pack.description}</p>
              <ul className={styles.features}>
                {pack.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link href={pack.href} className={styles.cta}>
                Talk with us
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
