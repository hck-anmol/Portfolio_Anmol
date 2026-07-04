import { useEffect } from 'react';
import './ResumeModal.css';

export default function ResumeModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="resume-modal__overlay" onClick={onClose}>
      <div className="resume-modal__box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="resume-modal__header">
          <div className="resume-modal__title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Anmol Kumar — Resume
          </div>
          <div className="resume-modal__actions">
            <a
              href="/resume.pdf"
              download="Anmol_Kumar_Resume.pdf"
              className="resume-modal__download"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </a>
            <button className="resume-modal__close" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="resume-modal__preview">
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            title="Resume Preview"
            className="resume-modal__iframe"
          />
        </div>
      </div>
    </div>
  );
}
