// ================================================================
// CENTRALIZED PROJECT DATA
// Used by Projects.jsx (cards) and ProjectDetail.jsx (detail page)
// ================================================================

// ── Traffiq photos ──────────────────────────────────────────────
import traffiqOptimalRoute    from './photos/traffiq/optimalroute.png';
import traffiqPrioritizing    from './photos/traffiq/prioritizing.png';
import traffiqRedLight        from './photos/traffiq/redlightviolation.png';
import traffiqDensity         from './photos/traffiq/trafficdensity.png';

// ── Sketchaa photos ─────────────────────────────────────────────
import sketchaaCanvas         from './photos/sketchaa/canvas.png';
import sketchaaChat           from './photos/sketchaa/chat.png';
import sketchaaCreateRoom     from './photos/sketchaa/createRoom.png';
import sketchaaDraw           from './photos/sketchaa/draw.png';
import sketchaaHome           from './photos/sketchaa/home.png';
import sketchaaInfo           from './photos/sketchaa/info.png';
import sketchaaJudgement      from './photos/sketchaa/judgement.png';
import sketchaaLeaderboard    from './photos/sketchaa/leaderboard.png';

// ── MovieBuzz photos ────────────────────────────────────────────
import movieAddMovies         from './photos/moviebuzz/addmovies.png';
import movieAddTheater        from './photos/moviebuzz/addtheater.png';
import movieConfirmation      from './photos/moviebuzz/confirmation.png';
import movieFriendsInvite     from './photos/moviebuzz/friendsinvite.png';
import movieHomepage          from './photos/moviebuzz/homapege.png';
import movieManageMovies      from './photos/moviebuzz/managemovies.png';
import movieManageTheaters    from './photos/moviebuzz/managetheaters.png';
import movieMovieDetail       from './photos/moviebuzz/moviedetail.png';
import movieMovies            from './photos/moviebuzz/movies.png';
import moviePaymentDetail     from './photos/moviebuzz/paymentdetail.png';
import movieRecentBooking     from './photos/moviebuzz/recentbooking.png';
import movieSeating           from './photos/moviebuzz/seating.png';
import movieTheaterDetail     from './photos/moviebuzz/theaterdetail.png';
import movieTheaters          from './photos/moviebuzz/theaters.png';

// ── Gymkhana photos ─────────────────────────────────────────────
import gymAdminPanel          from './photos/gymkhana/adminpannel.jpeg';
import gymAuthentication      from './photos/gymkhana/authentication.jpeg';
import gymClub                from './photos/gymkhana/club.jpeg';
import gymDashboard           from './photos/gymkhana/dashboard.jpeg';
import gymEvents              from './photos/gymkhana/events.jpeg';
import gymLogin               from './photos/gymkhana/login.jpeg';
import gymProfile             from './photos/gymkhana/profile.jpeg';
import gymResults             from './photos/gymkhana/results.jpeg';

// ── NavAstitva photos ───────────────────────────────────────────
import navaAchievements       from './photos/navastitva/achievements.png';
import navaDonate             from './photos/navastitva/donate.png';
import navaGallery            from './photos/navastitva/gallery.png';
import navaHome               from './photos/navastitva/home.png';
import navaJoinus             from './photos/navastitva/joinus.png';
import navaJourney            from './photos/navastitva/journey.png';

