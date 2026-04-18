import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import gitLogo from '../assets/gitlogo.webp';
import linkdinLogo from '../assets/linkdin.webp';
import emailLogo from '../assets/email.webp';

const socials = [
  { icon: gitLogo,    title: 'GitHub',   href: 'https://github.com/hck-anmol' },
  { icon: linkdinLogo, title: 'LinkedIn', href: 'https://www.linkedin.com/in/anmolkrj006/' },
  { icon: emailLogo,  title: 'Email',    href: 'mailto:anmolkrj006@gmail.com' },
];

const navLinks = ['About', 'Skills', 'Projects', 'Contact'];

export default function Footer() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ padding: '60px 20px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: '22px', background: 'linear-gradient(135deg, var(--blue), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '12px', display: 'block' }}>
              {'<Anmol />'}
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '240px', lineHeight: 1.7, fontFamily: 'var(--font)' }}>
              Full-Stack Developer crafting futuristic, immersive web experiences.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', fontFamily: 'var(--mono)', letterSpacing: '2px', textTransform: 'uppercase' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map(link => (
                <motion.button key={link} onClick={() => scrollTo(link)} whileHover={{ x: 4, color: 'var(--purple)' }} data-hover
                  style={{ background: 'none', border: 'none', fontSize: '14px', color: 'var(--muted)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font)', transition: 'color 0.2s', padding: 0 }}
                >{link}</motion.button>
              ))}
              <Link to="/journey" data-hover style={{ fontSize: '14px', color: 'var(--purple)', fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Journey
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', fontFamily: 'var(--mono)', letterSpacing: '2px', textTransform: 'uppercase' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="mailto:anmolkrj006@gmail.com" data-hover style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font)' }}>
                anmolkrj006@gmail.com
              </a>
              <span style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font)' }}>Gandhinagar, Gujarat, India</span>
              <span style={{ fontSize: '14px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font)' }}>
                <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                Available for work
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font)' }}>
            Built with passion by <strong style={{ color: 'var(--text)' }}>Anmol</strong> · Powered by caffeine &amp; curiosity · © 2026
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {socials.map(s => (
              <motion.a key={s.title} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" title={s.title} data-hover
                whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.6)', background: 'rgba(139,92,246,0.1)' }}
                style={{ width: 38, height: 38, background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
              >
                <img src={s.icon} alt={s.title} style={{ width: 20, height: 20, objectFit: 'contain' }} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
