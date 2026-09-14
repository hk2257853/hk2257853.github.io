/**
 * ParticleCanvas - Ambient floating particles with connection lines.
 * Creates a living, breathing background layer.
 *
 * Performance:
 * - Uses half-res canvas on mobile (0.5 DPR)
 * - Reduces particle count on smaller screens
 * - Pauses when tab is not visible
 * - Respects prefers-reduced-motion
 */

import { useRef, useEffect } from 'react';
import { useViewport } from '../../../hooks/useViewport';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import {
  createParticle,
  updateParticle,
  drawParticle,
  drawConnections,
  type Particle,
} from './particles';
import styles from './ParticleCanvas.module.css';

interface ParticleCanvasProps {
  desktopCount?: number;
  mobileCount?: number;
  connectionDistance?: number;
}

export function ParticleCanvas({
  desktopCount = 80,
  mobileCount = 30,
  connectionDistance = 120,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const { isMobile } = useViewport();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use lower DPR on mobile for performance
    const dpr = isMobile ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 2);
    const count = isMobile ? mobileCount : desktopCount;

    function resize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    resize();

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(window.innerWidth, window.innerHeight)
    );

    let isVisible = true;

    function handleVisibility() {
      isVisible = !document.hidden;
    }
    document.addEventListener('visibilitychange', handleVisibility);

    function animate() {
      if (!ctx || !canvas || !isVisible) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update and draw particles
      for (const p of particles) {
        updateParticle(p, w, h);
        drawParticle(ctx, p, dpr);
      }

      // Draw connections (skip on mobile for perf)
      if (!isMobile) {
        drawConnections(ctx, particles, connectionDistance, dpr);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resize, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isMobile, prefersReduced, desktopCount, mobileCount, connectionDistance]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
