/**
 * TeachingMoment - Floating tooltip that explains each system component.
 *
 * For non-technical visitors: "What is an API Gateway?"
 * Changes content as the user scrolls through sections.
 * Can be dismissed. Reappears on next section.
 */

import { useState, useEffect, useCallback } from 'react';
import { SECTIONS } from '../../../data/sections';
import styles from './TeachingMoment.module.css';

interface TeachingMomentProps {
  activeIndex: number;
}

export function TeachingMoment({ activeIndex }: TeachingMomentProps) {
  const [visible, setVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dismissedIndex, setDismissedIndex] = useState(-1);

  const section = SECTIONS[activeIndex];

  // Show tooltip when section changes (unless user dismissed this one)
  useEffect(() => {
    if (activeIndex === dismissedIndex) return;
    // Small delay so it doesn't appear instantly
    const timeout = setTimeout(() => {
      setIsCollapsed(false);
      setVisible(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, [activeIndex, dismissedIndex]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissedIndex(activeIndex);
  }, [activeIndex]);

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Auto-hide after 8 seconds if not interacted
  useEffect(() => {
    if (!visible || isCollapsed) return;
    const timeout = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timeout);
  }, [visible, isCollapsed, activeIndex]);

  if (!section) return null;

  if (isCollapsed && visible) {
    return (
      <button
        className={`${styles.collapsedPill} ${styles.visible}`}
        onClick={() => setIsCollapsed(false)}
        aria-label={`Expand explanation for ${section.component}`}
      >
        <span className={styles.pillIcon}>{section.icon}</span>
        <span className={styles.pillLabel}>{section.component}</span>
        <span className={styles.pillExpand}>↗</span>
      </button>
    );
  }

  return (
    <div
      className={`${styles.tooltip} ${visible ? styles.visible : ''}`}
      role="complementary"
      aria-label="Component explanation"
    >
      <div className={styles.header}>
        <span className={styles.label}>{section.icon} What is this?</span>
        <div className={styles.headerActions}>
          <button
            className={styles.actionBtn}
            onClick={handleToggleCollapse}
            aria-label="Minimize explanation"
            title="Minimize"
          >
            —
          </button>
          <button
            className={styles.actionBtn}
            onClick={handleDismiss}
            aria-label="Dismiss"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
      <p className={styles.text}>
        <span className={styles.componentName}>{section.component}</span>
        {': '}
        {section.teachingMoment}
      </p>
    </div>
  );
}
