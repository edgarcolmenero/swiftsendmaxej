'use client';

import { RefObject, useEffect, useRef } from 'react';
import { shouldReduceMotion } from '@/lib/utils/motion';

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
}

const STAR_COUNT = 160;

export function useStarfield(canvasRef: RefObject<HTMLCanvasElement>) {
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let stars: Star[] = [];
    const reduceMotion = shouldReduceMotion();

    const setup = () => {
      const { width, height } = getCanvasSize(canvas);
      stars = Array.from({ length: STAR_COUNT }, () => createStar(width, height));
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas(canvas);
        setup();
        if (reduceMotion) {
          drawStatic(context, stars, canvas);
        }
      });

      resizeObserver.observe(canvas);
    }
    resizeCanvas(canvas);
    setup();

    const render = () => {
      if (!canvas || !context) {
        return;
      }

      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        const perspective = 200;
        const scale = perspective / (perspective + star.z);
        const x = star.x * scale + width / 2;
        const y = star.y * scale + height / 2;

        if (reduceMotion) {
          context.fillStyle = 'rgba(255, 255, 255, 0.6)';
          context.fillRect(x, y, 2, 2);
          continue;
        }

        star.z -= star.speed;
        if (star.z <= 0) {
          Object.assign(star, createStar(width, height));
          star.z = perspective;
        }

        const radius = Math.max(0.6, 1.8 * (1 - star.z / perspective));
        context.fillStyle = 'rgba(255, 255, 255, 0.85)';
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (!reduceMotion) {
        animationFrame.current = window.requestAnimationFrame(render);
      }
    };

    drawStatic(context, stars, canvas);
    if (!reduceMotion) {
      animationFrame.current = window.requestAnimationFrame(render);
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      } else if (document.visibilityState === 'visible' && !reduceMotion && !animationFrame.current) {
        animationFrame.current = window.requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver?.disconnect();
    };
  }, [canvasRef]);
}

function getCanvasSize(canvas: HTMLCanvasElement) {
  const { clientWidth, clientHeight } = canvas;
  return { width: clientWidth, height: clientHeight };
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const { clientWidth, clientHeight } = canvas;
  canvas.width = Math.round(clientWidth * dpr);
  canvas.height = Math.round(clientHeight * dpr);
  const context = canvas.getContext('2d');
  if (context) {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}

function createStar(width: number, height: number): Star {
  return {
    x: (Math.random() - 0.5) * width,
    y: (Math.random() - 0.5) * height,
    z: Math.random() * 200,
    speed: Math.random() * 0.8 + 0.2,
  };
}

function drawStatic(context: CanvasRenderingContext2D, stars: Star[], canvas: HTMLCanvasElement) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    const x = star.x + canvas.width / 2;
    const y = star.y + canvas.height / 2;
    context.fillStyle = 'rgba(255, 255, 255, 0.45)';
    context.fillRect(x, y, 2, 2);
  }
}
