'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/fredrickray' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/fredrickanyanwu2' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-icon">{'<'}</span>
              <span className="logo-text">AjeboDev</span>
              <span className="logo-icon">{'/>'}</span>
            </Link>
            <p className="footer-desc">
              Backend Engineer specializing in distributed systems,
              API design, and scalable architectures.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} AjeboDev. All rights reserved.</p>
          <div className="footer-status">
            <span className="status-dot"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-canvas-secondary);
          border-top: 1px solid var(--border);
          padding: 56px 0 24px;
          margin-top: auto;
        }

        .footer-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border);
        }

        .footer-brand .logo {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .logo-icon {
          color: var(--primary);
          font-family: var(--font-mono), monospace;
        }

        .logo-text {
          font-family: var(--font-display), system-ui, sans-serif;
        }

        .footer-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.8;
          max-width: 320px;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        .footer-col h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-col ul {
          list-style: none;
        }

        .footer-col li {
          margin-bottom: 12px;
        }

        .footer-col a {
          color: var(--text-secondary);
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .footer-col a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          font-size: 14px;
          color: var(--text-muted);
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #27C93F;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
