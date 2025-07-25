import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface TimelineEvent {
  id?: string
  date: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming'
  category: string
  details: string[]
  order_index?: number
  created_at?: string
  updated_at?: string
}

// Create timeline_events table if using existing schema
// This maps to the milestones table structure
const TIMELINE_TABLE = 'milestones'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from(TIMELINE_TABLE)
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getLocalTimelineEvents()
      })
    }

    // Transform database data to timeline event format
    const timelineEvents = data?.map(item => ({
      id: item.id,
      date: item.target_date || 'Date TBD',
      title: item.title,
      description: item.description,
      status: item.completed ? 'completed' : (item.progress > 0 ? 'in-progress' : 'upcoming'),
      category: item.category.toLowerCase(),
      details: [
        `Progress: ${item.progress}%`,
        ...(item.completion_date ? [`Completed: ${item.completion_date}`] : []),
        ...(item.target_date ? [`Target: ${item.target_date}`] : [])
      ],
      order_index: item.order_index
    })) || []

    return NextResponse.json({
      success: true,
      data: timelineEvents
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: true,
      data: getLocalTimelineEvents()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, title, description, status, category, details } = body

    // Get next order index
    const { data: existingEvents } = await supabase
      .from(TIMELINE_TABLE)
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingEvents?.[0]?.order_index || 0) + 1

    // Transform timeline event to milestone format
    const milestoneData = {
      title,
      description,
      target_date: date,
      completed: status === 'completed',
      completion_date: status === 'completed' ? new Date().toISOString().split('T')[0] : null,
      progress: status === 'completed' ? 100 : (status === 'in-progress' ? 50 : 0),
      category: category.charAt(0).toUpperCase() + category.slice(1),
      order_index: nextOrderIndex
    }

    const { data, error } = await supabase
      .from(TIMELINE_TABLE)
      .insert([milestoneData])
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
    console.error('Create error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Fallback data when database is not available
function getLocalTimelineEvents(): TimelineEvent[] {
  return [
    {
      id: '1',
      date: 'January 2024',
      title: 'Career Transition Decision',
      description: 'Made the decision to transition from healthcare (optometry) to software engineering',
      status: 'completed',
      category: 'milestone',
      details: ['Researched career paths', 'Identified fintech opportunity', 'Started learning plan'],
      order_index: 1
    },
    {
      id: '2',
      date: 'February 2024',
      title: 'Programming Foundation',
      description: 'Started intensive programming learning focusing on full-stack development',
      status: 'completed',
      category: 'learning',
      details: ['Programming basics & OOP', 'FastAPI framework', 'Database fundamentals'],
      order_index: 2
    },
    {
      id: '3',
      date: 'March 2024',
      title: 'MSc Computer Science',
      description: 'Enrolled in MSc Computer Science conversion course',
      status: 'completed',
      category: 'education',
      details: ['Algorithms & Data Structures', 'Software Engineering', 'Database Systems'],
      order_index: 3
    },
    {
      id: '4',
      date: 'December 2024',
      title: 'ForexAcuity Launch',
      description: 'Successfully launched production analytics dashboard with paying users',
      status: 'completed',
      category: 'milestone',
      details: ['Production deployment', 'Real-time monitoring', '£250 subscriptions'],
      order_index: 4
    },
    {
      id: '5',
      date: 'January 2025',
      title: 'Portfolio Development',
      description: 'Building comprehensive portfolio to showcase technical journey',
      status: 'in-progress',
      category: 'project',
      details: ['Next.js portfolio site', 'Command reference table', 'Journey documentation'],
      order_index: 5
    },
    {
      id: '6',
      date: 'Summer 2025',
      title: 'First Developer Role',
      description: 'Target: Secure first professional software engineering position',
      status: 'upcoming',
      category: 'goal',
      details: ['Full-stack role', 'Fintech industry preferred', 'Remote-friendly company'],
      order_index: 6
    }
  ]
}