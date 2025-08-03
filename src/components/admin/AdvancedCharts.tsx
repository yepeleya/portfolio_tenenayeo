import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

interface ChartData {
  date: string;
  visits: number;
  unique_visitors: number;
}

interface AdvancedChartsProps {
  data: ChartData[];
  topProjects: Array<{ project_name: string; clicks: number }>;
  topPages: Array<{ page_visited: string; visits: number }>;
}

const AdvancedCharts: React.FC<AdvancedChartsProps> = ({ data, topProjects, topPages }) => {
  // Calculer les pourcentages pour les projets
  const totalClicks = topProjects.reduce((sum, project) => sum + project.clicks, 0);
  const projectsWithPercent = topProjects.map(project => ({
    ...project,
    percentage: totalClicks > 0 ? Math.round((project.clicks / totalClicks) * 100) : 0
  }));

  // Calculer les pourcentages pour les pages
  const totalPageVisits = topPages.reduce((sum, page) => sum + page.visits, 0);
  const pagesWithPercent = topPages.map(page => ({
    ...page,
    percentage: totalPageVisits > 0 ? Math.round((page.visits / totalPageVisits) * 100) : 0
  }));

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500',
    'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-gray-500'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique de tendance des visites */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Tendance des Visites (7 derniers jours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.slice(-7).map((day, index) => {
              const maxVisits = Math.max(...data.slice(-7).map(d => d.visits));
              const width = maxVisits > 0 ? (day.visits / maxVisits) * 100 : 0;
              
              return (
                <div key={day.date} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {new Date(day.date).toLocaleDateString('fr-FR', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="font-semibold text-blue-600">{day.visits} visites</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
                      style={{ 
                        width: `${width}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {day.unique_visitors} visiteurs uniques
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Répartition des clics par projet */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-green-600" />
            Répartition des Clics par Projet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectsWithPercent.slice(0, 5).map((project, index) => (
              <div key={project.project_name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 truncate flex-1">
                    {project.project_name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-green-600">
                      {project.clicks}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({project.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${colors[index]} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${project.percentage}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {projectsWithPercent.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p>Aucune donnée de projet disponible</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analyse des pages populaires */}
      <Card className="bg-gradient-to-br from-purple-50 to-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-purple-600" />
            Pages les Plus Visitées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pagesWithPercent.slice(0, 5).map((page, index) => (
              <div key={page.page_visited} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                    {page.page_visited}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-purple-600">
                      {page.visits}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({page.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:from-purple-500 group-hover:to-purple-700"
                    style={{ 
                      width: `${page.percentage}%`,
                      animationDelay: `${index * 0.15}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {pagesWithPercent.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Activity className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p>Aucune donnée de page disponible</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Métriques de performance */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-orange-600" />
            Métriques de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {data.reduce((sum, day) => sum + day.visits, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Visites</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {Math.max(...data.map(d => d.unique_visitors), 0)}
              </div>
              <div className="text-xs text-gray-600">Max Visiteurs/Jour</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {data.length > 0 ? Math.round(data.reduce((sum, day) => sum + day.visits, 0) / data.length) : 0}
              </div>
              <div className="text-xs text-gray-600">Moyenne/Jour</div>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {totalClicks}
              </div>
              <div className="text-xs text-gray-600">Total Clics</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedCharts;
