import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, ArrowRight, MapPin, Code, Palette, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadCV } from '../utils/cvDownload';

const ModernHomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = [
    { icon: Code, name: 'Frontend', desc: 'React, TypeScript, Tailwind' },
    { icon: Zap, name: 'Backend', desc: 'Node.js, Express, Bases de données' },
    { icon: Palette, name: 'Design', desc: 'UI/UX, Figma, Responsive Design' }
  ];

  const stats = [
    { number: '15+', label: 'Projets Réalisés' },
    { number: '3+', label: 'Années d\'Expérience' },
    { number: '50+', label: 'Technologies Maîtrisées' },
    { number: '100%', label: 'Satisfaction Client' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium tracking-wide uppercase">Développeur Full-Stack</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                    Salut, je suis{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Tenena Yeo
                    </span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Je crée des{' '}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">expériences numériques</span>{' '}
                    exceptionnelles qui transforment les idées en solutions innovantes.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/projects"
                    className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    Voir mes projets
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button
                    onClick={downloadCV}
                    className="group inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                    Télécharger CV
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Content - Profile & Skills */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Profile Image Container */}
                <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-6xl lg:text-8xl font-bold text-gray-400 dark:text-gray-500">
                      TY
                    </div>
                  </div>
                </div>

                {/* Floating Skills Cards */}
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    className={`absolute ${
                      index === 0 ? '-top-4 -left-4' :
                      index === 1 ? '-top-4 -right-4' :
                      '-bottom-4 left-1/2 transform -translate-x-1/2'
                    } bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <skill.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{skill.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Découvrez mon travail
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explorez mes projets, compétences et expériences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Mes Projets',
                description: 'Découvrez mes réalisations et projets les plus récents',
                link: '/projects',
                icon: Code,
                color: 'blue'
              },
              {
                title: 'À Propos',
                description: 'En savoir plus sur mon parcours et mes compétences',
                link: '/about',
                icon: Palette,
                color: 'purple'
              },
              {
                title: 'Contact',
                description: 'Discutons de votre prochain projet ensemble',
                link: '/contact',
                icon: ExternalLink,
                color: 'green'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link
                  to={item.link}
                  className="block group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center mt-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">En savoir plus</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;
