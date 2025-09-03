import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 60, 
  text = 'Chargement...',
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative">
        {/* Cercle de chargement qui tourne */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"
          style={{ width: size + 20, height: size + 20 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute top-0 left-1/2 w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
        </motion.div>
        
        {/* Icône 🎓 au centre qui pulse */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{ 
            width: size, 
            height: size,
            marginLeft: 10,
            marginTop: 10
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-4xl">🎓</span>
        </motion.div>
      </div>
      
      {text && (
        <motion.p 
          className="mt-6 text-gray-600 dark:text-gray-400 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
