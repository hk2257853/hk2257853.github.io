import { useEffect, useRef, useCallback, useState, type CSSProperties } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import styles from './CompoundGrowth.module.css';
const SIZES = [120, 160, 205, 255];
const FACE_SIZES = [46, 56, 68, 82];
const FONTS = [26, 32, 40, 48];
const STAGES = [
  { title: 'Start with the fundamentals.', caption: 'Understand the system and its failure modes.', inputs: ['System design', 'Deep debugging'] },
  { title: 'Build tools for the real workflow.', caption: 'Connect the IDE, database, and internal platform.', inputs: ['MCP tools', 'IDE workflows'] },
  { title: 'Automate the repeatable work.', caption: 'Generate, evaluate, and review with intent.', inputs: ['Test automation', 'Human review'] },
  { title: 'Make the saved time count.', caption: 'Example: API test authoring, 40 minutes → 10 minutes.', inputs: [] },
];

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
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [stageIndex, setStageIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const visibleStage = reduced ? 3 : stageIndex;
  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  const play = useCallback(() => {
    clear();
    setStageIndex(0);
    setRunning(true);
    timers.current = [
      setTimeout(() => setStageIndex(1), 1400),
      setTimeout(() => setStageIndex(2), 2800),
      setTimeout(() => setStageIndex(3), 4200),
      setTimeout(() => setRunning(false), 4800),
    ];
  }, [clear]);
  useEffect(() => {
    if (reduced || !stageRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        play();
        observer.disconnect();
      }
    }, { threshold: .45 });
    observer.observe(stageRef.current);
    return () => { observer.disconnect(); clear(); };
  }, [clear, play, reduced]);
  const stage = STAGES[visibleStage];
  return (
    <div className={styles.stage} ref={stageRef}>
      <span className={styles.stageLabel}>One engineer. Compounding capability.</span>
      {!reduced && <button className={styles.replay} onClick={play} disabled={running} data-umami-event="Replay 1x to 4x Growth">Replay ↺</button>}
      <div className={styles.coreWrap}>
        <div className={styles.core + (visibleStage === 3 ? ' ' + styles.maxStage : '')}
          style={{ width: SIZES[visibleStage], height: SIZES[visibleStage] }} aria-hidden="true">
          <div className={styles.coreContent}>
            <div className={styles.coreFace} style={{ '--face-size': FACE_SIZES[visibleStage] + 'px' } as CSSProperties}>
              <FaceExpression stage={visibleStage} />
            </div>
            <div className={styles.coreLabel} style={{ fontSize: FONTS[visibleStage] }}>{visibleStage + 1}x</div>
          </div>
        </div>
      </div>
      {running && !reduced && visibleStage < 3 && <div key={visibleStage} className={styles.inputs} aria-hidden="true">
        {stage.inputs.map((input, index) => <span key={input} className={styles.input} style={{ '--side': index === 0 ? -1 : 1 } as CSSProperties}><i />{input}</span>)}
      </div>}
      <div className={styles.progress} aria-hidden="true">{STAGES.map((_, i) => <span key={i} className={i <= visibleStage ? styles.reached : ''} />)}</div>
      <div className={styles.caption} role="status"><strong>{stage.title}</strong><span>{stage.caption}</span></div>
    </div>
  );
}

