export type ProjectService = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: 'Systems' | 'Tools' | 'ML' | 'APIs' | 'Mobile';
  tags: string[];
  featured: boolean;
  architecture?: string[];
  github: string;
  services?: ProjectService[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'propspacex',
    title: 'PropSpaceX',
    description:
      'Microservice real-estate platform combining Web2 and Web3 — Node.js, MongoDB, PostgreSQL, and gRPC, with Ethereum ownership verification and hybrid email/wallet auth.',
    category: 'Systems',
    tags: ['Node.js', 'gRPC', 'MongoDB', 'PostgreSQL', 'Ethereum'],
    featured: true,
    architecture: [
      'Gateway',
      'Auth',
      'Property',
      'Media',
      'Mail',
      'Payments',
      'Contracts',
    ],
    github: 'https://github.com/fredrickray/propspacex-gateway',
    services: [
      {
        slug: 'propspacex-gateway',
        title: 'API Gateway',
        description:
          'Auth, authorization, rate limiting, and request routing across the PropSpaceX cluster.',
        tags: ['Node.js', 'TypeScript', 'Express', 'gRPC', 'Proxy'],
        github: 'https://github.com/fredrickray/propspacex-gateway',
      },
      {
        slug: 'propspacex-user-service',
        title: 'User Service',
        description:
          'Hybrid authentication — traditional email/password and blockchain wallet login, plus device trust.',
        tags: ['JWT', 'PostgreSQL', 'Wallet Auth', 'gRPC'],
        github: 'https://github.com/fredrickray/propspacex-user-service',
      },
      {
        slug: 'propspacex-property-service',
        title: 'Property Service',
        description:
          'Property lifecycle with decentralized ownership verification via Ethereum smart contracts.',
        tags: ['MongoDB', 'Ethereum', 'gRPC', 'Web3'],
        github: 'https://github.com/fredrickray/propspacex-property-service',
      },
      {
        slug: 'propspacex-media-service',
        title: 'Media Service',
        description:
          'Multi-provider media with Sharp optimization and S3/Cloudinary abstraction.',
        tags: ['AWS S3', 'Cloudinary', 'Sharp', 'gRPC'],
        github: 'https://github.com/fredrickray/propspacex-media-service',
      },
      {
        slug: 'propspacex-mail-service',
        title: 'Mail Service',
        description:
          'Async transactional mail with RabbitMQ, retries, and dead-letter queues.',
        tags: ['RabbitMQ', 'Nodemailer', 'gRPC', 'DLQ'],
        github: 'https://github.com/fredrickray/propspacex-mail-service',
      },
      {
        slug: 'propspacex-payment-service',
        title: 'Payment Service',
        description:
          'Stripe, Paystack, and Flutterwave with webhooks and reconciliation.',
        tags: ['NestJS', 'Stripe', 'Paystack', 'Flutterwave'],
        github: 'https://github.com/fredrickray/propspacex-payment-service',
      },
    ],
  },
  {
    id: 2,
    slug: 'openrdb-studio',
    title: 'OpenRDB Studio',
    description:
      'Free, open-source, cross-platform desktop GUI for relational databases — Rust, Tauri, React, and TypeScript with SQLx for type-safe async access.',
    category: 'Tools',
    tags: ['Rust', 'Tauri', 'React', 'TypeScript', 'SQLx'],
    featured: true,
    architecture: ['Desktop App', 'SQL Client', 'SQLx', 'Cross-Platform'],
    github: 'https://github.com/fredrickray/openrdb-studio',
  },
  {
    id: 3,
    slug: 'marketlens',
    title: 'MarketLens AI',
    description:
      'AI-powered stock decision support that analyzes market trends and real-world signals — FastAPI, Python, Random Forest, LightGBM, and PostgreSQL.',
    category: 'ML',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    featured: true,
    architecture: ['Signal Ingest', 'ML Models', 'Decision API', 'Postgres'],
    github: 'https://github.com/fredrickray/marketlense',
  },
  {
    id: 4,
    slug: 'echoloc',
    title: 'EchoLoc',
    description:
      'Privacy-first live location sharing — timed sessions, group invites, in-group chat, and a live map over Socket.IO with a custom Echo_API backend.',
    category: 'Mobile',
    tags: ['Expo', 'React Native', 'Socket.IO', 'Node.js', 'Auth'],
    featured: false,
    architecture: ['Mobile App', 'Echo_API', 'Socket.IO', 'Timed Sessions'],
    github: 'https://github.com/fredrickray/echoloc',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categories = ['All', 'Systems', 'Tools', 'ML', 'Mobile', 'APIs'] as const;

export function getProjectBySlug(slug: string): Project | ProjectService | undefined {
  const normalized = slug === 'marketlense' ? 'marketlens' : slug;
  const top = projects.find((p) => p.slug === normalized);
  if (top) return top;

  for (const project of projects) {
    const service = project.services?.find((s) => s.slug === slug);
    if (service) return service;
  }
  return undefined;
}
