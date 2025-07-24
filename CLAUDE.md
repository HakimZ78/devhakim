# DevHakim Portfolio - Claude.md

## Project Overview
Next.js portfolio website for Hakim's career transition from healthcare to software engineering. Features include:
- Interactive hero section with role rotation
- Skills showcase with animations
- Featured projects display
- Learning journey timeline
- Blog functionality
- Commands reference section
- Responsive design with mobile navigation

## Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase
- **Icons**: Lucide React
- **Deployment**: IONOS VPS via SSH

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with Navigation/Footer
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects section
│   ├── blog/              # Blog pages
│   ├── journey/           # Learning journey
│   └── commands/          # Commands reference
├── components/            # Reusable components
│   ├── home/              # Home page components
│   ├── layout/            # Navigation, Footer
│   ├── animations/        # Animation components
│   └── [feature]/         # Feature-specific components
├── data/                  # Static data files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment
- Deployed on IONOS VPS via SSH
- Build process: `npm run build`
- Served using Next.js production server

## Known Issues (Current)
1. **Mobile Layout**: Hero title "Hi, I'm Hakim" positioned too high, covering DevHakim logo
2. **Missing Contact Page**: Navigation links to /contact but page doesn't exist

## Recent Changes
- Initial setup and structure implementation
- Hero section with animated role rotation
- Responsive navigation with mobile menu
- Skills showcase and project displays
- Journey timeline functionality