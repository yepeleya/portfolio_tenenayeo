import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Calendar, User, MessageCircle, Reply, Copy, Check } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read_status: boolean;
  created_at: string;
  has_reply?: boolean;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message }) => {
  const [copied, setCopied] = useState(false);

  if (!message) return null;

  const copyEmailToClipboard = async () => {
    const subject = message.subject ? `Re: ${message.subject}` : `Re: Message de ${message.name}`;
    const emailContent = `À: ${message.email}
Sujet: ${subject}

Bonjour ${message.name},

Merci pour votre message.

--- Message original ---
De: ${message.name} (${message.email})
Date: ${formatDate(message.created_at)}
${message.subject ? `Sujet: ${message.subject}\n` : ''}Message: ${message.message}

--
Cordialement,
Tenena Yeo
tenenayeo00@gmail.com`;
    
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Message de Contact</h2>
                    <p className="text-blue-100 text-sm">#{message.id}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Status badge */}
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  message.read_status 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {message.read_status ? 'Lu' : 'Non lu'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Sender Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
                    <p className="font-semibold text-gray-900">{message.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{message.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(message.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Sujet</p>
                    <p className="font-semibold text-gray-900">{message.subject || 'Aucun sujet'}</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Message</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const subject = message.subject ? `Re: ${message.subject}` : `Re: Message de ${message.name}`;
                      const body = `Bonjour ${message.name},\n\nMerci pour votre message.\n\n--- Message original ---\nDe: ${message.name} (${message.email})\nDate: ${formatDate(message.created_at)}\n${message.subject ? `Sujet: ${message.subject}\n` : ''}Message: ${message.message}`;
                      
                      // Essayer d'abord Gmail web
                      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      
                      // Ouvrir Gmail dans un nouvel onglet
                      window.open(gmailUrl, '_blank');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Répondre via Gmail</span>
                  </button>

                  <button
                    onClick={() => {
                      const subject = message.subject ? `Re: ${message.subject}` : `Re: Message de ${message.name}`;
                      const body = `Bonjour ${message.name},\n\nMerci pour votre message.\n\n--- Message original ---\nDe: ${message.name} (${message.email})\nDate: ${formatDate(message.created_at)}\n${message.subject ? `Sujet: ${message.subject}\n` : ''}Message: ${message.message}`;
                      
                      const mailtoLink = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      window.location.href = mailtoLink;
                    }}
                    className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Client local</span>
                  </button>
                </div>
                
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Fermer
                </button>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={copyEmailToClipboard}
                  className={`px-4 py-2 ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded-lg transition-colors flex items-center space-x-2`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Email copié !' : 'Copier le contenu email'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
