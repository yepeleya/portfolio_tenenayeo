import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';
import StatisticsPage from './StatisticsPage';
import MessagesPage from './MessagesPage';
import ImprovementsPageNew from './ImprovementsPageNew';
import DownloadsPageNew from './DownloadsPageNew';
import ProjectClicksPageNew from './ProjectClicksPageNew';

// Composant pour protéger les routes admin
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Route de connexion */}
      <Route path="/login" element={<AdminLoginPage />} />
      
      {/* Routes protégées */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/statistics" element={
        <ProtectedRoute>
          <StatisticsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/messages" element={
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      } />
      
      <Route path="/improvements" element={
        <ProtectedRoute>
          <ImprovementsPageNew />
        </ProtectedRoute>
      } />
      
      <Route path="/downloads" element={
        <ProtectedRoute>
          <DownloadsPageNew />
        </ProtectedRoute>
      } />
      
      <Route path="/project-clicks" element={
        <ProtectedRoute>
          <ProjectClicksPageNew />
        </ProtectedRoute>
      } />
      
      {/* Redirection par défaut */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
