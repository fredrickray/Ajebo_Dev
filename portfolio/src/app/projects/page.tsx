'use client';

import { useState } from 'react';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    slug: 'openrdb-studio',
    title: 'OpenRDB Studio',
    description: 'A free, open-source, cross-platform GUI for relational databases, designed to provide a modern, intuitive, and unrestricted developer experience',
    category: 'Dev Tools',
    tags: ['Rust', 'Tauri', 'React', 'Typescript', 'SQLx'],
    // metrics: { label: '100k+', sublabel: 'Daily Jobs' },
    featured: true,
    architecture: ['Desktop App', 'Database GUI', 'Cross-Platform', 'SQL Client'],
    github: 'https://github.com/fredrickanyanwu/openrdb-studio',
  },
  {
    id: 2,
    slug: 'marketlense',
    title: 'MarketLense',
    description: 'An AI-powered stock decision support system based on market trends and real-world signals.',
    category: 'AI',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    // metrics: { label: '100k+', sublabel: 'Daily Jobs' },
    featured: true,
    architecture: ['AI', 'Machine Learning', 'Data Analysis', 'Stock Market'],
    github: 'https://github.com/fredrickanyanwu/marketlense',
  },
  {
    id: 3,
    slug: 'neuroqo',
    title: 'NeuroQO',
    description: 'An intelligent system that observes, analyzes, and optimizes database queries using machine learning techniques.',
    category: 'Machine Learning',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    // metrics: { label: '100k+', sublabel: 'Daily Jobs' },
    featured: true,
    architecture: ['Machine Learning', 'Database Optimization', 'Query Analysis', 'Performance Tuning'],
    github: 'https://github.com/fredrickanyanwu/neuroqo',
  },
  {
    id: 4,
    slug: 'n-civisense',
    title: 'N-Civisense',
    description: 'N-ATLaS is a GPU‑accelerated, production‑ready FastAPI service for: Conversational LLM inference (streaming & non‑streaming)',
    category: 'Machine Learning',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
    // metrics: { label: '100k+', sublabel: 'Daily Jobs' },
    featured: true,
    architecture: ['GPU-accelerated', 'FastAPI', 'LLM Inference', 'Streaming', 'Non-streaming'],
    github: 'https://github.com/fredrickanyanwu/n-civisense',
  },
  {
    id: 5,
    slug: 'propspacex-gateway',
    title: 'PropSpaceX API Gateway',
    description: 'An extensive api gateway to a property management system with comprehensive authentication, authorization, and rate limiting.',
    category: 'API Development',
    tags: ['NodeJS', 'Typescript', 'Express', 'gRPC', 'Proxy'],
    // metrics: { label: '99.9%', sublabel: 'Uptime' },
    featured: true,
    architecture: ['API Gateway', 'Auth Service', 'Cache Layer', 'Property Service', 'Notification Service', 'Mail Service', 'Media Service', 'Payment Service'],
    github: 'https://github.com/fredrickanyanwu/propspacex-gateway',
  },
  {
    id: 6,
    slug: 'propspacex-user-service',
    title: 'PropSpaceX User Service',
    description: 'A secure TypeScript microservice handling user authentication, device trust verification, and activity monitoring via REST and gRPC, with PostgreSQL/TypeORM and Docker deployment.',
    category: 'API Development',
    tags: ['NodeJS', 'Typescript', 'JWT', 'PostgreSQL', 'GeoIP', 'Express', 'gRPC', 'TypeORM', 'Docker'],
    // metrics: { label: '99.9%', sublabel: 'Uptime' },
    featured: false,
    github: 'https://github.com/fredrickanyanwu/propspacex-user-service',
  },
  {
    id: 7,
    slug: 'propspacex-property-service',
    title: 'PropSpaceX Property Service',
    description: 'A high-performance Node.js/TypeScript microservice for real estate management, featuring geospatial search via MongoDB and blockchain integration for property tokenization. It uses gRPC for efficient inter-service communication and handles complex property lifecycles, including legal document verification.',
    category: 'API Development',
    tags: ['NodeJS', 'Typescript', 'MongoDB', 'Mongoose', 'Express', 'gRPC', 'Docker'],
    // metrics: { label: '99.9%', sublabel: 'Uptime' },
    featured: false,
    github: 'https://github.com/fredrickanyanwu/propspacex-property-service',
  },
  {
    id: 8,
    slug: 'propspacex-media-service',
    title: 'PropSpaceX Media Service',
    description: 'A centralized Node.js/TypeScript service enabling secure, multi-provider media management for the PropSpaceX platform. Features include automatic image optimization via Sharp, abstraction of storage providers (AWS S3, Cloudinary), and dual-protocol access (gRPC for internal microservices, REST for external clients) to ensure high-performance asset delivery.',
    category: 'API Development',
    tags: ['NodeJS', 'Typescript', 'AWS S3', 'Cloudinary', 'Sharp', 'Express', 'MongoDB', 'Mongoose', 'gRPC', 'Docker'],
    // metrics: { label: '99.9%', sublabel: 'Uptime' },
    featured: false,
    github: 'https://github.com/fredrickanyanwu/propspacex-media-service',
  },
  {
    id: 9,
    slug: 'propspacex-mail-service',
    title: 'PropSpaceX Mail Service',
    description: 'A high-performance mail microservice built with Node.js and TypeScript. Designed for reliability, it utilizes RabbitMQ for asynchronous job processing, gRPC for low-latency communication, and Nodemailer for transactional email delivery (e.g., verification, welcome). Features robust fault tolerance with exponential backoff retries and Dead Letter Queues (DLQ).',
    category: 'API Development',
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'RabbitMQ', 'gRPC', 'Nodemailer', 'Docker'],
    // metrics: { label: '$1M+', sublabel: 'Processed' },
    featured: false,
    github: 'https://github.com/fredrickanyanwu/propspacex-mail-service',
  },
  {
    id: 10,
    slug: 'propspacex-payment-service',
    title: 'PropSpaceX Payment Service',
    description: 'Payment processing service integrating Stripe, Paystack, and Flutterwave with webhook handling and reconciliation.',
    category: 'API Development',
    tags: ['NestJS', 'Express', 'MongoDB', 'Mongoose', 'Webhooks', 'Flutterwave API', 'Paystack API', 'Stripe API', 'Docker'],
    // metrics: { label: '$1M+', sublabel: 'Processed' },
    featured: false,
    github: 'https://github.com/fredrickanyanwu/propspacex-payment-service',
  },
];

