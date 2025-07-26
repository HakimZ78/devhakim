import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export async function POST() {
  try {
    console.log('Starting progress tracking data migration...')

    // Clear existing data first
    console.log('Clearing existing progress data...')
    const clearResults = await Promise.all([
      supabaseService.from('progress_items').delete().gte('created_at', '1900-01-01'),
      supabaseService.from('progress_categories').delete().gte('created_at', '1900-01-01')
    ])
    
    console.log('Clear results:', clearResults.map(result => ({ error: result.error?.message })))

    // Default progress data to migrate
    const progressData = [
      {
        category: 'Technical Skills',
        order_index: 1,
        items: [
          {
            skill: 'Python Programming',
            current_level: 85,
            target_level: 90,
            evidence: ['ForexAcuity Backend', 'Healthcare API', 'Portfolio Admin System'],
            order_index: 1
          },
          {
            skill: 'React & Next.js',
            current_level: 80,
            target_level: 85,
            evidence: ['Portfolio Frontend', 'Interactive Components', 'Real-time UI'],
            order_index: 2
          },
          {
            skill: 'Database Design',
            current_level: 75,
            target_level: 80,
            evidence: ['Supabase RLS', 'PostgreSQL Optimization', 'Data Modeling'],
            order_index: 3
          }
        ]
      },
      {
        category: 'Professional Development',
        order_index: 2,
        items: [
          {
            skill: 'System Architecture',
            current_level: 70,
            target_level: 80,
            evidence: ['Microservices Design', 'API Architecture', 'Scalability Planning'],
            order_index: 1
          },
          {
            skill: 'DevOps & Deployment',
            current_level: 65,
            target_level: 75,
            evidence: ['VPS Deployment', 'PM2 Process Management', 'SSL Configuration'],
            order_index: 2
          }
        ]
      }
    ]

    let totalCategoriesCreated = 0
    let totalItemsCreated = 0

    for (const categoryData of progressData) {
      console.log(`Creating category: ${categoryData.category}`)
      
      // Create progress category
      const { data: categoryResult, error: categoryError } = await supabaseService
        .from('progress_categories')
        .insert([{
          category: categoryData.category,
          order_index: categoryData.order_index
        }])
        .select()
        .single()

      if (categoryError) {
        console.error('Category creation error:', categoryError)
        throw new Error(`Failed to create category: ${categoryError.message}`)
      }

      totalCategoriesCreated++
      console.log(`✅ Category created with ID: ${categoryResult.id}`)

      // Create progress items for this category
      if (categoryData.items && categoryData.items.length > 0) {
        const itemsToInsert = categoryData.items.map(item => ({
          category_id: categoryResult.id,
          skill: item.skill,
          current_level: item.current_level,
          target_level: item.target_level,
          evidence: item.evidence,
          order_index: item.order_index,
          last_updated: new Date().toISOString()
        }))

        console.log(`Inserting ${itemsToInsert.length} progress items for ${categoryData.category}`)
        
        const { error: itemsError } = await supabaseService
          .from('progress_items')
          .insert(itemsToInsert)

        if (itemsError) {
          console.error('Items creation error:', itemsError)
          throw new Error(`Failed to create items: ${itemsError.message}`)
        }

        totalItemsCreated += itemsToInsert.length
        console.log(`✅ ${itemsToInsert.length} progress items created`)
      }
    }

    console.log('Progress tracking data migration completed successfully!')

    return NextResponse.json({
      success: true,
      message: 'Progress tracking data migrated successfully',
      migrated: {
        categories: totalCategoriesCreated,
        items: totalItemsCreated
      }
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to migrate progress tracking data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}