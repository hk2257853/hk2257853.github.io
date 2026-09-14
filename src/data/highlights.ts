/**
 * Highlights Data
 * Fast-access cache entries - the TL;DR of your capabilities.
 */

export interface Highlight {
  id: string;
  text: string;
  category: 'impact' | 'skill' | 'achievement';
}

export const highlights: Highlight[] = [
  {
    id: 'oneshield-leadership-award',
    text: 'Awarded by leadership for innovative problem-solving and high-impact contributions on Project OneExt.',
    category: 'achievement',
  },
  {
    id: 'backend-distributed-systems',
    text: 'Full-lifecycle backend engineering across Java, Spring Boot, Kafka, and enterprise distributed systems.',
    category: 'skill',
  },
  {
    id: 'ai-developer-velocity',
    text: 'AI-augmented developer velocity: engineering autonomous workflows, MCP tooling, and LLM integrations.',
    category: 'impact',
  },
  {
    id: 'icpc-codechef',
    text: 'ICPC 2023 Regionalist (Rank: 221). CodeChef: highest rating - 1704 (3*).',
    category: 'achievement',
  },
  {
    id: 'hackathons-competitions',
    text: 'Won 9+ coding competitions and hackathons with top-3 finishes at IIT Goa (HackOverflow) and NIT Goa (BitBash), along with multiple 1st-place intra-college victories.',
    category: 'achievement',
  },
];

