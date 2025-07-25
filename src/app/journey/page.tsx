'use client';

import { motion } from 'framer-motion';
import { Book, Code, Trophy, Target, Calendar, CheckCircle } from 'lucide-react';
import EditableLearningPathVisualization from '@/components/journey/EditableLearningPathVisualization';
import EditableProgressTracker from '@/components/journey/EditableProgressTracker';
import EditableCertificationsShowcase from '@/components/journey/EditableCertificationsShowcase';
import AdminToolbar from '@/components/journey/AdminToolbar';
import { AdminProvider } from '@/contexts/AdminContext';
import AdminOnly from '@/components/admin/AdminOnly';

export default function JourneyPage() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AdminOnly>
          <AdminToolbar />
        </AdminOnly>
        
        <div className="pt-20 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My Learning Journey
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From healthcare to software engineering - tracking my progress across different career paths 
                and technical milestones
              </p>
            </motion.div>

            {/* Learning Paths Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center mb-8">
                <Target className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Career Path Visualizations</h2>
              </div>
              <EditableLearningPathVisualization />
            </motion.section>

            {/* Progress Tracker Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center mb-8">
                <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Progress Tracking</h2>
              </div>
              <EditableProgressTracker />
            </motion.section>

            {/* Certifications Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center mb-8">
                <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Certifications & Courses</h2>
              </div>
              <EditableCertificationsShowcase />
            </motion.section>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
}