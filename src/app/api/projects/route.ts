import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface ProjectDetail {
  id: string
  slug: string
  title: string
  description: string
  category: 'learning' | 'fintech' | 'business' | 'personal'
  technologies: string[]
  highlights: string[]
  live_url?: string
  image_url: string
  featured: boolean
  completion_date: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'completed' | 'in-progress' | 'planning'
  overview: string
  problem_statement: string
  solution: string
  challenges: Array<{
    title: string
    description: string
    solution: string
  }>
  key_learnings: string[]
  future_enhancements: string[]
  gallery?: Array<{
    url: string
    caption: string
    type: 'image' | 'video'
  }>
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const slug = searchParams.get('slug')

    let query = supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (category) {
      query = query.eq('category', category)
    }

    let data, error

    if (slug) {
      const result = await query.eq('slug', slug).single()
      data = result.data
      error = result.error
    } else {
      const result = await query
      data = result.data
      error = result.error
    }

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: slug ? getDefaultProjectBySlug(slug) : getDefaultProjects(featured, category)
      })
    }

    return NextResponse.json({
      success: true,
      data: data || (slug ? null : [])
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: true,
      data: getDefaultProjects()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/projects ===')
    console.log('Creating new project:', JSON.stringify(body, null, 2))
    
    const {
      slug,
      title,
      description,
      category,
      technologies,
      highlights,
      live_url,
      image_url,
      featured,
      completion_date,
      difficulty,
      status,
      overview,
      problem_statement,
      solution,
      challenges,
      key_learnings,
      future_enhancements,
      gallery
    } = body

    // Get next order index
    const { data: existingProjects } = await supabase
      .from('projects')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingProjects?.[0]?.order_index || 0) + 1

    const projectData = {
      slug,
      title,
      description,
      category,
      technologies: technologies || [],
      highlights: highlights || [],
      live_url,
      image_url,
      featured: featured || false,
      completion_date,
      difficulty,
      status,
      overview,
      problem_statement,
      solution,
      challenges: challenges || [],
      key_learnings: key_learnings || [],
      future_enhancements: future_enhancements || [],
      gallery: gallery || [],
      order_index: nextOrderIndex
    }

    console.log('Prepared projectData for DB insert:', JSON.stringify(projectData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('projects')
      .insert([projectData])
      .select()
      .single()

    console.log('Insert operation result:', { data, error })
    if (error) throw error

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
    console.log('=== PUT /api/projects ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      throw new Error('Project ID is required for updates')
    }

    const projectData = {
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared projectData for DB update:', JSON.stringify(projectData, null, 2))

    // Check if project exists
    const { data: existing, error: checkError } = await supabase
      .from('projects')
      .select('id, title, slug')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      throw new Error('Project not found')
    }

    console.log('=== UPDATING EXISTING PROJECT ===')
    console.log('Current DB title:', existing[0].title)
    console.log('New title to save:', projectData.title)
    console.log('Project ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select('*')

    console.log('Update operation complete:', { updateResult, updateError })
    
    if (updateError) {
      console.error('Update failed:', updateError)
      throw updateError
    }

    const result = updateResult && updateResult.length > 0 ? updateResult[0] : null
    console.log('Update successful. New title in DB:', result?.title)
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
      throw new Error('Project ID is required for deletion')
    }

    console.log('=== DELETE /api/projects ===')
    console.log('Deleting project with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('projects')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Fallback data when database is not available
function getDefaultProjects(featured?: string | null, category?: string | null): ProjectDetail[] {
  const defaultProjects: ProjectDetail[] = [
    {
      id: 'forexacuity',
      slug: 'forexacuity',
      title: 'ForexAcuity Analytics Dashboard',
      description: 'Real-time forex analytics dashboard with MT5 integration, WebSocket architecture, and subscription payments.',
      category: 'fintech',
      technologies: ['Next.js', 'Express.js', 'Python', 'WebSockets', 'Stripe', 'MT5 API', 'PostgreSQL'],
      highlights: [
        'Sub-second real-time data updates',
        '£250 lifetime subscription model', 
        'Asian Fractal pattern detection',
        'Multi-timeframe analysis'
      ],
      live_url: 'https://forexacuity.co.uk',
      image_url: '/images/projects/forexacuity-dashboard.png',
      featured: true,
      completion_date: '2024-12-01',
      difficulty: 'advanced',
      status: 'completed',
      overview: 'ForexAcuity is a comprehensive forex trading analytics platform that provides real-time market data, technical analysis, and pattern recognition for forex traders.',
      problem_statement: 'Forex traders often struggle with fragmented tools and delayed data feeds that can cost them profitable opportunities.',
      solution: 'I developed ForexAcuity as an all-in-one solution featuring real-time data feeds from MT5, advanced pattern recognition algorithms, and a responsive web interface.',
      challenges: [
        {
          title: 'Real-time Data Synchronization',
          description: 'Ensuring sub-second data updates across multiple currency pairs without overwhelming the client or server.',
          solution: 'Implemented WebSocket connections with intelligent throttling and data compression.'
        }
      ],
      key_learnings: [
        'Real-time systems require careful consideration of data flow and bottlenecks',
        'WebSocket connections need proper error handling and reconnection logic'
      ],
      future_enhancements: [
        'Add machine learning models for price prediction',
        'Implement automated trading signals and alerts'
      ],
      order_index: 1
    },
    {
      id: 'homeeyeclinic',
      slug: 'home-eye-clinic',
      title: 'Home Eye Clinic Website',
      description: 'Professional website for UK-based home eye care service with multi-channel booking system and responsive design.',
      category: 'business',
      technologies: ['Laravel 11', 'Livewire 3', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
      highlights: [
        'Multi-channel booking system',
        'Email notifications and admin management',
        'Responsive design for elderly demographic',
        'NHS and private service integration'
      ],
      live_url: 'https://homeeyeclinic.co.uk',
      image_url: '/images/projects/home-eye-clinic-preview.jpg',
      featured: true,
      completion_date: '2024-09-30',
      difficulty: 'intermediate',
      status: 'completed',
      overview: 'Home Eye Clinic provides professional eye examinations in the comfort of patients\' homes across the UK.',
      problem_statement: 'The client needed a professional website that would appeal to elderly patients who prefer home visits.',
      solution: 'I created a clean, accessible website with multiple booking options and comprehensive service information.',
      challenges: [
        {
          title: 'Accessibility for Elderly Users',
          description: 'Designing an interface that works well for users with varying technical skills and potential vision issues.',
          solution: 'Implemented large, clear fonts, high contrast colors, simple navigation, and multiple booking options.'
        }
      ],
      key_learnings: [
        'Accessibility should be considered from the start, not added later',
        'User testing with the actual target demographic provides invaluable insights'
      ],
      future_enhancements: [
        'Add online payment processing for deposits',
        'Implement calendar integration for appointment scheduling'
      ],
      order_index: 2
    },
    {
      id: 'portfolio',
      slug: 'portfolio',
      title: 'DevHakim Portfolio',
      description: 'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
      category: 'personal',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
      highlights: [
        'Responsive design system',
        'Interactive admin system',
        'Database-driven content',
        'Phase-based implementation'
      ],
      live_url: 'https://devhakim.com',
      image_url: '/images/projects/portfolio-preview.jpg',
      featured: true,
      completion_date: '2025-01-15',
      difficulty: 'intermediate',
      status: 'in-progress',
      overview: 'This portfolio website serves as both a showcase of my technical skills and a living document of my career transition.',
      problem_statement: 'As a career changer, I needed a platform that would effectively communicate my story and demonstrate my technical abilities.',
      solution: 'I created a comprehensive portfolio with interactive elements, detailed project showcases, and a complete admin system for content management.',
      challenges: [
        {
          title: 'Performance with Rich Animations',
          description: 'Balancing engaging animations with fast loading times and smooth performance.',
          solution: 'Used Framer Motion for optimized animations, implemented lazy loading for images, and used code splitting.'
        }
      ],
      key_learnings: [
        'Next.js App Router provides excellent developer experience and performance',
        'TypeScript significantly improves code quality and developer confidence'
      ],
      future_enhancements: [
        'Add blog functionality with MDX support',
        'Implement dark mode with system preference detection'
      ],
      order_index: 3
    }
  ]

  let filteredProjects = defaultProjects

  if (featured === 'true') {
    filteredProjects = filteredProjects.filter(p => p.featured)
  }

  if (category) {
    filteredProjects = filteredProjects.filter(p => p.category === category)
  }

  return filteredProjects
}

function getDefaultProjectBySlug(slug: string): ProjectDetail | null {
  const projects = getDefaultProjects()
  return projects.find(p => p.slug === slug) || null
}