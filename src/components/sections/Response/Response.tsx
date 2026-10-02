import { forwardRef, useEffect, useRef, useState } from 'react';
import { contact } from '../../../data/contact';
import styles from './Response.module.css';

export const Response = forwardRef<HTMLElement>(function Response(_props, ref) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [arrived, setArrived] = useState(false);
  const [journeyTime, setJourneyTime] = useState<number | null>(null);
  useEffect(() => {
    if (!sceneRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setArrived(true);
        setJourneyTime(Math.round(performance.now() / 1000));
        observer.disconnect();
      }
    }, { threshold: .2 });
    observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);
  const links = [
    { key: 'email', value: contact.email, href: 'mailto:' + contact.email },
    { key: 'linkedin', value: contact.linkedin, href: contact.linkedin },
    { key: 'github', value: contact.github, href: contact.github },
  ].filter(link => link.value);
  return (
    <section ref={ref} id="response" data-section="response" className={styles.response} aria-labelledby="response-title">
      <div ref={sceneRef} className={styles.inner + (arrived ? ' ' + styles.arrived : '')}>
        <p className={styles.eyebrow}>06 / HTTP Response</p>
        <div className={styles.arrival} aria-hidden="true"><span>Request</span><div className={styles.wire}><i /></div><span>Fulfilled ✓</span></div>
        <div className={styles.layout}>
          <div className={styles.invitation}>
            <div className={styles.status}><span>200</span> OK</div>
            <h2 id="response-title">Let’s build<br />the next thing.</h2>
            <p>You’ve seen how I think and what I build. Have a backend, distributed systems, or AI engineering opportunity? Let’s talk.</p>
            <div className={styles.actions}>
              <a href={'mailto:' + contact.email} className={styles.primary} data-umami-event="Email Click">Email me ↗</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.secondary} data-umami-event="LinkedIn Click">LinkedIn ↗</a>
            </div>
            <a href={import.meta.env.BASE_URL + contact.resumeUrl.replace(/^\//, '')} download className={styles.resume} data-umami-event="Resume Download">↓ Download résumé</a>
          </div>
          <div className={styles.responseBlock}>
            <div className={styles.bar}><span className={styles.dot} /> Response <span>application/human</span></div>
            <dl className={styles.headers}>
              <div><dt>Status</dt><dd>Open to opportunities</dd></div>
              <div><dt>Location</dt><dd>India · open to relocation</dd></div>
              <div><dt>Philosophy</dt><dd>Build. Automate. Experiment.</dd></div>
            </dl>
            <div className={styles.json}>
              <span className={styles.brace}>{'{'}</span>
              <div className={styles.jsonRow}><span className={styles.key}>"message": </span><span>"Thanks for following the request."</span><span className={styles.brace}>,</span></div>
              {links.map((link, i) => <div key={link.key} className={styles.jsonRow}>
                <span className={styles.key}>"{link.key}": </span>
                <a href={link.href} target={link.key === 'email' ? undefined : '_blank'} rel={link.key === 'email' ? undefined : 'noopener noreferrer'}>"{link.value}"</a>
                {i < links.length - 1 && <span className={styles.brace}>,</span>}
              </div>)}
              <span className={styles.brace}>{'}'}</span>
            </div>
          </div>
        </div>
        <div className={styles.footer}><span>{journeyTime === null ? 'Journey in progress' : 'Journey time: ' + journeyTime + 's'} · Thanks for stopping by.</span><a href="#landing">Back to origin ↑</a></div>
      </div>
    </section>
  );
});

