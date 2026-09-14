/**
 * ApiGateway - Section 2: Who Is This Request?
 *
 * The packet arrives at the gateway → request headers are "read" and displayed
 * line by line → validation checks pass → available routes are revealed.
 */

import { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { profile } from '../../../data/profile';
import { SECTIONS } from '../../../data/sections';
import styles from './ApiGateway.module.css';

const VALIDATIONS = [
  'Authenticated',
  'Authorized',
  'Rate limit OK',
  'Request validated',
];

export const ApiGateway = forwardRef<HTMLElement>(
  function ApiGateway(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const label = containerRef.current.querySelector(`.${styles.componentLabel}`);
      const rows = containerRef.current.querySelectorAll(`.${styles.headerRow}`);
      const checks = containerRef.current.querySelectorAll(`.${styles.validationCheck}`);
      const routeBlock = containerRef.current.querySelector(`.${styles.routeBlock}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      // Label fades in
      tl.to(label, { opacity: 0.7, duration: 0.3 });

      // Headers appear one by one
      rows.forEach((row, i) => {
        tl.to(row, {
          opacity: 1,
          x: 0,
          duration: 0.25,
          ease: 'power2.out',
        }, i === 0 ? '+=0.1' : '-=0.1');
      });

      // Validation checks
      checks.forEach((check) => {
        tl.to(check, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, '-=0.05');
      });

      // Routes reveal
      tl.to(routeBlock, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '+=0.1');

      return () => {
        tl.kill();
      };
    }, []);

    // Build header entries from profile data
    const headers = Object.entries(profile.headers);

    // Route entries from sections (skip landing + entry-point)
    const routes = SECTIONS.slice(2);

    return (
      <section ref={ref} id="api-gateway" className={styles.gateway} data-section="api-gateway">
        <div ref={containerRef} className={styles.gatewayInner}>
          <div className={styles.componentLabel}>🚪 API Gateway</div>

          {/* Request headers */}
          <div className={styles.headerBlock}>
            <div className={styles.headerBlockTitle}>
              <span className={styles.statusDot} />
              <span>Request Headers</span>
            </div>
            <div className={styles.headerRows}>
              {headers.map(([key, value]) => (
                <div key={key} className={styles.headerRow}>
                  <span className={styles.headerKey}>{key}:</span>
                  <span className={`${styles.headerValue} ${
                    key.startsWith('X-') ? styles.highlight : ''
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Validation */}
          <div className={styles.validationBlock}>
            {VALIDATIONS.map((check) => (
              <div key={check} className={styles.validationCheck}>
                <span className={styles.checkIcon}>✓</span>
                <span className={styles.checkText}>{check}</span>
              </div>
            ))}
          </div>

          {/* Available routes */}
          <div className={styles.routeBlock}>
            <div className={styles.routeTitle}>Available Endpoints</div>
            <div className={styles.routes}>
              {routes.map((section) => (
                <div key={section.id} className={styles.route}>
                  <span className={styles.routeIcon}>{section.icon}</span>
                  <span>{section.component}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
