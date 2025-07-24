'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import AnimatedBackground from '@/components/animations/AnimatedBackground';

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Full-Stack Developer', 'Fintech Engineer', 'Python Developer', 'React Developer'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-16 md:pt-0">
      {/* Animated Background */}
      <AnimatedBackground variant="particles" intensity="medium" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Hi, I'm{' '}
            <motion.span 
              className="text-blue-400"
              animate={{ 
                color: ['#60a5fa', '#3b82f6', '#1d4ed8', '#60a5fa'],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Hakim
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl md:text-2xl text-gray-300">
              Healthcare → Tech Transition
            </h2>
            <div className="text-lg md:text-xl text-gray-400 h-8 flex items-center justify-center">
              Aiming for:{' '}
              <motion.span 
                key={currentRole}
                className="ml-2 text-blue-400 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {roles[currentRole]}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          As a healthcare professional and active retail trader transitioning to tech, I bring analytical rigor, patient-focused problem-solving, and experience managing complex systems under pressure. My background spans <span className="text-blue-400 font-semibold">pharmacy, optometry, and financial markets</span> - providing unique insights for healthcare tech, fintech solutions, and understanding how end-users actually interact with complex systems. This diverse experience led me to build <span className="text-green-400 font-semibold">ForexAcuity, a real-time trading analytics platform</span>, solving problems I personally faced as a trader. Looking to contribute these cross-industry perspectives to teams that value diverse backgrounds and foster collaborative learning cultures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a 
            href="#projects"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View My Projects
          </motion.a>
          <motion.a 
            href="#journey"
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            My Learning Journey
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { href: "https://github.com/yourusername", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/yourprofile", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:your.email@example.com", icon: Mail, label: "Email" }
          ].map(({ href, icon: Icon, label }, index) => (
            <motion.a 
              key={label}
              href={href}
              className="p-3 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2 + index * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer" size={32} />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}