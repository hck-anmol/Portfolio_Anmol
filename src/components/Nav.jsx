import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Nav.css';

const NAV_LINKS = [
  { hash: 'about',    label: 'About' },
  { hash: 'projects', label: 'Projects' },
  { hash: 'skills',   label: 'Skills' },
  { hash: 'timeline', label: 'Timeline' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smoothly scroll to a section. If not on home page, navigate home first then scroll.
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home, then scroll after mount
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        {/* Logo */}
        <a
          href="/"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault();
            if (isHome) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
        >
          <span className="nav__logo-mark">AK</span>
          <span className="nav__logo-dot" />
        </a>

        {/* Desktop links */}
        <nav className="nav__links" aria-label="Site navigation">
          {NAV_LINKS.map(({ hash, label }) => (
            <a
              key={hash}
              href={`/#${hash}`}
              className="nav__link"
              onClick={(e) => handleNavClick(e, hash)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="nav__right">
          <a
            href="/#contact"
            className="nav__cta"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Let's Talk
          </a>
          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav__mobile">
          {NAV_LINKS.map(({ hash, label }) => (
            <a
              key={hash}
              href={`/#${hash}`}
              className="nav__mobile-link"
              onClick={(e) => handleNavClick(e, hash)}
            >
              {label}
            </a>
          ))}
          <a
            href="/#contact"
            className="nav__mobile-link nav__mobile-cta"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
}
