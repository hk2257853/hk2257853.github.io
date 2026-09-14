/**
 * SystemMap - Persistent navigation showing the user's position in the system.
 * Desktop: vertical track on the right side.
 * Mobile: horizontal bar at the top.
 */

import { useCallback, useRef, useEffect } from 'react';
import { SECTIONS } from '../../../data/sections';
import styles from './SystemMap.module.css';

interface SystemMapProps {
  activeIndex: number;
  onNavigate: (sectionId: string) => void;
}

export function SystemMap({ activeIndex, onNavigate }: SystemMapProps) {
  const progressPercent = (activeIndex / (SECTIONS.length - 1)) * 100;
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smooth scroll active node into center view in mobile horizontal bar
  useEffect(() => {
    const activeEl = nodeRefs.current[activeIndex];
    if (activeEl && window.innerWidth <= 768) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  const handleClick = useCallback(
    (sectionId: string) => {
      onNavigate(sectionId);
    },
    [onNavigate]
  );

  return (
    <nav className={styles.systemMap} aria-label="Section navigation">
      {/* Track line */}
      <div className={styles.track}>
        <div
          className={styles.trackProgress}
          style={{ height: `${progressPercent}%` }}
        />
      </div>

      {/* Nodes */}
      {SECTIONS.map((section, index) => {
        const isActive = index === activeIndex;
        const isVisited = index < activeIndex;

        return (
          <button
            key={section.id}
            ref={(el) => { nodeRefs.current[index] = el; }}
            className={`${styles.node} ${isActive ? styles.active : ''}`}
            onClick={() => handleClick(section.id)}
            aria-label={`Navigate to ${section.label}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <div
              className={`${styles.dot} ${isActive ? 'active' : ''} ${isVisited ? 'visited' : ''}`}
            />
            <span className={styles.label}>{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
