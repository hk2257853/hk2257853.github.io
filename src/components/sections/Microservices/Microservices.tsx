/**
 * Microservices - Section 3: The Systems I've Built
 *
 * The request enters the service mesh → project nodes appear in an interactive,
 * high-performance carousel → each project is a self-contained service with
 * status, stack, and impact.
 */

import { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { projects } from '../../../data/projects';
import styles from './Microservices.module.css';

export const Microservices = forwardRef<HTMLElement>(
  function Microservices(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Responsive cards per view (2 on desktop >= 1024px, 1 on tablet/mobile < 1024px)
    const [cardsPerView, setCardsPerView] = useState(() => {
      if (typeof window !== 'undefined') {
        return window.innerWidth >= 1024 ? 2 : 1;
      }
      return 2;
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

    const maxIndex = Math.max(0, projects.length - cardsPerView);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Smooth scroll active tab into center view in tablist
    useEffect(() => {
      const activeTab = tabRefs.current[selectedServiceIndex];
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }, [selectedServiceIndex]);

    // Update cardsPerView on resize
    useEffect(() => {
      const handleResize = () => {
        const nextCpv = window.innerWidth >= 1024 ? 2 : 1;
        setCardsPerView(nextCpv);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ensure currentIndex stays within bounds when cardsPerView changes
    useEffect(() => {
      setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    // Navigation callbacks
    const goToSlide = useCallback((index: number) => {
      const clamped = Math.min(maxIndex, Math.max(0, index));
      setCurrentIndex(clamped);
      setSelectedServiceIndex(index);
    }, [maxIndex]);

    const goToPrev = useCallback(() => {
      setCurrentIndex((prev) => {
        const next = Math.max(0, prev - 1);
        setSelectedServiceIndex(next);
        return next;
      });
    }, []);

    const goToNext = useCallback(() => {
      setCurrentIndex((prev) => {
        const next = Math.min(maxIndex, prev + 1);
        setSelectedServiceIndex(next);
        return next;
      });
    }, [maxIndex]);

    // Keyboard navigation (ArrowLeft / ArrowRight)
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    }, [goToPrev, goToNext]);

    // Touch swipe support
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 40; // minimum drag distance in px
      if (diff > threshold) {
        goToNext();
      } else if (diff < -threshold) {
        goToPrev();
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };

    // GSAP ScrollTrigger Entrance Animation
    useEffect(() => {
      if (!containerRef.current) return;

      const label = containerRef.current.querySelector(`.${styles.componentLabel}`);
      const title = containerRef.current.querySelector(`.${styles.sectionTitle}`);
      const nav = containerRef.current.querySelector(`.${styles.serviceMeshNav}`);
      const controls = containerRef.current.querySelector(`.${styles.carouselControlsBar}`);
      const carousel = containerRef.current.querySelector(`.${styles.carouselContainer}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(label, { opacity: 0.7, duration: 0.3 });
      tl.to(title, { opacity: 1, duration: 0.4 }, '-=0.1');
      tl.to(nav, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15');
      tl.to(controls, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
      tl.to(carousel, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.15');

      return () => { tl.kill(); };
    }, []);

    // Progress percentage
    const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;

    return (
      <section ref={ref} id="microservices" className={styles.services} data-section="microservices">
        <div ref={containerRef} className={styles.servicesInner}>
          <div className={styles.componentLabel}>⚙️ Microservices</div>
          <h2 className={styles.sectionTitle}>Routing to Services...</h2>

          {/* Service Mesh Quick Selector Tabs */}
          <div className={styles.serviceMeshNav} role="tablist" aria-label="Service Mesh Nodes">
            <div className={styles.serviceMeshTabs}>
              {projects.map((project, idx) => {
                const isSelected = selectedServiceIndex === idx;
                const isVisible = idx >= currentIndex && idx < currentIndex + cardsPerView;

                return (
                  <button
                    key={project.id}
                    ref={(el) => { tabRefs.current[idx] = el; }}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`service-panel-${project.id}`}
                    className={`${styles.serviceTab} ${isSelected || isVisible ? styles.serviceTabActive : ''}`}
                    onClick={() => goToSlide(idx)}
                    title={`Route to ${project.serviceName}`}
                  >
                    <span className={styles.serviceTabDot} />
                    <span className={styles.serviceTabNum}>0{idx + 1}</span>
                    <span>{project.serviceName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Status & Navigation Controls Bar */}
          <div className={styles.carouselControlsBar}>
            <div className={styles.statusIndicatorGroup}>
              <div className={styles.nodeCounter}>
                NODE{' '}
                <span className={styles.nodeCounterAccent}>
                  {cardsPerView === 2 && maxIndex > 0
                    ? `0${currentIndex + 1} - 0${Math.min(projects.length, currentIndex + 2)}`
                    : `0${currentIndex + 1}`}
                </span>{' '}
                / 0{projects.length}
              </div>
              <div className={styles.routingBadge}>
                <span className={styles.routingPulseDot} />
                <span>Active Mesh</span>
              </div>
            </div>
          </div>

          {/* Carousel Viewport and Track */}
          <div
            ref={carouselRef}
            className={styles.carouselContainer}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Projects Microservices Carousel"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              '--current-index': currentIndex,
              '--cards-per-view': cardsPerView,
            } as React.CSSProperties}
          >
            <div className={styles.carouselViewport}>
              <div className={styles.carouselTrack}>
                {projects.map((project, idx) => {
                  const isVisibleInView = idx >= currentIndex && idx < currentIndex + cardsPerView;

                  return (
                    <div
                      key={project.id}
                      id={`service-panel-${project.id}`}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${idx + 1} of ${projects.length}: ${project.serviceName}`}
                      className={styles.slideItem}
                    >
                      <div className={`${styles.serviceNode} ${isVisibleInView ? styles.serviceNodeActive : ''}`}>
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
                                data-umami-event="Project Repo Click"
                                data-umami-event-project={project.serviceName}
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Carousel Footer: Progress Line & Pagination Dots */}
          <div className={styles.carouselFooter}>
            <div className={styles.progressTrack} aria-hidden="true">
              <div
                className={styles.progressBar}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className={styles.dotsList} role="tablist" aria-label="Carousel pagination">
              {Array.from({ length: maxIndex + 1 }).map((_, stepIdx) => (
                <button
                  key={stepIdx}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === stepIdx}
                  aria-label={`Go to slide ${stepIdx + 1}`}
                  className={`${styles.dot} ${currentIndex === stepIdx ? styles.dotActive : ''}`}
                  onClick={() => goToSlide(stepIdx)}
                />
              ))}
            </div>

            <div className={styles.swipeHint}>
              ← Swipe left / right to browse →
            </div>
          </div>
        </div>
      </section>
    );
  }
);
