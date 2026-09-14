/**
 * LandingPage - Section 0: The Architecture
 *
 * A full-viewport intro showing an animated server architecture diagram
 * arranged in a hexagonal ring. Six nodes orbit around a central
 * "Initiate Request" CTA. Data packets flow along SVG paths between nodes.
 * Clicking the CTA smooth-scrolls to the EntryPoint (terminal boot).
 */

import { forwardRef, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useViewport } from '../../../hooks/useViewport';
import styles from './LandingPage.module.css';

gsap.registerPlugin(ScrollToPlugin);

/* ── Node definitions ── */
interface ArchNode {
  id: string;
  label: string;
  icon: string;
  status: string;
}

const ARCH_NODES: ArchNode[] = [
  { id: 'gateway',  label: 'Gateway',       icon: '🚪', status: 'Listening' },
  { id: 'lb',       label: 'Load Balancer', icon: '⚖️',  status: 'Routing' },
  { id: 'services', label: 'Services',      icon: '⚙️',  status: '4 pods' },
  { id: 'database', label: 'Database',      icon: '💾', status: 'Connected' },
  { id: 'cache',    label: 'Cache',         icon: '⚡', status: 'Hot' },
  { id: 'events',   label: 'Events',        icon: '📡', status: 'Streaming' },
];

/**
 * Compute the (x, y) center position of a node on the hexagonal ring.
 * Angle 0 = top-center; nodes proceed clockwise.
 */
function getNodePosition(
  index: number,
  total: number,
  cx: number,
  cy: number,
  radius: number
) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2; // start from top
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export const LandingPage = forwardRef<HTMLElement>(
  function LandingPage(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const { isMobile, isTablet } = useViewport();

    /* ── Orbit geometry ── */
    const SIZE = isMobile ? 340 : isTablet ? 440 : 520;
    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const RADIUS = isMobile ? 122 : isTablet ? 150 : 185;
    const NODE_W = isMobile ? 80 : isTablet ? 110 : 120;
    const NODE_H = isMobile ? 48 : isTablet ? 72 : 80;

    const positions = ARCH_NODES.map((_, i) =>
      getNodePosition(i, ARCH_NODES.length, CX, CY, RADIUS)
    );

    /* ── Build SVG connection paths between adjacent nodes ── */
    const connectionPaths: string[] = [];
    for (let i = 0; i < ARCH_NODES.length; i++) {
      const from = positions[i];
      const to = positions[(i + 1) % ARCH_NODES.length];
      // Slightly curved line via a midpoint pulled toward center
      const mx = (from.x + to.x) / 2 + (CX - (from.x + to.x) / 2) * 0.15;
      const my = (from.y + to.y) / 2 + (CY - (from.y + to.y) / 2) * 0.15;
      connectionPaths.push(`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`);
    }

    /* ── CTA click handler ── */
    const handleInitiate = useCallback(() => {
      const entryPoint = document.getElementById('entry-point');
      if (entryPoint) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: entryPoint, offsetY: 0 },
          ease: 'power3.inOut',
        });
      }
    }, []);

    /* ── Entrance animation timeline ── */
    useEffect(() => {
      if (!containerRef.current) return;

      const title = containerRef.current.querySelector(`.${styles.titleBlock}`);
      const nodes = containerRef.current.querySelectorAll(`.${styles.nodeWrapper}`);
      const lines = svgRef.current?.querySelectorAll(`.${styles.connectionLine}`);
      const glows = svgRef.current?.querySelectorAll(`.${styles.connectionLineGlow}`);
      const cta = containerRef.current.querySelector(`.${styles.ctaButton}`);
      const pulseRings = containerRef.current.querySelectorAll(`.${styles.ctaPulseRing}`);
      const tagline = containerRef.current.querySelector(`.${styles.tagline}`);

      const tl = gsap.timeline({ delay: 0.3 });
      tlRef.current = tl;

      // 1. Title fades in
      tl.to(title, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      // 2. Nodes appear one by one with staggered scale-up
      tl.to(nodes, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.4)',
      }, '-=0.2');

      // 3. Connection lines draw in
      if (lines) {
        tl.to(lines, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }, '-=0.3');
      }
      if (glows) {
        tl.to(glows, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }, '<');
      }

      // 4. Start dash flow animation on connection lines
      if (lines) {
        tl.call(() => {
          lines.forEach((line) => {
            (line as SVGElement).style.animation = 'dashFlow 1.5s linear infinite';
          });
        });
      }

      // 5. Add breathing to nodes
      tl.call(() => {
        nodes.forEach((node) => {
          const inner = node.querySelector(`.${styles.node}`);
          if (inner) inner.classList.add(styles.nodeBreathing);
        });
      });

      // 6. CTA appears
      tl.to(cta, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2');

      // 7. Pulse rings
      tl.to(pulseRings, {
        opacity: 1,
        duration: 0.3,
      }, '-=0.4');

      // 8. Tagline
      tl.to(tagline, {
        opacity: 0.5,
        duration: 0.5,
      }, '-=0.1');

      return () => {
        tl.kill();
      };
    }, []);

    return (
      <section ref={ref} id="landing" className={styles.landing} data-section="landing">
        <div ref={containerRef} className={styles.landingInner}>
          {/* Title */}
          <div className={styles.titleBlock}>
            <h1 className={styles.name}>Harsh Kumar</h1>
            <p className={styles.subtitle}>Backend Engineer: Distributed Systems + AI</p>
          </div>

          {/* Orbital diagram */}
          <div className={styles.orbitContainer}>
            {/* SVG connections */}
            <svg
              ref={svgRef}
              className={styles.connectionsSvg}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              {connectionPaths.map((d, i) => (
                <g key={i}>
                  {/* Glow layer */}
                  <path d={d} className={styles.connectionLineGlow} />
                  {/* Main line */}
                  <path d={d} className={styles.connectionLine} />
                  {/* Data packet traveling along the path */}
                  <circle r="3" className={styles.dataPacket} opacity="0.8">
                    <animateMotion
                      dur={`${3 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                    >
                      <mpath href={`#orbit-path-${i}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
              {/* Define paths for animateMotion */}
              <defs>
                {connectionPaths.map((d, i) => (
                  <path key={i} id={`orbit-path-${i}`} d={d} />
                ))}
              </defs>
            </svg>

            {/* Architecture nodes */}
            {ARCH_NODES.map((node, i) => {
              const pos = positions[i];
              return (
                <div
                  key={node.id}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className={styles.nodeWrapper}
                  style={{
                    left: `${((pos.x - NODE_W / 2) / SIZE) * 100}%`,
                    top: `${((pos.y - NODE_H / 2) / SIZE) * 100}%`,
                    width: `${(NODE_W / SIZE) * 100}%`,
                  }}
                >
                  <div className={styles.node}>
                    <span className={styles.nodeIcon}>{node.icon}</span>
                    <span className={styles.nodeLabel}>{node.label}</span>
                    <span className={styles.nodeStatus}>
                      <span className={styles.statusDot} />
                      {node.status}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Center CTA */}
            <div className={styles.ctaWrapper}>
              <div className={styles.ctaPulseRing} />
              <div className={styles.ctaPulseRing} />
              <div className={styles.ctaPulseRing} />
              <button
                className={styles.ctaButton}
                onClick={handleInitiate}
                id="initiate-request-btn"
              >
                Initiate <br /> Request
                <span className={styles.ctaArrow}>→</span>
              </button>
            </div>
          </div>

          {/* Bottom tagline */}
          <p className={styles.tagline}>
            Every request has a journey.
          </p>
        </div>
      </section>
    );
  }
);
