import { Router } from 'express';
import { ContactController } from '../controllers/contacts';

const router = Router();
const contactController = new ContactController();

// Route pour créer un nouveau contact
router.post('/', contactController.createContact);

// Route pour récupérer tous les contacts (admin)
router.get('/', contactController.getAllContacts);

// Route pour marquer un contact comme lu
router.patch('/:id/read', contactController.markAsRead);

// Route pour supprimer un contact
router.delete('/:id', contactController.deleteContact);

// Route pour obtenir les statistiques des contacts
router.get('/stats', contactController.getContactStats);

export default router;
