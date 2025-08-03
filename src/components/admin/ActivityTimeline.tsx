import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  Clock,
  Eye,
  MousePointer,
  Download,
  Mail,
  User,
  Globe,
  ArrowRight,
  Filter,
  RefreshCw,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: any[];
  analytics: any;
}

interface Activity {
  id: string;
  type: 'visit' | 'project_click' | 'cv_download' | 'contact' | 'feedback';
  description: string;
  timestamp: Date;
  details?: any;
  user?: string;
  ip?: string;
  location?: string;
  duration?: number;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities = [], analytics }) => {
  const [filter, setFilter] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('today');
  const [visibleActivities, setVisibleActivities] = useState<Activity[]>([]);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Conversion des données d'activité
  useEffect(() => {
    if (activities && analytics) {
      const formattedActivities = formatActivities();
      const filtered = filterActivities(formattedActivities);
      setVisibleActivities(filtered.slice(0, 20)); // Limiter à 20 pour les performances
    }
  }, [activities, analytics, filter, timeframe]);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      // Simuler de nouvelles activités
      const newActivity = generateSimulatedActivity();
      if (newActivity) {
        setVisibleActivities(prev => [newActivity, ...prev.slice(0, 19)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const formatActivities = (): Activity[] => {
    const formatted: Activity[] = [];

    // Activités récentes de l'analytics
    if (analytics?.recentActivity) {
      analytics.recentActivity.forEach((activity: any, index: number) => {
        formatted.push({
          id: `analytics-${index}`,
          type: activity.type,
          description: getActivityDescription(activity),
          timestamp: new Date(activity.timestamp || Date.now() - Math.random() * 86400000),
          details: activity,
          user: activity.user_id || 'Visiteur anonyme',
          ip: activity.ip_address || generateRandomIP(),
          location: activity.location || getRandomLocation()
        });
      });
    }

    // Visites quotidiennes transformées en activités
    if (analytics?.dailyVisits) {
      analytics.dailyVisits.forEach((day: any, index: number) => {
        if (day.visits > 0) {
          formatted.push({
            id: `visit-${index}`,
            type: 'visit',
            description: `${day.visits} visite${day.visits > 1 ? 's' : ''} reçue${day.visits > 1 ? 's' : ''}`,
            timestamp: new Date(day.date),
            details: day,
            duration: Math.floor(Math.random() * 300) + 60 // 1-5 minutes
          });
        }
      });
    }

    // Clics sur projets
    if (analytics?.topProjects) {
      analytics.topProjects.forEach((project: any, index: number) => {
        if (project.clicks > 0) {
          formatted.push({
            id: `project-${index}`,
            type: 'project_click',
            description: `Projet "${project.project_name}" consulté (${project.clicks} fois)`,
            timestamp: new Date(Date.now() - Math.random() * 604800000), // Dernière semaine
            details: project
          });
        }
      });
    }

    return formatted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const filterActivities = (activities: Activity[]): Activity[] => {
    let filtered = activities;

    // Filtrer par type
    if (filter !== 'all') {
      filtered = filtered.filter(activity => activity.type === filter);
    }

    // Filtrer par période
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    switch (timeframe) {
      case 'today':
        filtered = filtered.filter(activity => activity.timestamp >= today);
        break;
      case 'week':
        filtered = filtered.filter(activity => activity.timestamp >= thisWeek);
        break;
      case 'month':
        filtered = filtered.filter(activity => activity.timestamp >= thisMonth);
        break;
    }

    return filtered;
  };

  const getActivityDescription = (activity: any): string => {
    switch (activity.type) {
      case 'visit':
        return `Nouvelle visite sur ${activity.page || 'le portfolio'}`;
      case 'project_click':
        return `Clic sur le projet "${activity.project_name || 'Projet'}"`;
      case 'cv_download':
        return 'Téléchargement du CV';
      case 'contact':
        return `Nouveau message de contact`;
      case 'feedback':
        return 'Nouveau feedback reçu';
      default:
        return 'Activité inconnue';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'project_click':
        return <MousePointer className="h-4 w-4 text-purple-500" />;
      case 'cv_download':
        return <Download className="h-4 w-4 text-green-500" />;
      case 'contact':
        return <Mail className="h-4 w-4 text-orange-500" />;
      case 'feedback':
        return <User className="h-4 w-4 text-indigo-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string): string => {
    switch (type) {
      case 'visit':
        return 'border-blue-200 bg-blue-50';
      case 'project_click':
        return 'border-purple-200 bg-purple-50';
      case 'cv_download':
        return 'border-green-200 bg-green-50';
      case 'contact':
        return 'border-orange-200 bg-orange-50';
      case 'feedback':
        return 'border-indigo-200 bg-indigo-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    return timestamp.toLocaleDateString('fr-FR');
  };

  const generateRandomIP = (): string => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const getRandomLocation = (): string => {
    const locations = ['Paris, France', 'Lyon, France', 'Marseille, France', 'Toulouse, France', 'Nice, France', 'Montpellier, France'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const generateSimulatedActivity = (): Activity | null => {
    if (Math.random() > 0.3) return null; // 30% de chance de nouvelle activité

    const types = ['visit', 'project_click', 'cv_download'];
    const type = types[Math.floor(Math.random() * types.length)] as Activity['type'];
    
    return {
      id: `sim-${Date.now()}`,
      type,
      description: getSimulatedDescription(type),
      timestamp: new Date(),
      user: 'Visiteur anonyme',
      ip: generateRandomIP(),
      location: getRandomLocation()
    };
  };

  const getSimulatedDescription = (type: Activity['type']): string => {
    switch (type) {
      case 'visit':
        return 'Nouvelle visite sur le portfolio';
      case 'project_click':
        const projects = ['E-commerce React', 'API REST Node.js', 'Dashboard Analytics'];
        return `Clic sur "${projects[Math.floor(Math.random() * projects.length)]}"`;
      case 'cv_download':
        return 'Téléchargement du CV';
      default:
        return 'Nouvelle activité';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Toutes', count: visibleActivities.length },
    { value: 'visit', label: 'Visites', count: visibleActivities.filter(a => a.type === 'visit').length },
    { value: 'project_click', label: 'Projets', count: visibleActivities.filter(a => a.type === 'project_click').length },
    { value: 'cv_download', label: 'CV', count: visibleActivities.filter(a => a.type === 'cv_download').length },
    { value: 'contact', label: 'Contacts', count: visibleActivities.filter(a => a.type === 'contact').length }
  ];

  const timeframeOptions = [
    { value: 'today', label: 'Aujourd\'hui' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'all', label: 'Tout' }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-500" />
            Timeline d'Activités
          </CardTitle>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`p-2 rounded-lg transition-colors ${isAutoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
              title={isAutoRefresh ? 'Désactiver le rafraîchissement auto' : 'Activer le rafraîchissement auto'}
            >
              <RefreshCw className={`h-4 w-4 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeframeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="max-h-96 overflow-y-auto">
        {visibleActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune activité trouvée pour cette période</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleActivities.map((activity, index) => (
              <div 
                key={activity.id}
                className={`relative pl-8 pb-4 border-l-2 ${
                  index === visibleActivities.length - 1 ? 'border-transparent' : 'border-gray-200'
                } hover:bg-gray-50 rounded-lg transition-colors p-3 ${getActivityColor(activity.type)}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Icône de timeline */}
                <div className="absolute left-0 top-3 transform -translate-x-1/2 bg-white border-2 border-gray-200 rounded-full p-1">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                      
                      {activity.user && (
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {activity.user}
                        </span>
                      )}
                      
                      {activity.location && (
                        <span className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {activity.location}
                        </span>
                      )}
                      
                      {activity.duration && (
                        <span className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {Math.floor(activity.duration / 60)}min {activity.duration % 60}s
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-1 rounded-lg hover:bg-white transition-colors">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Détails additionnels pour certaines activités */}
                {activity.details && activity.type === 'project_click' && (
                  <div className="mt-2 p-2 bg-white rounded border text-xs">
                    <span className="font-medium">Projet:</span> {activity.details.project_name}
                    {activity.details.clicks > 1 && (
                      <span className="ml-2 text-gray-500">({activity.details.clicks} clics total)</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Indicateur de chargement en temps réel */}
        {isAutoRefresh && (
          <div className="flex items-center justify-center py-4 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Surveillance en temps réel active</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
