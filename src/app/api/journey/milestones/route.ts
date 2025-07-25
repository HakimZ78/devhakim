import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface Milestone {
  id?: string
  title: string
  description: string
  target_date: string
  completed?: boolean
  completion_date?: string
  progress?: number
  category: string
  details?: string[]
  status: 'completed' | 'in-progress' | 'upcoming'
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getDefaultMilestones()
      })
    }

    return NextResponse.json({
      success: true,
      data: data || []
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: true,
      data: getDefaultMilestones()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/journey/milestones ===')
    console.log('Creating new milestone:', JSON.stringify(body, null, 2))
    
    const {
      title,
      description,
      target_date,
      completed,
      completion_date,
      progress,
      category,
      details,
      status
    } = body

    // Get next order index
    const { data: existingMilestones } = await supabase
      .from('milestones')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingMilestones?.[0]?.order_index || 0) + 1

    const milestoneData = {
      title,
      description,
      target_date,
      completed: completed || false,
      completion_date,
      progress: progress || 0,
      category,
      details: details || [],
      status: status || 'upcoming',
      order_index: nextOrderIndex
    }

    console.log('Prepared milestoneData for DB insert:', JSON.stringify(milestoneData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('milestones')
      .insert([milestoneData])
      .select()
      .single()

    console.log('Insert operation result:', { data, error })
    if (error) throw error

    console.log('Final result to return:', JSON.stringify(data, null, 2))
    
    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Create error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== PUT /api/journey/milestones ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      throw new Error('Milestone ID is required for updates')
    }

    const milestoneData = {
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared milestoneData for DB update:', JSON.stringify(milestoneData, null, 2))

    // Check if milestone exists
    const { data: existing, error: checkError } = await supabase
      .from('milestones')
      .select('id, title')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      throw new Error('Milestone not found')
    }

    console.log('=== UPDATING EXISTING MILESTONE ===')
    console.log('Current DB title:', existing[0].title)
    console.log('New title to save:', milestoneData.title)
    console.log('Milestone ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('milestones')
      .update(milestoneData)
      .eq('id', id)
      .select('*')

    console.log('Update operation complete:', { updateResult, updateError })
    
    if (updateError) {
      console.error('Update failed:', updateError)
      throw updateError
    }

    const result = updateResult && updateResult.length > 0 ? updateResult[0] : null
    console.log('Update successful. New title in DB:', result?.title)
    console.log('Final result to return:', JSON.stringify(result, null, 2))
    
    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      throw new Error('Milestone ID is required for deletion')
    }

    console.log('=== DELETE /api/journey/milestones ===')
    console.log('Deleting milestone with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('milestones')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Milestone deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Fallback data when database is not available
function getDefaultMilestones(): Milestone[] {
  return [
    {
      id: '1',
      title: 'Started Healthcare Career',
      description: 'Qualified as Pharmacist and Optometrist, beginning professional healthcare journey',
      target_date: 'July 2010',
      completed: true,
      completion_date: 'July 2010',
      progress: 100,
      category: 'education',
      details: ['Completed Pharmacy degree', 'Qualified as Optometrist', 'Started working in healthcare sector'],
      status: 'completed',
      order_index: 1
    },
    {
      id: '2',
      title: 'Discovered Trading',
      description: 'Started retail forex trading, sparking interest in financial markets and data analysis',
      target_date: 'March 2018',
      completed: true,
      completion_date: 'March 2018',
      progress: 100,
      category: 'milestone',
      details: ['Began learning technical analysis', 'Started live trading account', 'Discovered passion for data-driven decisions'],
      status: 'completed',
      order_index: 2
    },
    {
      id: '3',
      title: 'First Coding Experience',
      description: 'Started learning Python for trading automation and data analysis',
      target_date: 'January 2023',
      completed: true,
      completion_date: 'January 2023',
      progress: 100,
      category: 'learning',
      details: ['Completed Python basics course', 'Built first trading scripts', 'Discovered love for programming'],
      status: 'completed',
      order_index: 3
    },
    {
      id: '4',
      title: 'Built ForexAcuity',
      description: 'Developed comprehensive forex analytics platform with real-time data and pattern recognition',
      target_date: 'December 2024',
      completed: true,
      completion_date: 'December 2024',
      progress: 100,
      category: 'project',
      details: ['Learned Next.js and React', 'Implemented WebSocket architecture', 'Launched with paying customers'],
      status: 'completed',
      order_index: 4
    },
    {
      id: '5',
      title: 'Career Transition Goal',
      description: 'Secure first software engineering role, ideally in fintech or healthcare tech',
      target_date: 'June 2025',
      completed: false,
      progress: 75,
      category: 'goal',
      details: ['Complete portfolio with admin system', 'Apply to target companies', 'Prepare for technical interviews'],
      status: 'in-progress',
      order_index: 5
    }
  ]
}