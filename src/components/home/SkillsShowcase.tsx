'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Zap, TrendingUp, Target } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  color: string;
  icon_name: string;
  order_index: number;
}

interface CurrentFocus {
  id: string;
  skill: string;
  progress: number;
  learning_strategy?: string;
  learning_method?: string;
  order_index: number;
}

const iconMap = {
  'Code': <Code className="w-8 h-8" />,
  'Database': <Database className="w-8 h-8" />,
  'Globe': <Globe className="w-8 h-8" />,
  'Zap': <Zap className="w-8 h-8" />
};

export default function SkillsShowcase() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [currentFocus, setCurrentFocus] = useState<CurrentFocus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSkillsData();
  }, []);

  const loadSkillsData = async () => {
    try {
      setLoading(true);
      
      // Load categories
      const categoriesResponse = await fetch('/api/skills/categories');
      const categoriesResult = await categoriesResponse.json();
      
      if (categoriesResult.success) {
        setSkillCategories(categoriesResult.data);
      } else {
        console.error('Failed to load skill categories:', categoriesResult.error);
        setError('Failed to load skill categories');
      }
      
      // Load focus items
      const focusResponse = await fetch('/api/skills/focus');
      const focusResult = await focusResponse.json();
      
      if (focusResult.success) {
        setCurrentFocus(focusResult.data);
      } else {
        console.error('Failed to load focus items:', focusResult.error);
      }
    } catch (error) {
      console.error('Error loading skills data:', error);
      setError('Error loading skills data');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Code className="w-8 h-8" />;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">Error loading skills: {error}</p>
            <button 
              onClick={loadSkillsData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Skills Categories */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              My technical expertise spans across multiple domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 bg-gradient-to-r ${category.color} rounded-lg mr-4`}>
                    {getIcon(category.icon_name)}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-slate-600/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Learning Focus */}
        {currentFocus.length > 0 && (
          <div id="current-focus">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Current Learning Focus
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Skills I'm actively developing and improving
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {currentFocus.map((focus, index) => (
                <motion.div
                  key={focus.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
                      <h3 className="text-xl font-semibold text-white">{focus.skill}</h3>
                    </div>
                    <span className="text-blue-400 font-bold text-lg">{focus.progress}%</span>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${focus.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                      />
                    </div>
                  </div>

                  {focus.learning_strategy && (
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <Target className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-300">Strategy</span>
                      </div>
                      <p className="text-gray-400 text-sm">{focus.learning_strategy}</p>
                    </div>
                  )}

                  {focus.learning_method && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Code className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-300">Method</span>
                      </div>
                      <p className="text-gray-400 text-sm">{focus.learning_method}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}