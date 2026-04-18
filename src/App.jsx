import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { usePerformance } from './hooks/usePerformance.js';
import StarCanvas from './components/StarCanvas.jsx';  // 2D fallback

// Lazy-load the heavy 3D background
const SpaceBackground3D = lazy(() => import('./components/SpaceBackground3D.jsx'));

import CustomCursor from './components/CustomCursor.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import JourneyPage from './pages/JourneyPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  // Don't render global space background on Journey page — it has its own 3D scene
  const isJourney = location.pathname === '/journey';

  return (
    <>
      {/* Background layer — swap 2D/3D based on performance */}
      {!isJourney && <BackgroundLayer />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function BackgroundLayer() {
  const { isLowEnd, checked } = usePerformance();

  if (!checked) return null;

  if (isLowEnd) {
    return <StarCanvas />;
  }

  return (
    <Suspense fallback={<StarCanvas />}>
      <SpaceBackground3D />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <Loader />
      <CustomCursor />
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}
