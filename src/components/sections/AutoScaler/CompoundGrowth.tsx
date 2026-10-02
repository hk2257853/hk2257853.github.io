import { useEffect, useRef, useCallback, useState } from 'react';
import styles from './CompoundGrowth.module.css';

const SOURCES = [
  'AI conversations',
  'YouTube lectures',
  'Side projects',
  'Building connections',
  'Reading papers',
  'Debugging sessions',
  'Peer discussions',
  'Late-night tinkering',
];

const SIZES = [120, 160, 205, 255]; // core diameter per stage
const FACE_SIZES = [46, 56, 68, 82]; // face width per stage
const FONTS = [26, 32, 40, 48]; // label font-size per stage
const LABELS = ['1x', '2x', '3x', '4x'];

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function FaceExpression({ stage }: { stage: number }) {
  if (stage === 0) {
    // 1x: Sad / Overwhelmed
    return (
      <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Worried Eyebrows */}
        <path d="M 14 11 L 22 14" stroke="#042024" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 46 11 L 38 14" stroke="#042024" strokeWidth="2.4" strokeLinecap="round" />
        {/* Sad Drooping Eyes */}
        <ellipse cx="19" cy="18" rx="3.5" ry="4" fill="#042024" />
        <ellipse cx="41" cy="18" rx="3.5" ry="4" fill="#042024" />
        {/* Little stress sweat drop */}
        <path
          d="M 47 18 C 47 18, 50 21, 50 23 C 50 24.6, 48.7 25.5, 47 25.5 C 45.3 25.5, 44 24.6, 44 23 C 44 21, 47 18, 47 18 Z"
          fill="#38bdf8"
          opacity="0.85"
        />
        {/* Sad Downward Frown */}
        <path d="M 23 31 Q 30 24 37 31" stroke="#042024" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (stage === 1) {
    // 2x: Neutral / Focused
    return (
      <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Focused Straight Brows */}
        <path d="M 14 11 L 23 11" stroke="#042024" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 37 11 L 46 11" stroke="#042024" strokeWidth="2.4" strokeLinecap="round" />
        {/* Attentive Eyes with Glints */}
        <circle cx="19" cy="17" r="3.8" fill="#042024" />
        <circle cx="20.5" cy="15.5" r="1.3" fill="#ffffff" />
        <circle cx="41" cy="17" r="3.8" fill="#042024" />
        <circle cx="42.5" cy="15.5" r="1.3" fill="#ffffff" />
        {/* Neutral Straight Mouth */}
        <path d="M 24 28 L 36 28" stroke="#042024" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (stage === 2) {
    // 3x: Happy / Confident
    return (
      <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Relaxed Arched Brows */}
        <path d="M 14 10 Q 18 8 23 11" stroke="#042024" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 46 10 Q 42 8 37 11" stroke="#042024" strokeWidth="2.4" strokeLinecap="round" />
        {/* Happy Curved Anime Eyes */}
        <path d="M 14 19 Q 19 12 24 19" stroke="#042024" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M 36 19 Q 41 12 46 19" stroke="#042024" strokeWidth="3.2" strokeLinecap="round" />
        {/* Rosy Cheeks */}
        <ellipse cx="11" cy="24" rx="4.5" ry="2.2" fill="#fb7185" opacity="0.55" />
        <ellipse cx="49" cy="24" rx="4.5" ry="2.2" fill="#fb7185" opacity="0.55" />
        {/* Confident Smile */}
        <path d="M 23 27 Q 30 35 37 27" stroke="#042024" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 4x: Ecstatic / Super Happy Beaming!
  return (
    <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sparkles */}
      <polygon points="7,8 8,11 11,12 8,13 7,16 6,13 3,12 6,11" fill="#ffffff" opacity="0.9" />
      <polygon points="53,8 54,11 57,12 54,13 53,16 52,13 49,12 52,11" fill="#ffffff" opacity="0.9" />
      {/* Joyful Beaming Eyes */}
      <path d="M 13 18 Q 19 9 25 18" stroke="#042024" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 35 18 Q 41 9 47 18" stroke="#042024" strokeWidth="3.5" strokeLinecap="round" />
      {/* Blushing Glowing Cheeks */}
      <ellipse cx="10" cy="23" rx="5.5" ry="2.8" fill="#fb7185" opacity="0.75" />
      <ellipse cx="50" cy="23" rx="5.5" ry="2.8" fill="#fb7185" opacity="0.75" />
      {/* Big Beaming Open Smile with Smooth Clipped Tongue */}
      <defs>
        <clipPath id="happyMouthClip">
          <path d="M 21 24 Q 30 26 39 24 C 39 36, 21 36, 21 24 Z" />
        </clipPath>
      </defs>
      <path
        d="M 21 24 Q 30 26 39 24 C 39 36, 21 36, 21 24 Z"
        fill="#042024"
        stroke="#042024"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <ellipse
        cx="30"
        cy="33"
        rx="6"
        ry="3.8"
        fill="#fb7185"
        clipPath="url(#happyMouthClip)"
      />
    </svg>
  );
}

export function CompoundGrowth() {
  const stageRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const coreLabelRef = useRef<HTMLDivElement>(null);
  const coreFaceRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const [stageIndex, setStageIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const isCancelledRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const spawnedElementsRef = useRef<HTMLElement[]>([]);
  const hasTriggeredRef = useRef(false);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const removeSpawnedElements = useCallback(() => {
    spawnedElementsRef.current.forEach((el) => {
      try {
        el.remove();
      } catch {
        // Element may have already been removed
      }
    });
    spawnedElementsRef.current = [];
  }, []);

  const pulseRing = useCallback((ring: HTMLDivElement | null, size: number, delayMs: number) => {
    if (!ring) return;
    const t = setTimeout(() => {
      ring.style.width = '10px';
      ring.style.height = '10px';
      ring.style.opacity = '0.9';
      ring.style.transition = 'none';
      requestAnimationFrame(() => {
        ring.style.transition = 'width 900ms ease-out, height 900ms ease-out, opacity 900ms ease-out';
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.opacity = '0';
      });
    }, delayMs);
    timeoutsRef.current.push(t);
  }, []);

  const flash = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const f = document.createElement('div');
    f.className = styles.flash;
    f.style.width = '10px';
    f.style.height = '10px';
    stage.appendChild(f);
    spawnedElementsRef.current.push(f);

    requestAnimationFrame(() => {
      f.style.transition = 'transform 420ms ease-out, opacity 420ms ease-out';
      f.style.transform = 'translate(-50%, -50%) scale(22)';
      f.style.opacity = '0.9';
    });

    const t1 = setTimeout(() => {
      f.style.opacity = '0';
      const t2 = setTimeout(() => {
        f.remove();
        spawnedElementsRef.current = spawnedElementsRef.current.filter((el) => el !== f);
      }, 300);
      timeoutsRef.current.push(t2);
    }, 120);
    timeoutsRef.current.push(t1);
  }, []);

  const growTo = useCallback(
    (idx: number) => {
      const d = SIZES[idx];
      if (coreRef.current) {
        coreRef.current.style.width = `${d}px`;
        coreRef.current.style.height = `${d}px`;
        if (idx === 3) {
          coreRef.current.classList.add(styles.maxStage);
        } else {
          coreRef.current.classList.remove(styles.maxStage);
        }
      }
      if (coreLabelRef.current) {
        coreLabelRef.current.style.fontSize = `${FONTS[idx]}px`;
        coreLabelRef.current.textContent = LABELS[idx];
      }
      if (coreFaceRef.current) {
        coreFaceRef.current.style.setProperty('--face-size', `${FACE_SIZES[idx]}px`);
      }
      setStageIndex(idx);
      flash();
    },
    [flash]
  );

  const spawnParticle = useCallback(
    (text: string, delay: number, duration: number, onArrive: (() => void) | null) => {
      const stage = stageRef.current;
      if (!stage) return;

      const el = document.createElement('div');
      el.className = styles.particle;
      el.innerHTML = `<span class="${styles.dot}"></span><span>${text}</span>`;
      stage.appendChild(el);
      spawnedElementsRef.current.push(el);

      const rect = stage.getBoundingClientRect();
      const width = rect.width || 600;
      const height = rect.height || 480;

      // Random point on an ellipse around stage center, biased outward
      const angle = rand(0, Math.PI * 2);
      const rx = width * 0.5 * rand(0.72, 0.88);
      const ry = height * 0.5 * rand(0.72, 0.88);
      const startX = Math.cos(angle) * rx;
      const startY = Math.sin(angle) * ry;

      el.style.transform = `translate(calc(-50% + ${startX}px), calc(-50% + ${startY}px)) scale(1)`;
      el.style.opacity = '0';

      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}ms cubic-bezier(.22,.7,.2,1), opacity ${duration * 0.35}ms ease`;
        el.style.transitionDelay = `${delay}ms`;
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate(-50%, -50%) scale(0.72)';
        });
      });

      const t1 = setTimeout(() => {
        el.style.transition = 'opacity 160ms ease';
        el.style.opacity = '0';
        if (onArrive) onArrive();
        const t2 = setTimeout(() => {
          el.remove();
          spawnedElementsRef.current = spawnedElementsRef.current.filter((item) => item !== el);
        }, 200);
        timeoutsRef.current.push(t2);
      }, delay + duration - 120);
      timeoutsRef.current.push(t1);
    },
    []
  );

  const playSequence = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);

    clearAllTimeouts();
    removeSpawnedElements();

    // Reset core to 1x and sad face
    if (coreRef.current) {
      coreRef.current.style.width = '120px';
      coreRef.current.style.height = '120px';
      coreRef.current.classList.remove(styles.maxStage);
    }
    if (coreLabelRef.current) {
      coreLabelRef.current.style.fontSize = `${FONTS[0]}px`;
      coreLabelRef.current.textContent = LABELS[0];
    }
    if (coreFaceRef.current) {
      coreFaceRef.current.style.setProperty('--face-size', `${FACE_SIZES[0]}px`);
    }
    setStageIndex(0);

    if (captionRef.current) {
      captionRef.current.style.opacity = '0';
    }

    const shuffled = [...SOURCES].sort(() => Math.random() - 0.5);
    const perStage = 2; // particles feeding each level-up
    let idx = 0;
    const stageCount = 3; // 1x->2x->3x->4x = 3 transitions

    for (let s = 0; s < stageCount; s++) {
      if (isCancelledRef.current) break;

      // Fire a batch of particles converging on the core
      for (let p = 0; p < perStage; p++) {
        const text = shuffled[idx % shuffled.length];
        idx++;
        const delay = p * 260 + rand(0, 120);
        const duration = rand(900, 1250);
        const isLast = p === perStage - 1;

        spawnParticle(
          text,
          delay,
          duration,
          isLast
            ? () => {
                if (isCancelledRef.current) return;
                growTo(s + 1);
                pulseRing(ring1Ref.current, SIZES[s + 1] + 60, 0);
                pulseRing(ring2Ref.current, SIZES[s + 1] + 120, 120);
              }
            : null
        );
      }

      await new Promise<void>((resolve) => {
        const t = setTimeout(resolve, perStage * 260 + 1250 + 250);
        timeoutsRef.current.push(t);
      });
    }

    if (!isCancelledRef.current && captionRef.current) {
      captionRef.current.style.opacity = '1';
    }

    isRunningRef.current = false;
    setIsRunning(false);
  }, [clearAllTimeouts, removeSpawnedElements, spawnParticle, growTo, pulseRing]);

  // Trigger when entering viewport (or on mount if visible)
  useEffect(() => {
    isCancelledRef.current = false;

    const stageEl = stageRef.current;
    if (!stageEl) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              playSequence();
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(stageEl);

      return () => {
        observer.disconnect();
        isCancelledRef.current = true;
        clearAllTimeouts();
        removeSpawnedElements();
      };
    } else {
      const t = setTimeout(() => {
        playSequence();
      }, 400);
      timeoutsRef.current.push(t);

      return () => {
        isCancelledRef.current = true;
        clearAllTimeouts();
        removeSpawnedElements();
      };
    }
  }, [playSequence, clearAllTimeouts, removeSpawnedElements]);

  return (
    <div id="stage" className={styles.stage} ref={stageRef}>
      <button
        id="replay"
        className={styles.replay}
        onClick={playSequence}
        disabled={isRunning}
        title={isRunning ? 'Compounding in progress...' : 'Replay compounding growth'}
        data-umami-event="Replay 1x to 4x Growth"
      >
        Replay
      </button>

      <div className={styles.coreWrap} id="coreWrap">
        <div className={styles.ring} id="ring1" ref={ring1Ref} />
        <div className={styles.ring} id="ring2" ref={ring2Ref} />
        <div className={styles.core} id="core" ref={coreRef}>
          <div className={styles.coreContent}>
            <div
              className={styles.coreFace}
              ref={coreFaceRef}
              style={{ '--face-size': `${FACE_SIZES[stageIndex]}px` } as React.CSSProperties}
            >
              <FaceExpression stage={stageIndex} />
            </div>
            <div className={styles.coreLabel} id="coreLabel" ref={coreLabelRef}>
              {LABELS[stageIndex]}
            </div>
          </div>
        </div>
      </div>

      <div id="caption" className={styles.caption} ref={captionRef}>
        every input compounds into the same skill
      </div>
    </div>
  );
}
