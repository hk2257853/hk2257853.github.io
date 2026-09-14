/**
 * AutoScaler - Section 4: The Force Multiplier
 *
 * Traffic spikes → a single pod scales to 4 pods → the "1 engineer → 4x output"
 * narrative unfolds → before/after comparison → proof points animate in.
 */

import { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './AutoScaler.module.css';

const CORE_FUNDAMENTALS = [
  'System Design: Data consistency, caching & failure modes',
  'Deep Debugging: Tracing race conditions & performance bottlenecks',
  'Clean Code: Idiomatic Java/Spring, strict OOP & concurrency',
  'Algorithmic Thinking: ICPC Regionalist & competitive programming',
];

const AI_LEVERAGE = [
  'Custom Tooling: Building IDE MCP bridges to DBs & internal platforms',
  'Workflow Automation: Autonomous test generation (100+ API scenarios)',
  'Parallel Execution: Fast prototyping, evaluation & shipping at 4× velocity',
  'Precision Steering: Knowing what to automate, how it breaks, and why',
];

const PROOF_POINTS = [
  {
    icon: '🧠',
    text: 'Fundamentals catch what AI misses: ',
    highlight: 'Race conditions, consistency boundaries, failure modes that only appear at scale - these require real systems knowledge, not better prompts.',
  },
  {
    icon: '🔧',
    text: 'Custom tooling, not generic prompts: ',
    highlight: 'Built MCP servers and Chrome extensions from scratch - purpose-built to eliminate toil in real workflows, adopted by 50+ engineers.',
  },
  {
    icon: '🚀',
    text: 'Measured in production: ',
    highlight: '60+ API adoptions in 2 weeks (4-week estimate), 100+ test scenarios automated, onboarding cut from weeks to days. The 4x is the output, not the claim.',
  },
];

export const AutoScaler = forwardRef<HTMLElement>(
  function AutoScaler(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const label = containerRef.current.querySelector(`.${styles.componentLabel}`);
      const title = containerRef.current.querySelector(`.${styles.sectionTitle}`);
      const subtitle = containerRef.current.querySelector(`.${styles.subtitle}`);
      const viz = containerRef.current.querySelector(`.${styles.scalingViz}`);
      const scaledPods = containerRef.current.querySelectorAll(`.${styles.pod}.${styles.scaled}`);
      const multiplier = containerRef.current.querySelector(`.${styles.multiplierLabel}`);
      const columns = containerRef.current.querySelectorAll(`.${styles.comparisonColumn}`);
      const divider = containerRef.current.querySelector(`.${styles.comparisonDivider}`);
      const proofs = containerRef.current.querySelectorAll(`.${styles.proofPoint}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(label, { opacity: 0.7, duration: 0.3 });
      tl.to(title, { opacity: 1, duration: 0.4 }, '-=0.1');
      tl.to(subtitle, { opacity: 1, duration: 0.4 }, '-=0.2');

      // Show scaling viz
      tl.to(viz, { opacity: 1, duration: 0.3 });

      // Scale up pods one by one
      scaledPods.forEach((pod) => {
        tl.to(pod, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.4)',
          onComplete: () => pod.classList.add(styles.visible),
        }, '-=0.1');
      });

      // Multiplier number
      tl.to(multiplier, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.1');

      // Comparison columns
      tl.to(columns[0], { opacity: 1, duration: 0.4 }, '-=0.2');
      if (divider) tl.to(divider, { opacity: 1, duration: 0.2 }, '-=0.2');
      tl.to(columns[1], { opacity: 1, duration: 0.4 }, '-=0.2');

      // Proof points stagger
      tl.to(proofs, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=0.1');

      return () => { tl.kill(); };
    }, []);

    return (
      <section ref={ref} id="auto-scaler" className={styles.scaler} data-section="auto-scaler">
        <div ref={containerRef} className={styles.scalerInner}>
          <div className={styles.componentLabel}>📈 Horizontal Scaling</div>
          <h2 className={styles.sectionTitle}>Scaling Up...</h2>
          <p className={styles.subtitle}>
            Deep fundamentals in system design and debugging, multiplied by custom AI tooling.
            Not just faster - structurally more capable.
          </p>

          {/* Scaling visualization: 1 pod → 4 pods */}
          <div className={styles.scalingViz}>
            <div className={styles.podGroup}>
              <div className={`${styles.pod} ${styles.origin}`}>1×</div>
            </div>
            <div className={styles.scalingArrow}>→</div>
            <div className={styles.podGroup}>
              <div className={`${styles.pod} ${styles.origin}`}>1×</div>
              <div className={`${styles.pod} ${styles.scaled}`}>2×</div>
              <div className={`${styles.pod} ${styles.scaled}`}>3×</div>
              <div className={`${styles.pod} ${styles.scaled}`}>4×</div>
            </div>
          </div>

          {/* 4x multiplier */}
          <div className={styles.multiplierLabel}>
            4×
            <span>output multiplier</span>
          </div>

          {/* Before / After */}
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonColumn}>
              <div className={styles.comparisonTitle}>Core Fundamentals</div>
              <div className={styles.comparisonList}>
                {CORE_FUNDAMENTALS.map((item, i) => (
                  <div key={i} className={styles.comparisonItem}>
                    <span style={{ color: 'var(--color-text-dim)' }}>▹</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.comparisonDivider}>→</div>

            <div className={styles.comparisonColumn}>
              <div className={`${styles.comparisonTitle} ${styles.after}`}>The AI Multiplier</div>
              <div className={styles.comparisonList}>
                {AI_LEVERAGE.map((item, i) => (
                  <div key={i} className={styles.comparisonItem}>
                    <span style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Proof points */}
          <div className={styles.proofPoints}>
            {PROOF_POINTS.map((proof, i) => (
              <div key={i} className={styles.proofPoint}>
                <span className={styles.proofIcon}>{proof.icon}</span>
                <p className={styles.proofText}>
                  {proof.text}
                  <span className={styles.proofHighlight}>{proof.highlight}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);
