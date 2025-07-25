# DevHakim Portfolio - Claude.md

## Project Overview
Next.js portfolio website for Hakim's career transition from healthcare to software engineering. The project features a comprehensive admin system for daily content management alongside a polished public portfolio interface.

### Key Features
- Interactive hero section with role rotation
- Skills showcase with categories and current focus areas
- Featured projects display with detailed project pages
- Learning journey timeline with milestones
- Comprehensive admin system for content management
- Database-driven content with real-time updates
- Responsive design with mobile navigation
- Authentication-protected admin routes

## Tech Stack
- **Framework**: Next.js 14 with TypeScript and App Router
- **Styling**: Tailwind CSS v4 with custom gradients
- **Animations**: Framer Motion for smooth interactions
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with service role bypass for admin operations
- **Icons**: Lucide React icon library
- **State Management**: React Context API (GlobalAdminContext)
- **Deployment**: IONOS VPS via SSH

## Architecture

### Database Design
```sql
-- Core content tables
hero_content          # Homepage hero section content
projects             # Portfolio projects with detailed metadata
skill_categories     # Grouped skills with colors and icons
skill_focus          # Current learning focus with progress tracking
milestones           # Timeline events and achievements
code_templates       # Reusable code snippets and examples
```

### Authentication Strategy
- **Public Access**: Anonymous Supabase client with RLS policies for read operations
- **Admin Operations**: Service role client bypassing RLS for write operations
- **Security**: Environment-based service role key, server-side only
- **Context**: GlobalAdminContext manages authentication state across admin routes

### Project Structure
```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with Navigation/Footer
│   ├── page.tsx           # Public homepage
│   ├── admin/             # Admin-only routes
│   │   ├── dashboard/     # Admin dashboard
│   │   └── content/       # Content management pages
│   │       ├── hero/      # Hero content editor
│   │       ├── projects/  # Projects CRUD interface
│   │       ├── skills/    # Skills categories & focus management
│   │       └── timeline/  # Timeline/milestones editor
│   ├── api/               # API routes with service role authentication
│   │   ├── hero/          # Hero content CRUD
│   │   ├── projects/      # Projects CRUD with filtering
│   │   ├── skills/        # Skills categories and focus CRUD
│   │   └── journey/       # Timeline/milestones CRUD
│   ├── projects/          # Public projects pages
│   ├── blog/              # Blog functionality
│   ├── journey/           # Public learning journey
│   └── commands/          # Development commands reference
├── components/            # Reusable React components
│   ├── home/              # Homepage-specific components
│   ├── layout/            # Navigation, Footer, AdminWrapper
│   ├── animations/        # Framer Motion components
│   └── [feature]/         # Feature-specific components
├── contexts/              # React Context providers
│   └── GlobalAdminContext.tsx  # Admin authentication state
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## Admin System Implementation

### Stage-Based Development
The admin system was implemented in systematic stages:

1. **Stage 1-3**: Basic admin routing, authentication, and dashboard skeleton
2. **Stage 4**: Database migration of all static content to Supabase
3. **Stage 5**: Full CRUD interfaces for each content type

### Admin Interface Features

#### Hero Content Manager (`/admin/content/hero`)
- Personal information editing (name, subtitle, description)
- Dynamic roles management with add/remove functionality
- Call-to-action buttons configuration
- Social links management
- Real-time preview of changes
- Form validation and error handling

#### Projects Manager (`/admin/content/projects`)
- **List View**: Grid display with status badges, technology tags, action buttons
- **Edit Form**: Comprehensive project details including:
  - Basic info (title, slug, category, status, difficulty, dates)
  - Technologies stack (dynamic add/remove)
  - Project highlights (dynamic add/remove)
  - Detailed content (overview, problem statement, solution)
  - Key learnings (dynamic add/remove)
  - Future enhancements (dynamic add/remove)
- **Create/Edit/Delete**: Full CRUD operations with confirmation dialogs
- **Real-time Updates**: UI updates immediately after operations

#### Skills Manager (`/admin/content/skills`)
- **Tabbed Interface**: Switch between "Skill Categories" and "Current Focus"
- **Categories Management**:
  - Visual category builder with gradient color selection
  - Icon selection from predefined options
  - Dynamic skills list management within categories
  - Live preview with actual gradient rendering
- **Focus Areas Management**:
  - Current learning skills with progress tracking
  - Interactive progress slider (0-100%)
  - Visual progress bars with animations
- **Full CRUD**: Complete management for both categories and focus areas

### API Design Patterns

#### Consistent Route Structure
```typescript
GET    /api/[resource]           # Fetch all or filtered items
POST   /api/[resource]           # Create new item
PUT    /api/[resource]           # Update existing item
DELETE /api/[resource]?id=xxx    # Delete item by ID
```

#### Authentication Pattern
```typescript
// Read operations - anonymous client
const { data, error } = await supabase
  .from('table_name')
  .select('*')

// Write operations - service role client
const { data, error } = await supabaseService
  .from('table_name')
  .insert([data])
```

#### Error Handling
- Comprehensive logging for debugging
- Graceful fallbacks to default data
- User-friendly error messages
- Server-side validation with detailed feedback

## Development Commands
```bash
# Install dependencies
npm install

# Run development server (auto-detects available port)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Kill port processes (if needed)
lsof -ti:3000 | xargs kill -9
```

## Database Management

### Supabase Setup
```sql
-- Enable RLS on all tables
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read [table]" ON [table] FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Authenticated can modify [table]" ON [table] 
FOR ALL USING (auth.role() = 'authenticated');
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
SUPABASE_SERVICE_ROLE_KEY=[service_role_key]
SUPABASE_JWT_SECRET=[jwt_secret]
```

## Deployment Strategy
- **Platform**: IONOS VPS via SSH
- **Process**: 
  1. Build locally: `npm run build`
  2. Deploy via SSH/SCP
  3. Serve using Next.js production server
- **Environment**: Production environment variables configured on server

## Security Considerations
- Service role key stored server-side only
- Row Level Security enabled on all tables
- Public routes accessible without authentication
- Admin routes protected by context-based authentication
- Input validation on both client and server
- SQL injection prevention through Supabase client

## Performance Optimizations
- Database-driven content with efficient caching
- Optimized bundle splitting with Next.js
- Lazy loading for admin interfaces
- Efficient state management with React Context
- Minimal API calls with batched operations

## Known Issues & Solutions

### Resolved Issues
1. **RLS Authentication**: Fixed by implementing service role client for admin operations
2. **Hero Content Updates**: Resolved persistence issues with proper error handling
3. **Database Schema**: Complete migration from static files to database-driven content

### Current Status
- ✅ Hero content management fully functional
- ✅ Projects management with full CRUD operations
- ✅ Skills management with categories and focus areas
- 🚧 Timeline management (pending)
- 📋 All admin interfaces follow consistent design patterns

## Future Enhancements
- Blog functionality with MDX support
- Contact form with backend integration
- Dark mode with system preference detection
- Advanced project filtering and search
- Analytics dashboard for content engagement
- Mobile-optimized admin interfaces

## Content Management Workflow
1. **Daily Updates**: Admin can modify any content through dedicated interfaces
2. **Real-time Changes**: Updates reflect immediately on public site
3. **Content Types**: Hero, Projects, Skills, Timeline all manageable
4. **User Experience**: Success/error feedback, loading states, confirmation dialogs
5. **Data Integrity**: Comprehensive validation, error handling, rollback capabilities

This portfolio serves as both a professional showcase and a demonstration of full-stack development capabilities, featuring a production-ready admin system for ongoing content management.