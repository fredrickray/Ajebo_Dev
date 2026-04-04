'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Project data for all projects - keyed by slug
const projectsData: Record<string, {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  docsUrl?: string;
  sections: string[];
  architecture: {
    description: string;
    nodes: { name: string; description?: string }[];
  };
  challenges: { title: string; description: string }[];
  databaseDesign?: {
    title: string;
    code: string;
    description: string;
  };
  tradeoffs: { tech: string; alternative: string; reason: string }[];
}> = {
  'openrdb-studio': {
    id: 1,
    slug: 'openrdb-studio',
    title: 'OpenRDB Studio',
    subtitle: 'A free, open-source, cross-platform GUI for relational databases, designed to provide a modern, intuitive, and unrestricted developer experience',
    description: 'A high-performance machine learning system for database query optimization. Built to analyze SQL patterns and suggest optimizations using Random Forest and LightGBM models.',
    tags: ['Rust', 'Tauri', 'React', 'Typescript', 'SQLx'],
    githubUrl: 'https://github.com/fredrickray/openrdb-studio',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'The architecture leverages a microservices pattern using FastAPI for the REST API, with dedicated services for feature extraction, model inference, and optimization suggestions.',
      nodes: [
        { name: 'React Frontend', description: 'React + TypeScript' },
        { name: 'Rust Backend', description: 'Rust + SQLx' },
        { name: 'Tauri', description: 'Cross-platform desktop application' },
        { name: 'SQLx', description: 'Async SQL toolkit with PostgreSQL support' },
        { name: 'Tokio', description: 'Async runtime for Rust' },
        { name: 'Monaco Editor', description: "Code/SQL editor (VS Code's editor)" },
      ],
    },
    challenges: [
      { title: 'Model Training Pipeline', description: 'Designed an efficient training pipeline that processes SQL query patterns from production databases while ensuring data privacy and security compliance.' },
      { title: 'Low-Latency Inference', description: 'Optimized model inference to achieve <50ms prediction times by implementing model quantization and caching frequently accessed patterns.' },
      { title: 'Feature Engineering', description: 'Developed robust SQL parsing to extract meaningful features from diverse query patterns across different database schemas.' },
      { title: 'Accuracy vs Speed', description: 'Balanced model complexity with inference speed requirements, using ensemble methods for accuracy while maintaining performance.' },
    ],
    databaseDesign: {
      title: 'Query Analytics Schema',
      code: `CREATE TABLE queries (
  id UUID PRIMARY KEY,
  sql_hash VARCHAR(64) UNIQUE,
  execution_time_ms INTEGER,
  optimization_applied BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  query_id UUID REFERENCES queries(id),
  predicted_improvement FLOAT,
  confidence_score FLOAT,
  model_version VARCHAR(20)
);

CREATE INDEX idx_queries_hash ON queries(sql_hash);`,
      description: 'Schema designed for efficient query pattern storage and prediction tracking.',
    },
    tradeoffs: [
      { tech: 'PostgreSQL', alternative: 'MongoDB', reason: 'Required strong relational integrity for query-prediction mappings and analytics aggregations.' },
      { tech: 'FastAPI', alternative: 'Flask', reason: 'Async support and automatic OpenAPI documentation essential for ML API endpoints.' },
      { tech: 'LightGBM', alternative: 'XGBoost', reason: 'Faster training times with comparable accuracy, important for frequent model retraining.' },
      { tech: 'Redis', alternative: 'Memcached', reason: 'Data structure support for caching complex prediction results and feature vectors.' },
    ],
  },
  'marketlense': {
    id: 2,
    slug: 'marketlense',
    title: 'MarketLense',
    subtitle: 'An AI-powered stock decision support system based on market trends and real-world signals.',
    description: 'An AI-powered stock decision support system based on market trends and real-world signals.',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    githubUrl: 'https://github.com/fredrickray/marketlense',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'MarketLense is a machine learning system that analyzes stock market trends and real-world signals to provide data-driven investment insights. It uses a combination of machine learning models and real-time data to generate predictions and recommendations.',
      nodes: [
        { name: 'React Frontend', description: 'React + TypeScript' },
        { name: 'FastAPI Backend', description: 'FastAPI + Python' },
        { name: 'PostgreSQL', description: 'PostgreSQL' },
        { name: 'LightGBM', description: "LightGBM" },
        { name: 'Random Forest', description: "Random Forest" },
      ],
    },
    challenges: [
      { title: 'Real-time Data Integration', description: 'Integrated real-time stock market data from multiple sources to provide up-to-date market trends and signals.' },
      { title: 'Model Training Pipeline', description: 'Designed an efficient training pipeline that processes SQL query patterns from production databases while ensuring data privacy and security compliance.' },
      { title: 'Low-Latency Inference', description: 'Optimized model inference to achieve <50ms prediction times by implementing model quantization and caching frequently accessed patterns.' },
      { title: 'Accuracy vs Speed', description: 'Balanced model complexity with inference speed requirements, using ensemble methods for accuracy while maintaining performance.' },
    ],
    databaseDesign: {
      title: 'Query Analytics Schema',
      code: `CREATE TABLE queries (
  id UUID PRIMARY KEY,
  sql_hash VARCHAR(64) UNIQUE,
  execution_time_ms INTEGER,
  optimization_applied BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  query_id UUID REFERENCES queries(id),
  predicted_improvement FLOAT,
  confidence_score FLOAT,
  model_version VARCHAR(20)
);

CREATE INDEX idx_queries_hash ON queries(sql_hash);`,
      description: 'Schema designed for efficient query pattern storage and prediction tracking.',
    },
    tradeoffs: [
      { tech: 'PostgreSQL', alternative: 'MongoDB', reason: 'Required strong relational integrity for query-prediction mappings and analytics aggregations.' },
      { tech: 'FastAPI', alternative: 'Flask', reason: 'Async support and automatic OpenAPI documentation essential for ML API endpoints.' },
      { tech: 'LightGBM', alternative: 'XGBoost', reason: 'Faster training times with comparable accuracy, important for frequent model retraining.' },
      { tech: 'Redis', alternative: 'Memcached', reason: 'Data structure support for caching complex prediction results and feature vectors.' },
    ],
  },
  'neuroqo': {
    id: 3,
    slug: 'neuroqo',
    title: 'NeuroQO',
    subtitle: 'ML-Powered Query Optimization Engine',
    description: 'A high-performance machine learning system for database query optimization. Built to analyze SQL patterns and suggest optimizations using Random Forest and LightGBM models.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'scikit-learn', 'LightGBM'],
    githubUrl: 'https://github.com/fredrickray/neuroqo',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'NeuroQO is a machine learning system that analyzes SQL query patterns and suggests optimizations using Random Forest and LightGBM models. It uses a combination of machine learning models and real-time data to generate predictions and recommendations.',
      nodes: [
        { name: 'FastAPI REST endpoints', description: 'FastAPI REST endpoints' },
        { name: 'Feature Extractor', description: 'SQL parsing & analysis' },
        { name: 'ML Engine', description: 'Model inference' },
        { name: 'Optimization Service', description: 'Query suggestions' },
        { name: 'PostgreSQL', description: 'Data persistence' },
        { name: 'Redis Cache', description: 'Result caching' },
      ],
    },
    challenges: [
      { title: 'Model Training Pipeline', description: 'Designed an efficient training pipeline that processes SQL query patterns from production databases while ensuring data privacy and security compliance.' },
      { title: 'Low-Latency Inference', description: 'Optimized model inference to achieve <50ms prediction times by implementing model quantization and caching frequently accessed patterns.' },
      { title: 'Feature Engineering', description: 'Developed robust SQL parsing to extract meaningful features from diverse query patterns across different database schemas.' },
      { title: 'Accuracy vs Speed', description: 'Balanced model complexity with inference speed requirements, using ensemble methods for accuracy while maintaining performance.' },
    ],
    databaseDesign: {
      title: 'Query Analytics Schema',
      code: `CREATE TABLE queries (
  id UUID PRIMARY KEY,
  sql_hash VARCHAR(64) UNIQUE,
  execution_time_ms INTEGER,
  optimization_applied BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  query_id UUID REFERENCES queries(id),
  predicted_improvement FLOAT,
  confidence_score FLOAT,
  model_version VARCHAR(20)
);

CREATE INDEX idx_queries_hash ON queries(sql_hash);`,
      description: 'Schema designed for efficient query pattern storage and prediction tracking.',
    },
    tradeoffs: [
      { tech: 'PostgreSQL', alternative: 'MongoDB', reason: 'Required strong relational integrity for query-prediction mappings and analytics aggregations.' },
      { tech: 'FastAPI', alternative: 'Flask', reason: 'Async support and automatic OpenAPI documentation essential for ML API endpoints.' },
      { tech: 'LightGBM', alternative: 'XGBoost', reason: 'Faster training times with comparable accuracy, important for frequent model retraining.' },
      { tech: 'Redis', alternative: 'Memcached', reason: 'Data structure support for caching complex prediction results and feature vectors.' },
    ],
  },
  'n-civisense': {
    id: 4,
    slug: 'n-civisense',
    title: 'N-Civisense',
    subtitle: 'Civic Intelligence Platform',
    description: 'Machine learning platform for civic data analysis and prediction. Handles large-scale data processing for municipal insights and decision-making support.',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    githubUrl: 'https://github.com/fredrickray/n-civisense',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'Distributed data processing architecture with ML pipelines for analyzing civic data patterns and generating actionable insights.',
      nodes: [
        { name: 'Data Ingestion', description: 'API & file imports' },
        { name: 'ETL Pipeline', description: 'Data transformation' },
        { name: 'ML Pipeline', description: 'Model training & inference' },
        { name: 'Analytics Engine', description: 'Reporting & insights' },
        { name: 'PostgreSQL', description: 'Data warehouse' },
        { name: 'Dashboard', description: 'Visualization layer' },
      ],
    },
    challenges: [
      { title: 'Data Quality', description: 'Implemented robust data validation and cleaning pipelines to handle inconsistent civic data from multiple sources.' },
      { title: 'Scalable Processing', description: 'Designed batch processing system to handle millions of records efficiently using distributed computing.' },
      { title: 'Model Interpretability', description: 'Ensured ML predictions are explainable for civic decision-makers with feature importance visualization.' },
      { title: 'Real-time Updates', description: 'Built incremental update system to refresh predictions without full model retraining.' },
    ],
    databaseDesign: {
      title: 'Civic Data Schema',
      code: `CREATE TABLE civic_records (
  id UUID PRIMARY KEY,
  category VARCHAR(50),
  location_data JSONB,
  metrics JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  record_id UUID REFERENCES civic_records(id),
  prediction_type VARCHAR(50),
  confidence FLOAT,
  result JSONB
);

CREATE INDEX idx_records_category ON civic_records(category);`,
      description: 'Flexible schema supporting various civic data types with JSONB for extensibility.',
    },
    tradeoffs: [
      { tech: 'PostgreSQL + JSONB', alternative: 'MongoDB', reason: 'Best of both worlds: relational queries with flexible document storage.' },
      { tech: 'Random Forest', alternative: 'Neural Networks', reason: 'Interpretability crucial for civic decisions; tree-based models provide clear feature importance.' },
      { tech: 'Batch Processing', alternative: 'Stream Processing', reason: 'Civic data doesn\'t require real-time; batch is more cost-effective.' },
    ],
  },
  'propspacex-gateway': {
    id: 5,
    slug: 'propspacex-gateway',
    title: 'PropSpaceX API Gateway',
    subtitle: 'High-Performance Microservices Gateway',
    description: 'A centralized API gateway for the PropSpaceX real estate platform, handling authentication, rate limiting, and request routing to multiple backend microservices.',
    tags: ['Node.js', 'TypeScript', 'Express', 'gRPC', 'Redis', 'PostgreSQL'],
    githubUrl: 'https://github.com/fredrickray/propspacex-gateway',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'The gateway uses a layered architecture with middleware for auth, rate limiting, and logging, routing requests via gRPC to internal services.',
      nodes: [
        { name: 'Load Balancer', description: 'Nginx reverse proxy' },
        { name: 'API Gateway', description: 'Express + middleware' },
        { name: 'Auth Service', description: 'JWT verification' },
        { name: 'Property Service', description: 'Real estate CRUD' },
        { name: 'Media Service', description: 'Asset management' },
        { name: 'Payment Service', description: 'Transaction processing' },
      ],
    },
    challenges: [
      { title: 'High Availability', description: 'Implemented circuit breaker patterns and health checks to ensure 99.9% uptime even when downstream services experience issues.' },
      { title: 'Rate Limiting', description: 'Designed a distributed rate limiting system using Redis with sliding window algorithm to handle burst traffic fairly.' },
      { title: 'Service Discovery', description: 'Built dynamic service registry allowing seamless addition of new microservices without gateway redeployment.' },
      { title: 'Request Tracing', description: 'Implemented distributed tracing with correlation IDs for end-to-end request visibility across all services.' },
    ],
    databaseDesign: {
      title: 'API Key & Rate Limit Schema',
      code: `CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  key_hash VARCHAR(64) UNIQUE,
  user_id UUID REFERENCES users(id),
  rate_limit INTEGER DEFAULT 1000,
  tier VARCHAR(20) DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rate_limits (
  key_id UUID REFERENCES api_keys(id),
  window_start TIMESTAMP,
  request_count INTEGER,
  PRIMARY KEY (key_id, window_start)
);`,
      description: 'Schema optimized for fast API key validation and rate limit checking.',
    },
    tradeoffs: [
      { tech: 'gRPC', alternative: 'REST', reason: 'Binary protocol provides 10x faster inter-service communication compared to JSON-based REST.' },
      { tech: 'Redis', alternative: 'In-Memory', reason: 'Distributed rate limiting requires shared state across multiple gateway instances.' },
      { tech: 'Express', alternative: 'Fastify', reason: 'Larger ecosystem and middleware compatibility, team familiarity reduced development time.' },
    ],
  },
  'propspacex-user-service': {
    id: 6,
    slug: 'propspacex-user-service',
    title: 'PropSpaceX User Service',
    subtitle: 'Authentication & User Management Microservice',
    description: 'A secure TypeScript microservice handling user authentication, device trust verification, and activity monitoring via REST and gRPC.',
    tags: ['Node.js', 'TypeScript', 'JWT', 'PostgreSQL', 'GeoIP', 'gRPC', 'Docker'],
    githubUrl: 'https://github.com/fredrickray/propspacex-user-service',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'Secure user management service with multi-layer authentication, device fingerprinting, and audit logging.',
      nodes: [
        { name: 'REST API', description: 'External endpoints' },
        { name: 'gRPC Server', description: 'Internal service calls' },
        { name: 'Auth Engine', description: 'JWT & session mgmt' },
        { name: 'Device Trust', description: 'Fingerprint verification' },
        { name: 'GeoIP Service', description: 'Location validation' },
        { name: 'PostgreSQL', description: 'User data store' },
      ],
    },
    challenges: [
      { title: 'Secure Authentication', description: 'Implemented JWT with refresh token rotation and device binding to prevent token theft and replay attacks.' },
      { title: 'Device Trust', description: 'Built device fingerprinting system to detect suspicious login attempts from unknown devices.' },
      { title: 'GeoIP Validation', description: 'Integrated MaxMind GeoIP for location-based security alerts and impossible travel detection.' },
      { title: 'Audit Logging', description: 'Comprehensive audit trail for all authentication events with tamper-proof storage.' },
    ],
    databaseDesign: {
      title: 'User & Device Schema',
      code: `CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  mfa_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE devices (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  fingerprint VARCHAR(64),
  last_ip INET,
  trusted BOOLEAN DEFAULT FALSE
);`,
      description: 'Secure user schema with device tracking for multi-device authentication.',
    },
    tradeoffs: [
      { tech: 'JWT + Refresh Tokens', alternative: 'Session-based', reason: 'Stateless auth enables horizontal scaling without session store synchronization.' },
      { tech: 'PostgreSQL', alternative: 'MongoDB', reason: 'ACID compliance essential for user data integrity and audit requirements.' },
      { tech: 'Device Fingerprinting', alternative: 'IP-only', reason: 'More reliable device identification than IP addresses which can change.' },
    ],
  },
  'propspacex-property-service': {
    id: 7,
    slug: 'propspacex-property-service',
    title: 'PropSpaceX Property Service',
    subtitle: 'Real Estate Management Microservice',
    description: 'A high-performance Node.js/TypeScript microservice for real estate management, featuring geospatial search via MongoDB and blockchain integration for property tokenization.',
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'Mongoose', 'gRPC', 'Docker'],
    githubUrl: 'https://github.com/fredrickray/propspacex-property-service',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'Property management service with geospatial capabilities, document verification, and blockchain integration.',
      nodes: [
        { name: 'REST API', description: 'Property CRUD' },
        { name: 'gRPC Server', description: 'Internal queries' },
        { name: 'Geo Engine', description: 'Spatial search & indexing' },
        { name: 'Document Verifier', description: 'Legal doc validation' },
        { name: 'MongoDB', description: 'Property data store' },
        { name: 'Blockchain', description: 'Tokenization layer' },
      ],
    },
    challenges: [
      { title: 'Geospatial Search', description: 'Implemented MongoDB 2dsphere indexes for efficient radius and polygon-based property searches.' },
      { title: 'Document Verification', description: 'Built OCR and validation pipeline for property legal documents with fraud detection.' },
      { title: 'Property Lifecycle', description: 'Complex state machine managing property status from listing to sale completion.' },
      { title: 'Blockchain Integration', description: 'Smart contract integration for property tokenization and fractional ownership.' },
    ],
    databaseDesign: {
      title: 'Property Schema',
      code: `// MongoDB Schema
{
  _id: ObjectId,
  title: String,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  price: Number,
  status: "listed" | "pending" | "sold",
  documents: [{ type: String, verified: Boolean }],
  tokenized: Boolean
}

// Geospatial Index
db.properties.createIndex({ location: "2dsphere" });`,
      description: 'Document-based schema optimized for flexible property attributes and geospatial queries.',
    },
    tradeoffs: [
      { tech: 'MongoDB', alternative: 'PostgreSQL/PostGIS', reason: 'Flexible schema better suits varied property attributes; native 2dsphere performance.' },
      { tech: 'gRPC', alternative: 'REST', reason: 'Efficient streaming for bulk property data sync between services.' },
      { tech: 'Blockchain', alternative: 'Traditional DB', reason: 'Immutable ownership records required for tokenized real estate compliance.' },
    ],
  },
  'propspacex-media-service': {
    id: 8,
    slug: 'propspacex-media-service',
    title: 'PropSpaceX Media Service',
    subtitle: 'Multi-Provider Media Management',
    description: 'A centralized Node.js/TypeScript service enabling secure, multi-provider media management. Features automatic image optimization via Sharp and abstraction of storage providers.',
    tags: ['Node.js', 'TypeScript', 'AWS S3', 'Cloudinary', 'Sharp', 'MongoDB', 'gRPC'],
    githubUrl: 'https://github.com/fredrickray/propspacex-media-service',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'Media service with provider abstraction, automatic optimization, and CDN delivery.',
      nodes: [
        { name: 'Upload API', description: 'Multipart handling' },
        { name: 'Optimizer', description: 'Sharp image processing' },
        { name: 'Provider Router', description: 'S3/Cloudinary abstraction' },
        { name: 'AWS S3', description: 'Primary storage' },
        { name: 'Cloudinary', description: 'CDN & transforms' },
        { name: 'MongoDB', description: 'Asset metadata' },
      ],
    },
    challenges: [
      { title: 'Image Optimization', description: 'Automatic resizing, format conversion (WebP/AVIF), and quality optimization reducing bandwidth by 60%.' },
      { title: 'Provider Abstraction', description: 'Unified API supporting AWS S3 and Cloudinary with seamless provider switching.' },
      { title: 'Large File Handling', description: 'Chunked upload and streaming processing for videos and high-resolution images.' },
      { title: 'CDN Integration', description: 'Automatic CDN cache invalidation and signed URL generation for protected assets.' },
    ],
    databaseDesign: {
      title: 'Media Asset Schema',
      code: `// MongoDB Schema
{
  _id: ObjectId,
  originalName: String,
  mimeType: String,
  size: Number,
  provider: "s3" | "cloudinary",
  variants: [{
    size: "thumb" | "medium" | "large",
    url: String,
    width: Number,
    height: Number
  }],
  propertyId: ObjectId
}`,
      description: 'Asset metadata with variant tracking for responsive image delivery.',
    },
    tradeoffs: [
      { tech: 'Sharp', alternative: 'ImageMagick', reason: 'Node.js native bindings with better performance and memory efficiency.' },
      { tech: 'Multi-provider', alternative: 'Single provider', reason: 'Vendor flexibility and cost optimization across different use cases.' },
      { tech: 'MongoDB', alternative: 'PostgreSQL', reason: 'Flexible variant storage and natural fit with property service.' },
    ],
  },
  'propspacex-mail-service': {
    id: 9,
    slug: 'propspacex-mail-service',
    title: 'PropSpaceX Mail Service',
    subtitle: 'Reliable Notification Microservice',
    description: 'A high-performance notification microservice utilizing RabbitMQ for asynchronous job processing, gRPC for low-latency communication, and Nodemailer for transactional email delivery.',
    tags: ['Node.js', 'Express', 'MongoDB', 'RabbitMQ', 'gRPC', 'Nodemailer', 'Docker'],
    githubUrl: 'https://github.com/fredrickray/propspacex-mail-service',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'Reliable notification service with queue-based processing, retry mechanisms, and multi-channel delivery.',
      nodes: [
        { name: 'gRPC API', description: 'Internal trigger points' },
        { name: 'RabbitMQ', description: 'Job queue' },
        { name: 'Worker Pool', description: 'Async processors' },
        { name: 'Template Engine', description: 'Email rendering' },
        { name: 'Nodemailer', description: 'SMTP delivery' },
        { name: 'MongoDB', description: 'Delivery logs' },
      ],
    },
    challenges: [
      { title: 'Reliable Delivery', description: 'Exponential backoff retries with Dead Letter Queues ensuring no email is lost.' },
      { title: 'Template Management', description: 'Dynamic email templates with localization and A/B testing support.' },
      { title: 'Rate Limiting', description: 'SMTP provider rate limit compliance with intelligent queue throttling.' },
      { title: 'Bounce Handling', description: 'Webhook processing for bounces and complaints to maintain sender reputation.' },
    ],
    databaseDesign: {
      title: 'Email Log Schema',
      code: `// MongoDB Schema
{
  _id: ObjectId,
  recipient: String,
  template: String,
  status: "queued" | "sent" | "delivered" | "bounced",
  attempts: Number,
  lastAttempt: Date,
  messageId: String,
  metadata: Object
}

// TTL Index for cleanup
db.emails.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 });`,
      description: 'Email tracking with automatic cleanup of old records.',
    },
    tradeoffs: [
      { tech: 'RabbitMQ', alternative: 'Redis Queue', reason: 'Guaranteed delivery and DLQ support critical for transactional emails.' },
      { tech: 'gRPC', alternative: 'REST', reason: 'Low-latency internal calls; emails triggered synchronously from user actions.' },
      { tech: 'Nodemailer', alternative: 'SendGrid SDK', reason: 'Provider flexibility; can switch SMTP providers without code changes.' },
    ],
  },
  'propspacex-payment-service': {
    id: 10,
    slug: 'propspacex-payment-service',
    title: 'PropSpaceX Payment Service',
    subtitle: 'Multi-Provider Payment Processing',
    description: 'Payment processing service integrating Stripe, Paystack, and Flutterwave with webhook handling and reconciliation.',
    tags: ['NestJS', 'TypeScript', 'MongoDB', 'Webhooks', 'Stripe', 'Paystack', 'Flutterwave'],
    githubUrl: 'https://github.com/fredrickray/propspacex-payment-service',
    sections: ['System Architecture', 'Engineering Challenges', 'Database Design', 'Trade-offs & Decisions'],
    architecture: {
      description: 'Payment gateway with multi-provider support, webhook processing, and financial reconciliation.',
      nodes: [
        { name: 'Payment API', description: 'Transaction initiation' },
        { name: 'Provider Router', description: 'Stripe/Paystack/Flutterwave' },
        { name: 'Webhook Handler', description: 'Async confirmations' },
        { name: 'Reconciliation', description: 'Financial matching' },
        { name: 'MongoDB', description: 'Transaction logs' },
        { name: 'Notification', description: 'Payment alerts' },
      ],
    },
    challenges: [
      { title: 'Multi-Provider Integration', description: 'Unified payment API abstracting differences between Stripe, Paystack, and Flutterwave.' },
      { title: 'Webhook Reliability', description: 'Idempotent webhook processing with signature verification and replay protection.' },
      { title: 'Reconciliation', description: 'Automated daily reconciliation between internal records and provider dashboards.' },
      { title: 'Currency Handling', description: 'Multi-currency support with real-time exchange rates and proper decimal handling.' },
    ],
    databaseDesign: {
      title: 'Transaction Schema',
      code: `// MongoDB Schema
{
  _id: ObjectId,
  reference: String,  // Unique transaction ref
  provider: "stripe" | "paystack" | "flutterwave",
  providerRef: String,
  amount: Decimal128,
  currency: String,
  status: "pending" | "success" | "failed" | "refunded",
  metadata: {
    propertyId: ObjectId,
    userId: ObjectId,
    type: "purchase" | "deposit" | "subscription"
  }
}`,
      description: 'Transaction logging with provider-agnostic schema for unified reporting.',
    },
    tradeoffs: [
      { tech: 'NestJS', alternative: 'Express', reason: 'Dependency injection and modular architecture ideal for complex payment logic.' },
      { tech: 'MongoDB', alternative: 'PostgreSQL', reason: 'Flexible schema for varied provider response formats; easier horizontal scaling.' },
      { tech: 'Multi-provider', alternative: 'Single provider', reason: 'Regional coverage (Stripe for international, Paystack/Flutterwave for Africa).' },
    ],
  },
};

