'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, TrendingUp, ChevronRight, Target } from 'lucide-react';
import Link from 'next/link';

interface ProgressItem {
  id?: string;
  skill: string;
  current_level: number;
  target_level: number;
  last_updated?: string;
  category_id: string;
}

interface ProgressCategory {
  id?: string;
  category: string;
  order_index: number;
  items?: ProgressItem[];
  created_at?: string;
  updated_at?: string;
}

const emptyCategory: ProgressCategory = {
  category: '',
  order_index: 0,
  items: []
};

const emptyItem: ProgressItem = {
  skill: '',
  current_level: 0,
  target_level: 100,
  category_id: ''
};

export default function ProgressTrackingAdmin() {
  const [categories, setCategories] = useState<ProgressCategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<ProgressCategory | null>(null);
  const [editingItem, setEditingItem] = useState<ProgressItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/journey/progress');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading progress categories:', error);
      setMessage({ type: 'error', text: 'Failed to load progress tracking' });
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryItems = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/journey/progress?category_id=${categoryId}`);
      const data = await response.json();
      
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId ? { ...cat, items: data.items || [] } : cat
      ));
    } catch (error) {
      console.error('Error loading category items:', error);
    }
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;

    if (!editingCategory.category.trim()) {
      setMessage({ type: 'error', text: 'Category name is required' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const method = editingCategory.id ? 'PUT' : 'POST';
      const response = await fetch('/api/journey/progress', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory)
      });

      if (!response.ok) throw new Error('Failed to save');
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: `Category ${editingCategory.id ? 'updated' : 'created'} successfully!` });
        await loadCategories();
        setIsEditingCategory(false);
        setEditingCategory(null);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save category' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveItem = async () => {
    if (!editingItem || !selectedCategory) return;

    if (!editingItem.skill.trim()) {
      setMessage({ type: 'error', text: 'Skill name is required' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const itemData = {
        ...editingItem,
        category_id: selectedCategory
      };

      const method = editingItem.id ? 'PUT' : 'POST';
      const response = await fetch('/api/journey/progress/items', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });

      if (!response.ok) throw new Error('Failed to save');
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: `Skill ${editingItem.id ? 'updated' : 'added'} successfully!` });
        await loadCategoryItems(selectedCategory);
        setIsEditingItem(false);
        setEditingItem(null);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save skill' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category and all its items?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/journey/progress?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Progress category deleted successfully:', id);
        setMessage({ type: 'success', text: 'Category deleted successfully!' });
        setCategories(prev => prev.filter(c => c.id !== id));
        if (selectedCategory === id) {
          setSelectedCategory(null);
        }
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

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/journey/progress/items?id=${itemId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Progress item deleted successfully:', itemId);
        setMessage({ type: 'success', text: 'Skill deleted successfully!' });
        if (selectedCategory) {
          await loadCategoryItems(selectedCategory);
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete skill' });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setMessage({ type: 'error', text: 'Failed to delete skill' });
    } finally {
      setSaving(false);
    }
  };

  const startEditCategory = (category?: ProgressCategory) => {
    setEditingCategory(category ? { ...category } : { ...emptyCategory });
    setIsEditingCategory(true);
    setMessage(null);
  };

  const startEditItem = (item?: ProgressItem) => {
    if (!selectedCategory) return;
    setEditingItem(item ? { ...item } : { ...emptyItem, category_id: selectedCategory });
    setIsEditingItem(true);
    setMessage(null);
  };

  const viewCategoryItems = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    await loadCategoryItems(categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Edit Category Modal
  if (isEditingCategory && editingCategory) {
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsEditingCategory(false);
                  setEditingCategory(null);
                }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingCategory.id ? 'Edit Category' : 'New Category'}
                </h1>
                <p className="text-gray-400">Create or edit progress category</p>
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

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={editingCategory.category}
                onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Frontend Development"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Item Modal
  if (isEditingItem && editingItem) {
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsEditingItem(false);
                  setEditingItem(null);
                }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingItem.id ? 'Edit Skill' : 'New Skill'}
                </h1>
                <p className="text-gray-400">Add or edit skill progress</p>
              </div>
            </div>
            <button
              onClick={handleSaveItem}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                value={editingItem.skill}
                onChange={(e) => setEditingItem({ ...editingItem, skill: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., React.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Level: {editingItem.current_level}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={editingItem.current_level}
                onChange={(e) => setEditingItem({ ...editingItem, current_level: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Level: {editingItem.target_level}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={editingItem.target_level}
                onChange={(e) => setEditingItem({ ...editingItem, target_level: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category Items View
  if (selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-bold text-white">{category?.category} Skills</h1>
              </div>
              <p className="text-gray-400">Manage skills in this category</p>
            </div>
            <button
              onClick={() => startEditItem()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category?.items?.map((item) => (
              <div key={item.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{item.skill}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEditItem(item)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit skill"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id!)}
                      disabled={saving}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Current</span>
                      <span className="text-white font-medium">{item.current_level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${item.current_level}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Target</span>
                      <span className="text-white font-medium">{item.target_level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${item.target_level}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {(!category?.items || category.items.length === 0) && (
              <div className="col-span-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
                <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No skills in this category yet</p>
                <button
                  onClick={() => startEditItem()}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Skill
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Categories View
  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Progress Tracking</h1>
            </div>
            <p className="text-gray-400">Track your skill development progress</p>
          </div>
          <button
            onClick={() => startEditCategory()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Category
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer"
              onClick={() => viewCategoryItems(category.id!)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{category.category}</h3>
                  <p className="text-gray-400 text-sm">
                    {category.items?.length || 0} skills tracked
                  </p>
                </div>
                <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
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

              <div className="flex items-center text-blue-400">
                <span className="text-sm">View Skills</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No progress categories yet</p>
              <button
                onClick={() => startEditCategory()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Category
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}