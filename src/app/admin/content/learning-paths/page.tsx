'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PathStep {
  id?: string;
  path_id: string;
  title: string;
  description: string;
  skills: string[];
  completed: boolean;
  in_progress: boolean;
  estimated_time: string;
  projects?: string[];
  order_index: number;
}

interface LearningPath {
  id?: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  order_index: number;
  path_steps?: PathStep[];
  created_at?: string;
  updated_at?: string;
}

const emptyPath: LearningPath = {
  title: '',
  description: '',
  icon: 'BookOpen',
  color: 'from-blue-500 to-blue-600',
  progress: 0,
  order_index: 0
};

const iconOptions = [
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Brain', label: '🧠' },
  { name: 'Rocket', label: '🚀' },
  { name: 'Target', label: '🎯' },
  { name: 'Code', label: '💻' },
];

const colorOptions = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
];

export default function LearningPathsAdmin() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [managingSteps, setManagingSteps] = useState<string | null>(null);
  const [editingStep, setEditingStep] = useState<PathStep | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadPaths();
  }, []);

  const loadPaths = async () => {
    try {
      const response = await fetch('/api/journey/learning-paths');
      const data = await response.json();
      setPaths(data);
    } catch (error) {
      console.error('Error loading learning paths:', error);
      setMessage({ type: 'error', text: 'Failed to load learning paths' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPath) return;

    // Validate required fields
    if (!editingPath.title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }
    
    if (!editingPath.description.trim()) {
      setMessage({ type: 'error', text: 'Description is required' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const method = editingPath.id ? 'PUT' : 'POST';
      const response = await fetch('/api/journey/learning-paths', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPath)
      });

      if (!response.ok) throw new Error('Failed to save');
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: `Learning path ${editingPath.id ? 'updated' : 'created'} successfully!` });
        await loadPaths();
        setIsEditing(false);
        setEditingPath(null);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving learning path:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save learning path' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this learning path?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/journey/learning-paths?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Learning path deleted successfully:', id);
        setMessage({ type: 'success', text: 'Learning path deleted successfully!' });
        setPaths(prev => prev.filter(p => p.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete learning path' });
      }
    } catch (error) {
      console.error('Error deleting learning path:', error);
      setMessage({ type: 'error', text: 'Failed to delete learning path' });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (path?: LearningPath) => {
    setEditingPath(path ? { ...path } : { ...emptyPath });
    setIsEditing(true);
    setMessage(null);
  };

  const startManageSteps = (pathId: string) => {
    setManagingSteps(pathId);
    setMessage(null);
  };

  const addStep = (pathId: string) => {
    const newStep: PathStep = {
      id: `step-${Date.now()}`,
      path_id: pathId,
      title: '',
      description: '',
      skills: [],
      completed: false,
      in_progress: false,
      estimated_time: '',
      projects: [],
      order_index: 0
    };
    setEditingStep(newStep);
  };

  const editStep = (step: PathStep) => {
    setEditingStep({ ...step });
  };

  const saveStep = async () => {
    if (!editingStep || !managingSteps) return;

    try {
      setSaving(true);
      
      const path = paths.find(p => p.id === managingSteps);
      if (!path) return;

      const currentSteps = path.steps || [];
      let updatedSteps;

      // Check if this is a new step or existing one
      const existingIndex = currentSteps.findIndex(s => s.id === editingStep.id);
      
      if (existingIndex >= 0) {
        // Update existing step
        updatedSteps = [...currentSteps];
        updatedSteps[existingIndex] = editingStep;
      } else {
        // Add new step
        editingStep.order_index = currentSteps.length;
        updatedSteps = [...currentSteps, editingStep];
      }

      // Update the learning path with new steps
      const response = await fetch('/api/journey/learning-paths', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: managingSteps,
          steps: updatedSteps
        })
      });

      if (!response.ok) throw new Error('Failed to save step');
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Step saved successfully!' });
        await loadPaths();
        setEditingStep(null);
      } else {
        throw new Error(result.error || 'Failed to save step');
      }
    } catch (error) {
      console.error('Error saving step:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save step' });
    } finally {
      setSaving(false);
    }
  };

  const deleteStep = async (stepId: string) => {
    if (!managingSteps || !confirm('Are you sure you want to delete this step?')) return;

    try {
      setSaving(true);
      
      const path = paths.find(p => p.id === managingSteps);
      if (!path) return;

      const updatedSteps = (path.steps || []).filter(s => s.id !== stepId);

      // Update the learning path with remaining steps
      const response = await fetch('/api/journey/learning-paths', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: managingSteps,
          steps: updatedSteps
        })
      });

      if (!response.ok) throw new Error('Failed to delete step');
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Step deleted successfully!' });
        await loadPaths();
      } else {
        throw new Error(result.error || 'Failed to delete step');
      }
    } catch (error) {
      console.error('Error deleting step:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to delete step' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Step Editing Modal
  if (editingStep) {
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setEditingStep(null)}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Steps
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingStep.title ? 'Edit Step' : 'New Step'}
                </h1>
                <p className="text-gray-400">Configure learning path step</p>
              </div>
            </div>
            <button
              onClick={saveStep}
              disabled={saving || !editingStep.title.trim() || !editingStep.description.trim() || !editingStep.estimated_time.trim()}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Step'}
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Step Title *
                </label>
                <input
                  type="text"
                  value={editingStep.title}
                  onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Learn Python Basics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estimated Time *
                </label>
                <input
                  type="text"
                  value={editingStep.estimated_time}
                  onChange={(e) => setEditingStep({ ...editingStep, estimated_time: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., 2 weeks"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={editingStep.description}
                onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Describe what this step involves..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={!editingStep.completed && !editingStep.in_progress}
                      onChange={() => setEditingStep({ ...editingStep, completed: false, in_progress: false })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Not Started</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={editingStep.in_progress}
                      onChange={() => setEditingStep({ ...editingStep, completed: false, in_progress: true })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">In Progress</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={editingStep.completed}
                      onChange={() => setEditingStep({ ...editingStep, completed: true, in_progress: false })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Completed</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills (one per line)
                </label>
                <textarea
                  value={editingStep.skills.join('\n')}
                  onChange={(e) => setEditingStep({ 
                    ...editingStep, 
                    skills: e.target.value.split('\n').filter(s => s.trim()) 
                  })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Python&#10;Variables&#10;Functions"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Steps Management View
  if (managingSteps) {
    const path = paths.find(p => p.id === managingSteps);
    
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <button
                  onClick={() => setManagingSteps(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-bold text-white">{path?.title} - Steps</h1>
              </div>
              <p className="text-gray-400">Manage learning path steps</p>
            </div>
            <button
              onClick={() => addStep(managingSteps)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            {path?.steps?.map((step, index) => (
              <div key={step.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        step.completed ? 'bg-green-500/20 text-green-400' :
                        step.in_progress ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {step.completed ? 'Completed' : step.in_progress ? 'In Progress' : 'Not Started'}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{step.description}</p>
                    <p className="text-gray-400 text-sm mb-3">Estimated time: {step.estimated_time}</p>
                    
                    {step.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => editStep(step)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit step"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteStep(step.id!)}
                      disabled={saving}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {(!path?.steps || path.steps.length === 0) && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No steps added yet</p>
                <button
                  onClick={() => addStep(managingSteps)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Step
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isEditing && editingPath) {
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingPath(null);
                }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Learning Paths
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingPath.id ? 'Edit Learning Path' : 'New Learning Path'}
                </h1>
                <p className="text-gray-400">Create or edit learning path details</p>
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
              {saving ? 'Saving...' : 'Save Path'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={editingPath.title}
                onChange={(e) => setEditingPath({ ...editingPath, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., AI/Healthcare Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={editingPath.description}
                onChange={(e) => setEditingPath({ ...editingPath, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Combining healthcare domain knowledge with AI/ML technologies"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setEditingPath({ ...editingPath, icon: option.name })}
                      className={`p-3 rounded-lg border ${
                        editingPath.icon === option.name
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-slate-600 hover:border-slate-500'
                      } transition-colors`}
                    >
                      {option.icon ? (
                        <option.icon className="w-5 h-5 mx-auto text-white" />
                      ) : (
                        <span className="text-2xl">{option.label}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color Gradient
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setEditingPath({ ...editingPath, color })}
                      className={`h-12 rounded-lg bg-gradient-to-r ${color} ${
                        editingPath.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Progress (%)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingPath.progress}
                  onChange={(e) => setEditingPath({ ...editingPath, progress: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-white font-medium w-12 text-right">{editingPath.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Learning Paths</h1>
            </div>
            <p className="text-gray-400">Manage your learning journey paths</p>
          </div>
          <button
            onClick={() => startEdit()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Learning Path
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => (
            <div key={path.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${path.color} flex items-center justify-center`}>
                  {path.icon === 'BookOpen' ? (
                    <BookOpen className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-2xl">
                      {path.icon === 'Brain' ? '🧠' : 
                       path.icon === 'Rocket' ? '🚀' : 
                       path.icon === 'Target' ? '🎯' : 
                       path.icon === 'Code' ? '💻' : '📚'}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEdit(path)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                    title="Edit path"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(path.id!)}
                    disabled={saving}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete path"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{path.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{path.description}</p>
              <p className="text-gray-500 text-xs mb-4">
                {path.path_steps?.length || 0} steps configured
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{path.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${path.color} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700">
                <button
                  onClick={() => startManageSteps(path.id!)}
                  className="w-full flex items-center justify-center px-3 py-2 text-sm bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage Steps ({path.steps?.length || 0})
                </button>
              </div>
            </div>
          ))}

          {paths.length === 0 && (
            <div className="col-span-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No learning paths yet</p>
              <button
                onClick={() => startEdit()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Path
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}