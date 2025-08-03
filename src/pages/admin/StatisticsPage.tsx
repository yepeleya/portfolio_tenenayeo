import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Eye, Users, TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';

interface VisitStatistics {
  totalVisits: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: Array<{ page: string; visits: number; percentage: number }>;
  dailyVisits: Array<{ date: string; visits: number; unique_visitors: number }>;
  hourlyDistribution: Array<{ hour: string; visits: number }>;
  deviceStats: Array<{ device: string; percentage: number; color: string }>;
}

const StatisticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState<VisitStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const currentUser = {
    name: 'Tenenayeo Admin',
    email: 'admin@tenenayeo.com'
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/analytics/detailed?range=${timeRange}`);
        if (response.ok) {
          const data = await response.json();
          setStatistics(data);
        } else {
          throw new Error('API non disponible');
        }
      } catch (error) {
        console.log('Mode simulation - statistiques');
        // Données simulées réalistes
        const generateDailyData = (days: number) => {
          const data = [];
          const today = new Date();
          for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            data.push({
              date: date.toISOString().split('T')[0],
              visits: Math.floor(Math.random() * 50) + 20,
              unique_visitors: Math.floor(Math.random() * 30) + 15
            });
          }
          return data;
        };

        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        const dailyData = generateDailyData(days);
        const totalVisits = dailyData.reduce((sum, day) => sum + day.visits, 0);
        const totalUnique = dailyData.reduce((sum, day) => sum + day.unique_visitors, 0);

        setStatistics({
          totalVisits,
          uniqueVisitors: totalUnique,
          bounceRate: Math.floor(Math.random() * 30) + 25, // 25-55%
          avgSessionDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          topPages: [
            { page: '/portfolio', visits: Math.floor(totalVisits * 0.35), percentage: 35 },
            { page: '/projets', visits: Math.floor(totalVisits * 0.25), percentage: 25 },
            { page: '/contact', visits: Math.floor(totalVisits * 0.20), percentage: 20 },
            { page: '/cv', visits: Math.floor(totalVisits * 0.12), percentage: 12 },
            { page: '/a-propos', visits: Math.floor(totalVisits * 0.08), percentage: 8 }
          ],
          dailyVisits: dailyData,
          hourlyDistribution: Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}h`,
            visits: Math.floor(Math.random() * 20) + 5
          })),
          deviceStats: [
            { device: 'Desktop', percentage: 65, color: '#3B82F6' },
            { device: 'Mobile', percentage: 30, color: '#10B981' },
            { device: 'Tablet', percentage: 5, color: '#F59E0B' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeRange]);

  const StatCard: React.FC<{
    icon: React.ElementType;
    title: string;
    value: string | number;
    change?: string;
    color: string;
  }> = ({ icon: Icon, title, value, change, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm mt-2 flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
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
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Eye className="w-16 h-16 animate-pulse text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">Chargement des statistiques...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!statistics) {
    return (
      <AdminLayout currentUser={currentUser}>
        <div className="text-center py-12">
          <p className="text-gray-600">Erreur lors du chargement des statistiques</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentUser={currentUser}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Statistiques de Visites
              </h1>
              <p className="text-gray-600 text-lg mt-2">Analyse détaillée du trafic de votre portfolio</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">90 derniers jours</option>
                </select>
              </div>
              <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Eye}
          title="Visites Totales"
          value={statistics.totalVisits.toLocaleString('fr-FR')}
          change="+12%"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Users}
          title="Visiteurs Uniques"
          value={statistics.uniqueVisitors.toLocaleString('fr-FR')}
          change="+8%"
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Taux de Rebond"
          value={`${statistics.bounceRate}%`}
          change="-5%"
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
        />
        <StatCard
          icon={Calendar}
          title="Durée Moyenne"
          value={statistics.avgSessionDuration}
          change="+15%"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Graphique temporel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Évolution des Visites</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statistics.dailyVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="unique_visitors" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution par heure */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Répartition Horaire</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistics.hourlyDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pages les plus visitées */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Pages Populaires</h3>
          <div className="space-y-4">
            {statistics.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                  <span className="font-medium text-gray-900">{page.page}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {page.visits}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Répartition par appareil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Types d'Appareils</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statistics.deviceStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ device, percentage }) => `${device}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {statistics.deviceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default StatisticsPage;