const categories = ['All', 'Machine Learning', 'API Development', 'Distributed Systems', 'Database Design'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <span className="section-badge">PORTFOLIO</span>
          <h1>Backend Engineering &<br />System Design</h1>
          <p>A collection of distributed systems, high-concurrency engines, and production-grade APIs built to scale.</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="projects-filter">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-header">
                  {/* <div className="project-metric">
                    <span className="metric-value">{project?.metrics?.label}</span>
                    <span className="metric-label">{project?.metrics?.sublabel}</span>
                  </div> */}
                  {project.featured && project.architecture && (
                    <div className="project-architecture">
                      <span className="arch-label">SYSTEM ARCHITECTURE</span>
                      <div className="arch-diagram">
                        {project.architecture.map((node, idx) => (
                          <div key={idx} className="arch-node">
                            <span className="node-name">{node}</span>
                            {idx < project.architecture!.length - 1 && (
                              <span className="node-arrow">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    {project.featured && <span className="featured-badge">⭐ Featured</span>}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className={`project-actions ${hoveredProject === project.id ? 'visible' : ''}`}>
                    <Link href={`/projects/${project.slug}`} className="btn btn-secondary btn-sm">
                      View Details
                    </Link>
                    <a href={`${project.github}`} className="btn-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Need Custom Backend Development?</h2>
            <p>From API design to distributed systems, I build scalable solutions that handle real-world traffic.</p>
            <Link href="/contact" className="btn btn-primary">
              Let&apos;s Discuss Your Project
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-page {
          min-height: 100vh;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero */
        .projects-hero {
          padding: 80px 0 60px;
          background: var(--bg-primary);
          text-align: center;
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .projects-hero h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .projects-hero p {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Filter */
        .projects-filter {
          padding: 24px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 70px;
          z-index: 100;
        }

        .filter-tabs {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-tab {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 30px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-tab:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .filter-tab.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #FFFFFF;
        }

        /* Projects Grid */
        .projects-grid-section {
          padding: 60px 0;
          background: var(--bg-primary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-card);
        }

        .project-card.featured {
          grid-column: span 2;
        }

        .project-header {
          background: #0D1117;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }

        .project-card:not(.featured) .project-header {
          padding: 20px;
        }

        .project-metric {
          text-align: center;
          min-width: 100px;
        }

        .metric-value {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: var(--primary);
          font-family: 'Fira Code', monospace;
          line-height: 1;
        }

        .project-card:not(.featured) .metric-value {
          font-size: 24px;
        }

        .metric-label {
          font-size: 12px;
          color: #8B949E;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          display: block;
        }

        .project-architecture {
          flex: 1;
        }

        .arch-label {
          font-size: 10px;
          color: #8B949E;
          letter-spacing: 1px;
          margin-bottom: 12px;
          display: block;
        }

        .arch-diagram {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .arch-node {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .node-name {
          padding: 8px 12px;
          background: #161B22;
          border: 1px solid #30363D;
          border-radius: 6px;
          color: #D4D4D4;
          font-size: 12px;
          font-family: 'Fira Code', monospace;
        }

        .node-arrow {
          color: var(--primary);
        }

        .project-content {
          padding: 24px;
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .project-category {
          font-size: 11px;
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .featured-badge {
          font-size: 11px;
          color: var(--primary);
        }

        .project-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tag {
          padding: 6px 12px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .project-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .project-actions.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
        }

        .btn-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .btn-link:hover {
          color: var(--primary);
        }

        /* CTA */
        .projects-cta {
          padding: 80px 0;
          background: var(--bg-secondary);
        }

        .cta-box {
          text-align: center;
          padding: 60px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
        }

        .cta-box h2 {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .cta-box p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card.featured {
            grid-column: span 1;
          }

          .project-header {
            flex-direction: column;
          }

          .cta-box {
            padding: 40px 24px;
          }
        }

        @media (max-width: 640px) {
          .filter-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 10px;
          }

          .filter-tab {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
