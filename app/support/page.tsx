"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Phone, Mail, CircleHelp, MessageSquare, Send } from "lucide-react";
import BackgroundStarfield from "@/components/chrome/BackgroundStarfield";
import { setupStarfield } from "@/lib/starfield";

export default function SupportPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = starsRef.current;
    if (!section || !canvas) return;

    const motionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : (null as unknown as MediaQueryList);

    const cleanup = setupStarfield({
      canvas,
      section,
      mediaQuery: motionQuery,
      densityScale: 1,
    });

    const revealElements = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'));
    const prefersReduced = () => !!motionQuery && motionQuery.matches;

    let observer: IntersectionObserver | null = null;

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' }
      );

      revealElements.forEach((el) => observer?.observe(el));
    }

    return () => {
      cleanup();
      observer?.disconnect();
    };
  }, []);

  return (
    <main className="relative overflow-hidden">
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-16 md:py-20 px-6 bg-gradient-to-b from-[#030617] via-[#020310] to-[#020109]"
        aria-labelledby="support-title"
      >
        {/* Starfield background */}
        <canvas ref={starsRef} className="starfield-canvas" aria-hidden="true" />
        <BackgroundStarfield />

        {/* Large radial gradient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 40% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 60%), ' +
              'radial-gradient(circle at 70% 60%, rgba(249, 115, 22, 0.12) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
          aria-hidden="true"
        />

        {/* Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-10" data-reveal>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
              SUPPORT CREW
            </p>
            <h1 id="support-title" className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support
            </h1>
            <p className="max-w-2xl mx-auto text-center text-white/70 text-base md:text-lg leading-relaxed">
              When something needs a fast fix, this is the lane. Tell us what broke or what's blocked, and we'll route it to the right specialist.
            </p>
          </header>

          {/* Two-column layout */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start" data-reveal>
            {/* Left column: Live Chat card */}
            <div className="relative rounded-3xl border border-white/10 bg-[#050814]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-6 md:p-8 transition-all duration-300 hover:border-white/20">
              <div className="card-accent" aria-hidden="true" />
              <div className="card-glass" aria-hidden="true" />
              <div className="card-border" aria-hidden="true" />

              {/* Card heading */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Live Chat</h2>
                  <p className="text-sm text-white/70">
                    Chat with our support team. Online support will be available daily 9am–5pm CT.
                  </p>
                </div>
                <span className="flex-shrink-0 text-xs text-white/70 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  Coming soon
                </span>
              </div>

              {/* Chat mock window */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 space-y-3">
                {/* System message */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-300">S</span>
                  </div>
                  <div className="flex-1 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3 py-2">
                    <p className="text-sm text-white/80">
                      Welcome to SwiftSend Live Chat. We're online 9am–5pm CT. How can we help?
                    </p>
                  </div>
                </div>

                {/* User placeholder bubble */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1 max-w-[70%] rounded-2xl rounded-tr-sm bg-white/[0.03] border border-white/5 px-3 py-2">
                    <p className="text-sm text-white/40 italic">
                      (Your message will appear here)
                    </p>
                  </div>
                </div>

                {/* Disabled input row */}
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 opacity-60 cursor-not-allowed">
                  <span className="text-sm text-white/40 flex-1">
                    Type your message… (coming soon)
                  </span>
                  <Send className="w-4 h-4 text-white/30" />
                </div>
              </div>

              {/* Hours text */}
              <div className="mt-3 space-y-1 text-xs text-white/40">
                <p>Online support hours: Daily 9am–5pm CT</p>
                <p>Business hours: Mon–Sat 9am–5pm; Sun Closed</p>
              </div>
            </div>

            {/* Right column: Other ways to reach us */}
            <div className="rounded-3xl border border-white/10 bg-[#050814]/80 backdrop-blur-xl p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-white/80 mb-4">
                Other ways to reach us
              </h3>

              {/* Contact rows */}
              <div className="space-y-4">
                {/* Call us */}
                <div className="flex items-start gap-3 p-2 rounded-2xl hover:bg-white/5 transition">
                  <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Call us</p>
                    <p className="text-xs text-white/60">+1 (800) 527-3693</p>
                  </div>
                </div>

                {/* Email support */}
                <a
                  href="mailto:hello@swiftsend.dev"
                  className="flex items-start gap-3 p-2 rounded-2xl hover:bg-white/5 transition group"
                >
                  <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white group-hover:underline">Email support</p>
                    <p className="text-xs text-white/60">hello@swiftsend.dev</p>
                  </div>
                </a>

                {/* FAQs */}
                <a
                  href="#faq"
                  className="flex items-start gap-3 p-2 rounded-2xl hover:bg-white/5 transition group"
                >
                  <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <CircleHelp className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white group-hover:underline">FAQs</p>
                    <p className="text-xs text-white/60">Browse common questions</p>
                  </div>
                </a>

                {/* Contact form */}
                <a
                  href="/#contact"
                  className="flex items-start gap-3 p-2 rounded-2xl hover:bg-white/5 transition group"
                >
                  <div className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white group-hover:underline">Contact form</p>
                    <p className="text-xs text-white/60">Use our project form to start a build request</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* CTA buttons at the bottom */}
          <div className="mt-10 flex flex-col items-center gap-4" data-reveal>
            <a href="/#contact" className="btn btn-primary btn-primary--purple-blue">
              Start a Build
            </a>
            <Link
              href="/"
              className="text-sm text-white/70 border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 hover:border-white/20 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
