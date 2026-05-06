import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, typeColorMap } from '../data/portfolio.js';
import Footer from '../components/Footer.jsx';
import gitLogo from '../assets/gitlogo.webp';

function FeatureItem({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '12px',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        marginBottom: '8px',
      }}
    >
      <span style={{ color: 'var(--purple)', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✦</span>
      <span style={{ fontSize: '14px', color: 'var(--text)', fontFamily: 'var(--font)', lineHeight: 1.6 }}>{text}</span>
    </motion.div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const projectImage = project?.image;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) navigate('/');
  }, [id]);

  if (!project) return null;

  const otherProjects = projects.filter(p => p.id !== id).slice(0, 3);

  return (
    <>
      <div className="page-enter" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {/* Hero Banner */}
        <div style={{
          minHeight: '45vh',
          display: 'flex', alignItems: 'center',
          padding: '120px 20px 60px',
          position: 'relative', overflow: 'hidden',
          background: `radial-gradient(ellipse at 60% 50%, ${project.color}18 0%, transparent 65%)`,
        }}>
          {/* Nebula */}
          <div className="nebula" style={{ width: 500, height: 500, background: `radial-gradient(circle, ${project.color}22 0%, transparent 70%)`, top: '50%', left: '60%', transform: 'translate(-50%,-50%)' }} />

          <div className="container">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}
            >
              <Link to="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--mono)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--purple)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >Home</Link>
              <span style={{ color: 'var(--muted)', fontSize: '13px' }}>/</span>
              <Link to="/#projects" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--mono)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--purple)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >Projects</Link>
              <span style={{ color: 'var(--muted)', fontSize: '13px' }}>/</span>
              <span style={{ color: 'var(--text)', fontSize: '13px', fontFamily: 'var(--mono)' }}>{project.title}</span>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {/* Type tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {project.type.map((t, i) => {
                    const c = typeColorMap[project.typeColors[i]] || typeColorMap.purple;
                    return (
                      <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '50px', background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                        {t}
                      </span>
                    );
                  })}
                  {project.featured && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '50px', background: 'rgba(139,92,246,.2)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,.3)' }}>
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Project image or emoji */}
                <div style={{ marginBottom: '12px', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {projectImage
                    ? <img src={projectImage} alt={project.title} style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: '12px' }} />
                    : <span style={{ fontSize: '56px' }}>{project.emoji}</span>
                  }
                </div>
                <h1 style={{
                  fontFamily: 'var(--heading)',
                  fontSize: 'clamp(28px, 5vw, 56px)',
                  fontWeight: 900, lineHeight: 1.1, marginBottom: '12px',
                  background: 'linear-gradient(135deg, #fff, #c4b5fd)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{project.title}</h1>
                <p style={{ fontSize: '16px', color: 'var(--muted)', fontFamily: 'var(--subhead)', marginBottom: '28px', maxWidth: '500px', lineHeight: 1.6 }}>
                  {project.subtitle}
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  {project.github && (
                    <motion.a href={project.github} target="_blank" rel="noopener noreferrer" data-hover
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{ padding: '12px 28px', background: 'rgba(255,255,255,.07)', border: '1px solid var(--border)', borderRadius: '50px', fontSize: '14px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <img src={gitLogo} alt="GitHub" style={{ width: 20, height: 20, objectFit: 'contain' }} />
                      View on GitHub
                    </motion.a>
                  )}
                  <motion.a href={project.live || '#'} target={project.live ? '_blank' : '_self'} data-hover
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 12px 36px rgba(139,92,246,0.4)' }}
                    style={{ padding: '12px 28px', background: 'linear-gradient(135deg, var(--blue), var(--purple))', borderRadius: '50px', fontSize: '14px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', opacity: project.live ? 1 : 0.7 }}
                  >
                    {project.live ? '🚀 Live Demo' : '⏳ Coming Soon'}
                  </motion.a>
                </div>
              </motion.div>

              {/* Right decorative */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div style={{
                  width: 220, height: 220, borderRadius: '50%',
                  background: `radial-gradient(circle, ${project.color}30 0%, ${project.color}10 50%, transparent 70%)`,
                  border: `2px solid ${project.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: `0 0 60px ${project.color}30`,
                  animation: 'planetPulse 4s ease-in-out infinite',
                }}>
                  {projectImage
                    ? <img src={projectImage} alt={project.title} style={{ width: '65%', height: '65%', objectFit: 'contain', borderRadius: '8px' }} />
                    : <span style={{ fontSize: '80px' }}>{project.emoji}</span>
                  }
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="section" style={{ paddingTop: '60px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
              {/* Left — Description + Features */}
              <div>
                {/* About */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  style={{
                    padding: '32px', borderRadius: '24px',
                    background: 'var(--glass)', border: '1px solid var(--border)',
                    backdropFilter: 'blur(16px)', marginBottom: '28px',
                  }}
                >
                  <h2 style={{ fontFamily: 'var(--heading)', fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--text)' }}>
                    About This Project
                  </h2>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font)' }}>
                    {project.description}
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 style={{ fontFamily: 'var(--heading)', fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>
                     Key Features
                  </h2>
                  {project.features.map(f => <FeatureItem key={f} text={f} />)}
                </motion.div>
              </div>

              {/* Right — Tech Stack + Back */}
              <div>
                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  style={{
                    padding: '32px', borderRadius: '24px',
                    background: 'var(--glass)', border: '1px solid var(--border)',
                    backdropFilter: 'blur(16px)', marginBottom: '28px',
                  }}
                >
                  <h2 style={{ fontFamily: 'var(--heading)', fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>
                    🔧 Tech Stack
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{
                        padding: '8px 16px',
                        background: 'rgba(139,92,246,.1)',
                        border: '1px solid rgba(139,92,246,.2)',
                        borderRadius: '50px',
                        fontSize: '13px', fontWeight: 500,
                        color: '#c4b5fd',
                        fontFamily: 'var(--mono)',
                      }}>{t}</span>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Links */}
                
                {/* Back button */}
                <motion.button
                  onClick={() => navigate(-1)}
                  data-hover
                  whileHover={{ scale: 1.03, borderColor: 'rgba(139,92,246,0.5)' }}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'transparent', border: '1px solid var(--border)',
                    borderRadius: '16px', fontSize: '14px', fontWeight: 600,
                    color: 'var(--text)', cursor: 'pointer',
                    fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'border-color 0.2s',
                  }}
                >
                  ← Back to Projects
                </motion.button>
              </div>
            </div>

            {/* Other Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ marginTop: '80px' }}
            >
              <h2 style={{ fontFamily: 'var(--heading)', fontSize: '22px', fontWeight: 700, marginBottom: '32px', color: 'var(--text)' }}>
                Other Projects
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {otherProjects.map(op => (
                  <motion.div key={op.id} whileHover={{ y: -6, borderColor: `${op.color}50` }}
                    style={{
                      padding: '24px', borderRadius: '20px',
                      background: 'var(--glass)', border: '1px solid var(--border)',
                      backdropFilter: 'blur(12px)', cursor: 'pointer', transition: 'border-color 0.3s',
                    }}
                    onClick={() => { navigate(`/project/${op.id}`); window.scrollTo(0,0); }}
                    data-hover
                  >
                    <div style={{ marginBottom: '12px', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {op.image
                        ? <img src={op.image} alt={op.title} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: '8px' }} />
                        : <span style={{ fontSize: '32px' }}>{op.emoji}</span>
                      }
                    </div>
                    <div style={{ fontFamily: 'var(--heading)', fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'var(--text)' }}>{op.title}</div>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{op.shortDesc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
