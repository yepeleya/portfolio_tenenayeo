import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ModernLayout from './components/ModernLayout';
import ModernHomePage from './pages/ModernHomePage';
import AboutPage from './pages/AboutPage';
import ModernProjectsPage from './pages/ModernProjectsPage';
import ModernContactPage from './pages/ModernContactPage';
import ModernFeedbackPage from './pages/ModernFeedbackPage';

// Admin Components
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardSimple from './pages/admin/AdminDashboardSimple';
import StatisticsPageDetailed from './pages/admin/StatisticsPageDetailed';
import MessagesPage from './pages/admin/MessagesPage';
import DownloadsPageNew from './pages/admin/DownloadsPageNew';
import ImprovementsPageNew from './pages/admin/ImprovementsPageNew';
import ProjectClicksPageNew from './pages/admin/ProjectClicksPageNew';
import AdminContactsPage from './pages/admin/AdminContactsPage';
import AdminFeedbacksPage from './pages/admin/AdminFeedbacksPage';
import AdminStatsPage from './pages/admin/AdminStatsPage';
import AnalyticsDashboard from './components/admin/AnalyticsDashboard';
import './App.css';

// Check if we're in admin mode - Only explicit admin mode or admin path
const isAdminMode = process.env.REACT_APP_MODE === 'admin' || window.location.pathname.startsWith('/admin');

function App() {
  console.log('🚀 App Mode:', {
    envMode: process.env.REACT_APP_MODE,
    port: window.location.port,
    isAdminMode,
    url: window.location.href
  });

  if (isAdminMode) {
    // Admin Application
    return (
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboardSimple />} />
            <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/statistics" element={<StatisticsPageDetailed />} />
            <Route path="/admin/messages" element={<MessagesPage />} />
            <Route path="/admin/improvements" element={<ImprovementsPageNew />} />
            <Route path="/admin/downloads" element={<DownloadsPageNew />} />
            <Route path="/admin/project-clicks" element={<ProjectClicksPageNew />} />
            <Route path="/contacts" element={<AdminContactsPage />} />
            <Route path="/feedbacks" element={<AdminFeedbacksPage />} />
            <Route path="/stats" element={<AdminStatsPage />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

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
