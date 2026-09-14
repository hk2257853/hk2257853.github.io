/**
 * CacheHit - Section 5: The Instant Recall
 *
 * Cache check → HIT → highlights slam in rapid-fire from the left →
 * each entry is a cached achievement/skill → TTL: ∞
 */

import { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { highlights } from '../../../data/highlights';
import styles from './CacheHit.module.css';

export const CacheHit = forwardRef<HTMLElement>(
  function CacheHit(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const label = containerRef.current.querySelector(`.${styles.componentLabel}`);
      const title = containerRef.current.querySelector(`.${styles.sectionTitle}`);
      const badge = containerRef.current.querySelector(`.${styles.hitBadge}`);
      const entries = containerRef.current.querySelectorAll(`.${styles.cacheEntry}`);
      const footer = containerRef.current.querySelector(`.${styles.ttlFooter}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(label, { opacity: 0.7, duration: 0.2 });
      tl.to(title, { opacity: 1, duration: 0.3 });
      tl.to(badge, { opacity: 1, duration: 0.2 });

      // Rapid-fire cache entries - fast stagger
      tl.to(entries, {
        opacity: 1,
        x: 0,
        duration: 0.25,
        stagger: 0.07,
        ease: 'power2.out',
      });

      tl.to(footer, { opacity: 1, duration: 0.3 }, '-=0.1');

      return () => { tl.kill(); };
    }, []);

    return (
      <section ref={ref} id="cache-hit" className={styles.cache} data-section="cache-hit">
        <div ref={containerRef} className={styles.cacheInner}>
          <div className={styles.componentLabel}>⚡ Redis</div>
          <h2 className={styles.sectionTitle}>CACHE HIT</h2>
          <div className={styles.hitBadge}>
            <span className={styles.hitDot} />
            hit rate: 100%
          </div>

          <div className={styles.cacheEntries}>
            {highlights.map((h, i) => (
              <div key={h.id} className={styles.cacheEntry}>
                <span className={styles.entryPrefix}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.entryText}>{h.text}</span>
                <span className={styles.entryCategory}>{h.category}</span>
              </div>
            ))}
          </div>

          <div className={styles.ttlFooter}>
            TTL: <span className={styles.ttlValue}>∞</span> - these don't expire
          </div>
        </div>
      </section>
    );
  }
);
