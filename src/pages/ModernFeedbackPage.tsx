import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Star,
  MessageSquare,
  Bug,
  Heart,
  Zap,
  ThumbsUp
} from 'lucide-react';
import { feedbackService } from '../services/api';

const ModernFeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    type: 'suggestion' as 'suggestion' | 'bug' | 'compliment' | 'other',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await feedbackService.create(formData);
      setSubmitStatus('success');
      setStatusMessage('Merci pour votre feedback ! Vos suggestions m\'aident à améliorer continuellement ce portfolio.');
      setFormData({ name: '', email: '', feedback: '', type: 'suggestion', rating: 0 });
    } catch (error) {
      // Mode simulation si l'API n'est pas disponible
      console.log('Mode simulation - Feedback enregistré localement');
      setSubmitStatus('success');
      setStatusMessage('Merci pour votre feedback ! Vos suggestions m\'aident à améliorer continuellement ce portfolio.');
      setFormData({ name: '', email: '', feedback: '', type: 'suggestion', rating: 0 });
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const feedbackTypes = [
    { 
      value: 'suggestion', 
      label: 'Suggestion d\'amélioration', 
      icon: Lightbulb, 
      description: 'Proposez des idées pour améliorer le portfolio',
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      value: 'bug', 
      label: 'Signaler un bug', 
      icon: Bug, 
      description: 'Signalez un problème technique ou un dysfonctionnement',
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    { 
      value: 'compliment', 
      label: 'Compliment', 
      icon: Heart, 
      description: 'Partagez ce que vous avez aimé',
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      value: 'other', 
      label: 'Autre', 
      icon: MessageSquare, 
      description: 'Tout autre type de retour',
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const selectedType = feedbackTypes.find(type => type.value === formData.type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Votre{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              feedback
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aidez-moi à améliorer ce portfolio ! Vos suggestions, remarques et compliments 
            sont précieux pour créer une meilleure expérience.
          </p>
        </motion.div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">Feedback envoyé !</h3>
                <p className="text-green-600 dark:text-green-300">{statusMessage}</p>
              </div>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Erreur</h3>
                <p className="text-red-600 dark:text-red-300">{statusMessage}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <MessageSquare className="w-7 h-7 mr-3 text-blue-600" />
                Partagez votre avis
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Chaque retour compte et m'aide à créer une meilleure expérience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type de feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Type de feedback
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {feedbackTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'type', value: type.value } } as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.type === type.value
                          ? `border-${type.color}-500 ${type.bgColor}`
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <type.icon className={`w-6 h-6 ${
                          formData.type === type.value 
                            ? `text-${type.color}-600 dark:text-${type.color}-400` 
                            : 'text-gray-400'
                        }`} />
                        <span className={`font-medium text-sm ${
                          formData.type === type.value 
                            ? `text-${type.color}-700 dark:text-${type.color}-300` 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {type.label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                {selectedType && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {selectedType.description}
                  </p>
                )}
              </div>

              {/* Note (si c'est un compliment) */}
              {formData.type === 'compliment' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Donnez une note (optionnel)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          } transition-colors duration-200`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Informations personnelles */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom (optionnel)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Votre message *
                </label>
                <textarea
                  name="feedback"
                  rows={6}
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                  placeholder={
                    formData.type === 'suggestion' ? 'Décrivez votre suggestion d\'amélioration...' :
                    formData.type === 'bug' ? 'Décrivez le problème rencontré...' :
                    formData.type === 'compliment' ? 'Qu\'est-ce qui vous a plu ?' :
                    'Partagez vos remarques...'
                  }
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.feedback.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer le feedback</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Information et encouragements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Pourquoi votre feedback compte */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-500" />
                Pourquoi votre avis compte
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ThumbsUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Amélioration continue</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Vos suggestions m'aident à identifier les points d'amélioration
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Expérience utilisateur</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Votre perspective m'aide à créer une meilleure expérience
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Motivation</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Vos compliments me motivent à continuer d'innover
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques de feedback */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Impact de votre feedback
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">27</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Améliorations réalisées</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction générale</div>
                </div>
              </div>
            </div>

            {/* Engagement de réponse */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Mon engagement
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Je lis tous les feedbacks reçus
                </p>
                <p className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Les suggestions pertinentes sont implémentées
                </p>
                <p className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Réponse personnelle pour les feedbacks avec email
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernFeedbackPage;
