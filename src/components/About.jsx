import './About.css';

const STATS = [
  { value: '5+', label: 'Production projects shipped' },
  { value: '8.16', label: 'CGPA at IIIT Vadodara' },
  { value: '3★', label: 'CodeChef rating' },
  { value: '120+', label: 'LeetCode problems solved' },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__inner">
        {/* Left */}
        <div className="about__left reveal">
          <p className="section-label">About</p>
          <h2 className="about__headline">
            I build things that<br />work at scale.
          </h2>
          <div className="about__body">
            <p>
              I'm Anmol Kumar, a Computer Science student at IIIT Vadodara (Batch 2028).
              I focus on the gap between concept and deployed software — writing backend logic
              that holds under load, frontend interfaces that feel deliberate, and systems
              where the architecture decision matters as much as the feature itself.
            </p>
            <p>
              My work spans real-time socket systems, relational database design, computer
              vision pipelines (YOLOv8 + OpenCV), and React-driven UIs. I've shipped across
              the full stack — from MySQL schemas to Vercel deployments — on projects that
              solve actual problems for actual users.
            </p>
            <p>
              Currently exploring machine learning integration with web systems, and sharpening
              competitive programming skills on Codeforces and LeetCode.
            </p>
          </div>
          <div className="about__links">
            <a
              href="https://github.com/hck-anmol"
              target="_blank"
              rel="noopener noreferrer"
              className="about__link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              hck-anmol
            </a>
            <a href="mailto:anmolkrj006@gmail.com" className="about__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              anmolkrj006@gmail.com
            </a>
          </div>
        </div>

        {/* Right — stat grid */}
        <div className="about__right">
          <div className="about__stats">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className={`about__stat reveal reveal-delay-${i + 1}`}>
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Currently block */}
          <div className="about__currently reveal reveal-delay-3">
            <p className="about__currently-label">
              <span className="hero__status-dot" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', marginRight: 8 }} />
              Currently
            </p>
            <ul className="about__currently-list">
              <li>B.Tech CSE @ IIIT Vadodara (2024–2028)</li>
              <li>Exploring ML + web integration</li>
              <li>Open to internship / freelance projects</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
