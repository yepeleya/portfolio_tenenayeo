const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Configuration CORS améliorée
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:3003', 
    'http://localhost:3004'
  ],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Gérer les requêtes OPTIONS (preflight)
app.options('*', cors());

app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_tenenayeo'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('✅ Connexion à la base de données réussie');
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  // Accepter les tokens de test temporairement
  if (token.startsWith('fake-jwt-token-')) {
    req.user = { id: 1, username: 'tenena' };
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Routes d'authentification
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const user = results[0];
    
    try {
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Routes administrateur
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  const queries = {
    totalContacts: 'SELECT COUNT(*) as count FROM contacts',
    unreadContacts: 'SELECT COUNT(*) as count FROM contacts WHERE read_status = 0',
    todayContacts: 'SELECT COUNT(*) as count FROM contacts WHERE DATE(created_at) = CURDATE()',
    totalFeedbacks: 'SELECT COUNT(*) as count FROM feedbacks',
    unreadFeedbacks: 'SELECT COUNT(*) as count FROM feedbacks WHERE read_status = 0',
    totalVisits: 'SELECT COALESCE(SUM(views), 0) as count FROM page_views WHERE page_type = "portfolio"',
    todayVisits: 'SELECT COALESCE(SUM(views), 0) as count FROM page_views WHERE page_type = "portfolio" AND DATE(created_at) = CURDATE()',
    projectClicks: 'SELECT COALESCE(SUM(clicks), 0) as count FROM project_analytics',
    popularProject: 'SELECT project_name, clicks FROM project_analytics ORDER BY clicks DESC LIMIT 1'
  };

  const promises = Object.keys(queries).map(key => {
    return new Promise((resolve, reject) => {
      db.query(queries[key], (err, results) => {
        if (err) {
          console.log(`Requête ${key} échouée:`, err.message);
          resolve({ [key]: 0 }); // Valeur par défaut en cas d'erreur
        } else {
          if (key === 'popularProject') {
            resolve({ [key]: results[0] || { project_name: 'Aucun', clicks: 0 } });
          } else {
            resolve({ [key]: results[0].count });
          }
        }
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      const stats = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      res.json(stats);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des statistiques:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    });
});

// Nouvelle route pour les statistiques détaillées
app.get('/api/admin/analytics', authenticateToken, (req, res) => {
  const queries = {
    visitsByDay: `
      SELECT DATE(created_at) as date, SUM(views) as views 
      FROM page_views 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at) 
      ORDER BY date DESC 
      LIMIT 30
    `,
    projectStats: `
      SELECT project_name, clicks, views, last_clicked
      FROM project_analytics 
      ORDER BY clicks DESC 
      LIMIT 10
    `,
    contactsByMonth: `
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count
      FROM contacts 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY month 
      ORDER BY month DESC
    `,
    feedbackTypes: `
      SELECT type, COUNT(*) as count
      FROM feedbacks 
      GROUP BY type
    `
  };

  const promises = Object.keys(queries).map(key => {
    return new Promise((resolve, reject) => {
      db.query(queries[key], (err, results) => {
        if (err) {
          console.log(`Requête analytics ${key} échouée:`, err.message);
          resolve({ [key]: [] });
        } else {
          resolve({ [key]: results });
        }
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      const analytics = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      res.json(analytics);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des analytics:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    });
});

// Route pour enregistrer les vues de page (appelée depuis le portfolio)
app.post('/api/track/page-view', (req, res) => {
  const { page_type, page_name } = req.body;
  
  const query = `
    INSERT INTO page_views (page_type, page_name, views, created_at) 
    VALUES (?, ?, 1, NOW())
    ON DUPLICATE KEY UPDATE 
    views = views + 1, updated_at = NOW()
  `;
  
  db.query(query, [page_type, page_name], (err, results) => {
    if (err) {
      console.log('Erreur tracking page view:', err.message);
      return res.status(200).json({ success: false }); // On ne bloque pas l'utilisateur
    }
    res.json({ success: true });
  });
});

// Route pour enregistrer les clics sur projets
app.post('/api/track/project-click', (req, res) => {
  const { project_name, project_url } = req.body;
  
  const query = `
    INSERT INTO project_analytics (project_name, project_url, clicks, views, last_clicked) 
    VALUES (?, ?, 1, 1, NOW())
    ON DUPLICATE KEY UPDATE 
    clicks = clicks + 1, last_clicked = NOW()
  `;
  
  db.query(query, [project_name, project_url], (err, results) => {
    if (err) {
      console.log('Erreur tracking project click:', err.message);
      return res.status(200).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.get('/api/admin/contacts', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des contacts:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Marquer un message comme lu
app.patch('/api/admin/contacts/:id/read', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE contacts SET read_status = 1 WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du statut de lecture:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    
    res.json({ message: 'Message marqué comme lu', success: true });
  });
});

app.delete('/api/admin/contacts/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM contacts WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression du contact:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }
    
    res.json({ message: 'Contact supprimé avec succès' });
  });
});

// Répondre à un message
app.post('/api/admin/contacts/:id/reply', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: 'Sujet et message requis' });
  }

  // Insérer la réponse dans la table des réponses
  const insertReplyQuery = 'INSERT INTO message_replies (contact_id, subject, message) VALUES (?, ?, ?)';
  
  db.query(insertReplyQuery, [id, subject, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de la réponse:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    // Marquer le contact comme ayant reçu une réponse
    const updateContactQuery = 'UPDATE contacts SET has_reply = 1 WHERE id = ?';
    
    db.query(updateContactQuery, [id], (err) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du contact:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      res.json({ 
        message: 'Réponse envoyée avec succès', 
        success: true,
        replyId: result.insertId
      });
    });
  });
});

// Récupérer les réponses d'un contact
app.get('/api/admin/contacts/:id/replies', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM message_replies WHERE contact_id = ? ORDER BY sent_at DESC';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des réponses:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

app.get('/api/admin/feedbacks', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM feedbacks ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des feedbacks:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Route de test sans authentification
app.get('/api/test', (req, res) => {
  console.log('🧪 Endpoint de test appelé');
  res.json({ 
    message: 'Serveur backend opérationnel', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route de test avec authentification
app.get('/api/auth-test', authenticateToken, (req, res) => {
  console.log('🧪 Test auth réussi pour utilisateur:', req.user);
  res.json({ 
    message: 'Authentification réussie',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Route pour compter les notifications non lues
app.get('/api/admin/notifications/unread', authenticateToken, (req, res) => {
  const query = 'SELECT COUNT(*) as unread_count FROM contacts WHERE read_status = 0 OR read_status IS NULL';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors du comptage des messages non lus:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json({ unread_count: results[0].unread_count });
  });
});

// Routes publiques pour le portfolio
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nom, email et message requis' });
  }

  const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, subject, message], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du contact:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Message envoyé avec succès', id: results.insertId });
  });
});

// Route temporaire pour setup la base de données
app.get('/api/setup/database', (req, res) => {
  const dropTable = 'DROP TABLE IF EXISTS cv_downloads';
  db.query(dropTable, (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
    
    const createTable = `
      CREATE TABLE cv_downloads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL DEFAULT 'CV_Tenena.pdf',
        download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        device VARCHAR(50) DEFAULT 'Desktop',
        location VARCHAR(255) DEFAULT 'Non défini',
        INDEX idx_download_date (download_date),
        INDEX idx_device (device)
      )
    `;
    
    db.query(createTable, (err, results) => {
      if (err) {
        console.error('Erreur lors de la création:', err);
        return res.status(500).json({ message: 'Erreur lors de la création' });
      }
      res.json({ message: 'Table cv_downloads créée avec succès' });
    });
  });
});

// API pour les notifications - récupère les messages non lus et autres événements
app.get('/api/notifications', (req, res) => {
  const notifications = [];
  let completedQueries = 0;
  const totalQueries = 2;

  const finishResponse = () => {
    completedQueries++;
    if (completedQueries === totalQueries) {
      // Trier les notifications par date de création (plus récent en premier)
      notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      res.json({
        success: true,
        data: {
          notifications: notifications,
          unreadCount: notifications.filter(n => !n.isRead).length
        }
      });
    }
  };

  // 1. Récupérer les messages de contact non lus
  const contactQuery = 'SELECT * FROM contacts WHERE read_status = 0 ORDER BY created_at DESC LIMIT 10';
  db.query(contactQuery, (err, contacts) => {
    if (!err && contacts) {
      contacts.forEach((contact, index) => {
        notifications.push({
          id: `contact-${contact.id}`,
          title: 'Nouveau message de contact',
          message: `${contact.name} vous a envoyé un message: "${contact.subject || 'Sans sujet'}"`,
          type: 'contact',
          priority: 'medium',
          isRead: false,
          createdAt: contact.created_at,
          relatedId: contact.id.toString(),
          actionUrl: '/admin/messages'
        });
      });
    }
    finishResponse();
  });

  // 2. Récupérer les téléchargements récents (si la table existe)
  const downloadQuery = 'SELECT COUNT(*) as count FROM cv_downloads WHERE DATE(download_date) = CURDATE()';
  db.query(downloadQuery, (err, downloads) => {
    if (!err && downloads && downloads[0].count > 0) {
      notifications.push({
        id: `downloads-today`,
        title: 'Téléchargements CV',
        message: `Votre CV a été téléchargé ${downloads[0].count} fois aujourd'hui`,
        type: 'download',
        priority: 'low',
        isRead: false,
        createdAt: new Date(),
        actionUrl: '/admin/downloads'
      });
    }
    finishResponse();
  });
});

// Marquer une notification comme lue
app.patch('/api/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  
  // Si c'est une notification de contact
  if (id.startsWith('contact-')) {
    const contactId = id.replace('contact-', '');
    const query = 'UPDATE contacts SET read_status = 1 WHERE id = ?';
    db.query(query, [contactId], (err, results) => {
      if (err) {
        console.error('Erreur lors de la mise à jour:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.json({ success: true, message: 'Notification marquée comme lue' });
    });
  } else {
    // Pour les autres types de notifications (simulées)
    res.json({ success: true, message: 'Notification marquée comme lue' });
  }
});

// Marquer toutes les notifications comme lues
app.patch('/api/notifications/read-all', (req, res) => {
  const query = 'UPDATE contacts SET read_status = 1 WHERE read_status = 0';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json({ success: true, message: 'Toutes les notifications marquées comme lues' });
  });
});

// API pour télécharger le CV et enregistrer les statistiques
app.get('/api/download/cv', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.ip || req.connection.remoteAddress;
  
  // Déterminer le type d'appareil
  let device = 'Desktop';
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    device = /iPad/.test(userAgent) ? 'Tablet' : 'Mobile';
  }

  // Enregistrer le téléchargement en base de données
  const insertQuery = `
    INSERT INTO cv_downloads (file_name, download_date, ip_address, user_agent, device, location) 
    VALUES (?, NOW(), ?, ?, ?, ?)
  `;
  
  db.query(insertQuery, [
    'CV_Tenena.pdf',
    ip,
    userAgent,
    device,
    'Non défini' // Location sera améliorée plus tard avec géolocalisation
  ], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement du téléchargement:', err);
      // Continue le téléchargement même en cas d'erreur de base de données
    }
    
    // Servir le fichier CV
    const path = require('path');
    const cvPath = path.join(__dirname, '..', 'public', 'CV_Tenena.pdf');
    
    res.download(cvPath, 'CV_Tenena_Yeo.pdf', (err) => {
      if (err) {
        console.error('Erreur lors du téléchargement:', err);
        res.status(500).json({ message: 'Erreur lors du téléchargement' });
      }
    });
  });
});

