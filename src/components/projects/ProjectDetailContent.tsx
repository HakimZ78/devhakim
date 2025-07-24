'use client';

import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Star,
  CheckCircle,
  Clock,
  Target,
  Code,
  Lightbulb,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { ProjectDetail } from '@/data/projects-data';

interface ProjectDetailContentProps {
  project: ProjectDetail;
}

const categoryColors = {
  'learning': 'from-purple-500 to-pink-500',
  'fintech': 'from-green-500 to-blue-500', 
  'business': 'from-blue-500 to-cyan-500',
  'personal': 'from-orange-500 to-red-500'
};

const difficultyColors = {
  'beginner': 'text-green-400 bg-green-400/20',
  'intermediate': 'text-yellow-400 bg-yellow-400/20', 
  'advanced': 'text-red-400 bg-red-400/20'
};

const statusColors = {
  'completed': 'text-green-400 bg-green-400/20',
  'in-progress': 'text-blue-400 bg-blue-400/20',
  'planning': 'text-yellow-400 bg-yellow-400/20'
};

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link 
          href="/projects"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Project Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${categoryColors[project.category]} text-white`}>
            {project.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
            {project.status.replace('-', ' ')}
          </span>
          {project.featured && (
            <span className="inline-flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-1" />
              Featured
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {project.title}
        </h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center text-gray-400 space-x-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {project.completionDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </div>
          </div>

          <div className="flex gap-4">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.header>

      {/* Technologies */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-400" />
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-gray-300 rounded-lg hover:border-slate-500 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Overview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <p className="text-gray-300 leading-relaxed text-lg">
            {project.overview}
          </p>
        </div>
      </motion.section>

      {/* Problem & Solution */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-red-400" />
              Problem Statement
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-green-400" />
              Solution
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Challenges */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-400" />
          Challenges & Solutions
        </h2>
        <div className="space-y-6">
          {project.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {challenge.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-2">CHALLENGE</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">SOLUTION</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {challenge.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* Key Learnings */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
          Key Learnings
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <ul className="space-y-3">
            {project.keyLearnings.map((learning, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="flex items-start text-gray-300"
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {learning}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Future Enhancements */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-yellow-400" />
          Future Enhancements
        </h2>
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <ul className="grid md:grid-cols-2 gap-3">
            {project.futureEnhancements.map((enhancement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="flex items-start text-gray-300"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {enhancement}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <ImageIcon className="w-6 h-6 mr-2 text-purple-400" />
            Project Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="aspect-video bg-slate-700 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image Preview</span>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Project Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in This Project?
          </h3>
          <p className="text-gray-300 mb-6">
            I'm always happy to discuss my projects in more detail and explain how the experience applies to new challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}