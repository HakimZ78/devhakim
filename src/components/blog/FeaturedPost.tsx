'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

export default function FeaturedPost() {
  const featuredPost = blogPosts.find(post => post.featured);
  
  if (!featuredPost) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl overflow-hidden border border-slate-600"
    >
      {/* Featured Badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
          <Star className="w-4 h-4 mr-1" />
          Featured
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
              {featuredPost.category}
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {featuredPost.title}
          </h2>
          
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {featuredPost.excerpt}
          </p>
          
          <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(featuredPost.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {featuredPost.readTime} min read
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {featuredPost.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-600 text-gray-300 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 self-start group"
          >
            Read Article
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Visual Element */}
        <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          
          {/* Abstract visual representation */}
          <div className="relative z-10 p-12">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.5 + (i * 0.1),
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 2
                  }}
                  className={`h-12 w-12 rounded-lg ${
                    i % 3 === 0 
                      ? 'bg-blue-400/40' 
                      : i % 3 === 1 
                      ? 'bg-purple-400/40' 
                      : 'bg-pink-400/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}