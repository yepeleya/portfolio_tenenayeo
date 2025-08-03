import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, MessageSquare, Download, BarChart3, MousePointer, Lightbulb } from 'lucide-react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';

const AdminDashboard: React.FC = () => {
  // Utilisateur connecté 
  const currentUser = {
    name: 'Tenena Admin',
    email: 'tenenayeo00@gmail.com',
    avatar: undefined
  };

  const menuItems = [
    {
      icon: Eye,
      title: 'Statistiques de visites',
      description: 'Consultez les statistiques de visites et l\'analytique détaillée',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MessageSquare,
      title: 'Messages reçus',
      description: 'Gérez les messages et retours reçus via le formulaire de contact',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Lightbulb,
      title: 'Propositions d\'amélioration',
      description: 'Consultez les suggestions d\'amélioration du portfolio',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Download,
      title: 'Téléchargements CV',
      description: 'Suivez les téléchargements de votre CV et autres documents',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: MousePointer,
      title: 'Suivi des clics projets',
      description: 'Analysez les interactions avec vos projets',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: BarChart3,
      title: 'Analytics avancées',
      description: 'Données détaillées et rapports complets',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <AdminLayout currentUser={currentUser}>
      <div className="space-y-8">
        {/* Section de bienvenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bienvenue, {currentUser.name} ! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Tableau de bord administrateur - Portfolio Tenenayeo
              </p>
              <p className="text-blue-200 text-sm mt-2">
                Utilisez le menu de gauche pour naviguer entre les différentes sections
              </p>
            </div>
            <div className="hidden lg:block">
              <Activity className="w-16 h-16 text-blue-200" />
            </div>
          </div>
        </motion.div>

        {/* Message informatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center mb-3">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Navigation du Dashboard
            </h2>
          </div>
          <p className="text-gray-600">
            Cliquez sur l'un des éléments du menu de gauche pour accéder aux différentes sections de gestion :
            statistiques, messages, téléchargements, etc. Chaque section vous donnera accès à des données
            réelles et dynamiques de votre portfolio.
          </p>
        </motion.div>

        {/* Aperçu des sections disponibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Sections disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${item.bgColor}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 ml-3 text-sm">
                    {item.title}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
