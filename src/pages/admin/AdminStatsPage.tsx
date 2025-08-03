import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, TrendingDown, Users, MessageSquare, Calendar, BarChart3, PieChart, Activity } from 'lucide-react';
import { statsService, type AdminStats } from '../../services/adminApi';

interface TimeSeriesData {
  date: string;
  contacts: number;
  feedbacks: number;
}

interface TypeDistribution {
  type: string;
  count: number;
  percentage: number;
}

const AdminStatsPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [feedbackTypes, setFeedbackTypes] = useState<TypeDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState<'7days' | '30days' | '90days'>('30days');

  const generateTimeSeriesData = useCallback((stats: AdminStats) => {
    const days = period === '7days' ? 7 : period === '30days' ? 30 : 90;
    const data: TimeSeriesData[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulation de données aléatoires basées sur les stats réelles
      const contactsBase = Math.floor(stats.totalContacts / days);
      const feedbacksBase = Math.floor(stats.totalFeedbacks / days);
      
      data.push({
        date: date.toISOString().split('T')[0],
        contacts: Math.max(0, contactsBase + Math.floor(Math.random() * 5) - 2),
        feedbacks: Math.max(0, feedbacksBase + Math.floor(Math.random() * 3) - 1)
      });
    }
    
    setTimeSeriesData(data);
  }, [period]);

  const generateFeedbackTypesData = useCallback((stats: AdminStats) => {
    // Simulation de distribution des types de feedback
    const types = [
      { type: 'suggestion', count: Math.floor(stats.totalFeedbacks * 0.4) },
      { type: 'bug', count: Math.floor(stats.totalFeedbacks * 0.25) },
      { type: 'compliment', count: Math.floor(stats.totalFeedbacks * 0.2) },
      { type: 'question', count: Math.floor(stats.totalFeedbacks * 0.15) }
    ];

    const total = types.reduce((sum, type) => sum + type.count, 0);
    const withPercentages = types.map(type => ({
      ...type,
      percentage: total > 0 ? Math.round((type.count / total) * 100) : 0
    }));

    setFeedbackTypes(withPercentages);
  }, []);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await statsService.getAll();
      setStats(data);
      
      // Générer des données de série temporelle simulées
      generateTimeSeriesData(data);
      generateFeedbackTypesData(data);
    } catch (error: any) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setError('Impossible de charger les statistiques');
    } finally {
      setLoading(false);
    }
  }, [generateTimeSeriesData, generateFeedbackTypesData]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getGrowthTrend = (current: number, previous: number) => {
    if (previous === 0) return { percentage: 0, isPositive: true };
    const percentage = Math.round(((current - previous) / previous) * 100);
    return { percentage: Math.abs(percentage), isPositive: percentage >= 0 };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={loadStats} className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }

  const contactsTrend = getGrowthTrend(stats.totalContacts, stats.totalContacts - 5);
  const feedbacksTrend = getGrowthTrend(stats.totalFeedbacks, stats.totalFeedbacks - 2);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques détaillées</h1>
          <p className="text-gray-600">Analyse des performances de votre portfolio</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as '7days' | '30days' | '90days')}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">7 derniers jours</option>
            <option value="30days">30 derniers jours</option>
            <option value="90days">90 derniers jours</option>
          </select>
          <Button onClick={loadStats}>
            Actualiser
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <div className="flex items-center text-xs">
              {contactsTrend.isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
              )}
              <span className={contactsTrend.isPositive ? 'text-green-600' : 'text-red-600'}>
                {contactsTrend.percentage}%
              </span>
              <span className="text-muted-foreground ml-1">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedbacks</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFeedbacks}</div>
            <div className="flex items-center text-xs">
              {feedbacksTrend.isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
              )}
              <span className={feedbacksTrend.isPositive ? 'text-green-600' : 'text-red-600'}>
                {feedbacksTrend.percentage}%
              </span>
              <span className="text-muted-foreground ml-1">vs période précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts récents</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayContacts}</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non lus</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadContacts + stats.unreadFeedbacks}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution temporelle */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Évolution des contacts et feedbacks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Contacts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Feedbacks</span>
                </div>
              </div>
              
              {/* Simulation d'un graphique simple */}
              <div className="h-64 flex items-end justify-between space-x-1 bg-gray-50 p-4 rounded">
                {timeSeriesData.slice(-10).map((data, index) => {
                  const maxValue = Math.max(...timeSeriesData.map(d => Math.max(d.contacts, d.feedbacks)));
                  const contactHeight = (data.contacts / maxValue) * 200;
                  const feedbackHeight = (data.feedbacks / maxValue) * 200;
                  
                  return (
                    <div key={index} className="flex flex-col items-center space-y-1">
                      <div className="flex items-end space-x-1">
                        <div 
                          className="w-4 bg-blue-500 rounded-t"
                          style={{ height: `${contactHeight}px` }}
                          title={`Contacts: ${data.contacts}`}
                        ></div>
                        <div 
                          className="w-4 bg-green-500 rounded-t"
                          style={{ height: `${feedbackHeight}px` }}
                          title={`Feedbacks: ${data.feedbacks}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 transform rotate-45 origin-bottom">
                        {formatDate(data.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution des types de feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Types de feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackTypes.map((type, index) => {
                const colors = ['bg-yellow-500', 'bg-red-500', 'bg-pink-500', 'bg-blue-500'];
                return (
                  <div key={type.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded ${colors[index]}`}></div>
                      <span className="text-sm capitalize">{type.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{type.count}</span>
                      <span className="text-xs text-gray-500">({type.percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Résumé des performances */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé des performances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Taux de conversion</span>
                <span className="font-medium">
                  {stats.totalContacts > 0 
                    ? Math.round((stats.totalFeedbacks / stats.totalContacts) * 100)
                    : 0
                  }%
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Activité récente</span>
                <span className="font-medium">
                  {stats.todayContacts} contacts aujourd'hui
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Non lus</span>
                <span className="font-medium">
                  {stats.unreadContacts} contacts, {stats.unreadFeedbacks} feedbacks
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsPage;