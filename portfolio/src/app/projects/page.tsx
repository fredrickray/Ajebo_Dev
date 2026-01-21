'use client';

import { useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Nova Stack',
    description: 'A modern full-stack application with real-time collaboration features, built with cutting-edge technologies.',
    image: '/projects/nova-stack.jpg',
    category: 'Web Application',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    featured: true,
    link: '#',
  },
  {
    id: 2,
    title: 'Cryptoken',
    description: 'Cryptocurrency dashboard with real-time price tracking and portfolio management.',
    image: '/projects/cryptoken.jpg',
    category: 'UI/UX Design',
    tags: ['Figma', 'React', 'Chart.js'],
    featured: false,
    link: '#',
  },
  {
    id: 3,
    title: 'Active Flow',
    description: 'Fitness tracking application with personalized workout plans and progress analytics.',
    image: '/projects/active-flow.jpg',
    category: 'Mobile App',
    tags: ['React Native', 'Firebase', 'Redux'],
    featured: false,
    link: '#',
  },
  {
    id: 4,
    title: 'Sentinel AI',
    description: 'AI-powered security monitoring system with anomaly detection and real-time alerts.',
    image: '/projects/sentinel.jpg',
    category: 'AI/ML',
    tags: ['Python', 'TensorFlow', 'FastAPI'],
    featured: true,
    link: '#',
  },
  {
    id: 5,
    title: 'Edge Engine',
    description: 'High-performance game engine with advanced physics simulation and rendering.',
    image: '/projects/edge-engine.jpg',
    category: 'Systems',
    tags: ['C++', 'Vulkan', 'CUDA'],
    featured: false,
    link: '#',
  },
  {
    id: 6,
    title: 'Terra Console',
    description: 'Cloud infrastructure management console with multi-provider support.',
    image: '/projects/terra.jpg',
    category: 'DevOps',
    tags: ['TypeScript', 'AWS', 'Terraform'],
    featured: false,
    link: '#',
  },
];

const categories = ['All', 'Web Application', 'Database Design', 'Product Development', 'DevOps'];

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
          <span className="section-badge">LATEST PROJECTS</span>
          <h1>Featured Lab Work</h1>
          <p>Explore my portfolio of projects showcasing creativity, technical expertise, and problem-solving skills.</p>
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
                <div className="project-image">
                  <div
                    className="image-placeholder"
                    style={{
                      background: `linear-gradient(135deg, ${project.category === 'Web Application' ? '#1a1a2e, #16213e' :
                        project.category === 'Mobile App' ? '#1e3a5f, #0d1b2a' :
                          project.category === 'UI/UX Design' ? '#0f3460, #16213e' :
                            project.category === 'AI/ML' ? '#2d1b69, #11001c' :
                              project.category === 'Systems' ? '#1a1a2e, #2d132c' :
                                '#0f2027, #203a43'
                        })`
                    }}
                  >
                    <div className="image-icon">{'</>'}</div>
                  </div>

                  <div className={`project-overlay ${hoveredProject === project.id ? 'visible' : ''}`}>
                    <a href={project.link} className="view-btn">
                      View Project
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    {project.featured && <span className="featured-badge">Featured</span>}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
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
            <h2>Have a Project in Mind?</h2>
            <p>Let&apos;s collaborate and bring your ideas to life with cutting-edge technology.</p>
            <a href="/contact" className="btn btn-primary">
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-page {
          min-height: 100vh;
        }

        .container {
          max-width: var(--container-max);
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
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .projects-hero p {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Filter */
        .projects-filter {
          padding: 30px 0;
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
          color: var(--bg-primary);
        }

        /* Projects Grid */
        .projects-grid-section {
          padding: 60px 0;
          background: var(--bg-primary);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .project-card.featured {
          grid-column: span 2;
        }

        .project-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .project-card.featured .project-image {
          height: 300px;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-icon {
          font-size: 48px;
          font-family: monospace;
          color: var(--primary);
          opacity: 0.3;
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(13, 27, 30, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-overlay.visible {
          opacity: 1;
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--primary);
          color: var(--bg-primary);
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: var(--primary-light);
          transform: scale(1.05);
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
          font-size: 12px;
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .featured-badge {
          padding: 4px 10px;
          background: rgba(10, 186, 181, 0.2);
          color: var(--primary);
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
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
        }

        .tag {
          padding: 6px 12px;
          background: var(--bg-secondary);
          color: var(--text-muted);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
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
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .project-card.featured {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card.featured {
            grid-column: span 1;
          }

          .filter-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 10px;
          }

          .filter-tab {
            white-space: nowrap;
          }

          .cta-box {
            padding: 40px 24px;
          }
        }
      `}</style>
    </div>
  );
}
