import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('order_index')
    
    if (error) {
      console.error('Error fetching certifications:', error)
      // Return fallback data if database isn't available
      return NextResponse.json(getDefaultCertifications())
    }
    
    // If no data exists, return default certifications
    if (!data || data.length === 0) {
      return NextResponse.json(getDefaultCertifications())
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(getDefaultCertifications())
  }
}

// Fallback data when database is not available
function getDefaultCertifications() {
  return [
    {
      id: '1',
      title: 'Python Developer Certificate',
      issuer: 'FreeCodeCamp',
      date_earned: '2023-06-15',
      credential_id: 'PY2023-1234',
      status: 'completed',
      description: 'Comprehensive Python programming certification covering fundamentals, data structures, and web development.',
      skills: ['Python', 'Flask', 'APIs', 'Data Structures'],
      certificate_pdf: '/certificates/freecodecamp-python.pdf',
      order_index: 1
    },
    {
      id: '2',
      title: 'Full Stack Web Development',
      issuer: 'The Odin Project',
      date_earned: '2024-03-20',
      credential_id: 'FS2024-5678',
      status: 'completed',
      description: 'Complete full-stack development curriculum including JavaScript, React, Node.js, and database management.',
      skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Git'],
      certificate_pdf: '/certificates/odin-project-fullstack.pdf',
      order_index: 2
    }
  ]
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('certifications')
      .insert(body)
      .select()
    
    if (error) {
      console.error('Error creating certification:', error)
      return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
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
      .from('certifications')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating certification:', error)
      return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 })
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
      .from('certifications')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting certification:', error)
      return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, message: 'Certification deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}