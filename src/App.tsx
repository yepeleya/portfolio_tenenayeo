import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider } from './context/LoadingContext';
import ModernLayout from './components/ModernLayout';
import ModernHomePage from './pages/ModernHomePage';
import AboutPage from './pages/AboutPage';
import ModernProjectsPage from './pages/ModernProjectsPage';
import ModernContactPage from './pages/ModernContactPage';
import ModernFeedbackPage from './pages/ModernFeedbackPage';
import { initGA, trackPageView } from './utils/analytics';
import './App.css';

// Composant pour suivre les changements de route
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return null;
};

function App() {
  useEffect(() => {
    // Initialiser Google Analytics au démarrage
    initGA();
  }, []);

  // Portfolio Application
  return (
    <ThemeProvider>
      <LoadingProvider>
        <Router>
          <RouteTracker />
          <div className="App">
            <Routes>
              {/* Public Routes with Layout */}
              <Route path="/" element={
                <ModernLayout>
                  <ModernHomePage />
                </ModernLayout>
              } />
              <Route path="/about" element={
                <ModernLayout>
                  <AboutPage />
                </ModernLayout>
              } />
              <Route path="/projects" element={
                <ModernLayout>
                  <ModernProjectsPage />
                </ModernLayout>
              } />
              <Route path="/contact" element={
                <ModernLayout>
                  <ModernContactPage />
                </ModernLayout>
              } />
              <Route path="/feedback" element={
                <ModernLayout>
                  <ModernFeedbackPage />
                </ModernLayout>
              } />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
