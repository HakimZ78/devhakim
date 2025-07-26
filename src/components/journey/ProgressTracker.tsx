'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  BarChart3,
  Star,
  Award
} from 'lucide-react';

interface ProgressItem {
  skill: string;
  current_level: number;
  target_level: number;
  last_updated: string;
  evidence: string[];
}

interface ProgressCategory {
  id: string;
  category: string;
  items: ProgressItem[];
}

export default function ProgressTracker() {
  const [data, setData] = useState<ProgressCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/journey/progress');
      if (!response.ok) throw new Error('Failed to fetch progress data');
      const progressData = await response.json();
      setData(progressData);
      if (progressData.length > 0) {
        setSelectedCategory(progressData[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 90) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (progress >= 70) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (progress >= 50) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getProgressIcon = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 90) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (progress >= 70) return <Star className="w-5 h-5 text-blue-400" />;
    if (progress >= 50) return <TrendingUp className="w-5 h-5 text-yellow-400" />;
    return <Clock className="w-5 h-5 text-red-400" />;
  };

  const getProgressText = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 90) return 'Mastered';
    if (progress >= 70) return 'Advanced';
    if (progress >= 50) return 'Intermediate';
    return 'Learning';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading progress data: {error}</p>
        <button 
          onClick={fetchProgressData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const selectedCategoryData = data.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Selector */}
      {data.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {data.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      )}

      {/* Progress Items */}
      {selectedCategoryData && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-2" />
            {selectedCategoryData.category} Progress
          </h3>
          
          {selectedCategoryData.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getProgressIcon(item.current_level, item.target_level)}
                    <h4 className="font-semibold text-white text-lg">{item.skill}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProgressColor(item.current_level, item.target_level)}`}>
                      {getProgressText(item.current_level, item.target_level)}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">
                        Current: {item.current_level}% / Target: {item.target_level}%
                      </span>
                      <span className="text-sm font-medium text-white">
                        {Math.round((item.current_level / item.target_level) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.current_level / item.target_level) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-3 rounded-full ${
                          (item.current_level / item.target_level) * 100 >= 90
                            ? 'bg-gradient-to-r from-green-500 to-green-400'
                            : (item.current_level / item.target_level) * 100 >= 70
                            ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                            : (item.current_level / item.target_level) * 100 >= 50
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                            : 'bg-gradient-to-r from-red-500 to-red-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    Last updated: {new Date(item.last_updated).toLocaleDateString()}
                  </div>

                  {/* Evidence */}
                  {item.evidence && item.evidence.length > 0 && item.evidence[0] !== '' && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        Evidence & Achievements
                      </h5>
                      <ul className="space-y-1">
                        {item.evidence.filter(e => e.trim() !== '').map((evidence, evidenceIndex) => (
                          <li key={evidenceIndex} className="text-sm text-gray-400 flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {evidence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No progress data added yet.</p>
        </div>
      )}
    </div>
  );
}