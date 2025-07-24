'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Calendar, 
  ExternalLink, 
  Clock, 
  CheckCircle,
  Edit3,
  Save,
  X,
  Award,
  BookOpen,
  Target,
  Plus
} from 'lucide-react'
import { useJourneyData } from '@/hooks/useJourneyData'
import { useAdmin } from '@/contexts/AdminContext'
import type { Certification } from '@/lib/supabase'

interface EditingCertification {
  id: string
  title: string
  provider: string
  description: string
  status: 'completed' | 'in_progress' | 'planned'
  completion_date?: string
  expected_date?: string
  certificate_url?: string
  skills: string[]
}

export default function EditableCertificationsShowcase() {
  const { data, loading, error, updateCertification, createCertification } = useJourneyData()
  const { isEditMode } = useAdmin()
  const [editingCert, setEditingCert] = useState<EditingCertification | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newCertification, setNewCertification] = useState({
    title: '',
    provider: '',
    description: '',
    status: 'planned' as 'completed' | 'in_progress' | 'planned',
    completion_date: '',
    expected_date: '',
    certificate_url: '',
    skills: [] as string[]
  })

  const handleEditCertification = (cert: Certification) => {
    setEditingCert({
      id: cert.id,
      title: cert.title,
      provider: cert.provider,
      description: cert.description,
      status: cert.status,
      completion_date: cert.completion_date || '',
      expected_date: cert.expected_date || '',
      certificate_url: cert.certificate_url || '',
      skills: cert.skills || []
    })
  }

  const handleSaveCertification = async () => {
    if (!editingCert) return
    
    try {
      const updateData = {
        ...editingCert,
        completion_date: editingCert.completion_date || undefined,
        expected_date: editingCert.expected_date || undefined,
        certificate_url: editingCert.certificate_url || undefined
      }
      await updateCertification(updateData)
      setEditingCert(null)
    } catch (error) {
      console.error('Failed to save certification:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingCert(null)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const handleSaveNew = async () => {
    if (!newCertification.title || !newCertification.provider || !newCertification.description) return
    
    try {
      const nextOrderIndex = data.certifications.length + 1
      const certData = {
        ...newCertification,
        completion_date: newCertification.completion_date || undefined,
        expected_date: newCertification.expected_date || undefined,
        certificate_url: newCertification.certificate_url || undefined,
        order_index: nextOrderIndex
      }
      await createCertification(certData)
      setNewCertification({
        title: '',
        provider: '',
        description: '',
        status: 'planned' as 'completed' | 'in_progress' | 'planned',
        completion_date: '',
        expected_date: '',
        certificate_url: '',
        skills: []
      })
      setIsAddingNew(false)
    } catch (error) {
      console.error('Failed to create new certification:', error)
    }
  }

  const handleCancelNew = () => {
    setNewCertification({
      title: '',
      provider: '',
      description: '',
      status: 'planned' as 'completed' | 'in_progress' | 'planned',
      completion_date: '',
      expected_date: '',
      certificate_url: '',
      skills: []
    })
    setIsAddingNew(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500'
      case 'in_progress':
        return 'from-blue-500 to-cyan-500'
      case 'planned':
        return 'from-gray-500 to-slate-500'
      default:
        return 'from-purple-500 to-pink-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />
      case 'in_progress':
        return <Clock className="w-5 h-5" />
      case 'planned':
        return <Target className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in_progress':
        return 'In Progress'
      case 'planned':
        return 'Planned'
      default:
        return 'Unknown'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">Error loading certifications: {error}</p>
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
            <span>Add New Certification</span>
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
            <h3 className="text-lg font-bold text-white">Add New Certification</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveNew}
                disabled={!newCertification.title || !newCertification.provider || !newCertification.description}
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
                value={newCertification.title}
                onChange={(e) => setNewCertification(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., AWS Solutions Architect"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Provider *</label>
              <input
                type="text"
                value={newCertification.provider}
                onChange={(e) => setNewCertification(prev => ({ ...prev, provider: e.target.value }))}
                placeholder="e.g., Amazon Web Services"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={newCertification.status}
                onChange={(e) => setNewCertification(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {newCertification.status === 'completed' ? 'Completion Date' : 'Expected Date'}
              </label>
              <input
                type="date"
                value={newCertification.status === 'completed' ? newCertification.completion_date : newCertification.expected_date}
                onChange={(e) => setNewCertification(prev => ({ 
                  ...prev, 
                  ...(newCertification.status === 'completed' 
                    ? { completion_date: e.target.value } 
                    : { expected_date: e.target.value })
                }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            {newCertification.status === 'completed' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Certificate URL</label>
                <input
                  type="url"
                  value={newCertification.certificate_url}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, certificate_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}
            
            <div className={newCertification.status === 'completed' ? 'md:col-span-1' : 'md:col-span-2'}>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                value={newCertification.skills.join(', ')}
                onChange={(e) => setNewCertification(prev => ({ 
                  ...prev, 
                  skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                }))}
                placeholder="e.g., React, TypeScript, Node.js"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={newCertification.description}
                onChange={(e) => setNewCertification(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this certification"
                rows={3}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.certifications.map((cert, index) => {
          const isEditing = editingCert?.id === cert.id
        
          return (
            <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 hover:border-slate-500/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getStatusColor(cert.status)}`}>
                {getStatusIcon(cert.status)}
              </div>
              
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <div className="flex space-x-1">
                    <button
                      onClick={handleSaveCertification}
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
                        onClick={() => handleEditCertification(cert)}
                        className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                    {cert.certificate_url && cert.status === 'completed' && (
                      <a
                        href={cert.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {/* Title and Provider */}
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingCert.title}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="font-bold text-white bg-slate-600/50 rounded px-3 py-2 w-full"
                    placeholder="Certification Title"
                  />
                  <input
                    type="text"
                    value={editingCert.provider}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, provider: e.target.value } : null)}
                    className="text-sm text-gray-300 bg-slate-600/50 rounded px-3 py-1 w-full"
                    placeholder="Provider/Institution"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-white text-lg">{cert.title}</h3>
                  <p className="text-blue-400 text-sm font-medium">{cert.provider}</p>
                </>
              )}

              {/* Description */}
              {isEditing ? (
                <textarea
                  value={editingCert.description}
                  onChange={(e) => setEditingCert(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="text-gray-300 bg-slate-600/50 rounded px-3 py-2 w-full resize-none"
                  rows={3}
                  placeholder="Description"
                />
              ) : (
                <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
              )}

              {/* Status */}
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                    className="text-sm bg-slate-600/50 rounded px-2 py-1 text-white"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(cert.status)} text-white`}>
                    {getStatusText(cert.status)}
                  </span>
                )}
              </div>

              {/* Dates */}
              <div className="space-y-2">
                {isEditing ? (
                  <div className="space-y-2">
                    {editingCert.status === 'completed' ? (
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Completion Date</label>
                        <input
                          type="date"
                          value={editingCert.completion_date}
                          onChange={(e) => setEditingCert(prev => prev ? { ...prev, completion_date: e.target.value } : null)}
                          className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1 w-full"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Expected Date</label>
                        <input
                          type="date"
                          value={editingCert.expected_date}
                          onChange={(e) => setEditingCert(prev => prev ? { ...prev, expected_date: e.target.value } : null)}
                          className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1 w-full"
                        />
                      </div>
                    )}
                    {editingCert.status === 'completed' && (
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Certificate URL</label>
                        <input
                          type="url"
                          value={editingCert.certificate_url}
                          onChange={(e) => setEditingCert(prev => prev ? { ...prev, certificate_url: e.target.value } : null)}
                          className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1 w-full"
                          placeholder="https://..."
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {cert.status === 'completed' && cert.completion_date ? (
                      <span className="text-sm text-gray-300">
                        Completed: {new Date(cert.completion_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    ) : cert.expected_date ? (
                      <span className="text-sm text-gray-300">
                        Expected: {new Date(cert.expected_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Date TBD</span>
                    )}
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                {isEditing ? (
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={editingCert.skills.join(', ')}
                      onChange={(e) => setEditingCert(prev => prev ? { 
                        ...prev, 
                        skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                      } : null)}
                      className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1 w-full"
                      placeholder="Python, Machine Learning, Data Analysis"
                    />
                  </div>
                ) : cert.skills && cert.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}