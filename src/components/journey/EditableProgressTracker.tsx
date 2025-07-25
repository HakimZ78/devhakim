'use client'

import { useState, useEffect } from 'react'
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
import { useGlobalAdmin } from '@/contexts/GlobalAdminContext'
import AdminOnly from '@/components/admin/AdminOnly'

interface ProgressItem {
  skill: string
  current_level: number
  target_level: number
  last_updated: string
  evidence: string[]
}

interface ProgressCategory {
  id: string
  category: string
  items: ProgressItem[]
}

interface EditingItem {
  categoryId: string
  itemIndex: number
  skill: string
  current_level: number
  target_level: number
  evidence: string[]
}

export default function EditableProgressTracker() {
  const { isAuthenticated } = useGlobalAdmin()
  const [data, setData] = useState<ProgressCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newItem, setNewItem] = useState({
    skill: '',
    current_level: 70,
    target_level: 80,
    evidence: ['']
  })
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/journey/progress')
      if (!response.ok) throw new Error('Failed to fetch progress data')
      const progressData = await response.json()
      setData(progressData)
      if (progressData.length > 0) {
        setSelectedCategory(progressData[0].id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleEditItem = (categoryId: string, itemIndex: number, item: ProgressItem) => {
    setEditingItem({
      categoryId,
      itemIndex,
      skill: item.skill,
      current_level: item.current_level,
      target_level: item.target_level,
      evidence: [...item.evidence]
    })
  }

  const handleSaveItem = async () => {
    if (!editingItem) return
    
    try {
      const updatedData = data.map(category => {
        if (category.id === editingItem.categoryId) {
          const updatedItems = [...category.items]
          updatedItems[editingItem.itemIndex] = {
            skill: editingItem.skill,
            current_level: editingItem.current_level,
            target_level: editingItem.target_level,
            last_updated: new Date().toISOString().split('T')[0],
            evidence: editingItem.evidence.filter(e => e.trim() !== '')
          }
          return { ...category, items: updatedItems }
        }
        return category
      })
      
      setData(updatedData)
      setEditingItem(null)
      
      // TODO: Save to API when backend is ready
      // await fetch('/api/journey/progress', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData)
      // })
    } catch (error) {
      console.error('Failed to save item:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const handleSaveNew = async () => {
    if (!newItem.skill || !selectedCategory) return
    
    try {
      const updatedData = data.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            items: [...category.items, {
              skill: newItem.skill,
              current_level: newItem.current_level,
              target_level: newItem.target_level,
              last_updated: new Date().toISOString().split('T')[0],
              evidence: newItem.evidence.filter(e => e.trim() !== '')
            }]
          }
        }
        return category
      })
      
      setData(updatedData)
      setNewItem({
        skill: '',
        current_level: 70,
        target_level: 80,
        evidence: ['']
      })
      setIsAddingNew(false)
      
      // TODO: Save to API when backend is ready
    } catch (error) {
      console.error('Failed to create new item:', error)
    }
  }

  const handleCancelNew = () => {
    setNewItem({
      skill: '',
      current_level: 70,
      target_level: 80,
      evidence: ['']
    })
    setIsAddingNew(false)
  }

  const addEvidenceField = () => {
    if (editingItem) {
      setEditingItem({ ...editingItem, evidence: [...editingItem.evidence, ''] })
    } else {
      setNewItem({ ...newItem, evidence: [...newItem.evidence, ''] })
    }
  }

  const removeEvidenceField = (index: number) => {
    if (editingItem) {
      const newEvidence = editingItem.evidence.filter((_, i) => i !== index)
      setEditingItem({ ...editingItem, evidence: newEvidence })
    } else {
      const newEvidence = newItem.evidence.filter((_, i) => i !== index)
      setNewItem({ ...newItem, evidence: newEvidence })
    }
  }

  const updateEvidenceField = (index: number, value: string) => {
    if (editingItem) {
      const newEvidence = [...editingItem.evidence]
      newEvidence[index] = value
      setEditingItem({ ...editingItem, evidence: newEvidence })
    } else {
      const newEvidence = [...newItem.evidence]
      newEvidence[index] = value
      setNewItem({ ...newItem, evidence: newEvidence })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical skills':
        return 'from-blue-500 to-cyan-500'
      case 'professional development':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-purple-500 to-pink-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical skills':
        return <Target className="w-4 h-4" />
      case 'professional development':
        return <TrendingUp className="w-4 h-4" />
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
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${getCategoryColor(category.category)} text-white`
                : 'bg-slate-700/30 text-gray-300 hover:bg-slate-600/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              {getCategoryIcon(category.category)}
              <span>{category.category}</span>
              <span className="text-xs opacity-70">({category.items.length})</span>
            </div>
          </button>
        ))}
      </div>

      {/* Add New Button */}
      <AdminOnly>
        {!isAddingNew && selectedCategory && (
        <div className="flex justify-end">
          <button
            onClick={handleAddNew}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>
        )}
      </AdminOnly>

      {/* Add New Form */}
      <AdminOnly>
        {isAddingNew && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-green-500/50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Add New Skill Progress</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveNew}
                disabled={!newItem.skill}
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name *</label>
              <input
                type="text"
                value={newItem.skill}
                onChange={(e) => setNewItem(prev => ({ ...prev, skill: e.target.value }))}
                placeholder="e.g., React Hooks"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newItem.current_level}
                onChange={(e) => setNewItem(prev => ({ ...prev, current_level: parseInt(e.target.value) }))}
                className="w-full mb-2"
              />
              <span className="text-sm text-gray-300">{newItem.current_level}%</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newItem.target_level}
                onChange={(e) => setNewItem(prev => ({ ...prev, target_level: parseInt(e.target.value) }))}
                className="w-full mb-2"
              />
              <span className="text-sm text-gray-300">{newItem.target_level}%</span>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Evidence/Projects</label>
              {newItem.evidence.map((evidence, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={evidence}
                    onChange={(e) => updateEvidenceField(index, e.target.value)}
                    placeholder="e.g., Portfolio Admin System"
                    className="flex-1 px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {newItem.evidence.length > 1 && (
                    <button
                      onClick={() => removeEvidenceField(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addEvidenceField}
                className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span className="text-sm">Add Evidence</span>
              </button>
            </div>
          </div>
        </motion.div>
        )}
      </AdminOnly>

      {/* Progress Items */}
      <div className="space-y-4">
        {data.find(cat => cat.id === selectedCategory)?.items.map((item, index) => {
          const category = data.find(cat => cat.id === selectedCategory)!
          const isEditing = editingItem?.categoryId === selectedCategory && editingItem?.itemIndex === index
          const progressDiff = item.target_level - item.current_level
          
          return (
            <motion.div
              key={`${selectedCategory}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 hover:border-slate-500/50 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(category.category)}`}>
                    {getCategoryIcon(category.category)}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingItem.skill}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, skill: e.target.value } : null)}
                        className="font-semibold text-white bg-slate-600/50 rounded px-3 py-1 w-full"
                      />
                    ) : (
                      <h3 className="font-semibold text-white">{item.skill}</h3>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">Last updated: {item.last_updated}</span>
                      {progressDiff > 0 && (
                        <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded">
                          +{progressDiff}% to target
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <div className="flex space-x-1">
                      <button
                        onClick={handleSaveItem}
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
                    <AdminOnly>
                      <button
                        onClick={() => handleEditItem(selectedCategory, index, item)}
                        className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </AdminOnly>
                  )}
                </div>
              </div>

              {/* Progress Levels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Current Level</span>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editingItem.current_level}
                          onChange={(e) => setEditingItem(prev => prev ? { ...prev, current_level: parseInt(e.target.value) } : null)}
                          className="w-20"
                        />
                        <span className="text-sm text-gray-300 w-8">{editingItem.current_level}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-300">{item.current_level}%</span>
                    )}
                  </div>
                  <div className="w-full bg-slate-600/50 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category.category)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${isEditing ? editingItem.current_level : item.current_level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Target Level</span>
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editingItem.target_level}
                          onChange={(e) => setEditingItem(prev => prev ? { ...prev, target_level: parseInt(e.target.value) } : null)}
                          className="w-20"
                        />
                        <span className="text-sm text-gray-300 w-8">{editingItem.target_level}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-300">{item.target_level}%</span>
                    )}
                  </div>
                  <div className="w-full bg-slate-600/50 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${isEditing ? editingItem.target_level : item.target_level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <span className="text-sm text-gray-400 mb-2 block">Evidence/Projects:</span>
                {isEditing ? (
                  <div className="space-y-2">
                    {editingItem.evidence.map((evidence, evidenceIndex) => (
                      <div key={evidenceIndex} className="flex space-x-2">
                        <input
                          type="text"
                          value={evidence}
                          onChange={(e) => updateEvidenceField(evidenceIndex, e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {editingItem.evidence.length > 1 && (
                          <button
                            onClick={() => removeEvidenceField(evidenceIndex)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addEvidenceField}
                      className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span className="text-sm">Add Evidence</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {item.evidence.map((evidence, evidenceIndex) => (
                      <span
                        key={evidenceIndex}
                        className="px-3 py-1 bg-slate-600/30 text-gray-300 rounded-full text-sm"
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {selectedCategory && data.find(cat => cat.id === selectedCategory)?.items.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No Skills Yet</h3>
          <p className="text-gray-500 mb-4">Start tracking your progress by adding your first skill.</p>
          <AdminOnly>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add First Skill
            </button>
          </AdminOnly>
        </div>
      )}
    </div>
  )
}