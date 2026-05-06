import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

// ── EmailJS config ─────────────────────────────────────
// Follow setup instructions in README to configure these.
// https://www.emailjs.com/
const EMAILJS_SERVICE_ID  = 'service_anmol_portfolio';   // replace after setup
const EMAILJS_TEMPLATE_ID = 'template_contact_form';     // replace after setup
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';           // replace after setup

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMsg('Something went wrong. Please email me directly at anmolkrj006@gmail.com');
      setStatus('error');
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact__inner">
        {/* ── Left panel ── */}
        <div className="contact__left reveal">
          <p className="section-label">Contact</p>
          <h2 className="contact__headline">
            Have something to build?
          </h2>
          <p className="contact__desc">
            I'm open to internships, freelance work, and interesting problems.
            If you want to talk architecture, systems, or have a project that
            needs someone who ships — let's connect.
          </p>

          <a href="mailto:anmolkrj006@gmail.com" className="contact__email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            anmolkrj006@gmail.com
          </a>

          <div className="contact__socials">
            <a href="https://github.com/hck-anmol" target="_blank" rel="noopener noreferrer" className="contact__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/anmol-kumar-iiitv" target="_blank" rel="noopener noreferrer" className="contact__social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Meta */}
          <div className="contact__meta">
            <div className="contact__meta-item">
              <span className="contact__meta-dot" style={{ background: 'var(--green)' }} />
              Available for opportunities
            </div>
            <div className="contact__meta-item">
              <span className="contact__meta-dot" style={{ background: 'var(--accent)' }} />
              IIIT Vadodara, India
            </div>
            <div className="contact__meta-item">
              <span className="contact__meta-dot" style={{ background: 'var(--violet)' }} />
              Responds within 24 hours
            </div>
          </div>
        </div>

        {/* ── Right — Contact Form ── */}
        <div className="contact__right reveal reveal-delay-2">
          <div className="contact__card">
            <div className="contact__card-label">
              <span className="contact__card-dot" />
              Send a message
            </div>

            {status === 'success' ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="contact__success-title">Message sent!</h3>
                <p className="contact__success-desc">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  className="btn-secondary contact__success-btn"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact__form" noValidate>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="from_name">Name</label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      className="contact__input"
                      placeholder="Your name"
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="from_email">Email</label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      className="contact__input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="contact__input"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact__textarea"
                    placeholder="Describe what you're working on or what you need..."
                    rows={5}
                    required
                    minLength={20}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact__error">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact__spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
