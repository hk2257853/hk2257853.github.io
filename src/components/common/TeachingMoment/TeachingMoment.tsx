/**
 * TeachingMoment - Anime Tech Mascot Guide that explains each system component.
 *
 * For non-technical visitors: "What is an API Gateway?"
 * The anime mascot holds a presentation board with real-time section explanations.
 * Can be minimized to a waving chibi avatar or dismissed completely.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { SECTIONS } from '../../../data/sections';
import styles from './TeachingMoment.module.css';

interface TeachingMomentProps {
  activeIndex: number;
}

const POKE_QUOTES = [
  "Let's trace this request together! 🚀",
  "Backend architecture is pure magic! ✨",
  "High availability and low latency are my specialty! ⚡",
  "Every microservice has its own special mission! 🛠️",
  "In-memory caching makes data load instantly! ⚡",
  "Keep scrolling to follow the full system journey! 🌐",
  "Nice poke! Ready for the next architectural leap! 🌸",
];

const checkIsMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

export function TeachingMoment({ activeIndex }: TeachingMomentProps) {
  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [visible, setVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(checkIsMobile);
  const [userMinimized, setUserMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [pokeQuote, setPokeQuote] = useState<string | null>(null);
  const quoteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);

  const section = SECTIONS[activeIndex];

  // Track window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When activeIndex changes: show guide (unless dismissed or user explicitly minimized/mobile)
  useEffect(() => {
    if (isDismissed) return;

    const timeout = setTimeout(() => {
      if (!userMinimized && !isMobile) {
        setIsCollapsed(false);
      }
      setVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [activeIndex, isDismissed, userMinimized, isMobile]);

  const handleDismiss = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setVisible(false);
    setIsDismissed(true);
  }, []);

  const handleToggleCollapse = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserMinimized(true);
    setIsCollapsed(true);
    setVisible(true);
  }, []);

  const handleExpand = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUserMinimized(false);
    setIsCollapsed(false);
    setVisible(true);
  }, []);

  const handlePokeMascot = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const randomQuote = POKE_QUOTES[Math.floor(Math.random() * POKE_QUOTES.length)];
    setPokeQuote(randomQuote);

    if (quoteTimeoutRef.current) {
      clearTimeout(quoteTimeoutRef.current);
    }
    quoteTimeoutRef.current = setTimeout(() => {
      setPokeQuote(null);
    }, 3800);
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (quoteTimeoutRef.current) {
        clearTimeout(quoteTimeoutRef.current);
      }
    };
  }, []);

  // Auto-collapse after 30 seconds if not interacted or hovered
  useEffect(() => {
    if (!visible || isCollapsed) return;

    const timeout = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsCollapsed(true);
      }
    }, 30000);

    return () => clearTimeout(timeout);
  }, [visible, isCollapsed, activeIndex]);

  if (isDismissed || !section) return null;

  // Collapsed State: Waving Chibi Mascot Sticker & Speech Pill
  if (isCollapsed) {
    return (
      <div
        className={`${styles.collapsedWrapper} ${visible ? styles.visible : ''}`}
        role="complementary"
        aria-label={`Open system guide for ${section.component}`}
      >
        {/* Poke speech bubble when collapsed */}
        {pokeQuote && (
          <div className={styles.speechBubbleCollapsed} role="status">
            <p>{pokeQuote}</p>
            <span className={styles.speechBubbleCollapsedTail} />
          </div>
        )}

        <button
          className={styles.speechPill}
          onClick={handleExpand}
          aria-label={`Expand explanation for ${section.component}`}
        >
          <span className={styles.pillIcon}>{section.icon}</span>
          <span className={styles.pillText}>
            <span className={styles.pillComponent}>{section.component}</span>
            <span className={styles.pillAction}>Guide ↗</span>
          </span>
        </button>

        <button
          className={styles.chibiAvatarBtn}
          onClick={handleExpand}
          onContextMenu={(e) => {
            e.preventDefault();
            handlePokeMascot();
          }}
          title="Click to open guide (Right-click to poke!)"
          aria-label="Anime guide mascot"
        >
          <div className={styles.avatarGlow} />
          <picture>
            <source type="image/webp" srcSet="/assets/mascot/mascot-waving.webp" />
            <img
              src="/assets/mascot/mascot-waving.png"
              alt="Anime guide mascot waving"
              className={styles.chibiAvatarImg}
              draggable={false}
              width={72}
              height={72}
              loading="lazy"
            />
          </picture>
          <span className={styles.onlineStatus} />
        </button>
      </div>
    );
  }

  // Expanded State: Mascot Holding the Presentation Board
  return (
    <div
      className={`${styles.mascotBoardWrapper} ${visible ? styles.visible : ''}`}
      role="complementary"
      aria-label="Component explanation"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* Interactive Speech Bubble (Poke Reaction) */}
      {pokeQuote && (
        <div className={styles.speechBubble} role="status">
          <p>{pokeQuote}</p>
          <span className={styles.speechBubbleTail} />
        </div>
      )}

      <div className={styles.boardCard}>
        {/* Mascot Graphic holding the board */}
        <div
          className={styles.mascotHolder}
          onClick={handlePokeMascot}
          title="Click the mascot for tips!"
        >
          <picture>
            <source type="image/webp" srcSet="/assets/mascot/mascot-board.webp" />
            <img
              src="/assets/mascot/mascot-board.png"
              alt="Anime mascot holding board"
              className={styles.mascotBoardImg}
              draggable={false}
              width={368}
              height={368}
            />
          </picture>
        </div>

        {/* Dynamic Board Surface Overlay */}
        <div className={styles.boardScreen}>
          <div className={styles.boardHeader}>
            <div className={styles.boardBadge}>
              <span className={styles.badgePulseDot} />
              <span className={styles.boardBadgeTitle}>TECH SENSEI</span>
            </div>
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

          <div key={activeIndex} className={styles.boardBody}>
            <div className={styles.componentTag}>
              <span className={styles.componentIcon}>{section.icon}</span>
              <span className={styles.componentName}>{section.component}</span>
            </div>
            <p className={styles.teachingText}>
              {section.teachingMoment}
            </p>
          </div>

          <div className={styles.boardFooter}>
            <span className={styles.footerStep}>
              STEP 0{activeIndex + 1}/0{SECTIONS.length}
            </span>
            <button
              type="button"
              className={styles.pokePromptBtn}
              onClick={handlePokeMascot}
            >
              Poke mascot ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
