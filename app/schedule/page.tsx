import Link from "next/link";
import { type CSSProperties } from "react";

import Logo from "@/components/shared/Logo";

const shellStyle: CSSProperties = {
  minHeight: "calc(100vh - var(--header-h, 96px))",
  display: "grid",
  placeItems: "center",
  padding: "min(12vh, 160px) 16px 120px",
};

const cardStyle: CSSProperties = {
  width: "min(520px, 100%)",
  padding: "clamp(32px, 5vw, 48px)",
  borderRadius: "24px",
  background:
    "linear-gradient(145deg, rgba(12, 16, 30, 0.92), rgba(8, 12, 26, 0.88)), rgba(6, 10, 22, 0.82)",
  boxShadow: "0 28px 60px rgba(5, 7, 18, 0.35)",
  display: "grid",
  gap: "clamp(16px, 3vw, 24px)",
  textAlign: "center",
};

const noteStyle: CSSProperties = {
  color: "rgba(226, 234, 255, 0.7)",
  fontSize: "0.95rem",
  lineHeight: 1.6,
};

const headingStyle: CSSProperties = {
  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
  margin: 0,
};

export default function SchedulePage() {
  return (
    <main style={shellStyle}>
      <section style={cardStyle} aria-labelledby="schedule-title">
        <Logo
          className="brand"
          showWordmark={false}
          size="lg"
          prefetch={false}
          imageSizes="44px"
        />
        <h1 id="schedule-title" style={headingStyle}>
          Schedule
        </h1>
        <p style={noteStyle}>This is a stub page. Feature work pending.</p>
        <Link href="/" prefetch={false} className="btn btn-primary">
          Back to home
        </Link>
      </section>
    </main>
  );
}
