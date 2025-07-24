'use client';

import { useState, useEffect, JSX } from 'react';
import { Code, Database, Globe, Zap, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';

interface SkillCategory {
  id: number;
  icon: JSX.Element;
  title: string;
  skills: string[];
  color: string;
  isEditing: boolean;
}

interface CurrentFocus {
  id: number;
  skill: string;
  progress: number;
  isEditing: boolean;
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

const initialSkillCategories: SkillCategory[] = [
  {
    id: 1,
    icon: <Code className="w-8 h-8" />,
    title: 'Full-Stack Development',
    skills: ['Python', 'FastAPI', 'Django', 'React', 'TypeScript', 'Next.js'],
    color: 'from-blue-500 to-blue-600',
    isEditing: false
  },
  {
    id: 2,
    icon: <Zap className="w-8 h-8" />,
    title: 'Trading Analytics & Fintech',
    skills: ['Real-time Dashboards', 'WebSocket APIs', 'Data Visualization', 'Trading Signals', 'Payment Systems'],
    color: 'from-green-500 to-green-600',
    isEditing: false
  },
  {
    id: 3,
    icon: <Database className="w-8 h-8" />,
    title: 'Backend & Data',
    skills: ['PostgreSQL', 'Supabase', 'Express.js', 'RESTful APIs', 'Database Design'],
    color: 'from-purple-500 to-purple-600',
    isEditing: false
  },
  {
    id: 4,
    icon: <Globe className="w-8 h-8" />,
    title: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'npm Workspaces', 'Monorepo', 'CI/CD'],
    color: 'from-orange-500 to-orange-600',
    isEditing: false
  }
];

const initialCurrentFocus: CurrentFocus[] = [
  { id: 1, skill: 'Trading Analytics', progress: 85, isEditing: false },
  { id: 2, skill: 'Full-Stack Development', progress: 80, isEditing: false },
  { id: 3, skill: 'Real-time Data Systems', progress: 75, isEditing: false },
  { id: 4, skill: 'Database Design', progress: 70, isEditing: false },
  { id: 5, skill: 'DevOps/Docker', progress: 60, isEditing: false }
];

export default function InteractiveSkillsShowcase() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(initialSkillCategories);
  const [currentFocus, setCurrentFocus] = useState<CurrentFocus[]>(initialCurrentFocus);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editingFocus, setEditingFocus] = useState<CurrentFocus | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem('skillCategories');
      const savedFocus = localStorage.getItem('currentFocus');
      
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        // Restore JSX icons from saved data
        const categoriesWithIcons = parsedCategories.map((cat: any) => ({
          ...cat,
          icon: iconOptions.find(option => option.name === cat.iconName)?.icon || <Code className="w-8 h-8" />
        }));
        setSkillCategories(categoriesWithIcons);
      }
      
      if (savedFocus) {
        setCurrentFocus(JSON.parse(savedFocus));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      // Convert JSX icons to string names for storage
      const categoriesToSave = skillCategories.map(cat => ({
        ...cat,
        iconName: iconOptions.find(option => option.icon.type === cat.icon.type)?.name || 'Code',
        icon: undefined // Remove JSX element before saving
      }));
      localStorage.setItem('skillCategories', JSON.stringify(categoriesToSave));
    } catch (error) {
      console.error('Error saving skill categories to localStorage:', error);
    }
  }, [skillCategories]);

  useEffect(() => {
    try {
      localStorage.setItem('currentFocus', JSON.stringify(currentFocus));
    } catch (error) {
      console.error('Error saving current focus to localStorage:', error);
    }
  }, [currentFocus]);

  // Skill Category Functions
  const handleEditCategory = (category: SkillCategory) => {
    setEditingCategory({ ...category });
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    
    setSkillCategories(skillCategories.map(category =>
      category.id === editingCategory.id ? { ...editingCategory, isEditing: false } : category
    ));
    setEditingCategory(null);
  };

  const handleCancelCategory = () => {
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (window.confirm('Are you sure you want to delete this skill category?')) {
      setSkillCategories(skillCategories.filter(category => category.id !== categoryId));
    }
  };

  const addNewCategory = () => {
    const newCategory: SkillCategory = {
      id: Math.max(...skillCategories.map(c => c.id)) + 1,
      icon: <Code className="w-8 h-8" />,
      title: 'New Skill Category',
      skills: ['Skill 1', 'Skill 2', 'Skill 3'],
      color: colorOptions[skillCategories.length % colorOptions.length],
      isEditing: false
    };
    setSkillCategories([...skillCategories, newCategory]);
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

  const handleSaveFocus = () => {
    if (!editingFocus) return;
    
    setCurrentFocus(currentFocus.map(focus =>
      focus.id === editingFocus.id ? { ...editingFocus, isEditing: false } : focus
    ));
    setEditingFocus(null);
  };

  const handleCancelFocus = () => {
    setEditingFocus(null);
  };

  const handleDeleteFocus = (focusId: number) => {
    setCurrentFocus(currentFocus.filter(focus => focus.id !== focusId));
  };

  const addNewFocus = () => {
    const newFocus: CurrentFocus = {
      id: Math.max(...currentFocus.map(f => f.id)) + 1,
      skill: 'New Skill',
      progress: 50,
      isEditing: false
    };
    setCurrentFocus([...currentFocus, newFocus]);
    setEditingFocus(newFocus);
  };

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

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                  <span className="text-white">{category.icon}</span>
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
          <div 
            onClick={addNewCategory}
            className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer flex items-center justify-center group"
          >
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-500 group-hover:text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 group-hover:text-gray-300 font-medium">Add Skill Category</p>
            </div>
          </div>
        </div>

        {/* Current Learning Progress */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Current Learning Focus</h3>
            <button
              onClick={addNewFocus}
              className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Focus
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {currentFocus.map((item) => {
              const isCurrentlyEditing = editingFocus?.id === item.id;
              
              return (
                <div key={item.id} className="space-y-2 relative group">
                  {/* Edit Controls */}
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