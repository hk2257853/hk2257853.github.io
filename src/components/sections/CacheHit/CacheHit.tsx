import { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react';
import { highlights } from '../../../data/highlights';
import styles from './CacheHit.module.css';

const FILTERS = ['All', 'Achievements', 'Engineering'] as const;
type Filter = typeof FILTERS[number];
export const CacheHit = forwardRef<HTMLElement>(function CacheHit(_props, ref) {
  const [filter, setFilter] = useState<Filter>('All');
  const [entered, setEntered] = useState(false);
  const entriesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!entriesRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setEntered(true); observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(entriesRef.current);
    return () => observer.disconnect();
  }, []);
  const entries = highlights.filter(h => filter === 'All' || (filter === 'Achievements' ? h.category === 'achievement' : h.category !== 'achievement'));
  return (
    <section ref={ref} id="cache-hit" data-section="cache-hit" className={styles.cache} aria-labelledby="cache-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>05 / Cache</p>
        <h2 id="cache-title" className={styles.title}>The quick recall.</h2>
        <p className={styles.intro}>A few things worth keeping in memory.</p>
        <div className={styles.toolbar}>
          <code><span>GET</span> portfolio:highlights</code>
          <span className={styles.hit} role="status">{entries.length} CACHE HITS</span>
        </div>
        <div className={styles.filters} role="group" aria-label="Filter highlights">
          {FILTERS.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div ref={entriesRef}>
          <div key={filter} className={styles.entries + (entered ? ' ' + styles.loaded : '')}>
            {entries.map((entry, i) => <article key={entry.id} className={styles.entry + (entry.category !== 'achievement' ? ' ' + styles.engineering : '')}
              style={{ '--delay': i * 70 + 'ms' } as CSSProperties}>
              <div className={styles.entryMeta}><span>{entry.category}</span><span aria-hidden="true">HIT</span></div>
              <strong className={styles.value}>{entry.value}</strong>
              <h3>{entry.title}</h3><p>{entry.text}</p>
            </article>)}
          </div>
        </div>
        <p className={styles.footer}><span>TTL: ∞</span> Experience that stays with me.</p>
      </div>
    </section>
  );
});

