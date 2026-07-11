'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';

const EMAIL = 'fredrickraymond2004@gmail.com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio inquiry'
    )}&body=${encodeURIComponent(
      `From: ${formData.name} <${formData.email}>\n\n${formData.message}`
    )}`;
    window.location.href = mailto;

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-layout">
          <Reveal>
            <div className="contact-info">
              <p className="section-label">Contact</p>
              <h1>
                Let&apos;s talk
                <br />
                systems
              </h1>
              <p className="lede">
                Open to contract work, full-time roles, and hard backend problems.
                Based in Abuja, Nigeria — email is the fastest way to reach me.
              </p>

              <div className="details">
                <a href={`mailto:${EMAIL}`} className="detail">
                  <span className="label mono">Email</span>
                  <span className="value">{EMAIL}</span>
                </a>
                <a href="tel:+2348169949369" className="detail">
                  <span className="label mono">Phone</span>
                  <span className="value">+234 81 6994 9369</span>
                </a>
              </div>

              <div className="socials">
                <a
                  href="https://github.com/fredrickray"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://linkedin.com/in/fredrickanyanwu2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="form-panel">
              <div className="form-header">
                <h2>Send a message</h2>
                <p className="mono">Opens your mail client · usually reply within a day</p>
              </div>

              {submitted ? (
                <div className="success">
                  <p className="mono">✓ ready</p>
                  <h3>Mail client opened</h3>
                  <p>If nothing opened, email me directly at {EMAIL}.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form">
                  <div className="row">
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select…</option>
                      <option value="Project inquiry">Project inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Job opportunity">Job opportunity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What are you building?"
                      rows={6}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Opening…' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          min-height: calc(100vh - var(--nav-height));
          background: var(--bg-canvas-primary);
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 80px 24px;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: start;
        }

        h1 {
          font-size: clamp(40px, 6vw, 56px);
          margin-bottom: 20px;
        }

        .lede {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 400px;
          margin-bottom: 40px;
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 36px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        .detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: inherit;
        }

        .detail:hover {
          color: inherit;
        }

        .detail:hover .value {
          color: var(--primary);
        }

        .label {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .value {
          font-size: 16px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .socials {
          display: flex;
          gap: 20px;
        }

        .socials a {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .form-panel {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 36px;
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-header h2 {
          font-size: 22px;
          margin-bottom: 6px;
        }

        .form-header p {
          font-size: 12px;
          color: var(--text-muted);
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field label {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .submit {
          width: 100%;
          margin-top: 4px;
        }

        .success {
          padding: 48px 12px;
          text-align: center;
        }

        .success .mono {
          color: var(--primary);
          margin-bottom: 12px;
          font-size: 12px;
        }

        .success h3 {
          margin-bottom: 8px;
        }

        .success p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .row {
            grid-template-columns: 1fr;
          }

          .form-panel {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  );
}
