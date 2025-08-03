import express, { Router } from 'express';
import { NotificationService } from '../services/notificationService';
import { connectDatabase } from '../config/database';

const router: Router = express.Router();

// GET /api/notifications - Récupérer toutes les notifications
router.get('/', async (req, res) => {
  try {
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const notifications = await notificationService.getNotifications(limit, offset);
    const stats = await notificationService.getNotificationStats();
    
    res.json({
      success: true,
      data: {
        notifications,
        stats,
        pagination: {
          limit,
          offset,
          total: stats.totalNotifications
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des notifications',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// GET /api/notifications/unread - Récupérer les notifications non lues
router.get('/unread', async (req, res) => {
  try {
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    const unreadNotifications = await notificationService.getUnreadNotifications();
    
    res.json({
      success: true,
      data: {
        notifications: unreadNotifications,
        count: unreadNotifications.length
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications non lues:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des notifications non lues',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// GET /api/notifications/stats - Récupérer les statistiques des notifications
router.get('/stats', async (req, res) => {
  try {
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    const stats = await notificationService.getNotificationStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des stats notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques des notifications',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// PATCH /api/notifications/:id/read - Marquer une notification comme lue
router.patch('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    await notificationService.markAsRead(id);
    
    res.json({
      success: true,
      message: 'Notification marquée comme lue'
    });
  } catch (error) {
    console.error('Erreur lors du marquage de la notification:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du marquage de la notification',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// PATCH /api/notifications/read-all - Marquer toutes les notifications comme lues
router.patch('/read-all', async (req, res) => {
  try {
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    await notificationService.markAllAsRead();
    
    res.json({
      success: true,
      message: 'Toutes les notifications ont été marquées comme lues'
    });
  } catch (error) {
    console.error('Erreur lors du marquage de toutes les notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du marquage de toutes les notifications',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// DELETE /api/notifications/:id - Supprimer une notification
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    await notificationService.deleteNotification(id);
    
    res.json({
      success: true,
      message: 'Notification supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la notification:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la notification',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

// POST /api/notifications/auto-generate - Générer des notifications automatiques
router.post('/auto-generate', async (req, res) => {
  try {
    const db = await connectDatabase();
    const notificationService = new NotificationService(db);
    
    await notificationService.createAutoNotifications();
    
    res.json({
      success: true,
      message: 'Notifications automatiques générées avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la génération des notifications automatiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération des notifications automatiques',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
