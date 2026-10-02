export interface Highlight {
  id: string;
  title: string;
  value: string;
  text: string;
  category: 'impact' | 'skill' | 'achievement';
}
export const highlights: Highlight[] = [
  {
    id: 'icpc-codechef', title: 'ICPC 2023 Regionalist', value: '#221',
    text: 'Regional rank 221. CodeChef peak rating: 1704 (3★).',
    category: 'achievement',
  },
  {
    id: 'hackathons-competitions', title: 'Competition & hackathon wins', value: '9+',
    text: 'Top-3 finishes at IIT Goa’s HackOverflow and NIT Goa’s BitBash, plus multiple first-place college finishes.',
    category: 'achievement',
  },
  {
    id: 'oneshield-leadership-award', title: 'Recognized by leadership', value: 'OneExt',
    text: 'Awarded for innovative problem-solving and high-impact contributions on Project OneExt.',
    category: 'achievement',
  },
  {
    id: 'backend-distributed-systems', title: 'Backend, end to end', value: 'Build',
    text: 'Java, Spring Boot, Kafka, and the full lifecycle of enterprise distributed systems.',
    category: 'skill',
  },
  {
    id: 'ai-developer-velocity', title: 'Tools that multiply capability', value: 'Automate',
    text: 'Autonomous workflows, custom MCP tooling, and LLM integrations for everyday engineering.',
    category: 'impact',
  },
];

