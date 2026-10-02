import { forwardRef } from 'react';
import { CompoundGrowth } from './CompoundGrowth';
import styles from './AutoScaler.module.css';

const EVIDENCE = [
  { value: '40m → 10m', label: 'Per API test scenario', detail: '100+ scenarios automated through a custom AI Hub agent.' },
  { value: '50+', label: 'Engineers using the tooling', detail: 'A browser extension turns UI discovery into Cucumber test code.' },
  { value: '2 weeks', label: 'Against a 4-week estimate', detail: '60+ API adoptions delivered, recognized by the VP.' },
];
export const AutoScaler = forwardRef<HTMLElement>(function AutoScaler(_props, ref) {
  return (
    <section ref={ref} id="auto-scaler" data-section="auto-scaler" className={styles.scaler} aria-labelledby="scaler-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>04 / Auto-Scaler</p>
        <h2 id="scaler-title" className={styles.title}>Fundamentals, multiplied.</h2>
        <p className={styles.intro}>Systems knowledge sets the direction. Custom AI tools make room to do more.</p>
        <div className={styles.layout}>
          <CompoundGrowth />
          <div className={styles.evidence}>
            <p className={styles.evidenceLabel}>What that looks like in practice</p>
            {EVIDENCE.map(item => <div key={item.value} className={styles.proof}>
              <strong>{item.value}</strong><h3>{item.label}</h3><p>{item.detail}</p>
            </div>)}
          </div>
        </div>
        <div className={styles.principles}>
          <p><span>01 / Understand</span>Consistency, concurrency, and failure modes.</p>
          <p><span>02 / Automate</span>Build the tool around the team’s actual workflow.</p>
          <p><span>03 / Verify</span>Review the output and measure the time saved.</p>
        </div>
      </div>
    </section>
  );
});

