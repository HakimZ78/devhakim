'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, SortAsc, SortDesc } from 'lucide-react';
import { blogCategories, allTags } from '@/data/blog-posts';
import { BlogFilters as BlogFiltersType } from '@/types/blog';

interface BlogFiltersProps {
  onFiltersChange?: (filters: BlogFiltersType) => void;
}

export default function BlogFilters({ onFiltersChange }: BlogFiltersProps) {
  const [filters, setFilters] = useState<BlogFiltersType>({
    searchQuery: '',
    category: '',
    tags: [],
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (newFilters: Partial<BlogFiltersType>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: BlogFiltersType = {
      searchQuery: '',
      category: '',
      tags: [],
      sortBy: 'date',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags?.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...(filters.tags || []), tag];
    updateFilters({ tags: newTags });
  };

  const hasActiveFilters = filters.searchQuery || filters.category || (filters.tags && filters.tags.length > 0);

  return (
    <div className="space-y-6">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filter Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-6 py-3 rounded-lg border transition-colors ${
            showFilters || hasActiveFilters
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'bg-slate-800 border-slate-600 text-gray-300 hover:border-slate-500'
          }`}
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-white text-blue-500 text-xs px-2 py-1 rounded-full font-semibold">
              {(filters.category ? 1 : 0) + (filters.tags?.length || 0)}
            </span>
          )}
        </motion.button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="flex items-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 space-y-6"
        >
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateFilters({ category: '' })}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  !filters.category
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-slate-700 border-slate-600 text-gray-300 hover:border-slate-500'
                }`}
              >
                All
              </button>
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => updateFilters({ category: category.id })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filters.category === category.id
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-gray-300 hover:border-slate-500'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.tags?.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'date', label: 'Date' },
                { key: 'readTime', label: 'Read Time' },
                { key: 'title', label: 'Title' }
              ].map((option) => (
                <div key={option.key} className="flex items-center">
                  <button
                    onClick={() => updateFilters({ sortBy: option.key as any })}
                    className={`px-4 py-2 rounded-l-lg border transition-colors ${
                      filters.sortBy === option.key
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {option.label}
                  </button>
                  <button
                    onClick={() => updateFilters({ 
                      sortBy: option.key as any,
                      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                    })}
                    className={`px-2 py-2 rounded-r-lg border-t border-r border-b transition-colors ${
                      filters.sortBy === option.key
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-gray-300 hover:border-slate-500'
                    }`}
                  >
                    {filters.sortBy === option.key && filters.sortOrder === 'asc' ? (
                      <SortAsc className="w-4 h-4" />
                    ) : (
                      <SortDesc className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}