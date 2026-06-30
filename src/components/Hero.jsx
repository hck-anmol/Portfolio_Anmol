import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const WORDS = ['Full-Stack Systems.', 'Real-Time Apps.', 'Computer Vision.', 'Production Code.'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = WORDS[wordIndex];
    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout.current);
  }, [displayed, deleting, wordIndex]);

  return (
    <section className="hero" id="hero">
      {/* Background grid */}
      <div className="hero__grid" aria-hidden="true" />
      {/* Glow blobs */}
      <div className="hero__blob hero__blob--blue" aria-hidden="true" />
      <div className="hero__blob hero__blob--violet" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          {/* Label */}
          <div className="hero__label">
            <span className="hero__status-dot" />
            Available for opportunities
          </div>

          {/* Headline */}
          <h1 className="hero__headline">
            Building systems that<br />
            <span className="hero__headline-accent">actually ship.</span>
          </h1>

          {/* Typewriter sub */}
          <p className="hero__sub">
            I architect <span className="hero__type">{displayed}<span className="hero__cursor" /></span>
          </p>

          {/* Description */}
          <p className="hero__desc">
            Third-year CSE student at IIIT Vadodara. I design and build full-stack applications,
            real-time multiplayer systems, and computer vision pipelines — from schema to deployment.
          </p>

          {/* CTAs */}
          <div className="hero__ctas">
            <button
              className="btn-primary"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="https://github.com/hck-anmol"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right — code card */}
        <div className="hero__visual">
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-dot" style={{ background: '#FF5F57' }} />
              <div className="hero__card-dot" style={{ background: '#FFBD2E' }} />
              <div className="hero__card-dot" style={{ background: '#28C840' }} />
              <span className="hero__card-filename">anmol.config.ts</span>
            </div>
            <pre className="hero__card-code"><code>{`const developer = {
  name: "Anmol Kumar",
  role: "Full-Stack Developer",
  focus: [
    "Real-Time Systems",
    "MERN Stack",
    "Computer Vision",
  ],
  education: {
    institute: "IIIT Vadodara",
    degree: "B.Tech CSE",
    year: "3rd Year",
    cpi: 8.18,
  },
  currentlyBuilding:
    "systems that scale",
};`}</code></pre>
            <div className="hero__card-footer">
              <span className="hero__card-badge hero__card-badge--green">● Live</span>
              <span className="hero__card-badge">TypeScript</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
