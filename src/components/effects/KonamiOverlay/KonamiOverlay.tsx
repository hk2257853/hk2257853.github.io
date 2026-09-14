/**
 * KonamiOverlay - Easter egg triggered by the Konami Code.
 * Shows a "debug mode" with absurd stats.
 */

import { useState } from 'react';
import { useKonamiCode } from '../../../hooks/useKonamiCode';
import styles from './KonamiOverlay.module.css';

export function KonamiOverlay() {
  const [visible, setVisible] = useState(false);

  useKonamiCode(() => setVisible(true));

  return (
    <div
      className={`${styles.debugOverlay} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.debugContent}>
        <div className={styles.debugTitle}>⚠ DEBUG MODE ACTIVATED ⚠</div>
        <div className={styles.debugStats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>9999</div>
            <div className={styles.statLabel}>commits this year</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>∞</div>
            <div className={styles.statLabel}>cups of coffee</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>0</div>
            <div className={styles.statLabel}>production bugs</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>42</div>
            <div className={styles.statLabel}>meaning of life</div>
          </div>
        </div>
        <div
          className={styles.exitHint}
          onClick={() => setVisible(false)}
        >
          [click to exit debug mode]
        </div>
      </div>
    </div>
  );
}
