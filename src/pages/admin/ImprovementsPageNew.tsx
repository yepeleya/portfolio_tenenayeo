import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Star, Clock, User, Calendar, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';

interface Improvement {
  id: number;
  title: string;
  description: string;
  category: 'UI/UX' | 'Performance' | 'Feature' | 'Bug';
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
  submitter: string;
  date: string;
  votes: number;
}

const ImprovementsPage: React.FC = () => {
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'completed'>('all');

  const currentUser = {
    name: 'Tenena Admin',
    email: 'tenenayeo00@gmail.com',
    avatar: undefined
  };

  useEffect(() => {
    loadImprovements();
  }, []);

  const loadImprovements = async () => {
    try {
      setLoading(true);
      
      // Essayer de charger les vraies données
      const response = await fetch('http://localhost:3002/api/admin/improvements');
      
      if (response.ok) {
        const realData = await response.json();
        setImprovements(realData);
      } else {
        throw new Error('API not available');
      }
    } catch (err) {
      console.log('Mode simulation - Génération de propositions d\'amélioration');
      
      // Données simulées réalistes
      const simulatedImprovements: Improvement[] = [
        {
          id: 1,
          title: 'Ajouter un mode sombre au portfolio',
          description: 'Il serait génial d\'avoir un toggle pour passer en mode sombre. Cela rendrait la navigation plus agréable le soir.',
          category: 'UI/UX',
          priority: 'medium',
          status: 'new',
          submitter: 'Visiteur anonyme',
          date: '2025-01-20T14:30:00Z',
          votes: 12
        },
        {
          id: 2,
          title: 'Améliorer les animations de transition',
          description: 'Les transitions entre les pages pourraient être plus fluides, peut-être avec des animations plus sophistiquées.',
          category: 'Performance',
          priority: 'low',
          status: 'in-progress',
          submitter: 'Marie L.',
          date: '2025-01-19T09:15:00Z',
          votes: 8
        },
        {
          id: 3,
          title: 'Ajouter un système de filtres pour les projets',
          description: 'Pouvoir filtrer les projets par technologie utilisée (React, Node.js, etc.) serait très pratique.',
          category: 'Feature',
          priority: 'high',
          status: 'new',
          submitter: 'Thomas M.',
          date: '2025-01-18T16:45:00Z',
          votes: 15
        },
        {
          id: 4,
          title: 'Optimiser le temps de chargement',
          description: 'Les images des projets mettent parfois du temps à charger. Une optimisation serait appréciée.',
          category: 'Performance',
          priority: 'high',
          status: 'completed',
          submitter: 'Sophie D.',
          date: '2025-01-17T11:20:00Z',
          votes: 20
        },
        {
          id: 5,
          title: 'Bug sur mobile - menu de navigation',
          description: 'Le menu hamburger ne se ferme pas toujours correctement sur iPhone Safari.',
          category: 'Bug',
          priority: 'medium',
          status: 'in-progress',
          submitter: 'Alex J.',
          date: '2025-01-16T08:30:00Z',
          votes: 6
        }
      ];
      
      setImprovements(simulatedImprovements);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (id: number, newStatus: Improvement['status']) => {
    setImprovements(improvements.map(imp => 
      imp.id === id ? { ...imp, status: newStatus } : imp
    ));
  };

  const filteredImprovements = improvements.filter(imp => {
    if (filter === 'all') return true;
    return imp.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'UI/UX': return '🎨';
      case 'Performance': return '⚡';
      case 'Feature': return '✨';
      case 'Bug': return '🐛';
      default: return '💡';
    }
  };

  if (loading) {
    return (
      <AdminLayout currentUser={currentUser}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Chargement des propositions...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentUser={currentUser}>
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              💡 Propositions d'Amélioration
            </h1>
            <p className="text-gray-600">
              Gérez les suggestions et améliorations proposées pour votre portfolio
            </p>
          </div>
          <button
            onClick={loadImprovements}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{improvements.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {improvements.filter(i => i.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Terminées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {improvements.filter(i => i.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nouvelles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {improvements.filter(i => i.status === 'new').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex space-x-4">
          {[
            { key: 'all', label: 'Toutes', count: improvements.length },
            { key: 'new', label: 'Nouvelles', count: improvements.filter(i => i.status === 'new').length },
            { key: 'in-progress', label: 'En cours', count: improvements.filter(i => i.status === 'in-progress').length },
            { key: 'completed', label: 'Terminées', count: improvements.filter(i => i.status === 'completed').length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === key 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Liste des améliorations */}
        <div className="space-y-4">
          {filteredImprovements.length === 0 ? (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune proposition trouvée</p>
            </div>
          ) : (
            filteredImprovements.map((improvement) => (
              <motion.div
                key={improvement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getCategoryIcon(improvement.category)}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{improvement.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {improvement.submitter}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(improvement.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {improvement.votes} votes
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{improvement.description}</p>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(improvement.status)}`}>
                        {improvement.status === 'new' && 'Nouvelle'}
                        {improvement.status === 'in-progress' && 'En cours'}
                        {improvement.status === 'completed' && 'Terminée'}
                        {improvement.status === 'rejected' && 'Rejetée'}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(improvement.priority)}`}>
                        Priorité {improvement.priority === 'high' ? 'haute' : improvement.priority === 'medium' ? 'moyenne' : 'basse'}
                      </span>
                      <span className="text-sm text-gray-500">{improvement.category}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <select
                      value={improvement.status}
                      onChange={(e) => updateStatus(improvement.id, e.target.value as Improvement['status'])}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="new">Nouvelle</option>
                      <option value="in-progress">En cours</option>
                      <option value="completed">Terminée</option>
                      <option value="rejected">Rejetée</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImprovementsPage;
