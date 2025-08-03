import express, { Express } from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/database';
import contactRoutes from './routes/contacts';
import notificationRoutes from './routes/notifications';

const app: Express = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/notifications', notificationRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio Backend is running' });
});

// Route pour télécharger le CV
app.get('/api/cv/download', (req, res) => {
  const filePath = '../public/CV_Tenena.pdf';
  res.download(filePath, 'CV_Tenena.pdf', (err) => {
    if (err) {
      console.error('Erreur lors du téléchargement:', err);
      res.status(404).json({ error: 'Fichier non trouvé' });
    }
  });
});

// Route pour les statistiques du CV
app.post('/api/cv/track-download', async (req, res) => {
  try {
    const { ip, userAgent, device, location } = req.body;
    
    // Ici on peut enregistrer le téléchargement en base
    // Pour l'instant on retourne juste success
    
    res.json({ success: true, message: 'Téléchargement enregistré' });
  } catch (error) {
    console.error('Erreur tracking téléchargement:', error);
    res.status(500).json({ error: 'Erreur interne' });
  }
});

// Gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Initialisation de la base de données et démarrage du serveur
const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('Base de données initialisée');
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

export default app;
