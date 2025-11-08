import Link from "next/link";
import { type CSSProperties } from "react";

import Logo from "@/components/shared/Logo";

const shellStyle: CSSProperties = {
  minHeight: "calc(100vh - var(--header-h, 96px))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "min(12vh, 160px) clamp(24px, 7vw, 96px) 120px",
  position: "relative",
  isolation: "isolate",
  background:
    "radial-gradient(72% 72% at 20% 18%, rgba(70, 118, 214, 0.28) 0%, rgba(5, 7, 18, 0) 68%), " +
    "radial-gradient(68% 68% at 80% 88%, rgba(255, 140, 64, 0.24) 0%, rgba(5, 7, 18, 0) 72%)",
};

const glowStyle: CSSProperties = {
  position: "absolute",
  inset: "-20%",
  background:
    "radial-gradient(60% 60% at 50% 30%, rgba(58, 123, 255, 0.24) 0%, rgba(58, 123, 255, 0) 70%)",
  filter: "blur(80px)",
  opacity: 0.6,
  pointerEvents: "none",
};

const cardStyle: CSSProperties = {
  width: "min(560px, 100%)",
  padding: "clamp(36px, 5vw, 52px)",
  borderRadius: "28px",
  background:
    "linear-gradient(152deg, rgba(12, 16, 30, 0.94) 0%, rgba(7, 11, 22, 0.88) 48%, rgba(5, 7, 18, 0.9) 100%)",
  boxShadow: "0 36px 80px rgba(5, 7, 18, 0.38)",
  border: "1px solid rgba(84, 133, 214, 0.28)",
  display: "grid",
  gap: "clamp(18px, 3.6vw, 28px)",
  textAlign: "left",
  position: "relative",
};

const eyebrowStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.75rem",
  fontSize: "0.85rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(214, 224, 255, 0.72)",
};

const headingStyle: CSSProperties = {
  fontSize: "clamp(2.05rem, 4vw, 2.65rem)",
  lineHeight: 1.15,
  margin: 0,
  color: "#f6f8ff",
};

const leadStyle: CSSProperties = {
  color: "rgba(226, 234, 255, 0.82)",
  fontSize: "1.05rem",
  lineHeight: 1.7,
  margin: 0,
};

const bodyStyle: CSSProperties = {
  color: "rgba(214, 224, 255, 0.72)",
  fontSize: "0.98rem",
  lineHeight: 1.65,
  margin: 0,
};

const ctaStackStyle: CSSProperties = {
  display: "grid",
  gap: "12px",
  gridTemplateColumns: "minmax(0, 1fr)",
};

const secondaryStyle: CSSProperties = {
  margin: 0,
  color: "rgba(205, 218, 255, 0.72)",
  fontSize: "0.95rem",
  lineHeight: 1.6,
};

const inlineLinkStyle: CSSProperties = {
  color: "rgba(255, 255, 255, 0.86)",
  textDecoration: "underline",
  textDecorationThickness: "1px",
  textUnderlineOffset: "4px",
};

export default function SupportPage() {
  return (
    <main style={shellStyle}>
      <div style={glowStyle} aria-hidden="true" />
      <section style={cardStyle} aria-labelledby="support-title">
        <span style={eyebrowStyle}>
          <Logo
            className="brand"
            showWordmark={false}
            size="sm"
            ariaLabel="SwiftSend — Home"
            prefetch={false}
          />
          Support Crew
        </span>
        <h1 id="support-title" style={headingStyle}>
          Support
        </h1>
        <p style={leadStyle}>
          When something needs a fast fix, this is the lane. Tell us what broke, what blocked, and we’ll
          triage it with the same velocity we build new work.
        </p>
        <p style={bodyStyle}>
          Start a build request to drop the details, attach context, and we’ll loop in the right specialist. You’ll
          hear from us with next steps in one business day or sooner.
        </p>
        <div style={ctaStackStyle}>
          <Link href={{ pathname: "/", hash: "contact" }} prefetch={false} className="btn btn-primary">
            Start a Build
          </Link>
          <Link href="/" prefetch={false} className="btn btn-ghost">
            Back to Home
          </Link>
        </div>
        <p style={secondaryStyle}>
          Prefer direct contact?{" "}
          <a href="mailto:hello@swiftsend.dev" style={inlineLinkStyle}>
            Email us
          </a>{" "}
          or
          {" "}
          <Link href="/schedule" prefetch={false} style={inlineLinkStyle}>
            schedule a live session
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
