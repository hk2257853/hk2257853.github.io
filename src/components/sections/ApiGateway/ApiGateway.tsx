import { forwardRef, useEffect, useRef, useState } from 'react';
import { profile } from '../../../data/profile';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import styles from './ApiGateway.module.css';

const ROUTES = [
  { id: 'microservices', path: '/projects', label: 'Explore the work', icon: '⚙️' },
  { id: 'auto-scaler', path: '/approach', label: 'How I build', icon: '📈' },
  { id: 'cache-hit', path: '/highlights', label: 'The quick version', icon: '⚡' },
  { id: 'response', path: '/contact', label: 'Let’s connect', icon: '↗' },
];
const CHECKS = ['Identity read', 'Headers checked', 'Route resolved'];
const STATUS = ['Ready when you are.', 'Sending your request…', 'Inspecting the headers…', 'Request accepted. Pick a route.'];

export const ApiGateway = forwardRef<HTMLElement>(function ApiGateway(_props, ref) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = () => {
    timers.current.forEach(clearTimeout);
    if (reduced) { setPhase(3); return; }
    setPhase(1);
    timers.current = [
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1650),
    ];
  };
  const busy = phase === 1 || phase === 2;

  return (
    <section ref={ref} id="api-gateway" data-section="api-gateway" className={styles.gateway} aria-labelledby="gateway-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>02 / API Gateway</p>
        <h2 id="gateway-title" className={styles.title}>Meet the engineer.</h2>
        <p className={styles.intro}>I build backend systems at OneShield, and tools that make engineering teams faster.</p>
        <div className={styles.layout}>
          <div className={styles.playground}>
            <div className={styles.playgroundHeading}><span>Try the gateway</span><span className={styles.miniLabel}>Interactive walkthrough</span></div>
            <div className={styles.flow} data-phase={phase} aria-hidden="true">
              <div className={styles.flowNode}>You<span>Request</span></div>
              <div className={styles.wire}>{phase === 1 && <i className={styles.packet} />}</div>
              <div className={styles.gate + (phase >= 2 ? ' ' + styles.gateActive : '')}>{phase === 3 ? '✓' : '⌘'}<span>Gateway</span></div>
              <div className={styles.wire + (phase === 3 ? ' ' + styles.wireReady : '')} />
              <div className={styles.flowNode}>↗<span>Routes</span></div>
            </div>
            <ol className={styles.checks}>
              {CHECKS.map((check, i) => <li key={check} className={phase === 3 ? styles.checked : ''}>
                <span>{phase === 3 ? '✓' : String(i + 1).padStart(2, '0')}</span>{check}
              </li>)}
            </ol>
            <button type="button" onClick={send} disabled={busy} className={styles.send} data-umami-event="Gateway Send Request">
              {busy ? 'Processing…' : phase === 3 ? 'Send another request ↗' : 'Send request ↗'}
            </button>
            <p className={styles.feedback} role="status">{STATUS[phase]}</p>
          </div>
          <div className={styles.profile}>
            <div className={styles.bar}><span className={styles.dot} /> Request headers <span className={styles.method}>GET /about</span></div>
            <dl className={styles.headers}>
              {Object.entries(profile.headers).filter(([key]) => key !== 'Method').map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <dt>{key}</dt><dd>{value}</dd>
                </div>
              ))}
            </dl>
            {phase === 2 && <div className={styles.scan} aria-hidden="true" />}
            <div className={styles.profileFooter}><span>India · open to relocation</span><span className={styles.available}>Open to opportunities</span></div>
          </div>
        </div>
        <div className={styles.routeHeading}><span>Choose your next endpoint</span><span>{phase === 3 ? '4 routes resolved' : 'Always open to explore'}</span></div>
        <nav className={styles.routes + (phase === 3 ? ' ' + styles.ready : '')} aria-label="Portfolio endpoints">
          {ROUTES.map(route => <a key={route.id} href={'#' + route.id} className={styles.route}>
            <span className={styles.routeIcon} aria-hidden="true">{route.icon}</span>
            <span><code>{route.path}</code><span className={styles.routeLabel}>{route.label}</span></span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>)}
        </nav>
      </div>
    </section>
  );
});

