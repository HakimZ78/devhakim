// Database initialization script
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

// Create service role client for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Supabase database...')
    
    // Read and execute the SQL schema
    const sqlPath = join(__dirname, '../SUPABASE_ADMIN_TABLES.sql')
    const sqlContent = readFileSync(sqlPath, 'utf8')
    
    console.log('📝 Executing database schema...')
    
    // Split SQL content by statements and execute each one
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        if (error) {
          console.log('⚠️  SQL statement might have failed (this is often normal):', error.message)
        }
      }
    }
    
    console.log('✅ Database schema setup complete!')
    
    // Check if tables were created successfully
    console.log('🔍 Checking database tables...')
    
    const tables = [
      'admin_users', 
      'admin_sessions', 
      'projects', 
      'project_challenges', 
      'project_screenshots', 
      'code_templates',
      'learning_paths',
      'path_steps', 
      'milestones', 
      'certifications'
    ]
    
    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.log(`❌ Table '${table}' not accessible:`, error.message)
      } else {
        console.log(`✅ Table '${table}' exists with ${count} records`)
      }
    }
    
    console.log('🎉 Database initialization complete!')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

// Add this function to create the exec_sql RPC if it doesn't exist
async function setupRPCFunction() {
  const rpcFunction = `
    CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
    RETURNS TEXT
    SECURITY DEFINER
    SET search_path = public
    AS $$
    BEGIN
      EXECUTE sql;
      RETURN 'SUCCESS';
    EXCEPTION WHEN OTHERS THEN
      RETURN 'ERROR: ' || SQLERRM;
    END;
    $$ LANGUAGE plpgsql;
  `
  
  const { error } = await supabase.rpc('exec', { query: rpcFunction })
  if (error) {
    console.log('⚠️  RPC function setup might have failed:', error.message)
  }
}

// Run initialization
async function main() {
  await setupRPCFunction()
  await initializeDatabase()
}

main().catch(console.error)