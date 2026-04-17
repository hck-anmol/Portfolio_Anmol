import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills, tagColorMap } from '../data/portfolio.js';

const cardGradients = {
  blue:   'linear-gradient(135deg, rgba(59,130,246,.15), rgba(59,130,246,.05))',
  pink:   'linear-gradient(135deg, rgba(236,72,153,.15), rgba(236,72,153,.05))',
  cyan:   'linear-gradient(135deg, rgba(6,182,212,.15), rgba(6,182,212,.05))',
  green:  'linear-gradient(135deg, rgba(34,197,94,.15), rgba(34,197,94,.05))',
  purple: 'linear-gradient(135deg, rgba(139,92,246,.15), rgba(139,92,246,.05))',
};

const topBarColors = {
  blue:   'linear-gradient(90deg, #3b82f6, #60a5fa)',
  pink:   'linear-gradient(90deg, #ec4899, #f472b6)',
  cyan:   'linear-gradient(90deg, #06b6d4, #22d3ee)',
  green:  'linear-gradient(90deg, #22c55e, #4ade80)',
  purple: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
};

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -8, boxShadow: '0 28px 64px rgba(0,0,0,0.45)', borderColor: 'rgba(139,92,246,0.35)' }}
      className="skill-card"
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '28px',
        backdropFilter: 'blur(14px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      data-hover
    >
      {/* Top accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: topBarColors[skill.color] || topBarColors.blue,
          transformOrigin: 'left',
        }}
      />

      {/* Background gradient tint */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        background: cardGradients[skill.color] || cardGradients.blue,
        borderRadius: '20px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {skill.icon && <div style={{ fontSize: '32px', marginBottom: '12px' }}>{skill.icon}</div>}
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: 'var(--text)' }}>
          {skill.category}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skill.tags.map(tag => {
            const c = tagColorMap[tag.color] || tagColorMap.blue;
            return (
              <span
                key={tag.name}
                style={{
                  padding: '5px 12px',
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: c.color,
                  fontFamily: 'var(--mono)',
                }}
              >
                {tag.name}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section">
      <div className="nebula" style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)', bottom: 0, left: 0 }} />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '50px' }}
        >
          <div className="section-label">// my arsenal</div>
          <h2 className="section-title">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="glow-divider" />
          <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7 }}>
            Tools and technologies I use to build production-grade applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
