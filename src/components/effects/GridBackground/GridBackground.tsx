/**
 * GridBackground - Subtle dot-grid pattern behind all content.
 * Creates a techy, circuit-board-like ambient background.
 */

import styles from './GridBackground.module.css';

interface GridBackgroundProps {
  dotSpacing?: number;
  dotRadius?: number;
}

export function GridBackground({
  dotSpacing = 30,
  dotRadius = 0.8,
}: GridBackgroundProps) {
  return (
    <div className={styles.gridBackground} aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSpacing / 2}
              cy={dotSpacing / 2}
              r={dotRadius}
              fill="var(--color-text-dim)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    </div>
  );
}
