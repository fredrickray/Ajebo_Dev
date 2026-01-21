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
            <div className="hero-badge">👋 Welcome to my portfolio</div>

            <h1 className="hero-title">
              Full-Stack<br />
              Developer<br />
              <span className="text-accent">&amp; Problem Solver</span>
            </h1>

            <p className="hero-description">
              Building scalable web applications and crafting exceptional
              digital experiences with modern technologies and elegant code.
            </p>

            <div className="hero-cta">
              <Link href="/projects" className="btn btn-primary">
                View Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>

            <div className="hero-social">
              <span className="social-label">Follow me:</span>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
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

          <div className="hero-visual">
            <div className="experience-card">
              <div className="exp-number">4+</div>
              <div className="exp-label">Years</div>
              <div className="exp-sublabel">of experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stats-grid">
            <StatCard value="50" suffix="+" label="Projects Completed" delay={0} />
            <StatCard value="30" suffix="+" label="Happy Clients" delay={100} />
            <StatCard value="1200" suffix="+" label="GitHub Contributions" delay={200} />
            <StatCard value="15" suffix="+" label="Technologies" delay={300} />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured">
        <div className="featured-container">
          <div className="section-header">
            <span className="section-badge">Portfolio</span>
            <h2 className="section-title">Featured Lab Work</h2>
            <p className="section-desc">
              A curated selection of my recent projects showcasing creativity and technical excellence.
            </p>
          </div>

          <div className="featured-grid">
            <div className="project-item featured">
              <div className="project-image" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}></div>
              <div className="project-info">
                <span className="project-category">Web Application</span>
                <h3>Nova Stack</h3>
                <p>A modern full-stack application with real-time features</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
              </div>
            </div>

            <div className="project-item">
              <div className="project-image" style={{ background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)' }}></div>
              <div className="project-info">
                <span className="project-category">UI/UX Design</span>
                <h3>Cryptoken</h3>
                <p>Cryptocurrency dashboard design</p>
                <div className="project-tags">
                  <span>Figma</span>
                  <span>React</span>
                </div>
              </div>
            </div>

            <div className="project-item">
              <div className="project-image" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)' }}></div>
              <div className="project-info">
                <span className="project-category">Mobile App</span>
                <h3>Active Flow</h3>
                <p>Fitness tracking application</p>
                <div className="project-tags">
                  <span>React Native</span>
                  <span>Firebase</span>
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

      {/* Skills Preview */}
      <section className="skills-preview">
        <div className="skills-container">
          <div className="section-header">
            <span className="section-badge">Expertise</span>
            <h2 className="section-title">Technologies I Work With</h2>
          </div>

          <div className="tech-grid">
            {[
              { name: 'React', color: '#61DAFB' },
              { name: 'Next.js', color: '#FFFFFF' },
              { name: 'TypeScript', color: '#3178C6' },
              { name: 'Node.js', color: '#339933' },
              { name: 'Python', color: '#3776AB' },
              { name: 'PostgreSQL', color: '#4169E1' },
              { name: 'MongoDB', color: '#47A248' },
              { name: 'Docker', color: '#2496ED' },
            ].map((tech) => (
              <div key={tech.name} className="tech-item">
                <div className="tech-icon" style={{ color: tech.color }}>
                  {'</>'}
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>

          <div className="skills-cta">
            <Link href="/about" className="btn btn-secondary">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Let&apos;s Build Something Amazing</h2>
            <p>Have a project in mind? I&apos;d love to hear about it and help bring your ideas to life.</p>
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
          padding: 40px 0;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 80%;
          height: 150%;
          background: radial-gradient(ellipse, rgba(10, 186, 181, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(10, 186, 181, 0.1);
          border: 1px solid var(--border);
          border-radius: 30px;
          color: var(--primary);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .text-accent {
          color: var(--primary);
        }

        .hero-description {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 480px;
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .hero-social {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .social-label {
          color: var(--text-muted);
          font-size: 14px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: var(--primary);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .hero-visual {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .experience-card {
          width: 180px;
          height: 180px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: var(--shadow-card);
        }

        .exp-number {
          font-size: 56px;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .exp-label {
          font-size: 24px;
          font-weight: 600;
          margin-top: 4px;
        }

        .exp-sublabel {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Stats Section */
        .stats {
          padding: 60px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .stats-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* Featured Section */
        .featured {
          padding: 100px 0;
          background: var(--bg-primary);
        }

        .featured-container {
          max-width: var(--container-max);
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
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .section-title {
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .section-desc {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
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
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .project-item.featured {
          grid-row: span 2;
        }

        .project-image {
          height: 180px;
        }

        .project-item.featured .project-image {
          height: 60%;
        }

        .project-info {
          padding: 20px;
        }

        .project-category {
          font-size: 12px;
          color: var(--primary);
          font-weight: 500;
          text-transform: uppercase;
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
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .project-tags span {
          padding: 4px 10px;
          background: var(--bg-secondary);
          border-radius: 4px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .featured-cta {
          text-align: center;
        }

        /* Skills Preview */
        .skills-preview {
          padding: 100px 0;
          background: var(--bg-secondary);
        }

        .skills-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
        }

        .tech-icon {
          font-size: 32px;
          font-family: monospace;
          margin-bottom: 12px;
        }

        .tech-name {
          font-size: 14px;
          font-weight: 500;
        }

        .skills-cta {
          text-align: center;
        }

        /* CTA Section */
        .cta {
          padding: 100px 0;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        .cta-container {
          max-width: var(--container-max);
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
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-visual {
            order: -1;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .project-item.featured {
            grid-row: span 1;
          }

          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .featured-grid {
            grid-template-columns: 1fr;
          }

          .hero-cta {
            flex-direction: column;
          }

          .section-title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}
