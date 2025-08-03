import { Connection } from 'mysql2/promise';
import { Notification, NotificationStats } from '../models/notification';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class NotificationService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  // Créer une nouvelle notification
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<string> {
    const query = `
      INSERT INTO notifications (id, title, message, type, priority, is_read, related_id, action_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await this.db.execute(query, [
      notificationId,
      notification.title,
      notification.message,
      notification.type,
      notification.priority,
      notification.isRead ? 1 : 0,
      notification.relatedId || null,
      notification.actionUrl || null
    ]);

    return notificationId;
  }

  // Obtenir toutes les notifications (avec pagination)
  async getNotifications(limit: number = 20, offset: number = 0): Promise<Notification[]> {
    const query = `
      SELECT id, title, message, type, priority, is_read, created_at, related_id, action_url
      FROM notifications
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const [rows] = await this.db.execute(query, [limit, offset]) as [RowDataPacket[], any];
    
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      message: row.message,
      type: row.type,
      priority: row.priority,
      isRead: Boolean(row.is_read),
      createdAt: new Date(row.created_at),
      relatedId: row.related_id,
      actionUrl: row.action_url
    }));
  }

  // Obtenir les notifications non lues
  async getUnreadNotifications(): Promise<Notification[]> {
    const query = `
      SELECT id, title, message, type, priority, is_read, created_at, related_id, action_url
      FROM notifications
      WHERE is_read = 0
      ORDER BY created_at DESC
    `;
    
    const [rows] = await this.db.execute(query) as [RowDataPacket[], any];
    
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      message: row.message,
      type: row.type,
      priority: row.priority,
      isRead: false,
      createdAt: new Date(row.created_at),
      relatedId: row.related_id,
      actionUrl: row.action_url
    }));
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId: string): Promise<void> {
    const query = 'UPDATE notifications SET is_read = 1 WHERE id = ?';
    await this.db.execute(query, [notificationId]);
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead(): Promise<void> {
    const query = 'UPDATE notifications SET is_read = 1 WHERE is_read = 0';
    await this.db.execute(query);
  }

  // Supprimer une notification
  async deleteNotification(notificationId: string): Promise<void> {
    const query = 'DELETE FROM notifications WHERE id = ?';
    await this.db.execute(query, [notificationId]);
  }

  // Obtenir les statistiques des notifications
  async getNotificationStats(): Promise<NotificationStats> {
    const [countRows] = await this.db.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread,
        SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today
      FROM notifications
    `) as [RowDataPacket[], any];

    const stats = countRows[0];
    
    return {
      totalNotifications: stats.total || 0,
      unreadNotifications: stats.unread || 0,
      todayNotifications: stats.today || 0
    };
  }

  // Nettoyer les anciennes notifications (plus de 30 jours)
  async cleanOldNotifications(daysToKeep: number = 30): Promise<number> {
    const query = 'DELETE FROM notifications WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)';
    const [result] = await this.db.execute(query, [daysToKeep]) as [ResultSetHeader, any];
    return result.affectedRows || 0;
  }

  // Créer des notifications automatiques basées sur les événements
  async createAutoNotifications(): Promise<void> {
    // Notification pour nouveaux contacts non lus
    const [contactRows] = await this.db.execute(`
      SELECT COUNT(*) as count FROM contacts WHERE is_read = 0
    `) as [RowDataPacket[], any];

    if (contactRows[0].count > 0) {
      await this.createNotification({
        title: 'Nouveaux messages',
        message: `${contactRows[0].count} nouveau(x) message(s) de contact en attente`,
        type: 'contact',
        priority: 'medium',
        isRead: false,
        actionUrl: '/admin/messages'
      });
    }

    // Notification pour téléchargements récents
    const [downloadRows] = await this.db.execute(`
      SELECT COUNT(*) as count FROM cv_downloads WHERE DATE(downloaded_at) = CURDATE()
    `) as [RowDataPacket[], any];

    if (downloadRows[0].count > 0) {
      await this.createNotification({
        title: 'Téléchargements CV',
        message: `${downloadRows[0].count} téléchargement(s) de CV aujourd'hui`,
        type: 'download',
        priority: 'low',
        isRead: false,
        actionUrl: '/admin/downloads'
      });
    }

    // Notification pour visites récentes
    const [visitRows] = await this.db.execute(`
      SELECT COUNT(*) as count FROM visitors WHERE DATE(visited_at) = CURDATE()
    `) as [RowDataPacket[], any];

    if (visitRows[0].count > 2) {
      await this.createNotification({
        title: 'Trafic élevé détecté',
        message: `${visitRows[0].count} visiteurs aujourd'hui`,
        type: 'visit',
        priority: 'low',
        isRead: false,
        actionUrl: '/admin/statistics'
      });
    }
  }
}
