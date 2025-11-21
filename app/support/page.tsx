"use client";

import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
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

// Individual star layers - significantly increased density for spacey feel
const starsLayerOneStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    // White stars
    "radial-gradient(1.2px 1.2px at 12% 18%, rgba(244, 240, 255, 0.72) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 88% 24%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 34% 42%, rgba(244, 240, 255, 0.65) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 72% 58%, rgba(244, 240, 255, 0.62) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 18% 68%, rgba(244, 240, 255, 0.54) 0%, transparent 100%), " +
    "radial-gradient(1.3px 1.3px at 62% 78%, rgba(244, 240, 255, 0.68) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 45% 88%, rgba(244, 240, 255, 0.6) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 26% 8%, rgba(244, 240, 255, 0.55) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 54% 15%, rgba(244, 240, 255, 0.62) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 78% 32%, rgba(244, 240, 255, 0.48) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 8% 45%, rgba(244, 240, 255, 0.68) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 92% 52%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 48% 65%, rgba(244, 240, 255, 0.52) 0%, transparent 100%), " +
    "radial-gradient(1.3px 1.3px at 15% 82%, rgba(244, 240, 255, 0.64) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 82% 72%, rgba(244, 240, 255, 0.6) 0%, transparent 100%), " +
    // Orange accent stars
    "radial-gradient(1.1px 1.1px at 38% 12%, rgba(255, 138, 61, 0.58) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 68% 28%, rgba(255, 138, 61, 0.48) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 22% 55%, rgba(255, 138, 61, 0.54) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 85% 68%, rgba(255, 138, 61, 0.52) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 58% 85%, rgba(255, 138, 61, 0.46) 0%, transparent 100%)",
  animation: "twinkle 8s ease-in-out infinite",
};

const starsLayerTwoStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    // White stars
    "radial-gradient(1px 1px at 56% 14%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 24% 36%, rgba(244, 240, 255, 0.52) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 78% 48%, rgba(244, 240, 255, 0.66) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 42% 62%, rgba(244, 240, 255, 0.62) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 68% 74%, rgba(244, 240, 255, 0.56) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 92% 84%, rgba(244, 240, 255, 0.6) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 14% 22%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 46% 18%, rgba(244, 240, 255, 0.54) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 32% 52%, rgba(244, 240, 255, 0.64) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 86% 38%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 8% 78%, rgba(244, 240, 255, 0.5) 0%, transparent 100%), " +
    "radial-gradient(1.3px 1.3px at 74% 92%, rgba(244, 240, 255, 0.66) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 52% 72%, rgba(244, 240, 255, 0.56) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 28% 88%, rgba(244, 240, 255, 0.52) 0%, transparent 100%), " +
    // Purple accent stars
    "radial-gradient(1.1px 1.1px at 65% 8%, rgba(196, 107, 247, 0.56) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 18% 42%, rgba(196, 107, 247, 0.52) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 82% 58%, rgba(196, 107, 247, 0.48) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 42% 75%, rgba(196, 107, 247, 0.54) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 12% 92%, rgba(196, 107, 247, 0.5) 0%, transparent 100%)",
  animation: "twinkle 10s ease-in-out infinite 1.5s",
};

const starsLayerThreeStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    // More white stars for depth
    "radial-gradient(0.8px 0.8px at 32% 6%, rgba(244, 240, 255, 0.48) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 76% 12%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 14% 28%, rgba(244, 240, 255, 0.54) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 58% 35%, rgba(244, 240, 255, 0.5) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 88% 45%, rgba(244, 240, 255, 0.62) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 38% 58%, rgba(244, 240, 255, 0.56) 0%, transparent 100%), " +
    "radial-gradient(0.8px 0.8px at 72% 68%, rgba(244, 240, 255, 0.48) 0%, transparent 100%), " +
    "radial-gradient(1.1px 1.1px at 22% 78%, rgba(244, 240, 255, 0.58) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 64% 88%, rgba(244, 240, 255, 0.54) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 48% 95%, rgba(244, 240, 255, 0.52) 0%, transparent 100%), " +
    // Blue accent stars
    "radial-gradient(1.1px 1.1px at 8% 18%, rgba(77, 163, 255, 0.54) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 52% 25%, rgba(77, 163, 255, 0.5) 0%, transparent 100%), " +
    "radial-gradient(0.9px 0.9px at 92% 48%, rgba(77, 163, 255, 0.48) 0%, transparent 100%), " +
    "radial-gradient(1.2px 1.2px at 28% 68%, rgba(77, 163, 255, 0.56) 0%, transparent 100%), " +
    "radial-gradient(1px 1px at 78% 82%, rgba(77, 163, 255, 0.52) 0%, transparent 100%)",
  animation: "twinkle 12s ease-in-out infinite 3s",
};

// Comet/shooting star streaks (CSS-only, very subtle)
const cometOneStyle: CSSProperties = {
  position: "absolute",
  top: "12%",
  right: "15%",
  width: "120px",
  height: "1.5px",
  background:
    "linear-gradient(90deg, transparent 0%, rgba(255, 138, 61, 0.08) 20%, rgba(255, 138, 61, 0.32) 50%, rgba(255, 138, 61, 0.08) 80%, transparent 100%)",
  transform: "rotate(-25deg)",
  filter: "blur(1px)",
  opacity: 0.6,
  animation: "cometSlide 18s ease-in-out infinite",
  pointerEvents: "none",
};

