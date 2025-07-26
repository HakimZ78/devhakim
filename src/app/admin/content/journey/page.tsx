'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Save, X, Edit3, Trash2, BookOpen, Award, Clock, TrendingUp, ChevronRight, ChevronLeft } from 'lucide-react';
import { useGlobalAdmin } from '@/contexts/GlobalAdminContext';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  progress: number;
  milestones: string[];
  order_index: number;
}

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  achievement_type: string;
  skills_gained: string[];
  order_index: number;
}

interface Certification {
  id: string;
  title: string;
  provider: string;
  completion_date: string;
  description: string;
  skills: string[];
  certificate_pdf?: string;
  order_index: number;
}

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

interface JourneyData {
  learningPaths: LearningPath[];
  milestones: Milestone[];
  certifications: Certification[];
  progressCategories: ProgressCategory[];
}

export default function JourneyAdminPage() {
  const { isAuthenticated } = useGlobalAdmin();
  const [journeyData, setJourneyData] = useState<JourneyData>({
    learningPaths: [],
    milestones: [],
    certifications: [],
    progressCategories: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'paths' | 'milestones' | 'certifications' | 'progress'>('paths');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [selectedProgressCategory, setSelectedProgressCategory] = useState<string | null>(null);
  const [editingProgressItem, setEditingProgressItem] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadJourneyData();
    }
  }, [isAuthenticated]);

  const loadJourneyData = async () => {
    try {
      setLoading(true);
      
      // Load main journey data
      const response = await fetch('/api/journey');
      const result = await response.json();
      
      // Load progress data
      const progressResponse = await fetch('/api/journey/progress');
      const progressData = await progressResponse.json();
      
      if (result.success) {
        setJourneyData({
          ...result.data,
          progressCategories: progressData || []
        });
      } else {
        console.error('Failed to load journey data:', result.error);
      }
    } catch (error) {
      console.error('Error loading journey data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: any, type: string) => {
    try {
      setSaving(true);
      
      if (type === 'progress') {
        // Handle progress category saves differently
        const response = await fetch('/api/journey/progress', {
          method: item.id && !item.id.startsWith('temp-') ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item.id && !item.id.startsWith('temp-') ? item : { 
            ...item, 
            type: 'category' 
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          await loadJourneyData(); // Reload data
          setEditingItem(null);
        } else {
          console.error('Failed to save progress item:', result.error);
          alert('Failed to save changes. Please try again.');
        }
      } else {
        // Handle other journey items (paths, milestones, certifications)
        const endpoint = `/api/journey/${type === 'paths' ? 'learning-paths' : type}`;
        const method = item.id && !item.id.startsWith('temp-') ? 'PUT' : 'POST';
        
        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });

        const result = await response.json();
        
        if (result.success) {
          await loadJourneyData(); // Reload data
          setEditingItem(null);
        } else {
          console.error('Failed to save item:', result.error);
          alert('Failed to save changes. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      if (type === 'progress') {
        // Handle progress category deletes
        const response = await fetch(`/api/journey/progress?id=${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        
        if (result.success) {
          await loadJourneyData();
          if (editingItem?.id === id) {
            setEditingItem(null);
          }
        } else {
          console.error('Failed to delete progress category:', result.error);
          alert('Failed to delete item. Please try again.');
        }
      } else {
        // Handle other journey items
        const endpoint = `/api/journey/${type === 'paths' ? 'learning-paths' : type}`;
        const response = await fetch(`${endpoint}?id=${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        
        if (result.success) {
          await loadJourneyData();
          if (editingItem?.id === id) {
            setEditingItem(null);
          }
        } else {
          console.error('Failed to delete item:', result.error);
          alert('Failed to delete item. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const addNewItem = (type: string) => {
    const newItem = {
      id: `temp-${Date.now()}`,
      order_index: (getCurrentItems()?.length || 0) + 1,
      ...(type === 'paths' && {
        title: 'New Learning Path',
        description: 'Description of learning path',
        technologies: [],
        progress: 0,
        milestones: []
      }),
      ...(type === 'milestones' && {
        date: new Date().toISOString().split('T')[0],
        title: 'New Milestone',
        description: 'Description of milestone',
        category: 'learning',
        achievement_type: 'skill',
        skills_gained: []
      }),
      ...(type === 'certifications' && {
        title: 'New Certification',
        provider: 'Provider Name',
        completion_date: new Date().toISOString().split('T')[0],
        description: 'Description of certification',
        skills: []
      }),
      ...(type === 'progress' && {
        category: 'New Category',
        items: []
      })
    };
    setEditingItem({ ...newItem, type });
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'paths': return journeyData.learningPaths || [];
      case 'milestones': return journeyData.milestones || [];
      case 'certifications': return journeyData.certifications || [];
      case 'progress': return journeyData.progressCategories || [];
      default: return [];
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You need to be authenticated to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading journey data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full mb-4">
            <MapPin className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-medium">Journey Management</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Manage Your Journey</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Edit your learning paths, milestones, and certifications to showcase your development journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap space-x-1 bg-slate-800/50 p-1 rounded-lg">
            {[
              { id: 'paths', label: 'Learning Paths', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'milestones', label: 'Milestones', icon: <Clock className="w-4 h-4" /> },
              { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
              { id: 'progress', label: 'Progress Tracking', icon: <TrendingUp className="w-4 h-4" /> }
            ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
                <span className="ml-2 px-2 py-0.5 bg-slate-600/50 rounded-full text-xs">
                  {tab.id === 'paths' ? (journeyData.learningPaths?.length || 0) :
                   tab.id === 'milestones' ? (journeyData.milestones?.length || 0) :
                   tab.id === 'certifications' ? (journeyData.certifications?.length || 0) :
                   (journeyData.progressCategories?.length || 0)}
                </span>
                </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          {/* Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {activeTab === 'paths' && 'Learning Paths'}
              {activeTab === 'milestones' && 'Milestones'}
              {activeTab === 'certifications' && 'Certifications'}
              {activeTab === 'progress' && 'Progress Tracking'}
            </h2>
            <button
              onClick={() => addNewItem(activeTab)}
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {(getCurrentItems()?.length || 0) === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No items found.</p>
                <button
                  onClick={() => addNewItem(activeTab)}
                  className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Item
                </button>
              </div>
            ) : (
              (getCurrentItems() || []).map((item: any) => (
                <div key={item.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {activeTab === 'progress' ? item.category : item.title}
                      </h3>
                      {activeTab === 'progress' ? (
                        <>
                          <p className="text-gray-400 text-sm mb-2">
                            {item.items?.length || 0} progress items
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProgressCategory(item.id);
                            }}
                            className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                          >
                            View/Edit Items
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                          {item.completion_date && (
                            <p className="text-gray-500 text-xs">Date: {item.completion_date}</p>
                          )}
                          {item.provider && (
                            <p className="text-gray-500 text-xs">Provider: {item.provider}</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingItem({ ...item, type: activeTab })}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, activeTab)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl border border-slate-600 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {editingItem.id.startsWith('temp-') ? 'Add New' : 'Edit'} {
                      editingItem.type === 'paths' ? 'Learning Path' :
                      editingItem.type === 'milestones' ? 'Milestone' : 
                      editingItem.type === 'certifications' ? 'Certification' :
                      'Progress Category'
                    }
                  </h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {editingItem.type === 'progress' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
                      <input
                        type="text"
                        value={editingItem.category || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                        placeholder="e.g., Technical Skills, Professional Development"
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={editingItem.title || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={editingItem.description || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {editingItem.type === 'certifications' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Provider</label>
                        <input
                          type="text"
                          value={editingItem.provider || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, provider: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Completion Date</label>
                        <input
                          type="date"
                          value={editingItem.completion_date || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, completion_date: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-slate-600">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(editingItem, editingItem.type)}
                    disabled={saving}
                    className="inline-flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Items Modal */}
        {selectedProgressCategory && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl border border-slate-600 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedProgressCategory(null)}
                      className="p-2 text-gray-400 hover:text-white transition-colors mr-3"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-bold text-white">
                      {journeyData.progressCategories.find(cat => cat.id === selectedProgressCategory)?.category} - Progress Items
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProgressCategory(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => {
                      const category = journeyData.progressCategories.find(cat => cat.id === selectedProgressCategory);
                      if (category) {
                        setEditingProgressItem({
                          id: `temp-${Date.now()}`,
                          skill: 'New Skill',
                          current_level: 0,
                          target_level: 100,
                          last_updated: new Date().toISOString().split('T')[0],
                          evidence: [],
                          categoryId: selectedProgressCategory,
                          isNew: true
                        });
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Progress Item
                  </button>
                </div>

                {/* Progress Items List */}
                <div className="space-y-4">
                  {journeyData.progressCategories
                    .find(cat => cat.id === selectedProgressCategory)
                    ?.items.map((item, index) => (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{item.skill}</h4>
                            <div className="text-sm text-gray-400 mb-2">
                              Progress: {item.current_level}% / Target: {item.target_level}%
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                              <div
                                className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                style={{ width: `${(item.current_level / item.target_level) * 100}%` }}
                              />
                            </div>
                            {item.evidence && item.evidence.length > 0 && (
                              <div className="text-xs text-gray-500">
                                Evidence: {item.evidence.join(', ')}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingProgressItem({ ...item, categoryId: selectedProgressCategory, index })}
                              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                // Handle delete progress item
                                const category = journeyData.progressCategories.find(cat => cat.id === selectedProgressCategory);
                                if (category) {
                                  const updatedItems = category.items.filter((_, i) => i !== index);
                                  const updatedCategory = { ...category, items: updatedItems };
                                  handleSave(updatedCategory, 'progress');
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Progress Item Modal */}
        {editingProgressItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl border border-slate-600 w-full max-w-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {editingProgressItem.isNew ? 'Add' : 'Edit'} Progress Item
                  </h3>
                  <button
                    onClick={() => setEditingProgressItem(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                    <input
                      type="text"
                      value={editingProgressItem.skill || ''}
                      onChange={(e) => setEditingProgressItem({ ...editingProgressItem, skill: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Level (%)</label>
                      <input
                        type="number"
                        value={editingProgressItem.current_level || 0}
                        onChange={(e) => setEditingProgressItem({ ...editingProgressItem, current_level: parseInt(e.target.value) || 0 })}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Target Level (%)</label>
                      <input
                        type="number"
                        value={editingProgressItem.target_level || 100}
                        onChange={(e) => setEditingProgressItem({ ...editingProgressItem, target_level: parseInt(e.target.value) || 100 })}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Evidence (comma-separated)</label>
                    <input
                      type="text"
                      value={editingProgressItem.evidence?.join(', ') || ''}
                      onChange={(e) => setEditingProgressItem({ 
                        ...editingProgressItem, 
                        evidence: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                      placeholder="e.g., ForexAcuity Backend, Healthcare API"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-slate-600">
                  <button
                    onClick={() => setEditingProgressItem(null)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const category = journeyData.progressCategories.find(cat => cat.id === editingProgressItem.categoryId);
                      if (category) {
                        let updatedItems;
                        if (editingProgressItem.isNew) {
                          updatedItems = [...category.items, {
                            skill: editingProgressItem.skill,
                            current_level: editingProgressItem.current_level,
                            target_level: editingProgressItem.target_level,
                            last_updated: new Date().toISOString(),
                            evidence: editingProgressItem.evidence || []
                          }];
                        } else {
                          updatedItems = category.items.map((item, i) => 
                            i === editingProgressItem.index ? {
                              ...item,
                              skill: editingProgressItem.skill,
                              current_level: editingProgressItem.current_level,
                              target_level: editingProgressItem.target_level,
                              evidence: editingProgressItem.evidence || [],
                              last_updated: new Date().toISOString()
                            } : item
                          );
                        }
                        const updatedCategory = { ...category, items: updatedItems };
                        handleSave(updatedCategory, 'progress');
                        setEditingProgressItem(null);
                      }
                    }}
                    className="inline-flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Progress Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}