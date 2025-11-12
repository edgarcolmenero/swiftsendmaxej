import Link from "next/link";

import styles from "./Work.module.css";

const PROJECTS = [
  {
    id: "galaxy-pay",
    title: "GalaxyPay — Unified Checkout",
    summary:
      "Consolidated a tangle of payment flows into a single responsive experience with in-context education and instant approval states.",
    tags: ["Product Strategy", "Design Systems", "React"],
    href: "#",
  },
  {
    id: "orbit-ledger",
    title: "Orbit Ledger — CFO Command Center",
    summary:
      "Delivered a performance-first dashboard for finance teams with streaming analytics, forecasting controls, and alerting rituals.",
    tags: ["Data Viz", "Performance", "Accessibility"],
    href: "#",
  },
  {
    id: "swift-issuing",
    title: "Swift Issuing — Card Launch Toolkit",
    summary:
      "Launched modular onboarding and compliance workflows so partners can activate virtual cards in under 48 hours.",
    tags: ["Workflow Automation", "API UX", "Content Design"],
    href: "#",
  },
  {
    id: "synapse-loops",
    title: "SynapseLoops — AI Servicing",
    summary:
      "Embedded AI triage into support tooling to resolve 42% of inbound requests automatically while surfacing rich human handoffs.",
    tags: ["AI Ops", "Service Design", "Node.js"],
    href: "#",
  },
];

export default function WorkSection() {
  return (
    <section
      id="work"
      className={`anchor-section ${styles.work}`}
      aria-labelledby="work-title"
      data-testid="section-work"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="work-title" className={styles.title}>
            Recent partnerships & launch stories
          </h2>
          <p className={styles.subtitle}>
            From scrappy experiments to regulated launches, SwiftSend works alongside product and
            engineering leaders to ship with clarity.
          </p>
        </header>
        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <article key={project.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardSummary}>{project.summary}</p>
              <div className={styles.meta}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={project.href} className={styles.link}>
                Case Study
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
