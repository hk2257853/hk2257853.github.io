/**
 * RateLimitOverlay - Easter egg: 429 Too Many Requests
 *
 * Monitors scroll velocity via GSAP ScrollTrigger.
 * If the user scrolls too fast, flash a 429 error overlay.
 */

import { useState, useEffect, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RateLimitOverlay.module.css';

const VELOCITY_THRESHOLD = 5000; // pixels per second
const DISPLAY_DURATION = 1500; // ms

export function RateLimitOverlay() {
  const [visible, setVisible] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const flash = useCallback(() => {
    if (triggered) return; // Only trigger once per session to not be annoying
    setVisible(true);
    setTriggered(true);
    setTimeout(() => setVisible(false), DISPLAY_DURATION);
  }, [triggered]);

  useEffect(() => {
    // Check scroll velocity on each scroll tick
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        if (velocity > VELOCITY_THRESHOLD) {
          flash();
        }
      },
    });

    return () => trigger.kill();
  }, [flash]);

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.content}>
        <div className={styles.code}>429</div>
        <div className={styles.message}>Too Many Requests</div>
        <div className={styles.detail}>Slow down. Enjoy the journey.</div>
      </div>
    </div>
  );
}
