import { NextResponse } from 'next/server'
import { journeyData } from '@/data/journey-data'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export async function GET() {
  try {
    // Try to load from database first
    const [learningPathsRes, milestonesRes, certificationsRes] = await Promise.all([
      supabaseService.from('learning_paths').select('*').order('order_index'),
      supabaseService.from('milestones').select('*').order('order_index'),
      supabaseService.from('certifications').select('*').order('order_index')
    ])

    // Check if database tables exist/are accessible
    const hasDbAccess = !learningPathsRes.error && !milestonesRes.error && !certificationsRes.error

    if (hasDbAccess) {
      // Return database data (even if empty arrays after migration)
      return NextResponse.json({
        success: true,
        data: {
          learningPaths: learningPathsRes.data || [],
          milestones: milestonesRes.data || [],
          certifications: certificationsRes.data || []
        }
      })
    } else {
      // Only return static data if database is completely inaccessible
      return NextResponse.json({
        success: true,
        data: {
          learningPaths: journeyData.learningPaths,
          milestones: journeyData.milestones.map(milestone => ({
            id: milestone.id,
            date: milestone.target_date,
            title: milestone.title,
            description: milestone.description,
            status: milestone.completed ? 'completed' : (milestone.progress > 0 ? 'in-progress' : 'upcoming'),
            category: milestone.category.toLowerCase(),
            details: [`Progress: ${milestone.progress}%`],
            order_index: milestone.order_index
          })),
          certifications: journeyData.certifications.map(cert => ({
            id: cert.id,
            title: cert.title,
            issuer: cert.provider,
            date_earned: cert.completion_date || cert.expected_date || '',
            description: cert.description,
            skills: cert.skills,
            order_index: cert.order_index
          }))
        }
      })
    }

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to load journey data'
    }, { status: 500 })
  }
}