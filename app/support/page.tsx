"use client";

import Link from "next/link";
import { type CSSProperties } from "react";

// Main container: full-height cosmic section with dark space background
const shellStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "min(12vh, 160px) clamp(24px, 7vw, 96px) 120px",
  position: "relative",
  isolation: "isolate",
  background: "#050712",
  backgroundColor: "#050712",
};

// Cosmic gradient overlays (orange → purple → blue)
const gradientOverlayTopStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "50%",
  background:
    "radial-gradient(68% 68% at 18% 12%, rgba(196, 107, 247, 0.14) 0%, rgba(5, 7, 18, 0) 68%), " +
    "radial-gradient(62% 62% at 85% 18%, rgba(255, 138, 61, 0.12) 0%, rgba(5, 7, 18, 0) 72%)",
  pointerEvents: "none",
  opacity: 0.8,
};

const gradientOverlayBottomStyle: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "50%",
  background:
    "radial-gradient(72% 72% at 22% 88%, rgba(77, 163, 255, 0.16) 0%, rgba(5, 7, 18, 0) 68%)",
  pointerEvents: "none",
  opacity: 0.75,
};

// Starfield container (small dots/stars)
const starfieldStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
};

// Individual star layers
const starsLayerOneStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(1.2px 1.2px at 12% 18%, rgba(244, 240, 255, 0.72) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 88% 24%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 34% 42%, rgba(244, 240, 255, 0.65) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 72% 58%, rgba(244, 240, 255, 0.62) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 18% 68%, rgba(244, 240, 255, 0.54) 0%, transparent 100%), " +
    "radial-gradient(1.3px 1.3px at 62% 78%, rgba(244, 240, 255, 0.68) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 45% 88%, rgba(244, 240, 255, 0.6) 0%, transparent 100%)",
  animation: "twinkle 8s ease-in-out infinite",
};

const starsLayerTwoStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(1px 1px at 56% 14%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 24% 36%, rgba(244, 240, 255, 0.52) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 78% 48%, rgba(244, 240, 255, 0.66) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 42% 62%, rgba(244, 240, 255, 0.62) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 68% 74%, rgba(244, 240, 255, 0.56) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 92% 84%, rgba(244, 240, 255, 0.6) 0%, transparent 100%)",
  animation: "twinkle 10s ease-in-out infinite 1.5s",
};

// Central glassmorphic card
const cardStyle: CSSProperties = {
  width: "min(680px, 100%)",
  maxWidth: "680px",
  padding: "clamp(42px, 6vw, 56px)",
  borderRadius: "32px",
  background:
    "linear-gradient(152deg, rgba(10, 14, 26, 0.92) 0%, rgba(6, 10, 20, 0.88) 48%, rgba(5, 7, 16, 0.9) 100%)",
  boxShadow:
    "0 40px 90px rgba(5, 7, 18, 0.48), " +
    "0 0 1px rgba(77, 163, 255, 0.28) inset",
  border: "1px solid rgba(77, 163, 255, 0.32)",
  display: "grid",
  gap: "clamp(20px, 4vw, 30px)",
  textAlign: "center",
  position: "relative",
  transition: "transform 320ms ease, box-shadow 320ms ease, border-color 320ms ease",
};

// Top label (small caps)
const labelStyle: CSSProperties = {
  fontSize: "0.82rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(205, 218, 255, 0.68)",
  margin: 0,
  fontWeight: 500,
};

// Main heading
const headingStyle: CSSProperties = {
  fontSize: "clamp(2.2rem, 5vw, 2.85rem)",
  lineHeight: 1.12,
  margin: 0,
  color: "#f8f9ff",
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

// Subheading/body (explains the feature)
const subheadingStyle: CSSProperties = {
  color: "rgba(220, 228, 255, 0.80)",
  fontSize: "1.08rem",
  lineHeight: 1.68,
  margin: 0,
  maxWidth: "540px",
  marginLeft: "auto",
  marginRight: "auto",
};

// Current contact line
const contactLineStyle: CSSProperties = {
  color: "rgba(210, 220, 255, 0.72)",
  fontSize: "0.98rem",
  lineHeight: 1.62,
  margin: 0,
  marginTop: "4px",
};

// CTA row container
const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  marginTop: "8px",
};

// Secondary email link (subtle, no button chrome)
const emailLinkStyle: CSSProperties = {
  color: "rgba(200, 215, 255, 0.76)",
  fontSize: "0.94rem",
  textDecoration: "none",
  transition: "color 200ms ease",
};

export default function SupportPage() {
  return (
    <main style={shellStyle}>
      {/* Cosmic gradient overlays */}
      <div style={gradientOverlayTopStyle} aria-hidden="true" />
      <div style={gradientOverlayBottomStyle} aria-hidden="true" />
      
      {/* Starfield background */}
      <div style={starfieldStyle} aria-hidden="true">
        <div style={starsLayerOneStyle} />
        <div style={starsLayerTwoStyle} />
      </div>

      {/* Central glass card */}
      <section
        style={cardStyle}
        aria-labelledby="support-title"
        className="support-card"
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = "translateY(-3px)";
          target.style.boxShadow =
            "0 48px 100px rgba(5, 7, 18, 0.56), " +
            "0 0 1px rgba(77, 163, 255, 0.4) inset, " +
            "0 0 36px rgba(77, 163, 255, 0.18)";
          target.style.borderColor = "rgba(77, 163, 255, 0.42)";
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = "translateY(0)";
          target.style.boxShadow =
            "0 40px 90px rgba(5, 7, 18, 0.48), " +
            "0 0 1px rgba(77, 163, 255, 0.28) inset";
          target.style.borderColor = "rgba(77, 163, 255, 0.32)";
        }}
      >
        {/* Label */}
        <p style={labelStyle}>SwiftSend Support</p>

        {/* Main heading */}
        <h1 id="support-title" style={headingStyle}>
          Support chat coming soon
        </h1>

        {/* Subheading */}
        <p style={subheadingStyle}>
          We're wiring up real-time, human + AI support so you can get answers mid-build, not days later.
          Until then, you can still reach us for help and project scoping.
        </p>

        {/* Current contact line */}
        <p style={contactLineStyle}>
          Need help now? Start a build and we'll follow up with a scoped plan and timeline.
        </p>

        {/* CTA row */}
        <div style={ctaRowStyle}>
          {/* Primary button: Start a build (matching hero button style) */}
          <Link
            href="/#contact"
            className="btn btn-primary btn-primary--purple-blue"
            style={{
              scrollMarginTop: "calc(var(--header-h, 96px) + 8px)",
            }}
          >
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
          </Link>

          {/* Secondary email link */}
          <a
            href="mailto:swift.send.marketing@gmail.com"
            style={emailLinkStyle}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "rgba(240, 245, 255, 0.92)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "rgba(200, 215, 255, 0.76)";
            }}
          >
            Or email us at swift.send.marketing@gmail.com
          </a>
        </div>
      </section>

      {/* Inline styles for twinkle animation (respects prefers-reduced-motion) */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          main * {
            animation: none !important;
          }
          .support-card {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}
