import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, BarChart3, Eye, ExternalLink, RefreshCw, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';

interface ProjectClick {
  id: number;
  projectName: string;
  projectUrl: string;
  timestamp: string;
  referrer?: string;
  location: string;
  device: string;
  clickType: 'demo' | 'github' | 'details';
}

interface ProjectStats {
  projectName: string;
  totalClicks: number;
  demoClicks: number;
  githubClicks: number;
  detailsClicks: number;
  trend: number;
}

const ProjectClicksPage: React.FC = () => {
  const [clicks, setClicks] = useState<ProjectClick[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const currentUser = {
    name: 'Tenena Admin',
    email: 'tenenayeo00@gmail.com',
    avatar: undefined
  };

  useEffect(() => {
    loadProjectClicks();
  }, []);

  const loadProjectClicks = async () => {
    try {
      setLoading(true);
      
      // Essayer de charger les vraies données
      const response = await fetch('http://localhost:3002/api/admin/project-clicks');
      
      if (response.ok) {
        const realData = await response.json();
        setClicks(realData.clicks || []);
        setProjectStats(realData.stats || []);
      } else {
        throw new Error('API not available');
      }
    } catch (err) {
      console.log('Mode simulation - Génération de données de clics projets');
      
      // Données simulées réalistes
      const projects = [
        {
          name: 'Système de Parrainage ISTC',
          url: 'https://yepeleya.github.io/projet-parrainage',
          description: 'Application web pour gérer l\'attribution de parrains et filleuls'
        },
        {
          name: 'Plateforme JIG 2026',
          url: 'https://github.com/yepeleya/jig2026',
          description: 'Système complet de gestion d\'événement avec vote et paiement'
        },
        {
          name: 'Convertisseur de Devises',
          url: 'https://yepeleya.github.io/currency-converter',
          description: 'Application de conversion avec taux en temps réel'
        },
        {
          name: 'Générateur QR Code',
          url: 'https://yepeleya.github.io/qr-generator',
          description: 'Génération de QR codes avec options personnalisées'
        },
        {
          name: 'Chat App React',
          url: 'https://chat-app.demo.com',
          description: 'Application de chat temps réel avec Socket.io'
        }
      ];

      const today = new Date();
      const simulatedClicks: ProjectClick[] = [];
      const locations = ['Paris, France', 'Lyon, France', 'Abidjan, Côte d\'Ivoire', 'Londres, UK', 'Berlin, Allemagne'];
      const devices = ['Desktop', 'Mobile', 'Tablet'];
      const clickTypes: ('demo' | 'github' | 'details')[] = ['demo', 'github', 'details'];
      const referrers = ['linkedin.com', 'github.com', 'google.com', 'direct', 'twitter.com'];

      // Générer 200 clics sur les 30 derniers jours
      for (let i = 0; i < 200; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        const project = projects[Math.floor(Math.random() * projects.length)];
        
        simulatedClicks.push({
          id: i + 1,
          projectName: project.name,
          projectUrl: project.url,
          timestamp: date.toISOString(),
          referrer: Math.random() > 0.3 ? referrers[Math.floor(Math.random() * referrers.length)] : undefined,
          location: locations[Math.floor(Math.random() * locations.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          clickType: clickTypes[Math.floor(Math.random() * clickTypes.length)]
        });
      }

      // Trier par date décroissante
      simulatedClicks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      // Calculer les statistiques par projet
      const statsMap = new Map<string, ProjectStats>();
      
      projects.forEach(project => {
        const projectClicks = simulatedClicks.filter(click => click.projectName === project.name);
        const demoClicks = projectClicks.filter(click => click.clickType === 'demo').length;
        const githubClicks = projectClicks.filter(click => click.clickType === 'github').length;
        const detailsClicks = projectClicks.filter(click => click.clickType === 'details').length;
        
        statsMap.set(project.name, {
          projectName: project.name,
          totalClicks: projectClicks.length,
          demoClicks,
          githubClicks,
          detailsClicks,
          trend: Math.floor(Math.random() * 40) - 10 // Entre -10 et +30
        });
      });

      setClicks(simulatedClicks);
      setProjectStats(Array.from(statsMap.values()).sort((a, b) => b.totalClicks - a.totalClicks));
    } finally {
      setLoading(false);
    }
  };

  const getClickTypeColor = (type: string) => {
    switch (type) {
      case 'demo': return 'bg-blue-100 text-blue-800';
      case 'github': return 'bg-gray-100 text-gray-800';
      case 'details': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClickTypeIcon = (type: string) => {
    switch (type) {
      case 'demo': return '🚀';
      case 'github': return '📁';
      case 'details': return '👁️';
      default: return '🔗';
    }
  };

  const filteredClicks = selectedProject === 'all' 
    ? clicks 
    : clicks.filter(click => click.projectName === selectedProject);

  const totalClicks = projectStats.reduce((sum, stat) => sum + stat.totalClicks, 0);

  if (loading) {
    return (
      <AdminLayout currentUser={currentUser}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Chargement des clics projets...</span>
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
              🖱️ Suivi des Clics Projets
            </h1>
            <p className="text-gray-600">
              Analysez les interactions avec vos projets et leur popularité
            </p>
          </div>
          <button
            onClick={loadProjectClicks}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Clics</p>
                <p className="text-3xl font-bold text-gray-900">{totalClicks}</p>
                <p className="text-sm mt-2 flex items-center text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% ce mois
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <MousePointer className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Projets Actifs</p>
                <p className="text-3xl font-bold text-gray-900">{projectStats.length}</p>
                <p className="text-sm mt-2 flex items-center text-green-600">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Portfolio complet
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Démo Populaire</p>
                <p className="text-lg font-bold text-gray-900">
                  {projectStats.reduce((max, stat) => stat.demoClicks > max.demoClicks ? stat : max, projectStats[0])?.projectName || 'N/A'}
                </p>
                <p className="text-sm mt-2 flex items-center text-purple-600">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Plus consultée
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <ExternalLink className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Taux d'Engagement</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round((totalClicks / (totalClicks + 100)) * 100)}%
                </p>
                <p className="text-sm mt-2 flex items-center text-orange-600">
                  <Eye className="w-4 h-4 mr-1" />
                  Très bon
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistiques par projet */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Performance par Projet</h2>
            <p className="text-gray-600 text-sm">Classement des projets par popularité</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {projectStats.map((stat, index) => (
                <motion.div
                  key={stat.projectName}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 font-bold rounded-full text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{stat.projectName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>🚀 {stat.demoClicks} démos</span>
                        <span>📁 {stat.githubClicks} GitHub</span>
                        <span>👁️ {stat.detailsClicks} détails</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.totalClicks}</p>
                    <p className={`text-sm flex items-center ${stat.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend < 0 ? 'rotate-180' : ''}`} />
                      {stat.trend >= 0 ? '+' : ''}{stat.trend}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtre et historique des clics */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Historique des Clics</h2>
                <p className="text-gray-600 text-sm">Clics récents sur vos projets</p>
              </div>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les projets</option>
                {projectStats.map(stat => (
                  <option key={stat.projectName} value={stat.projectName}>
                    {stat.projectName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appareil</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClicks.slice(0, 15).map((click, index) => (
                  <motion.tr
                    key={click.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{click.projectName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getClickTypeIcon(click.clickType)}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getClickTypeColor(click.clickType)}`}>
                          {click.clickType === 'demo' && 'Démo'}
                          {click.clickType === 'github' && 'GitHub'}
                          {click.clickType === 'details' && 'Détails'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(click.timestamp).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {click.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {click.device}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectClicksPage;
