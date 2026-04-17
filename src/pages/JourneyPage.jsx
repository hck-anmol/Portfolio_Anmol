import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { journeyPhases } from '../data/portfolio.js';
import Footer from '../components/Footer.jsx';
import { usePerformance } from '../hooks/usePerformance.js';
import StarCanvas from '../components/StarCanvas.jsx';

const JourneyScene3D = lazy(() => import('../components/journey/JourneyScene3D.jsx'));

// ── Responsive hook ────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Scroll progress tracker ────────────────────────────────────────────────────
function SpaceshipTracker({ scrollYProgress }) {
  const isMobile = useIsMobile(480);
  const barH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '76%']);

  if (isMobile) return null; // hide on very small screens

  return (
    <motion.div
      style={{
        position: 'fixed', right: '16px', top: '50%',
        translateY: '-50%', zIndex: 50,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}
    >
      <div style={{
        width: '1px', height: '100px',
        background: 'rgba(139,92,246,0.15)',
        borderRadius: '99px', position: 'relative',
      }}>
        <motion.div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'linear-gradient(180deg, #3b82f6, #7c3aed)',
          borderRadius: '99px', height: barH,
        }} />
        <motion.div style={{
          position: 'absolute', left: '50%',
          y: dotY, transform: 'translateX(-50%)',
          fontSize: '16px',
          filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.7))',
        }}>🚀</motion.div>
      </div>
      <span style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: 'rgba(100,116,139,0.6)', letterSpacing: '1px' }}>
        SCROLL
      </span>
    </motion.div>
  );
}

