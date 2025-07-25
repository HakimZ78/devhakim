import { useState, useEffect } from 'react'
import type { LearningPath, Milestone, Certification } from '@/lib/supabase'

interface JourneyData {
  learningPaths: (LearningPath & { path_steps?: any[] })[]
  milestones: Milestone[]
  certifications: Certification[]
}

export function useJourneyData() {
  const [data, setData] = useState<JourneyData>({
    learningPaths: [],
    milestones: [],
    certifications: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [pathsRes, milestonesRes, certificationsRes] = await Promise.all([
        fetch('/api/journey/learning-paths'),
        fetch('/api/journey/milestones'),
        fetch('/api/journey/certifications')
      ])

      if (!pathsRes.ok || !milestonesRes.ok || !certificationsRes.ok) {
        // Fallback to empty data instead of throwing error
        console.warn('Journey API not available, using empty data')
        setData({
          learningPaths: [],
          milestones: [],
          certifications: []
        })
        return
      }

      const [pathsResult, milestonesResult, certificationsResult] = await Promise.all([
        pathsRes.json(),
        milestonesRes.json(),
        certificationsRes.json()
      ])

      setData({ 
        learningPaths: pathsResult.data || [],
        milestones: milestonesResult.data || [],
        certifications: certificationsResult.data || []
      })
    } catch (err) {
      // Fallback to empty data instead of error
      console.warn('Journey data fetch failed, using empty data:', err)
      setData({
        learningPaths: [],
        milestones: [],
        certifications: []
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateLearningPath = async (path: Partial<LearningPath> & { id: string }) => {
    try {
      const response = await fetch('/api/journey/learning-paths', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(path)
      })

      if (!response.ok) throw new Error('Failed to update learning path')
      
      const updatedPath = await response.json()
      setData(prev => ({
        ...prev,
        learningPaths: prev.learningPaths.map(p => 
          p.id === path.id ? { ...p, ...updatedPath } : p
        )
      }))
      
      return updatedPath
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update path')
    }
  }

  const updateMilestone = async (milestone: Partial<Milestone> & { id: string }) => {
    try {
      const response = await fetch('/api/journey/milestones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(milestone)
      })

      if (!response.ok) throw new Error('Failed to update milestone')
      
      const updatedMilestone = await response.json()
      setData(prev => ({
        ...prev,
        milestones: prev.milestones.map(m => 
          m.id === milestone.id ? { ...m, ...updatedMilestone } : m
        )
      }))
      
      return updatedMilestone
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update milestone')
    }
  }

  const updateCertification = async (certification: Partial<Certification> & { id: string }) => {
    try {
      const response = await fetch('/api/journey/certifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certification)
      })

      if (!response.ok) throw new Error('Failed to update certification')
      
      const updatedCertification = await response.json()
      setData(prev => ({
        ...prev,
        certifications: prev.certifications.map(c => 
          c.id === certification.id ? { ...c, ...updatedCertification } : c
        )
      }))
      
      return updatedCertification
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update certification')
    }
  }

  const createLearningPath = async (path: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/journey/learning-paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(path)
      })

      if (!response.ok) throw new Error('Failed to create learning path')
      
      const newPath = await response.json()
      setData(prev => ({
        ...prev,
        learningPaths: [...prev.learningPaths, newPath]
      }))
      
      return newPath
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create learning path')
    }
  }

  const createMilestone = async (milestone: Omit<Milestone, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/journey/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(milestone)
      })

      if (!response.ok) throw new Error('Failed to create milestone')
      
      const newMilestone = await response.json()
      setData(prev => ({
        ...prev,
        milestones: [...prev.milestones, newMilestone]
      }))
      
      return newMilestone
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create milestone')
    }
  }

  const createCertification = async (certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/journey/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certification)
      })

      if (!response.ok) throw new Error('Failed to create certification')
      
      const newCertification = await response.json()
      setData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification]
      }))
      
      return newCertification
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create certification')
    }
  }

  const initializeDatabase = async (reset = false) => {
    try {
      const response = await fetch('/api/journey/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: reset ? 'reset' : 'init' })
      })

      if (!response.ok) throw new Error('Failed to initialize database')
      
      // Refresh data after initialization
      await fetchData()
      
      return await response.json()
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to initialize database')
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateLearningPath,
    updateMilestone,
    updateCertification,
    createLearningPath,
    createMilestone,
    createCertification,
    initializeDatabase
  }
}