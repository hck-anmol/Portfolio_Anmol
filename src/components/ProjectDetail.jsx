import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS, TAG_COLORS } from '../data/projects';
import './ProjectDetail.css';

// ── Photo Gallery (horizontal auto-scroll + manual drag) ────────────
function PhotoGallery({ photos, accent, onPhotoClick }) {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const dragMoved = useRef(false);

  // Preload all images immediately on mount for fast display
  useEffect(() => {
    photos.forEach((photo) => {
      if (photo.src) {
        const img = new Image();
        img.src = photo.src;
      }
    });
  }, [photos]);

  // Auto-scroll animation loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused && !isDragging) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (half > 0 && posRef.current >= half) posRef.current -= half;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused, isDragging]);

  // Pointer events handle both mouse AND touch — no need for separate touch handlers
  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    dragMoved.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;
    if (half <= 0) return;

    const walk = (dragStartX.current - e.clientX) * 1.5;
    if (Math.abs(walk) > 3) dragMoved.current = true;

    let newPos = dragStartPos.current + walk;
    if (newPos >= half) newPos %= half;
    if (newPos < 0) newPos = half - (Math.abs(newPos) % half);

    posRef.current = newPos || 0;
    track.style.transform = `translateX(-${posRef.current}px)`;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Duplicate for infinite loop
  const doubled = [...photos, ...photos];

  return (
    <div
      ref={wrapRef}
      className="gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="gallery__track" ref={trackRef}>
        {doubled.map((photo, i) => (
          <div
            key={i}
            className="gallery__item gallery__item--clickable"
            style={{ '--g-accent': accent }}
            onClick={() => {
              // Only open lightbox if not dragging
              if (!dragMoved.current) {
                onPhotoClick(i % photos.length);
              }
            }}
            title="Click to enlarge"
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt="Project screenshot"
                className="gallery__img"
                draggable="false"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="gallery__placeholder">
                <div className="gallery__placeholder-inner">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: accent, opacity: 0.5 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span className="gallery__placeholder-label">Photo coming soon</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Pause indicator */}
      {isPaused && !isDragging && (
        <div className="gallery__paused-badge">⏸ Paused</div>
      )}
    </div>
  );
}


// ── Architecture Table ────────────────────────────────
function ArchTable({ layers }) {
  return (
    <div className="arch-table">
      {layers.map((row, i) => (
        <div key={i} className="arch-row">
          <div className="arch-row__layer">{row.layer}</div>
          <div className="arch-row__detail">{row.detail}</div>
        </div>
      ))}
    </div>
  );
}

// ── Tech Stack Grid ───────────────────────────────────
function TechStackGrid({ stack, accent }) {
  return (
    <div className="tech-stack">
      {Object.entries(stack).map(([domain, items]) => (
        <div key={domain} className="tech-stack__group">
          <p className="tech-stack__domain" style={{ color: accent }}>{domain}</p>
          <div className="tech-stack__items">
            {items.map((item) => (
              <span key={item} className="pill">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Detail Page ──────────────────────────────────
// ── Lightbox ──────────────────────────────────────────
function Lightbox({ photo, onClose }) {
  useEffect(() => {
    // Push a fake history state so browser back closes the lightbox
    window.history.pushState({ lightbox: true }, '');
    const onPop = () => onClose();
    window.addEventListener('popstate', onPop);

    // ESC key closes it
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    // Lock scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      {/* Close button */}
      <button
        className="lightbox__close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close photo"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Image — stop click from bubbling to overlay */}
      <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt="Project screenshot" className="lightbox__img" />
      </div>
    </div>
  );
}

// ── Main Detail Page ──────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Scroll reveal on this page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [id]);

  if (!project) {
    return (
      <div className="pd-notfound">
        <h2>Project not found</h2>
        <Link to="/" className="btn-primary">← Back to Portfolio</Link>
      </div>
    );
  }

  const tc = TAG_COLORS[project.tagColor] || TAG_COLORS.blue;

  return (
    <div className="pd">
      {/* ── Hero banner ── */}
      <div className="pd-hero" style={{ '--p-accent': project.accent }}>
        <div className="pd-hero__glow" />
        <div className="container pd-hero__inner">
          {/* Breadcrumb */}
          <div className="pd-hero__breadcrumb">
            <Link to="/" className="pd-hero__back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </Link>
            <span className="pd-hero__sep">/</span>
            <span className="pd-hero__crumb">Projects</span>
            <span className="pd-hero__sep">/</span>
            <span className="pd-hero__crumb pd-hero__crumb--active">{project.title}</span>
          </div>

          {/* Tag */}
          <span
            className="pd-hero__tag"
            style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}
          >
            {project.tag}
          </span>

          {/* Title */}
          <h1 className="pd-hero__title">{project.title}</h1>
          <p className="pd-hero__tagline">{project.tagline}</p>

          {/* Links */}
          <div className="pd-hero__links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View on GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {/* Tech quick pills */}
          <div className="pd-hero__tech">
            {project.tech.map((t) => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photo Gallery ── */}
      <div className="pd-gallery-section">
        <div className="container pd-gallery-header reveal">
          <p className="section-label">Gallery</p>
          <p className="pd-gallery-note">Hover to pause · scroll to explore</p>
        </div>
        <PhotoGallery photos={project.photos} accent={project.accent} onPhotoClick={openLightbox} />
      </div>

      {/* ── Main content ── */}
      <div className="container pd-body">

        {/* Overview */}
        <section className="pd-section reveal">
          <h2 className="pd-section__heading">Overview</h2>
          <div className="pd-section__divider" style={{ background: project.accent }} />
          <div className="pd-overview">
            {project.overview.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="pd-section reveal reveal-delay-1">
          <div className="pd-problem-solution">
            <div className="pd-ps-card pd-ps-card--problem">
              <div className="pd-ps-card__label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Problem
              </div>
              <p className="pd-ps-card__text">{project.problem}</p>
            </div>
            <div className="pd-ps-card pd-ps-card--solution" style={{ '--sol-accent': project.accent }}>
              <div className="pd-ps-card__label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Solution
              </div>
              <p className="pd-ps-card__text">{project.solution}</p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="pd-section reveal">
          <h2 className="pd-section__heading">System Architecture</h2>
          <div className="pd-section__divider" style={{ background: project.accent }} />
          <ArchTable layers={project.architecture} />
        </section>

        {/* Features */}
        <section className="pd-section reveal reveal-delay-1">
          <h2 className="pd-section__heading">Features</h2>
          <div className="pd-section__divider" style={{ background: project.accent }} />
          <ul className="pd-features">
            {project.features.map((f) => (
              <li key={f} className="pd-feature-item">
                <span className="pd-feature-dot" style={{ background: project.accent }} />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="pd-section reveal">
          <h2 className="pd-section__heading">Tech Stack</h2>
          <div className="pd-section__divider" style={{ background: project.accent }} />
          <TechStackGrid stack={project.techStack} accent={project.accent} />
        </section>

        {/* Footer CTA */}
        <div className="pd-footer-cta reveal">
          <div className="pd-footer-cta__inner" style={{ '--cta-accent': project.accent }}>
            <div>
              <p className="pd-footer-cta__label">Source Code</p>
              <p className="pd-footer-cta__desc">Explore the full codebase on GitHub</p>
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub Repository
            </a>
          </div>

          {/* Other projects */}
          <div className="pd-other-projects">
            <p className="pd-other-projects__label">Other projects</p>
            <div className="pd-other-projects__links">
              {PROJECTS.filter((p) => p.id !== project.id).map((p) => (
                <Link key={p.id} to={`/project/${p.id}`} className="pd-other-link" style={{ '--ol-color': p.accent }}>
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && project.photos[lightboxIndex]?.src && (
        <Lightbox photo={project.photos[lightboxIndex]} onClose={closeLightbox} />
      )}
    </div>
  );
}
