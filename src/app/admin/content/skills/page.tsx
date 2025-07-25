'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, Code2, Target, Palette, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface SkillCategory {
  id?: string
  title: string
  skills: string[]
  color: string
  icon_name: string
  order_index: number
  created_at?: string
  updated_at?: string
}

interface SkillFocus {
  id?: string
  skill: string
  progress: number
  learning_strategy?: string
  learning_method?: string
  order_index: number
  created_at?: string
  updated_at?: string
}

const emptyCategory: SkillCategory = {
  title: '',
  skills: [],
  color: 'from-blue-500 to-blue-600',
  icon_name: 'Code',
  order_index: 0
}

const emptyFocus: SkillFocus = {
  skill: '',
  progress: 0,
  learning_strategy: '',
  learning_method: '',
  order_index: 0
}

const colorOptions = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-red-500 to-red-600',
  'from-yellow-500 to-yellow-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
  'from-teal-500 to-teal-600',
  'from-gray-500 to-gray-600'
]

const iconOptions = [
  'Code', 'Database', 'Globe', 'Zap', 'Cpu', 'Cloud', 'Server', 'Terminal', 'Layers', 'Shield'
]

export default function SkillsContentAdmin() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [focusAreas, setFocusAreas] = useState<SkillFocus[]>([]);
  const [activeTab, setActiveTab] = useState<'categories' | 'focus'>('categories');
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editingFocus, setEditingFocus] = useState<SkillFocus | null>(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, focusRes] = await Promise.all([
        fetch('/api/skills/categories'),
        fetch('/api/skills/focus')
      ]);
      
      const categoriesResult = await categoriesRes.json();
      const focusResult = await focusRes.json();
      
      if (categoriesResult.success && categoriesResult.data) {
        setCategories(Array.isArray(categoriesResult.data) ? categoriesResult.data : []);
      }
      
      if (focusResult.success && focusResult.data) {
        setFocusAreas(Array.isArray(focusResult.data) ? focusResult.data : []);
      }
    } catch (error) {
      console.error('Error loading skills data:', error);
      setMessage({ type: 'error', text: 'Failed to load skills data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;

    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE CATEGORY OPERATION ===');
      console.log('Saving category:', editingCategory);

      const method = editingCategory.id ? 'PUT' : 'POST';
      const response = await fetch('/api/skills/categories', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCategory),
      });

      const result = await response.json();
      
      if (result.success && result.data) {
        setMessage({ type: 'success', text: `Category ${editingCategory.id ? 'updated' : 'created'} successfully!` });
        
        // Update categories list
        if (editingCategory.id) {
          setCategories(prev => prev.map(c => c.id === editingCategory.id ? result.data : c));
        } else {
          setCategories(prev => [...prev, result.data]);
        }
        
        setIsEditingCategory(false);
        setEditingCategory(null);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save category' });
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage({ type: 'error', text: 'Failed to save category' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFocus = async () => {
    if (!editingFocus) return;

    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE FOCUS OPERATION ===');
      console.log('Saving focus:', editingFocus);

      const method = editingFocus.id ? 'PUT' : 'POST';
      const response = await fetch('/api/skills/focus', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingFocus),
      });

      const result = await response.json();
      
      if (result.success && result.data) {
        setMessage({ type: 'success', text: `Focus area ${editingFocus.id ? 'updated' : 'created'} successfully!` });
        
        // Update focus areas list
        if (editingFocus.id) {
          setFocusAreas(prev => prev.map(f => f.id === editingFocus.id ? result.data : f));
        } else {
          setFocusAreas(prev => [...prev, result.data]);
        }
        
        setIsEditingFocus(false);
        setEditingFocus(null);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save focus area' });
      }
    } catch (error) {
      console.error('Error saving focus area:', error);
      setMessage({ type: 'error', text: 'Failed to save focus area' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill category?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/skills/categories?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Category deleted successfully!' });
        setCategories(prev => prev.filter(c => c.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete category' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage({ type: 'error', text: 'Failed to delete category' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFocus = async (id: string) => {
    if (!confirm('Are you sure you want to delete this focus area?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/skills/focus?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Focus area deleted successfully!' });
        setFocusAreas(prev => prev.filter(f => f.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete focus area' });
      }
    } catch (error) {
      console.error('Error deleting focus area:', error);
      setMessage({ type: 'error', text: 'Failed to delete focus area' });
    } finally {
      setSaving(false);
    }
  };

  const startEditCategory = (category?: SkillCategory) => {
    setEditingCategory(category ? { ...category } : { ...emptyCategory });
    setIsEditingCategory(true);
    setMessage(null);
  };

  const startEditFocus = (focus?: SkillFocus) => {
    setEditingFocus(focus ? { ...focus } : { ...emptyFocus });
    setIsEditingFocus(true);
    setMessage(null);
  };

  const cancelEditCategory = () => {
    setIsEditingCategory(false);
    setEditingCategory(null);
    setMessage(null);
  };

  const cancelEditFocus = () => {
    setIsEditingFocus(false);
    setEditingFocus(null);
    setMessage(null);
  };

  const addSkill = () => {
    if (!editingCategory) return;
    setEditingCategory({ ...editingCategory, skills: [...editingCategory.skills, ''] });
  };

  const updateSkill = (index: number, value: string) => {
    if (!editingCategory) return;
    const newSkills = [...editingCategory.skills];
    newSkills[index] = value;
    setEditingCategory({ ...editingCategory, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    if (!editingCategory) return;
    setEditingCategory({ 
      ...editingCategory, 
      skills: editingCategory.skills.filter((_, i) => i !== index) 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading skills data...</p>
        </div>
      </div>
    );
  }

  // Category Edit Form
  if (isEditingCategory && editingCategory) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={cancelEditCategory}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Skills
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingCategory.id ? 'Edit Category' : 'New Category'}
                </h1>
                <p className="text-gray-400">Manage skill category details</p>
              </div>
            </div>
            <button
              onClick={handleSaveCategory}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Edit Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Category Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category Title
                  </label>
                  <input
                    type="text"
                    value={editingCategory.title}
                    onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Full-Stack Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Gradient
                  </label>
                  <select
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color.replace('from-', '').replace(' to-', ' → ').replace('-500', '').replace('-600', '')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    value={editingCategory.icon_name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, icon_name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Skills in Category</h2>
                </div>
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {editingCategory.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., React"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Palette className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Preview</h2>
              </div>

              <div className={`bg-gradient-to-r ${editingCategory.color} rounded-xl p-6 text-white`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{editingCategory.title || 'Category Title'}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingCategory.skills.filter(skill => skill.trim()).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  {editingCategory.skills.filter(skill => skill.trim()).length === 0 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm opacity-50">
                      Add skills to see preview
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Focus Edit Form
  if (isEditingFocus && editingFocus) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={cancelEditFocus}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Skills
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingFocus.id ? 'Edit Focus Area' : 'New Focus Area'}
                </h1>
                <p className="text-gray-400">Manage current learning focus</p>
              </div>
            </div>
            <button
              onClick={handleSaveFocus}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Focus Area'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Edit Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Target className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Focus Area Details</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skill/Technology
                </label>
                <input
                  type="text"
                  value={editingFocus.skill}
                  onChange={(e) => setEditingFocus({ ...editingFocus, skill: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Trading Analytics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Progress ({editingFocus.progress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingFocus.progress}
                  onChange={(e) => setEditingFocus({ ...editingFocus, progress: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Learning Resources */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Learning Resources
                </label>
                <input
                  type="text"
                  value={editingFocus.learning_strategy || ''}
                  onChange={(e) => setEditingFocus({ ...editingFocus, learning_strategy: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Python Book, Django documentation, portfolio projects"
                />
                <p className="text-xs text-gray-500 mt-1">
                  What resources are you using to learn this skill?
                </p>
              </div>

              {/* Learning Method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Learning Method
                </label>
                <input
                  type="text"
                  value={editingFocus.learning_method || ''}
                  onChange={(e) => setEditingFocus({ ...editingFocus, learning_method: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Hands-on practice, Online tutorials, Documentation study"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How are you learning this skill? (your approach/methodology)
                </p>
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Preview</h3>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{editingFocus.skill || 'Skill Name'}</span>
                    <span className="text-blue-400 font-semibold">{editingFocus.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${editingFocus.progress}%` }}
                    ></div>
                  </div>
                  {editingFocus.learning_strategy && (
                    <div className="mt-3 p-3 bg-slate-600/50 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-blue-400">Strategy:</span> {editingFocus.learning_strategy}
                      </p>
                    </div>
                  )}
                  {editingFocus.learning_method && (
                    <div className="mt-2 p-3 bg-slate-600/50 rounded-lg border-l-4 border-purple-400">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-purple-400">Method:</span> {editingFocus.learning_method}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Skills Management View
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Skills Management</h1>
              <p className="text-gray-400">Manage your skill categories and current focus areas</p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Code2 className="w-4 h-4 inline mr-2" />
            Skill Categories
          </button>
          <button
            onClick={() => setActiveTab('focus')}
            className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'focus'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Current Focus
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'categories' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Skill Categories</h2>
              <button
                onClick={() => startEditCategory()}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Category
              </button>
            </div>

            <div className="grid gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className={`inline-flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4`}>
                        <Code2 className="w-6 h-6" />
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => startEditCategory(category)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id!)}
                        disabled={saving}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
                  <Code2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Categories Yet</h3>
                  <p className="text-gray-400 mb-6">Start by creating your first skill category</p>
                  <button
                    onClick={() => startEditCategory()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create First Category
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Current Focus Areas</h2>
              <button
                onClick={() => startEditFocus()}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Focus Area
              </button>
            </div>

            <div className="grid gap-6">
              {focusAreas.map((focus) => (
                <div key={focus.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-semibold text-white">{focus.skill}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditFocus(focus)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit focus area"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFocus(focus.id!)}
                        disabled={saving}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete focus area"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-blue-400 font-semibold">{focus.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${focus.progress}%` }}
                      ></div>
                    </div>
                    {focus.learning_strategy && (
                      <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-green-400">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-green-400">Learning Strategy:</span> {focus.learning_strategy}
                        </p>
                      </div>
                    )}
                    {focus.learning_method && (
                      <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-purple-400">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-purple-400">Learning Method:</span> {focus.learning_method}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {focusAreas.length === 0 && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
                  <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Focus Areas Yet</h3>
                  <p className="text-gray-400 mb-6">Add skills you're currently focusing on</p>
                  <button
                    onClick={() => startEditFocus()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add First Focus Area
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}