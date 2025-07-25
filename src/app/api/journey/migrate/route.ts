import { NextResponse } from 'next/server'
import { journeyData } from '@/data/journey-data'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export async function POST() {
  try {
    console.log('Starting journey data migration...')

    // Clear existing data first
    await supabaseService.from('learning_paths').delete().neq('id', '')
    await supabaseService.from('milestones').delete().neq('id', '')
    await supabaseService.from('certifications').delete().neq('id', '')

    // Migrate Learning Paths
    const learningPathsData = journeyData.learningPaths.map(path => ({
      id: path.id,
      title: path.title,
      description: path.description,
      technologies: [], // Add empty array for technologies
      progress: path.progress,
      milestones: path.path_steps?.map(step => step.title) || [],
      order_index: path.order_index
    }))

    const { error: pathsError } = await supabaseService
      .from('learning_paths')
      .insert(learningPathsData)
    
    if (pathsError) {
      console.error('Learning paths migration error:', pathsError)
      throw pathsError
    }

    // Migrate Milestones (convert to timeline format)
    const milestonesData = journeyData.milestones.map(milestone => ({
      id: milestone.id,
      date: milestone.target_date,
      title: milestone.title,
      description: milestone.description,
      status: milestone.completed ? 'completed' : (milestone.progress > 0 ? 'in-progress' : 'upcoming'), 
      category: milestone.category.toLowerCase(),
      details: [`Progress: ${milestone.progress}%`],
      order_index: milestone.order_index
    }))

    const { error: milestonesError } = await supabaseService
      .from('milestones')
      .insert(milestonesData)
      
    if (milestonesError) {
      console.error('Milestones migration error:', milestonesError)
      throw milestonesError
    }

    // Migrate Certifications
    const certificationsData = journeyData.certifications.map(cert => ({
      id: cert.id,
      title: cert.title,
      issuer: cert.provider,
      date_earned: cert.completion_date || cert.expected_date || '',
      description: cert.description,
      skills: cert.skills,
      order_index: cert.order_index
    }))

    const { error: certsError } = await supabaseService
      .from('certifications')
      .insert(certificationsData)
      
    if (certsError) {
      console.error('Certifications migration error:', certsError)
      throw certsError
    }

    console.log('Journey data migration completed successfully!')

    return NextResponse.json({
      success: true,
      message: 'Journey data migrated successfully',
      migrated: {
        learningPaths: learningPathsData.length,
        milestones: milestonesData.length,
        certifications: certificationsData.length
      }
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to migrate journey data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}