import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Bell,
  Settings, 
  User, 
  Clock,
  Calendar,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useNotifications } from '../../../hooks/useNotifications';

interface HeaderProps {
  currentUser: {
    name: string;
    email: string;
    avatar?: string;
  };
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onNotificationClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  onToggleSidebar, 
  isSidebarOpen,
  onNotificationClick
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Hook pour obtenir le nombre de messages non lus
  const { unreadCount, loading } = useNotifications();

  // Mise à jour de l'heure toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Surveillance de la connexion
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Côté gauche - Menu toggle et message de bienvenue */}
          <div className="flex items-center space-x-4">
            {/* Bouton menu toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </motion.button>

            {/* Message de bienvenue */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block"
            >
              <h1 className="text-2xl font-bold text-gray-800">
                Bienvenue, <span className="text-blue-600">{currentUser.name}</span>
              </h1>
              <p className="text-sm text-gray-500">
                Gérez votre portfolio en temps réel
              </p>
            </motion.div>

            {/* Version mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:hidden"
            >
              <h1 className="text-lg font-bold text-gray-800">
                Bonjour, {currentUser.name.split(' ')[0]}
              </h1>
            </motion.div>
          </div>

          {/* Côté droit - Heure, statut et profil */}
          <div className="flex items-center space-x-4">
            {/* Statut de connexion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:flex items-center space-x-2"
            >
              {isOnline ? (
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                  <Wifi className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">En ligne</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-3 py-2 bg-red-50 rounded-lg">
                  <WifiOff className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">Hors ligne</span>
                </div>
              )}
            </motion.div>

            {/* Date et heure */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block text-right"
            >
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatDate(currentTime)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 mt-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono font-bold">
                  {formatTime(currentTime)}
                </span>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => window.location.href = '/admin/messages'}
              className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors"
              title={`${loading ? '...' : unreadCount} nouveaux messages`}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {!loading && unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Profil utilisateur */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              {/* Avatar */}
              <div className="relative">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* Informations utilisateur */}
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>

              {/* Bouton paramètres */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
