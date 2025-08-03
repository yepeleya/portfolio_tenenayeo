import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Eye, 
  MessageSquare, 
  Lightbulb, 
  Download, 
  MousePointer, 
  LogOut,
  Home,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: Home,
      path: '/admin/dashboard',
      color: 'text-blue-600'
    },
    {
      id: 'statistics',
      label: 'Statistiques de visites',
      icon: Eye,
      path: '/admin/statistics',
      color: 'text-green-600'
    },
    {
      id: 'messages',
      label: 'Messages reçus',
      icon: MessageSquare,
      path: '/admin/messages',
      color: 'text-purple-600',
      badge: 3 // Simulation de nouveaux messages
    },
    {
      id: 'improvements',
      label: 'Propositions d\'amélioration',
      icon: Lightbulb,
      path: '/admin/improvements',
      color: 'text-yellow-600',
      badge: 1
    },
    {
      id: 'downloads',
      label: 'Téléchargements CV',
      icon: Download,
      path: '/admin/downloads',
      color: 'text-indigo-600'
    },
    {
      id: 'project-clicks',
      label: 'Suivi des clics projets',
      icon: MousePointer,
      path: '/admin/project-clicks',
      color: 'text-orange-600'
    }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    onClose(); // Fermer le sidebar sur mobile après navigation
  };

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full bg-white shadow-2xl flex flex-col">
      {/* Logo et titre */}
      <div className="p-6 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Portfolio Tenenayeo</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = isActiveRoute(item.path);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 border border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon 
                  className={`w-5 h-5 ${
                    isActive ? 'text-blue-600' : item.color
                  } group-hover:scale-110 transition-transform`} 
                />
                <span className={`font-medium ${
                  isActive ? 'text-blue-800' : 'text-gray-700'
                } group-hover:text-gray-900`}>
                  {item.label}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-4 h-4 ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                } group-hover:text-gray-600 transition-colors`} />
              </div>
            </motion.button>
          );
        })}
      </nav>

      {/* Statut en temps réel */}
      <div className="p-4 border-t border-gray-200">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Activity className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Système actif</p>
            <p className="text-xs text-green-600">Données en temps réel</p>
          </div>
        </motion.div>
      </div>

      {/* Bouton de déconnexion */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Déconnexion</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
