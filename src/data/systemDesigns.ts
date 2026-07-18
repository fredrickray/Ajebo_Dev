// Diagram data for project detail pages: request-flow architecture + ERD schemas.
// Coordinates are abstract grid units — ArchFlow/SchemaCanvas convert them to px.

export type FlowNodeKind = 'client' | 'edge' | 'service' | 'data' | 'external' | 'queue';

export type FlowNode = {
  id: string;
  label: string;
  sub?: string;
  col: number; // horizontal lane (floats allowed)
  row: number; // vertical position (floats allowed)
  kind: FlowNodeKind;
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean; // async / callback paths
};

export type ArchFlow = {
  request: string; // shown in the diagram chrome, e.g. "POST /v1/properties/verify"
  caption: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  trace: string[]; // ordered node ids — the animated request path
};

export type SchemaField = {
  name: string;
  type: string;
  key?: 'pk' | 'fk';
};

export type SchemaTable = {
  id: string;
  name: string;
  store?: string; // e.g. "PostgreSQL", "MongoDB"
  x: number;
  y: number;
  fields: SchemaField[];
};

export type SchemaRelation = {
  from: string; // table id
  fromField: string;
  to: string; // table id
  toField: string;
};

export type SchemaDesign = {
  caption: string;
  width: number;
  height: number;
  tables: SchemaTable[];
  relations: SchemaRelation[];
};

export type SystemDesign = {
  flow: ArchFlow;
  schema?: SchemaDesign;
};

