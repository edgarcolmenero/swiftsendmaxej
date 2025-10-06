'use client';

import { useRef } from 'react';
import { useStarfield } from './useStarfield';

interface StarfieldCanvasProps {
  className?: string;
  id?: string;
}

export function StarfieldCanvas({ className, id = 'fx-stars' }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useStarfield(canvasRef);

  return <canvas id={id} ref={canvasRef} className={className} aria-hidden="true" />;
}
