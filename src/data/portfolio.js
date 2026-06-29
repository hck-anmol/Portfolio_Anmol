import navpImg from '../assets/navp.png';
import sketchaaImg from '../assets/sketchaa.png';
import moviebuzzImg from '../assets/moviebuzz.svg';

// ================================================================
// PROJECTS DATA (rich — used by cards AND detail pages)
// ================================================================
export const projects = [
  {
    id: 'traffiq',
    emoji: '🚦',
    title: 'TRAFF-IQ',
    subtitle: 'Intelligent Traffic Management System',
    type: ['IoT / AI', 'Smart City'],
    typeColors: ['green', 'yellow'],
    shortDesc: 'AI-powered urban traffic management with real-time density monitoring and emergency vehicle priority.',
    description:
      'TRAFF-IQ is an Intelligent Traffic Management System designed for modern smart cities. It leverages real-time traffic density monitoring, dynamic route optimization, and emergency vehicle priority lanes to reduce congestion and improve urban mobility. A live analytics dashboard provides actionable insights for city traffic operators.',
    features: [
      'Real-time traffic density monitoring via sensor simulation',
      'Dynamic route optimization engine',
      'Emergency vehicle priority override system',
      'Live analytics dashboard with charts',
      'Multi-junction intelligent signal control',
      'Historical traffic pattern analysis',
    ],
    tech: ['MERN', 'Real-Time Data', 'YOLOv8', 'Chart.js', 'REST APIs', 'OpenCV', 'Python', 'Arduino'],
    github: 'https://github.com/hck-anmol/TRAFF-IQ',
    live: null,
    featured: false,
    color: '#22c55e',
  },
  {
    id: 'sketchaa',
    emoji: '🎨',
    title: 'Sketchaa',
    subtitle: 'Real-Time Multiplayer Drawing Game',
    image: sketchaaImg,
    type: ['Real-Time', 'Multiplayer'],
    typeColors: ['cyan', 'blue'],
    shortDesc: 'Fast-paced multiplayer draw-and-judge game with live leaderboards, in-game chat, and room management.',
    description:
      'Sketchaa is a real-time multiplayer drawing and judging game where players are given a word to draw, and other players rate the sketches anonymously. The game features live leaderboards, room creation, in-game chat, automatic room expiry, and a smooth drawing canvas — all powered by Socket.io for sub-100ms real-time sync.',
    features: [
      'Real-time canvas sync via Socket.io',
      'Anonymous peer rating system',
      'Live leaderboard with score animations',
      'In-game chat with emoji support',
      'Room creation, joining & auto-expiry',
      'Turn-based game loop with timer',
      'Mobile-friendly touch drawing support',
    ],
    tech: ['React', 'Socket.io', 'Express', 'Node.js', 'Tailwind CSS', 'Canvas API'],
    github: 'https://github.com/hck-anmol/Sketchaa',
    live: 'https://sketchaa.vercel.app/',
    featured: true,
    color: '#06b6d4',
  },
  {
    id: 'certifications',
    emoji: '📃',
    title: 'Certifications',
    subtitle: 'Professional Courses & Credentials',
    type: ['Achievement', 'Learning'],
    typeColors: ['purple', 'blue'],
    shortDesc: 'A curated collection of professional certifications spanning full-stack development, cloud computing, and data structures.',
    description:
      'An educational institution portal built with the MERN stack (React, Node.js, Express, MySQL) that allows students to verify their identity using name, date of birth, and registration number, then dynamically generate and download personalized certificates and attendance sheets as PDFs — powered by pdf-lib with security via rate limiting and parameterized queries.',
    features: [
      'Student Identity Verification — Validates name, DOB, and registration number.',
      'Dynamic Certificate Generation — Generates personalized PDFs from templates.',
      'Attendance Sheet Download — Downloads day-wise attendance as PDF.',
      'Secure API Endpoints — Rate-limited and Helmet.js protected.',
      'SQL Injection Prevention — Uses parameterized MySQL database queries.',
      'Name Mismatch Protection — Case-insensitive student name matching.',
      'MySQL-Backed Student Records — Stores profiles, grades, and attendance.'
    ],
    tech: ['MERN Stack', 'React', 'DSA', 'SQL', 'Python', 'Cloud', 'AWS', 'Pdf-lib', 'mySQL'],
    github: 'https://github.com/hck-anmol',
    live: null,
    featured: false,
    color: '#8b5cf6',
  },
  {
    id: 'navastitva',
    emoji: '🌿',
    title: 'NavAstitva',
    subtitle: 'NGO Web Portal',
    image: navpImg,
    type: ['NGO Platform', 'Full-Stack'],
    typeColors: ['green', 'pink'],
    shortDesc: 'Full-featured NGO web portal with hero slider, donation flow, career applications, and audit reports.',
    description:
      'NavAstitva is a comprehensive web portal built for an NGO, providing all the digital tools needed to run an impactful organization. It includes a dynamic hero image slider, mission & vision pages, impact milestones, team profiles, published audit reports, a career application system, an online donation flow, and a community survey system.',
    features: [
      'Dynamic hero slider with CMS-style content',
      'Mission, vision & impact milestone pages',
      'Team member profiles with roles',
      'Published audit reports with PDF downloads',
      'Career application form with file upload',
      'Online donation flow UI',
      'Community survey & feedback system',
      'Fully responsive mobile design',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Vercel'],
    github: 'https://github.com/hck-anmol/NavAstitva',
    live: 'https://navastitwa.vercel.app/',
    featured: false,
    color: '#22c55e',
  },
  {
    id: 'moviebuzz',
    emoji: '🎬',
    title: 'MovieBuzz',
    subtitle: 'Location-Aware Bollywood Booking Platform',
    image: moviebuzzImg,
    type: ['Full-Stack', 'MERN'],
    typeColors: ['purple', 'pink'],
    shortDesc: 'Location-aware Bollywood movie booking with seat selection, JWT auth, cancellations, and admin dashboard.',
    description:
      'MovieBuzz is a full-stack location-aware Bollywood movie booking platform. Users browse theatres by city, select movies, choose seats on an interactive seat map, and complete bookings. Key features include JWT-based authentication, booking cancellation, invite-a-friend seat sharing, and a comprehensive admin dashboard with revenue analytics displayed in ₹.',
    features: [
      'Location-aware theatre & movie browsing',
      'Interactive seat selection map',
      'JWT authentication (register / login)',
      'Booking cancellation with refund flow',
      'Invite-a-friend with visual seat highlight',
      'Admin dashboard: revenue, bookings, users',
      '20 curated Bollywood movies pre-loaded',
    ],
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Aiven Cloud', 'Tailwind CSS', 'Vercel', 'Render'],
    github: 'https://github.com/hck-anmol/MovieBuzz',
    live: null,
    featured: true,
    color: '#8b5cf6',
  },
  {
    id: 'gymkhana',
    emoji: '🏛️',
    title: 'Gymkhana',
    subtitle: 'Club & Event Management Platform',
    type: ['Full-Stack', 'Web App'],
    typeColors: ['purple', 'pink'],
    shortDesc: 'Centralized platform for managing college clubs, events, registrations, and results with role-based access.',
    description:
      'Gymkhana is a full-stack web application built to streamline club and event management within institutions. It provides role-based dashboards for admins and coordinators to manage clubs, organize events, handle registrations, and publish results, while users can explore activities, register, and track participation through a unified interface.',
    features: [
      'Role-based dashboards for Admins and Coordinators',
      'Club discovery with detailed pages',
      'Event listing, details, and scheduling system',
      'User authentication and profile management (Clerk)',
      'Event registration and participation tracking',
      'Results publishing and viewing system',
      'Analytics and statistics dashboard (Stat cards)',
    ],
    tech: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'SQL',
      'Clerk Auth',
      'PostCSS',
      'Jest'
    ],
    github: 'https://github.com/code-manush/gymkhana',
    live: null,
    featured: false,
    color: '#a855f7',
  }
];

