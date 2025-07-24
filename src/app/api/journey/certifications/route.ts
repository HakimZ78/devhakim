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
      return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
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