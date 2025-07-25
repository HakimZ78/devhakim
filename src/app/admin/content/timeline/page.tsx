'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, Clock, Calendar, Flag, CheckCircle, AlertCircle, Circle, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Milestone {
  id?: string
  title: string
  description: string
  target_date: string
  completed?: boolean
  completion_date?: string
  progress?: number
  category: string
  details?: string[]
  status: 'completed' | 'in-progress' | 'upcoming'
  order_index: number
  created_at?: string
  updated_at?: string
}

const emptyMilestone: Milestone = {
  title: '',
  description: '',
  target_date: '',
  completed: false,
  completion_date: '',
  progress: 0,
  category: 'milestone',
  details: [],
  status: 'upcoming',
  order_index: 0
}

const categoryOptions = [
  'education',
  'milestone',
  'learning',
  'project',
  'goal',
  'achievement',
  'certification'
]

const statusOptions = [
  { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-400' },
  { value: 'in-progress', label: 'In Progress', icon: AlertCircle, color: 'text-blue-400' },
  { value: 'upcoming', label: 'Upcoming', icon: Circle, color: 'text-gray-400' }
]

export default function TimelineContentAdmin() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/journey/milestones');
      const result = await response.json();
      
      if (result.success && result.data) {
        setMilestones(Array.isArray(result.data) ? result.data : []);
      } else {
        console.error('Failed to load milestones:', result);
        setMessage({ type: 'error', text: 'Failed to load milestones' });
      }
    } catch (error) {
      console.error('Error loading milestones:', error);
      setMessage({ type: 'error', text: 'Failed to load milestones' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingMilestone) return;

    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE MILESTONE OPERATION ===');
      console.log('Saving milestone:', editingMilestone);

      const method = editingMilestone.id ? 'PUT' : 'POST';
      const response = await fetch('/api/journey/milestones', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingMilestone),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Save result:', result);
      
      if (result.success && result.data) {
        console.log('Save successful. Received data:', result.data);
        setMessage({ type: 'success', text: `Milestone ${editingMilestone.id ? 'updated' : 'created'} successfully!` });
        
        // Update milestones list
        if (editingMilestone.id) {
          setMilestones(prev => prev.map(m => m.id === editingMilestone.id ? result.data : m));
        } else {
          setMilestones(prev => [...prev, result.data]);
        }
        
        setIsEditing(false);
        setEditingMilestone(null);
      } else {
        console.error('Save failed:', result);
        setMessage({ type: 'error', text: result.error || 'Failed to save milestone' });
      }
    } catch (error) {
      console.error('Error saving milestone:', error);
      setMessage({ type: 'error', text: 'Failed to save milestone' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/journey/milestones?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Milestone deleted successfully!' });
        setMilestones(prev => prev.filter(m => m.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete milestone' });
      }
    } catch (error) {
      console.error('Error deleting milestone:', error);
      setMessage({ type: 'error', text: 'Failed to delete milestone' });
    } finally {
      setSaving(false);
    }
  };

  const moveUp = async (milestone: Milestone, currentIndex: number) => {
    if (currentIndex === 0) return; // Already at top

    try {
      setSaving(true);
      const prevMilestone = milestones[currentIndex - 1];
      
      // Swap order_index values
      const updates = [
        {
          id: milestone.id,
          order_index: prevMilestone.order_index
        },
        {
          id: prevMilestone.id,
          order_index: milestone.order_index
        }
      ];

      // Update both milestones
      const updatePromises = updates.map(update =>
        fetch('/api/journey/milestones', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        })
      );

      const responses = await Promise.all(updatePromises);
      const results = await Promise.all(responses.map(r => r.json()));

      if (results.every(r => r.success)) {
        // Reload data to reflect new order
        loadMilestones();
        setMessage({ type: 'success', text: 'Milestone moved up successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to reorder milestone' });
      }
    } catch (error) {
      console.error('Error moving milestone up:', error);
      setMessage({ type: 'error', text: 'Failed to reorder milestone' });
    } finally {
      setSaving(false);
    }
  };

  const moveDown = async (milestone: Milestone, currentIndex: number) => {
    if (currentIndex === milestones.length - 1) return; // Already at bottom

    try {
      setSaving(true);
      const nextMilestone = milestones[currentIndex + 1];
      
      // Swap order_index values
      const updates = [
        {
          id: milestone.id,
          order_index: nextMilestone.order_index
        },
        {
          id: nextMilestone.id,
          order_index: milestone.order_index
        }
      ];

      // Update both milestones
      const updatePromises = updates.map(update =>
        fetch('/api/journey/milestones', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        })
      );

      const responses = await Promise.all(updatePromises);
      const results = await Promise.all(responses.map(r => r.json()));

      if (results.every(r => r.success)) {
        // Reload data to reflect new order
        loadMilestones();
        setMessage({ type: 'success', text: 'Milestone moved down successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to reorder milestone' });
      }
    } catch (error) {
      console.error('Error moving milestone down:', error);
      setMessage({ type: 'error', text: 'Failed to reorder milestone' });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (milestone?: Milestone) => {
    if (milestone) {
      // Ensure all optional string fields are defined to prevent controlled/uncontrolled input issues
      setEditingMilestone({
        ...milestone,
        completion_date: milestone.completion_date || '',
        description: milestone.description || '',
        title: milestone.title || '',
        target_date: milestone.target_date || ''
      });
    } else {
      setEditingMilestone({ ...emptyMilestone });
    }
    setIsEditing(true);
    setMessage(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingMilestone(null);
    setMessage(null);
  };

  const addDetail = () => {
    if (!editingMilestone) return;
    setEditingMilestone({ 
      ...editingMilestone, 
      details: [...(editingMilestone.details || []), ''] 
    });
  };

  const updateDetail = (index: number, value: string) => {
    if (!editingMilestone) return;
    const newDetails = [...(editingMilestone.details || [])];
    newDetails[index] = value;
    setEditingMilestone({ ...editingMilestone, details: newDetails });
  };

  const removeDetail = (index: number) => {
    if (!editingMilestone) return;
    setEditingMilestone({ 
      ...editingMilestone, 
      details: (editingMilestone.details || []).filter((_, i) => i !== index) 
    });
  };

  const getStatusIcon = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.icon : Circle;
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (isEditing && editingMilestone) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={cancelEdit}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Timeline
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingMilestone.id ? 'Edit Milestone' : 'New Milestone'}
                </h1>
                <p className="text-gray-400">Manage timeline milestone details</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Milestone'}
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
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Clock className="w-5 h-5 text-orange-400" />
                <h2 className="text-xl font-semibold text-white">Basic Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Milestone Title
                  </label>
                  <input
                    type="text"
                    value={editingMilestone.title}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Started Healthcare Career"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingMilestone.category}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editingMilestone.status}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, status: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Date
                  </label>
                  <input
                    type="text"
                    value={editingMilestone.target_date}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, target_date: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., July 2010 or 2024-12-01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Completion Date (if completed)
                  </label>
                  <input
                    type="text"
                    value={editingMilestone.completion_date || ''}
                    onChange={(e) => setEditingMilestone({ ...editingMilestone, completion_date: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., July 2010"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingMilestone.description}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Detailed description of this milestone..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="completed"
                    checked={editingMilestone.completed}
                    onChange={(e) => setEditingMilestone({ 
                      ...editingMilestone, 
                      completed: e.target.checked,
                      progress: e.target.checked ? 100 : editingMilestone.progress || 0
                    })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="completed" className="text-sm font-medium text-gray-300">
                    Mark as Completed
                  </label>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Progress ({editingMilestone.progress || 0}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingMilestone.progress || 0}
                    onChange={(e) => setEditingMilestone({ 
                      ...editingMilestone, 
                      progress: parseInt(e.target.value),
                      completed: parseInt(e.target.value) === 100
                    })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Flag className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Milestone Details</h2>
                </div>
                <button
                  onClick={addDetail}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Add Detail
                </button>
              </div>

              <div className="space-y-3">
                {(editingMilestone.details || []).map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => updateDetail(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="Detail about this milestone..."
                    />
                    <button
                      onClick={() => removeDetail(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove detail"
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
                <Calendar className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Preview</h2>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {(() => {
                      const StatusIcon = getStatusIcon(editingMilestone.status);
                      return <StatusIcon className={`w-6 h-6 ${getStatusColor(editingMilestone.status)}`} />;
                    })()}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {editingMilestone.title || 'Milestone Title'}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-400">
                        {editingMilestone.category}
                      </span>
                      <span className="text-sm text-gray-400">
                        {editingMilestone.target_date || 'Target Date'}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">
                      {editingMilestone.description || 'Milestone description will appear here...'}
                    </p>

                    {editingMilestone.progress !== undefined && editingMilestone.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-blue-400">{editingMilestone.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${editingMilestone.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {editingMilestone.details && editingMilestone.details.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        {editingMilestone.details.filter(detail => detail.trim()).map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Timeline Management View
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
              <h1 className="text-2xl font-bold text-white">Timeline Management</h1>
              <p className="text-gray-400">Manage your journey milestones and timeline events</p>
            </div>
          </div>
          <button
            onClick={() => startEdit()}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Milestone
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

        {/* Timeline List */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const StatusIcon = getStatusIcon(milestone.status);
            return (
              <div key={milestone.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center">
                      <StatusIcon className={`w-6 h-6 ${getStatusColor(milestone.status)}`} />
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-16 bg-slate-600 mt-2"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-400">
                          {milestone.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          milestone.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {statusOptions.find(s => s.value === milestone.status)?.label}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 mb-3">{milestone.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Target: {milestone.target_date}
                        </span>
                        {milestone.completion_date && (
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed: {milestone.completion_date}
                          </span>
                        )}
                      </div>

                      {milestone.progress !== undefined && milestone.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-blue-400">{milestone.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {milestone.details && milestone.details.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                          {milestone.details.slice(0, 3).map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                          {milestone.details.length > 3 && (
                            <li className="text-gray-500">+{milestone.details.length - 3} more details</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {/* Reorder buttons */}
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => moveUp(milestone, index)}
                        disabled={saving || index === 0}
                        className="p-1 text-gray-400 hover:text-white hover:bg-slate-600/50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveDown(milestone, index)}
                        disabled={saving || index === milestones.length - 1}
                        className="p-1 text-gray-400 hover:text-white hover:bg-slate-600/50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => startEdit(milestone)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit milestone"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(milestone.id!)}
                      disabled={saving}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {milestones.length === 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Milestones Yet</h3>
              <p className="text-gray-400 mb-6">Start by creating your first timeline milestone</p>
              <button
                onClick={() => startEdit()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create First Milestone
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}