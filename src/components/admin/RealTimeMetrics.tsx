import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  Eye, 
  Users, 
  MousePointer, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Globe,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';

interface RealTimeMetricsProps {
  analytics: any;
  stats: any;
}

interface MetricItem {
  title: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  format?: 'number' | 'percent' | 'time';
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ analytics, stats }) => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Animation des valeurs
  useEffect(() => {
    if (analytics && stats) {
      const metrics = calculateMetrics();
      
      // Animer les valeurs
      metrics.forEach((metric, index) => {
        if (typeof metric.value === 'number') {
          setTimeout(() => {
            animateValue(metric.title, metric.value as number);
          }, index * 100);
        }
      });
    }
  }, [analytics, stats]);

  const animateValue = (key: string, endValue: number) => {
    setAnimatedValues(prev => ({ ...prev, [key]: 0 }));
    
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * endValue);
      
      setAnimatedValues(prev => ({ ...prev, [key]: currentValue }));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const calculateMetrics = (): MetricItem[] => {
    if (!analytics || !stats) return [];

    const totalVisits = analytics.dailyVisits?.reduce((sum: number, day: any) => sum + day.visits, 0) || 0;
    const totalUniqueVisitors = Math.max(...(analytics.dailyVisits?.map((day: any) => day.unique_visitors) || [0]));
    const totalProjectClicks = analytics.topProjects?.reduce((sum: number, project: any) => sum + project.clicks, 0) || 0;
    const totalCVDownloads = analytics.recentActivity?.filter((activity: any) => activity.type === 'cv_download').length || 0;
    
    // Calculer les changements (simulé pour la démo)
    const visitChange = Math.floor(Math.random() * 20) - 10;
    const projectClickChange = Math.floor(Math.random() * 15) - 5;
    const contactChange = stats.todayContacts || 0;

    return [
      {
        title: 'Visites Totales',
        value: totalVisits,
        change: visitChange,
        changeType: visitChange >= 0 ? 'increase' : 'decrease',
        icon: Eye,
        color: 'text-blue-600',
        bgColor: 'bg-blue-500',
        description: 'Nombre total de visites sur le portfolio'
      },
      {
        title: 'Visiteurs Uniques',
        value: totalUniqueVisitors,
        change: Math.floor(Math.random() * 10) - 3,
        changeType: 'increase',
        icon: Users,
        color: 'text-green-600',
        bgColor: 'bg-green-500',
        description: 'Visiteurs uniques aujourd\'hui'
      },
      {
        title: 'Clics sur Projets',
        value: totalProjectClicks,
        change: projectClickChange,
        changeType: projectClickChange >= 0 ? 'increase' : 'decrease',
        icon: MousePointer,
        color: 'text-purple-600',
        bgColor: 'bg-purple-500',
        description: 'Interactions avec vos projets'
      },
      {
        title: 'Téléchargements CV',
        value: totalCVDownloads,
        change: Math.floor(Math.random() * 5),
        changeType: 'increase',
        icon: Download,
        color: 'text-orange-600',
        bgColor: 'bg-orange-500',
        description: 'CV téléchargés aujourd\'hui'
      },
      {
        title: 'Nouveaux Contacts',
        value: stats.todayContacts || 0,
        change: contactChange,
        changeType: 'increase',
        icon: Globe,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-500',
        description: 'Messages reçus aujourd\'hui'
      },
      {
        title: 'Taux d\'Engagement',
        value: totalVisits > 0 ? Math.round((totalProjectClicks / totalVisits) * 100) : 0,
        change: Math.floor(Math.random() * 8) - 2,
        changeType: 'increase',
        icon: Activity,
        color: 'text-teal-600',
        bgColor: 'bg-teal-500',
        description: 'Pourcentage d\'interaction',
        format: 'percent'
      }
    ];
  };

  const formatValue = (value: number | string, format?: string) => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'percent':
        return `${value}%`;
      case 'time':
        return `${value}min`;
      default:
        return value.toLocaleString();
    }
  };

  const getChangeIcon = (changeType?: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 bg-green-50';
      case 'decrease':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Header avec dernière mise à jour */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            Métriques en Temps Réel
          </h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <Clock className="mr-1 h-4 w-4" />
            Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Grille de métriques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const animatedValue = animatedValues[metric.title] ?? 0;
          const displayValue = typeof metric.value === 'number' ? animatedValue : metric.value;

          return (
            <Card 
              key={metric.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${metric.bgColor} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  {metric.change !== undefined && (
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(metric.changeType)}`}>
                      {getChangeIcon(metric.changeType)}
                      <span>{Math.abs(metric.change)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600">{metric.title}</h4>
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {formatValue(displayValue, metric.format)}
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>

                {/* Barre de progression animée pour certaines métriques */}
                {metric.format === 'percent' && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${metric.bgColor} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${Math.min(displayValue as number, 100)}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Indicateurs de performance rapide */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Activity className="mr-2 h-5 w-5 text-green-400" />
            Résumé de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {analytics?.dailyVisits?.length || 0}
              </div>
              <div className="text-sm text-gray-300">Jours d'activité</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {analytics?.topPages?.length || 0}
              </div>
              <div className="text-sm text-gray-300">Pages consultées</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {analytics?.topProjects?.length || 0}
              </div>
              <div className="text-sm text-gray-300">Projets vus</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {((stats?.unreadContacts || 0) + (stats?.unreadFeedbacks || 0)) === 0 ? '✓' : '!'}
              </div>
              <div className="text-sm text-gray-300">
                {((stats?.unreadContacts || 0) + (stats?.unreadFeedbacks || 0)) === 0 ? 'Tout traité' : 'Actions requises'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeMetrics;
