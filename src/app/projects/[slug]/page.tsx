'use client';

import { useParams } from 'next/navigation';
import ProjectDetail, { type ProjectDetailData } from '@/components/ProjectDetail';
import { getSystemDesign } from '@/data/systemDesigns';

const projectsData: Record<string, ProjectDetailData> = {
  'propspacex-gateway': {
    title: 'PropSpaceX API Gateway',
    description:
      'Entry point for PropSpaceX — a Web2/Web3 real-estate microservice platform. Handles hybrid auth, distributed rate limiting, and gRPC routing across the service cluster.',
    tags: ['Node.js', 'TypeScript', 'Express', 'gRPC', 'Redis', 'Nginx'],
    githubUrl: 'https://github.com/fredrickray/propspacex-gateway',
    architecture: {
      description:
        'Layered gateway with middleware for auth, rate limiting, and logging, routing requests via gRPC to internal services.',
      nodes: [],
    },
    challenges: [
      {
        title: 'High availability',
        description:
          'Circuit breaker patterns and health checks keep the platform responsive even when downstream services degrade.',
      },
      {
        title: 'Distributed rate limiting',
        description:
          'Redis-backed sliding-window limits shared across gateway instances, so burst traffic is throttled fairly no matter which node serves it.',
      },
      {
        title: 'Service discovery',
        description:
          'A dynamic service registry lets new microservices join the cluster without redeploying the gateway.',
      },
      {
        title: 'Request tracing',
        description:
          'Correlation IDs propagate through every gRPC hop for end-to-end visibility across all services.',
      },
    ],
    tradeoffs: [
      {
        tech: 'gRPC',
        alternative: 'REST',
        reason: 'Binary protocol and streaming make inter-service calls far cheaper than JSON over HTTP.',
      },
      {
        tech: 'Redis',
        alternative: 'In-memory',
        reason: 'Rate-limit state must be shared across gateway instances; local memory breaks under horizontal scaling.',
      },
      {
        tech: 'Express',
        alternative: 'Fastify',
        reason: 'Middleware ecosystem and team familiarity shortened delivery without a meaningful perf penalty at this scale.',
      },
    ],
  },
  'propspacex-user-service': {
    title: 'PropSpaceX User Service',
    description:
      'Authentication and user management microservice — hybrid email/password and blockchain wallet login, device trust verification, and audit logging over REST and gRPC.',
    tags: ['Node.js', 'TypeScript', 'JWT', 'PostgreSQL', 'GeoIP', 'gRPC'],
    githubUrl: 'https://github.com/fredrickray/propspacex-user-service',
    architecture: {
      description: 'Multi-layer authentication with device fingerprinting and audit logging.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Hybrid authentication',
        description:
          'One identity model backing two login paths — traditional email/password and Ethereum wallet signature verification.',
      },
      {
        title: 'Token security',
        description:
          'JWT with refresh-token rotation and device binding prevents token theft and replay attacks.',
      },
      {
        title: 'Device trust',
        description:
          'Fingerprinting flags logins from unknown devices; GeoIP adds impossible-travel detection on top.',
      },
      {
        title: 'Audit trail',
        description:
          'Every auth event lands in an append-only log with IP and geo context for compliance and incident review.',
      },
    ],
    tradeoffs: [
      {
        tech: 'JWT + refresh',
        alternative: 'Server sessions',
        reason: 'Stateless verification scales horizontally without a shared session store on the hot path.',
      },
      {
        tech: 'PostgreSQL',
        alternative: 'MongoDB',
        reason: 'ACID guarantees matter for identity and audit data more than schema flexibility.',
      },
      {
        tech: 'Fingerprinting',
        alternative: 'IP-only checks',
        reason: 'IPs churn constantly on mobile networks; device fingerprints are a far more stable trust signal.',
      },
    ],
  },
  'propspacex-property-service': {
    title: 'PropSpaceX Property Service',
    description:
      'Real-estate management microservice — geospatial search on MongoDB, a property lifecycle state machine, and decentralized ownership verification through Ethereum smart contracts.',
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'Ethereum', 'gRPC'],
    githubUrl: 'https://github.com/fredrickray/propspacex-property-service',
    architecture: {
      description: 'Property management with geospatial capabilities and blockchain integration.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Geospatial search',
        description:
          'MongoDB 2dsphere indexes power radius and polygon searches over listings without a separate search service.',
      },
      {
        title: 'Document verification',
        description:
          'OCR and validation pipeline for legal property documents, with fraud-pattern checks before approval.',
      },
      {
        title: 'Lifecycle state machine',
        description:
          'Listing → pending → sold transitions are guarded server-side so no property skips required verification steps.',
      },
      {
        title: 'On-chain ownership',
        description:
          'Smart-contract integration proves ownership on Ethereum and records tokenized transfers immutably.',
      },
    ],
    tradeoffs: [
      {
        tech: 'MongoDB',
        alternative: 'PostGIS',
        reason: 'Flexible listing attributes plus native 2dsphere indexing covered the geo needs without a second store.',
      },
      {
        tech: 'gRPC',
        alternative: 'REST',
        reason: 'Streaming works better for bulk property sync between services.',
      },
      {
        tech: 'Ethereum',
        alternative: 'DB-only records',
        reason: 'Tokenized real estate needs an ownership record that no single operator can rewrite.',
      },
    ],
  },
  'propspacex-media-service': {
    title: 'PropSpaceX Media Service',
    description:
      'Centralized media management — chunked uploads, automatic Sharp optimization (WebP/AVIF), and a provider abstraction over AWS S3 and Cloudinary with metadata in MongoDB.',
    tags: ['Node.js', 'TypeScript', 'AWS S3', 'Cloudinary', 'Sharp', 'gRPC'],
    githubUrl: 'https://github.com/fredrickray/propspacex-media-service',
    architecture: {
      description: 'Provider abstraction with automatic optimization and CDN delivery.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Image optimization',
        description:
          'Automatic resizing and WebP/AVIF conversion cut delivery bandwidth by roughly 60% across listing photos.',
      },
      {
        title: 'Provider abstraction',
        description:
          'One upload API in front of S3 and Cloudinary — providers can be switched per asset class without touching callers.',
      },
      {
        title: 'Large files',
        description:
          'Chunked uploads and streaming processing keep memory flat for videos and high-resolution imagery.',
      },
      {
        title: 'Protected delivery',
        description:
          'Signed URLs and CDN cache invalidation for assets that should not be publicly addressable.',
      },
    ],
    tradeoffs: [
      {
        tech: 'Sharp',
        alternative: 'ImageMagick',
        reason: 'Native libvips bindings are faster and lighter on memory inside Node workers.',
      },
      {
        tech: 'Multi-provider',
        alternative: 'S3 only',
        reason: 'Cloudinary transforms are cheaper for derived variants; S3 stays the durable source of truth.',
      },
      {
        tech: 'MongoDB',
        alternative: 'PostgreSQL',
        reason: 'Variant arrays per asset map naturally to documents and match the property service stack.',
      },
    ],
  },
  'propspacex-mail-service': {
    title: 'PropSpaceX Mail Service',
    description:
      'Asynchronous notification microservice — RabbitMQ job queues with retries and dead-letter handling, template rendering, and SMTP delivery via Nodemailer.',
    tags: ['Node.js', 'Express', 'RabbitMQ', 'Nodemailer', 'MongoDB', 'gRPC'],
    githubUrl: 'https://github.com/fredrickray/propspacex-mail-service',
    architecture: {
      description: 'Queue-based processing with retry mechanisms and multi-channel delivery.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Guaranteed delivery',
        description:
          'Exponential backoff with dead-letter queues means a transactional email is never silently dropped.',
      },
      {
        title: 'Template management',
        description: 'Versioned, localized templates rendered at send time from job payloads.',
      },
      {
        title: 'Provider rate limits',
        description:
          'Queue throttling keeps outbound volume inside SMTP provider limits during spikes.',
      },
      {
        title: 'Bounce handling',
        description:
          'Webhook processing for bounces and complaints protects sender reputation automatically.',
      },
    ],
    tradeoffs: [
      {
        tech: 'RabbitMQ',
        alternative: 'Redis queue',
        reason: 'Acknowledgements, redelivery, and DLQs are first-class — exactly what transactional mail needs.',
      },
      {
        tech: 'gRPC intake',
        alternative: 'REST',
        reason: 'Mail is triggered from other services on the request path; low-latency internal calls matter.',
      },
      {
        tech: 'Nodemailer',
        alternative: 'Provider SDK',
        reason: 'SMTP keeps the service provider-agnostic — switching ESPs is a config change.',
      },
    ],
  },
  'propspacex-payment-service': {
    title: 'PropSpaceX Payment Service',
    description:
      'Multi-provider payment processing — Stripe, Paystack, and Flutterwave behind one NestJS API, with idempotent webhook handling and automated reconciliation.',
    tags: ['NestJS', 'TypeScript', 'MongoDB', 'Stripe', 'Paystack', 'Flutterwave'],
    githubUrl: 'https://github.com/fredrickray/propspacex-payment-service',
    architecture: {
      description: 'Multi-provider support with webhook processing and financial reconciliation.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Provider abstraction',
        description:
          'One payment API hides the differences between Stripe, Paystack, and Flutterwave request/response models.',
      },
      {
        title: 'Webhook reliability',
        description:
          'Signature verification, idempotency keys, and replay protection make confirmations safe to process more than once.',
      },
      {
        title: 'Reconciliation',
        description:
          'A daily job matches internal transaction records against provider statements and flags mismatches.',
      },
      {
        title: 'Money correctness',
        description:
          'Decimal128 amounts and explicit currency handling avoid floating-point drift in financial records.',
      },
    ],
    tradeoffs: [
      {
        tech: 'NestJS',
        alternative: 'Express',
        reason: 'Module boundaries and dependency injection keep per-provider logic isolated and testable.',
      },
      {
        tech: 'MongoDB',
        alternative: 'PostgreSQL',
        reason: 'Provider payloads vary wildly; a flexible schema absorbs them without constant migrations.',
      },
      {
        tech: 'Three providers',
        alternative: 'Stripe only',
        reason: 'Paystack and Flutterwave cover African payment rails that Stripe does not reach well.',
      },
    ],
  },
  'openrdb-studio': {
    title: 'OpenRDB Studio',
    description:
      'Free, open-source, cross-platform desktop GUI for relational databases — Rust, Tauri, React, and TypeScript, with SQLx for type-safe async database access.',
    tags: ['Rust', 'Tauri', 'React', 'TypeScript', 'SQLx'],
    githubUrl: 'https://github.com/fredrickray/openrdb-studio',
    architecture: {
      description: 'Tauri shell hosting a React UI over a Rust/SQLx core.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Native feel, web UI',
        description:
          'Tauri keeps the binary small and the backend in Rust while the interface stays a modern React app.',
      },
      {
        title: 'Type-safe SQL core',
        description:
          'SQLx over Tokio gives async, compile-checked database access across PostgreSQL, MySQL, and SQLite.',
      },
      {
        title: 'Credential safety',
        description:
          'Connection credentials live in the OS keychain — never in app-managed storage or config files.',
      },
      {
        title: 'Open developer experience',
        description:
          'Built as an unrestricted alternative to closed-source database GUIs — no seat licenses, no locked features.',
      },
    ],
    tradeoffs: [
      {
        tech: 'Tauri',
        alternative: 'Electron',
        reason: 'A fraction of the memory and binary size, plus a Rust-native backend for the SQL core.',
      },
      {
        tech: 'SQLx',
        alternative: 'Heavy ORM',
        reason: 'Type-safe raw SQL fits a database tool better than an abstraction that hides the SQL.',
      },
      {
        tech: 'Desktop app',
        alternative: 'Web app',
        reason: 'Local connectivity to databases behind firewalls, without proxying credentials through a server.',
      },
    ],
  },
  marketlens: {
    title: 'MarketLens AI',
    description:
      'AI-powered stock decision support analyzing market trends and real-world signals — FastAPI serving a Random Forest + LightGBM ensemble over a PostgreSQL data layer.',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    githubUrl: 'https://github.com/fredrickray/marketlense',
    architecture: {
      description: 'Signal ingest feeds ML models; FastAPI serves predictions.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Signal fusion',
        description:
          'Market prices and unstructured real-world signals are normalized into one comparable feature space.',
      },
      {
        title: 'Training pipeline',
        description:
          'Windowed feature generation and scheduled retraining keep the ensemble current as market regimes shift.',
      },
      {
        title: 'Fast inference',
        description:
          'Model loading, caching, and lean feature queries keep decision endpoints responsive.',
      },
      {
        title: 'Explainability',
        description:
          'Tree-based models expose feature importance, so a decision can always be traced to its drivers.',
      },
    ],
    tradeoffs: [
      {
        tech: 'PostgreSQL',
        alternative: 'MongoDB',
        reason: 'Time-series joins across instruments, signals, and predictions are fundamentally relational.',
      },
      {
        tech: 'FastAPI',
        alternative: 'Flask',
        reason: 'Async IO and typed contracts fit ML serving; OpenAPI docs come free.',
      },
      {
        tech: 'RF + LightGBM',
        alternative: 'Deep learning',
        reason: 'On tabular financial data, gradient boosting wins on accuracy per unit of training cost — and stays explainable.',
      },
    ],
  },
  echoloc: {
    title: 'EchoLoc',
    description:
      'Privacy-first live location sharing — Expo/React Native app with timed sharing sessions, group invites, in-group chat, and a live map over Socket.IO with the custom Echo_API backend.',
    tags: ['Expo', 'React Native', 'Socket.IO', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/fredrickray/echoloc',
    architecture: {
      description: 'Mobile clients over REST + Socket.IO with TTL-based session management.',
      nodes: [],
    },
    challenges: [
      {
        title: 'Timed privacy model',
        description:
          'Sharing is scoped to a user-defined window — sessions auto-expire server-side, so no client bug can leave tracking on.',
      },
      {
        title: 'Live group map',
        description:
          'Location pings fan out over Socket.IO rooms to group members in real time while a session is active.',
      },
      {
        title: 'Event-based groups',
        description:
          'Invite codes, membership roles, and in-group chat support temporary sharing circles around real events.',
      },
      {
        title: 'Multi-provider auth',
        description: 'Email plus Google and Apple sign-in for low-friction mobile onboarding.',
      },
    ],
    tradeoffs: [
      {
        tech: 'Socket.IO',
        alternative: 'Polling',
        reason: 'Sub-second location updates with connection fallbacks that survive flaky mobile networks.',
      },
      {
        tech: 'Expo',
        alternative: 'Bare React Native',
        reason: 'Managed workflow shipped both platforms fast; native modules were not a blocker.',
      },
      {
        tech: 'TTL sessions',
        alternative: 'Always-on sharing',
        reason: 'Privacy is the product — expiry is enforced in the data model, not just the UI.',
      },
    ],
  },
};

// legacy alias
projectsData.marketlense = projectsData.marketlens;

const defaultProject: ProjectDetailData = {
  title: 'Project Details',
  description: 'Detailed information about this backend engineering project.',
  tags: ['Node.js', 'TypeScript', 'PostgreSQL'],
  architecture: {
    description: 'Standard three-tier architecture.',
    nodes: [],
  },
  challenges: [
    {
      title: 'Scalability',
      description: 'Designed for horizontal scaling with stateless services.',
    },
    {
      title: 'Performance',
      description: 'Optimized database queries and implemented caching.',
    },
  ],
  tradeoffs: [
    {
      tech: 'TypeScript',
      alternative: 'JavaScript',
      reason: 'Type safety reduces runtime errors significantly.',
    },
  ],
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug] || defaultProject;
  const design = getSystemDesign(slug);

  return <ProjectDetail project={project} design={design} />;
}
