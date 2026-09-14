/**
 * Microservices - Section 3: The Systems I've Built
 *
 * The request enters the service mesh → project nodes appear on a grid →
 * each project is a self-contained service with status, stack, and impact.
 */

import { forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { projects } from '../../../data/projects';
import styles from './Microservices.module.css';

export const Microservices = forwardRef<HTMLElement>(
  function Microservices(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const label = containerRef.current.querySelector(`.${styles.componentLabel}`);
      const title = containerRef.current.querySelector(`.${styles.sectionTitle}`);
      const nodes = containerRef.current.querySelectorAll(`.${styles.serviceNode}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(label, { opacity: 0.7, duration: 0.3 });
      tl.to(title, { opacity: 1, duration: 0.4 }, '-=0.1');

      // Service nodes stagger in
      tl.to(nodes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.1');

      return () => { tl.kill(); };
    }, []);

    return (
      <section ref={ref} id="microservices" className={styles.services} data-section="microservices">
        <div ref={containerRef} className={styles.servicesInner}>
          <div className={styles.componentLabel}>⚙️ Microservices</div>
          <h2 className={styles.sectionTitle}>Routing to Services...</h2>

          <div className={styles.meshGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.serviceNode}>
                {/* Header */}
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceName}>{project.serviceName}</span>
                  <div className={styles.serviceActions}>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoLink}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.isEnterprise && (
                      <span className={styles.enterpriseTag}>
                        OneShield
                      </span>
                    )}
                    <span className={styles.serviceStatus}>
                      <span className={styles.statusPulse} />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Role */}
                <div className={styles.serviceRole}>{project.responsibility}</div>

                {/* Description */}
                <p className={styles.serviceDesc}>{project.description}</p>

                {/* Stack */}
                <div className={styles.stackTags}>
                  {project.stack.map((tech) => (
                    <span key={tech} className={styles.stackTag}>{tech}</span>
                  ))}
                </div>

                {/* Impact */}
                <div className={styles.impactList}>
                  {project.impact.map((item, i) => (
                    <div key={i} className={styles.impactItem}>
                      <span className={styles.impactBullet}>▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);
