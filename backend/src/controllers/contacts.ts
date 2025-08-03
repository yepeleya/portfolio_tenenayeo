import { Request, Response } from 'express';
import { connectDatabase } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  phone?: string;
  company?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ContactController {
  async createContact(req: Request, res: Response) {
    try {
      const connection = await connectDatabase();
      
      const {
        name,
        email,
        subject,
        message,
        projectType,
        budget,
        timeline,
        phone,
        company
      } = req.body;

      // Validation des champs requis
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Les champs nom, email et message sont obligatoires'
        });
      }

      // Insérer le contact dans la base de données
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO contacts (name, email, subject, message, project_type, budget, timeline, phone, company, is_read, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, NOW(), NOW())`,
        [name, email, subject || 'Nouveau message', message, projectType, budget, timeline, phone, company]
      );

      await connection.end();

      res.status(201).json({
        success: true,
        message: 'Message envoyé avec succès',
        contactId: result.insertId
      });

    } catch (error) {
      console.error('Erreur lors de la création du contact:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  }

  async getAllContacts(req: Request, res: Response) {
    try {
      const connection = await connectDatabase();
      
      const [rows] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          id, name, email, subject, message, project_type, budget, timeline, 
          phone, company, is_read, created_at, updated_at
         FROM contacts 
         ORDER BY created_at DESC`
      );

      await connection.end();

      const contacts = rows.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        subject: row.subject,
        message: row.message,
        projectType: row.project_type,
        budget: row.budget,
        timeline: row.timeline,
        phone: row.phone,
        company: row.company,
        isRead: row.is_read,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));

      res.json({
        success: true,
        contacts
      });

    } catch (error) {
      console.error('Erreur lors de la récupération des contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const connection = await connectDatabase();
      const { id } = req.params;

      await connection.execute(
        'UPDATE contacts SET is_read = TRUE, updated_at = NOW() WHERE id = ?',
        [id]
      );

      await connection.end();

      res.json({
        success: true,
        message: 'Contact marqué comme lu'
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  }

  async deleteContact(req: Request, res: Response) {
    try {
      const connection = await connectDatabase();
      const { id } = req.params;

      await connection.execute('DELETE FROM contacts WHERE id = ?', [id]);
      await connection.end();

      res.json({
        success: true,
        message: 'Contact supprimé avec succès'
      });

    } catch (error) {
      console.error('Erreur lors de la suppression du contact:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  }

  async getContactStats(req: Request, res: Response) {
    try {
      const connection = await connectDatabase();
      
      // Statistiques générales
      const [totalResult] = await connection.execute<RowDataPacket[]>(
        'SELECT COUNT(*) as total FROM contacts'
      );
      
      const [unreadResult] = await connection.execute<RowDataPacket[]>(
        'SELECT COUNT(*) as unread FROM contacts WHERE is_read = FALSE'
      );
      
      const [todayResult] = await connection.execute<RowDataPacket[]>(
        'SELECT COUNT(*) as today FROM contacts WHERE DATE(created_at) = CURDATE()'
      );
      
      const [weekResult] = await connection.execute<RowDataPacket[]>(
        'SELECT COUNT(*) as week FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)'
      );

      await connection.end();

      res.json({
        success: true,
        stats: {
          total: totalResult[0].total,
          unread: unreadResult[0].unread,
          today: todayResult[0].today,
          week: weekResult[0].week
        }
      });

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  }
}