const cometTwoStyle: CSSProperties = {
  position: "absolute",
  top: "58%",
  left: "8%",
  width: "95px",
  height: "1.2px",
  background:
    "linear-gradient(90deg, transparent 0%, rgba(196, 107, 247, 0.06) 20%, rgba(196, 107, 247, 0.28) 50%, rgba(196, 107, 247, 0.06) 80%, transparent 100%)",
  transform: "rotate(-32deg)",
  filter: "blur(1.2px)",
  opacity: 0.5,
  animation: "cometSlide 22s ease-in-out infinite 5s",
  pointerEvents: "none",
};

const cometThreeStyle: CSSProperties = {
  position: "absolute",
  bottom: "18%",
  right: "22%",
  width: "110px",
  height: "1.3px",
  background:
    "linear-gradient(90deg, transparent 0%, rgba(77, 163, 255, 0.07) 20%, rgba(77, 163, 255, 0.3) 50%, rgba(77, 163, 255, 0.07) 80%, transparent 100%)",
  transform: "rotate(-28deg)",
  filter: "blur(1.1px)",
  opacity: 0.55,
  animation: "cometSlide 20s ease-in-out infinite 8s",
  pointerEvents: "none",
};

// Central glassmorphic card - wider to accommodate two columns
const cardStyle: CSSProperties = {
  width: "min(1100px, 100%)",
  maxWidth: "1100px",
  padding: "clamp(42px, 6vw, 56px)",
  borderRadius: "32px",
  background:
    "linear-gradient(152deg, rgba(10, 14, 26, 0.92) 0%, rgba(6, 10, 20, 0.88) 48%, rgba(5, 7, 16, 0.9) 100%)",
  boxShadow:
    "0 40px 90px rgba(5, 7, 18, 0.48), " +
    "0 0 1px rgba(77, 163, 255, 0.28) inset",
  border: "1px solid rgba(77, 163, 255, 0.32)",
  display: "grid",
  gap: "clamp(24px, 4vw, 36px)",
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
  maxWidth: "720px",
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
        <div style={starsLayerThreeStyle} />
      </div>

      {/* Comet/shooting star streaks */}
      <div style={cometOneStyle} aria-hidden="true" />
      <div style={cometTwoStyle} aria-hidden="true" />
      <div style={cometThreeStyle} aria-hidden="true" />

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
        <p style={labelStyle}>SWIFTSEND SUPPORT</p>

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

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/#contact"
            className="btn btn-primary btn-primary--purple-blue"
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
        </div>

        {/* Two-column layout: Chat placeholder + Contact methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-4">
          {/* Left Column: Live Chat Placeholder */}
          <div className="flex flex-col">
            <div className="rounded-2xl bg-slate-950/60 border border-slate-700/50 shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-900/40">
                <div className="flex flex-col items-start">
                  <h3 className="text-slate-100 font-semibold text-base tracking-tight">
                    Live Chat
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Online support available daily 9am–5pm
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-medium">
                  Coming soon
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="p-5 space-y-4 min-h-[280px] flex flex-col justify-end bg-slate-950/30">
                {/* Agent Message */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="rounded-2xl rounded-tl-sm bg-slate-800/70 border border-slate-700/40 px-4 py-2.5 max-w-xs">
                      <p className="text-slate-200 text-sm leading-relaxed">
                        Welcome to SwiftSend Live Chat. We're online 9am–5pm daily. How can we help?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Message Placeholder */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-400 text-xs font-medium">You</span>
                    </div>
                    <div className="rounded-2xl rounded-tr-sm bg-indigo-900/40 border border-indigo-700/40 px-4 py-2.5 max-w-xs">
                      <p className="text-slate-300 text-sm leading-relaxed italic">
                        (Your message will appear here)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input (Disabled) */}
              <div className="px-5 py-4 border-t border-slate-700/50 bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-full bg-slate-900/80 border border-slate-700/60 px-4 py-2.5 text-slate-500 text-sm opacity-60">
                    Type your message...
                  </div>
                  <button
                    disabled
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center opacity-50 cursor-not-allowed"
                    aria-label="Send message (disabled)"
                  >
                    <Send className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Alternative Contact Methods */}
          <div className="flex flex-col gap-5 text-left">
            <div>
              <h3 className="text-slate-100 font-semibold text-lg mb-3 tracking-tight">
                Other ways to reach us
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                While we're building our live chat, you can still get help through these channels:
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="rounded-xl bg-slate-900/50 border border-slate-700/40 p-4 hover:border-slate-600/60 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-200 font-medium text-sm mb-1">Email Support</h4>
                    <a 
                      href="mailto:swift.send.marketing@gmail.com"
                      className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                    >
                      swift.send.marketing@gmail.com
                    </a>
                    <p className="text-slate-500 text-xs mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Build Request */}
              <div className="rounded-xl bg-slate-900/50 border border-slate-700/40 p-4 hover:border-slate-600/60 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-200 font-medium text-sm mb-1">Start a Build Request</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Submit a detailed project request and we'll follow up with a scoped plan and timeline
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="rounded-xl bg-slate-900/50 border border-slate-700/40 p-4 hover:border-slate-600/60 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-200 font-medium text-sm mb-1">Schedule a Call</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Book a discovery session to discuss your project needs in detail
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline styles for animations (respects prefers-reduced-motion) */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes cometSlide {
          0%, 100% {
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          20% {
            opacity: 0.6;
          }
          40% {
            opacity: 0.3;
          }
          60% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.2;
          }
          90% {
            opacity: 0;
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
