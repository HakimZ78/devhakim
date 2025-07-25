import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Initializing database tables...')

    // Check if tables exist by trying to query them
    const tables = [
      'learning_paths',
      'path_steps', 
      'milestones',
      'certifications',
      'projects',
      'code_templates'
    ]

    const results = []
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          results.push(`❌ Table '${table}': ${error.message}`)
        } else {
          results.push(`✅ Table '${table}': ${count} records`)
        }
      } catch (err) {
        results.push(`❌ Table '${table}': Not accessible`)
      }
    }

    // Initialize with sample data for journey tables if they're empty
    await initializeJourneyData()
    
    return NextResponse.json({
      success: true,
      message: 'Database initialization attempted',
      results
    })

  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function initializeJourneyData() {
  try {
    // Check if learning_paths table has data
    const { count: pathsCount } = await supabase
      .from('learning_paths')
      .select('*', { count: 'exact', head: true })

    if (pathsCount === 0) {
      // Insert initial learning paths
      const { data: pathsData, error: pathsError } = await supabase
        .from('learning_paths')
        .insert([
          {
            title: 'AI/Healthcare Engineer',
            description: 'Combining healthcare domain knowledge with AI/ML technologies',
            icon: 'Brain',
            color: 'from-purple-500 to-pink-500',
            progress: 65,
            order_index: 1
          },
          {
            title: 'Full-Stack Python',
            description: 'End-to-end web development with Python and modern frameworks',
            icon: 'Code',
            color: 'from-blue-500 to-cyan-500',
            progress: 80,
            order_index: 2
          },
          {
            title: 'Fintech Developer',
            description: 'Specialized in financial technology and trading systems',
            icon: 'DollarSign',
            color: 'from-green-500 to-emerald-500',
            progress: 75,
            order_index: 3
          }
        ])
        .select()

      if (pathsError) {
        console.error('Error inserting learning paths:', pathsError)
      } else {
        console.log('✅ Inserted learning paths:', pathsData?.length)
      }
    }

    // Check if milestones table has data
    const { count: milestonesCount } = await supabase
      .from('milestones')
      .select('*', { count: 'exact', head: true })

    if (milestonesCount === 0) {
      const { data: milestonesData, error: milestonesError } = await supabase
        .from('milestones')
        .insert([
          {
            title: 'ForexAcuity Platform Launch',
            description: 'Built and deployed real-time forex trading platform with Python/FastAPI backend',
            target_date: '2024-10-15',
            completed: true,
            completion_date: '2024-10-15',
            progress: 100,
            category: 'Project',
            order_index: 1
          },
          {
            title: 'MSc Computer Science',
            description: 'Complete Master\'s degree in Computer Science with focus on AI/ML',
            target_date: '2025-09-30',
            completed: false,
            progress: 75,
            category: 'Education',
            order_index: 2
          },
          {
            title: 'First Developer Role',
            description: 'Secure first professional software development position',
            target_date: '2025-06-01',
            completed: false,
            progress: 25,
            category: 'Career',
            order_index: 3
          }
        ])
        .select()

      if (milestonesError) {
        console.error('Error inserting milestones:', milestonesError)
      } else {
        console.log('✅ Inserted milestones:', milestonesData?.length)
      }
    }

    // Check if certifications table has data
    const { count: certsCount } = await supabase
      .from('certifications')
      .select('*', { count: 'exact', head: true })

    if (certsCount === 0) {
      const { data: certsData, error: certsError } = await supabase
        .from('certifications')
        .insert([
          {
            title: 'MSc Computer Science',
            provider: 'University of London',
            description: 'Master\'s degree focusing on Machine Learning, AI, and Software Engineering',
            status: 'in_progress',
            expected_date: '2025-09-30',
            skills: ['Machine Learning', 'AI', 'Algorithms', 'Software Engineering', 'Research'],
            order_index: 1
          },
          {
            title: 'AWS Solutions Architect Associate',
            provider: 'Amazon Web Services',
            description: 'Cloud architecture and AWS services expertise',
            status: 'planned',
            expected_date: '2025-03-15',
            skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security', 'Scalability'],
            order_index: 2
          },
          {
            title: 'FastAPI - The Complete Course',
            provider: 'Udemy',
            description: 'Comprehensive FastAPI development from basics to advanced features',
            status: 'completed',
            completion_date: '2024-08-15',
            skills: ['FastAPI', 'Python', 'API Development', 'Authentication', 'Testing'],
            order_index: 3
          }
        ])
        .select()

      if (certsError) {
        console.error('Error inserting certifications:', certsError)
      } else {
        console.log('✅ Inserted certifications:', certsData?.length)
      }
    }

  } catch (error) {
    console.error('Error initializing journey data:', error)
  }
}