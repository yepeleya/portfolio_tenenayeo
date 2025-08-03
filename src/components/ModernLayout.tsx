import React from 'react';
import ModernHeader from './ModernHeader';
import ModernFooter from './ModernFooter';

interface ModernLayoutProps {
  children: React.ReactNode;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <ModernHeader />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <ModernFooter />
    </div>
  );
};

export default ModernLayout;
