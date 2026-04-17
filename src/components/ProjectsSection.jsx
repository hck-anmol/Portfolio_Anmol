import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects, typeColorMap } from '../data/portfolio.js';

function TypeTag({ label, colorKey }) {
  const c = typeColorMap[colorKey] || typeColorMap.purple;
  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, padding: '4px 10px', borderRadius: '50px', background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {label}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  const spawnParticles = () => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#a78bfa'];
    const pts = Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const dist = 28 + Math.random() * 28;
      return { id: i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, color: colors[Math.floor(Math.random() * colors.length)] };
    });
    setParticles(pts);
    setTimeout(() => setParticles([]), 900);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: 'easeOut' }}
      whileHover={{ y: -12 }}
      onHoverStart={spawnParticles}
      data-hover
      style={{
        background: 'var(--glass)', border: '1px solid var(--border)',
        borderRadius: '24px', padding: '28px',
        backdropFilter: 'blur(16px)',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.color}50`; e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px ${project.color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Hover glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${project.color}08 0%, transparent 65%)`, pointerEvents: 'none', borderRadius: '24px' }} />

      {/* Featured badge */}
      {project.featured && (
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'linear-gradient(135deg, rgba(139,92,246,.25), rgba(236,72,153,.25))', border: '1px solid rgba(139,92,246,.3)', borderRadius: '50px', padding: '3px 10px', fontSize: '10px', fontFamily: 'var(--mono)', color: '#c4b5fd', fontWeight: 600 }}>
          ★ Featured
        </div>
      )}

      {/* Particle burst */}
      <div style={{ position: 'absolute', top: 20, right: 48, pointerEvents: 'none', zIndex: 10 }}>
        <AnimatePresence>
          {particles.map(p => (
            <motion.div key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
              exit={{}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: p.color, boxShadow: `0 0 6px ${p.color}` }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {project.type.map((t, i) => <TypeTag key={t} label={t} colorKey={project.typeColors[i]} />)}
        </div>

        <div style={{
          fontFamily: 'var(--heading)', fontSize: '20px', fontWeight: 800, marginBottom: '10px',
          background: 'linear-gradient(135deg, #fff, #c4b5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>{project.title}</div>

        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '18px', flex: 1 }}>
          {project.shortDesc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tech.slice(0, 5).map(t => <span key={t} className="tech-badge">{t}</span>)}
          {project.tech.length > 5 && <span className="tech-badge">+{project.tech.length - 5}</span>}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {project.github && (
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer" data-hover
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ flex: 1, padding: '9px', background: 'rgba(255,255,255,.07)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '12px', fontWeight: 600, textAlign: 'center', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
            >GitHub</motion.a>
          )}
          <motion.button
            onClick={() => navigate(`/project/${project.id}`)}
            data-hover
            whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${project.color}40` }}
            whileTap={{ scale: 0.97 }}
            style={{ flex: 1, padding: '9px', background: 'linear-gradient(135deg, var(--blue), var(--purple))', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontFamily: 'var(--font)' }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="nebula" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <div className="container">
        <motion.div ref={headerRef}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ marginBottom: '50px' }}
        >
          <div className="section-label">// what i've built</div>
          <h2 className="section-title">
            Featured <span className="gradient-text-pink">Projects</span>
          </h2>
          <div className="glow-divider" />
          <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, fontFamily: 'var(--font)' }}>
            A showcase of real-world projects spanning real-time apps, booking platforms, and intelligent systems.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '60px', flexWrap: 'wrap' }}>
          <motion.a
            href="https://github.com/hck-anmol" target="_blank" rel="noopener noreferrer"
            data-hover
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(139,92,246,0.4)' }}
            style={{ padding: '14px 32px', background: 'linear-gradient(135deg, var(--blue), var(--purple))', borderRadius: '50px', fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            View All on GitHub
          </motion.a>
          <motion.button
            onClick={() => navigate('/journey')}
            data-hover
            whileHover={{ scale: 1.04, borderColor: 'var(--purple)', background: 'rgba(139,92,246,0.1)' }}
            style={{ padding: '14px 32px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '50px', fontSize: '14px', fontWeight: 600, color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font)', transition: 'all 0.2s' }}
          >
            My Journey
          </motion.button>
        </div>
      </div>
    </section>
  );
}
