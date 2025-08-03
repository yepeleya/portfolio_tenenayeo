import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Heart,
  ArrowUp,
  Code,
  MapPin,
  Download,
  ExternalLink
} from 'lucide-react';

const ModernFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/yepeleya',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://www.linkedin.com/in/yepeleya-yeo-3b3a14310',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: '/contact',
      color: 'hover:text-red-500'
    },
  ];

  const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Projets', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Développement Web',
    'Applications Mobile',
    'UI/UX Design',
    'Consulting Tech'
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-gray-200/20 dark:border-gray-700/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative">
        {/* Section principale */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* À propos */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Tenena Yeo
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Développeur Full-Stack
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                  Passionné par le développement web et mobile, je crée des solutions innovantes 
                  qui transforment les idées en expériences numériques exceptionnelles.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Abidjan, Côte d'Ivoire</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      tenenayeo00@gmail.com
                    </a>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 ${social.color} group`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Liens rapides */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Navigation
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Services
                </h4>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service} className="text-gray-600 dark:text-gray-400">
                      {service}
                    </li>
                  ))}
                </ul>

                {/* Bouton CV */}
                <motion.a
                  href="/CV_Tenena.pdf"
                  download="CV_Tenena.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Mon CV</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Section du bas */}
        <div className="border-t border-gray-200/20 dark:border-gray-700/20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
              >
                <span>© 2025 Tenena Yeo. Fait avec</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>en Côte d'Ivoire</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Développé avec React & TypeScript
                </span>
                
                {/* Bouton retour en haut */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label="Retour en haut"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