export const systemDesigns: Record<string, SystemDesign> = {
  /* ------------------------------------------------------------------ */
  /* PropSpaceX — platform overview (gateway page)                       */
  /* ------------------------------------------------------------------ */
  'propspacex-gateway': {
    flow: {
      request: 'POST /v1/properties/verify',
      caption:
        'A request enters through Nginx, hits the Express gateway (auth, rate limiting, logging), is verified against the User Service, then routed over gRPC to the Property Service — which checks on-chain ownership before persisting to MongoDB. Payment and mail flows run asynchronously through RabbitMQ.',
      nodes: [
        { id: 'client', label: 'Client', sub: 'Web · Mobile', col: 0, row: 2, kind: 'client' },
        { id: 'nginx', label: 'Nginx', sub: 'Load balancer', col: 1, row: 2, kind: 'edge' },
        { id: 'gateway', label: 'API Gateway', sub: 'Auth · Rate limit · Logs', col: 2, row: 2, kind: 'service' },
        { id: 'redis', label: 'Redis', sub: 'Sliding-window limits', col: 2, row: 3.4, kind: 'data' },
        { id: 'user', label: 'User Service', sub: 'JWT · Wallet auth', col: 3, row: 0.4, kind: 'service' },
        { id: 'property', label: 'Property Service', sub: 'Listings · Lifecycle', col: 3, row: 1.4, kind: 'service' },
        { id: 'media', label: 'Media Service', sub: 'Sharp · Uploads', col: 3, row: 2.4, kind: 'service' },
        { id: 'payment', label: 'Payment Service', sub: 'NestJS · Webhooks', col: 3, row: 3.4, kind: 'service' },
        { id: 'rabbitmq', label: 'RabbitMQ', sub: 'Events · DLQ', col: 3, row: 4.5, kind: 'queue' },
        { id: 'postgres', label: 'PostgreSQL', sub: 'Users · Devices', col: 4, row: 0, kind: 'data' },
        { id: 'ethereum', label: 'Ethereum', sub: 'Ownership contracts', col: 4, row: 1, kind: 'external' },
        { id: 'mongo', label: 'MongoDB', sub: 'Properties · Txns', col: 4, row: 2, kind: 'data' },
        { id: 'storage', label: 'S3 · Cloudinary', sub: 'Media storage', col: 4, row: 3, kind: 'external' },
        { id: 'providers', label: 'Stripe · Paystack', sub: '+ Flutterwave', col: 4, row: 4, kind: 'external' },
        { id: 'mail', label: 'Mail Service', sub: 'Nodemailer · SMTP', col: 4, row: 5, kind: 'service' },
      ],
      edges: [
        { from: 'client', to: 'nginx', label: 'HTTPS' },
        { from: 'nginx', to: 'gateway' },
        { from: 'gateway', to: 'redis', label: 'rate limit' },
        { from: 'gateway', to: 'user', label: 'gRPC · verify' },
        { from: 'gateway', to: 'property', label: 'gRPC' },
        { from: 'gateway', to: 'media', label: 'gRPC' },
        { from: 'gateway', to: 'payment', label: 'gRPC' },
        { from: 'user', to: 'postgres' },
        { from: 'property', to: 'ethereum', label: 'ownership check' },
        { from: 'property', to: 'mongo' },
        { from: 'media', to: 'storage' },
        { from: 'payment', to: 'providers', label: 'charge' },
        { from: 'providers', to: 'payment', label: 'webhook', dashed: true },
        { from: 'payment', to: 'rabbitmq', label: 'events', dashed: true },
        { from: 'rabbitmq', to: 'mail', label: 'consume', dashed: true },
      ],
      trace: ['client', 'nginx', 'gateway', 'user', 'gateway', 'property', 'ethereum', 'property', 'mongo'],
    },
    schema: {
      caption:
        'Cross-service view — identity lives in PostgreSQL (User Service); properties, media, transactions, and mail jobs live in MongoDB, linked by owner and property references.',
      width: 950,
      height: 560,
      tables: [
        {
          id: 'users',
          name: 'users',
          store: 'PostgreSQL',
          x: 40,
          y: 60,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'email', type: 'varchar' },
            { name: 'wallet_address', type: 'varchar' },
            { name: 'password_hash', type: 'varchar' },
            { name: 'mfa_enabled', type: 'bool' },
            { name: 'created_at', type: 'timestamp' },
          ],
        },
        {
          id: 'devices',
          name: 'devices',
          store: 'PostgreSQL',
          x: 40,
          y: 340,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'user_id', type: 'uuid', key: 'fk' },
            { name: 'fingerprint', type: 'varchar' },
            { name: 'last_ip', type: 'inet' },
            { name: 'trusted', type: 'bool' },
          ],
        },
        {
          id: 'properties',
          name: 'properties',
          store: 'MongoDB',
          x: 380,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'owner_id', type: 'uuid', key: 'fk' },
            { name: 'title', type: 'string' },
            { name: 'price', type: 'number' },
            { name: 'status', type: 'enum' },
            { name: 'location', type: '2dsphere' },
            { name: 'token_id', type: 'string' },
          ],
        },
        {
          id: 'documents',
          name: 'documents',
          store: 'MongoDB',
          x: 710,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'property_id', type: 'objectId', key: 'fk' },
            { name: 'type', type: 'string' },
            { name: 'verified', type: 'bool' },
          ],
        },
        {
          id: 'media_assets',
          name: 'media_assets',
          store: 'MongoDB',
          x: 710,
          y: 230,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'property_id', type: 'objectId', key: 'fk' },
            { name: 'provider', type: 'enum' },
            { name: 'variants', type: 'array' },
          ],
        },
        {
          id: 'transactions',
          name: 'transactions',
          store: 'MongoDB',
          x: 380,
          y: 330,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'user_id', type: 'uuid', key: 'fk' },
            { name: 'property_id', type: 'objectId', key: 'fk' },
            { name: 'provider', type: 'enum' },
            { name: 'amount', type: 'decimal128' },
            { name: 'status', type: 'enum' },
          ],
        },
        {
          id: 'email_jobs',
          name: 'email_jobs',
          store: 'MongoDB',
          x: 710,
          y: 420,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'user_id', type: 'uuid', key: 'fk' },
            { name: 'template', type: 'string' },
            { name: 'status', type: 'enum' },
          ],
        },
      ],
      relations: [
        { from: 'devices', fromField: 'user_id', to: 'users', toField: 'id' },
        { from: 'properties', fromField: 'owner_id', to: 'users', toField: 'id' },
        { from: 'documents', fromField: 'property_id', to: 'properties', toField: '_id' },
        { from: 'media_assets', fromField: 'property_id', to: 'properties', toField: '_id' },
        { from: 'transactions', fromField: 'user_id', to: 'users', toField: 'id' },
        { from: 'transactions', fromField: 'property_id', to: 'properties', toField: '_id' },
        { from: 'email_jobs', fromField: 'user_id', to: 'users', toField: 'id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* PropSpaceX — User Service                                           */
  /* ------------------------------------------------------------------ */
  'propspacex-user-service': {
    flow: {
      request: 'POST /auth/login',
      caption:
        'Logins arrive from the gateway over REST; internal services verify tokens over gRPC. The auth engine rotates refresh tokens, binds sessions to device fingerprints, and validates location via GeoIP before touching PostgreSQL. Wallet login verifies an Ethereum signature instead of a password.',
      nodes: [
        { id: 'gateway', label: 'API Gateway', sub: 'External traffic', col: 0, row: 0.5, kind: 'edge' },
        { id: 'services', label: 'Internal Services', sub: 'Token checks', col: 0, row: 1.7, kind: 'edge' },
        { id: 'rest', label: 'REST API', sub: 'Login · Register', col: 1, row: 0.5, kind: 'service' },
        { id: 'grpc', label: 'gRPC Server', sub: 'verifyToken()', col: 1, row: 1.7, kind: 'service' },
        { id: 'auth', label: 'Auth Engine', sub: 'JWT · Refresh rotation', col: 2, row: 0.2, kind: 'service' },
        { id: 'device', label: 'Device Trust', sub: 'Fingerprints', col: 2, row: 1.2, kind: 'service' },
        { id: 'geoip', label: 'GeoIP', sub: 'MaxMind · travel checks', col: 2, row: 2.2, kind: 'external' },
        { id: 'wallet', label: 'Wallet Auth', sub: 'Signature verify', col: 2, row: 3.2, kind: 'service' },
        { id: 'postgres', label: 'PostgreSQL', sub: 'Users · Sessions', col: 3, row: 0.7, kind: 'data' },
        { id: 'audit', label: 'Audit Log', sub: 'Auth events', col: 3, row: 1.9, kind: 'data' },
      ],
      edges: [
        { from: 'gateway', to: 'rest' },
        { from: 'services', to: 'grpc', label: 'gRPC' },
        { from: 'rest', to: 'auth' },
        { from: 'grpc', to: 'auth' },
        { from: 'auth', to: 'device', label: 'bind session' },
        { from: 'device', to: 'geoip', label: 'locate' },
        { from: 'auth', to: 'wallet', label: 'wallet login', dashed: true },
        { from: 'auth', to: 'postgres' },
        { from: 'auth', to: 'audit', label: 'trail', dashed: true },
      ],
      trace: ['gateway', 'rest', 'auth', 'device', 'geoip', 'device', 'auth', 'postgres'],
    },
    schema: {
      caption:
        'Sessions are bound to both a user and a trusted device; every auth event lands in an append-only trail for impossible-travel and audit checks.',
      width: 900,
      height: 480,
      tables: [
        {
          id: 'users',
          name: 'users',
          store: 'PostgreSQL',
          x: 40,
          y: 40,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'email', type: 'varchar' },
            { name: 'password_hash', type: 'varchar' },
            { name: 'wallet_address', type: 'varchar' },
            { name: 'mfa_enabled', type: 'bool' },
            { name: 'created_at', type: 'timestamp' },
          ],
        },
        {
          id: 'devices',
          name: 'devices',
          store: 'PostgreSQL',
          x: 380,
          y: 40,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'user_id', type: 'uuid', key: 'fk' },
            { name: 'fingerprint', type: 'varchar' },
            { name: 'last_ip', type: 'inet' },
            { name: 'trusted', type: 'bool' },
            { name: 'last_seen', type: 'timestamp' },
          ],
        },
        {
          id: 'sessions',
          name: 'sessions',
          store: 'PostgreSQL',
          x: 700,
          y: 60,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'user_id', type: 'uuid', key: 'fk' },
            { name: 'device_id', type: 'uuid', key: 'fk' },
            { name: 'refresh_hash', type: 'varchar' },
            { name: 'expires_at', type: 'timestamp' },
            { name: 'revoked', type: 'bool' },
          ],
        },
        {
          id: 'auth_events',
          name: 'auth_events',
          store: 'PostgreSQL',
          x: 210,
          y: 300,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'user_id', type: 'uuid', key: 'fk' },
            { name: 'event', type: 'varchar' },
            { name: 'ip', type: 'inet' },
            { name: 'geo', type: 'jsonb' },
            { name: 'created_at', type: 'timestamp' },
          ],
        },
      ],
      relations: [
        { from: 'devices', fromField: 'user_id', to: 'users', toField: 'id' },
        { from: 'sessions', fromField: 'user_id', to: 'users', toField: 'id' },
        { from: 'sessions', fromField: 'device_id', to: 'devices', toField: 'id' },
        { from: 'auth_events', fromField: 'user_id', to: 'users', toField: 'id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* PropSpaceX — Property Service                                       */
  /* ------------------------------------------------------------------ */
  'propspacex-property-service': {
    flow: {
      request: 'POST /properties/:id/list',
      caption:
        'Listing changes run through a lifecycle state machine. Legal documents pass the verifier, ownership is proven against Ethereum smart contracts, and the result — including the 2dsphere-indexed location — is persisted to MongoDB.',
      nodes: [
        { id: 'gateway', label: 'API Gateway', sub: 'External traffic', col: 0, row: 0.6, kind: 'edge' },
        { id: 'services', label: 'Internal Services', sub: 'Bulk sync', col: 0, row: 1.8, kind: 'edge' },
        { id: 'rest', label: 'REST API', sub: 'Property CRUD', col: 1, row: 0.6, kind: 'service' },
        { id: 'grpc', label: 'gRPC Server', sub: 'Streaming queries', col: 1, row: 1.8, kind: 'service' },
        { id: 'geo', label: 'Geo Engine', sub: 'Radius · polygon search', col: 2, row: 0, kind: 'service' },
        { id: 'verifier', label: 'Doc Verifier', sub: 'OCR · fraud checks', col: 2, row: 1.1, kind: 'service' },
        { id: 'lifecycle', label: 'Lifecycle SM', sub: 'listed → pending → sold', col: 2, row: 2.2, kind: 'service' },
        { id: 'mongo', label: 'MongoDB', sub: '2dsphere index', col: 3, row: 0.6, kind: 'data' },
        { id: 'ethereum', label: 'Ethereum', sub: 'Tokenized ownership', col: 3, row: 2.2, kind: 'external' },
      ],
      edges: [
        { from: 'gateway', to: 'rest' },
        { from: 'services', to: 'grpc', label: 'gRPC' },
        { from: 'rest', to: 'geo', label: 'search' },
        { from: 'rest', to: 'verifier', label: 'docs' },
        { from: 'rest', to: 'lifecycle', label: 'state change' },
        { from: 'grpc', to: 'lifecycle' },
        { from: 'geo', to: 'mongo' },
        { from: 'verifier', to: 'mongo' },
        { from: 'lifecycle', to: 'mongo' },
        { from: 'lifecycle', to: 'ethereum', label: 'verify on-chain' },
      ],
      trace: ['gateway', 'rest', 'lifecycle', 'ethereum', 'lifecycle', 'mongo'],
    },
    schema: {
      caption:
        'Every property carries its documents and an immutable chain of ownership records tied to wallet addresses and transaction hashes.',
      width: 900,
      height: 440,
      tables: [
        {
          id: 'properties',
          name: 'properties',
          store: 'MongoDB',
          x: 60,
          y: 60,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'owner_id', type: 'uuid', key: 'fk' },
            { name: 'title', type: 'string' },
            { name: 'price', type: 'number' },
            { name: 'status', type: 'enum' },
            { name: 'location', type: '2dsphere' },
            { name: 'token_id', type: 'string' },
            { name: 'created_at', type: 'date' },
          ],
        },
        {
          id: 'documents',
          name: 'documents',
          store: 'MongoDB',
          x: 420,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'property_id', type: 'objectId', key: 'fk' },
            { name: 'type', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'verified', type: 'bool' },
            { name: 'verified_at', type: 'date' },
          ],
        },
        {
          id: 'ownership_records',
          name: 'ownership_records',
          store: 'MongoDB',
          x: 420,
          y: 260,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'property_id', type: 'objectId', key: 'fk' },
            { name: 'wallet_address', type: 'string' },
            { name: 'tx_hash', type: 'string' },
            { name: 'block_number', type: 'number' },
            { name: 'created_at', type: 'date' },
          ],
        },
      ],
      relations: [
        { from: 'documents', fromField: 'property_id', to: 'properties', toField: '_id' },
        { from: 'ownership_records', fromField: 'property_id', to: 'properties', toField: '_id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* PropSpaceX — Media Service                                          */
  /* ------------------------------------------------------------------ */
  'propspacex-media-service': {
    flow: {
      request: 'POST /media/upload',
      caption:
        'Uploads stream in as multipart chunks, get optimized by Sharp (resize, WebP/AVIF), and the provider router places them on S3 or Cloudinary. Asset metadata and variants are tracked in MongoDB for responsive delivery.',
      nodes: [
        { id: 'callers', label: 'Gateway / Services', sub: 'Upload requests', col: 0, row: 1, kind: 'edge' },
        { id: 'upload', label: 'Upload API', sub: 'Multipart · chunked', col: 1, row: 0.4, kind: 'service' },
        { id: 'grpc', label: 'gRPC Server', sub: 'Asset lookups', col: 1, row: 1.6, kind: 'service' },
        { id: 'sharp', label: 'Sharp Optimizer', sub: 'Resize · WebP/AVIF', col: 2, row: 0.4, kind: 'service' },
        { id: 'router', label: 'Provider Router', sub: 'Storage abstraction', col: 2, row: 1.6, kind: 'service' },
        { id: 's3', label: 'AWS S3', sub: 'Primary storage', col: 3, row: 0, kind: 'external' },
        { id: 'cloudinary', label: 'Cloudinary', sub: 'CDN · transforms', col: 3, row: 1, kind: 'external' },
        { id: 'mongo', label: 'MongoDB', sub: 'Asset metadata', col: 3, row: 2.1, kind: 'data' },
      ],
      edges: [
        { from: 'callers', to: 'upload' },
        { from: 'callers', to: 'grpc', label: 'gRPC' },
        { from: 'upload', to: 'sharp' },
        { from: 'sharp', to: 'router', label: 'variants' },
        { from: 'router', to: 's3' },
        { from: 'router', to: 'cloudinary' },
        { from: 'router', to: 'mongo', label: 'metadata' },
        { from: 'grpc', to: 'mongo' },
      ],
      trace: ['callers', 'upload', 'sharp', 'router', 's3', 'router', 'mongo'],
    },
    schema: {
      caption:
        'One asset fans out into size variants per provider; upload sessions track chunked transfers until completion.',
      width: 880,
      height: 420,
      tables: [
        {
          id: 'assets',
          name: 'assets',
          store: 'MongoDB',
          x: 60,
          y: 60,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'original_name', type: 'string' },
            { name: 'mime_type', type: 'string' },
            { name: 'size', type: 'number' },
            { name: 'provider', type: 'enum' },
            { name: 'property_id', type: 'objectId', key: 'fk' },
            { name: 'created_at', type: 'date' },
          ],
        },
        {
          id: 'variants',
          name: 'variants',
          store: 'MongoDB',
          x: 420,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'asset_id', type: 'objectId', key: 'fk' },
            { name: 'label', type: 'enum' },
            { name: 'url', type: 'string' },
            { name: 'width', type: 'number' },
            { name: 'height', type: 'number' },
            { name: 'format', type: 'string' },
          ],
        },
        {
          id: 'upload_sessions',
          name: 'upload_sessions',
          store: 'MongoDB',
          x: 420,
          y: 270,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'asset_id', type: 'objectId', key: 'fk' },
            { name: 'status', type: 'enum' },
            { name: 'chunks_total', type: 'number' },
            { name: 'chunks_done', type: 'number' },
          ],
        },
      ],
      relations: [
        { from: 'variants', fromField: 'asset_id', to: 'assets', toField: '_id' },
        { from: 'upload_sessions', fromField: 'asset_id', to: 'assets', toField: '_id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* PropSpaceX — Mail Service                                           */
  /* ------------------------------------------------------------------ */
  'propspacex-mail-service': {
    flow: {
      request: 'gRPC sendMail(template, payload)',
      caption:
        'Services publish mail jobs over gRPC into RabbitMQ. Workers consume with exponential backoff, render templates, and deliver via Nodemailer/SMTP. Exhausted retries land in a dead-letter queue; every attempt is logged to MongoDB.',
      nodes: [
        { id: 'services', label: 'Internal Services', sub: 'Payment · User · Property', col: 0, row: 1, kind: 'edge' },
        { id: 'grpc', label: 'gRPC API', sub: 'Job intake', col: 1, row: 1, kind: 'service' },
        { id: 'rabbitmq', label: 'RabbitMQ', sub: 'Job queue', col: 2, row: 0.4, kind: 'queue' },
        { id: 'dlq', label: 'Dead Letter Queue', sub: 'Failed after retries', col: 2, row: 1.8, kind: 'queue' },
        { id: 'worker', label: 'Worker Pool', sub: 'Backoff · throttling', col: 3, row: 0.4, kind: 'service' },
        { id: 'template', label: 'Template Engine', sub: 'Localized rendering', col: 3, row: 1.8, kind: 'service' },
        { id: 'smtp', label: 'Nodemailer', sub: 'SMTP delivery', col: 4, row: 0.4, kind: 'external' },
        { id: 'mongo', label: 'MongoDB', sub: 'Delivery logs · TTL', col: 4, row: 1.8, kind: 'data' },
      ],
      edges: [
        { from: 'services', to: 'grpc' },
        { from: 'grpc', to: 'rabbitmq', label: 'publish' },
        { from: 'rabbitmq', to: 'worker', label: 'consume' },
        { from: 'rabbitmq', to: 'dlq', label: 'max retries', dashed: true },
        { from: 'worker', to: 'template', label: 'render' },
        { from: 'worker', to: 'smtp', label: 'send' },
        { from: 'worker', to: 'mongo', label: 'log', dashed: true },
      ],
      trace: ['services', 'grpc', 'rabbitmq', 'worker', 'template', 'worker', 'smtp'],
    },
    schema: {
      caption:
        'Jobs reference versioned templates; each delivery attempt is logged separately so bounces and retries stay auditable.',
      width: 880,
      height: 420,
      tables: [
        {
          id: 'templates',
          name: 'templates',
          store: 'MongoDB',
          x: 60,
          y: 60,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'name', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'locale', type: 'string' },
            { name: 'body_html', type: 'string' },
            { name: 'version', type: 'number' },
          ],
        },
        {
          id: 'email_jobs',
          name: 'email_jobs',
          store: 'MongoDB',
          x: 400,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'template_id', type: 'objectId', key: 'fk' },
            { name: 'recipient', type: 'string' },
            { name: 'payload', type: 'object' },
            { name: 'status', type: 'enum' },
            { name: 'attempts', type: 'number' },
            { name: 'next_retry_at', type: 'date' },
          ],
        },
        {
          id: 'delivery_logs',
          name: 'delivery_logs',
          store: 'MongoDB',
          x: 400,
          y: 280,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'job_id', type: 'objectId', key: 'fk' },
            { name: 'status', type: 'enum' },
            { name: 'provider_msg_id', type: 'string' },
            { name: 'attempted_at', type: 'date' },
          ],
        },
      ],
      relations: [
        { from: 'email_jobs', fromField: 'template_id', to: 'templates', toField: '_id' },
        { from: 'delivery_logs', fromField: 'job_id', to: 'email_jobs', toField: '_id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* PropSpaceX — Payment Service                                        */
  /* ------------------------------------------------------------------ */
  'propspacex-payment-service': {
    flow: {
      request: 'POST /payments/initiate',
      caption:
        'The provider router abstracts Stripe, Paystack, and Flutterwave behind one API. Confirmations come back asynchronously as signed webhooks, are processed idempotently, and settled events fan out through RabbitMQ. Daily reconciliation matches internal records against provider statements.',
      nodes: [
        { id: 'gateway', label: 'API Gateway', sub: 'Checkout flows', col: 0, row: 1, kind: 'edge' },
        { id: 'api', label: 'Payment API', sub: 'NestJS modules', col: 1, row: 1, kind: 'service' },
        { id: 'router', label: 'Provider Router', sub: 'Unified interface', col: 2, row: 0.4, kind: 'service' },
        { id: 'webhook', label: 'Webhook Handler', sub: 'Idempotent · signed', col: 2, row: 1.8, kind: 'service' },
        { id: 'recon', label: 'Reconciliation', sub: 'Daily matching', col: 2, row: 3, kind: 'service' },
        { id: 'providers', label: 'Stripe · Paystack', sub: '+ Flutterwave', col: 3, row: 0.4, kind: 'external' },
        { id: 'mongo', label: 'MongoDB', sub: 'Transactions', col: 3, row: 1.8, kind: 'data' },
        { id: 'rabbitmq', label: 'RabbitMQ', sub: 'payment.settled', col: 3, row: 3, kind: 'queue' },
      ],
      edges: [
        { from: 'gateway', to: 'api' },
        { from: 'api', to: 'router' },
        { from: 'api', to: 'mongo', label: 'pending txn' },
        { from: 'router', to: 'providers', label: 'charge' },
        { from: 'providers', to: 'webhook', label: 'webhook', dashed: true },
        { from: 'webhook', to: 'mongo', label: 'settle' },
        { from: 'webhook', to: 'rabbitmq', label: 'notify', dashed: true },
        { from: 'recon', to: 'providers', label: 'statements', dashed: true },
        { from: 'recon', to: 'mongo' },
      ],
      trace: ['gateway', 'api', 'router', 'providers', 'webhook', 'mongo'],
    },
    schema: {
      caption:
        'Provider-agnostic transaction log — webhook events and refunds hang off the transaction; reconciliation runs track daily matching per provider.',
      width: 920,
      height: 470,
      tables: [
        {
          id: 'transactions',
          name: 'transactions',
          store: 'MongoDB',
          x: 60,
          y: 60,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'reference', type: 'string' },
            { name: 'provider', type: 'enum' },
            { name: 'provider_ref', type: 'string' },
            { name: 'amount', type: 'decimal128' },
            { name: 'currency', type: 'string' },
            { name: 'status', type: 'enum' },
            { name: 'user_id', type: 'uuid' },
            { name: 'property_id', type: 'objectId' },
          ],
        },
        {
          id: 'webhook_events',
          name: 'webhook_events',
          store: 'MongoDB',
          x: 440,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'transaction_id', type: 'objectId', key: 'fk' },
            { name: 'provider', type: 'enum' },
            { name: 'event_type', type: 'string' },
            { name: 'signature_valid', type: 'bool' },
            { name: 'processed', type: 'bool' },
            { name: 'received_at', type: 'date' },
          ],
        },
        {
          id: 'refunds',
          name: 'refunds',
          store: 'MongoDB',
          x: 440,
          y: 290,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'transaction_id', type: 'objectId', key: 'fk' },
            { name: 'amount', type: 'decimal128' },
            { name: 'status', type: 'enum' },
            { name: 'created_at', type: 'date' },
          ],
        },
        {
          id: 'reconciliation_runs',
          name: 'reconciliation_runs',
          store: 'MongoDB',
          x: 720,
          y: 290,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'provider', type: 'enum' },
            { name: 'day', type: 'date' },
            { name: 'matched', type: 'number' },
            { name: 'mismatched', type: 'number' },
            { name: 'status', type: 'enum' },
          ],
        },
      ],
      relations: [
        { from: 'webhook_events', fromField: 'transaction_id', to: 'transactions', toField: '_id' },
        { from: 'refunds', fromField: 'transaction_id', to: 'transactions', toField: '_id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* OpenRDB Studio                                                      */
  /* ------------------------------------------------------------------ */
  'openrdb-studio': {
    flow: {
      request: 'invoke("run_query", sql)',
      caption:
        'The React UI (Monaco editor) talks to the Rust core through Tauri IPC commands. Connections are pooled by SQLx over Tokio for type-safe async execution against PostgreSQL, MySQL, or SQLite; credentials live in the OS keychain, never in app storage.',
      nodes: [
        { id: 'ui', label: 'React UI', sub: 'Monaco · results grid', col: 0, row: 0.6, kind: 'client' },
        { id: 'ipc', label: 'Tauri IPC', sub: 'Command bridge', col: 1, row: 0.6, kind: 'edge' },
        { id: 'core', label: 'Rust Core', sub: 'Connection manager', col: 2, row: 0.6, kind: 'service' },
        { id: 'keychain', label: 'OS Keychain', sub: 'Credential store', col: 2, row: 1.8, kind: 'external' },
        { id: 'pool', label: 'SQLx Pool', sub: 'Tokio · type-safe async', col: 3, row: 0.6, kind: 'service' },
        { id: 'postgres', label: 'PostgreSQL', col: 4, row: 0, kind: 'data' },
        { id: 'mysql', label: 'MySQL', col: 4, row: 0.9, kind: 'data' },
        { id: 'sqlite', label: 'SQLite', col: 4, row: 1.8, kind: 'data' },
      ],
      edges: [
        { from: 'ui', to: 'ipc', label: 'invoke' },
        { from: 'ipc', to: 'core' },
        { from: 'core', to: 'keychain', label: 'credentials', dashed: true },
        { from: 'core', to: 'pool' },
        { from: 'pool', to: 'postgres' },
        { from: 'pool', to: 'mysql' },
        { from: 'pool', to: 'sqlite' },
      ],
      trace: ['ui', 'ipc', 'core', 'pool', 'postgres', 'pool', 'core', 'ipc', 'ui'],
    },
  },

  /* ------------------------------------------------------------------ */
  /* MarketLens AI                                                       */
  /* ------------------------------------------------------------------ */
  marketlens: {
    flow: {
      request: 'GET /signals/AAPL/decision',
      caption:
        'Ingest workers normalize market feeds and real-world signals into PostgreSQL. The feature pipeline builds training windows for the Random Forest + LightGBM ensemble. At request time, FastAPI pulls recent data, runs inference, and returns a scored decision.',
      nodes: [
        { id: 'feeds', label: 'Market Feeds', sub: 'Prices · fundamentals', col: 0, row: 0, kind: 'external' },
        { id: 'news', label: 'Signal Sources', sub: 'News · real-world events', col: 0, row: 1, kind: 'external' },
        { id: 'client', label: 'Client', sub: 'Dashboard', col: 0, row: 2.4, kind: 'client' },
        { id: 'ingest', label: 'Ingest Workers', sub: 'Normalize · dedupe', col: 1, row: 0.5, kind: 'service' },
        { id: 'api', label: 'FastAPI', sub: 'Decision endpoints', col: 1, row: 2.4, kind: 'service' },
        { id: 'postgres', label: 'PostgreSQL', sub: 'Market · signal store', col: 2, row: 1.3, kind: 'data' },
        { id: 'pipeline', label: 'Feature Pipeline', sub: 'Windows · indicators', col: 3, row: 0.5, kind: 'service' },
        { id: 'ensemble', label: 'Model Ensemble', sub: 'Random Forest · LightGBM', col: 4, row: 1.3, kind: 'service' },
      ],
      edges: [
        { from: 'feeds', to: 'ingest' },
        { from: 'news', to: 'ingest' },
        { from: 'ingest', to: 'postgres', label: 'store' },
        { from: 'postgres', to: 'pipeline', label: 'training data' },
        { from: 'pipeline', to: 'ensemble', label: 'train' },
        { from: 'client', to: 'api' },
        { from: 'api', to: 'postgres', label: 'recent data' },
        { from: 'api', to: 'ensemble', label: 'infer', dashed: true },
      ],
      trace: ['client', 'api', 'postgres', 'pipeline', 'ensemble', 'api', 'client'],
    },
    schema: {
      caption:
        'Time-series market data and external signals key off instruments; predictions link back to both the instrument and the exact model version that produced them.',
      width: 940,
      height: 500,
      tables: [
        {
          id: 'instruments',
          name: 'instruments',
          store: 'PostgreSQL',
          x: 60,
          y: 160,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'symbol', type: 'varchar' },
            { name: 'exchange', type: 'varchar' },
            { name: 'sector', type: 'varchar' },
            { name: 'created_at', type: 'timestamp' },
          ],
        },
        {
          id: 'market_data',
          name: 'market_data',
          store: 'PostgreSQL',
          x: 400,
          y: 30,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'instrument_id', type: 'uuid', key: 'fk' },
            { name: 'ts', type: 'timestamp' },
            { name: 'open', type: 'numeric' },
            { name: 'close', type: 'numeric' },
            { name: 'volume', type: 'bigint' },
          ],
        },
        {
          id: 'signals',
          name: 'signals',
          store: 'PostgreSQL',
          x: 400,
          y: 250,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'instrument_id', type: 'uuid', key: 'fk' },
            { name: 'source', type: 'varchar' },
            { name: 'kind', type: 'varchar' },
            { name: 'weight', type: 'float' },
            { name: 'observed_at', type: 'timestamp' },
          ],
        },
        {
          id: 'predictions',
          name: 'predictions',
          store: 'PostgreSQL',
          x: 720,
          y: 140,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'instrument_id', type: 'uuid', key: 'fk' },
            { name: 'model_version_id', type: 'uuid', key: 'fk' },
            { name: 'horizon', type: 'interval' },
            { name: 'direction', type: 'enum' },
            { name: 'confidence', type: 'float' },
          ],
        },
        {
          id: 'model_versions',
          name: 'model_versions',
          store: 'PostgreSQL',
          x: 720,
          y: 360,
          fields: [
            { name: 'id', type: 'uuid', key: 'pk' },
            { name: 'algo', type: 'enum' },
            { name: 'version', type: 'varchar' },
            { name: 'trained_at', type: 'timestamp' },
            { name: 'metrics', type: 'jsonb' },
          ],
        },
      ],
      relations: [
        { from: 'market_data', fromField: 'instrument_id', to: 'instruments', toField: 'id' },
        { from: 'signals', fromField: 'instrument_id', to: 'instruments', toField: 'id' },
        { from: 'predictions', fromField: 'instrument_id', to: 'instruments', toField: 'id' },
        { from: 'predictions', fromField: 'model_version_id', to: 'model_versions', toField: 'id' },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* EchoLoc                                                             */
  /* ------------------------------------------------------------------ */
  echoloc: {
    flow: {
      request: 'WS session.start(group, ttl)',
      caption:
        'The Expo app authenticates and manages groups over REST, then streams location pings through a Socket.IO channel while a session is live. The session manager enforces the time window — when the timer expires or the user stops, sharing ends and the channel closes for that member.',
      nodes: [
        { id: 'app', label: 'Expo App', sub: 'React Native', col: 0, row: 1.1, kind: 'client' },
        { id: 'rest', label: 'Echo_API REST', sub: 'Auth · groups · invites', col: 1, row: 0.4, kind: 'service' },
        { id: 'socket', label: 'Socket.IO Gateway', sub: 'Pings · chat fanout', col: 1, row: 1.8, kind: 'service' },
        { id: 'oauth', label: 'Google · Apple', sub: 'OAuth verify', col: 2, row: 0, kind: 'external' },
        { id: 'session', label: 'Session Manager', sub: 'TTL timers · auto-expiry', col: 2, row: 1.1, kind: 'service' },
        { id: 'mongo', label: 'MongoDB', sub: 'Groups · sessions · pings', col: 3, row: 1.1, kind: 'data' },
      ],
      edges: [
        { from: 'app', to: 'rest', label: 'auth · groups' },
        { from: 'app', to: 'socket', label: 'location pings' },
        { from: 'rest', to: 'oauth', label: 'verify', dashed: true },
        { from: 'rest', to: 'mongo' },
        { from: 'socket', to: 'session', label: 'register' },
        { from: 'session', to: 'mongo' },
        { from: 'session', to: 'socket', label: 'expiry → end', dashed: true },
        { from: 'socket', to: 'app', label: 'broadcast', dashed: true },
      ],
      trace: ['app', 'socket', 'session', 'mongo', 'session', 'socket', 'app'],
    },
    schema: {
      caption:
        'Sharing is modeled as expiring sessions, not user state — pings hang off a session, so when it ends the location trail stops with it.',
      width: 960,
      height: 540,
      tables: [
        {
          id: 'users',
          name: 'users',
          store: 'MongoDB',
          x: 40,
          y: 60,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'email', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'provider', type: 'enum' },
            { name: 'avatar_url', type: 'string' },
          ],
        },
        {
          id: 'groups',
          name: 'groups',
          store: 'MongoDB',
          x: 360,
          y: 40,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'name', type: 'string' },
            { name: 'owner_id', type: 'objectId', key: 'fk' },
            { name: 'invite_code', type: 'string' },
            { name: 'created_at', type: 'date' },
          ],
        },
        {
          id: 'group_members',
          name: 'group_members',
          store: 'MongoDB',
          x: 40,
          y: 320,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'group_id', type: 'objectId', key: 'fk' },
            { name: 'user_id', type: 'objectId', key: 'fk' },
            { name: 'role', type: 'enum' },
            { name: 'joined_at', type: 'date' },
          ],
        },
        {
          id: 'sessions',
          name: 'sessions',
          store: 'MongoDB',
          x: 660,
          y: 60,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'group_id', type: 'objectId', key: 'fk' },
            { name: 'user_id', type: 'objectId', key: 'fk' },
            { name: 'started_at', type: 'date' },
            { name: 'expires_at', type: 'date' },
            { name: 'status', type: 'enum' },
          ],
        },
        {
          id: 'location_pings',
          name: 'location_pings',
          store: 'MongoDB',
          x: 660,
          y: 330,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'session_id', type: 'objectId', key: 'fk' },
            { name: 'lat', type: 'double' },
            { name: 'lng', type: 'double' },
            { name: 'ts', type: 'date' },
          ],
        },
        {
          id: 'messages',
          name: 'messages',
          store: 'MongoDB',
          x: 360,
          y: 330,
          fields: [
            { name: '_id', type: 'objectId', key: 'pk' },
            { name: 'group_id', type: 'objectId', key: 'fk' },
            { name: 'sender_id', type: 'objectId', key: 'fk' },
            { name: 'body', type: 'string' },
            { name: 'sent_at', type: 'date' },
          ],
        },
      ],
      relations: [
        { from: 'groups', fromField: 'owner_id', to: 'users', toField: '_id' },
        { from: 'group_members', fromField: 'group_id', to: 'groups', toField: '_id' },
        { from: 'group_members', fromField: 'user_id', to: 'users', toField: '_id' },
        { from: 'sessions', fromField: 'group_id', to: 'groups', toField: '_id' },
        { from: 'location_pings', fromField: 'session_id', to: 'sessions', toField: '_id' },
        { from: 'messages', fromField: 'group_id', to: 'groups', toField: '_id' },
        { from: 'messages', fromField: 'sender_id', to: 'users', toField: '_id' },
      ],
    },
  },
};

// marketlense is a legacy alias slug
systemDesigns.marketlense = systemDesigns.marketlens;

export const defaultDesign: SystemDesign = {
  flow: {
    request: 'GET /v1/resource',
    caption:
      'Standard three-tier layout — requests pass through the API layer into business logic, with persistence behind it.',
    nodes: [
      { id: 'client', label: 'Client', col: 0, row: 0.5, kind: 'client' },
      { id: 'api', label: 'API Layer', sub: 'REST endpoints', col: 1, row: 0.5, kind: 'service' },
      { id: 'service', label: 'Service Layer', sub: 'Business logic', col: 2, row: 0.5, kind: 'service' },
      { id: 'db', label: 'Database', sub: 'Persistence', col: 3, row: 0.5, kind: 'data' },
    ],
    edges: [
      { from: 'client', to: 'api' },
      { from: 'api', to: 'service' },
      { from: 'service', to: 'db' },
    ],
    trace: ['client', 'api', 'service', 'db'],
  },
};

export function getSystemDesign(slug: string): SystemDesign {
  return systemDesigns[slug] ?? defaultDesign;
}
