/**
 * AutoScaler - Section 4: The Force Multiplier
 *
 * Traffic spikes → a single pod scales to 4 pods → the "1 engineer → 4x output"
 * narrative unfolds → before/after comparison → proof points animate in.
 */

import { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './AutoScaler.module.css';

const PRE_AI = [
  'Java, Spring Boot, Microservices, SQL',
  'Kafka, Redis & Distributed Systems',
  'Low-Level Design & Concurrency',
  'Algorithms (ICPC Regionalist, CodeChef 1704)',
];

const POST_AI = [
  'Custom MCP Servers & Windsurf Bridge',
  'Autonomous AI Agents & API Test Gen',
  'Hybrid RAG, LangGraph & LLM Tooling',
  'Delivered 60+ API adoptions in 2 weeks (2x speed)',
];

const PROOF_POINTS = [
  {
    icon: '🔧',
    text: 'Custom MCP Server: Built bridge connecting AI assistants to internal DB & config platform: ',
    highlight: '20-30% task acceleration over standard AI tools.',
  },
  {
    icon: '🚀',
    text: 'Automated 100+ API test scenarios & architected 2-phase onboarding utility: ',
    highlight: 'Reduced client onboarding from weeks to days (30% ahead of estimate).',
  },
  {
    icon: '🧠',
    text: 'Strong CS Fundamentals (ICPC Regionalist 221 & 9+ hackathons): ',
    highlight: 'Knowing what to automate, how distributed systems scale, and why.',
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
            When the load increases, don't break - scale.
            Pre-AI fundamentals + post-AI leverage = force multiplier.
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
              <div className={styles.comparisonTitle}>Pre-AI Foundation</div>
              <div className={styles.comparisonList}>
                {PRE_AI.map((item, i) => (
                  <div key={i} className={styles.comparisonItem}>
                    <span style={{ color: 'var(--color-text-dim)' }}>▹</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.comparisonDivider}>→</div>

            <div className={styles.comparisonColumn}>
              <div className={`${styles.comparisonTitle} ${styles.after}`}>Post-AI Multiplier</div>
              <div className={styles.comparisonList}>
                {POST_AI.map((item, i) => (
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
