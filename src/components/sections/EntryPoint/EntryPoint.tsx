/**
 * EntryPoint - Section 1: The Request is Born
 *
 * Dark screen → terminal boot sequence types out line by line →
 * a glowing packet materializes → name appears as origin metadata →
 * scroll cue invites the user to continue.
 */

import { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './EntryPoint.module.css';

const BOOT_LINES = [
  { prefix: '~', text: 'initializing system...', style: 'muted' },
  { prefix: '✓', text: 'network interface ready', style: 'success' },
  { prefix: '✓', text: 'DNS resolution complete', style: 'success' },
  { prefix: '✓', text: 'TLS handshake established', style: 'success' },
  { prefix: '▸', text: 'composing request packet...', style: 'accent' },
  { prefix: '▸', text: 'destination: hk2257853.github.io', style: 'accent' },
  { prefix: '⚡', text: 'request initiated', style: 'warning' },
];

export const EntryPoint = forwardRef<HTMLElement>(
  function EntryPoint(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const lines = containerRef.current.querySelectorAll(`.${styles.terminalLine}`);
      const packet = containerRef.current.querySelector(`.${styles.packetContainer}`);
      const nameReveal = containerRef.current.querySelector(`.${styles.nameReveal}`);
      const scrollCue = containerRef.current.querySelector(`.${styles.scrollCue}`);

      const tl = gsap.timeline({ delay: 0.5 });

      // Type out terminal lines one by one
      lines.forEach((line, i) => {
        tl.to(line, {
          opacity: 1,
          duration: 0.05,
          delay: i === 0 ? 0 : 0.15,
        });
      });

      // Packet materializes
      tl.to(packet, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '+=0.3');

      // Name fades in
      tl.to(nameReveal, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');

      // Scroll cue
      tl.to(scrollCue, {
        opacity: 0.6,
        duration: 0.5,
      }, '+=0.5');

      // After animating, smoothly hide the packet circle so terminal text is clean and readable
      tl.to(packet, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '+=0.4');

      return () => {
        tl.kill();
      };
    }, []);

    return (
      <section ref={ref} id="entry-point" className={styles.entryPoint} data-section="entry-point">
        <div ref={containerRef}>
          {/* Terminal boot sequence */}
          <div className={styles.terminal}>
            {BOOT_LINES.map((line, i) => (
              <div key={i} className={styles.terminalLine}>
                <span className={styles.prefix}>{line.prefix}</span>
                <span className={styles[line.style as keyof typeof styles] || ''}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* The Packet */}
          <div className={styles.packetContainer}>
            <div className={styles.packet} />
          </div>

          {/* Name reveal */}
          <div className={styles.nameReveal}>
            <p className={styles.nameText}>
              origin: <span className={styles.nameHighlight}>Harsh Kumar</span>
            </p>
          </div>

          {/* Scroll cue */}
          <div className={styles.scrollCue}>
            <span className={styles.scrollText}>scroll to follow the request</span>
            <div className={styles.scrollArrow} />
          </div>
        </div>
      </section>
    );
  }
);
