import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = ['About', 'Skills', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]       = useState('');
  const location = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';
  const isJourney = location.pathname === '/journey';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!isHome) return;
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '12px 60px' : '18px 60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          background: scrolled ? 'rgba(2,6,20,0.88)' : 'rgba(2,6,20,0.4)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} data-hover>
          <Link to="/" style={{
            fontFamily: 'var(--heading)',
            fontWeight: 800, fontSize: '18px',
            background: 'linear-gradient(135deg, var(--blue), var(--purple))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {'<Anmol />'}
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }} className="nav-desktop-links">
          {navItems.map(item => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                data-hover
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font)',
                  color: (isHome && active === item.toLowerCase()) ? '#fff' : 'var(--muted)',
                  transition: 'color 0.2s', position: 'relative', padding: '4px 0',
                }}
              >
                {item}
                {isHome && active === item.toLowerCase() && (
                  <motion.div layoutId="nav-underline" style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0, height: '1.5px',
                    background: 'linear-gradient(90deg, var(--blue), var(--purple))', borderRadius: '99px',
                  }} />
                )}
              </button>
            </li>
          ))}

          {/* Journey link */}
          <li>
            <Link to="/journey" data-hover style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 16px',
              background: isJourney ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.08)',
              border: `1px solid ${isJourney ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.2)'}`,
              borderRadius: '50px',
              fontSize: '13px', fontWeight: 600,
              color: isJourney ? '#c4b5fd' : 'var(--muted)',
              fontFamily: 'var(--font)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.2)'; e.currentTarget.style.color = '#c4b5fd'; }}
              onMouseLeave={e => { if (!isJourney) { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; e.currentTarget.style.color = 'var(--muted)'; } }}
            >
              Journey
            </Link>
          </li>
        </ul>

        {/* Hire Me CTA */}
        <motion.button
          onClick={() => scrollTo('Contact')}
          className="nav-desktop-links"
          data-hover
          whileHover={{ scale: 1.05, boxShadow: '0 8px 28px rgba(139,92,246,0.4)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '8px 20px',
            background: 'linear-gradient(135deg, var(--blue), var(--purple))',
            borderRadius: '50px', fontSize: '13px', fontWeight: 600,
            color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)',
          }}
        >
          Hire Me
        </motion.button>

        {/* Hamburger */}
        <button id="hamburger" className="nav-mobile-btn"
          onClick={() => setMobileOpen(true)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: '5px' }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px' }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(2,6,20,0.97)', backdropFilter: 'blur(20px)',
              padding: '80px 40px', display: 'flex', flexDirection: 'column', gap: '28px',
            }}
          >
            <button onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20, fontSize: '28px', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}>
              ✕
            </button>
            {navItems.map((item, i) => (
              <motion.button key={item}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(item)}
                style={{ background: 'none', border: 'none', fontSize: '26px', fontWeight: 700, color: 'var(--text)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--heading)' }}
              >{item}</motion.button>
            ))}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.07 }}>
              <Link to="/journey" onClick={() => setMobileOpen(false)} style={{ fontSize: '26px', fontWeight: 700, color: 'var(--purple)', fontFamily: 'var(--heading)' }}>
                Journey
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          #hamburger { display: flex !important; }
          nav { padding: 14px 20px !important; }
        }
      `}</style>
    </>
  );
}