// ================================================================
// SKILLS DATA
// ================================================================
export const skills = [
  {
    icon: '',
    category: 'Frontend',
    color: 'blue',
    tags: [
      { name: 'React.js', color: 'blue' },
      { name: 'Vite', color: 'blue' },
      { name: 'HTML5', color: 'blue' },
      { name: 'CSS3', color: 'blue' },
      { name: 'Tailwind CSS', color: 'purple' },
      { name: 'JavaScript ES6+', color: 'purple' },
    ],
  },
  {
    icon: '',
    category: 'Backend',
    color: 'pink',
    tags: [
      { name: 'Node.js', color: 'pink' },
      { name: 'Express.js', color: 'pink' },
      { name: 'Socket.io', color: 'pink' },
      { name: 'REST APIs', color: 'pink' },
      { name: 'JWT Auth', color: 'pink' },
    ],
  },
  {
    icon: '',
    category: 'Database',
    color: 'cyan',
    tags: [
      { name: 'MySQL', color: 'cyan' },
      { name: 'MongoDB', color: 'cyan' },
      { name: 'Aiven Cloud', color: 'cyan' },
      { name: 'Firebase', color: 'cyan' },
    ],
  },
  {
    icon: '',
    category: 'Mobile',
    color: 'blue',
    tags: [
      { name: 'Flutter', color: 'blue' },
      { name: 'Dart', color: 'blue' },
      { name: 'Provider', color: 'blue' },
      { name: 'Material 3', color: 'purple' },
    ],
  },
  {
    icon: '',
    category: 'Tools & DevOps',
    color: 'green',
    tags: [
      { name: 'Git & GitHub', color: 'green' },
      { name: 'Vercel', color: 'green' },
      { name: 'VS Code', color: 'green' },
      { name: 'Postman', color: 'green' },
    ],
  },
  {
    icon: '',
    category: 'AI / ML',
    color: 'cyan',
    tags: [
      { name: 'RAG', color: 'cyan' },
      { name: 'Prompt Engineering', color: 'cyan' },
      { name: 'ML Concepts', color: 'blue' },
      { name: 'TensorFlow', color: 'pink' },
      { name: 'OpenCV', color: 'cyan' },
      { name: 'Docker', color: 'cyan' },
      { name: 'System Design', color: 'blue' },
    ],
  },
];

