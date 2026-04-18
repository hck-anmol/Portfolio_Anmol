import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const roles = ['MERN Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'Full-Stack Engineer'];

function useTypingEffect(words, typingSpeed = 80, deleteSpeed = 40, pause = 1800) {
  const [text, setText]         = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const next = () => {
      if (!deleting && text.length < current.length) {
        setText(current.slice(0, text.length + 1));
        timeout.current = setTimeout(next, typingSpeed);
      } else if (!deleting && text.length === current.length) {
        timeout.current = setTimeout(() => setDeleting(true), pause);
      } else if (deleting && text.length > 0) {
        setText(current.slice(0, text.length - 1));
        timeout.current = setTimeout(next, deleteSpeed);
      } else {
        setDeleting(false);
        setWordIdx(i => i + 1);
      }
    };
    timeout.current = setTimeout(next, deleting ? deleteSpeed : typingSpeed);
    return () => clearTimeout(timeout.current);
  }, [text, deleting, wordIdx]);

  return text;
}

export default function HeroSection() {
  const typedText = useTypingEffect(roles);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Single subtle nebula — no multiple overlapping blobs */}
      <div className="nebula" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 65%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-55%)',
        animation: 'nebFloat 14s ease-in-out infinite',
      }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}
      >
        {/* Available badge */}
        <motion.div variants={item}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '50px',
            padding: '7px 16px',
            fontSize: '12px', fontWeight: 500,
            color: '#22d3ee',
            fontFamily: 'var(--mono)',
            marginBottom: '32px',
            backdropFilter: 'blur(12px)',
          }}>
            <span style={{
              width: 6, height: 6,
              background: '#22d3ee',
              borderRadius: '50%',
              display: 'block',
              boxShadow: '0 0 6px #22d3ee',
            }} />
            Available for Internships &amp; Projects
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          style={{
            fontSize: 'clamp(50px, 8vw, 96px)',
            fontWeight: 900, lineHeight: 1,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #3b82f6 45%, #7c3aed 80%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'gradientShift 7s linear infinite',
          }}
        >
          Anmol
        </motion.h1>

        {/* Typing role */}
        <motion.div
          variants={item}
          style={{
            fontSize: 'clamp(16px, 2.8vw, 24px)',
            fontWeight: 500,
            color: '#475569',
            marginBottom: '22px',
            minHeight: '1.8em',
          }}
        >
          <span style={{ color: '#7c3aed' }}>{typedText}</span>
          <span className="typing-cursor" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          style={{
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: '#475569',
            maxWidth: '520px',
            margin: '0 auto 44px',
            lineHeight: 1.75,
          }}
        >
          I build fast, beautiful, full-stack web experiences — from real-time multiplayer games to intelligent traffic systems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            data-hover
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 32px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              borderRadius: '50px',
              fontSize: '14px', fontWeight: 600, color: '#fff',
              border: 'none', cursor: 'pointer', display: 'inline-block',
              boxShadow: '0 4px 24px rgba(109,40,217,0.25)',
            }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            data-hover
            whileHover={{ scale: 1.03, borderColor: 'rgba(124,58,237,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 32px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50px',
              fontSize: '14px', fontWeight: 500, color: '#94a3b8',
              cursor: 'pointer', backdropFilter: 'blur(12px)',
              display: 'inline-block',
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '56px', flexWrap: 'wrap' }}
        >
          {[['5+', 'Projects Built'], ['MERN', 'Stack Expert'], ['100%', 'Passionate']].map(([num, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '22px', fontWeight: 800,
                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{num}</div>
              <div style={{ fontSize: '11px', color: '#334155', marginTop: '4px', fontFamily: 'var(--mono)' }}>{lbl}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '-10px', left: '51%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        color: '#334155', fontSize: '11px',
        animation: 'fadeIn 1s ease 1.8s both',
      }}>
        <span style={{ fontFamily: 'var(--mono)', letterSpacing: '2px', fontSize: '10px' }}>SCROLL</span>
        <div style={{
          width: '1px', height: '44px',
          background: 'linear-gradient(180deg, #7c3aed, transparent)',
          animation: 'scrollLine 2.2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
