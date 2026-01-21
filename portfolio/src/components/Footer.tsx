'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/fredrickray' },
    { name: 'LinkedIn', href: 'https://linkedin.com/fredrickanyanwu2' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'Discord', href: 'https://discord.com' },
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
              <span className="logo-icon">{'< '}</span>
              <span className="logo-text">AjeboDev Portfolio</span>
              <span className='logo-icon'>{' />'}</span>
            </Link>
            <p className="footer-desc">
              Building digital experiences with passion and precision.
              Let&apos;s create something amazing together.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Quick Links</h4>
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
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 60px 0 24px;
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
          gap: 8px;
          font-weight: 700;
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .logo-icon {
          color: var(--primary);
          font-family: monospace;
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
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--text-primary);
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

        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-links a {
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--primary);
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
