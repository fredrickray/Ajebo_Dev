'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Project data - in a real app this would come from an API/database
const projectsData: Record<string, {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    category: string;
    tags: string[];
    metrics: { label: string; value: string; description: string }[];
    architecture: { name: string; description: string }[];
    features: string[];
    challenges: string[];
    techStack: { category: string; items: string[] }[];
    links: { github?: string; live?: string; docs?: string };
}> = {
    '1': {
        id: 1,
        title: 'NeuroQO',
        subtitle: 'ML-Powered Query Optimization Engine',
        description: 'High-throughput distributed task scheduling system with machine learning capabilities.',
        longDescription: 'NeuroQO is a sophisticated machine learning system designed to optimize database queries. It uses Random Forest and LightGBM models to predict query performance and suggest optimizations, resulting in significant performance improvements for complex database operations.',
        category: 'Machine Learning',
        tags: ['FastAPI', 'Python', 'PostgreSQL', 'Random Forest', 'LightGBM'],
        metrics: [
            { label: '120ms', value: 'Avg Response', description: 'Average prediction latency' },
            { label: '0.001%', value: 'Error Rate', description: 'Model prediction errors' },
            { label: '100k+', value: 'Daily Predictions', description: 'Queries optimized daily' },
        ],
        architecture: [
            { name: 'API Gateway', description: 'FastAPI-based REST API for query submission' },
            { name: 'Feature Extractor', description: 'Parses SQL and extracts query features' },
            { name: 'ML Engine', description: 'Random Forest & LightGBM model inference' },
            { name: 'Optimization Suggester', description: 'Generates optimization recommendations' },
        ],
        features: [
            'Real-time query analysis and optimization suggestions',
            'Multiple ML model support (Random Forest, LightGBM)',
            'Query history tracking and pattern recognition',
            'RESTful API with comprehensive documentation',
            'Performance metrics and monitoring dashboard',
        ],
        challenges: [
            'Handling diverse SQL query patterns across different databases',
            'Balancing model accuracy with inference latency requirements',
            'Training data collection and labeling at scale',
        ],
        techStack: [
            { category: 'Backend', items: ['Python', 'FastAPI', 'SQLAlchemy'] },
            { category: 'ML/AI', items: ['scikit-learn', 'LightGBM', 'Pandas', 'NumPy'] },
            { category: 'Database', items: ['PostgreSQL', 'Redis (caching)'] },
            { category: 'DevOps', items: ['Docker', 'GitHub Actions', 'pytest'] },
        ],
        links: { github: 'https://github.com/fredrickray/neuroqo' },
    },
    '3': {
        id: 3,
        title: 'PropSpaceX API Gateway',
        subtitle: 'High-Performance Microservices Gateway',
        description: 'An extensive API gateway to a property management system with comprehensive authentication and authorization.',
        longDescription: 'PropSpaceX API Gateway serves as the central entry point for the entire PropSpaceX ecosystem. It handles authentication, rate limiting, request routing, and provides a unified API interface for multiple backend microservices.',
        category: 'API Development',
        tags: ['Node.js', 'TypeScript', 'Express', 'gRPC', 'Proxy'],
        metrics: [
            { label: '99.9%', value: 'Uptime', description: 'Service availability SLA' },
            { label: '<50ms', value: 'P95 Latency', description: '95th percentile response time' },
            { label: '10k/sec', value: 'Throughput', description: 'Peak requests per second' },
        ],
        architecture: [
            { name: 'API Gateway', description: 'Central entry point with rate limiting' },
            { name: 'Auth Service', description: 'JWT-based authentication & RBAC' },
            { name: 'Property Service', description: 'Property CRUD and geospatial search' },
            { name: 'Media Service', description: 'Image optimization and CDN delivery' },
            { name: 'Payment Service', description: 'Multi-provider payment processing' },
            { name: 'Notification Service', description: 'Email, SMS, and push notifications' },
        ],
        features: [
            'Centralized authentication with JWT and refresh tokens',
            'Role-based access control (RBAC) across all services',
            'Request rate limiting and throttling',
            'gRPC for inter-service communication',
            'Comprehensive API documentation with Swagger/OpenAPI',
            'Health checks and circuit breaker patterns',
        ],
        challenges: [
            'Designing a scalable gateway for high-traffic scenarios',
            'Implementing secure authentication across microservices',
            'Managing service discovery and load balancing',
        ],
        techStack: [
            { category: 'Backend', items: ['Node.js', 'TypeScript', 'Express'] },
            { category: 'Communication', items: ['gRPC', 'REST', 'WebSocket'] },
            { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
            { category: 'DevOps', items: ['Docker', 'Kubernetes', 'GitHub Actions'] },
        ],
        links: { github: 'https://github.com/fredrickray/propspacex-gateway' },
    },
};

// Default project for fallback
const defaultProject = {
    id: 0,
    title: 'Project Details',
    subtitle: 'Backend Engineering Project',
    description: 'Detailed information about this project.',
    longDescription: 'This project demonstrates expertise in backend engineering, distributed systems, and scalable architecture design.',
    category: 'API Development',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL'],
    metrics: [
        { label: '99.9%', value: 'Uptime', description: 'Service availability' },
        { label: '<100ms', value: 'Latency', description: 'Average response time' },
    ],
    architecture: [
        { name: 'API Layer', description: 'RESTful API endpoints' },
        { name: 'Business Logic', description: 'Core application services' },
        { name: 'Data Layer', description: 'Database and caching' },
    ],
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    challenges: ['Challenge 1', 'Challenge 2'],
    techStack: [
        { category: 'Backend', items: ['Node.js', 'TypeScript'] },
    ],
    links: {},
};

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;
    const project = projectsData[projectId] || defaultProject;

    return (
        <div className="project-detail-page">
            {/* Hero Section */}
            <section className="project-hero">
                <div className="container">
                    <Link href="/projects" className="back-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Projects
                    </Link>

                    <div className="hero-content">
                        <span className="project-category">{project.category}</span>
                        <h1>{project.title}</h1>
                        <p className="project-subtitle">{project.subtitle}</p>
                        <div className="project-tags">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="metrics-section">
                <div className="container">
                    <div className="metrics-grid">
                        {project.metrics.map((metric, idx) => (
                            <div key={idx} className="metric-card">
                                <span className="metric-value">{metric.label}</span>
                                <span className="metric-label">{metric.value}</span>
                                <span className="metric-desc">{metric.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Architecture Section */}
            <section className="architecture-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">SYSTEM ARCHITECTURE</span>
                        <h2>How It Works</h2>
                    </div>

                    <div className="architecture-diagram">
                        {project.architecture.map((component, idx) => (
                            <div key={idx} className="arch-component">
                                <div className="arch-box">
                                    <span className="arch-name">{component.name}</span>
                                </div>
                                <p className="arch-desc">{component.description}</p>
                                {idx < project.architecture.length - 1 && (
                                    <div className="arch-connector">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="overview-section">
                <div className="container">
                    <div className="overview-grid">
                        <div className="overview-content">
                            <h2>Project Overview</h2>
                            <p>{project.longDescription}</p>

                            <h3>Key Features</h3>
                            <ul className="features-list">
                                {project.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <span className="feature-check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <h3>Technical Challenges</h3>
                            <ul className="challenges-list">
                                {project.challenges.map((challenge, idx) => (
                                    <li key={idx}>
                                        <span className="challenge-icon">⚡</span>
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="tech-stack">
                            <h3>Technology Stack</h3>
                            {project.techStack.map((stack, idx) => (
                                <div key={idx} className="stack-group">
                                    <span className="stack-category">{stack.category}</span>
                                    <div className="stack-items">
                                        {stack.items.map((item, i) => (
                                            <span key={i} className="stack-item">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {(project.links.github || project.links.live) && (
                                <div className="project-links">
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                            View Source
                                        </a>
                                    )}
                                    {project.links.live && (
                                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box">
                        <h2>Interested in Similar Work?</h2>
                        <p>Let&apos;s discuss how I can help build your next backend system.</p>
                        <Link href="/contact" className="btn btn-primary">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .project-detail-page {
          min-height: 100vh;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero */
        .project-hero {
          padding: 60px 0 80px;
          background: var(--bg-primary);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 32px;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: var(--primary);
        }

        .hero-content {
          max-width: 800px;
        }

        .project-category {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .project-hero h1 {
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .project-subtitle {
          font-size: 20px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          padding: 8px 16px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
        }

        /* Metrics */
        .metrics-section {
          padding: 60px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .metric-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
        }

        .metric-value {
          display: block;
          font-size: 40px;
          font-weight: 700;
          color: var(--primary);
          font-family: 'Fira Code', monospace;
          line-height: 1;
        }

        .metric-label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          margin-top: 8px;
          color: var(--text-primary);
        }

        .metric-desc {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Architecture */
        .architecture-section {
          padding: 100px 0;
          background: #0D1117;
          color: #FFFFFF;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(10, 186, 181, 0.2);
          color: var(--primary);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .architecture-section h2 {
          font-size: 32px;
          color: #FFFFFF;
        }

        .architecture-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .arch-component {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .arch-box {
          padding: 16px 32px;
          background: #161B22;
          border: 1px solid #30363D;
          border-radius: 8px;
          min-width: 200px;
        }

        .arch-name {
          font-size: 14px;
          font-weight: 600;
          color: #D4D4D4;
          font-family: 'Fira Code', monospace;
        }

        .arch-desc {
          font-size: 13px;
          color: #8B949E;
          margin-top: 8px;
          max-width: 300px;
        }

        .arch-connector {
          color: var(--primary);
          margin: 8px 0;
        }

        /* Overview */
        .overview-section {
          padding: 100px 0;
          background: var(--bg-primary);
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
        }

        .overview-content h2 {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .overview-content > p {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .overview-content h3 {
          font-size: 18px;
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .features-list,
        .challenges-list {
          list-style: none;
        }

        .features-list li,
        .challenges-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          font-size: 15px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
        }

        .feature-check {
          color: var(--primary);
          font-weight: 600;
        }

        .challenge-icon {
          color: #F59E0B;
        }

        /* Tech Stack */
        .tech-stack {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .tech-stack h3 {
          font-size: 18px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .stack-group {
          margin-bottom: 20px;
        }

        .stack-category {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 8px;
        }

        .stack-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stack-item {
          padding: 6px 12px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
        }

        .project-links {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .project-links .btn {
          justify-content: center;
        }

        /* CTA */
        .cta-section {
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
          font-size: 28px;
          margin-bottom: 12px;
        }

        .cta-box p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .tech-stack {
            position: static;
          }

          .cta-box {
            padding: 40px 24px;
          }
        }
      `}</style>
        </div>
    );
}
