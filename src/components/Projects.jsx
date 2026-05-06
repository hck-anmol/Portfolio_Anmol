import { Link } from 'react-router-dom';
import { PROJECTS, TAG_COLORS } from '../data/projects';
import './Projects.css';

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        {/* Header */}
        <div className="projects__header reveal">
          <p className="section-label">Projects</p>
          <h2 className="projects__headline">Shipped work, real systems.</h2>
          <p className="projects__sub">
            Five projects selected for technical complexity, problem-solving depth, and real-world delivery.
          </p>
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {PROJECTS.map((p, i) => {
            const tc = TAG_COLORS[p.tagColor] || TAG_COLORS.blue;
            return (
              <article
                key={p.id}
                className={`project-card reveal reveal-delay-${(i % 3) + 1}`}
                style={{ '--card-accent': p.accent }}
              >
                {/* Top row */}
                <div className="project-card__top">
                  <span
                    className="project-card__tag"
                    style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}
                  >
                    {p.tag}
                  </span>
                  <div className="project-card__links">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-card__icon-link" title="Live demo">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-card__icon-link" title="GitHub">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__tagline">{p.tagline}</p>

                {/* Bullets */}
                <ul className="project-card__bullets">
                  {p.shortBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                {/* Tech */}
                <div className="project-card__tech">
                  {p.tech.map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                </div>

                {/* Detail link */}
                <Link
                  to={`/project/${p.id}`}
                  className="project-card__detail-link"
                  style={{ '--link-color': p.accent }}
                >
                  View case study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                {/* Hover line */}
                <div className="project-card__accent-line" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
