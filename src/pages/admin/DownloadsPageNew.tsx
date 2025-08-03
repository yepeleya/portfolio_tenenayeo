import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Monitor, Tablet, MapPin, RefreshCw, TrendingUp, Calendar, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';

interface CVDownload {
  id: number;
  fileName: string;
  downloadDate: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  device: string;
}

interface DownloadStats {
  totalDownloads: number;
  todayDownloads: number;
  weekDownloads: number;
  monthDownloads: number;
  topDevice: string;
  topLocation: string;
}

const DownloadsPageNew: React.FC = () => {
  const [downloads, setDownloads] = useState<CVDownload[]>([]);
  const [stats, setStats] = useState<DownloadStats>({
    totalDownloads: 0,
    todayDownloads: 0,
    weekDownloads: 0,
    monthDownloads: 0,
    topDevice: '',
    topLocation: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = {
    name: 'Tenena Admin',
    email: 'tenenayeo00@gmail.com',
    avatar: undefined
  };

  const loadDownloads = async () => {
    try {
      setLoading(true);
      setError(null);

      // Essayer de charger les vraies données
      const response = await fetch('http://localhost:3002/api/admin/cv-downloads');
      
      if (response.ok) {
        const realData = await response.json();
        console.log('Données réelles chargées:', realData);
        
        if (realData.success) {
          setDownloads(realData.downloads || []);
          setStats(realData.stats || {
            totalDownloads: 0,
            todayDownloads: 0,
            weekDownloads: 0,
            monthDownloads: 0,
            topDevice: 'Desktop',
            topLocation: 'Non défini'
          });
          setError(null); // Pas d'erreur, données réelles chargées
        } else {
          throw new Error('Format de données invalide');
        }
      } else {
        throw new Error(`Erreur API: ${response.status}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.log('Basculement en mode simulation:', errorMessage);
      setError(`Mode simulation - API indisponible (${errorMessage})`);

      // Données simulées réalistes uniquement en cas d'erreur

      // Données simulées réalistes
      const today = new Date();
      const simulatedDownloads: CVDownload[] = [];
      const locations = ['Paris, France', 'Abidjan, Côte d\'Ivoire', 'Lyon, France', 'Londres, UK', 'New York, USA'];
      const devices = ['Desktop', 'Mobile', 'Tablet'];
      const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
        'Mozilla/5.0 (Android 13; Mobile; rv:108.0) Gecko/108.0'
      ];

      // Générer 50 téléchargements sur les 30 derniers jours
      for (let i = 0; i < 50; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        simulatedDownloads.push({
          id: i + 1,
          fileName: 'CV-Tenena-Yeo.pdf',
          downloadDate: date.toISOString(),
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          device: devices[Math.floor(Math.random() * devices.length)]
        });
      }

      // Trier par date décroissante
      simulatedDownloads.sort((a, b) => new Date(b.downloadDate).getTime() - new Date(a.downloadDate).getTime());

      // Calculer les statistiques
      const todayStart = new Date(today);
      todayStart.setHours(0, 0, 0, 0);
      
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - 7);
      
      const monthStart = new Date(today);
      monthStart.setMonth(monthStart.getMonth() - 1);

      const todayDownloads = simulatedDownloads.filter(d => new Date(d.downloadDate) >= todayStart).length;
      const weekDownloads = simulatedDownloads.filter(d => new Date(d.downloadDate) >= weekStart).length;
      const monthDownloads = simulatedDownloads.filter(d => new Date(d.downloadDate) >= monthStart).length;

      // Top device et location
      const deviceCounts = simulatedDownloads.reduce((acc, d) => {
        acc[d.device] = (acc[d.device] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const locationCounts = simulatedDownloads.reduce((acc, d) => {
        acc[d.location] = (acc[d.location] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topDevice = Object.entries(deviceCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Desktop';
      const topLocation = Object.entries(locationCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Paris, France';

      setDownloads(simulatedDownloads);
      setStats({
        totalDownloads: simulatedDownloads.length,
        todayDownloads,
        weekDownloads,
        monthDownloads,
        topDevice,
        topLocation
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDownloads();
  }, []);

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const StatCard = ({ title, value, Icon, color }: { title: string; value: string | number; Icon: any; color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <AdminLayout currentUser={currentUser}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Chargement des téléchargements...</span>
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
              📥 Téléchargements CV
            </h1>
            <p className="text-gray-600">
              Suivez les téléchargements de votre CV et analysez les tendances
            </p>
          </div>
          <button
            onClick={loadDownloads}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Message de statut */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg"
          >
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Mode simulation :</strong> {error}. Données de démonstration affichées.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg"
          >
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <strong>✅ Données en temps réel :</strong> Les statistiques sont synchronisées avec la base de données.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Téléchargements"
            value={stats.totalDownloads}
            Icon={Download}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            title="Aujourd'hui"
            value={stats.todayDownloads}
            Icon={Calendar}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            title="Cette semaine"
            value={stats.weekDownloads}
            Icon={TrendingUp}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard
            title="Ce mois"
            value={stats.monthDownloads}
            Icon={Eye}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Appareil le plus utilisé</h2>
            <div className="flex items-center space-x-4">
              {React.createElement(getDeviceIcon(stats.topDevice), { className: "w-8 h-8 text-blue-600" })}
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.topDevice}</p>
                <p className="text-gray-600">Type d'appareil dominant</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Localisation principale</h2>
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.topLocation}</p>
                <p className="text-gray-600">Région la plus active</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tableau des téléchargements récents */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Téléchargements récents</h2>
            <p className="text-gray-600 text-sm">Derniers téléchargements de votre CV</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appareil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse IP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {downloads.slice(0, 10).map((download, index) => {
                  const DeviceIcon = getDeviceIcon(download.device);
                  return (
                    <motion.tr
                      key={download.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(download.downloadDate).toLocaleString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DeviceIcon className="w-5 h-5 text-gray-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{download.device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{download.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {download.ipAddress}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DownloadsPageNew;