// ================================================================
// JOURNEY PHASES
// ================================================================
export const journeyPhases = [
  {
    id: 'education',
    planet: '🎓',
    planetColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.4)',
    year: '2024 – Present',
    title: 'Education at IIIT Vadodara',
    subtitle: 'B.Tech Computer Science & Engineering',
    description:
      'Joined the prestigious Indian Institute of Information Technology, Vadodara as a CSE student. Immersed myself in computer science fundamentals — from algorithms and data structures to operating systems and computer networks. This is where the journey truly began.',
    highlights: ['IIIT Vadodara', 'B.Tech CSE', 'Batch of 2028', 'CGPA: 8.16'],
    tags: ['Algorithms', 'Data Structures', 'OS', 'DBMS', 'Computer Networks', 'OOPs'],
  },
  {
    id: 'cp',
    planet: '🏆',
    planetColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.4)',
    year: '2025 – 2026',
    title: 'Competitive Programming',
    subtitle: 'CodeForces Pupil · 200+ CF Problems · CodeChef 3⭐ · LeetCode 160+ · 450+ Total',
    description:
      'Dived deep into competitive programming to sharpen problem-solving skills. Achieved Pupil rank on CodeForces (profile: anmolkjha) with 200+ problems solved, CodeChef 3-star rating, and solved 160+ problems on LeetCode — totalling 450+ problems across platforms spanning dynamic programming, graphs, trees, and system optimization challenges.',
    highlights: ['CodeForces Pupil — anmolkjha', 'CodeChef 3⭐', 'LeetCode 160+ solved', '450+ Total Problems'],
    tags: ['Dynamic Programming', 'Graphs', 'Binary Search', 'Trees', 'Greedy', 'Number Theory'],
  },
  {
    id: 'dsa',
    planet: '🧠',
    planetColor: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.4)',
    year: '2025',
    title: 'DSA & Core CS Subjects',
    subtitle: 'Deep dive into Computer Science fundamentals',
    description:
      'Mastered core computer science subjects alongside advanced DSA. Topics covered include DBMS with SQL optimization, Operating Systems (processes, memory management, scheduling), OOPs design principles, and Computer Networks protocols.',
    highlights: ['DSA Mastery', 'DBMS & SQL', 'OS Internals', 'OOPs Design Patterns'],
    tags: ['DBMS', 'OS', 'OOPs', 'Computer Networks', 'SQL', 'System Design'],
  },
  {
    id: 'fullstack',
    planet: '🌐',
    planetColor: '#ec4899',
    glowColor: 'rgba(236,72,153,0.4)',
    year: '2024 – 2025',
    title: 'Full-Stack Development',
    subtitle: 'MERN Stack · Real-Time Apps · Production Systems',
    description:
      'Transitioned from theory to building real-world production applications. Mastered the MERN stack and built MovieBuzz (booking platform), Sketchaa (real-time multiplayer game), TRAFF-IQ (AI traffic system), and NavAstitva (NGO portal). Each project pushed me to learn more about scalable architecture and real-time systems.',
    highlights: ['5+ Production Projects', 'MERN Stack Expert', 'Socket.io Real-Time', 'JWT & Auth Systems'],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Socket.io', 'JWT', 'REST APIs'],
  },
  {
    id: 'aiml',
    planet: '🤖',
    planetColor: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.4)',
    year: '2025 – Present',
    title: 'AI / ML Journey',
    subtitle: 'RAG · Prompt Engineering · ML Concepts · TensorFlow · OpenCV · YOLO',
    description:
      'Expanding into Artificial Intelligence and Machine Learning. Learned RAG (Retrieval-Augmented Generation), Prompt Engineering, and core ML concepts. Exploring computer vision with OpenCV and YOLO-based object detection models, building neural networks with TensorFlow, and integrating AI capabilities into web applications.',
    highlights: ['RAG & Prompt Engineering', 'Core ML Concepts', 'TensorFlow basics', 'OpenCV & YOLO'],
    tags: ['RAG', 'Prompt Engineering', 'TensorFlow', 'OpenCV', 'YOLO', 'Python', 'NumPy', 'Computer Vision', 'Deep Learning'],
  },
];

