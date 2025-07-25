'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Edit3,
  Save,
  X,
  Plus
} from 'lucide-react'
import { useJourneyData } from '@/hooks/useJourneyData'
import { useAdmin } from '@/contexts/AdminContext'
import type { Milestone } from '@/lib/supabase'

interface EditingMilestone {
  id: string
  title: string
  description: string
  target_date: string
  completed: boolean
  progress: number
  category: string
}

export default function EditableProgressTracker() {
  const { data, loading, error, updateMilestone, createMilestone } = useJourneyData()
  const { isEditMode } = useAdmin()
  const [editingMilestone, setEditingMilestone] = useState<EditingMilestone | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    target_date: '',
    completed: false,
    progress: 0,
    category: 'Project'
  })

  const handleEditMilestone = (milestone: Milestone) => {
    setEditingMilestone({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      target_date: milestone.target_date,
      completed: milestone.completed,
      progress: milestone.progress,
      category: milestone.category
    })
  }

  const handleSaveMilestone = async () => {
    if (!editingMilestone) return
    
    try {
      await updateMilestone(editingMilestone)
      setEditingMilestone(null)
    } catch (error) {
      console.error('Failed to save milestone:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingMilestone(null)
  }

  const toggleMilestoneCompletion = async (milestone: Milestone) => {
    try {
      await updateMilestone({
        id: milestone.id,
        completed: !milestone.completed,
        completion_date: !milestone.completed ? new Date().toISOString().split('T')[0] : undefined,
        progress: !milestone.completed ? 100 : milestone.progress
      })
    } catch (error) {
      console.error('Failed to toggle milestone:', error)
    }
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const handleSaveNew = async () => {
    if (!newMilestone.title || !newMilestone.description || !newMilestone.target_date) return
    
    try {
      const nextOrderIndex = data.milestones.length + 1
      await createMilestone({
        ...newMilestone,
        order_index: nextOrderIndex
      })
      setNewMilestone({
        title: '',
        description: '',
        target_date: '',
        completed: false,
        progress: 0,
        category: 'Project'
      })
      setIsAddingNew(false)
    } catch (error) {
      console.error('Failed to create new milestone:', error)
    }
  }

  const handleCancelNew = () => {
    setNewMilestone({
      title: '',
      description: '',
      target_date: '',
      completed: false,
      progress: 0,
      category: 'Project'
    })
    setIsAddingNew(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'certification':
        return 'from-yellow-500 to-orange-500'
      case 'project':
        return 'from-blue-500 to-cyan-500'
      case 'technical skill':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-purple-500 to-pink-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'certification':
        return <Target className="w-4 h-4" />
      case 'project':
        return <TrendingUp className="w-4 h-4" />
      case 'technical skill':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">Error loading milestones: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add New Button */}
      {isEditMode && !isAddingNew && (
        <div className="flex justify-end">
          <button
            onClick={handleAddNew}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Milestone</span>
          </button>
        </div>
      )}

      {/* Add New Form */}
      {isAddingNew && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-green-500/50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Add New Milestone</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveNew}
                disabled={!newMilestone.title || !newMilestone.description || !newMilestone.target_date}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancelNew}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Complete React Certification"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={newMilestone.category}
                onChange={(e) => setNewMilestone(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Project">Project</option>
                <option value="Education">Education</option>
                <option value="Technical">Technical</option>
                <option value="Career">Career</option>
                <option value="Certification">Certification</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Date *</label>
              <input
                type="date"
                value={newMilestone.target_date}
                onChange={(e) => setNewMilestone(prev => ({ ...prev, target_date: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Progress (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newMilestone.progress}
                onChange={(e) => setNewMilestone(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-300">{newMilestone.progress}%</span>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={newMilestone.description}
                onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this milestone"
                rows={3}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {(data.milestones || []).map((milestone, index) => {
        const isEditing = editingMilestone?.id === milestone.id
        const targetDate = new Date(milestone.target_date)
        const isOverdue = !milestone.completed && targetDate < new Date()
        const daysUntilTarget = Math.ceil((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        
        return (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-slate-700/30 backdrop-blur-sm rounded-xl border ${
              milestone.completed 
                ? 'border-green-500/30' 
                : isOverdue 
                ? 'border-red-500/30' 
                : 'border-slate-600/50'
            } p-6 hover:border-slate-500/50 transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(milestone.category)}`}>
                  {getCategoryIcon(milestone.category)}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingMilestone.title}
                        onChange={(e) => setEditingMilestone(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="font-semibold text-white bg-slate-600/50 rounded px-3 py-1 w-full"
                      />
                      <select
                        value={editingMilestone.category}
                        onChange={(e) => setEditingMilestone(prev => prev ? { ...prev, category: e.target.value } : null)}
                        className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1"
                      >
                        <option value="Certification">Certification</option>
                        <option value="Project">Project</option>
                        <option value="Technical Skill">Technical Skill</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-white">{milestone.title}</h3>
                      <span className="text-xs text-gray-400 bg-slate-600/30 px-2 py-1 rounded">
                        {milestone.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <div className="flex space-x-1">
                    <button
                      onClick={handleSaveMilestone}
                      className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    {isEditMode && (
                      <button
                        onClick={() => handleEditMilestone(milestone)}
                        className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => toggleMilestoneCompletion(milestone)}
                      className={`p-1.5 rounded transition-colors ${
                        milestone.completed 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'text-gray-400 hover:text-green-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {isEditing ? (
              <textarea
                value={editingMilestone.description}
                onChange={(e) => setEditingMilestone(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="text-gray-300 bg-slate-600/50 rounded px-3 py-2 w-full resize-none mb-4"
                rows={3}
              />
            ) : (
              <p className="text-gray-300 text-sm mb-4">{milestone.description}</p>
            )}

            {/* Target Date */}
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-4 h-4 text-gray-400" />
              {isEditing ? (
                <input
                  type="date"
                  value={editingMilestone.target_date}
                  onChange={(e) => setEditingMilestone(prev => prev ? { ...prev, target_date: e.target.value } : null)}
                  className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">
                    Target: {targetDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  {!milestone.completed && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      isOverdue 
                        ? 'bg-red-900/30 text-red-400' 
                        : daysUntilTarget <= 7 
                        ? 'bg-yellow-900/30 text-yellow-400' 
                        : 'bg-blue-900/30 text-blue-400'
                    }`}>
                      {isOverdue 
                        ? `${Math.abs(daysUntilTarget)} days overdue` 
                        : `${daysUntilTarget} days left`
                      }
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Progress</span>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingMilestone.progress}
                      onChange={(e) => setEditingMilestone(prev => prev ? { ...prev, progress: parseInt(e.target.value) } : null)}
                      className="w-20"
                    />
                    <span className="text-xs text-gray-300 w-8">{editingMilestone.progress}%</span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-300">{milestone.progress}%</span>
                )}
              </div>
              <div className="w-full bg-slate-600/50 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    milestone.completed 
                      ? 'bg-green-500' 
                      : `bg-gradient-to-r ${getCategoryColor(milestone.category)}`
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${isEditing ? editingMilestone.progress : milestone.progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Completion Status */}
            {milestone.completed && milestone.completion_date && (
              <div className="mt-3 pt-3 border-t border-slate-600/30">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">
                    Completed on {new Date(milestone.completion_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )
      })}
      </div>
    </div>
  )
}