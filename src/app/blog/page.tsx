'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search, Filter, BookOpen } from 'lucide-react';
import BlogList from '@/components/blog/BlogList';
import BlogFilters from '@/components/blog/BlogFilters';
import FeaturedPost from '@/components/blog/FeaturedPost';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
              Learning Journal
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Documenting my journey from healthcare to software engineering - sharing insights, 
              challenges, and lessons learned along the way
            </p>
          </motion.div>

          {/* Featured Post */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <FeaturedPost />
          </motion.section>

          {/* Filters and Search */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <BlogFilters />
          </motion.section>

          {/* Blog Posts List */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">All Articles</h2>
            </div>
            <BlogList />
          </motion.section>
        </div>
      </div>
    </div>
  );
}