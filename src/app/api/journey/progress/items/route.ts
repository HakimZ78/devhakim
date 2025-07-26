import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface ProgressItem {
  id?: string
  skill: string
  current_level: number
  target_level: number
  last_updated?: string
  category_id: string
  created_at?: string
  updated_at?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')

    if (!categoryId) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('progress_items')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      items: data || []
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/journey/progress/items ===')
    console.log('Creating new progress item:', JSON.stringify(body, null, 2))
    
    const {
      skill,
      current_level,
      target_level,
      category_id
    } = body

    if (!skill?.trim()) {
      return NextResponse.json({ success: false, error: 'Skill name is required' }, { status: 400 })
    }

    if (!category_id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 })
    }

    const itemData = {
      skill: skill.trim(),
      current_level: current_level || 0,
      target_level: target_level || 100,
      category_id,
      last_updated: new Date().toISOString()
    }

    console.log('Prepared itemData for DB insert:', JSON.stringify(itemData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('progress_items')
      .insert([itemData])
      .select()
      .single()

    console.log('Insert operation result:', { data, error })
    if (error) {
      console.error('Insert failed:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

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
    console.log('=== PUT /api/journey/progress/items ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Item ID is required for updates' }, { status: 400 })
    }

    const itemData = {
      ...updateData,
      last_updated: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared itemData for DB update:', JSON.stringify(itemData, null, 2))

    // Check if item exists
    const { data: existing, error: checkError } = await supabase
      .from('progress_items')
      .select('id, skill')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      return NextResponse.json({ success: false, error: 'Progress item not found' }, { status: 404 })
    }

    console.log('=== UPDATING EXISTING PROGRESS ITEM ===')
    console.log('Current DB skill:', existing[0].skill)
    console.log('New skill to save:', itemData.skill)
    console.log('Item ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('progress_items')
      .update(itemData)
      .eq('id', id)
      .select('*')

    console.log('Update operation complete:', { updateResult, updateError })
    
    if (updateError) {
      console.error('Update failed:', updateError)
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
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
      return NextResponse.json({ success: false, error: 'Item ID is required for deletion' }, { status: 400 })
    }

    console.log('=== DELETE /api/journey/progress/items ===')
    console.log('Deleting progress item with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('progress_items')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) {
      console.error('Delete failed:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Progress item deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}