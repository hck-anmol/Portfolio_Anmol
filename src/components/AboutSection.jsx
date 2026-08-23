import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import anmolPhoto from '../assets/anmol.jpeg';

function StatCard({ num, label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '14px',
      padding: '18px 14px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '24px', fontWeight: 800,
        background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{num}</div>
      <div style={{ fontSize: '11px', color: '#334155', marginTop: '5px', fontFamily: 'var(--mono)' }}>{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="section" style={{ background: 'var(--bg2)' }} ref={ref}>
      {/* Single very subtle nebula */}
      <div className="nebula" style={{
        width: 380, height: 380,
        background: 'radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)',
        top: -40, right: -60,
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Avatar */}
          <motion.div
            initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            {/* Static border ring — no spinning gradient */}
            <div style={{
              width: 240, height: 240,
              borderRadius: '50%',
              border: '1px solid rgba(124,58,237,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}>
              <div style={{
                width: 220, height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 35%, rgba(59,130,246,0.08) 0%, rgba(124,58,237,0.05) 60%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img
                  src={anmolPhoto}
                  alt="Anmol"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />
              </div>

              {/* Slow-spinning single orbit dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: -20,
                  border: '1px dashed rgba(124,58,237,0.2)',
                  borderRadius: '50%',
                }}
              >
                <div style={{
                  width: 8, height: 8,
                  background: '#7c3aed',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: 0, left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 8px rgba(124,58,237,0.6)',
                }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden" animate={inView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.11 } } }}
          >
            <motion.div variants={fadeUp} className="section-label">// who am i</motion.div>

            <motion.h2 variants={fadeUp} className="section-title">
              Crafting <span className="gradient-text">Digital</span> Experiences
            </motion.h2>

            <motion.div variants={fadeUp} className="glow-divider" />

            <motion.p variants={fadeUp} style={{
              color: '#475569', fontSize: '15px', lineHeight: 1.85, marginBottom: '14px',
            }}>
              Hey there! I'm a passionate Full-Stack Developer studying at{' '}
              <strong style={{ color: '#94a3b8' }}>IIIT Vadodara</strong>, obsessed with building
              real-time, interactive web applications that leave an impression.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              color: '#475569', fontSize: '15px', lineHeight: 1.85, marginBottom: '14px',
            }}>
              From multiplayer drawing games to intelligent traffic management systems — I love
              tackling complex problems with clean, performant code. I believe great software
              isn't just functional, it's an{' '}
              <em style={{ color: '#7c3aed', fontStyle: 'normal' }}>experience</em>.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--mono)', color: '#3b82f6', fontSize: '12px', marginBottom: '28px', opacity: 0.8,
            }}>
              MERN Stack · Socket.io · MySQL · Python · System Design
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}
            >
              <StatCard num="550+"  label="Problems Solved" />
              <StatCard num="5+"    label="Projects Built" />
              <StatCard num="Pupil" label="CodeForces Rank" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
