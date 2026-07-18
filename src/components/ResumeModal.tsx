'use client';

import { useEffect } from 'react';

const RESUME_URL = '/resume.pdf';
const RESUME_FILENAME = 'Fredrick_Anyanwu_Resume.pdf';

type ResumeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="resume-modal" role="presentation">
      <button
        type="button"
        className="resume-backdrop"
        aria-label="Close resume preview"
        onClick={onClose}
      />

      <div
        className="resume-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <header className="resume-header">
          <div className="resume-title-block">
            <p className="resume-eyebrow mono">PREVIEW</p>
            <h2 id="resume-modal-title">Fredrick Anyanwu — Resume</h2>
          </div>

          <div className="resume-actions">
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="btn btn-primary resume-download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
            <button
              type="button"
              className="resume-close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        <div className="resume-body">
          <iframe
            src={`${RESUME_URL}#toolbar=0&navpanes=0`}
            title="Fredrick Anyanwu resume preview"
            className="resume-frame"
          />
          <p className="resume-fallback mono">
            Can&apos;t see the preview?{' '}
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Open PDF in a new tab
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .resume-modal {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }

        .resume-backdrop {
          position: absolute;
          inset: 0;
          border: none;
          padding: 0;
          background: rgba(8, 10, 14, 0.72);
          backdrop-filter: blur(6px);
          cursor: pointer;
        }

        .resume-dialog {
          position: relative;
          z-index: 1;
          width: min(920px, 100%);
          height: min(88vh, 960px);
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: var(--shadow-card);
          overflow: hidden;
          animation: slideUp 0.28s ease;
        }

        .resume-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-canvas-secondary);
          flex-shrink: 0;
        }

        .resume-eyebrow {
          font-size: 10px;
          letter-spacing: 1.6px;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .resume-header h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .resume-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .resume-download {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 13px;
        }

        .resume-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-secondary);
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .resume-close:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .resume-body {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          background: var(--bg-canvas-primary);
        }

        .resume-frame {
          flex: 1;
          width: 100%;
          border: none;
          background: #fff;
        }

        .resume-fallback {
          padding: 10px 16px;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .resume-fallback :global(a) {
          color: var(--primary);
        }

        .resume-fallback :global(a:hover) {
          text-decoration: underline;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 640px) {
          .resume-modal {
            padding: 12px;
          }

          .resume-dialog {
            height: min(92vh, 100%);
          }

          .resume-header {
            flex-wrap: wrap;
            padding: 14px 16px;
          }

          .resume-header h2 {
            font-size: 14px;
          }

          .resume-download {
            padding: 9px 12px;
          }
        }
      `}</style>
    </div>
  );
}
