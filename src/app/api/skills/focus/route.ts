import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface SkillFocus {
  id?: string
  skill: string
  progress: number
  learning_strategy?: string
  learning_method?: string
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skill_focus')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getDefaultSkillFocus()
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
      data: getDefaultSkillFocus()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/skills/focus ===')
    console.log('Creating new skill focus:', JSON.stringify(body, null, 2))
    
    const { skill, progress, learning_strategy, learning_method } = body

    // Get next order index
    const { data: existingFocus } = await supabase
      .from('skill_focus')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingFocus?.[0]?.order_index || 0) + 1

    const focusData = {
      skill,
      progress: progress || 0,
      learning_strategy: learning_strategy || '',
      learning_method: learning_method || '',
      order_index: nextOrderIndex
    }

    console.log('Prepared focusData for DB insert:', JSON.stringify(focusData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('skill_focus')
      .insert([focusData])
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
    console.log('=== PUT /api/skills/focus ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      throw new Error('Skill focus ID is required for updates')
    }

    const focusData = {
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared focusData for DB update:', JSON.stringify(focusData, null, 2))

    // Check if focus exists
    const { data: existing, error: checkError } = await supabase
      .from('skill_focus')
      .select('id, skill')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      throw new Error('Skill focus not found')
    }

    console.log('=== UPDATING EXISTING SKILL FOCUS ===')
    console.log('Current DB skill:', existing[0].skill)
    console.log('New skill to save:', focusData.skill)
    console.log('Focus ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('skill_focus')
      .update(focusData)
      .eq('id', id)
      .select('*')

    console.log('Update operation complete:', { updateResult, updateError })
    
    if (updateError) {
      console.error('Update failed:', updateError)
      throw updateError
    }

    const result = updateResult && updateResult.length > 0 ? updateResult[0] : null
    console.log('Update successful. New skill in DB:', result?.skill)
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
      throw new Error('Skill focus ID is required for deletion')
    }

    console.log('=== DELETE /api/skills/focus ===')
    console.log('Deleting skill focus with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('skill_focus')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Skill focus deleted successfully'
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
function getDefaultSkillFocus(): SkillFocus[] {
  return [
    {
      id: '1',
      skill: 'Trading Analytics',
      progress: 85,
      learning_strategy: 'Building ForexAcuity platform + MT5 API integration',
      learning_method: 'Hands-on project development',
      order_index: 1
    },
    {
      id: '2',
      skill: 'Full-Stack Development',
      progress: 80,
      learning_strategy: 'Next.js documentation + portfolio project implementation',
      learning_method: 'Documentation + practical application',
      order_index: 2
    },
    {
      id: '3',
      skill: 'Real-time Data Systems',
      progress: 75,
      learning_strategy: 'WebSocket implementation + Redis caching study',
      learning_method: 'Technical documentation + coding practice',
      order_index: 3
    },
    {
      id: '4',
      skill: 'Database Design',
      progress: 70,
      learning_strategy: 'PostgreSQL docs + Supabase RLS implementation',
      learning_method: 'Official documentation + trial and error',
      order_index: 4
    },
    {
      id: '5',
      skill: 'DevOps/Docker',
      progress: 60,
      learning_strategy: 'Docker official tutorials + IONOS VPS deployment',
      learning_method: 'Online tutorials + production deployment',
      order_index: 5
    }
  ]
}