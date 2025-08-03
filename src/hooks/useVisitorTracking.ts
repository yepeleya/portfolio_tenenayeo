import { useEffect } from 'react';
import { statsService } from '../services/api';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const visitor = {
          ip: '', // Will be handled by backend
          userAgent: navigator.userAgent,
          visitDate: new Date().toISOString(),
          pages: [window.location.pathname],
        };
        
        await statsService.incrementVisitor(visitor);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);
};
