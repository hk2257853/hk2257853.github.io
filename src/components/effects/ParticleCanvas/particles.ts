/**
 * Particle system - lightweight custom implementation.
 * Renders ambient floating particles on a canvas layer.
 * Automatically reduces count on mobile for performance.
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDirection: number;
  hue: number;
}

export function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    opacityDirection: Math.random() > 0.5 ? 1 : -1,
    hue: 175 + (Math.random() - 0.5) * 20, // Around cyan-teal
  };
}

export function updateParticle(p: Particle, width: number, height: number): void {
  p.x += p.vx;
  p.y += p.vy;

  // Breathe opacity
  p.opacity += p.opacityDirection * 0.002;
  if (p.opacity > 0.5) p.opacityDirection = -1;
  if (p.opacity < 0.05) p.opacityDirection = 1;

  // Wrap around edges
  if (p.x < -10) p.x = width + 10;
  if (p.x > width + 10) p.x = -10;
  if (p.y < -10) p.y = height + 10;
  if (p.y > height + 10) p.y = -10;
}

export function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  dpr: number
): void {
  ctx.beginPath();
  ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
  ctx.fill();
}

/**
 * Draw faint connection lines between nearby particles.
 */
export function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  maxDist: number,
  dpr: number
): void {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.08;
        ctx.beginPath();
        ctx.moveTo(particles[i].x * dpr, particles[i].y * dpr);
        ctx.lineTo(particles[j].x * dpr, particles[j].y * dpr);
        ctx.strokeStyle = `hsla(175, 60%, 55%, ${alpha})`;
        ctx.lineWidth = 0.5 * dpr;
        ctx.stroke();
      }
    }
  }
}
