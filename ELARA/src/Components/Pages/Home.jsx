import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to ELARA
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Discover the latest fashion trends
        </p>
      </div>
    </motion.div>
  );
}