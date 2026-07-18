'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ArchFlow from '@/components/ArchFlow';
import SchemaCanvas from '@/components/SchemaCanvas';
import type { SystemDesign } from '@/data/systemDesigns';

export type ProjectDetailData = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  docsUrl?: string;
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
};

type SectionDef = {
  id: string;
  label: string;
  index: string;
};

export default function ProjectDetail({
  project,
  design,
}: {
  project: ProjectDetailData;
  design: SystemDesign;
}) {
  const hasDatabase = Boolean(design.schema || project.databaseDesign);

  const sections: SectionDef[] = [
    { id: 'architecture', label: 'System Architecture', index: '01' },
    ...(hasDatabase ? [{ id: 'database', label: 'Database Design', index: '02' }] : []),
    { id: 'challenges', label: 'Engineering Challenges', index: hasDatabase ? '03' : '02' },
    { id: 'tradeoffs', label: 'Trade-offs & Decisions', index: hasDatabase ? '04' : '03' },
  ];

  const [activeId, setActiveId] = useState(sections[0].id);
  const scrollRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top of the pane that is visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { root, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // sections are static per project page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <div className="project-detail">
      <header className="detail-header">
        <div className="container">
          <div className="breadcrumb mono">
            <Link href="/projects">Projects</Link>
            <span className="sep">/</span>
            <span>{project.title}</span>
          </div>

          <h1>{project.title}</h1>
          <p className="detail-desc">{project.description}</p>

          <div className="header-row">
            <div className="detail-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag mono">
                  {tag}
                </span>
              ))}
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                GitHub
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 12L12 4M12 4H6M12 4v6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="detail-layout">
        <aside className="detail-sidebar">
          <p className="sidebar-label mono">CONTENTS</p>
          <nav className="sidebar-nav" aria-label="Project sections">
            {sections.map((section, i) => (
              <button
                key={section.id}
                className={`side-item ${activeId === section.id ? 'active' : ''} ${
                  i < activeIndex ? 'passed' : ''
                }`}
                onClick={() => scrollTo(section.id)}
              >
                <span className="side-index mono">{section.index}</span>
                <span className="side-text">{section.label}</span>
                <span className="side-track" aria-hidden="true" />
              </button>
            ))}
          </nav>
          <p className="sidebar-progress mono">
            {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
          </p>
        </aside>

        <main className="detail-scroll" ref={scrollRef}>
          <section
            id="architecture"
            className="detail-section"
            ref={(el) => {
              sectionRefs.current['architecture'] = el;
            }}
          >
            <div className="section-head">
              <span className="head-index mono">01</span>
              <h2>System Architecture</h2>
            </div>
            <ArchFlow flow={design.flow} />
            <p className="section-note">{design.flow.caption}</p>
          </section>

          {hasDatabase && (
            <section
              id="database"
              className="detail-section"
              ref={(el) => {
                sectionRefs.current['database'] = el;
              }}
            >
              <div className="section-head">
                <span className="head-index mono">02</span>
                <h2>Database Design</h2>
              </div>
              {design.schema ? (
                <>
                  <SchemaCanvas schema={design.schema} />
                  <p className="section-note">{design.schema.caption}</p>
                </>
              ) : (
                project.databaseDesign && (
                  <>
                    <div className="code-block">
                      <div className="code-head mono">{project.databaseDesign.title}</div>
                      <pre>
                        <code>{project.databaseDesign.code}</code>
                      </pre>
                    </div>
                    <p className="section-note">{project.databaseDesign.description}</p>
                  </>
                )
              )}
            </section>
          )}

          <section
            id="challenges"
            className="detail-section"
            ref={(el) => {
              sectionRefs.current['challenges'] = el;
            }}
          >
            <div className="section-head">
              <span className="head-index mono">{hasDatabase ? '03' : '02'}</span>
              <h2>Engineering Challenges</h2>
            </div>
            <div className="challenge-list">
              {project.challenges.map((challenge, i) => (
                <div key={challenge.title} className="challenge-row">
                  <span className="challenge-index mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="tradeoffs"
            className="detail-section"
            ref={(el) => {
              sectionRefs.current['tradeoffs'] = el;
            }}
          >
            <div className="section-head">
              <span className="head-index mono">{hasDatabase ? '04' : '03'}</span>
              <h2>Trade-offs &amp; Decisions</h2>
            </div>
            <div className="tradeoff-table">
              <div className="tradeoff-head mono">
                <span>Chose</span>
                <span>Over</span>
                <span>Because</span>
              </div>
              {project.tradeoffs.map((trade) => (
                <div key={trade.tech} className="tradeoff-row">
                  <span className="t-tech">{trade.tech}</span>
                  <span className="t-alt">{trade.alternative}</span>
                  <span className="t-reason">{trade.reason}</span>
                </div>
              ))}
            </div>

            <div className="detail-cta">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Explore the codebase
                </a>
              )}
              <Link href="/contact" className="btn btn-secondary">
                Get in touch
              </Link>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .project-detail {
          background: var(--bg-canvas-primary);
          color: var(--text-primary);
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- header ---------- */
        .detail-header {
          padding: 48px 0 36px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-canvas-secondary);
        }

        .breadcrumb {
          display: flex;
          gap: 10px;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .breadcrumb :global(a) {
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .breadcrumb :global(a:hover) {
          color: var(--primary);
        }

        .sep {
          opacity: 0.5;
        }

        .detail-header h1 {
          font-size: clamp(30px, 4.5vw, 44px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }

        .detail-desc {
          max-width: 680px;
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 22px;
        }

        .header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          font-size: 11px;
          padding: 5px 10px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-secondary);
          background: var(--primary-soft);
        }

        /* ---------- layout ---------- */
        .detail-layout {
          display: flex;
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .detail-sidebar {
          width: 250px;
          flex-shrink: 0;
          padding: 40px 24px 40px;
          border-right: 1px solid var(--border);
          position: sticky;
          top: var(--nav-height);
          align-self: flex-start;
          height: calc(100vh - var(--nav-height));
          display: flex;
          flex-direction: column;
        }

        .sidebar-label {
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--text-muted);
          margin-bottom: 18px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .side-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 12px 12px 16px;
          background: none;
          border: none;
          text-align: left;
          font-size: 13.5px;
          font-family: inherit;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.25s ease;
        }

        .side-track {
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--border);
          transition: background 0.25s ease;
        }

        .side-item:hover {
          color: var(--text-primary);
        }

        .side-item.passed {
          color: var(--text-secondary);
        }

        .side-item.active {
          color: var(--text-primary);
        }

        .side-item.active .side-track {
          background: var(--primary);
        }

        .side-item.active .side-index {
          color: var(--primary);
        }

        .side-index {
          font-size: 11px;
          color: var(--text-muted);
          transition: color 0.25s ease;
        }

        .sidebar-progress {
          margin-top: auto;
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        /* ---------- scroll pane ---------- */
        .detail-scroll {
          flex: 1;
          min-width: 0;
          height: calc(100vh - var(--nav-height));
          overflow-y: auto;
          scroll-snap-type: y proximity;
          scroll-behavior: smooth;
          padding: 0 8px 0 40px;
        }

        .detail-section {
          scroll-snap-align: start;
          scroll-margin-top: 4px;
          min-height: calc(100vh - var(--nav-height));
          padding: 44px 0 56px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-bottom: 1px solid var(--border);
        }

        .detail-section:last-child {
          border-bottom: none;
        }

        .section-head {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 26px;
        }

        .head-index {
          font-size: 12px;
          color: var(--primary);
        }

        .section-head h2 {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .section-note {
          margin-top: 18px;
          max-width: 720px;
          font-size: 14px;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        /* ---------- code fallback ---------- */
        .code-block {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--bg-card);
        }

        .code-head {
          padding: 10px 16px;
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }

        .code-block pre {
          margin: 0;
          padding: 20px;
          overflow-x: auto;
          font-size: 13px;
          line-height: 1.6;
        }

        .code-block code {
          font-family: var(--font-mono), monospace;
          color: var(--text-secondary);
        }

        /* ---------- challenges ---------- */
        .challenge-list {
          display: flex;
          flex-direction: column;
        }

        .challenge-row {
          display: flex;
          gap: 20px;
          padding: 22px 0;
          border-bottom: 1px solid var(--border);
        }

        .challenge-row:last-child {
          border-bottom: none;
        }

        .challenge-index {
          font-size: 12px;
          color: var(--primary);
          padding-top: 3px;
        }

        .challenge-row h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .challenge-row p {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 640px;
        }

        /* ---------- tradeoffs ---------- */
        .tradeoff-table {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .tradeoff-head,
        .tradeoff-row {
          display: grid;
          grid-template-columns: 160px 150px 1fr;
          gap: 20px;
          padding: 14px 20px;
        }

        .tradeoff-head {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
        }

        .tradeoff-row {
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }

        .tradeoff-row:last-child {
          border-bottom: none;
        }

        .t-tech {
          color: var(--primary);
          font-weight: 600;
        }

        .t-alt {
          color: var(--text-muted);
        }

        .t-reason {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .detail-cta {
          display: flex;
          gap: 14px;
          margin-top: 44px;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1024px) {
          .detail-layout {
            flex-direction: column;
          }

          .detail-sidebar {
            position: sticky;
            top: var(--nav-height);
            z-index: 40;
            width: 100%;
            height: auto;
            flex-direction: row;
            align-items: center;
            gap: 4px;
            padding: 10px 16px;
            border-right: none;
            border-bottom: 1px solid var(--border);
            background: var(--navbar-bg);
            backdrop-filter: blur(12px);
            overflow-x: auto;
          }

          .sidebar-label,
          .sidebar-progress {
            display: none;
          }

          .sidebar-nav {
            flex-direction: row;
            gap: 4px;
          }

          .side-item {
            padding: 8px 12px;
            white-space: nowrap;
            font-size: 12.5px;
          }

          .side-track {
            top: auto;
            bottom: 0;
            left: 12px;
            right: 12px;
            width: auto;
            height: 2px;
          }

          .detail-scroll {
            height: auto;
            overflow-y: visible;
            scroll-snap-type: none;
            padding: 0 24px;
          }

          .detail-section {
            min-height: 0;
            scroll-margin-top: calc(var(--nav-height) + 56px);
          }
        }

        @media (max-width: 640px) {
          .tradeoff-head,
          .tradeoff-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .detail-cta {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
