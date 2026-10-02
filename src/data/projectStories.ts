/** Concise presentation of the existing projects; evidence remains in projects.ts. */
export interface ProjectStory {
  label: string;
  title: string;
  result: string;
  resultLabel: string;
  summary: string;
  flow: { label: string; note: string }[];
}
export const projectStories: Record<string, ProjectStory> = {
  'onboarding-utility': {
    label: 'Client Onboarding', title: 'Let analysts run onboarding themselves.',
    result: 'Weeks → days', resultLabel: 'per-client onboarding time',
    summary: 'A generic utility sets a new standard for data onboarding into the OneShield system across dozens of value streams.',
    flow: [
      { label: 'Excel intake', note: 'Business analysts upload client data instead of handing the job to engineering.' },
      { label: 'Generic onboarding', note: 'One reusable, API-driven utility supports dozens of value streams, each spanning tens of tables and hundreds of columns.' },
      { label: 'OneShield system', note: 'The utility brings client data into the OneShield system through a standard onboarding process.' },
    ],
  },
  'ai-developer-suite': {
    label: 'AI Developer Tooling', title: 'Turn repetitive engineering into reusable tools.',
    result: 'End-to-end', resultLabel: 'API test automation across 100+ scenarios',
    summary: 'MCP extensions, browser automation, and AI agents cut repetitive IDE and testing work.',
    flow: [
      { label: 'MCP + IDE', note: 'A Windsurf MCP server gives controlled access to Oracle and PL/SQL from the developer workflow.' },
      { label: 'UI → Cucumber', note: 'A Chrome extension finds UI elements and generates Cucumber test code with 99% accuracy.' },
      { label: 'End-to-end tests', note: 'An AI Hub agent automates the API testing workflow end to end across 100+ scenarios.' },
    ],
  },
  'api-modernization': {
    label: 'API Platform', title: 'Make a legacy API easier to extend.',
    result: '30m+ → seconds', resultLabel: 'API documentation generation',
    summary: 'A wrapper layer and schema-aware tooling reduce friction in a decade-old Java API platform.',
    flow: [
      { label: 'Legacy Java API', note: 'The existing wrapper and schema logic remain the compatibility contract for enterprise clients.' },
      { label: 'Metadata to docs', note: 'A Python utility reads API metadata, including endpoints and field definitions, to generate documentation in seconds.' },
      { label: 'Swagger API specs', note: 'Generated Swagger specifications describe API endpoints, request structures, and lookup values for developers.' },
    ],
  },
  'genai-platform': {
    label: 'GenAI Platform', title: 'Build AI systems beyond a chat endpoint.',
    result: 'RAG + agents', resultLabel: 'retrieval, stateful workflows, and async serving',
    summary: 'A layered AI backend combines hybrid search, autonomous agents, and human approval workflows with streaming and cost visibility.',
    flow: [
      { label: 'Hybrid RAG', note: 'Dense vector search and BM25 combine through rank fusion, followed by cross-encoder reranking to select relevant context.' },
      { label: 'Stateful agents', note: 'LangGraph coordinates tool calls and conditional workflows with checkpoints, loop guards, and human approval before resuming.' },
      { label: 'Scalable serving', note: 'Async FastAPI endpoints, pooled pgvector connections, and streaming support concurrent AI requests with token and cost tracking.' },
    ],
  },
  'ecommerce-backend': {
    label: 'Commerce Backend', title: 'Build commerce as a distributed system.',
    result: 'Independent services', resultLabel: 'orders and notifications connected through Kafka',
    summary: 'Spring Boot services combine asynchronous events, distributed request controls, and recovery paths to handle growth and failures.',
    flow: [
      { label: 'Scalable services', note: 'Separate order and notification services communicate through Kafka so they can deploy and scale independently.' },
      { label: 'Distributed control', note: 'Redis coordinates idempotency and atomic Lua rate limits across instances, while database locking protects concurrent inventory updates.' },
      { label: 'Failure recovery', note: 'Kafka retries and dead-letter handling isolate failed events so notification failures do not block order creation.' },
    ],
  },
};

