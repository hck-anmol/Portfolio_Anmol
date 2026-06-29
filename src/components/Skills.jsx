import './Skills.css';

const SKILL_GROUPS = [
  {
    domain: 'Frontend',
    color: 'blue',
    skills: ['React.js', 'Vite', 'HTML5', 'CSS3', 'JavaScript ES6+', 'Tailwind CSS'],
  },
  {
    domain: 'Backend',
    color: 'violet',
    skills: ['Node.js', 'Express.js', 'Socket.io', 'REST APIs', 'JWT Auth', 'Rate Limiting'],
  },
  {
    domain: 'Database',
    color: 'cyan',
    skills: ['MySQL', 'MongoDB', 'Aiven Cloud', 'Firebase', 'SQL Design', 'Indexing'],
  },
  {
    domain: 'AI / ML & Computer Vision',
    color: 'green',
    skills: ['RAG', 'Prompt Engineering', 'ML Concepts', 'Python', 'YOLOv8', 'OpenCV', 'TensorFlow', 'NumPy'],
  },
  {
    domain: 'Mobile',
    color: 'orange',
    skills: ['Flutter', 'Dart', 'Provider', 'Material 3'],
  },
  {
    domain: 'Tools & DevOps',
    color: 'muted',
    skills: ['Git & GitHub', 'Vercel', 'Render', 'Postman', 'VS Code', 'Docker (learning)'],
  },
];

const COLORS = {
  blue:   { bg: 'rgba(91,141,239,0.08)',  color: '#5B8DEF',  border: 'rgba(91,141,239,0.15)'  },
  violet: { bg: 'rgba(167,139,250,0.08)', color: '#A78BFA',  border: 'rgba(167,139,250,0.15)' },
  cyan:   { bg: 'rgba(6,182,212,0.08)',   color: '#22D3EE',  border: 'rgba(6,182,212,0.15)'   },
  green:  { bg: 'rgba(52,211,153,0.08)',  color: '#34D399',  border: 'rgba(52,211,153,0.15)'  },
  orange: { bg: 'rgba(251,191,36,0.08)',  color: '#FBBF24',  border: 'rgba(251,191,36,0.15)'  },
  muted:  { bg: 'rgba(139,154,181,0.08)', color: '#8B9AB5',  border: 'rgba(139,154,181,0.15)' },
};

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Skills</p>
          <h2 className="skills__headline">Technology across the stack.</h2>
          <p className="skills__sub">
            Tools I've used in production, not just tutorials.
          </p>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, i) => {
            const c = COLORS[group.color];
            return (
              <div
                key={group.domain}
                className={`skill-group reveal reveal-delay-${(i % 4) + 1}`}
              >
                <div className="skill-group__header">
                  <div
                    className="skill-group__dot"
                    style={{ background: c.color }}
                  />
                  <h3
                    className="skill-group__domain"
                    style={{ color: c.color }}
                  >
                    {group.domain}
                  </h3>
                </div>
                <div className="skill-group__tags">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="skill-tag"
                      style={{
                        background: c.bg,
                        color: c.color,
                        borderColor: c.border,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
