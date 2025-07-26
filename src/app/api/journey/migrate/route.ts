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

    // First, check if tables exist by testing queries
    console.log('Checking if tables exist...')
    
    const tableChecks = await Promise.all([
      supabaseService.from('learning_paths').select('id', { count: 'exact', head: true }),
      supabaseService.from('milestones').select('id', { count: 'exact', head: true }),
      supabaseService.from('certifications').select('id', { count: 'exact', head: true })
    ])
    
    console.log('Table check results:', tableChecks.map(result => ({ 
      error: result.error?.message, 
      count: result.count 
    })))

    // Clear existing data first
    console.log('Clearing existing data...')
    const clearResults = await Promise.all([
      supabaseService.from('learning_paths').delete().gte('created_at', '1900-01-01'),
      supabaseService.from('milestones').delete().gte('created_at', '1900-01-01'),
      supabaseService.from('certifications').delete().gte('created_at', '1900-01-01')
    ])
    
    console.log('Clear results:', clearResults.map(result => ({ error: result.error?.message })))

    // Migrate Learning Paths - let database generate UUIDs
    const learningPathsData = journeyData.learningPaths.map(path => ({
      title: path.title,
      description: path.description,
      icon: path.icon,
      color: path.color,
      progress: path.progress,
      order_index: path.order_index
    }))

    console.log('Inserting learning paths:', learningPathsData)
    const { error: pathsError } = await supabaseService
      .from('learning_paths')
      .insert(learningPathsData)
    
    if (pathsError) {
      console.error('Learning paths migration error:', pathsError)
      throw new Error(`Learning paths migration failed: ${pathsError.message}`)
    }
    console.log('✅ Learning paths migrated successfully')

    // Migrate Milestones - let database generate UUIDs
    const milestonesData = journeyData.milestones.map(milestone => ({
      title: milestone.title,
      description: milestone.description,
      target_date: milestone.target_date,
      completed: milestone.completed,
      completion_date: milestone.completion_date || null,
      progress: milestone.progress,
      category: milestone.category.toLowerCase(),
      order_index: milestone.order_index
    }))

    console.log('Inserting milestones:', milestonesData)
    const { error: milestonesError } = await supabaseService
      .from('milestones')
      .insert(milestonesData)
      
    if (milestonesError) {
      console.error('Milestones migration error:', milestonesError)
      throw new Error(`Milestones migration failed: ${milestonesError.message}`)
    }
    console.log('✅ Milestones migrated successfully')

    // Migrate Certifications - let database generate UUIDs
    const certificationsData = journeyData.certifications.map(cert => ({
      title: cert.title,
      provider: cert.provider,
      description: cert.description,
      status: cert.status,
      completion_date: cert.completion_date || null,
      expected_date: cert.expected_date || null,
      skills: cert.skills,
      order_index: cert.order_index
    }))

    console.log('Inserting certifications:', certificationsData)
    const { error: certsError } = await supabaseService
      .from('certifications')
      .insert(certificationsData)
      
    if (certsError) {
      console.error('Certifications migration error:', certsError)
      throw new Error(`Certifications migration failed: ${certsError.message}`)
    }
    console.log('✅ Certifications migrated successfully')

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