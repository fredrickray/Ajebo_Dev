'use client';

import { useState } from 'react';

const contactInfo = [
    {
        icon: '📧',
        label: 'Email',
        value: 'hello@devportfolio.com',
        link: 'mailto:hello@devportfolio.com',
    },
    {
        icon: '📍',
        label: 'Location',
        value: 'San Francisco, California',
        link: null,
    },
    {
        icon: '📱',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        link: 'tel:+15551234567',
    },
];

const socialLinks = [
    { name: 'GitHub', icon: '⌘', href: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com' },
    { name: 'Discord', icon: '💬', href: 'https://discord.com' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-layout">
                    {/* Left Side - Info */}
                    <div className="contact-info">
                        <div className="info-header">
                            <span className="section-badge">CONTACT</span>
                            <h1>
                                Get in<br />
                                <span className="text-accent">Touch</span>
                            </h1>
                            <p>
                                Have a project in mind or just want to chat? I&apos;d love to hear from you.
                                Fill out the form or reach out through any of the channels below.
                            </p>
                        </div>

                        <div className="contact-details">
                            {contactInfo.map((item, idx) => (
                                <div key={idx} className="contact-item">
                                    <div className="contact-icon">{item.icon}</div>
                                    <div className="contact-text">
                                        <span className="contact-label">{item.label}</span>
                                        {item.link ? (
                                            <a href={item.link} className="contact-value">{item.value}</a>
                                        ) : (
                                            <span className="contact-value">{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-section">
                            <h3>Follow Me</h3>
                            <div className="social-links">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="contact-form-container">
                        <div className="form-header">
                            <h2>Send a Message</h2>
                            <p>I typically respond within 24 hours</p>
                        </div>

                        {submitted ? (
                            <div className="success-message">
                                <div className="success-icon">✓</div>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. I&apos;ll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="project">Project Inquiry</option>
                                        <option value="collaboration">Collaboration</option>
                                        <option value="job">Job Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project or idea..."
                                        rows={6}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="map-section">
                <div className="map-placeholder">
                    <div className="map-overlay">
                        <div className="map-content">
                            <span className="map-icon">📍</span>
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 80px 24px;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
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

        .info-header h1 {
          font-size: clamp(40px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .text-accent {
          color: var(--primary);
        }

        .info-header p {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 20px;
        }

        .contact-text {
          display: flex;
          flex-direction: column;
        }

        .contact-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .contact-value {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
        }

        a.contact-value:hover {
          color: var(--primary);
        }

        .social-section h3 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--text-secondary);
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-link {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 20px;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        /* Form Styles */
        .contact-form-container {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-header p {
          font-size: 14px;
          color: var(--text-muted);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        select {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394A3B8'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 24px;
        }

        select:focus {
          outline: none;
          border-color: var(--primary);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          margin-top: 8px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--bg-primary);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Message */
        .success-message {
          text-align: center;
          padding: 60px 20px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: rgba(10, 186, 181, 0.1);
          border: 2px solid var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--primary);
          margin: 0 auto 24px;
        }

        .success-message h3 {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .success-message p {
          color: var(--text-secondary);
        }

        /* Map Section */
        .map-section {
          height: 300px;
          background: var(--bg-secondary);
          position: relative;
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0D1B1E 0%, #1a3a45 100%);
          position: relative;
        }

        .map-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-content {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 18px;
          font-weight: 500;
        }

        .map-icon {
          font-size: 24px;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form-container {
            padding: 32px 24px;
          }
        }
      `}</style>
        </div>
    );
}
