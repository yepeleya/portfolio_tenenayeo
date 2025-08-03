import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faEnvelope, 
  faMapMarkerAlt,
  faCalendarAlt,
  faGraduationCap,
  faCode
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const HeroSection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const handleDownloadCV = () => {
    // Créer un lien vers un CV placeholder
    const link = document.createElement('a');
    link.href = '/cv-tenena-yeo.pdf'; // Vous devrez ajouter ce fichier
    link.download = 'CV-Tenena-Yeo-Developpeur.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Contenu textuel */}
          <div className="space-y-8">
            {/* Badge de statut */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                Étudiant • Disponible pour stages
              </span>
            </motion.div>

            {/* Nom et titre */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Tenena <span className="text-blue-600">Yeo</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-600 mt-4 font-light">
                Étudiant en Développement Web
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Étudiant passionné d'informatique avec <strong>4 ans d'apprentissage autodidacte</strong> 
                depuis ma chambre. De la création d'un jeu Snake en Python (2021) aux applications 
                React modernes, je progresse chaque jour vers mon objectif : 
                <strong className="text-blue-600"> devenir développeur fullstack confirmé</strong>.
              </p>
            </motion.div>

            {/* Informations complémentaires */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
                <span>Côte d'Ivoire</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                <span>Depuis 2021</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCode} className="mr-2 text-blue-500" />
                <span>Autodidacte</span>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-3" />
                Télécharger mon CV
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:tenenayeo00@gmail.com"
                className="flex items-center px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-600" />
                Me contacter
              </motion.a>
            </motion.div>

            {/* Liens sociaux */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/TenenaYeo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-gray-900 transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://linkedin.com/in/tenena-yeo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </motion.a>
            </motion.div>
          </div>

          {/* Section visuelle */}
          <motion.div
            variants={itemVariants}
            className="relative lg:ml-8"
          >
            {/* Cercles décoratifs animés */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-60"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.8, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-20 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-60"
              />
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  x: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-60"
              />
            </div>

            {/* Photo de profil placeholder */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCode} size="3x" className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Code & Create</h3>
                <p className="text-gray-600">Transforming ideas into digital reality</p>
                
                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">4</div>
                    <div className="text-xs text-gray-500">Années</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">15+</div>
                    <div className="text-xs text-gray-500">Technologies</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
