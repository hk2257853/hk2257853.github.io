import { forwardRef, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import styles from './LandingPage.module.css';

const NODES = [
  { name: 'Gateway', icon: '🚪', status: 'Listening' },
  { name: 'Load balancer', icon: '⚖️', status: 'Routing' },
  { name: 'Services', icon: '⚙️', status: 'Ready' },
  { name: 'Database', icon: '💾', status: 'Connected' },
  { name: 'Cache', icon: '⚡', status: 'Warm' },
  { name: 'Events', icon: '📡', status: 'Streaming' },
];
const POINTS = NODES.map((_, i) => {
  const angle = i * Math.PI / 3 - Math.PI / 2;
  return { x: 260 + 184 * Math.cos(angle), y: 260 + 184 * Math.sin(angle) };
});
const ORBIT = 'M ' + POINTS.map(p => p.x + ',' + p.y).join(' L ') + ' Z';

export const LandingPage = forwardRef<HTMLElement>(function LandingPage(_props, ref) {
  const reduced = useReducedMotion();
  const [launching, setLaunching] = useState(false);
  const packetRef = useRef<SVGCircleElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeNode, setActiveNode] = useState(-1);
  useEffect(() => () => { timelineRef.current?.kill(); }, []);

  const launch = () => {
    if (launching) return;
    const arrive = () => {
      document.getElementById('api-gateway')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      setLaunching(false);
      setActiveNode(-1);
    };
    if (reduced) { arrive(); return; }
    setLaunching(true);
    const timeline = gsap.timeline({ onComplete: arrive });
    timelineRef.current = timeline;
    timeline.set(packetRef.current, { attr: { cx: 260, cy: 260 }, opacity: 1 });
    [...POINTS, POINTS[0]].forEach((point, i) => {
      timeline.to(packetRef.current, {
        // Every hop covers the same distance, so keep the speed uniform.
        attr: { cx: point.x, cy: point.y }, duration: 0.85,
        ease: 'power1.inOut', onStart: () => setActiveNode(i % NODES.length),
      });
    });
    timeline.to(packetRef.current, { opacity: 0, duration: 0.35 });
  };

  return (
    <section ref={ref} id="landing" className={styles.landing} data-section="landing" aria-labelledby="origin-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}><span /> A backend engineer’s portfolio</p>
        <h1 id="origin-title" className={styles.name}>Harsh Kumar</h1>
        <p className={styles.subtitle}>Distributed systems. Thoughtful automation. Real impact.</p>
        <div className={styles.orbit}>
          <svg viewBox="0 0 520 520" className={styles.connections} aria-hidden="true">
            <path id="landing-orbit" d={ORBIT} className={styles.connection} />
            <path d="M260 260 L260 76" className={styles.spoke} />
            {!reduced && !launching && <circle r="3" className={styles.idlePacket}>
              <animateMotion dur="15s" repeatCount="indefinite"><mpath href="#landing-orbit" /></animateMotion>
            </circle>}
            <circle ref={packetRef} r="6" cx="260" cy="260" className={styles.requestPacket} />
          </svg>
          {NODES.map((node, i) => <div key={node.name}
            className={styles.node + (activeNode === i ? ' ' + styles.activeNode : '')}
            style={{ left: POINTS[i].x / 5.2 + '%', top: POINTS[i].y / 5.2 + '%' }}>
            <span className={styles.icon} aria-hidden="true">{node.icon}</span>
            <span className={styles.nodeName}>{node.name}</span>
            <span className={styles.status}><i />{activeNode === i ? 'Received' : node.status}</span>
          </div>)}
          <button type="button" className={styles.cta} onClick={launch} disabled={launching}
            id="initiate-request-btn" data-umami-event="Initiate Request CTA">
            {launching ? <>Routing<span>your request…</span></> : <>Initiate<span>request ↗</span></>}
          </button>
        </div>
        <p className={styles.tagline} role="status">{launching ? 'Your journey starts at the gateway.' : 'Every request has a journey. Follow this one.'}</p>
        <a className={styles.skip} href="#microservices">Or go straight to the work ↓</a>
      </div>
    </section>
  );
});

