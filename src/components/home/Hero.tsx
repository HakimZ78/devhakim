'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Mail } from 'lucide-react';
import AnimatedBackground from '@/components/animations/AnimatedBackground';

interface HeroContent {
  id?: string
  name: string
  subtitle: string
  roles: string[]
  description: string
  primary_cta_text: string
  primary_cta_link: string
  secondary_cta_text: string
  secondary_cta_link: string
  linkedin_url: string
  email: string
}

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  // Load hero content from database
  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hero');
      const result = await response.json();
      
      if (result.success) {
        setHeroContent(result.data);
      } else {
        console.error('Failed to load hero content:', result.error);
      }
    } catch (error) {
      console.error('Error loading hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (heroContent?.roles) {
      const interval = setInterval(() => {
        setCurrentRole((prev) => (prev + 1) % heroContent.roles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [heroContent?.roles]);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-24 md:pt-0">
        <AnimatedBackground variant="particles" intensity="medium" />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (!heroContent) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-24 md:pt-0">
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
            className="text-4xl md:text-7xl font-bold text-white mb-4"
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
              {heroContent.name}
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl md:text-2xl text-gray-300">
              {heroContent.subtitle}
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
                {heroContent.roles[currentRole]}
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
          dangerouslySetInnerHTML={{ __html: heroContent.description.replace(
            /Pharmacy & Optometry/g,
            '<span class="text-green-400 font-semibold">Pharmacy & Optometry</span>'
          ).replace(
            /Financial Markets/g,
            '<span class="text-green-400 font-semibold">Financial Markets</span>'
          ).replace(
            /ForexAcuity, a real-time trading analytics platform/g,
            '<span class="text-green-400 font-semibold">ForexAcuity, a real-time trading analytics platform</span>'
          ) }}
        />

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a 
            href="#skills"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Technical Skills
          </motion.a>
          <motion.a 
            href="#current-focus"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Current Learning
          </motion.a>
          <motion.a 
            href={heroContent.primary_cta_link}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {heroContent.primary_cta_text}
          </motion.a>
          <motion.a 
            href="#journey"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            My Journey
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
            { href: heroContent.linkedin_url, icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${heroContent.email}`, icon: Mail, label: "Email" }
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