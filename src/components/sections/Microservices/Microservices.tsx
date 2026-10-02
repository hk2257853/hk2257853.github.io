import { forwardRef, useRef, useState, type KeyboardEvent } from 'react';
import { projects, type Project } from '../../../data/projects';
import { projectStories } from '../../../data/projectStories';
import styles from './Microservices.module.css';

function ProjectPanel({ project }: { project: Project }) {
  const story = projectStories[project.id];
  const [step, setStep] = useState(0);
  return (
    <article id={'service-panel-' + project.id} role="tabpanel" aria-labelledby={'service-tab-' + project.id} className={styles.panel}>
      <div className={styles.panelBar}><code>{project.serviceName}</code><span className={styles.status}><i />{project.status}</span></div>
      <div className={styles.overview}>
        <div><span className={styles.context}>{project.isEnterprise ? 'OneShield / enterprise engineering' : 'Independent project / open source'}</span>
          <h3>{story.title}</h3><p>{story.summary}</p>
        </div>
        <div className={styles.result}><strong>{story.result}</strong><span>{story.resultLabel}</span></div>
      </div>
      <div className={styles.architecture}>
        <div className={styles.diagramHeading}><span>How it works</span><span>Select a step to explore</span></div>
        <div className={styles.flow} role="group" aria-label="Architecture steps">
          {story.flow.map((node, i) => <div className={styles.flowItem} key={node.label}>
            {i > 0 && <span className={styles.connector} aria-hidden="true"><i /></span>}
            <button type="button" onClick={() => setStep(i)} aria-pressed={step === i}
              className={styles.flowNode + (step === i ? ' ' + styles.selectedNode : '')}>
              <span>0{i + 1}</span>{node.label}
            </button>
          </div>)}
        </div>
        <p className={styles.note} aria-live="polite"><span>0{step + 1} /</span> {story.flow[step].note}</p>
      </div>
      <details className={styles.details}>
        <summary>Explore the engineering decisions <span aria-hidden="true">+</span></summary>
        <div className={styles.detailBody}>
          <p>{project.description}</p>
          <ul>{project.impact.map(item => <li key={item}>{item}</li>)}</ul>
          <div className={styles.stack} aria-label="Technology stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
        </div>
      </details>
      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.repo}
        data-umami-event="Project Repo Click" data-umami-event-project={project.serviceName}>Explore the code on GitHub ↗</a>}
    </article>
  );
}

export const Microservices = forwardRef<HTMLElement>(function Microservices(_props, ref) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablist = useRef<HTMLDivElement>(null);
  const select = (index: number, focus = false) => {
    setSelected(index);
    const tab = tabs.current[index];
    if (focus) tab?.focus({ preventScroll: true });
    // Scroll only the tab strip. scrollIntoView also moves the entire page.
    if (tab && tablist.current) {
      tablist.current.scrollTo({ left: tab.offsetLeft - tablist.current.offsetLeft - 16, behavior: 'auto' });
    }
  };
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % projects.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + projects.length) % projects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projects.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  };
  return (
    <section ref={ref} id="microservices" data-section="microservices" className={styles.services} aria-labelledby="services-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>03 / Microservices</p>
        <h2 id="services-title" className={styles.title}>The systems behind the results.</h2>
        <p className={styles.intro}>Five projects. Different problems. Select a service and follow the work.</p>
        <div className={styles.explorer}>
          <div ref={tablist} role="tablist" aria-label="Projects" className={styles.tabs}>
            {projects.map((project, i) => <button key={project.id} ref={el => { tabs.current[i] = el; }} type="button"
              role="tab" id={'service-tab-' + project.id} aria-selected={i === selected} aria-controls={'service-panel-' + project.id}
              tabIndex={i === selected ? 0 : -1} onClick={() => select(i)} onKeyDown={event => onKey(event, i)}
              className={styles.tab + (i === selected ? ' ' + styles.activeTab : '')}>
              <span className={styles.number}>0{i + 1}</span><span>{projectStories[project.id].label}<small>{project.isEnterprise ? 'OneShield' : 'Open source'}</small></span>
              <span className={styles.tabArrow} aria-hidden="true">↗</span>
            </button>)}
          </div>
          <ProjectPanel key={projects[selected].id} project={projects[selected]} />
        </div>
      </div>
    </section>
  );
});

