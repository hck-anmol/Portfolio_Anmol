import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 12;
      });
    }, 120);

    const timer = setTimeout(() => setHidden(true), 2800);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Warp lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${60 + i * 40}px`,
                height: '1px',
                background: `rgba(${i % 2 ? '139,92,246' : '59,130,246'}, ${0.15 + i * 0.05})`,
                transform: `translate(-50%,-50%) rotate(${i * 22.5}deg)`,
                animation: `warpLine ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}

          {/* Glow ring */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            animation: 'glowPulse 2s ease-in-out infinite',
          }} />

          {/* Rocket */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [-45, -45, -45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '52px', lineHeight: 1 }}
          >
            🚀
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: '220px', height: '3px', background: 'rgba(255,255,255,.08)', borderRadius: '99px', overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--blue), var(--purple), var(--pink))',
                borderRadius: '99px',
              }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Text */}
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            color: 'var(--muted)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            Launching Portfolio...
          </p>

          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            color: 'var(--purple)',
            letterSpacing: '2px',
          }}>
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
