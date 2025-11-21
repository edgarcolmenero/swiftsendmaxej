export type StarfieldCleanup = () => void;

export type StarfieldOptions = {
  section: HTMLElement;
  canvas: HTMLCanvasElement;
  mediaQuery?: MediaQueryList | null;
  densityScale?: number;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
};

export function setupStarfield({
  section,
  canvas,
  mediaQuery = null,
  densityScale = 1,
}: StarfieldOptions): StarfieldCleanup {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars: Star[] = [];
  let rafId: number | null = null;
  let inView = false;

  const reduceMotion = () => !!mediaQuery && mediaQuery.matches;

  const STAR_COLORS = [
    "rgba(255,255,255,0.85)",
    "rgba(214,60,255,0.78)",
    "rgba(255,150,43,0.72)",
  ] as const;

  const createStar = (): Star => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + Math.random() * 1.4,
    speed: 0.06 + Math.random() * 0.1,
    drift: (Math.random() - 0.5) * 0.05,
    twinkleSpeed: 0.008 + Math.random() * 0.02,
    twinkleOffset: Math.random() * Math.PI * 2,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  });

  const render = (skipUpdate = false) => {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    const now = performance.now();

    for (let i = 0; i < stars.length; i += 1) {
      const star = stars[i];

      if (!skipUpdate && !reduceMotion()) {
        star.y += star.speed;
        star.x += star.drift;

        if (star.y > height + 16) star.y = -16;
        if (star.x > width + 16) star.x = -16;
        else if (star.x < -16) star.x = width + 16;
      }

      const twinkle = 0.35 + (Math.sin(now * star.twinkleSpeed + star.twinkleOffset) + 1) * 0.325;

      context.globalAlpha = twinkle;
      context.fillStyle = star.color;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 1;

    if (!skipUpdate && inView && !reduceMotion()) {
      rafId = window.requestAnimationFrame(() => render(false));
    }
  };

  const initStars = () => {
    const density = Math.max(68, Math.floor(((width * height) / 18000) * densityScale));
    stars = Array.from({ length: density }, createStar);
  };

  const sizeCanvas = () => {
    const rect = section.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    initStars();
    render(true);
  };

  const start = () => {
    if (reduceMotion()) {
      render(true);
      return;
    }

    if (rafId == null) {
      rafId = window.requestAnimationFrame(() => render(false));
    }
  };

  const stop = () => {
    if (rafId != null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const handleResize = () => {
    sizeCanvas();
  };

  const handleMotionChange = () => {
    if (reduceMotion()) {
      stop();
      render(true);
    } else if (inView) {
      start();
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === section) {
          inView = entry.isIntersecting;
          if (inView) start();
          else stop();
        }
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
  );

  observer.observe(section);

  sizeCanvas();

  if (reduceMotion()) {
    render(true);
  } else {
    start();
  }

  window.addEventListener("resize", handleResize, { passive: true });

  if (mediaQuery) {
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleMotionChange);
    }
  }

  return () => {
    stop();
    observer.disconnect();
    window.removeEventListener("resize", handleResize);
    if (mediaQuery) {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleMotionChange);
      }
    }
  };
}
