import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean, message?: string) => void;
  showLoadingFor: (duration?: number, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Chargement...');

  const setLoading = (loading: boolean, message = 'Chargement...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };

  const showLoadingFor = (duration = 1500, message = 'Chargement...') => {
    setLoading(true, message);
    setTimeout(() => {
      setLoading(false);
    }, duration);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, showLoadingFor }}>
      {children}
      
      {/* Overlay de chargement global */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <LoadingSpinner size={80} text={loadingMessage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
