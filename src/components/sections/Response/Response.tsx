/**
 * Response - Section 6: 200 OK
 *
 * The request journey completes → response assembles with headers →
 * JSON body reveals contact links → CTA to connect →
 * response time shows how long the visitor spent on the site.
 */

import { forwardRef, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { contact } from '../../../data/contact';
import styles from './Response.module.css';

export const Response = forwardRef<HTMLElement>(
  function Response(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [timeSpent, setTimeSpent] = useState('0.0');
    const startTimeRef = useRef(Date.now());

    // Track time spent on site
    useEffect(() => {
      const interval = setInterval(() => {
        const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1);
        setTimeSpent(elapsed);
      }, 100);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (!containerRef.current) return;

      const label = containerRef.current.querySelector(`.${styles.componentLabel}`);
      const status = containerRef.current.querySelector(`.${styles.statusLine}`);
      const block = containerRef.current.querySelector(`.${styles.responseBlock}`);
      const cta = containerRef.current.querySelector(`.${styles.ctaBlock}`);
      const time = containerRef.current.querySelector(`.${styles.responseTime}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(label, { opacity: 0.7, duration: 0.3 });
      tl.to(status, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      tl.to(block, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
      tl.to(cta, { opacity: 1, duration: 0.4 }, '-=0.2');
      tl.to(time, { opacity: 1, duration: 0.3 });

      return () => { tl.kill(); };
    }, []);

    const headers = Object.entries(contact.responseHeaders);

    return (
      <section ref={ref} id="response" className={styles.response} data-section="response">
        <div ref={containerRef} className={styles.responseInner}>
          <div className={styles.componentLabel}>📡 HTTP Response</div>

          <div className={styles.statusLine}>
            <span className={styles.statusCode}>200</span>
            <span className={styles.statusText}>OK</span>
          </div>

          <div className={styles.responseBlock}>
            <div className={styles.responseBlockTitle}>
              Response
            </div>

            {/* Response headers */}
            <div className={styles.responseHeaders}>
              {headers.map(([key, value]) => (
                <div key={key} className={styles.responseHeaderRow}>
                  <span className={styles.rhKey}>{key}:</span>
                  <span className={`${styles.rhValue} ${
                    key.startsWith('X-') ? styles.accent : ''
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Response body - JSON */}
            <div className={styles.responseBody}>
              <div className={styles.jsonBrace}>{'{'}</div>
              <div>
                <span className={styles.jsonKey}>"message"</span>
                <span className={styles.jsonBrace}>: </span>
                <span className={styles.jsonValue}>"Thanks for following the request."</span>
              </div>
              {contact.email && (
                <div>
                  <span className={styles.jsonKey}>"email"</span>
                  <span className={styles.jsonBrace}>: </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className={styles.jsonValueLink}
                    data-umami-event="Email Click"
                  >
                    "{contact.email}"
                  </a>
                </div>
              )}
              {contact.linkedin && (
                <div>
                  <span className={styles.jsonKey}>"linkedin"</span>
                  <span className={styles.jsonBrace}>: </span>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.jsonValueLink}
                    data-umami-event="LinkedIn Click"
                  >
                    "{contact.linkedin}"
                  </a>
                </div>
              )}
              {contact.github && (
                <div>
                  <span className={styles.jsonKey}>"github"</span>
                  <span className={styles.jsonBrace}>: </span>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.jsonValueLink}
                    data-umami-event="GitHub Profile Click"
                  >
                    "{contact.github}"
                  </a>
                </div>
              )}
              <div className={styles.jsonBrace}>{'}'}</div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaBlock}>
            <p className={styles.ctaText}>Request fulfilled. Now let's build something.</p>
            <a
              href={contact.resumeUrl}
              className={styles.ctaButton}
              download
              data-umami-event="Resume Download"
            >
              ↓ Download Resume
            </a>
          </div>

          {/* Response time easter egg */}
          <div className={styles.responseTime}>
            Response-Time: <span className={styles.timeValue}>{timeSpent}s</span>
          </div>
        </div>
      </section>
    );
  }
);
