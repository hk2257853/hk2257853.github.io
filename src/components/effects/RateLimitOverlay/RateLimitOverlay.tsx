/** A one-time easter egg for fast manual scrolling, never for route navigation. */
import { useEffect, useState } from 'react';
import styles from './RateLimitOverlay.module.css';

export function RateLimitOverlay() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let triggered = false;
    let windowStart = 0;
    let distance = 0;
    let events = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (event: WheelEvent) => {
      if (triggered || event.ctrlKey || !event.isTrusted) return;
      const now = performance.now();
      if (now - windowStart > 220) { windowStart = now; distance = 0; events = 0; }
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      distance += Math.abs(event.deltaY) * scale;
      events += 1;
      if (events >= 3 && distance > 1600) {
        triggered = true;
        setVisible(true);
        timeout = setTimeout(() => setVisible(false), 1500);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => { window.removeEventListener('wheel', onWheel); clearTimeout(timeout); };
  }, []);
  return <div className={styles.overlay + (visible ? ' ' + styles.visible : '')} aria-hidden={!visible}>
    <div className={styles.content}><div className={styles.code}>429</div><div className={styles.message}>Too Many Requests</div><div className={styles.detail}>Slow down. Enjoy the journey.</div></div>
  </div>;
}
