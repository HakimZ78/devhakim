'use client'

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
  Plus,
  FileText,
  Trash2
} from 'lucide-react'
import { useAdmin } from '@/contexts/AdminContext'
import { useState, useEffect } from 'react'

interface Certification {
  id: string
  title: string
  issuer: string
  date_earned: string
  credential_id?: string
  status: string
  description: string
  skills: string[]
  certificate_pdf?: string
  order_index: number
}

interface EditingCertification {
  id: string
  title: string
  issuer: string
  date_earned: string
  credential_id: string
  status: string
  description: string
  skills: string[]
  certificate_pdf: string
}

export default function EditableCertificationsShowcase() {
  const { isEditMode } = useAdmin()
  const [data, setData] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingCert, setEditingCert] = useState<EditingCertification | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [pdfViewerOpen, setPdfViewerOpen] = useState<string | null>(null)
  const [newCertification, setNewCertification] = useState({
    title: '',
    issuer: '',
    date_earned: '',
    credential_id: '',
    status: 'completed',
    description: '',
    skills: [] as string[],
    certificate_pdf: ''
  })

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/journey/certifications')
      if (!response.ok) throw new Error('Failed to fetch certifications')
      const certificationsData = await response.json()
      setData(certificationsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleEditCertification = (cert: Certification) => {
    setEditingCert({
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      date_earned: cert.date_earned || '',
      credential_id: cert.credential_id || '',
      status: cert.status,
      description: cert.description,
      skills: cert.skills || [],
      certificate_pdf: cert.certificate_pdf || ''
    })
  }

  const handleSaveCertification = async () => {
    if (!editingCert) return
    
    try {
      const updatedData = data.map(cert => 
        cert.id === editingCert.id 
          ? { ...cert, ...editingCert }
          : cert
      )
      setData(updatedData)
      setEditingCert(null)
      
      // TODO: Save to API when backend is ready
      // await fetch('/api/journey/certifications', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editingCert)
      // })
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
    if (!newCertification.title || !newCertification.issuer || !newCertification.description) return
    
    try {
      const newCert: Certification = {
        id: Date.now().toString(),
        ...newCertification,
        order_index: data.length + 1
      }
      setData([...data, newCert])
      setNewCertification({
        title: '',
        issuer: '',
        date_earned: '',
        credential_id: '',
        status: 'completed',
        description: '',
        skills: [],
        certificate_pdf: ''
      })
      setIsAddingNew(false)
      
      // TODO: Save to API when backend is ready
    } catch (error) {
      console.error('Failed to create new certification:', error)
    }
  }

  const handleCancelNew = () => {
    setNewCertification({
      title: '',
      issuer: '',
      date_earned: '',
      credential_id: '',
      status: 'completed',
      description: '',
      skills: [],
      certificate_pdf: ''
    })
    setIsAddingNew(false)
  }

  const handleViewCertificate = (pdfPath: string) => {
    setPdfViewerOpen(pdfPath)
  }

  const handleClosePdfViewer = () => {
    setPdfViewerOpen(null)
  }

  const handleDeleteCertification = async (certId: string) => {
    if (!confirm('Are you sure you want to delete this certification? This action cannot be undone.')) {
      return
    }

    try {
      const updatedData = data.filter(cert => cert.id !== certId)
      setData(updatedData)
      
      // TODO: Delete from API when backend is ready
      // await fetch('/api/journey/certifications', {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id: certId })
      // })
    } catch (error) {
      console.error('Failed to delete certification:', error)
    }
  }

  const getStatusColor = (status: string) => {
    return 'from-green-500 to-emerald-500'
  }

  const getStatusIcon = (status: string) => {
    return <Award className="w-5 h-5" />
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

  // PDF Viewer Modal Component
  const PDFViewerModal = ({ pdfPath, onClose }: { pdfPath: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-600 w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-600">
          <h3 className="text-lg font-bold text-white">Certificate</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            src={pdfPath}
            className="w-full h-full rounded-lg"
            title="Certificate PDF"
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* PDF Viewer Modal */}
      {pdfViewerOpen && (
        <PDFViewerModal 
          pdfPath={pdfViewerOpen} 
          onClose={handleClosePdfViewer} 
        />
      )}

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
                disabled={!newCertification.title || !newCertification.issuer || !newCertification.description}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Issuer *</label>
              <input
                type="text"
                value={newCertification.issuer}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                placeholder="e.g., FreeCodeCamp"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date Earned *</label>
              <input
                type="date"
                value={newCertification.date_earned}
                onChange={(e) => setNewCertification(prev => ({ ...prev, date_earned: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Credential ID</label>
              <input
                type="text"
                value={newCertification.credential_id}
                onChange={(e) => setNewCertification(prev => ({ ...prev, credential_id: e.target.value }))}
                placeholder="e.g., PY2023-1234"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Certificate PDF Path 
                <span className="text-xs text-gray-400 ml-1">(Place PDF in public/certificates/ folder)</span>
              </label>
              <input
                type="text"
                value={newCertification.certificate_pdf}
                onChange={(e) => setNewCertification(prev => ({ ...prev, certificate_pdf: e.target.value }))}
                placeholder="/certificates/freecodecamp-python.pdf"
                className="w-full px-3 py-2 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                📁 Upload your PDF to: <code className="bg-slate-600/50 px-1 rounded">public/certificates/filename.pdf</code><br />
                🔗 Then enter path: <code className="bg-slate-600/50 px-1 rounded">/certificates/filename.pdf</code>
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                value={newCertification.skills.join(', ')}
                onChange={(e) => setNewCertification(prev => ({ 
                  ...prev, 
                  skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                }))}
                placeholder="e.g., Python, Flask, APIs"
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
        {data.map((cert, index) => {
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
                      <>
                        <button
                          onClick={() => handleEditCertification(cert)}
                          className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit Certification"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertification(cert.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete Certification"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                    {cert.certificate_pdf && (
                      <button
                        onClick={() => handleViewCertificate(cert.certificate_pdf!)}
                        className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                        title="View Certificate"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
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
                    value={editingCert?.title || ''}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="font-bold text-white bg-slate-600/50 rounded px-3 py-2 w-full"
                    placeholder="Certification Title"
                  />
                  <input
                    type="text"
                    value={editingCert?.issuer || ''}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, issuer: e.target.value } : null)}
                    className="text-sm text-gray-300 bg-slate-600/50 rounded px-3 py-1 w-full"
                    placeholder="Issuer/Institution"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-white text-lg">{cert.title}</h3>
                  <p className="text-blue-400 text-sm font-medium">{cert.issuer}</p>
                </>
              )}

              {/* Description */}
              {isEditing ? (
                <textarea
                  value={editingCert?.description || ''}
                  onChange={(e) => setEditingCert(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="text-gray-300 bg-slate-600/50 rounded px-3 py-2 w-full resize-none"
                  rows={3}
                  placeholder="Description"
                />
              ) : (
                <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
              )}

              {/* Credential ID */}
              {cert.credential_id && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Credential ID:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editingCert?.credential_id || ''}
                      onChange={(e) => setEditingCert(prev => prev ? { ...prev, credential_id: e.target.value } : null)}
                      className="text-xs text-gray-300 bg-slate-600/50 rounded px-2 py-1 flex-1"
                    />
                  ) : (
                    <span className="text-xs text-gray-300 font-mono">{cert.credential_id}</span>
                  )}
                </div>
              )}

              {/* Date Earned */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {isEditing && editingCert ? (
                  <input
                    type="date"
                    value={editingCert.date_earned || ''}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, date_earned: e.target.value } : null)}
                    className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span className="text-sm text-gray-300">
                    Earned: {new Date(cert.date_earned).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                )}
              </div>

              {/* Certificate PDF */}
              {isEditing && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Certificate PDF Path 
                    <span className="text-xs text-gray-500 ml-1">(public/certificates/)</span>
                  </label>
                  <input
                    type="text"
                    value={editingCert?.certificate_pdf || ''}
                    onChange={(e) => setEditingCert(prev => prev ? { ...prev, certificate_pdf: e.target.value } : null)}
                    className="text-sm text-gray-300 bg-slate-600/50 rounded px-2 py-1 w-full"
                    placeholder="/certificates/my-cert.pdf"
                  />
                </div>
              )}

              {/* Skills */}
              <div>
                {isEditing ? (
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={editingCert?.skills?.join(', ') || ''}
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
    </>
  )
}