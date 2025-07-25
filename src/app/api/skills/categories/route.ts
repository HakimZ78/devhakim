import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface SkillCategory {
  id?: string
  title: string
  skills: string[]
  color: string
  icon_name: string
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skill_categories')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getDefaultSkillCategories()
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
      data: getDefaultSkillCategories()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/skills/categories ===')
    console.log('Creating new skill category:', JSON.stringify(body, null, 2))
    
    const { title, skills, color, icon_name } = body

    // Get next order index
    const { data: existingCategories } = await supabase
      .from('skill_categories')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingCategories?.[0]?.order_index || 0) + 1

    const categoryData = {
      title,
      skills: skills || [],
      color,
      icon_name,
      order_index: nextOrderIndex
    }

    console.log('Prepared categoryData for DB insert:', JSON.stringify(categoryData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('skill_categories')
      .insert([categoryData])
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
    console.log('=== PUT /api/skills/categories ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      throw new Error('Skill category ID is required for updates')
    }

    const categoryData = {
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared categoryData for DB update:', JSON.stringify(categoryData, null, 2))

    // Check if category exists
    const { data: existing, error: checkError } = await supabase
      .from('skill_categories')
      .select('id, title')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      throw new Error('Skill category not found')
    }

    console.log('=== UPDATING EXISTING SKILL CATEGORY ===')
    console.log('Current DB title:', existing[0].title)
    console.log('New title to save:', categoryData.title)
    console.log('Category ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('skill_categories')
      .update(categoryData)
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
      throw new Error('Skill category ID is required for deletion')
    }

    console.log('=== DELETE /api/skills/categories ===')
    console.log('Deleting skill category with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('skill_categories')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Skill category deleted successfully'
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
function getDefaultSkillCategories(): SkillCategory[] {
  return [
    {
      id: '1',
      title: 'Full-Stack Development',
      skills: ['Python', 'FastAPI', 'Django', 'React', 'TypeScript', 'Next.js'],
      color: 'from-blue-500 to-blue-600',
      icon_name: 'Code',
      order_index: 1
    },
    {
      id: '2', 
      title: 'Trading Analytics & Fintech',
      skills: ['Real-time Dashboards', 'WebSocket APIs', 'Data Visualization', 'Trading Signals', 'Payment Systems'],
      color: 'from-green-500 to-green-600',
      icon_name: 'Zap',
      order_index: 2
    },
    {
      id: '3',
      title: 'Backend & Data',
      skills: ['PostgreSQL', 'Supabase', 'Express.js', 'RESTful APIs', 'Database Design'],
      color: 'from-purple-500 to-purple-600',
      icon_name: 'Database',
      order_index: 3
    },
    {
      id: '4',
      title: 'DevOps & Tools',
      skills: ['Docker', 'Git', 'npm Workspaces', 'Monorepo', 'CI/CD'],
      color: 'from-orange-500 to-orange-600',
      icon_name: 'Globe',
      order_index: 4
    }
  ]
}