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
    id: 'icpc-regionalist',
    text: 'ICPC 2023 Regionalist - Rank 221',
    category: 'achievement',
  },
  {
    id: 'codechef-hackathons',
    text: 'CodeChef 3★ (1704) & 9+ Hackathons won (top finishes @ IIT Goa & NIT Goa)',
    category: 'achievement',
  },
  {
    id: 'oneshield-award',
    text: 'Leadership Award at OneShield for AI Innovation & Project OneExt delivery',
    category: 'achievement',
  },
  {
    id: 'mcp-server-speed',
    text: 'Custom MCP server integrating IDE with platform: +20-30% dev velocity',
    category: 'impact',
  },
  {
    id: 'onboarding-utility',
    text: 'Architected Java onboarding utility cutting client onboarding from weeks to days',
    category: 'impact',
  },
  {
    id: 'ai-test-agent',
    text: 'AI Agent automated 100+ API test scenarios (authoring time cut from 40m to 10m)',
    category: 'impact',
  },
  {
    id: 'distributed-patterns',
    text: 'Distributed patterns: Redis SETNX idempotency, Kafka DLQs, multi-rate limiters',
    category: 'skill',
  },
  {
    id: 'api-doc-utility',
    text: 'Python utility auto-building API docs from metadata: 30m+ → seconds',
    category: 'impact',
  },
  {
    id: 'testcontainers-k6',
    text: 'Full integration testing with Testcontainers & load testing with k6',
    category: 'skill',
  },
  {
    id: 'cucumber-tool',
    text: 'Chrome extension for Cucumber test auto-generation adopted by 50+ engineers',
    category: 'impact',
  },
];