// ================================================================
// COLOR MAPS
// ================================================================
export const typeColorMap = {
  blue: { bg: 'rgba(59,130,246,.15)', color: '#3b82f6', border: 'rgba(59,130,246,.25)' },
  purple: { bg: 'rgba(139,92,246,.15)', color: '#8b5cf6', border: 'rgba(139,92,246,.25)' },
  pink: { bg: 'rgba(236,72,153,.15)', color: '#ec4899', border: 'rgba(236,72,153,.25)' },
  cyan: { bg: 'rgba(6,182,212,.15)', color: '#06b6d4', border: 'rgba(6,182,212,.25)' },
  green: { bg: 'rgba(34,197,94,.15)', color: '#22c55e', border: 'rgba(34,197,94,.25)' },
  yellow: { bg: 'rgba(234,179,8,.15)', color: '#eab308', border: 'rgba(234,179,8,.25)' },
};

export const tagColorMap = {
  blue: { bg: 'rgba(59,130,246,.1)', border: 'rgba(59,130,246,.2)', color: '#3b82f6' },
  purple: { bg: 'rgba(139,92,246,.1)', border: 'rgba(139,92,246,.2)', color: '#8b5cf6' },
  pink: { bg: 'rgba(236,72,153,.1)', border: 'rgba(236,72,153,.2)', color: '#ec4899' },
  cyan: { bg: 'rgba(6,182,212,.1)', border: 'rgba(6,182,212,.2)', color: '#06b6d4' },
  green: { bg: 'rgba(34,197,94,.1)', border: 'rgba(34,197,94,.2)', color: '#22c55e' },
};