// API pour récupérer les statistiques des téléchargements CV
app.get('/api/admin/cv-downloads', (req, res) => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  let completedQueries = 0;
  const totalQueries = 5;
  let stats = {
    totalDownloads: 0,
    todayDownloads: 0,
    weekDownloads: 0,
    monthDownloads: 0,
    topDevice: 'Desktop',
    topLocation: 'Non défini'
  };
  let downloads = [];

  const finishResponse = () => {
    completedQueries++;
    if (completedQueries === totalQueries) {
      res.json({
        success: true,
        downloads: downloads,
        stats: stats
      });
    }
  };

  // 1. Total des téléchargements
  db.query('SELECT COUNT(*) as total FROM cv_downloads', (err, results) => {
    if (!err && results && results[0]) {
      stats.totalDownloads = results[0].total;
    }
    finishResponse();
  });

  // 2. Téléchargements aujourd'hui
  db.query('SELECT COUNT(*) as today FROM cv_downloads WHERE download_date >= ?', [todayStart], (err, results) => {
    if (!err && results && results[0]) {
      stats.todayDownloads = results[0].today;
    }
    finishResponse();
  });

  // 3. Téléchargements cette semaine
  db.query('SELECT COUNT(*) as week FROM cv_downloads WHERE download_date >= ?', [weekStart], (err, results) => {
    if (!err && results && results[0]) {
      stats.weekDownloads = results[0].week;
    }
    finishResponse();
  });

  // 4. Téléchargements ce mois
  db.query('SELECT COUNT(*) as month FROM cv_downloads WHERE download_date >= ?', [monthStart], (err, results) => {
    if (!err && results && results[0]) {
      stats.monthDownloads = results[0].month;
    }
    finishResponse();
  });

  // 5. Récupérer les téléchargements récents avec stats
  const downloadsQuery = `
    SELECT 
      id,
      file_name as fileName,
      download_date as downloadDate,
      ip_address as ipAddress,
      user_agent as userAgent,
      device,
      location
    FROM cv_downloads 
    ORDER BY download_date DESC 
    LIMIT 50
  `;
  
  db.query(downloadsQuery, (err, results) => {
    if (!err && results) {
      downloads = results;
      
      // Calculer l'appareil le plus utilisé
      const deviceCounts = {};
      const locationCounts = {};
      
      results.forEach(download => {
        deviceCounts[download.device] = (deviceCounts[download.device] || 0) + 1;
        locationCounts[download.location] = (locationCounts[download.location] || 0) + 1;
      });
      
      // Trouver le top device et location
      const topDeviceEntry = Object.entries(deviceCounts).sort(([,a], [,b]) => b - a)[0];
      const topLocationEntry = Object.entries(locationCounts).sort(([,a], [,b]) => b - a)[0];
      
      if (topDeviceEntry) stats.topDevice = topDeviceEntry[0];
      if (topLocationEntry) stats.topLocation = topLocationEntry[0];
    }
    finishResponse();
  });
});

