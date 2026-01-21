'use client';

import { SkillBar } from '@/components';

const skills = {
  frontend: [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'HTML5 / CSS3', level: 95 },
    { name: 'Vue.js', level: 75 },
  ],
  backend: [
    { name: 'Node.js / Express', level: 90 },
    { name: 'Python / FastAPI', level: 85 },
    { name: 'PostgreSQL / MongoDB', level: 85 },
    { name: 'NestJS', level: 90 },
    { name: 'GraphQL', level: 80 },
  ],
  tools: [
    { name: 'Git / GitHub', level: 95 },
    { name: 'Docker / Kubernetes', level: 80 },
    { name: 'AWS / GCP', level: 75 },
    { name: 'CI/CD Pipelines', level: 85 },
  ],
};

const services = [
  {
    icon: '🎨',
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and performant user interfaces with modern frameworks and best practices.',
  },
  {
    icon: '⚙️',
    title: 'Backend Systems',
    description: 'Designing scalable APIs, microservices, and database architectures that power robust applications.',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Deploying and managing applications with containerization, orchestration, and CI/CD automation.',
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications with React Native and native-like performance.',
  },
];

const timeline = [
  {
    year: '12/2024 – present',
    role: 'Backend Engineer | Team Lead',
    company: 'Claymore Limited',
    description: 'Leading development of enterprise-scale applications and mentoring junior developers.',
  },
  {
    year: '07/2024 – 09/2024',
    role: 'Backend Engineer(Intern)',
    company: 'TechVibes Ltd.',
    description: 'Built and maintained multiple client projects using React, Node.js, and cloud technologies.',
  },
  {
    year: '01/2024 – 12/2024',
    role: 'Backend Engineer',
    company: 'SustainaFinance Data Nexus',
    description: 'Developed interactive web applications and collaborated with design teams.',
  },
  {
    year: '01/2024 – 12/2024',
    role: 'Backend Developer',
    company: 'Padding Technologies',
    description: 'Developed interactive web applications and collaborated with design teams.',
  },
  {
    year: '06/2023 – 10/2023',
    role: 'Backend Developer(Intern)',
    company: 'HNG Tech',
    description: 'Developed interactive web applications and collaborated with design teams.',
  },
  {
    year: '06/2022 – 09/2022',
    role: 'FullStack Developer(Intern)',
    company: 'Elatech Limited',
    description: 'Developed interactive web applications and collaborated with design teams.',
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Crafting digital experiences<br />
              through <span className="text-accent">precise engineering.</span>
            </h1>
            <p>
              I&apos;m a passionate full-stack developer with a mission to build scalable,
              user-centric applications. With over 4 years of experience, I combine
              technical expertise with creative problem-solving to deliver exceptional
              digital solutions that make a real impact.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">WHAT I DO</span>
            <h2>Services & Expertise</h2>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">TECHNICAL SKILLS</span>
            <h2>Technologies & Tools</h2>
          </div>

          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              {skills.frontend.map((skill, idx) => (
                <SkillBar key={idx} name={skill.name} level={skill.level} />
              ))}
            </div>

            <div className="skill-category">
              <h3>Backend Development</h3>
              {skills.backend.map((skill, idx) => (
                <SkillBar key={idx} name={skill.name} level={skill.level} />
              ))}
            </div>

            <div className="skill-category">
              <h3>Tools & Platforms</h3>
              {skills.tools.map((skill, idx) => (
                <SkillBar key={idx} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">EXPERIENCE</span>
            <h2>Professional Journey</h2>
          </div>

          <div className="timeline">
            {timeline.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            <div className="value-item">
              <div className="value-number">01</div>
              <h3>Clean Code</h3>
              <p>Writing maintainable, well-documented code that stands the test of time.</p>
            </div>
            <div className="value-item">
              <div className="value-number">02</div>
              <h3>User-Centric</h3>
              <p>Putting users first in every design and development decision.</p>
            </div>
            <div className="value-item">
              <div className="value-number">03</div>
              <h3>Continuous Learning</h3>
              <p>Staying current with emerging technologies and industry best practices.</p>
            </div>
            <div className="value-item">
              <div className="value-number">04</div>
              <h3>Collaboration</h3>
              <p>Working effectively with teams to achieve shared goals and deliver excellence.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
        }

        .container {
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
        }

        .about-hero h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 24px;
        }

        .text-accent {
          color: var(--primary);
        }

        .about-hero p {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 700px;
        }

        /* Services */
        .services-section {
          padding: 100px 0;
          background: var(--bg-secondary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .service-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px 24px;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
        }

        .service-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .service-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .service-card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
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

        /* Timeline */
        .timeline-section {
          padding: 100px 0;
          background: var(--bg-secondary);
        }

        .timeline {
          position: relative;
          max-width: 800px;
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

        .timeline-year {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(10, 186, 181, 0.1);
          color: var(--primary);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 12px;
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
        }

        /* Values */
        .values-section {
          padding: 100px 0;
          background: var(--bg-primary);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .value-item {
          padding: 32px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .value-item:hover {
          border-color: var(--primary);
        }

        .value-number {
          font-size: 48px;
          font-weight: 800;
          color: var(--primary);
          opacity: 0.3;
          margin-bottom: 16px;
        }

        .value-item h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .value-item p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .services-grid,
          .skills-grid,
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .services-grid,
          .skills-grid,
          .values-grid {
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
