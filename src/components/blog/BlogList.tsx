'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blog-posts';
import { BlogFilters as BlogFiltersType } from '@/types/blog';
import BlogFilters from './BlogFilters';

export default function BlogList() {
  const [filters, setFilters] = useState<BlogFiltersType>({
    searchQuery: '',
    category: '',
    tags: [],
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesExcerpt && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (filters.category && post.category !== filters.category) {
        return false;
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => post.tags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });

    // Sort posts
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
          break;
        case 'readTime':
          comparison = a.readTime - b.readTime;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [filters]);

  const getCategoryInfo = (categoryId: string) => {
    return blogCategories.find(cat => cat.id === categoryId);
  };

  return (
    <div className="space-y-8">
      <BlogFilters onFiltersChange={setFilters} />

      {/* Results Count */}
      <div className="text-gray-400">
        {filteredAndSortedPosts.length === blogPosts.length ? (
          <span>Showing all {blogPosts.length} articles</span>
        ) : (
          <span>
            Showing {filteredAndSortedPosts.length} of {blogPosts.length} articles
          </span>
        )}
      </div>

      {/* Posts Grid */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPosts.map((post, index) => {
            const categoryInfo = getCategoryInfo(post.category);
            
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden group"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className={`inline-block bg-gradient-to-r ${categoryInfo?.color || 'from-gray-500 to-gray-600'} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}m
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 bg-slate-700 text-gray-400 text-xs rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-700/30 border-t border-slate-700 flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 text-lg mb-4">No articles found matching your criteria</div>
          <button
            onClick={() => setFilters({
              searchQuery: '',
              category: '',
              tags: [],
              sortBy: 'date',
              sortOrder: 'desc'
            })}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}