app.post('/api/feedback', (req, res) => {
  const { name, email, feedback, type } = req.body;

  if (!name || !feedback || !type) {
    return res.status(400).json({ message: 'Nom, feedback et type requis' });
  }

  const query = 'INSERT INTO feedbacks (name, email, feedback, type) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, feedback, type], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du feedback:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Feedback envoyé avec succès', id: results.insertId });
  });
});

// Routes de tracking pour analytics
app.post('/api/track/visit', (req, res) => {
  const { page, referrer, sessionId } = req.body;
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  // Insérer la visite
  const visitQuery = 'INSERT INTO portfolio_visits (ip_address, user_agent, page_visited, referrer, session_id) VALUES (?, ?, ?, ?, ?)';
  db.query(visitQuery, [ip, userAgent, page, referrer, sessionId], (err) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement de la visite:', err);
    }
  });

  // Mettre à jour ou créer la session
  const sessionQuery = `
    INSERT INTO user_sessions (session_id, ip_address, page_views) 
    VALUES (?, ?, 1) 
    ON DUPLICATE KEY UPDATE 
    last_activity = CURRENT_TIMESTAMP, 
    page_views = page_views + 1
  `;
  db.query(sessionQuery, [sessionId, ip], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la session:', err);
    }
  });

  res.json({ message: 'Visite enregistrée' });
});

