/**
 * Section IDs and metadata
 * Single source of truth for all section identifiers and their display info.
 */

export interface SectionMeta {
  id: string;
  label: string;
  component: string;       // For display in system map
  icon: string;            // Emoji/symbol for the system map node
  teachingMoment: string;  // What non-technical visitors learn
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'landing',
    label: 'Origin',
    component: 'Architecture',
    icon: '🌐',
    teachingMoment: 'The blueprint of how a backend application is built.',
  },
  {
    id: 'entry-point',
    label: 'Entry Point',
    component: 'DNS / Client',
    icon: '🌑',
    teachingMoment: 'Every journey on the internet starts with a request: your browser asks a server for information.',
  },
  {
    id: 'api-gateway',
    label: 'API Gateway',
    component: 'API Gateway',
    icon: '🚪',
    teachingMoment: 'The front door of a backend system, checking who you are and where to route you.',
  },
  {
    id: 'microservices',
    label: 'Services',
    component: 'Microservices',
    icon: '⚙️',
    teachingMoment: 'Small, independent programs that each handle one job, communicating via APIs.',
  },
  {
    id: 'auto-scaler',
    label: 'Auto-Scaler',
    component: 'Horizontal Scaling',
    icon: '📈',
    teachingMoment: 'Adding more capacity automatically when demand spikes, without manual intervention.',
  },
  {
    id: 'cache-hit',
    label: 'Cache',
    component: 'Redis',
    icon: '⚡',
    teachingMoment: 'Stores frequently-used data in memory so it loads instantly without querying the database every time.',
  },
  {
    id: 'response',
    label: 'Response',
    component: 'HTTP Response',
    icon: '📡',
    teachingMoment: 'When a server finishes processing, it sends back a response, like 200 OK meaning "everything worked!"',
  },
];
