'use client';

import Link from 'next/link';
import SystemGraph from '@/components/SystemGraph';
import Reveal from '@/components/Reveal';
import { featuredProjects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="brand mono">AjeboDev</p>
            <h1>
              Fredrick
              <br />
              Anyanwu
            </h1>
            <p className="role mono">Backend engineer · APIs &amp; distributed systems</p>
            <p className="lede">
              I design and ship the systems behind products — gateways, services,
              queues, and data stores that stay reliable under load.
            </p>
            <div className="hero-cta">
              <Link href="/projects" className="btn btn-primary">
                View systems
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <SystemGraph />
          </div>
        </div>
      </section>

      <section className="work">
        <div className="container">
          <Reveal>
            <p className="section-label">Selected systems</p>
            <h2 className="section-title">Built end to end</h2>
            <p className="section-desc">
              Microservices, developer tools, and ML-backed backends — architecture
              first, then the code that keeps them running.
            </p>
          </Reveal>

          <div className="work-list">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <Link
                  href={`/projects/${project.slug === 'propspacex' ? 'propspacex-gateway' : project.slug}`}
                  className="work-row"
                >
                  <div className="work-index mono">{String(i + 1).padStart(2, '0')}</div>
                  <div className="work-body">
                    <div className="work-meta">
                      <span className="work-cat mono">{project.category}</span>
                      {project.architecture && (
                        <span className="work-arch mono">
                          {project.architecture.slice(0, 4).join(' → ')}
                          {project.architecture.length > 4 ? ' → …' : ''}
                        </span>
                      )}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="work-tags">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="work-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="work-footer">
              <Link href="/projects" className="btn btn-secondary">
                All work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="focus">
        <div className="container">
          <Reveal>
            <p className="section-label">Focus</p>
            <h2 className="section-title">Where I spend depth</h2>
          </Reveal>
          <div className="focus-rows">
            {[
              {
                title: 'API & service design',
                text: 'REST, gRPC, auth, rate limits, and contracts that other teams can trust.',
              },
              {
                title: 'Distributed backends',
                text: 'Queues, retries, DLQs, and event flows that survive partial failure.',
              },
              {
                title: 'Data & performance',
                text: 'Schema design, query paths, caching, and the tradeoffs that keep latency honest.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="focus-row">
                  <span className="focus-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <Reveal>
            <div className="cta-inner">
              <h2>Building something that needs a solid backend?</h2>
              <p>
                Open to contract work and full-time roles on systems where reliability
                actually matters.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: calc(100vh - var(--nav-height));
          display: flex;
          align-items: stretch;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: var(--bg-hero);
          z-index: 0;
        }

        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
              90deg,
              transparent 0%,
              transparent 49.5%,
              rgba(12, 16, 23, 0.04) 49.5%,
              rgba(12, 16, 23, 0.04) 50.5%,
              transparent 50.5%
            ),
            radial-gradient(ellipse 50% 40% at 20% 80%, var(--primary-soft), transparent 70%);
          pointer-events: none;
        }

        [data-theme='dark'] .hero-bg::after {
          background: linear-gradient(
              90deg,
              transparent 0%,
              transparent 49.5%,
              rgba(255, 255, 255, 0.03) 49.5%,
              rgba(255, 255, 255, 0.03) 50.5%,
              transparent 50.5%
            ),
            radial-gradient(ellipse 50% 40% at 80% 30%, rgba(46, 207, 154, 0.08), transparent 70%);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 48px 24px;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 48px;
          align-items: center;
        }

        .brand {
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 20px;
          animation: fade-up 0.7s ease both;
        }

        .hero-copy h1 {
          font-size: clamp(48px, 8vw, 76px);
          font-weight: 800;
          line-height: 0.95;
          margin-bottom: 20px;
          animation: fade-up 0.7s ease 0.08s both;
        }

        .role {
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          margin-bottom: 20px;
          animation: fade-up 0.7s ease 0.14s both;
        }

        .lede {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 420px;
          line-height: 1.7;
          margin-bottom: 32px;
          animation: fade-up 0.7s ease 0.2s both;
        }

        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          animation: fade-up 0.7s ease 0.28s both;
        }

        .hero-visual {
          animation: fade-up 0.9s ease 0.2s both;
          min-height: 340px;
        }

        .work {
          padding: var(--section-padding) 0;
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
        }

        .work-list {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border);
        }

        .work-row {
          display: grid;
          grid-template-columns: 56px 1fr 40px;
          gap: 24px;
          align-items: start;
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
          color: inherit;
          transition: background 0.25s ease;
        }

        .work-row:hover {
          color: inherit;
          background: var(--primary-soft);
        }

        .work-row:hover .work-arrow {
          color: var(--primary);
          transform: translateX(4px);
        }

        .work-index {
          font-size: 13px;
          color: var(--text-muted);
          padding-top: 6px;
        }

        .work-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 20px;
          margin-bottom: 10px;
        }

        .work-cat {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .work-arch {
          font-size: 11px;
          color: var(--text-muted);
        }

        .work-body h3 {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .work-body p {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 640px;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .work-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .work-tags span {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 4px 8px;
        }

        .work-arrow {
          font-size: 22px;
          color: var(--text-muted);
          transition: all 0.25s ease;
          padding-top: 4px;
          text-align: right;
        }

        .work-footer {
          margin-top: 40px;
        }

        .focus {
          padding: var(--section-padding) 0;
          background: var(--bg-canvas-primary);
        }

        .focus-rows {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid var(--border);
        }

        .focus-row {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 20px;
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
        }

        .focus-num {
          font-size: 13px;
          color: var(--primary);
          padding-top: 4px;
        }

        .focus-row h3 {
          font-size: 20px;
          margin-bottom: 6px;
        }

        .focus-row p {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 560px;
          line-height: 1.65;
        }

        .cta {
          padding: var(--section-padding) 0;
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
        }

        .cta-inner {
          max-width: 560px;
        }

        .cta-inner h2 {
          font-size: clamp(28px, 4vw, 36px);
          margin-bottom: 14px;
        }

        .cta-inner p {
          color: var(--text-secondary);
          margin-bottom: 28px;
          line-height: 1.7;
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding-top: 40px;
            padding-bottom: 40px;
            gap: 36px;
          }

          .hero-visual {
            min-height: 280px;
          }

          .work-row {
            grid-template-columns: 40px 1fr;
          }

          .work-arrow {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-copy h1 {
            font-size: 44px;
          }

          .focus-row {
            grid-template-columns: 40px 1fr;
          }
        }
      `}</style>
    </>
  );
}