app.post('/api/track/project-click', (req, res) => {
  const { projectId, projectName, clickType } = req.body;
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  const query = 'INSERT INTO project_clicks (project_id, project_name, ip_address, user_agent, click_type) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [projectId, projectName, ip, userAgent, clickType || 'view'], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement du clic projet:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json({ message: 'Clic enregistré', id: results.insertId });
  });
});

app.post('/api/track/cv-download', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  const query = 'INSERT INTO cv_downloads (ip_address, user_agent) VALUES (?, ?)';
  db.query(query, [ip, userAgent], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement du téléchargement:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json({ message: 'Téléchargement enregistré', id: results.insertId });
  });
});

// Routes analytics pour l'admin
app.get('/api/admin/analytics/visits', authenticateToken, (req, res) => {
  const query = `
    SELECT 
      pv.*,
      us.page_views as total_page_views
    FROM portfolio_visits pv
    LEFT JOIN user_sessions us ON pv.session_id = us.session_id
    ORDER BY pv.created_at DESC 
    LIMIT 100
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des visites:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

app.get('/api/admin/analytics/projects', authenticateToken, (req, res) => {
  const query = `
    SELECT 
      project_id,
      project_name,
      click_type,
      COUNT(*) as clicks,
      COUNT(DISTINCT ip_address) as unique_visitors,
      DATE(created_at) as date
    FROM project_clicks 
    GROUP BY project_id, project_name, click_type, DATE(created_at)
    ORDER BY clicks DESC, date DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des clics projets:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

app.get('/api/admin/analytics/downloads', authenticateToken, (req, res) => {
  const query = `
    SELECT 
      *,
      DATE(created_at) as download_date
    FROM cv_downloads 
    ORDER BY created_at DESC 
    LIMIT 100
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des téléchargements:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

app.get('/api/admin/analytics/overview', authenticateToken, (req, res) => {
  const queries = {
    dailyVisits: `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM portfolio_visits 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `,
    topPages: `
      SELECT 
        page_visited,
        COUNT(*) as visits
      FROM portfolio_visits 
      WHERE page_visited IS NOT NULL
      GROUP BY page_visited
      ORDER BY visits DESC
      LIMIT 10
    `,
    topProjects: `
      SELECT 
        project_name,
        COUNT(*) as clicks
      FROM project_clicks 
      GROUP BY project_name
      ORDER BY clicks DESC
      LIMIT 10
    `,
    recentActivity: `
      (SELECT 'visit' as type, ip_address, page_visited as details, created_at FROM portfolio_visits ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'project_click' as type, ip_address, project_name as details, created_at FROM project_clicks ORDER BY created_at DESC LIMIT 5)
      UNION ALL
      (SELECT 'cv_download' as type, ip_address, 'CV téléchargé' as details, downloaded_at as created_at FROM cv_downloads ORDER BY downloaded_at DESC LIMIT 5)
      ORDER BY created_at DESC
      LIMIT 15
    `
  };

  const promises = Object.keys(queries).map(key => {
    return new Promise((resolve, reject) => {
      db.query(queries[key], (err, results) => {
        if (err) reject(err);
        else resolve({ [key]: results });
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      const overview = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      res.json(overview);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération de l\'aperçu:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    });
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend fonctionnel', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur interne' });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📊 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`🌐 Public API: http://localhost:${PORT}/api`);
});
