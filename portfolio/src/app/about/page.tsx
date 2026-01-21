'use client';

const skills = {
  backend: [
    'Node.js', 'Express', 'NestJS', 'Python', 'FastAPI', 'Django',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs'
  ],
  infrastructure: [
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
    'GitHub Actions', 'GitLab CI', 'Nginx', 'Load Balancing'
  ],
  architecture: [
    'Microservices', 'Event-Driven Architecture', 'Message Queues',
    'Kafka', 'RabbitMQ', 'System Design', 'API Gateway Patterns'
  ],
};

const functionalStack = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'Go', 'SQL'] },
  { category: 'Frameworks', items: ['NestJS', 'Express', 'FastAPI', 'Django'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { category: 'Architecture', items: ['Microservices', 'Event-Driven', 'Serverless'] },
  { category: 'Auth & Security', items: ['OAuth2', 'JWT', 'RBAC', 'API Keys'] },
  { category: 'DevOps & Quality', items: ['Docker', 'K8s', 'CI/CD', 'Testing'] },
];

const timeline = [
  {
    year: '12/2024 – present',
    role: 'Backend Engineer | Team Lead',
    company: 'Claymore Limited',
    description: 'Leading backend architecture decisions and mentoring junior engineers. Designing scalable microservices and implementing CI/CD pipelines.',
    highlights: ['Microservices', 'Team Leadership', 'Architecture'],
  },
  {
    year: '07/2024 – 09/2024',
    role: 'Backend Engineer (Intern)',
    company: 'TechVibes Ltd.',
    description: 'Built RESTful APIs and integrated third-party services. Optimized database queries reducing response times by 40%.',
    highlights: ['REST APIs', 'Database Optimization'],
  },
  {
    year: '01/2024 – 12/2024',
    role: 'Backend Engineer',
    company: 'SustainaFinance Data Nexus',
    description: 'Developed data processing pipelines and real-time analytics systems for financial data aggregation.',
    highlights: ['Data Pipelines', 'Real-time Analytics'],
  },
  {
    year: '01/2024 – 12/2024',
    role: 'Backend Developer',
    company: 'Padding Technologies',
    description: 'Implemented authentication systems and payment integrations. Built webhook handlers for event processing.',
    highlights: ['Auth Systems', 'Payment Integration'],
  },
  {
    year: '06/2023 – 10/2023',
    role: 'Backend Developer (Intern)',
    company: 'HNG Tech',
    description: 'Participated in intensive backend development bootcamp. Built collaborative projects with distributed teams.',
    highlights: ['Node.js', 'PostgreSQL', 'API Design'],
  },
  {
    year: '06/2022 – 09/2022',
    role: 'FullStack Developer (Intern)',
    company: 'Elatech Limited',
    description: 'Developed full-stack applications with React and Node.js. First exposure to production deployments.',
    highlights: ['Full Stack', 'React', 'Node.js'],
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <span className="section-badge">ABOUT ME</span>
            <h1>
              Technical Credibility
            </h1>
            <p className="hero-desc">
              A results-driven backend engineer with experience designing, building,
              and deploying production-grade systems. I specialize in creating
              scalable APIs, optimizing database performance, and architecting
              distributed systems that handle real-world traffic.
            </p>
          </div>
        </div>
      </section>

      {/* Functional Stack */}
      <section className="stack-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FUNCTIONAL STACK</span>
            <h2>Core Technologies</h2>
          </div>

          <div className="stack-grid">
            {functionalStack.map((stack, idx) => (
              <div key={idx} className="stack-card">
                <h3>{stack.category}</h3>
                <div className="stack-items">
                  {stack.items.map((item, i) => (
                    <span key={i} className="stack-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">PROFICIENCY</span>
            <h2>Technical Skills</h2>
          </div>

          <div className="skills-grid">
            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skill-tags">
                {skills.backend.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3>Infrastructure & DevOps</h3>
              <div className="skill-tags">
                {skills.infrastructure.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3>Architecture & Design</h3>
              <div className="skill-tags">
                {skills.architecture.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">PROFESSIONAL IMPACT</span>
            <h2>Experience</h2>
          </div>

          <div className="timeline">
            {timeline.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-year">{item.year}</span>
                  </div>
                  <h3>{item.role}</h3>
                  <span className="timeline-company">@ {item.company}</span>
                  <p>{item.description}</p>
                  <div className="timeline-highlights">
                    {item.highlights.map((h, i) => (
                      <span key={i} className="highlight-tag">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="approach-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">ENGINEERING PRINCIPLES</span>
            <h2>My Approach</h2>
          </div>

          <div className="approach-grid">
            <div className="approach-card">
              <div className="approach-number">01</div>
              <h3>Scalability First</h3>
              <p>Design systems that can handle 10x traffic without architectural changes.</p>
            </div>
            <div className="approach-card">
              <div className="approach-number">02</div>
              <h3>Clean Architecture</h3>
              <p>Maintainable, testable code following SOLID principles and clean code practices.</p>
            </div>
            <div className="approach-card">
              <div className="approach-number">03</div>
              <h3>Observability</h3>
              <p>Comprehensive logging, monitoring, and alerting for production systems.</p>
            </div>
            <div className="approach-card">
              <div className="approach-number">04</div>
              <h3>Security Minded</h3>
              <p>Security baked in from day one, not bolted on as an afterthought.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
        }

        .container {
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

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
        }

        /* Hero */
        .about-hero {
          padding: 100px 0 80px;
          background: var(--bg-primary);
        }

        .hero-content {
          max-width: 800px;
          text-align: center;
          margin: 0 auto;
        }

        .about-hero h1 {
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .hero-desc {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        /* Stack Section */
        .stack-section {
          padding: 100px 0;
          background: var(--bg-secondary);
        }

        .stack-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stack-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
        }

        .stack-card h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
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

        /* Skills */
        .skills-section {
          padding: 100px 0;
          background: var(--bg-primary);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .skill-category {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
        }

        .skill-category h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          padding: 10px 16px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border: 1px solid rgba(10, 186, 181, 0.2);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: rgba(10, 186, 181, 0.2);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        /* Timeline */
        .timeline-section {
          padding: 100px 0;
          background: var(--bg-secondary);
        }

        .timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border);
        }

        .timeline-item {
          position: relative;
          padding-left: 40px;
          margin-bottom: 40px;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-marker {
          position: absolute;
          left: -6px;
          top: 4px;
          width: 14px;
          height: 14px;
          background: var(--primary);
          border-radius: 50%;
          border: 3px solid var(--bg-secondary);
        }

        .timeline-content {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
        }

        .timeline-header {
          margin-bottom: 12px;
        }

        .timeline-year {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Fira Code', monospace;
        }

        .timeline-content h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .timeline-company {
          font-size: 14px;
          color: var(--text-muted);
          display: block;
          margin-bottom: 12px;
        }

        .timeline-content p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .timeline-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .highlight-tag {
          padding: 4px 10px;
          background: var(--bg-secondary);
          color: var(--text-muted);
          border-radius: 4px;
          font-size: 12px;
        }

        /* Approach */
        .approach-section {
          padding: 100px 0;
          background: var(--bg-primary);
        }

        .approach-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .approach-card {
          padding: 32px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .approach-card:hover {
          border-color: var(--primary);
        }

        .approach-number {
          font-size: 48px;
          font-weight: 800;
          color: var(--primary);
          opacity: 0.3;
          margin-bottom: 16px;
          font-family: 'Fira Code', monospace;
        }

        .approach-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .approach-card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .stack-grid,
          .skills-grid,
          .approach-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stack-grid,
          .skills-grid,
          .approach-grid {
            grid-template-columns: 1fr;
          }

          .section-header h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
