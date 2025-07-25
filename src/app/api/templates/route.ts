import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface CodeTemplate {
  id?: string
  title: string
  description: string
  category: string
  language: string
  filename: string
  content: string
  tags: string[]
  featured: boolean
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('code_templates')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getDefaultTemplates()
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
      data: getDefaultTemplates()
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== POST /api/templates ===')
    console.log('Creating new template:', JSON.stringify(body, null, 2))
    
    const {
      title,
      description,
      category,
      language,
      filename,
      content,
      tags,
      featured
    } = body

    // Get next order index
    const { data: existingTemplates } = await supabase
      .from('code_templates')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = (existingTemplates?.[0]?.order_index || 0) + 1

    const templateData = {
      title,
      description,
      category,
      language,
      filename,
      content,
      tags: tags || [],
      featured: featured || false,
      order_index: nextOrderIndex
    }

    console.log('Prepared templateData for DB insert:', JSON.stringify(templateData, null, 2))

    // Use service role client for insert (bypasses RLS)
    const { data, error } = await supabaseService
      .from('code_templates')
      .insert([templateData])
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
    console.log('=== PUT /api/templates ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { id, ...updateData } = body
    
    if (!id) {
      throw new Error('Template ID is required for updates')
    }

    const templateData = {
      ...updateData,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared templateData for DB update:', JSON.stringify(templateData, null, 2))

    // Check if template exists
    const { data: existing, error: checkError } = await supabase
      .from('code_templates')
      .select('id, title')
      .eq('id', id)
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    if (!existing || existing.length === 0) {
      throw new Error('Template not found')
    }

    console.log('=== UPDATING EXISTING TEMPLATE ===')
    console.log('Current DB title:', existing[0].title)
    console.log('New title to save:', templateData.title)
    console.log('Template ID:', existing[0].id)

    // Use service role client for update (bypasses RLS)
    console.log('Using service role client for update...')
    const { data: updateResult, error: updateError } = await supabaseService
      .from('code_templates')
      .update(templateData)
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
      throw new Error('Template ID is required for deletion')
    }

    console.log('=== DELETE /api/templates ===')
    console.log('Deleting template with ID:', id)

    // Use service role client for delete (bypasses RLS)
    const { error } = await supabaseService
      .from('code_templates')
      .delete()
      .eq('id', id)

    console.log('Delete operation result:', { error })
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully'
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
function getDefaultTemplates(): CodeTemplate[] {
  return [
    {
      id: '1',
      title: 'Express.js Server',
      description: 'Basic Express.js server setup with middleware, routes, and error handling',
      category: 'server',
      language: 'javascript',
      filename: 'server.js',
      content: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      tags: ['express', 'node', 'server', 'api'],
      featured: true,
      order_index: 1
    },
    {
      id: '2',
      title: 'Next.js API Route',
      description: 'TypeScript API route template with error handling and type safety',
      category: 'component',
      language: 'typescript',
      filename: 'route.ts',
      content: `import { NextRequest, NextResponse } from 'next/server'

interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    // Your logic here
    const data = { message: 'Hello World', id }
    
    return NextResponse.json({
      success: true,
      data
    } as ApiResponse)
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.name) {
      return NextResponse.json({
        success: false,
        error: 'Name is required'
      } as ApiResponse, { status: 400 })
    }
    
    // Your logic here
    const result = { id: Date.now(), ...body }
    
    return NextResponse.json({
      success: true,
      data: result
    } as ApiResponse)
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse, { status: 500 })
  }
}`,
      tags: ['nextjs', 'api', 'typescript', 'route'],
      featured: true,
      order_index: 2
    }
  ]
}