import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ModernLayout from './components/ModernLayout';
import ModernHomePage from './pages/ModernHomePage';
import AboutPage from './pages/AboutPage';
import ModernProjectsPage from './pages/ModernProjectsPage';
import ModernContactPage from './pages/ModernContactPage';
import ModernFeedbackPage from './pages/ModernFeedbackPage';
import './App.css';

function App() {
  // Portfolio Application
  return (
    <ThemeProvider>
      <Router>
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
    </ThemeProvider>
  );
}

export default App;
