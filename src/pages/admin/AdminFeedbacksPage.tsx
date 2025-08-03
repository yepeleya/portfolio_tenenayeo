import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MessageSquare, Search, Lightbulb, Bug, Heart, HelpCircle, Calendar } from 'lucide-react';
import { feedbackService, type Feedback } from '../../services/adminApi';

const AdminFeedbacksPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getAll();
      setFeedbacks(data);
    } catch (error: any) {
      console.error('Erreur lors du chargement des feedbacks:', error);
      setError('Impossible de charger les feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'bug':
        return <Bug className="h-4 w-4 text-red-600" />;
      case 'compliment':
        return <Heart className="h-4 w-4 text-pink-600" />;
      case 'question':
        return <HelpCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'suggestion':
        return 'bg-yellow-100 text-yellow-800';
      case 'bug':
        return 'bg-red-100 text-red-800';
      case 'compliment':
        return 'bg-pink-100 text-pink-800';
      case 'question':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFeedbacks = feedbacks
    .filter(feedback => {
      const matchesSearch = 
        feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || feedback.type === filterType;
      
      return matchesSearch && matchesType;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const feedbackTypes = [
    { value: 'all', label: 'Tous les types', count: feedbacks.length },
    { value: 'suggestion', label: 'Suggestions', count: feedbacks.filter(f => f.type === 'suggestion').length },
    { value: 'bug', label: 'Bugs', count: feedbacks.filter(f => f.type === 'bug').length },
    { value: 'compliment', label: 'Compliments', count: feedbacks.filter(f => f.type === 'compliment').length },
    { value: 'question', label: 'Questions', count: feedbacks.filter(f => f.type === 'question').length },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={loadFeedbacks} className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Feedbacks</h1>
          <p className="text-gray-600">
            {feedbacks.length} feedback{feedbacks.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button onClick={loadFeedbacks}>
          Actualiser
        </Button>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher dans les feedbacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {feedbackTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques par type */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {feedbackTypes.slice(1).map((type) => (
          <Card key={type.value} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilterType(type.value)}>
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                {getTypeIcon(type.value)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-sm text-gray-600">{type.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste des feedbacks */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun feedback</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'Aucun feedback ne correspond à vos critères.' 
                  : 'Aucun feedback pour le moment.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <Card key={feedback.id} className={`${!feedback.read_status ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{feedback.name}</CardTitle>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(feedback.type)}`}>
                        {getTypeIcon(feedback.type)}
                        <span className="ml-1">{feedback.type}</span>
                      </span>
                      {!feedback.read_status && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Nouveau
                        </span>
                      )}
                    </div>
                    {feedback.email && (
                      <p className="text-sm text-gray-600">{feedback.email}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(feedback.created_at)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {feedback.feedback}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedbacksPage;