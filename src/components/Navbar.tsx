'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ResumeModal from './ResumeModal';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const openResume = () => {
    setIsMenuOpen(false);
    setResumeOpen(true);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          <span className="logo-icon">{'<'}</span>
          <span className="logo-text">AjeboDev</span>
          <span className="logo-icon">{'/>'}</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button type="button" className="nav-link resume-mobile" onClick={openResume}>
            Resume
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary resume-btn"
            onClick={openResume}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Resume
          </button>

          <Link href="/contact" className="btn btn-primary hire-btn">
            Hire Me
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          background: var(--navbar-bg);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
          transition: background 0.3s ease;
        }

        .navbar-container {
          max-width: var(--container-max);
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: var(--font-body), "Instrument Sans", system-ui, sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .logo:hover {
          color: var(--text-primary);
        }

        .logo-icon {
          color: var(--primary);
          font-family: var(--font-mono), monospace;
          font-weight: 500;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.25s ease;
          position: relative;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.25s ease;
        }

        .theme-toggle:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .hire-btn,
        .resume-btn {
          padding: 10px 20px;
        }

        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .hamburger {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          position: relative;
          transition: all 0.3s ease;
        }

        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          transition: all 0.3s ease;
        }

        .hamburger::before {
          top: -8px;
        }

        .hamburger::after {
          bottom: -8px;
        }

        .hamburger.active {
          background: transparent;
        }

        .hamburger.active::before {
          top: 0;
          transform: rotate(45deg);
        }

        .hamburger.active::after {
          bottom: 0;
          transform: rotate(-45deg);
        }

        .resume-mobile {
          display: none;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          text-align: left;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: var(--nav-height);
            left: 0;
            right: 0;
            background: var(--bg-canvas-primary);
            flex-direction: column;
            padding: 24px;
            gap: 16px;
            border-bottom: 1px solid var(--border);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .menu-toggle {
            display: block;
          }

          .hire-btn,
          .resume-btn {
            display: none;
          }

          .resume-mobile {
            display: block;
          }
        }
      `}</style>
    </nav>
    <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default Navbar;
