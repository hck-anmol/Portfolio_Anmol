import './Profiles.css';

const PROFILES = [
  {
    id: 'codeforces',
    name: 'Codeforces',
    handle: 'anmolkjha',
    badge: 'Pupil',
    badgeColor: '#06b6d4',
    stat: '200+ solved',
    url: 'https://codeforces.com/profile/anmolkjha',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 7.5A1.5 1.5 0 0 1 6 6h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 8 18H6a1.5 1.5 0 0 1-1.5-1.5v-9zm6-3A1.5 1.5 0 0 1 12 3h2a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 14 18h-2a1.5 1.5 0 0 1-1.5-1.5v-12zm6 5A1.5 1.5 0 0 1 18 8h2a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 20 18h-2a1.5 1.5 0 0 1-1.5-1.5v-7z"/>
      </svg>
    ),
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: '_anmolkj_',
    badge: '160+ solved',
    badgeColor: '#f59e0b',
    stat: '160+ problems',
    url: 'https://leetcode.com/u/_anmolkj_/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.lodash-1.113-2.614-1.321V1.38A1.38 1.38 0 0 0 13.483 0z"/>
      </svg>
    ),
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    handle: 'anmol_kj',
    badge: '3★',
    badgeColor: '#a78bfa',
    stat: '3-star rated',
    url: 'https://www.codechef.com/users/anmol_kj',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.257 0C5.04 0 0 5.04 0 11.257c0 6.218 5.04 11.257 11.257 11.257 6.218 0 11.257-5.04 11.257-11.257C22.514 5.04 17.475 0 11.257 0zm0 1.388c5.449 0 9.869 4.42 9.869 9.869 0 5.449-4.42 9.869-9.869 9.869-5.449 0-9.869-4.42-9.869-9.869 0-5.449 4.42-9.869 9.869-9.869zm-.63 3.472c-.347.018-.68.18-.92.463L7.13 8.187a1.39 1.39 0 0 0 .093 1.963l.67.603-3.02 3.354a1.39 1.39 0 0 0 .093 1.963l2.575 2.317c.57.513 1.449.467 1.963-.103l3.02-3.354.67.603c.57.513 1.449.467 1.963-.103l2.577-2.863a1.39 1.39 0 0 0-.093-1.963l-.67-.603 1.443-1.603a1.39 1.39 0 0 0-.093-1.963L15.746 4.12a1.39 1.39 0 0 0-1.963.093L12.34 5.817l-.67-.603a1.39 1.39 0 0 0-1.043-.354z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: 'hck-anmol',
    badge: '5+ Projects',
    badgeColor: '#94a3b8',
    stat: 'Open source',
    url: 'https://github.com/hck-anmol',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.912.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    id: 'codolio',
    name: 'Codolio',
    handle: 'anmol_kj',
    badge: 'Portfolio',
    badgeColor: '#34d399',
    stat: 'All stats',
    url: 'https://codolio.com/profile/anmol_kj/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

export default function Profiles() {
  return (
    <section className="section profiles" id="profiles">
      <div className="container">
        <p className="section-label">Profiles</p>
        <h2 className="profiles__headline">Find me across the web.</h2>
        <p className="profiles__sub">
          Competitive programming, open-source, and everything in between.
        </p>

        <div className="profiles__grid">
          {PROFILES.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card"
            >
              <div className="profile-card__top">
                <div className="profile-card__icon" style={{ color: p.badgeColor }}>
                  {p.icon}
                </div>
                <span
                  className="profile-card__badge"
                  style={{ color: p.badgeColor, borderColor: p.badgeColor + '33', background: p.badgeColor + '12' }}
                >
                  {p.badge}
                </span>
              </div>
              <div className="profile-card__name">{p.name}</div>
              <div className="profile-card__handle">@{p.handle}</div>
              <div className="profile-card__arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
