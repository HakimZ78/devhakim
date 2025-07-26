import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select(`
        *,
        path_steps (*)
      `)
      .order('order_index')
    
    if (error) {
      console.error('Error fetching learning paths:', error)
      // Return fallback data if database isn't available
      return NextResponse.json(getDefaultLearningPaths())
    }
    
    // Return empty array if no data exists (after migration)
    if (!data || data.length === 0) {
      return NextResponse.json([])
    }
    
    return NextResponse.json(data)
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
    
    const { data, error } = await supabase
      .from('learning_paths')
      .insert(body)
      .select()
    
    if (error) {
      console.error('Error creating learning path:', error)
      return NextResponse.json({ error: 'Failed to create learning path' }, { status: 500 })
    }
    
    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    const { data, error } = await supabase
      .from('learning_paths')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating learning path:', error)
      return NextResponse.json({ error: 'Failed to update learning path' }, { status: 500 })
    }
    
    return NextResponse.json(data[0])
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
    
    const { error } = await supabase
      .from('learning_paths')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting learning path:', error)
      return NextResponse.json({ error: 'Failed to delete learning path' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, message: 'Learning path deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}