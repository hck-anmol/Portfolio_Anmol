import './Timeline.css';

const PHASES = [
  {
    year: '2024',
    title: 'IIIT Vadodara',
    subtitle: 'B.Tech Computer Science & Engineering',
    description:
      'Joined the Indian Institute of Information Technology, Vadodara as a CSE student. Immersed in algorithms, data structures, OS, DBMS, and computer networks.',
    tags: ['Algorithms', 'DSA', 'OS', 'DBMS', 'Networks', 'OOPs'],
    color: '#5B8DEF',
  },
  {
    year: '2024–25',
    title: 'Full-Stack Development',
    subtitle: 'MERN Stack · Real-Time Apps · Production Systems',
    description:
      'Built and shipped five production-grade applications — ranging from a location-aware booking platform to a real-time multiplayer game. Mastered the full request lifecycle: schema to deployment.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.io', 'JWT', 'Vercel'],
    color: '#A78BFA',
  },
  {
    year: '2025',
    title: 'Competitive Programming',
    subtitle: 'CodeChef 3★ · LeetCode 120+ · Codeforces',
    description:
      'Achieved CodeChef 3-star rating. Solved 120+ LeetCode problems spanning dynamic programming, graphs, binary search, and greedy optimization. Active on Codeforces.',
    tags: ['DP', 'Graphs', 'Binary Search', 'Greedy', 'Trees', 'Number Theory'],
    color: '#FBBF24',
  },
  {
    year: '2025–Present',
    title: 'AI / Computer Vision',
    subtitle: 'YOLOv8 · OpenCV · TensorFlow · Python',
    description:
      'Expanding into machine learning and computer vision. Integrated YOLOv8 vehicle detection into TRAFF-IQ, exploring TensorFlow for neural networks, and building toward ML-augmented web systems.',
    tags: ['YOLOv8', 'OpenCV', 'TensorFlow', 'Python', 'NumPy', 'Computer Vision'],
    color: '#34D399',
  },
];

export default function Timeline() {
  return (
    <section className="section timeline" id="timeline">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Timeline</p>
          <h2 className="timeline__headline">The arc of the work.</h2>
        </div>

        <div className="timeline__track">
          {PHASES.map((phase, i) => (
            <div
              key={phase.title}
              className={`timeline__item reveal reveal-delay-${i + 1}`}
            >
              {/* Line + node */}
              <div className="timeline__node-col">
                <div
                  className="timeline__node"
                  style={{ background: phase.color, boxShadow: `0 0 16px ${phase.color}55` }}
                />
                {i < PHASES.length - 1 && <div className="timeline__connector" />}
              </div>

              {/* Content */}
              <div className="timeline__content">
                <span
                  className="timeline__year"
                  style={{ color: phase.color }}
                >
                  {phase.year}
                </span>
                <h3 className="timeline__title">{phase.title}</h3>
                <p className="timeline__subtitle">{phase.subtitle}</p>
                <p className="timeline__desc">{phase.description}</p>
                <div className="timeline__tags">
                  {phase.tags.map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
