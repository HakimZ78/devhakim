import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Log the client configuration
console.log('Supabase client config:', {
  url: supabaseUrl ? 'SET' : 'MISSING',
  key: supabaseAnonKey ? 'SET' : 'MISSING'
})

// Create a service role client for updates (bypasses RLS)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export interface HeroContent {
  id?: string
  name: string
  subtitle: string
  roles: string[]
  description: string
  primary_cta_text: string
  primary_cta_link: string
  secondary_cta_text: string
  secondary_cta_link: string
  linkedin_url: string
  email: string
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Database error:', error)
      // Return fallback data if database isn't available
      return NextResponse.json({
        success: true,
        data: getDefaultHeroContent()
      })
    }

    // If we have data, return the first row, otherwise return default
    const heroData = data && data.length > 0 ? data[0] : getDefaultHeroContent()

    return NextResponse.json({
      success: true,
      data: heroData
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: true,
      data: getDefaultHeroContent()
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== PUT /api/hero ===')
    console.log('Received data from frontend:', JSON.stringify(body, null, 2))
    
    const { 
      name, 
      subtitle, 
      roles, 
      description, 
      primary_cta_text, 
      primary_cta_link,
      secondary_cta_text,
      secondary_cta_link,
      linkedin_url,
      email
    } = body

    const heroData = {
      name,
      subtitle,
      roles,
      description,
      primary_cta_text,
      primary_cta_link,
      secondary_cta_text,
      secondary_cta_link,
      linkedin_url,
      email,
      updated_at: new Date().toISOString()
    }
    
    console.log('Prepared heroData for DB update:', JSON.stringify(heroData, null, 2))

    // Check if hero content exists (using regular client for read)
    const { data: existing, error: checkError } = await supabase
      .from('hero_content')
      .select('id, name, subtitle')
      .limit(1)

    console.log('Existing record check:', { existing, checkError })

    let result
    if (existing && existing.length > 0) {
      console.log('=== UPDATING EXISTING RECORD ===')
      console.log('Current DB name:', existing[0].name)
      console.log('New name to save:', heroData.name)
      console.log('Record ID:', existing[0].id)

      // Use service role client for update (bypasses RLS)
      console.log('Using service role client for update...')
      const { data: updateResult, error: updateError } = await supabaseService
        .from('hero_content')
        .update(heroData)
        .eq('id', existing[0].id)
        .select('*')

      console.log('Update operation complete:', { updateResult, updateError })
      
      if (updateError) {
        console.error('Update failed:', updateError)
        throw updateError
      }

      if (updateResult && updateResult.length > 0) {
        result = updateResult[0]
        console.log('Update successful. New name in DB:', result.name)
      } else {
        console.log('Update returned no data, fetching manually...')
        const { data: fetchedData, error: fetchError } = await supabaseService
          .from('hero_content')
          .select('*')
          .eq('id', existing[0].id)
          .single()

        console.log('Manual fetch result:', { fetchedData, fetchError })
        if (fetchError) throw fetchError
        result = fetchedData
      }
    } else {
      console.log('=== CREATING NEW RECORD ===')
      // Use service role client for insert (bypasses RLS)
      const { data, error } = await supabaseService
        .from('hero_content')
        .insert([heroData])
        .select('*')

      console.log('Insert operation result:', { data, error })
      if (error) throw error
      result = data && data.length > 0 ? data[0] : null
    }

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

// Fallback data when database is not available
function getDefaultHeroContent(): HeroContent {
  return {
    id: '1',
    name: 'Hakim',
    subtitle: 'Healthcare → Tech Transition',
    roles: ['Full-Stack Developer', 'Fintech Engineer', 'Python Developer', 'React Developer'],
    description: "As a healthcare professional and active retail trader transitioning to tech, I bring analytical rigor, patient-focused problem-solving, and experience managing complex systems under pressure. My background spans pharmacy, optometry, and financial markets - providing unique insights for healthcare tech, fintech solutions, and understanding how end-users actually interact with complex systems. This diverse experience led me to build ForexAcuity, a real-time trading analytics platform, solving problems I personally faced as a trader. Looking to contribute these cross-industry perspectives to teams that value diverse backgrounds and foster collaborative learning cultures.",
    primary_cta_text: 'View My Projects',
    primary_cta_link: '#projects',
    secondary_cta_text: 'My Learning Journey',
    secondary_cta_link: '#journey',
    linkedin_url: 'https://www.linkedin.com/in/zaehid-hakim-1004016b',
    email: 'zaehid.hakim78@gmail.com'
  }
}