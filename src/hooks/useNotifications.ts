import { useState, useEffect, useCallback } from 'react';

interface NotificationCount {
  unread_count: number;
}

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setUnreadCount(0);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3002/api/admin/notifications/unread', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data: NotificationCount = await response.json();
        setUnreadCount(data.unread_count);
      } else {
        // Mode développement - simuler des données si erreur
        setUnreadCount(0);
      }
    } catch (error) {
      // Mode développement - simuler des données en cas d'erreur réseau
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNotifications = useCallback(() => {
    setLoading(true);
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Forcer le rafraîchissement au chargement initial
  useEffect(() => {
    // Nettoyer le cache au démarrage
    setUnreadCount(0);
    
    fetchUnreadCount();
    
    // Rafraîchir toutes les 10 secondes (réduit de 30s)
    const interval = setInterval(fetchUnreadCount, 10000);
    
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  return {
    unreadCount,
    loading,
    refreshNotifications
  };
};
