'use client';

import Link from 'next/link';
import { StatCard } from '@/components';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-name">
              Fredrick Anyanwu
            </h1>
            <p className="hero-title">
              BACKEND ENGINEER | API & DISTRIBUTED SYSTEMS
            </p>

            <p className="hero-description">
              Building robust, scalable, and high-performance systems with
              engineering depth and architectural precision.
            </p>

            <div className="hero-cta">
              <Link href="/projects" className="btn btn-primary">
                View My Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>

            <div className="hero-social">
              <a href="https://github.com/fredrickray" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/fredrickanyanwu2" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stats-header">
            <span className="stats-label">SYSTEM PERFORMANCE</span>
          </div>
          <div className="stats-grid">
            <StatCard value="99" suffix=".99%" label="Uptime" delay={0} />
            <StatCard value="40" suffix="+" label="Services Built" delay={100} />
            <StatCard value="150" suffix="ms" label="Avg Response" delay={200} />
            <StatCard value="2,284" suffix="+ Commits" label="Open Source" delay={300} />
          </div>
        </div>
      </section>

      {/* Technical Focus Section */}
      <section className="technical-focus">
        <div className="focus-container">
          <div className="section-header">
            <span className="section-badge">TECHNICAL FOCUS</span>
            <h2 className="section-title">Backend Engineering Expertise</h2>
          </div>

          <div className="focus-grid">
            <div className="focus-card">
              <div className="focus-icon">⚡</div>
              <h3>API Design</h3>
              <p>RESTful & GraphQL APIs with robust authentication, rate limiting, and documentation.</p>
              <div className="focus-tags">
                <span>REST</span>
                <span>GraphQL</span>
                <span>OpenAPI</span>
                <span>Swagger</span>
                <span>Postman</span>
              </div>
            </div>

            <div className="focus-card">
              <div className="focus-icon">🔧</div>
              <h3>Distributed Systems</h3>
              <p>Microservices architecture, message queues, and event-driven systems at scale.</p>
              <div className="focus-tags">
                <span>Kafka</span>
                <span>Redis</span>
                <span>RabbitMQ</span>
                <span>BullMQ</span>
              </div>
            </div>

            <div className="focus-card">
              <div className="focus-icon">🗄️</div>
              <h3>Database Architecture</h3>
              <p>Schema design, query optimization, and data modeling for performance.</p>
              <div className="focus-tags">
                <span>PostgreSQL</span>
                <span>MongoDB</span>
                <span>Redis</span>
                <span>MySQL</span>
                <span>SQLite</span>
                <span>Firestore</span>
              </div>
            </div>

            <div className="focus-card">
              <div className="focus-icon">☁️</div>
              <h3>Cloud & DevOps</h3>
              <p>Container orchestration, CI/CD pipelines, and infrastructure as code.</p>
              <div className="focus-tags">
                <span>Docker</span>
                <span>AWS</span>
                <span>Kubernetes</span>
                <span>GitLab</span>
                <span>GitHub</span>
                <span>Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured">
        <div className="featured-container">
          <div className="section-header">
            <span className="section-badge">FEATURED WORK</span>
            <h2 className="section-title">Backend Projects</h2>
            <p className="section-desc">
              Production-grade systems built for scalability, reliability, and performance.
            </p>
          </div>

          <div className="featured-grid">
            <div className="project-item featured">
              {/* <div className="project-image">
                <div className="terminal">
                  <div className="terminal-header">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                  </div>
                  <div className="terminal-body">
                    <code className="terminal-line">
                      <span className="terminal-prompt">$</span> curl -X GET /api/v1/services
                    </code>
                    <code className="terminal-response">
                      {`{ "status": "healthy", "latency": "12ms" }`}
                    </code>
                  </div>
                </div>
              </div> */}
              <div className="project-info">
                <span className="project-category">API GATEWAY</span>
                <h3>PropSpaceX API Gateway</h3>
                <p>An extensive api gateway to a property management system with comprehensive authentication, authorization, and rate limiting.</p>
                <div className="project-tags">
                  <span>Node.js</span>
                  <span>Redis</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
            </div>

            <div className="project-item">
              <div className="project-image compact">
                <div className="metric-display">
                  <span className="metric-big">99.9%</span>
                  <span className="metric-sub">Uptime SLA</span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">DEV TOOLS</span>
                <h3>OpenRDB Studio</h3>
                <p>A free, open-source, cross-platform GUI for relational databases, designed to provide a modern, intuitive, and unrestricted developer experience</p>
                <div className="project-tags">
                  <span>Rust</span>
                  <span>Tauri</span>
                  <span>React</span>
                  <span>Typescript</span>
                  <span>SQLx</span>
                </div>
              </div>
            </div>

            <div className="project-item">
              <div className="project-image compact">
                <div className="metric-display">
                  <span className="metric-big">&lt;50ms</span>
                  <span className="metric-sub">P95 Latency</span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">AI</span>
                <h3>MarketLense</h3>
                <p>An AI-powered stock decision support system based on market trends and real-world signals.</p>
                <div className="project-tags">
                  <span>FastAPI</span>
                  <span>Python</span>
                  <span>PostgreSQL</span>
                  <span>Random Forest</span>
                  <span>LightGBM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="featured-cta">
            <Link href="/projects" className="btn btn-secondary">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Need a Backend Engineer?</h2>
            <p>Let&apos;s build robust, scalable systems together. From API design to deployment, I&apos;ve got you covered.</p>
            <Link href="/contact" className="btn btn-primary">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Section */
        .hero {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          padding: 60px 0;
          background: var(--bg-hero);
          position: relative;
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }

        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-name {
          font-size: clamp(40px, 8vw, 64px);
          font-weight: 300;
          font-style: italic;
          letter-spacing: -1px;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .hero-title {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .hero-description {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 48px;
        }

        .hero-social {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .social-link {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 50%;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: var(--primary);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        /* Stats Section */
        .stats {
          padding: 60px 0;
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .stats-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .stats-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--text-muted);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* Technical Focus */
        .technical-focus {
          padding: 100px 0;
          background: var(--bg-canvas-primary);
        }

        .focus-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
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
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .section-desc {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .focus-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .focus-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .focus-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .focus-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .focus-card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .focus-tags span {
          padding: 4px 10px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        /* Featured Projects */
        .featured {
          padding: 100px 0;
          background: var(--bg-canvas-secondary);
        }

        .featured-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .project-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-item:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .project-item.featured {
          grid-row: span 2;
        }

        .project-image {
          background: #0D1117;
          padding: 24px;
        }

        .project-image.compact {
          padding: 32px 24px;
          text-align: center;
        }

        .terminal {
          border-radius: 8px;
          overflow: hidden;
        }

        .terminal-header {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-dot.red { background: #FF5F56; }
        .terminal-dot.yellow { background: #FFBD2E; }
        .terminal-dot.green { background: #27C93F; }

        .terminal-body {
          font-family: 'Fira Code', monospace;
          font-size: 13px;
        }

        .terminal-line {
          display: block;
          color: #D4D4D4;
          margin-bottom: 8px;
        }

        .terminal-prompt {
          color: var(--primary);
          margin-right: 8px;
        }

        .terminal-response {
          display: block;
          color: #6A9955;
        }

        .metric-display {
          text-align: center;
        }

        .metric-big {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: var(--primary);
          font-family: 'Fira Code', monospace;
        }

        .metric-sub {
          font-size: 12px;
          color: #8B949E;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .project-info {
          padding: 24px;
        }

        .project-category {
          font-size: 11px;
          color: var(--primary);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .project-info h3 {
          font-size: 18px;
          margin: 8px 0;
        }

        .project-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .project-tags span {
          padding: 4px 10px;
          background: var(--bg-canvas-secondary);
          color: var(--text-muted);
          border-radius: 4px;
          font-size: 12px;
        }

        .featured-cta {
          text-align: center;
        }

        /* CTA Section */
        .cta {
          padding: 100px 0;
          background: var(--bg-canvas-primary);
        }

        .cta-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 36px;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .stats-grid,
          .focus-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .project-item.featured {
            grid-row: span 1;
          }
        }

        @media (max-width: 640px) {
          .stats-grid,
          .focus-grid,
          .featured-grid {
            grid-template-columns: 1fr;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}
