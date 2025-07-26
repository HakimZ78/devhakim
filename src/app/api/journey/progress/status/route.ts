import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('Checking progress tracking database status...')

    // Check if tables exist
    const { data: categories, error: categoriesError } = await supabaseService
      .from('progress_categories')
      .select('count', { count: 'exact', head: true })

    const { data: items, error: itemsError } = await supabaseService
      .from('progress_items')
      .select('count', { count: 'exact', head: true })

    const status = {
      tables_exist: {
        progress_categories: !categoriesError,
        progress_items: !itemsError
      },
      counts: {
        categories: categories ? 'accessible' : 'error',
        items: items ? 'accessible' : 'error'
      },
      errors: {
        categories_error: categoriesError?.message || null,
        items_error: itemsError?.message || null
      }
    }

    console.log('Database status:', status)

    return NextResponse.json({
      success: true,
      status,
      message: 'Database status checked'
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to check database status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}