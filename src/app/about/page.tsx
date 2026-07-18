'use client';

import Link from 'next/link';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import ResumeModal from '@/components/ResumeModal';

const stack = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python'],
  },
  {
    label: 'Backend & Frameworks',
    items: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'Django', 'Socket.io'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Knex.js', 'Database Design'],
  },
  {
    label: 'Architecture & Systems',
    items: ['Microservices', 'System Design', 'JWT / RBAC', 'gRPC', 'Auth Systems'],
  },
  {
    label: 'DevOps & Cloud',
    items: ['AWS', 'DigitalOcean', 'CI/CD', 'Git', 'GitHub'],
  },
  {
    label: 'Frontend',
    items: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'],
  },
];

const timeline = [
  {
    year: '02/2026 – Present',
    role: 'Backend Engineer',
    company: 'PsychSpace',
    location: 'Canada',
    description:
      'Architected two interoperating services: a NestJS/MongoDB product API and a Django/PostgreSQL scoring engine connected with RS256-signed service JWTs. Designed the core data model and built psychometric scoring, RBAC, S3-compatible uploads, Swagger documentation, and structured logging.',
  },
  {
    year: '12/2024 – 01/2026',
    role: 'Backend Engineer · Engineering Team Lead',
    company: 'Claymore Limited',
    location: 'Lagos, Nigeria',
    description:
      'Led sprint planning, task allocation, and code review while architecting Stakeholders Connect. Built REST APIs, Socket.io chat and notifications, JWT/RBAC, optimized MongoDB schemas and queries, and owned AWS CI/CD with Joi validation and error handling.',
  },
  {
    year: '01/2024 – 01/2025',
    role: 'Backend Developer',
    company: 'SustainaFinance DataNexus',
    location: 'Esch-sur-Alzette, Luxembourg',
    description:
      'Built pipelines that ingest, harmonize, and validate ESG scores, financial statements, and sustainability metrics across countries. Implemented real-time analysis on scalable data architecture with security and governance controls.',
  },
  {
    year: '01/2024 – 03/2025',
    role: 'Backend Developer',
    company: 'Padding Technologies',
    location: 'Lagos, Nigeria',
    description:
      'Built scalable Node.js, Express, and PostgreSQL services for Evolution and Officing. Designed relational schemas and complex SQL queries, wrote unit and integration tests, maintained technical documentation, and shipped features with product and frontend teams.',
  },
  {
    year: '06/2023 – 10/2023',
    role: 'Backend Developer',
    company: 'HNG Tech',
    location: '',
    description:
      'Built the backend server for a screen-recording Chrome extension with efficient real-time data handling. Contributed to authentication and payment microservices for a large e-commerce platform.',
  },
];