export const PROJECTS = [
  {
    id: 'traffiq',
    tag: 'Computer Vision · IoT · MERN',
    tagColor: 'green',
    title: 'TRAFF-IQ',
    tagline: 'Computer vision meets civic infrastructure',
    shortBullets: [
      'Integrated YOLOv8-based vehicle detection (Python/OpenCV) with a MERN dashboard — sensor reads feed directly into signal timing decisions',
      'Built an emergency vehicle override pipeline that preempts signal logic across all connected junctions the moment an emergency is detected',
      'Delivered a real-time analytics surface (Chart.js) with congestion heatmaps, historical traffic patterns, and vehicle-class breakdowns',
    ],
    tech: ['YOLOv8', 'OpenCV', 'Python', 'React', 'Node.js', 'Express', 'MongoDB', 'Arduino', 'Chart.js'],
    github: 'https://github.com/hck-anmol/TRAFF-IQ',
    live: null,
    accent: '#34D399',

    // Detail page data
    overview: `TRAFF-IQ is an end-to-end intelligent traffic management system built for smart city infrastructure. It bridges computer vision (real-time vehicle detection via YOLOv8) with a full-stack web dashboard, enabling city operators to monitor congestion, optimize signal cycles, and respond to emergencies — all from a single interface.

The system was designed around two core problems: signal timing in modern cities is static (not responsive to actual traffic density), and emergency vehicles lose critical minutes stuck at red lights. TRAFF-IQ solves both.`,

    problem: 'Static traffic signals in Indian cities cause unnecessary congestion and delay emergency response times by up to 40%. Manual monitoring is infeasible at scale.',

    solution: 'A sensor-to-dashboard pipeline that detects vehicle density in real-time, computes optimal green-light durations per junction, and triggers emergency overrides autonomously.',

    architecture: [
      { layer: 'Detection Layer', detail: 'YOLOv8 model processes camera feeds via OpenCV, classifying vehicles by type (car, bus, truck, emergency) and counting per-lane density' },
      { layer: 'Signal Control Engine', detail: 'Python backend computes green-light durations proportional to lane density scores using a weighted time-slice algorithm' },
      { layer: 'Emergency Override', detail: 'Upon detecting an ambulance/fire truck, the system immediately grants green across the junction path, preempting all active cycles' },
      { layer: 'MERN Dashboard', detail: 'React frontend polls the Node.js API for live density data, renders Chart.js heatmaps, junction state, and historical pattern analysis' },
      { layer: 'Hardware Layer', detail: 'Arduino microcontrollers receive signal commands from the Python backend and control physical LED signals on the prototype board' },
    ],

    features: [
      'Real-time vehicle detection and classification using YOLOv8',
      'Dynamic signal timing engine based on live lane density',
      'Emergency vehicle priority override across junctions',
      'Live analytics dashboard with Chart.js visualizations',
      'Historical traffic pattern analysis and export',
      'Multi-junction signal coordination',
      'Arduino-based hardware prototype integration',
    ],

    techStack: {
      'AI / Vision': ['Python 3.10', 'YOLOv8 (Ultralytics)', 'OpenCV', 'NumPy'],
      'Backend': ['Node.js', 'Express.js', 'REST APIs', 'WebSockets'],
      'Frontend': ['React', 'Chart.js', 'CSS Modules'],
      'Database': ['MongoDB', 'Mongoose'],
      'Hardware': ['Arduino Uno', 'LED Matrix', 'Serial Communication'],
    },

    photos: [
      { src: traffiqOptimalRoute },
      { src: traffiqPrioritizing },
      { src: traffiqRedLight },
      { src: traffiqDensity },
    ],
  },

  {
    id: 'sketchaa',
    tag: 'Real-Time · WebSockets · Game',
    tagColor: 'blue',
    title: 'Sketchaa',
    tagline: 'Real-time game engine in the browser',
    shortBullets: [
      'Engineered a turn-based multiplayer drawing game with sub-100ms canvas synchronization across all connected clients via Socket.io',
      'Stateful server-side game loop manages turns, 60s countdowns, anonymous voting rounds, and live leaderboard computation — no database required',
      'Room lifecycle engine handles creation, lock-on-start, 10-minute inactivity expiry, and reconnection with state rehydration',
    ],
    tech: ['React', 'Socket.io', 'Express', 'Node.js', 'Canvas API', 'Tailwind CSS'],
    github: 'https://github.com/hck-anmol/Sketchaa',
    live: 'https://sketchaa.vercel.app/',
    accent: '#5B8DEF',

    overview: `Sketchaa is a real-time multiplayer drawing and judging game built entirely in the browser. Players are given a word, draw it on a shared canvas within 60 seconds, then rate each other's sketches anonymously. The player with the highest average score wins.

The engineering challenge was building a fully consistent multiplayer game loop without a database — all state lives on the server and is rehydrated on reconnect.`,

    problem: 'Most browser-based drawing games either use peer-to-peer (fragile) or require a database for game state (slow). Building a smooth, consistent multiplayer experience with sub-100ms latency requires careful server-authoritative state management.',

    solution: 'A server-authoritative game loop using Socket.io rooms — all state (turns, scores, canvas strokes) lives on the Node.js server. Clients are thin renderers that emit events and receive authoritative updates.',

    architecture: [
      { layer: 'Game Loop (Server)', detail: 'Node.js maintains all game state in-memory per room: current drawer, word list, timer, scores, voting state. No database involved.' },
      { layer: 'Canvas Sync', detail: 'Drawing strokes are emitted as delta events (path coordinates, color, width) and broadcast to all room members with <100ms latency via Socket.io' },
      { layer: 'Room Management', detail: 'Rooms auto-lock on game start, auto-expire after 10 min inactivity, and support graceful disconnection/reconnection with state rehydration' },
      { layer: 'Anonymous Voting', detail: 'During the judging phase, player names are hidden. Votes are tallied server-side to prevent manipulation.' },
      { layer: 'Leaderboard', detail: 'Live score updates pushed to all clients after each round. Final standings computed from average judge scores.' },
    ],

    features: [
      'Sub-100ms canvas stroke synchronization via Socket.io',
      'Server-authoritative game loop (no database needed)',
      'Anonymous peer voting system — names hidden during judging',
      'Live leaderboard updated in real-time after each round',
      'Room creation, lock-on-start, and 10-minute auto-expiry',
      'In-game chat with full emoji support',
      'Mobile touch drawing support via Canvas API',
      'Reconnection handling with full state rehydration',
    ],

    techStack: {
      'Frontend': ['React', 'Tailwind CSS', 'Canvas API', 'HTML5'],
      'Backend': ['Node.js', 'Express.js', 'Socket.io'],
      'Real-Time': ['WebSockets', 'Socket.io Rooms', 'Event Broadcasting'],
      'Deployment': ['Vercel (client)', 'Render (server)'],
    },

    photos: [
      { src: sketchaaHome },
      { src: sketchaaCreateRoom },
      { src: sketchaaCanvas },
      { src: sketchaaDraw },
      { src: sketchaaJudgement },
      { src: sketchaaLeaderboard },
      { src: sketchaaChat },
      { src: sketchaaInfo },
    ],
  },

  {
    id: 'moviebuzz',
    tag: 'Full-Stack · MERN · SQL',
    tagColor: 'violet',
    title: 'MovieBuzz',
    tagline: 'Booking infrastructure with a social layer',
    shortBullets: [
      'Built a 140-seat interactive map (10×14 grid) with real-time occupancy rendering, city-based theatre filtering, and full booking lifecycle',
      'Shipped an invite-a-friend system: generates unique URLs that pre-highlight a group\'s booked seats on the map for adjacent selection',
      'Deployed across Vercel, Render, and Aiven Cloud managed MySQL — production-grade infrastructure for a side project',
    ],
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Aiven Cloud', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/hck-anmol/MovieBuzz',
    live: null,
    accent: '#A78BFA',

    overview: `MovieBuzz is a full-stack Bollywood movie booking platform with a feature set that goes well beyond a basic CRUD app. It includes city-based location filtering, an interactive 140-seat map with real-time occupancy, JWT authentication, booking cancellation with refund flow, an invite-a-friend social system, and a full admin revenue dashboard.

The project was built to explore production-grade infrastructure — deploying across Vercel (frontend), Render (API), and Aiven Cloud managed MySQL with connection pooling.`,

    problem: 'Most movie booking tutorial projects are single-page forms. Building a real system requires solving: seat contention (two users booking the same seat), auth security, social sharing, and admin visibility.',

    solution: 'A full booking platform with server-side seat locking, JWT-protected routes, invite link generation with seat highlighting, and a revenue dashboard — all backed by a cloud-hosted relational database.',

    architecture: [
      { layer: 'Location Filtering', detail: 'Users select city → API returns available theatres and movies → filtered by city/date/availability' },
      { layer: 'Seat Map', detail: '10×14 grid (140 seats) rendered client-side. Occupied seats fetched from MySQL at page load. Selection state maintained in React.' },
      { layer: 'Booking Flow', detail: 'User selects seats → payment modal → POST /api/bookings → server marks seats occupied atomically → confirmation' },
      { layer: 'Invite System', detail: 'Booking generates a unique invite URL. When opened, API returns the inviter\'s booked seats, which are highlighted blue on the map.' },
      { layer: 'JWT Auth', detail: 'Access tokens stored in httpOnly cookies. All booking/cancellation routes protected server-side. Admin role verified on every admin request.' },
      { layer: 'Admin Dashboard', detail: 'Revenue analytics (₹), booking counts, user management, and show scheduling — scoped to admin role via JWT claims.' },
    ],

    features: [
      'Location-aware theatre and movie browsing by city',
      '140-seat interactive map with real-time occupancy rendering',
      'JWT authentication with httpOnly cookie security',
      'Booking cancellation with refund state management',
      'Invite-a-friend with unique URLs and seat highlighting',
      'Admin dashboard: revenue analytics, bookings, user management',
      '20 pre-loaded Bollywood movies with full metadata',
      'Deployed on Vercel + Render + Aiven Cloud MySQL',
    ],

    techStack: {
      'Frontend': ['React', 'Tailwind CSS', 'React Router', 'Axios'],
      'Backend': ['Node.js', 'Express.js', 'JWT', 'bcrypt'],
      'Database': ['MySQL 8', 'Aiven Cloud', 'mysql2 (connection pooling)'],
      'Deployment': ['Vercel (client)', 'Render (API)', 'Aiven Cloud (DB)'],
    },

    photos: [
      { src: movieHomepage },
      { src: movieMovies },
      { src: movieMovieDetail },
      { src: movieSeating },
      { src: movieFriendsInvite },
      { src: movieConfirmation },
      { src: movieRecentBooking },
      { src: moviePaymentDetail },
      { src: movieAddMovies },
      { src: movieManageMovies },
      { src: movieAddTheater },
      { src: movieManageTheaters },
      { src: movieTheaters },
      { src: movieTheaterDetail },
    ],
  },

  {
    id: 'gymkhana',
    tag: 'Role-Based · Full-Stack · Tested',
    tagColor: 'orange',
    title: 'Gymkhana',
    tagline: 'Institutional OS for college activity management',
    shortBullets: [
      'Delivered a 13-page full-stack app with a 3-tier RBAC system (Admin / Coordinator / Student) using Clerk Auth with server-side role enforcement',
      'Admin panel handles club creation, event scheduling, result publishing; Coordinator manages registrations; Student view surfaces personalized participation history',
      'Wrote Jest unit tests for critical business logic paths — the most production-grade codebase in the set',
    ],
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MySQL', 'Clerk Auth', 'Jest', 'PostCSS'],
    github: 'https://github.com/code-manush/gymkhana',
    live: null,
    accent: '#FBBF24',

    overview: `Gymkhana is a full-stack institutional web application designed to streamline club and event management for a college Gymkhana body. Built across 13 pages with a 3-tier role-based access system, it provides distinct dashboards for Admins, Coordinators, and Students — each with scoped permissions enforced both client-side and server-side.

The project prioritized production-grade patterns: proper auth middleware, role gates, automated testing, and clean separation of concerns between the three user types.`,

    problem: 'College activity management is fragmented — clubs use spreadsheets, results are posted on notice boards, and students have no single view of their participation. Coordinators waste hours on manual registration tracking.',

    solution: 'A unified web platform with role-based dashboards — Admins control everything, Coordinators manage their club\'s events and registrations, Students see their own activity and results. All enforced via Clerk Auth tokens validated on every API request.',

    architecture: [
      { layer: 'Auth & Role System', detail: 'Clerk Auth handles OAuth and session. On every API request, a middleware extracts the Clerk token, fetches the user\'s DB role, and enforces access.' },
      { layer: 'Admin Panel', detail: '33KB page handling: club CRUD, event creation/scheduling, coordinator assignment, result publishing, and platform-wide analytics (stat cards)' },
      { layer: 'Coordinator Panel', detail: '25KB page: manage assigned club events, approve/reject registrations, mark attendance, publish event results' },
      { layer: 'Student Dashboard', detail: 'Personalized view: registered events, participation history, published results, club discovery' },
      { layer: 'Database', detail: 'MySQL with normalized schema: users, clubs, events, registrations, results tables with proper foreign key constraints' },
      { layer: 'Testing', detail: 'Jest unit tests covering registration logic, role validation, and result computation edge cases' },
    ],

    features: [
      '3-tier RBAC: Admin, Coordinator, Student — all server-enforced',
      'Admin: club/event/coordinator management + analytics dashboard',
      'Coordinator: event registration management + result publishing',
      'Student: club discovery, event registration, participation history',
      'Clerk Auth with DB role sync on every sign-in',
      'Event scheduling with date/time/venue management',
      'Results publishing with leaderboard-style display',
      'Jest unit tests for critical business logic',
    ],

    techStack: {
      'Frontend': ['React', 'Vite', 'PostCSS', 'React Router'],
      'Backend': ['Node.js', 'Express.js', 'Clerk Auth middleware'],
      'Database': ['MySQL', 'Normalized relational schema'],
      'Auth': ['Clerk', 'JWT token validation', 'Role-based middleware'],
      'Testing': ['Jest', 'Unit tests for business logic'],
    },

    photos: [
      { src: gymLogin },
      { src: gymAuthentication },
      { src: gymDashboard },
      { src: gymAdminPanel },
      { src: gymClub },
      { src: gymEvents },
      { src: gymProfile },
      { src: gymResults },
    ],
  },

  {
    id: 'navastitva',
    tag: 'Client Delivery · Full-Stack · Live',
    tagColor: 'green',
    title: 'NavAstitva',
    tagline: 'Client-delivered NGO platform with full digital ops',
    shortBullets: [
      'Designed and delivered a production NGO web portal for a real organization — currently serving live users',
      'Implemented CMS-style hero slider, PDF-linked audit reports, career application form with file upload, online donation UI, and community survey',
      'Fully responsive across all breakpoints, shipped with Vercel CI/CD pipeline',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Vercel'],
    github: 'https://github.com/hck-anmol/NavAstitva',
    live: 'https://navastitwa.vercel.app/',
    accent: '#34D399',

    overview: `NavAstitva is a production web portal built and delivered for an actual NGO — not a practice project. The organization needed a complete digital presence: public-facing pages explaining their mission, tools for governance transparency (audit reports), and systems for community engagement (donations, surveys, career applications).

The project was delivered end-to-end: design, development, and deployment, with the organization now running it on their domain.`,

    problem: 'The NGO had no digital presence — no way for donors to find them, no transparent governance reporting, no digital career applications, and no way for the community to give feedback.',

    solution: 'A full-featured multi-page web portal covering every touchpoint: public outreach, organizational credibility (audit reports), community interaction (survey, donation UI), and operational needs (career applications).',

    architecture: [
      { layer: 'Hero Slider', detail: 'CMS-style dynamic hero with image transitions, configurable content, and mobile-optimized layout' },
      { layer: 'Mission & Impact', detail: 'Structured pages covering mission, vision, impact milestones, and team profiles — content-driven, easy to update' },
      { layer: 'Audit Reports', detail: 'Published annual audit reports linked as downloadable PDFs — key for NGO governance transparency and donor trust' },
      { layer: 'Career Applications', detail: 'Form with file upload (resume) and multi-field validation. Applications stored and routed to the NGO team.' },
      { layer: 'Donation UI', detail: 'Donation flow with amount selection, cause assignment, and confirmation — designed for UPI/bank integration readiness' },
      { layer: 'Community Survey', detail: 'Structured feedback form for community members — responses tracked for impact reporting' },
    ],

    features: [
      'CMS-style hero image slider with configurable content',
      'Mission, vision, and impact milestone pages',
      'Team profiles with roles and photos',
      'Published audit reports with PDF download links',
      'Career application form with file upload (resume)',
      'Online donation UI with cause selection',
      'Community survey and feedback system',
      'Fully responsive — mobile-first across all breakpoints',
      'Vercel CI/CD — auto-deploys on every push',
    ],

    techStack: {
      'Frontend': ['React', 'Vite', 'Tailwind CSS', 'React Router'],
      'Deployment': ['Vercel', 'CI/CD pipeline', 'Custom domain'],
      'Features': ['PDF integration', 'Form handling', 'File upload', 'Image optimization'],
    },

    photos: [
      { src: navaHome },
      { src: navaAchievements },
      { src: navaDonate },
      { src: navaGallery },
      { src: navaJoinus },
      { src: navaJourney },
    ],
  },
];

export const TAG_COLORS = {
  green:  { bg: 'rgba(52,211,153,0.1)',  color: '#34D399',  border: 'rgba(52,211,153,0.2)' },
  blue:   { bg: 'rgba(91,141,239,0.1)',  color: '#5B8DEF',  border: 'rgba(91,141,239,0.2)' },
  violet: { bg: 'rgba(167,139,250,0.1)', color: '#A78BFA',  border: 'rgba(167,139,250,0.2)' },
  orange: { bg: 'rgba(251,191,36,0.1)',  color: '#FBBF24',  border: 'rgba(251,191,36,0.2)' },
};
