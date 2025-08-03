import * as mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_tenenayeo',
  charset: 'utf8mb4'
};

export const connectDatabase = async () => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw error;
  }
};

export const initializeDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      charset: 'utf8mb4'
    });

    // Créer la base de données si elle n'existe pas
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    
    // Sélectionner la base de données
    await connection.execute(`USE \`${DB_CONFIG.database}\``);

    // Créer la table des contacts
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        message TEXT NOT NULL,
        project_type VARCHAR(100),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        phone VARCHAR(50),
        company VARCHAR(255),
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at),
        INDEX idx_is_read (is_read)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer la table des téléchargements CV
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cv_downloads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT,
        file_name VARCHAR(255) DEFAULT 'CV_Tenena.pdf',
        download_type ENUM('pdf', 'view') DEFAULT 'pdf',
        location VARCHAR(255),
        device VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_ip (ip_address),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer la table des clics projets
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS project_clicks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_name VARCHAR(255) NOT NULL,
        project_url VARCHAR(500),
        click_type ENUM('demo', 'github', 'details') NOT NULL,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT,
        referrer VARCHAR(500),
        location VARCHAR(255),
        device VARCHAR(100),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_project (project_name),
        INDEX idx_timestamp (timestamp),
        INDEX idx_ip (ip_address)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer la table des visiteurs
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT,
        location VARCHAR(255),
        device VARCHAR(100),
        page_visited VARCHAR(255),
        session_id VARCHAR(100),
        visit_duration INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_ip (ip_address),
        INDEX idx_session (session_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer la table des feedbacks/améliorations
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS improvements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category ENUM('ui', 'feature', 'performance', 'bug', 'content') NOT NULL,
        priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
        status ENUM('pending', 'in-progress', 'completed', 'rejected') DEFAULT 'pending',
        submitted_by VARCHAR(255),
        submitted_email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_category (category),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer la table des notifications
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type ENUM('contact', 'download', 'project_click', 'visit', 'system') NOT NULL,
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        related_id VARCHAR(50),
        action_url VARCHAR(500),
        INDEX idx_created_at (created_at),
        INDEX idx_is_read (is_read),
        INDEX idx_type (type),
        INDEX idx_priority (priority)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await connection.end();
    console.log('Base de données initialisée avec succès');

  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
};
