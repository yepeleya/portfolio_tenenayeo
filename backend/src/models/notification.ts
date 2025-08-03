export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'contact' | 'download' | 'project_click' | 'visit' | 'system';
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: Date;
  relatedId?: string; // ID du contact, téléchargement, etc.
  actionUrl?: string; // URL vers la page concernée
}

export interface NotificationStats {
  totalNotifications: number;
  unreadNotifications: number;
  todayNotifications: number;
}