// ── Phase card ─────────────────────────────────────────────────────────────────
function PhaseCard({ phase, index }) {
  const ref     = useRef();
  const inView  = useInView(ref, { once: true, margin: '-60px' });
  const isMobile = useIsMobile(640);
  const isLeft  = index % 2 === 0;

  /* ── MOBILE layout: left rail + full-width card ── */
  if (isMobile) {
    return (
      <div ref={ref} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
        {/* Left rail node */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6px' }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: `radial-gradient(circle, ${phase.planetColor}30 0%, transparent 70%)`,
              border: `1px solid ${phase.planetColor}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
              boxShadow: `0 0 12px ${phase.planetColor}25`,
              position: 'relative', zIndex: 2,
            }}
          >
            {phase.planet}
          </motion.div>
          <div style={{ fontSize: '8px', fontFamily: 'var(--mono)', color: '#334155', marginTop: '4px' }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Card — full remaining width */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ flex: 1, minWidth: 0 }}
        >
          <div style={{
            padding: '20px',
            background: 'rgba(2,6,20,0.75)',
            border: `1px solid rgba(255,255,255,0.06)`,
            borderLeft: `2px solid ${phase.planetColor}55`,
            borderRadius: '14px',
            backdropFilter: 'blur(20px)',
          }}>
            {/* Year pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '2px 10px',
              background: `${phase.planetColor}10`,
              border: `1px solid ${phase.planetColor}25`,
              borderRadius: '50px',
              fontSize: '9px', fontWeight: 600,
              color: `${phase.planetColor}cc`,
              fontFamily: 'var(--mono)',
              marginBottom: '10px',
              letterSpacing: '0.5px',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: phase.planetColor, display: 'inline-block' }} />
              {phase.year}
            </div>

            <h3 style={{
              fontFamily: 'var(--heading)', fontSize: '13px', fontWeight: 700,
              color: '#e2e8f0', marginBottom: '3px', lineHeight: 1.3,
            }}>
              {phase.title}
            </h3>
            <p style={{
              fontSize: '11px', color: `${phase.planetColor}bb`,
              fontFamily: 'var(--mono)', marginBottom: '10px',
            }}>
              {phase.subtitle}
            </p>
            <p style={{
              fontSize: '13px', color: '#64748b', lineHeight: 1.7,
              marginBottom: '14px', fontFamily: 'var(--font)',
            }}>
              {phase.description}
            </p>

            {/* Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
              {phase.highlights.map(h => (
                <span key={h} style={{
                  padding: '3px 9px',
                  background: `${phase.planetColor}0e`,
                  border: `1px solid ${phase.planetColor}20`,
                  borderRadius: '50px',
                  fontSize: '10px', fontWeight: 600,
                  color: `${phase.planetColor}bb`,
                  fontFamily: 'var(--subhead)',
                }}>{h}</span>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {phase.tags.map(t => (
                <span key={t} style={{
                  padding: '2px 7px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '50px',
                  fontSize: '10px', fontWeight: 500,
                  color: '#475569',
                  fontFamily: 'var(--mono)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── DESKTOP layout: alternating left / right ── */
  return (
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: isLeft ? 'row' : 'row-reverse',
      alignItems: 'center',
    }}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ flex: 1, padding: isLeft ? '0 40px 0 0' : '0 0 0 40px' }}
      >
        <div
          style={{
            padding: '28px 32px',
            background: 'rgba(2,6,20,0.7)',
            border: `1px solid rgba(255,255,255,0.06)`,
            borderLeft:  isLeft  ? `2px solid ${phase.planetColor}50` : '1px solid rgba(255,255,255,0.06)',
            borderRight: !isLeft ? `2px solid ${phase.planetColor}50` : '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 32px ${phase.planetColor}18`; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
        >
          {/* Year pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '3px 12px',
            background: `${phase.planetColor}10`,
            border: `1px solid ${phase.planetColor}25`,
            borderRadius: '50px',
            fontSize: '10px', fontWeight: 600,
            color: `${phase.planetColor}cc`,
            fontFamily: 'var(--mono)',
            marginBottom: '14px',
            letterSpacing: '0.5px',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: phase.planetColor, display: 'inline-block' }} />
            {phase.year}
          </div>

          <h3 style={{
            fontFamily: 'var(--heading)', fontSize: '16px', fontWeight: 700,
            color: '#e2e8f0', marginBottom: '4px', lineHeight: 1.3,
          }}>
            {phase.title}
          </h3>
          <p style={{
            fontSize: '12px', color: `${phase.planetColor}bb`,
            fontFamily: 'var(--mono)', marginBottom: '14px',
          }}>
            {phase.subtitle}
          </p>
          <p style={{
            fontSize: '14px', color: '#64748b', lineHeight: 1.75,
            marginBottom: '18px', fontFamily: 'var(--font)',
          }}>
            {phase.description}
          </p>

          {/* Highlights */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {phase.highlights.map(h => (
              <span key={h} style={{
                padding: '3px 10px',
                background: `${phase.planetColor}0e`,
                border: `1px solid ${phase.planetColor}20`,
                borderRadius: '50px',
                fontSize: '11px', fontWeight: 600,
                color: `${phase.planetColor}bb`,
                fontFamily: 'var(--subhead)',
              }}>{h}</span>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {phase.tags.map(t => (
              <span key={t} style={{
                padding: '2px 8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '50px',
                fontSize: '10px', fontWeight: 500,
                color: '#475569',
                fontFamily: 'var(--mono)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Centre node */}
      <div style={{
        flexShrink: 0, width: '72px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', zIndex: 2,
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `radial-gradient(circle, ${phase.planetColor}30 0%, transparent 70%)`,
            border: `1px solid ${phase.planetColor}45`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px',
            boxShadow: `0 0 16px ${phase.planetColor}25`,
          }}
        >
          {phase.planet}
        </motion.div>
        <div style={{
          fontSize: '9px', fontFamily: 'var(--mono)',
          color: '#334155', marginTop: '5px',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function JourneyPage() {
  const containerRef   = useRef();
  const scrollProgress = useRef(0);
  const isMobile       = useIsMobile(640);
  const { isLowEnd, checked } = usePerformance();

  const { scrollYProgress } = useScroll({ target: containerRef });
  scrollYProgress.on('change', v => { scrollProgress.current = v; });

  return (
    <>
      {/* 3D layer */}
      {checked && (
        isLowEnd
          ? <StarCanvas />
          : (
            <Suspense fallback={<StarCanvas />}>
              <JourneyScene3D scrollProgress={scrollProgress} />
            </Suspense>
          )
      )}

      <div ref={containerRef} className="page-enter" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <SpaceshipTracker scrollYProgress={scrollYProgress} />

        {/* ═══ HERO ═══ */}
        <section style={{
          minHeight: isMobile ? '50vh' : '65vh',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center',
          padding: isMobile ? '100px 20px 40px' : '140px 24px 60px',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(109,40,217,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            style={{ maxWidth: isMobile ? '100%' : '660px', position: 'relative', zIndex: 2 }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: '#475569', fontSize: '12px', fontFamily: 'var(--mono)',
                marginBottom: isMobile ? '20px' : '32px', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#8b5cf6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              ← Back to Home
            </Link>

            <div style={{ fontSize: isMobile ? '36px' : '44px', marginBottom: '16px', opacity: 0.9 }}>🚀</div>

            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: isMobile ? '10px' : '11px',
              color: '#7c3aed',
              letterSpacing: '3px', textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              // my career voyage
            </div>

            <h1 style={{
              fontFamily: 'var(--heading)',
              fontSize: isMobile ? 'clamp(28px, 8vw, 42px)' : 'clamp(32px, 6vw, 62px)',
              fontWeight: 900, lineHeight: 1.1,
              marginBottom: '14px',
              background: 'linear-gradient(135deg, #e2e8f0 0%, #3b82f6 45%, #7c3aed 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              The Journey
            </h1>

            <p style={{
              fontSize: isMobile ? '13px' : '15px',
              color: '#475569', lineHeight: 1.8,
              maxWidth: isMobile ? '100%' : '500px',
              margin: isMobile ? '0 auto 28px' : '0 auto 40px',
              fontFamily: 'var(--font)',
            }}>
              Scroll to fly through the timeline — a spaceship navigating each milestone
              in my growth as a developer and engineer.
            </p>

            {/* Phase pills */}
            <div style={{
              display: 'flex', justifyContent: 'center',
              gap: isMobile ? '10px' : '16px',
              flexWrap: 'wrap',
              padding: isMobile ? '0 8px' : '0',
            }}>
              {journeyPhases.map(phase => (
                <div key={phase.id} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: isMobile ? '11px' : '12px',
                  color: '#475569', fontFamily: 'var(--mono)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: phase.planetColor, display: 'inline-block', opacity: 0.7 }} />
                  <span style={{ color: `${phase.planetColor}99` }}>{phase.title.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ═══ TIMELINE ═══ */}
        <section style={{
          padding: isMobile ? '10px 16px 80px' : '20px 24px 140px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>

            {/* Timeline vertical line */}
            <div style={{
              position: 'absolute',
              left: isMobile ? '27px' : '50%',   // left-rail on mobile, centre on desktop
              top: 0, bottom: 0,
              width: '1px',
              background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.3) 12%, rgba(59,130,246,0.25) 88%, transparent)',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              zIndex: 1,
            }} />

            <div style={{
              display: 'flex', flexDirection: 'column',
              gap: isMobile ? '40px' : '72px',
              paddingLeft: isMobile ? '0' : '0',
            }}>
              {journeyPhases.map((phase, i) => (
                <PhaseCard key={phase.id} phase={phase} index={i} />
              ))}
            </div>

            {/* End marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{
                textAlign: isMobile ? 'left' : 'center',
                paddingLeft: isMobile ? '56px' : '0',
                marginTop: isMobile ? '48px' : '88px',
                position: 'relative', zIndex: 2,
              }}
            >
              <div style={{ fontSize: isMobile ? '32px' : '40px', marginBottom: '10px', opacity: 0.85 }}>🌟</div>
              <p style={{ fontFamily: 'var(--heading)', fontSize: isMobile ? '14px' : '16px', color: '#cbd5e1', marginBottom: '4px' }}>
                To Be Continued...
              </p>
              <p style={{ fontFamily: 'var(--font)', fontSize: '13px', color: '#334155' }}>
                The voyage continues. New stars await.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
