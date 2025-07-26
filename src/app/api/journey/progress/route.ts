import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export async function GET() {
  try {
    // Fetch categories with their progress items
    const { data: categories, error: categoriesError } = await supabaseService
      .from('progress_categories')
      .select('*')
      .order('order_index')

    if (categoriesError) {
      console.error('Error fetching progress categories:', categoriesError)
      return NextResponse.json(getDefaultProgressData())
    }

    // Fetch items for each category
    const { data: items, error: itemsError } = await supabaseService
      .from('progress_items')
      .select('*')
      .order('order_index')

    if (itemsError) {
      console.error('Error fetching progress items:', itemsError)
      return NextResponse.json(getDefaultProgressData())
    }

    // Group items by category
    const categoriesWithItems = categories.map(category => ({
      id: category.id,
      category: category.category,
      items: items.filter(item => item.category_id === category.id)
    }))

    // Return default data if no database data exists
    if (categoriesWithItems.length === 0) {
      return NextResponse.json(getDefaultProgressData())
    }

    return NextResponse.json(categoriesWithItems)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(getDefaultProgressData())
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Create or update progress category
    if (body.type === 'category') {
      const { data, error } = await supabaseService
        .from('progress_categories')
        .insert([{
          category: body.category,
          order_index: body.order_index || 0
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating progress category:', error)
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (body.id) {
      // Update progress category and its items
      const { error: categoryError } = await supabaseService
        .from('progress_categories')
        .update({
          category: body.category,
          order_index: body.order_index || 0
        })
        .eq('id', body.id)

      if (categoryError) {
        console.error('Error updating progress category:', categoryError)
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
      }

      // Delete existing items and recreate them
      await supabaseService
        .from('progress_items')
        .delete()
        .eq('category_id', body.id)

      // Insert updated items
      if (body.items && body.items.length > 0) {
        const itemsToInsert = body.items.map((item: any, index: number) => ({
          category_id: body.id,
          skill: item.skill,
          current_level: item.current_level,
          target_level: item.target_level,
          evidence: item.evidence || [],
          order_index: index,
          last_updated: new Date().toISOString()
        }))

        const { error: itemsError } = await supabaseService
          .from('progress_items')
          .insert(itemsToInsert)

        if (itemsError) {
          console.error('Error updating progress items:', itemsError)
          return NextResponse.json({ error: 'Failed to update items' }, { status: 500 })
        }
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
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
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Delete progress category (items will be deleted automatically due to CASCADE)
    const { error } = await supabaseService
      .from('progress_categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting progress category:', error)
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Progress tracking default data (fallback when database is empty)
function getDefaultProgressData() {
  return [
    {
      id: '1',
      category: 'Technical Skills',
      items: [
        {
          skill: 'Python Programming',
          current_level: 85,
          target_level: 90,
          last_updated: '2025-01-20',
          evidence: ['ForexAcuity Backend', 'Healthcare API', 'Portfolio Admin System']
        },
        {
          skill: 'React & Next.js',
          current_level: 80,
          target_level: 85,
          last_updated: '2025-01-18',
          evidence: ['Portfolio Frontend', 'Interactive Components', 'Real-time UI']
        },
        {
          skill: 'Database Design',
          current_level: 75,
          target_level: 80,
          last_updated: '2025-01-15',
          evidence: ['Supabase RLS', 'PostgreSQL Optimization', 'Data Modeling']
        }
      ]
    },
    {
      id: '2',
      category: 'Professional Development',
      items: [
        {
          skill: 'System Architecture',
          current_level: 70,
          target_level: 80,
          last_updated: '2025-01-10',
          evidence: ['Microservices Design', 'API Architecture', 'Scalability Planning']
        },
        {
          skill: 'DevOps & Deployment',
          current_level: 65,
          target_level: 75,
          last_updated: '2025-01-12',
          evidence: ['VPS Deployment', 'PM2 Process Management', 'SSL Configuration']
        }
      ]
    }
  ]
}