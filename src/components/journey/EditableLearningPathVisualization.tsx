'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Code, 
  DollarSign, 
  ChevronRight, 
  Clock, 
  Target,
  CheckCircle,
  Circle,
  Play,
  Edit3,
  Save,
  X,
  Plus
} from 'lucide-react'
import { useJourneyData } from '@/hooks/useJourneyData'
import { useAdmin } from '@/contexts/AdminContext'
import type { LearningPath } from '@/lib/supabase'

const iconMap = {
  Brain: Brain,
  Code: Code,
  DollarSign: DollarSign,
  Target: Target
}

interface EditingPath {
  id: string
  title: string
  description: string
  progress: number
}

export default function EditableLearningPathVisualization() {
  const { data, loading, error, updateLearningPath, createLearningPath } = useJourneyData()
  const { isEditMode } = useAdmin()
  const [editingPath, setEditingPath] = useState<EditingPath | null>(null)
  const [expandedPath, setExpandedPath] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newPath, setNewPath] = useState({
    title: '',
    description: '',
    icon: 'Target',
    color: 'from-blue-500 to-cyan-500',
    progress: 0
  })

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Target
    return <IconComponent className="w-6 h-6" />
  }

  const handleEditPath = (path: LearningPath) => {
    setEditingPath({
      id: path.id,
      title: path.title,
      description: path.description,
      progress: path.progress
    })
  }

  const handleSavePath = async () => {
    if (!editingPath) return
    
    try {
      await updateLearningPath(editingPath)
      setEditingPath(null)
    } catch (error) {
      console.error('Failed to save path:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingPath(null)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const handleSaveNew = async () => {
    if (!newPath.title || !newPath.description) return
    
    try {
      const nextOrderIndex = data.learningPaths.length + 1
      await createLearningPath({
        ...newPath,
        order_index: nextOrderIndex
      })
      setNewPath({
        title: '',
        description: '',
        icon: 'Target',
        color: 'from-blue-500 to-cyan-500',
        progress: 0
      })
      setIsAddingNew(false)
    } catch (error) {
      console.error('Failed to create new path:', error)
    }
  }

  const handleCancelNew = () => {
    setNewPath({
      title: '',
      description: '',
      icon: 'Target',
      color: 'from-blue-500 to-cyan-500',
      progress: 0
    })
    setIsAddingNew(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">Error loading learning paths: {error}</p>
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
            <span>Add New Learning Path</span>
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
            <h3 className="text-lg font-bold text-white">Add New Learning Path</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveNew}
                disabled={!newPath.title || !newPath.description}
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
                value={newPath.title}
                onChange={(e) => setNewPath(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Machine Learning Engineer"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
              <select
                value={newPath.icon}
                onChange={(e) => setNewPath(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Brain">🧠 Brain</option>
                <option value="Code">💻 Code</option>
                <option value="DollarSign">💰 DollarSign</option>
                <option value="Target">🎯 Target</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Color Gradient</label>
              <select
                value={newPath.color}
                onChange={(e) => setNewPath(prev => ({ ...prev, color: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                <option value="from-orange-500 to-red-500">Orange to Red</option>
                <option value="from-indigo-500 to-purple-500">Indigo to Purple</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Initial Progress (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newPath.progress}
                onChange={(e) => setNewPath(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-300">{newPath.progress}%</span>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={newPath.description}
                onChange={(e) => setNewPath(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this learning path"
                rows={3}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      {data.learningPaths.map((path, index) => {
        const isEditing = editingPath?.id === path.id
        const isExpanded = expandedPath === path.id
        
        return (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 overflow-hidden hover:border-slate-500/50 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${path.color}`}>
                    {getIcon(path.icon)}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingPath.title}
                          onChange={(e) => setEditingPath(prev => prev ? { ...prev, title: e.target.value } : null)}
                          className="text-xl font-bold text-white bg-slate-600/50 rounded px-3 py-1 w-full"
                        />
                        <textarea
                          value={editingPath.description}
                          onChange={(e) => setEditingPath(prev => prev ? { ...prev, description: e.target.value } : null)}
                          className="text-gray-300 bg-slate-600/50 rounded px-3 py-2 w-full resize-none"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-white">{path.title}</h3>
                        <p className="text-gray-300">{path.description}</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSavePath}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      {isEditMode && (
                        <button
                          onClick={() => handleEditPath(path)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editingPath.progress}
                        onChange={(e) => setEditingPath(prev => prev ? { ...prev, progress: parseInt(e.target.value) } : null)}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-300 w-12">{editingPath.progress}%</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-300">{path.progress}%</span>
                  )}
                </div>
                <div className="w-full bg-slate-600/50 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${path.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${isEditing ? editingPath.progress : path.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Steps (collapsed/expanded) */}
              <AnimatePresence>
                {isExpanded && path.path_steps && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-600/50 pt-4 mt-4 space-y-3"
                  >
                    {path.path_steps.map((step: any, stepIndex: number) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-slate-600/30 rounded-lg"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : step.in_progress ? (
                            <Play className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{step.title}</h4>
                          <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{step.estimated_time}</span>
                            </div>
                            {step.skills && step.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {step.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                                  <span
                                    key={skillIndex}
                                    className="px-2 py-0.5 bg-slate-700/50 rounded text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {step.skills.length > 3 && (
                                  <span className="text-gray-500">+{step.skills.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}