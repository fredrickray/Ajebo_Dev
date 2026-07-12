'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { projects, categories, type Project } from '@/data/projects';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [expanded, setExpanded] = useState<string | null>('propspacex');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <Reveal>
            <p className="section-label">Work</p>
            <h1>
              Systems I&apos;ve
              <br />
              designed and shipped
            </h1>
            <p className="hero-desc">
              Distributed backends, developer tools, and ML services — grouped the way
              they actually run in production.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="filter-bar">
        <div className="container">
          <div className="filters" role="tablist" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`filter ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="list-section">
        <div className="container">
          <div className="project-list">
            {filtered.map((project, i) => (
              <Reveal key={project.slug} delay={i * 50}>
                <ProjectBlock
                  project={project}
                  expanded={expanded === project.slug}
                  onToggle={() =>
                    setExpanded((prev) => (prev === project.slug ? null : project.slug))
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-cta">
        <div className="container">
          <Reveal>
            <h2>Need a backend built properly?</h2>
            <p>From gateway design to queues and data stores — let&apos;s talk scope.</p>
            <Link href="/contact" className="btn btn-primary">
              Discuss a project
            </Link>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .projects-page {
          min-height: 100vh;
        }

        .projects-hero {
          padding: 80px 0 48px;
          background: var(--bg-hero);
        }

        .projects-hero h1 {
          font-size: clamp(36px, 6vw, 56px);
          margin-bottom: 16px;
        }

        .hero-desc {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 520px;
          line-height: 1.7;
        }

        .filter-bar {
          position: sticky;
          top: var(--nav-height);
          z-index: 50;
          padding: 16px 0;
          background: var(--navbar-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.04em;
          padding: 8px 14px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius);
          transition: all 0.2s ease;
        }

        .filter:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .filter.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
        }

        :global([data-theme='dark']) .filter.active {
          color: #0b0e12;
        }

        .list-section {
          padding: 48px 0 80px;
          background: var(--bg-canvas-primary);
        }

        .project-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .projects-cta {
          padding: 80px 0;
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
        }

        .projects-cta h2 {
          font-size: clamp(28px, 4vw, 36px);
          margin-bottom: 12px;
        }

        .projects-cta p {
          color: var(--text-secondary);
          margin-bottom: 28px;
          max-width: 440px;
        }
      `}</style>
    </div>
  );
}

function ProjectBlock({
  project,
  expanded,
  onToggle,
}: {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}) {
  const detailSlug =
    project.slug === 'propspacex'
      ? 'propspacex-gateway'
      : project.slug;
  const hasServices = Boolean(project.services?.length);

  return (
    <article className={`block ${expanded ? 'open' : ''}`}>
      <div className="block-main">
        <button
          type="button"
          className="block-header"
          onClick={hasServices ? onToggle : undefined}
          aria-expanded={hasServices ? expanded : undefined}
        >
          <div className="block-top">
            <span className="cat mono">{project.category}</span>
            {hasServices && (
              <span className="toggle mono">{expanded ? '− services' : '+ services'}</span>
            )}
          </div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {project.architecture && (
            <div className="arch mono">
              {project.architecture.map((node, idx) => (
                <span key={node}>
                  {node}
                  {idx < project.architecture!.length - 1 && (
                    <span className="sep"> → </span>
                  )}
                </span>
              ))}
            </div>
          )}
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </button>

        <div className="actions">
          <Link href={`/projects/${detailSlug}`} className="btn btn-secondary btn-sm">
            Details
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="source mono"
          >
            Source ↗
          </a>
        </div>
      </div>

      {hasServices && expanded && (
        <div className="services">
          {project.services!.map((service) => (
            <div key={service.slug} className="service">
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="service-actions">
                <Link href={`/projects/${service.slug}`} className="btn btn-secondary btn-sm">
                  Details
                </Link>
                <a
                  href={service.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source mono"
                >
                  Source ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .block {
          border: 1px solid var(--border);
          background: var(--bg-card);
          transition: border-color 0.25s ease;
        }

        .block.open,
        .block:hover {
          border-color: var(--border-hover);
        }

        .block-main {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          padding: 28px;
          align-items: start;
        }

        .block-header {
          background: none;
          border: none;
          text-align: left;
          cursor: ${hasServices ? 'pointer' : 'default'};
          color: inherit;
          width: 100%;
          padding: 0;
          font: inherit;
        }

        .block-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 10px;
        }

        .cat {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .toggle {
          font-size: 11px;
          color: var(--text-muted);
        }

        h2 {
          font-size: 26px;
          margin-bottom: 10px;
        }

        p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 640px;
          margin-bottom: 14px;
        }

        .arch {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 14px;
          line-height: 1.6;
        }

        .sep {
          color: var(--primary);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tags span {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 3px 8px;
        }

        .actions,
        .service-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
        }

        .source {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .source:hover {
          color: var(--primary);
        }

        .services {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
        }

        .service {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          padding: 20px 28px;
          border-bottom: 1px solid var(--border);
          align-items: start;
        }

        .service:last-child {
          border-bottom: none;
        }

        .service h3 {
          font-size: 16px;
          margin-bottom: 6px;
        }

        .service p {
          font-size: 14px;
          margin-bottom: 10px;
        }

        @media (max-width: 720px) {
          .block-main,
          .service {
            grid-template-columns: 1fr;
          }

          .actions,
          .service-actions {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </article>
  );
}
