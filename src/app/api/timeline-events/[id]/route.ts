import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const TIMELINE_TABLE = 'milestones'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Timeline event ID is required'
      }, { status: 400 })
    }

    const { error } = await supabase
      .from(TIMELINE_TABLE)
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Timeline event deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { date, title, description, status, category, details } = body

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Timeline event ID is required'
      }, { status: 400 })
    }

    // Transform timeline event to milestone format
    const milestoneData = {
      title,
      description,
      target_date: date,
      completed: status === 'completed',
      completion_date: status === 'completed' ? new Date().toISOString().split('T')[0] : null,
      progress: status === 'completed' ? 100 : (status === 'in-progress' ? 50 : 0),
      category: category.charAt(0).toUpperCase() + category.slice(1),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from(TIMELINE_TABLE)
      .update(milestoneData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Transform back to timeline format for response
    const timelineEvent = {
      id: data.id,
      date: data.target_date,
      title: data.title,
      description: data.description,
      status: data.completed ? 'completed' : (data.progress > 0 ? 'in-progress' : 'upcoming'),
      category: data.category.toLowerCase(),
      details: [
        `Progress: ${data.progress}%`,
        ...(data.completion_date ? [`Completed: ${data.completion_date}`] : []),
        ...(data.target_date ? [`Target: ${data.target_date}`] : [])
      ],
      order_index: data.order_index
    }

    return NextResponse.json({
      success: true,
      data: timelineEvent
    })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}