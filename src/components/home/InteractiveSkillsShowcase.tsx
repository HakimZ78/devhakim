'use client';

import { useState, useEffect, JSX } from 'react';
import { Code, Database, Globe, Zap, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import AdminOnly from '@/components/admin/AdminOnly';

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  color: string;
  icon_name: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

interface CurrentFocus {
  id: string;
  skill: string;
  progress: number;
  learning_strategy?: string;
  learning_method?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

const iconOptions = [
  { name: 'Code', icon: <Code className="w-8 h-8" /> },
  { name: 'Database', icon: <Database className="w-8 h-8" /> },
  { name: 'Globe', icon: <Globe className="w-8 h-8" /> },
  { name: 'Zap', icon: <Zap className="w-8 h-8" /> }
];

const colorOptions = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-red-500 to-red-600',
  'from-yellow-500 to-yellow-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600'
];



export default function InteractiveSkillsShowcase() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [currentFocus, setCurrentFocus] = useState<CurrentFocus[]>([]);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editingFocus, setEditingFocus] = useState<CurrentFocus | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data from database on component mount
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
    } finally {
      setLoading(false);
    }
  };


  // Skill Category Functions
  const handleEditCategory = (category: SkillCategory) => {
    setEditingCategory({ ...category });
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;
    
    try {
      const method = skillCategories.find(cat => cat.id === editingCategory.id) ? 'PUT' : 'POST';
      const url = method === 'PUT' ? `/api/skills/categories/${editingCategory.id}` : '/api/skills/categories';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCategory),
      });

      const result = await response.json();
      
      if (result.success) {
        if (method === 'POST') {
          setSkillCategories([...skillCategories, result.data]);
        } else {
          setSkillCategories(skillCategories.map(category =>
            category.id === editingCategory.id ? result.data : category
          ));
        }
        setEditingCategory(null);
      } else {
        console.error('Failed to save category:', result.error);
        alert('Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleCancelCategory = () => {
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm('Are you sure you want to delete this skill category?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/skills/categories/${categoryId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setSkillCategories(skillCategories.filter(category => category.id !== categoryId));
        if (editingCategory?.id === categoryId) {
          setEditingCategory(null);
        }
      } else {
        console.error('Failed to delete category:', result.error);
        alert('Failed to delete category. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  const addNewCategory = () => {
    const newCategory: SkillCategory = {
      id: 'temp-' + Date.now(),
      title: 'New Skill Category',
      skills: ['Skill 1', 'Skill 2', 'Skill 3'],
      color: colorOptions[skillCategories.length % colorOptions.length],
      icon_name: 'Code',
      order_index: skillCategories.length + 1
    };
    setEditingCategory(newCategory);
  };

  const updateCategorySkills = (skills: string) => {
    if (!editingCategory) return;
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    setEditingCategory({ ...editingCategory, skills: skillsArray });
  };

  // Current Focus Functions
  const handleEditFocus = (focus: CurrentFocus) => {
    setEditingFocus({ ...focus });
  };

  const handleSaveFocus = async () => {
    if (!editingFocus) return;
    
    try {
      const method = currentFocus.find(focus => focus.id === editingFocus.id) ? 'PUT' : 'POST';
      const url = method === 'PUT' ? `/api/skills/focus/${editingFocus.id}` : '/api/skills/focus';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingFocus),
      });

      const result = await response.json();
      
      if (result.success) {
        if (method === 'POST') {
          setCurrentFocus([...currentFocus, result.data]);
        } else {
          setCurrentFocus(currentFocus.map(focus =>
            focus.id === editingFocus.id ? result.data : focus
          ));
        }
        setEditingFocus(null);
      } else {
        console.error('Failed to save focus:', result.error);
        alert('Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving focus:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleCancelFocus = () => {
    setEditingFocus(null);
  };

  const handleDeleteFocus = async (focusId: string) => {
    try {
      const response = await fetch(`/api/skills/focus/${focusId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setCurrentFocus(currentFocus.filter(focus => focus.id !== focusId));
        if (editingFocus?.id === focusId) {
          setEditingFocus(null);
        }
      } else {
        console.error('Failed to delete focus:', result.error);
        alert('Failed to delete focus. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting focus:', error);
      alert('Failed to delete focus. Please try again.');
    }
  };

  const addNewFocus = () => {
    const newFocus: CurrentFocus = {
      id: 'temp-' + Date.now(),
      skill: 'New Skill',
      progress: 50,
      order_index: currentFocus.length + 1
    };
    setEditingFocus(newFocus);
  };

  if (loading) {
    return (
      <section className="py-12 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading skills data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-400 mb-4">
            Building proficiency across:
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {skillCategories.map((category) => {
            const isCurrentlyEditing = editingCategory?.id === category.id;
            
            return (
              <div 
                key={category.id}
                className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-105 relative group"
              >
                {/* Edit Controls */}
                <AdminOnly>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {!isCurrentlyEditing ? (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-1">
                        <button
                          onClick={handleSaveCategory}
                          className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelCategory}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </AdminOnly>

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                  <span className="text-white">
                    {iconOptions.find(option => option.name === category.icon_name)?.icon || <Code className="w-8 h-8" />}
                  </span>
                </div>

                {/* Title */}
                {isCurrentlyEditing ? (
                  <input
                    type="text"
                    value={editingCategory?.title || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory!, title: e.target.value })}
                    className="text-xl font-semibold text-white mb-3 bg-slate-600 px-3 py-1 rounded w-full"
                  />
                ) : (
                  <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
                )}

                {/* Skills */}
                {isCurrentlyEditing ? (
                  <textarea
                    value={editingCategory?.skills.join(', ') || ''}
                    onChange={(e) => updateCategorySkills(e.target.value)}
                    placeholder="Enter skills separated by commas"
                    className="w-full h-20 bg-slate-600 text-gray-300 rounded p-2 text-sm"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-slate-600/50 text-gray-300 rounded-full text-sm border border-slate-500/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Add New Category Button */}
          <AdminOnly>
            <div 
              onClick={addNewCategory}
              className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer flex items-center justify-center group"
            >
              <div className="text-center">
                <Plus className="w-12 h-12 text-gray-500 group-hover:text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 group-hover:text-gray-300 font-medium">Add Skill Category</p>
              </div>
            </div>
          </AdminOnly>
        </div>

        {/* Current Learning Progress */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50">
          <h3 className="text-2xl font-bold text-white mb-6">Current Learning Focus</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {currentFocus.map((item) => {
              const isCurrentlyEditing = editingFocus?.id === item.id;
              
              return (
                <div key={item.id} className="space-y-2 relative group">
                  {/* Edit Controls */}
                  <AdminOnly>
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {!isCurrentlyEditing ? (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditFocus(item)}
                            className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteFocus(item.id)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-1">
                          <button
                            onClick={handleSaveFocus}
                            className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                          <button
                            onClick={handleCancelFocus}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </AdminOnly>

                  {/* Skill Name and Progress */}
                  <div className="flex justify-between text-sm">
                    {isCurrentlyEditing ? (
                      <input
                        type="text"
                        value={editingFocus?.skill || ''}
                        onChange={(e) => setEditingFocus({ ...editingFocus!, skill: e.target.value })}
                        className="text-gray-300 font-medium bg-slate-600 px-2 py-1 rounded flex-1 mr-2"
                      />
                    ) : (
                      <span className="text-gray-300 font-medium">{item.skill}</span>
                    )}
                    
                    {isCurrentlyEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingFocus?.progress || 0}
                        onChange={(e) => setEditingFocus({ ...editingFocus!, progress: parseInt(e.target.value) || 0 })}
                        className="text-gray-400 bg-slate-600 px-2 py-1 rounded w-16"
                      />
                    ) : (
                      <span className="text-gray-400">{item.progress}%</span>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${isCurrentlyEditing ? (editingFocus?.progress || 0) : item.progress}%` }}
                    ></div>
                  </div>

                  {/* Learning Strategy & Method - Only show if not editing and data exists */}
                  {!isCurrentlyEditing && (item.learning_strategy || item.learning_method) && (
                    <div className="space-y-2 mt-3">
                      {item.learning_strategy && (
                        <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-green-400">
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-green-400">Resources:</span> {item.learning_strategy}
                          </p>
                        </div>
                      )}
                      {item.learning_method && (
                        <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-purple-400">
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-purple-400">Method:</span> {item.learning_method}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Edit Fields for Learning Strategy & Method */}
                  {isCurrentlyEditing && (
                    <div className="space-y-3 mt-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Learning Resources</label>
                        <input
                          type="text"
                          value={editingFocus?.learning_strategy || ''}
                          onChange={(e) => setEditingFocus({ ...editingFocus!, learning_strategy: e.target.value })}
                          className="w-full text-sm bg-slate-600 px-3 py-2 rounded text-white placeholder-gray-400"
                          placeholder="e.g., Python Book, documentation, projects"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Learning Method</label>
                        <input
                          type="text"
                          value={editingFocus?.learning_method || ''}
                          onChange={(e) => setEditingFocus({ ...editingFocus!, learning_method: e.target.value })}
                          className="w-full text-sm bg-slate-600 px-3 py-2 rounded text-white placeholder-gray-400"
                          placeholder="e.g., Hands-on practice, tutorials"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Career Transition Highlight */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 font-semibold mr-2">🏥</span>
            <span className="text-gray-300">Healthcare Professional</span>
            <span className="text-gray-500 mx-3">→</span>
            <span className="text-green-400 font-semibold mr-2">💻</span>
            <span className="text-gray-300">Software Engineer</span>
          </div>
          <p className="text-gray-400 mt-3 text-sm">
            Leveraging domain expertise in healthcare while mastering modern software development
          </p>
        </div>
      </div>
    </section>
  );
}