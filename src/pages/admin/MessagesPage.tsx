import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User, Mail, Calendar, Search, Filter, MoreHorizontal } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';
import MessageModal from '../../components/admin/MessageModal';
import { TokenManager } from '../../utils/tokenManager';

// Interface pour les messages
interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read_status: boolean;
  created_at: string;
}

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = {
    name: 'Tenena Admin',
    email: 'tenenayeo00@gmail.com'
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      // Récupération du token d'authentification avec validation
      const token = TokenManager.getValidToken();
      
      if (!token) {
        console.log('Aucun token valide, basculement en mode simulation');
        throw new Error('Token invalide');
      }
      
      // Tentative avec le token
      const response = await fetch('http://localhost:3002/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Garder la structure directe des contacts
        setMessages(data);
      } else if (response.status === 431) {
        // Erreur 431: Request Header Fields Too Large
        console.log('Token trop volumineux, nettoyage et mode simulation');
        localStorage.removeItem('adminToken'); // Nettoyer le token défectueux
        throw new Error('Token trop volumineux');
      } else {
        throw new Error('Erreur lors du chargement des messages');
      }
    } catch (error) {
      console.log('Basculement en mode simulation');
      // Messages simulés avec la nouvelle structure
      setMessages([
        {
          id: 1,
          name: 'Marie Dupont',
          email: 'marie.dupont@email.com',
          subject: 'Collaboration sur un projet web',
          message: 'Bonjour, j\'ai vu votre portfolio et je suis très impressionnée par votre travail. Nous avons un projet e-commerce qui pourrait vous intéresser...',
          created_at: '2025-07-21T10:30:00Z',
          read_status: false
        },
        {
          id: 2,
          name: 'Pierre Martin',
          email: 'pierre.martin@startup.com',
          subject: 'Opportunité freelance',
          message: 'Salut ! Nous recherchons un développeur React pour une mission de 3 mois. Votre profil correspond parfaitement...',
          created_at: '2025-07-20T14:45:00Z',
          read_status: true
        },
        {
          id: 3,
          name: 'Sophie Leroy',
          email: 'sophie@agency.fr',
          subject: 'Proposition de partenariat',
          message: 'Bonjour, notre agence souhaiterait établir un partenariat avec vous pour nos projets de développement web...',
          created_at: '2025-07-19T09:15:00Z',
          read_status: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le modal avec un message
  const openMessageModal = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'read' && message.read_status) ||
                         (filterStatus === 'unread' && !message.read_status);
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout currentUser={currentUser}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 animate-pulse text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Chargement des messages...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentUser={currentUser}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Messages Reçus
              </h1>
              <p className="text-gray-600 text-lg mt-2">
                {messages.length} messages • {messages.filter(m => !m.read_status).length} non lus
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  📧 Contact Portfolio
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Barre de recherche et filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tous les messages</option>
              <option value="unread">Non lus</option>
              <option value="read">Lus</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Liste des messages */}
      <div className="space-y-4">
        {filteredMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-lg border-l-4 ${
              !message.read_status ? 'border-l-purple-500 bg-purple-50' : 'border-l-gray-300'
            } p-6 hover:shadow-xl transition-all cursor-pointer`}
            onClick={() => openMessageModal(message)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{message.name}</h3>
                      {!message.read_status && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {message.email}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                  <p className="text-gray-700 line-clamp-2">{message.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(message.created_at)}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">Aucun message trouvé</h3>
          <p className="text-gray-400">
            {searchTerm ? 'Essayez de modifier votre recherche' : 'Vous n\'avez aucun message pour le moment'}
          </p>
        </motion.div>
      )}

      {/* Modal des messages */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={selectedMessage}
      />
    </AdminLayout>
  );
};

export default MessagesPage;
