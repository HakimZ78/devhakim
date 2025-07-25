import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

// Anonymous client for public operations
const supabaseAnonUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseAnonUrl, supabaseAnonKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('order_index')
    
    if (error) {
      console.error('Error fetching learning paths:', error)
      return NextResponse.json(getDefaultLearningPaths())
    }
    
    // Return empty array if no data exists
    if (!data || data.length === 0) {
      return NextResponse.json([])
    }
    
    // Ensure steps is always an array (handle null/undefined)
    const pathsWithSteps = data.map(path => ({
      ...path,
      steps: path.steps || [],
      // Also add path_steps for backward compatibility with frontend
      path_steps: path.steps || []
    }))
    
    return NextResponse.json(pathsWithSteps)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(getDefaultLearningPaths())
  }
}

// Fallback data when database is not available
function getDefaultLearningPaths() {
  return [
    {
      id: '1',
      title: 'Healthcare to Tech Transition',
      description: 'Strategic pivot from pharmacy and optometry background into software engineering, leveraging analytical skills and domain expertise.',
      icon: 'Brain',
      color: 'from-blue-500 to-cyan-500',
      progress: 75,
      order_index: 1,
      path_steps: [
        { title: 'Python Fundamentals', completed: true, order_index: 1 },
        { title: 'Web Development Basics', completed: true, order_index: 2 },
        { title: 'Database Design', completed: true, order_index: 3 },
        { title: 'Full-Stack Projects', completed: false, order_index: 4 }
      ]
    },
    {
      id: '2',
      title: 'Fintech Specialization',
      description: 'Building expertise in financial technology, real-time data processing, and trading system development.',
      icon: 'DollarSign',
      color: 'from-green-500 to-emerald-500',
      progress: 60,
      order_index: 2,
      path_steps: [
        { title: 'Financial APIs', completed: true, order_index: 1 },
        { title: 'Real-time Data Streams', completed: true, order_index: 2 },
        { title: 'Trading Platform Development', completed: false, order_index: 3 },
        { title: 'Risk Management Systems', completed: false, order_index: 4 }
      ]
    }
  ]
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Ensure steps is initialized as empty array
    if (!body.steps) {
      body.steps = []
    }
    
    // Remove path_steps if it exists (backward compatibility)
    delete body.path_steps
    
    const { data, error } = await supabaseService
      .from('learning_paths')
      .insert(body)
      .select()
    
    if (error) {
      console.error('Error creating learning path:', error)
      return NextResponse.json({ success: false, error: 'Failed to create learning path' }, { status: 500 })
    }
    
    // Return with both steps and path_steps for compatibility
    const result = data[0]
    if (result) {
      result.path_steps = result.steps || []
    }
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    // Ensure steps is properly formatted if provided
    if (updateData.steps) {
      updateData.steps = Array.isArray(updateData.steps) ? updateData.steps : []
    }
    
    // Remove path_steps if it exists (backward compatibility)
    delete updateData.path_steps
    
    const { data, error } = await supabaseService
      .from('learning_paths')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating learning path:', error)
      return NextResponse.json({ success: false, error: 'Failed to update learning path' }, { status: 500 })
    }
    
    // Return with both steps and path_steps for compatibility
    const result = data[0]
    if (result) {
      result.path_steps = result.steps || []
    }
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
    }
    
    const { error } = await supabaseService
      .from('learning_paths')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting learning path:', error)
      return NextResponse.json({ success: false, error: 'Failed to delete learning path' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, message: 'Learning path deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}