import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer, 
  Download, 
  Eye,
  Globe,
  Activity,
  Calendar,
  Clock
} from 'lucide-react';

interface AnalyticsOverview {
  dailyVisits: Array<{
    date: string;
    visits: number;
    unique_visitors: number;
  }>;
  topPages: Array<{
    page_visited: string;
    visits: number;
  }>;
  topProjects: Array<{
    project_name: string;
    clicks: number;
  }>;
  recentActivity: Array<{
    type: string;
    ip_address: string;
    details: string;
    created_at: string;
  }>;
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('Token manquant');
      }

      const response = await fetch('http://localhost:3002/api/admin/analytics/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (error: any) {
      console.error('Erreur lors du chargement des analytics:', error);
      setError('Impossible de charger les analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Globe className="h-4 w-4 text-blue-500" />;
      case 'project_click':
        return <MousePointer className="h-4 w-4 text-green-500" />;
      case 'cv_download':
        return <Download className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'visit':
        return 'Visite de page';
      case 'project_click':
        return 'Clic sur projet';
      case 'cv_download':
        return 'Téléchargement CV';
      default:
        return 'Activité';
    }
  };

  // Calculer les totaux
  const totalVisits = analytics?.dailyVisits.reduce((sum, day) => sum + day.visits, 0) || 0;
  const totalUniqueVisitors = Math.max(...(analytics?.dailyVisits.map(day => day.unique_visitors) || [0]));
  const totalProjectClicks = analytics?.topProjects.reduce((sum, project) => sum + project.clicks, 0) || 0;
  const totalCVDownloads = analytics?.recentActivity.filter(activity => activity.type === 'cv_download').length || 0;

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
        <Button onClick={loadAnalytics} className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Analysez les performances de votre portfolio</p>
        </div>
        <Button onClick={loadAnalytics} variant="outline">
          <Activity className="mr-2 h-4 w-4" />
          Actualiser
        </Button>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">
              Visites Totales
            </CardTitle>
            <Eye className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVisits}</div>
            <p className="text-blue-100 text-sm">
              {analytics?.dailyVisits.length || 0} jours d'activité
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">
              Visiteurs Uniques
            </CardTitle>
            <Users className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUniqueVisitors}</div>
            <p className="text-green-100 text-sm">
              Visiteurs différents
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">
              Clics sur Projets
            </CardTitle>
            <MousePointer className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProjectClicks}</div>
            <p className="text-purple-100 text-sm">
              {analytics?.topProjects.length || 0} projets consultés
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">
              Téléchargements CV
            </CardTitle>
            <Download className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCVDownloads}</div>
            <p className="text-orange-100 text-sm">
              CV téléchargés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques et données détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pages les plus visitées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Pages Populaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.topPages.map((page, index) => (
                <div key={page.page_visited} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{page.page_visited}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                      {page.visits} visites
                    </div>
                  </div>
                </div>
              ))}
              {analytics?.topPages.length === 0 && (
                <p className="text-gray-500 text-center py-4">Aucune donnée disponible</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Projets les plus consultés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
              Projets Populaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.topProjects.map((project, index) => (
                <div key={project.project_name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.project_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                      {project.clicks} clics
                    </div>
                  </div>
                </div>
              ))}
              {analytics?.topProjects.length === 0 && (
                <p className="text-gray-500 text-center py-4">Aucune donnée disponible</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-purple-600" />
            Activité Récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {analytics?.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {getActivityLabel(activity.type)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(activity.created_at)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {activity.details}
                  </p>
                  <p className="text-xs text-gray-400">
                    IP: {activity.ip_address}
                  </p>
                </div>
              </div>
            ))}
            {analytics?.recentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-8">Aucune activité récente</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visites quotidiennes */}
      {analytics?.dailyVisits && analytics.dailyVisits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
              Visites Quotidiennes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.dailyVisits.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatDate(day.date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {day.unique_visitors} visiteurs uniques
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">
                      {day.visits}
                    </p>
                    <p className="text-sm text-indigo-500">visites</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
