/**
 * Profile Data
 * Your identity - rendered as request headers in the API Gateway section.
 */

export const profile = {
  name: 'Harsh Kumar',
  title: 'Software Engineer | Backend | Distributed Systems | AI',
  currentRole: 'Software Engineer',
  company: 'OneShield',
  experience: '1.5+ years',
  stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'Microservices', 'Docker', 'AWS', 'Python', 'LLMs / RAG'],
  superpower: 'Systems builder with 4x AI-augmented velocity',
  location: 'India (open to relocation)',
  openTo: ['Backend Software Engineer roles', 'Distributed Systems', 'AI Systems & Engineering'],

  // Rendered as HTTP request headers
  headers: {
    'Host': 'harsh-kumar.dev',
    'Method': 'GET /about',
    'Authorization': 'Bearer [software-engineer-backend-ai]',
    'X-Stack': 'Java, Spring Boot, Kafka, Redis, Python',
    'X-Current': 'Software Engineer @ OneShield',
    'X-Superpower': 'AI-augmented systems builder',
    'X-Status': 'Open to opportunities',
  },
} as const;

