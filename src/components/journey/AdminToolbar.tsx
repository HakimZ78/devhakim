'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Edit3, 
  Eye, 
  RotateCcw, 
  Database,
  Loader2,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'
import { useAdmin } from '@/contexts/AdminContext'
import { useJourneyData } from '@/hooks/useJourneyData'

export default function AdminToolbar() {
  const { isEditMode, toggleEditMode } = useAdmin()
  const { initializeDatabase } = useJourneyData()
  const [isInitializing, setIsInitializing] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleInitDatabase = async (reset = false) => {
    try {
      setIsInitializing(true)
      setMessage(null)
      
      await initializeDatabase(reset)
      
      setMessage({ 
        type: 'success', 
        text: reset ? 'Database reset successfully!' : 'Database initialized successfully!' 
      })
      
      if (reset) setShowConfirmReset(false)
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `Failed to ${reset ? 'reset' : 'initialize'} database: ${error}` 
      })
      
      // Clear error message after 5 seconds
      setTimeout(() => setMessage(null), 5000)
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <>
      {/* Fixed Toolbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-20 right-6 z-50"
      >
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300 font-medium">Admin</span>
            </div>
            
            <div className="w-px h-6 bg-slate-600/50"></div>
            
            <button
              onClick={toggleEditMode}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isEditMode 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
            >
              {isEditMode ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isEditMode ? 'View Mode' : 'Edit Mode'}
              </span>
            </button>
            
            <div className="w-px h-6 bg-slate-600/50"></div>
            
            <button
              onClick={() => handleInitDatabase(false)}
              disabled={isInitializing}
              className="flex items-center space-x-2 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors disabled:opacity-50"
            >
              {isInitializing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              <span className="text-sm">Init DB</span>
            </button>
            
            <button
              onClick={() => setShowConfirmReset(true)}
              disabled={isInitializing}
              className="flex items-center space-x-2 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Reset</span>
            </button>
          </div>
          
          {/* Status Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                    : 'bg-red-900/30 text-red-400 border border-red-500/30'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="flex-1">{message.text}</span>
                  <button
                    onClick={() => setMessage(null)}
                    className="p-0.5 hover:bg-white/10 rounded transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showConfirmReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowConfirmReset(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 border border-slate-600/50 rounded-xl p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Reset Database</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                This will delete all current journey data and replace it with the default sample data. 
                This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleInitDatabase(true)}
                  disabled={isInitializing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {isInitializing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Resetting...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Database</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}