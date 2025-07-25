import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface CommandItem {
  id?: string
  title: string
  description: string
  command: string
  category: string
  project_source: string
  tags: string[]
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getDefaultCommands()
      })
    }

    return NextResponse.json({
      success: true,
      data: data || []
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: true,
      data: getDefaultCommands()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/commands ===')
    console.log('Creating new command:', JSON.stringify(body, null, 2))
    
    const {
      title,
      description,
      command,
      category,
      project_source,
      tags
    } = body

    // Get next order index
    const { data: existingCommands } = await supabase
      .from('commands')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingCommands?.[0]?.order_index || 0) + 1

    const commandData = {
      title,
      description,
      command,
      category,
      project_source,
      tags: tags || [],
      order_index: nextOrderIndex
    }

    console.log('Prepared commandData for DB insert:', JSON.stringify(commandData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('commands')
      .insert([commandData])
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
    console.log('=== PUT /api/commands ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      throw new Error('Command ID is required for updates')
    }

    const commandData = {
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared commandData for DB update:', JSON.stringify(commandData, null, 2))

    // Check if command exists
    const { data: existing, error: checkError } = await supabase
      .from('commands')
      .select('id, title')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      throw new Error('Command not found')
    }

    console.log('=== UPDATING EXISTING COMMAND ===')
    console.log('Current DB title:', existing[0].title)
    console.log('New title to save:', commandData.title)
    console.log('Command ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('commands')
      .update(commandData)
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
      throw new Error('Command ID is required for deletion')
    }

    console.log('=== DELETE /api/commands ===')
    console.log('Deleting command with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('commands')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Command deleted successfully'
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
function getDefaultCommands(): CommandItem[] {
  return [
    {
      id: '1',
      title: 'Start Development Server',
      description: 'Start the Next.js development server with hot reloading',
      command: 'npm run dev',
      category: 'development',
      project_source: 'Portfolio',
      tags: ['nextjs', 'development', 'server'],
      order_index: 1
    },
    {
      id: '2',
      title: 'Build Production',
      description: 'Build the application for production deployment',
      command: 'npm run build',
      category: 'deployment',
      project_source: 'Portfolio', 
      tags: ['nextjs', 'build', 'production'],
      order_index: 2
    },
    {
      id: '3',
      title: 'Install Dependencies',
      description: 'Install all project dependencies from package.json',
      command: 'npm install',
      category: 'setup',
      project_source: 'General',
      tags: ['npm', 'dependencies', 'setup'],
      order_index: 3
    },
    {
      id: '4',
      title: 'Docker Build',
      description: 'Build Docker image for the application',
      command: 'docker build -t portfolio .',
      category: 'docker',
      project_source: 'Portfolio',
      tags: ['docker', 'build', 'container'],
      order_index: 4
    },
    {
      id: '5',
      title: 'Check Types',
      description: 'Run TypeScript type checking',
      command: 'npm run type-check',
      category: 'development',
      project_source: 'Portfolio',
      tags: ['typescript', 'types', 'check'],
      order_index: 5
    }
  ]
}