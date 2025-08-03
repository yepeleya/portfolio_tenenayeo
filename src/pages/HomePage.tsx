import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import TechnologiesSection from '../components/TechnologiesSection';
import ProjectsSection from '../components/ProjectsSection';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <HeroSection />
      <TechnologiesSection />
      <ProjectsSection />
    </motion.div>
  );
};

export default HomePage;