export default function AboutPage() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <Reveal>
            <p className="section-label">About</p>
            <h1>
              Backend engineer
              <br />
              building scalable,
              <br />
              secure systems
            </h1>
            <p className="lede">
              I&apos;m Fredrick — based in Abuja, Nigeria. I design server-side
              architectures, REST APIs, database optimization, and auth systems.
              Core stack: Node.js, Express, NestJS, MongoDB, PostgreSQL, and FastAPI,
              with React when frontend integration is needed. Experienced leading
              engineering teams through delivery.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="stack-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Skills</p>
            <h2 className="section-title">What I work with</h2>
          </Reveal>
          <div className="stack-grid">
            {stack.map((group, i) => (
              <Reveal key={group.label} delay={i * 50}>
                <div className="stack-group">
                  <h3 className="mono">{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <Reveal>
            <p className="section-label">Experience</p>
            <h2 className="section-title">Where I&apos;ve built</h2>
          </Reveal>
          <div className="timeline">
            {timeline.map((item, i) => (
              <Reveal key={`${item.company}-${item.year}`} delay={i * 40}>
                <article className="timeline-item">
                  <div className="meta">
                    <span className="year mono">{item.year}</span>
                    {item.location ? (
                      <span className="loc mono">{item.location}</span>
                    ) : null}
                  </div>
                  <div>
                    <h3>
                      {item.role}
                      <span className="company"> · {item.company}</span>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="education">
        <div className="container">
          <Reveal>
            <p className="section-label">Education</p>
            <h2 className="section-title">BSc, Computer Science</h2>
            <p className="edu-meta mono">
              Veritas University · 10/2022 – Present · Abuja, Nigeria
            </p>
            <p className="edu-desc">
              Coursework in Algorithms &amp; Data Structures, Database Systems, and
              Software Engineering.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="principles">
        <div className="container">
          <Reveal>
            <p className="section-label">Approach</p>
            <h2 className="section-title">How I work</h2>
          </Reveal>
          <div className="principle-list">
            {[
              {
                n: '01',
                title: 'Design for failure',
                text: 'Retries, timeouts, and clear ownership when a dependency drops.',
              },
              {
                n: '02',
                title: 'Make contracts explicit',
                text: 'APIs and events that other services can depend on without guesswork.',
              },
              {
                n: '03',
                title: 'Measure before guessing',
                text: 'Logs, metrics, and query plans beat intuition when latency slips.',
              },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <div className="principle">
                  <span className="n mono">{p.n}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="about-cta">
              <Link href="/contact" className="btn btn-primary">
                Get in touch
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                See projects
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setResumeOpen(true)}
              >
                View resume
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <style jsx>{`
        .about-page {
          min-height: 100vh;
        }

        .about-hero {
          padding: 80px 0 72px;
          background: var(--bg-hero);
        }

        .about-hero h1 {
          font-size: clamp(36px, 6vw, 56px);
          margin-bottom: 24px;
          max-width: 720px;
        }

        .lede {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 580px;
          line-height: 1.75;
        }

        .stack-section {
          padding: var(--section-padding) 0;
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
        }

        .stack-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
        }

        .stack-group {
          padding: 28px 24px 28px 0;
          border-bottom: 1px solid var(--border);
        }

        .stack-group h3 {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 16px;
          font-weight: 500;
        }

        .stack-group ul {
          list-style: none;
        }

        .stack-group li {
          font-size: 15px;
          padding: 6px 0;
          color: var(--text-primary);
        }

        .timeline-section {
          padding: var(--section-padding) 0;
          background: var(--bg-canvas-primary);
        }

        .timeline {
          margin-top: 40px;
          max-width: 860px;
          border-top: 1px solid var(--border);
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
        }

        .meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 4px;
        }

        .year {
          font-size: 12px;
          color: var(--text-muted);
        }

        .loc {
          font-size: 11px;
          color: var(--primary);
        }

        .timeline-item h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }

        .company {
          font-weight: 500;
          color: var(--text-secondary);
          font-family: var(--font-body), sans-serif;
          font-size: 16px;
        }

        .timeline-item p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .education {
          padding: 64px 0;
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
        }

        .edu-meta {
          font-size: 13px;
          color: var(--primary);
          margin: 8px 0 12px;
        }

        .edu-desc {
          color: var(--text-secondary);
          max-width: 520px;
        }

        .principles {
          padding: var(--section-padding) 0;
          background: var(--bg-canvas-primary);
          border-top: 1px solid var(--border);
        }

        .principle-list {
          margin-top: 40px;
          border-top: 1px solid var(--border);
        }

        .principle {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 20px;
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
        }

        .n {
          font-size: 13px;
          color: var(--primary);
          padding-top: 4px;
        }

        .principle h3 {
          font-size: 20px;
          margin-bottom: 6px;
        }

        .principle p {
          font-size: 15px;
          color: var(--text-secondary);
          max-width: 480px;
        }

        .about-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 40px;
        }

        @media (max-width: 900px) {
          .stack-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stack-grid {
            grid-template-columns: 1fr;
          }

          .timeline-item {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
