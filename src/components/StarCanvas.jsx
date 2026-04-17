import { useEffect, useRef } from 'react';

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let W, H;
    const stars    = [];
    const shooters = [];
    let shootInterval = 0;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x    = Math.random() * W;
        this.y    = Math.random() * H;
        this.r    = Math.random() * 1.2 + 0.2;
        this.a    = Math.random();
        this.speed = Math.random() * 0.3 + 0.05;
        this.dir   = Math.random() * Math.PI * 2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.015 + 0.004;
        // Subtle pale colours — no loud neon
        const cols = ['#94a3b8','#c4b5fd','#93c5fd','#e2e8f0','#7dd3fc'];
        this.color = cols[Math.floor(Math.random() * cols.length)];
      }
      update() {
        this.pulse += this.pulseSpeed;
        this.a = 0.2 + Math.abs(Math.sin(this.pulse)) * 0.65;
        this.x += Math.cos(this.dir) * this.speed * 0.06;
        this.y += Math.sin(this.dir) * this.speed * 0.06;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.a);
        ctx.fillStyle   = this.color;
        ctx.shadowBlur  = 4;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class ShootingStar {
      constructor() { this.reset(); this.active = false; }
      reset() {
        this.x       = Math.random() * W;
        this.y       = Math.random() * H * 0.5;
        this.len     = Math.random() * 110 + 50;
        this.speed   = Math.random() * 8 + 5;
        this.angle   = Math.PI / 4 + (Math.random() - 0.5) * 0.35;
        this.life    = 0;
        this.maxLife = this.len / this.speed;
        this.active  = false;
      }
      update() {
        if (!this.active) return;
        this.life++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.life > this.maxLife) { this.active = false; this.reset(); }
      }
      draw() {
        if (!this.active) return;
        const prog = this.life / this.maxLife;
        const grad = ctx.createLinearGradient(
          this.x - Math.cos(this.angle) * this.len,
          this.y - Math.sin(this.angle) * this.len,
          this.x, this.y
        );
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `rgba(226,232,240,${(1 - prog) * 0.7})`);
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(
          this.x - Math.cos(this.angle) * this.len * prog,
          this.y - Math.sin(this.angle) * this.len * prog
        );
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Fewer stars: 160 instead of 220
    for (let i = 0; i < 160; i++) stars.push(new Star());
    for (let i = 0; i < 2; i++) shooters.push(new ShootingStar());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s    => { s.update(); s.draw(); });
      shooters.forEach(s => { s.update(); s.draw(); });
      shootInterval++;
      // Shoot every ~220 frames (less frequent)
      if (shootInterval > 220) {
        const idle = shooters.find(s => !s.active);
        if (idle) { idle.active = true; shootInterval = 0; }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    const handleScroll = () => {
      canvas.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      id="stars-canvas"
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