// Default project template for unknown slugs
const defaultProject = {
  id: 0,
  slug: 'unknown',
  title: 'Project Details',
  subtitle: 'Backend Engineering Project',
  description: 'Detailed information about this backend engineering project.',
  tags: ['Node.js', 'TypeScript', 'PostgreSQL'],
  sections: ['System Architecture', 'Engineering Challenges', 'Trade-offs & Decisions'],
  architecture: {
    description: 'Standard three-tier architecture with API layer, business logic, and data persistence.',
    nodes: [
      { name: 'API Layer', description: 'REST endpoints' },
      { name: 'Service Layer', description: 'Business logic' },
      { name: 'Data Layer', description: 'Database access' },
    ],
  },
  challenges: [
    { title: 'Scalability', description: 'Designed for horizontal scaling with stateless services.' },
    { title: 'Performance', description: 'Optimized database queries and implemented caching.' },
  ],
  tradeoffs: [
    { tech: 'TypeScript', alternative: 'JavaScript', reason: 'Type safety reduces runtime errors significantly.' },
  ],
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug] || defaultProject;
  const [activeSection, setActiveSection] = useState(project.sections[0]);
  const { theme } = useTheme();

  return (
    <div className={`project-detail-page ${theme}`}>
      {/* Header */}
      <header className="project-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/projects">Projects</Link>
            <span className="separator">/</span>
            <span>{project.title}</span>
          </div>

          <h1>{project.title}</h1>
          <p className="project-subtitle">{project.description}</p>

          <div className="header-actions">
            <div className="project-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>

            <div className="header-buttons">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.docsUrl && (
                <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  📄 API Documentation
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="content-layout">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <span className="sidebar-label">DOCUMENTATION</span>
            <nav className="sidebar-nav">
              {project.sections.map((section) => (
                <button
                  key={section}
                  className={`nav-item ${activeSection === section ? 'active' : ''}`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* System Architecture Section */}
          {activeSection === 'System Architecture' && (
            <section className="section" id="architecture">
              <h2>
                <span className="section-icon">🏗️</span>
                System Architecture
              </h2>

              <div className="architecture-diagram">
                <div className="arch-nodes">
                  {project.architecture.nodes.map((node, idx) => (
                    <div key={idx} className="arch-node">
                      <div className="node-box">
                        <span className="node-name">{node.name}</span>
                        {node.description && (
                          <span className="node-desc">{node.description}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="arch-description">{project.architecture.description}</p>
            </section>
          )}

          {/* Engineering Challenges Section */}
          {activeSection === 'Engineering Challenges' && (
            <section className="section" id="challenges">
              <h2>
                <span className="section-icon">⚡</span>
                Key Engineering Challenges
              </h2>

              <div className="challenges-grid">
                {project.challenges.map((challenge, idx) => (
                  <div key={idx} className="challenge-card">
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Database Design Section */}
          {activeSection === 'Database Design' && project.databaseDesign && (
            <section className="section" id="database">
              <h2>
                <span className="section-icon">🗄️</span>
                Database Design
              </h2>

              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">SCHEMA PREVIEW (SQL)</span>
                  <div className="code-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <pre className="code-content">
                  <code>{project.databaseDesign.code}</code>
                </pre>
              </div>

              <p className="db-description">{project.databaseDesign.description}</p>
            </section>
          )}

          {/* Trade-offs Section */}
          {activeSection === 'Trade-offs & Decisions' && (
            <section className="section" id="tradeoffs">
              <h2>
                <span className="section-icon">⚖️</span>
                Trade-offs & Decisions
              </h2>

              <div className="tradeoffs-table">
                <div className="table-header">
                  <span>Tech Choice</span>
                  <span>Alternative</span>
                  <span>Decision Logic</span>
                </div>
                {project.tradeoffs.map((trade, idx) => (
                  <div key={idx} className="table-row">
                    <span className="tech-choice">{trade.tech}</span>
                    <span className="alternative">{trade.alternative}</span>
                    <span className="reason">{trade.reason}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="cta-section">
            <h3>Interested in the technical details?</h3>
            <div className="cta-buttons">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  🔍 Explore Codebase
                </a>
              )}
              <Link href="/contact" className="btn btn-secondary">
                📄 API Documentation
              </Link>
            </div>
            <div className="cta-links">
              <a href="https://linkedin.com/in/fredrickanyanwu2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="mailto:fredrickraymond2004@gmail.com">Email</a>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .project-detail-page {
          min-height: 100vh;
          background: var(--bg-canvas-primary);
          color: var(--text-primary);
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header */
        .project-header {
          padding: 40px 0 32px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-canvas-secondary);
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .breadcrumb a {
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: var(--primary);
        }

        .separator {
          color: var(--text-muted);
          opacity: 0.5;
        }

        .project-header h1 {
          font-size: 42px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .project-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          padding: 8px 16px;
          background: rgba(10, 186, 181, 0.15);
          color: var(--primary);
          border: 1px solid rgba(10, 186, 181, 0.3);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .header-buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          text-decoration: none;
        }

        .btn-primary {
          background: var(--primary);
          color: #0D1117;
        }

        .btn-primary:hover {
          background: var(--primary-light);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        /* Content Layout */
        .content-layout {
          display: flex;
          max-width: 1280px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        /* Sidebar */
        .sidebar {
          width: 240px;
          flex-shrink: 0;
          padding: 32px 24px;
          border-right: 1px solid var(--border);
          background: var(--bg-canvas-secondary);
        }

        .sidebar-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 16px;
          display: block;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          background: none;
          border: none;
          text-align: left;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          color: var(--text-primary);
          background: var(--bg-card-hover);
        }

        .nav-item.active {
          color: var(--primary);
          background: rgba(10, 186, 181, 0.1);
          border-left: 2px solid var(--primary);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 32px 48px;
          background: var(--bg-canvas-primary);
        }

        .section {
          margin-bottom: 60px;
        }

        .section h2 {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-icon {
          font-size: 20px;
        }

        /* Architecture */
        .architecture-diagram {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 40px;
          margin-bottom: 24px;
        }

        .arch-nodes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .arch-node {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .node-box {
          background: var(--bg-canvas-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px 24px;
          text-align: center;
          width: 100%;
          transition: border-color 0.3s ease;
        }

        .node-box:hover {
          border-color: var(--primary);
        }

        .node-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .node-desc {
          font-size: 12px;
          color: var(--text-muted);
        }

        .arch-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Challenges */
        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .challenge-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          transition: border-color 0.3s ease;
        }

        .challenge-card:hover {
          border-color: var(--primary);
        }

        .challenge-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .challenge-card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Database Design */
        .code-block {
          background: #0D1117;
          border: 1px solid #30363D;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #161B22;
          border-bottom: 1px solid #30363D;
        }

        .code-lang {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #8B949E;
        }

        .code-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red { background: #FF5F56; }
        .dot.yellow { background: #FFBD2E; }
        .dot.green { background: #27C93F; }

        .code-content {
          padding: 20px;
          margin: 0;
          overflow-x: auto;
          font-family: 'Fira Code', 'Monaco', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: #E6EDF3;
        }

        .code-content code {
          color: #79C0FF;
        }

        .db-description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Trade-offs Table */
        .tradeoffs-table {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 150px 150px 1fr;
          gap: 24px;
          padding: 16px 24px;
          background: var(--bg-canvas-secondary);
          border-bottom: 1px solid var(--border);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-row {
          display: grid;
          grid-template-columns: 150px 150px 1fr;
          gap: 24px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .tech-choice {
          color: var(--primary);
          font-weight: 600;
        }

        .alternative {
          color: var(--text-muted);
        }

        .reason {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding: 60px 0;
          border-top: 1px solid var(--border);
          margin-top: 60px;
        }

        .cta-section h3 {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .cta-links {
          display: flex;
          justify-content: center;
          gap: 24px;
        }

        .cta-links a {
          font-size: 14px;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .cta-links a:hover {
          color: var(--primary);
        }

        @media (max-width: 1024px) {
          .content-layout {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 16px 24px;
          }

          .sidebar-nav {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .main-content {
            padding: 32px 24px;
          }

          .arch-nodes {
            grid-template-columns: repeat(2, 1fr);
          }

          .challenges-grid {
            grid-template-columns: 1fr;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .table-header span:last-child,
          .table-row span:last-child {
            padding-top: 8px;
            border-top: 1px solid var(--border);
          }
        }

        @media (max-width: 640px) {
          .project-header h1 {
            font-size: 28px;
          }

          .header-actions {
            flex-direction: column;
            align-items: flex-start;
          }

          .arch-nodes {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
