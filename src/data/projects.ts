/**
 * Projects Data
 * Each project is a microservice: self-contained, with a responsibility and interface.
 */

export interface Project {
  id: string;
  serviceName: string;
  status: 'RUNNING' | 'HEALTHY' | 'DEPLOYED';
  description: string;
  responsibility: string;
  stack: string[];
  impact: string[];
  connections: string[]; // IDs of connected services
  repoUrl?: string;
  isEnterprise?: boolean;
}

export const projects: Project[] = [
  {
    id: 'onboarding-utility',
    serviceName: 'onboarding-conversion-service',
    status: 'DEPLOYED',
    description: 'Architected a generic two-phase API-driven onboarding utility replacing legacy engineer-dependent PL/SQL processes with a BA-operable system.',
    responsibility: 'Two-Phase API Onboarding Framework',
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Oracle DB', 'PL/SQL', 'JUnit'],
    impact: [
      'Reduced per-client onboarding time from weeks to days, delivered 30% ahead of estimate',
      'Eliminated engineering dependency across 16 tables and 300+ columns via BA Excel upload flow',
      'Fixed critical outbound framework 3x duplicate record bug and resolved multi-pass payload ordering',
      'Created reusable ConversionUtilityHelper and led KT sessions enabling pattern reuse for User Creation',
    ],
    connections: ['ai-developer-suite', 'api-modernization'],
    isEnterprise: true,
  },
  {
    id: 'ai-developer-suite',
    serviceName: 'ai-developer-tooling-mesh',
    status: 'RUNNING',
    description: 'Custom Windsurf MCP extensions, autonomous AI agents, and browser automation tooling engineered to eliminate repetitive engineering toil.',
    responsibility: 'IDE Agentic Workflows & Automated Code Gen',
    stack: ['Windsurf', 'Model Context Protocol (MCP)', 'Python', 'Chrome Extension (JS)', 'Cucumber', 'AI Hub'],
    impact: [
      'Custom Windsurf MCP server: direct, controlled IDE access to Oracle DB & PL/SQL (+20-30% task acceleration)',
      'Chrome extension with intelligent UI element search (99% accuracy) auto-generating Cucumber test code (adopted by 50+ engineers)',
      'OneShield AI Hub agent automating 100+ API test scenarios (authoring time: 40m → 10m each)',
      'Delivered 60+ API adoptions in 2 weeks vs. a 4-week timeline (recognized by VP for exceptional delivery)',
    ],
    connections: ['onboarding-utility', 'api-modernization'],
    isEnterprise: true,
  },
  {
    id: 'api-modernization',
    serviceName: 'api-platform-modernization',
    status: 'DEPLOYED',
    description: 'Modernized decade-old Java-based enterprise API platform with a new wrapper layer, early microservice POC, and automated metadata documentation generator.',
    responsibility: 'API Framework Modernization & Doc Gen',
    stack: ['Java', 'Spring Boot', 'Microservices', 'Python', 'OpenAPI / Swagger', 'Okta SSO', 'Postman'],
    impact: [
      'Modernized legacy API wrapper layer and developed microservice POC, reducing onboarding friction for enterprise clients',
      'Designed Python utility replicating legacy schema logic, cutting doc generation from 30m+ to seconds (40% of quarterly deliveries)',
      'Externalized lookup lists into Swagger specifications and transitioned hardcoded type mappings to Designer configuration',
      'Unblocked automated testing on Okta-enabled environments by designing end-to-end Okta session creation',
    ],
    connections: ['onboarding-utility', 'genai-platform'],
    isEnterprise: true,
  },
  {
    id: 'genai-platform',
    serviceName: 'genai-service-platform',
    status: 'RUNNING',
    description: 'Production-grade GenAI backend featuring hybrid RAG, reranking, LangGraph multi-agent workflows, and MCP tool integrations.',
    responsibility: 'Hybrid RAG & Multi-Agent Platform',
    stack: ['FastAPI', 'Python', 'LangGraph', 'LangChain', 'RAG / Vector DB', 'MCP', 'PostgreSQL'],
    impact: [
      'Hybrid RAG pipeline combining semantic vector search with cross-encoder reranking',
      'Autonomous LangGraph agent workflows orchestrating specialized MCP tool calls',
      'Asynchronous streaming endpoints with automated model evaluation and prompt testing',
    ],
    connections: ['ecommerce-backend', 'api-modernization'],
    repoUrl: 'https://github.com/hk2257853/genai-service-platform',
  },
  {
    id: 'ecommerce-backend',
    serviceName: 'ecommerce-microservices',
    status: 'HEALTHY',
    description: 'Scalable Java backend built with Spring Boot, Kafka event streaming, Redis caching, PostgreSQL, Docker, and distributed transaction patterns.',
    responsibility: 'Distributed Systems & Async Workflows',
    stack: ['Java', 'Spring Boot', 'Kafka (KRaft)', 'Redis', 'PostgreSQL', 'Docker'],
    impact: [
      'Idempotent payment & order workflows with Redis SETNX distributed locking',
      'Event-driven messaging with Kafka retries and Dead Letter Queue (DLQ) recovery',
      'Rate limiting from scratch: token bucket, fixed window, and sliding window',
      'Integration testing with Testcontainers and k6 load testing',
    ],
    connections: ['genai-platform'],
    repoUrl: 'https://github.com/hk2257853/ecommerce-microservices-backend',
  },
];

