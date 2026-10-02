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
    description: 'Built a generic API utility that establishes a new standard for data onboarding into the OneShield system across dozens of value streams.',
    responsibility: 'Replaced engineer-dependent PL/SQL flows with a BA-operable onboarding system',
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Oracle DB', 'PL/SQL', 'JUnit'],
    impact: [
      'Reduced per-client onboarding time from weeks to days, delivering 30% ahead of estimate',
      'Enabled analyst-led onboarding across dozens of value streams, each spanning tens of tables and hundreds of columns',
      'One value stream alone covered 16 tables and 300+ columns; the generic utility supports reuse across streams',
      'Fixed a critical 3× duplicate-record bug and resolved multi-pass payload ordering',
      'Created reusable conversion helpers and led knowledge transfer for User Creation reuse',
    ],
    connections: ['ai-developer-suite', 'api-modernization'],
    isEnterprise: true,
  },
  {
    id: 'ai-developer-suite',
    serviceName: 'ai-developer-tooling-mesh',
    status: 'RUNNING',
    description: 'Built Windsurf MCP extensions, a Chrome automation tool, and AI agents for repetitive engineering work.',
    responsibility: 'Custom IDE + browser tooling that cut repetitive engineering toil across the team',
    stack: ['Windsurf', 'Model Context Protocol (MCP)', 'Python', 'Chrome Extension (JS)', 'Cucumber', 'AI Hub'],
    impact: [
      'Windsurf MCP server with controlled IDE access to Oracle DB and PL/SQL, accelerating tasks by 20–30%',
      'Chrome extension with 99% UI-element search accuracy that generates Cucumber test code for 50+ engineers',
      'OneShield AI Hub agent automating API testing end to end across 100+ scenarios',
      'Delivered 60+ API adoptions in 2 weeks against a 4-week timeline',
    ],
    connections: ['onboarding-utility', 'api-modernization'],
    isEnterprise: true,
  },
  {
    id: 'api-modernization',
    serviceName: 'api-platform-modernization',
    status: 'DEPLOYED',
    description: 'Modernized a decade-old Java API platform with a wrapper layer, a microservice POC, and schema-aware documentation tooling.',
    responsibility: 'Modernized a decade-old API platform and automated documentation generation',
    stack: ['Java', 'Spring Boot', 'Microservices', 'Python', 'OpenAPI / Swagger', 'Postman'],
    impact: [
      'Modernized the legacy wrapper layer and developed a microservice POC for enterprise clients',
      'Built a Python utility that reads API metadata and generates documentation, cutting generation from 30m+ to seconds',
      'Generated Swagger API specifications with endpoint details, field definitions, and lookup values',
    ],
    connections: ['onboarding-utility', 'genai-platform'],
    isEnterprise: true,
  },
  {
    id: 'genai-platform',
    serviceName: 'genai-service-platform',
    status: 'RUNNING',
    description: 'Built a layered FastAPI AI platform spanning document ingestion, hybrid retrieval, autonomous agents, and workflows with human approval.',
    responsibility: 'Production GenAI backend: hybrid RAG, multi-agent orchestration, streaming endpoints',
    stack: ['FastAPI', 'Python', 'LiteLLM', 'LlamaIndex', 'LangGraph', 'PostgreSQL / pgvector', 'BM25'],
    impact: [
      'Combined dense retrieval and BM25 with reciprocal rank fusion and cross-encoder reranking',
      'Built LangGraph tool workflows with conditional routing, checkpoints, error recovery, and human approval',
      'Added async generation and streaming with shared token usage and cost tracking',
      'Integration reports capture prompts, model responses, tool traces, and costs across retrieval and agent workflows',
    ],
    connections: ['ecommerce-backend', 'api-modernization'],
    repoUrl: 'https://github.com/hk2257853/genai-service-platform',
  },
  {
    id: 'ecommerce-backend',
    serviceName: 'ecommerce-microservices',
    status: 'HEALTHY',
    description: 'Built distributed order and notification services with Kafka communication, Redis coordination, and PostgreSQL transaction handling.',
    responsibility: 'Scalable e-commerce backend with distributed locking, Kafka workflows, and rate limiting from scratch',
    stack: ['Java', 'Spring Boot', 'Kafka (KRaft)', 'Redis', 'PostgreSQL', 'Docker'],
    impact: [
      'Idempotent payment and order workflows with Redis SETNX distributed locking',
      'Event-driven messaging with Kafka retries and dead-letter queue recovery',
      'Token-bucket, fixed-window, and sliding-window rate limiting built from scratch',
      'Shared Redis state and atomic Lua scripts enforce rate limits across service instances',
      'Separate deployable services let notifications scale independently from order processing',
      'Integration testing with Testcontainers and k6 load testing',
    ],
    connections: ['genai-platform'],
    repoUrl: 'https://github.com/hk2257853/ecommerce-microservices-backend',
  },
];

