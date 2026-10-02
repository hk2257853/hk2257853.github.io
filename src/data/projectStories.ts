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
    label: 'Onboarding', title: 'Put onboarding in the right hands.',
    result: 'Weeks → days', resultLabel: 'per-client onboarding time',
    summary: 'A business analyst can now onboard clients through an Excel upload, without an engineer running PL/SQL.',
    flow: [
      { label: 'Excel upload', note: 'Business analysts supply the client data through a familiar spreadsheet workflow.' },
      { label: 'Conversion API', note: 'A generic, two-phase utility replaces the legacy engineer-dependent process.' },
      { label: 'Oracle', note: 'The flow covers 16 tables and more than 300 columns, with reusable conversion helpers.' },
    ],
  },
  'ai-developer-suite': {
    label: 'AI Tooling', title: 'Give the whole team a head start.',
    result: '40m → 10m', resultLabel: 'authoring time per API test scenario',
    summary: 'Custom agents, IDE tools, and browser automation remove repetitive work from everyday engineering.',
    flow: [
      { label: 'Engineer', note: 'Engineers work in their existing IDE and browser rather than repeatedly moving between tools.' },
      { label: 'Custom tools', note: 'MCP extensions connect the IDE to Oracle and PL/SQL. A browser extension generates Cucumber code.' },
      { label: 'Test scenarios', note: 'An AI Hub agent automates 100+ API scenarios; the browser extension was adopted by 50+ engineers.' },
    ],
  },
  'api-modernization': {
    label: 'API Modernization', title: 'Make a legacy platform easier to build on.',
    result: '30m+ → seconds', resultLabel: 'API documentation generation',
    summary: 'A modern wrapper and automated metadata documentation reduce friction in a decade-old enterprise API platform.',
    flow: [
      { label: 'Legacy schema', note: 'The existing Java platform and schema logic define the behavior that must be preserved.' },
      { label: 'Metadata utility', note: 'A Python utility reproduces the schema logic to automate documentation generation.' },
      { label: 'OpenAPI docs', note: 'Swagger specifications expose lookup lists, while type mappings move into Designer configuration.' },
    ],
  },
  'genai-platform': {
    label: 'GenAI', title: 'Give answers a stronger foundation.',
    result: 'Hybrid RAG', resultLabel: 'retrieval, reranking, and agent workflows',
    summary: 'A GenAI backend combining search, tool use, and streaming responses with evaluation built into the workflow.',
    flow: [
      { label: 'Retrieve', note: 'Semantic vector search retrieves context for the incoming question.' },
      { label: 'Rerank + act', note: 'Cross-encoder reranking refines context; LangGraph workflows orchestrate specialized MCP tools.' },
      { label: 'Stream', note: 'Asynchronous endpoints stream responses, with automated model evaluation and prompt testing.' },
    ],
  },
  'ecommerce-backend': {
    label: 'E-commerce', title: 'Keep orders reliable when things go wrong.',
    result: 'Safe retries', resultLabel: 'idempotent payment and order workflows',
    summary: 'A distributed commerce backend designed around duplicate requests, failed messages, and traffic spikes.',
    flow: [
      { label: 'Order / payment', note: 'Redis SETNX locking protects idempotent payment and order workflows from duplicate execution.' },
      { label: 'Kafka events', note: 'Event-driven messaging carries work between services, with retries for recoverable failures.' },
      { label: 'Recovery', note: 'A dead letter queue supports failed-message recovery; Testcontainers and k6 exercise the system.' },
    ],
  },
};

