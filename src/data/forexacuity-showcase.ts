// ForexAcuity Project Data for Portfolio Showcase

export const forexAcuityProject = {
  id: 'forexacuity',
  title: 'ForexAcuity Trading Platform',
  subtitle: 'Premium Forex Trading Signals Platform with Real-time EA Integration',
  category: 'fintech' as const,
  featured: true,
  completionDate: new Date('2024-12-01'),
  difficulty: 'advanced' as const,
  
  description: `A sophisticated forex trading signals platform that bridges MetaTrader 5 Expert Advisors with modern web technologies. 
  Built as a monorepo architecture featuring real-time WebSocket communication, payment processing, and advanced trading analytics.`,
  
  highlights: [
    'Real-time trading signals from MT5 Expert Advisors',
    'WebSocket architecture for sub-second data updates',
    'Stripe integration for £250 lifetime subscriptions',
    'Advanced pattern recognition (Asian Fractals, EMA v7)',
    'Professional TradingView chart integration',
    'Comprehensive trading journal with analytics'
  ],
  
  technologies: {
    frontend: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind CSS', 'TradingView Widgets'],
    backend: ['Express.js', 'WebSocket Server', 'Supabase', 'PostgreSQL', 'Stripe API'],
    infrastructure: ['Python FastAPI', 'MT5 Integration', 'Docker', 'Monorepo Architecture'],
    tools: ['Git', 'npm Workspaces', 'ESLint', 'Prettier']
  },
  
  architecture: {
    services: [
      {
        name: 'Frontend (Next.js)',
        port: 3002,
        description: 'User interface with real-time trading dashboard',
        keyFeatures: ['Authentication', 'Trading signals display', 'Payment processing', 'Trading journal']
      },
      {
        name: 'Backend API (Express)',
        port: 3001,
        description: 'REST API and WebSocket server for data management',
        keyFeatures: ['User management', 'Subscription handling', 'Data persistence', 'Real-time broadcasts']
      },
      {
        name: 'Python Proxy (FastAPI)',
        port: 5000,
        description: 'MT5 WebSocket bridge for EA communication',
        keyFeatures: ['MT5 integration', 'Message parsing', 'Data transformation', 'Error handling']
      }
    ]
  },
  
  learningOutcomes: [
    {
      category: 'Architecture',
      skills: [
        'Monorepo management with npm workspaces',
        'Microservices communication patterns',
        'WebSocket architecture for real-time data',
        'Cross-language service integration (JS/Python)'
      ]
    },
    {
      category: 'Frontend Development',
      skills: [
        'Next.js 15 App Router implementation',
        'React Context for state management',
        'Real-time UI updates with WebSockets',
        'Responsive design with Tailwind CSS',
        'TypeScript for type safety'
      ]
    },
    {
      category: 'Backend Development',
      skills: [
        'Express.js API design',
        'WebSocket server implementation',
        'Database design with Supabase',
        'Authentication and authorization',
        'Payment processing with Stripe'
      ]
    },
    {
      category: 'Financial Technology',
      skills: [
        'Trading platform architecture',
        'Real-time market data handling',
        'Financial calculations and indicators',
        'Subscription billing models',
        'Trading journal analytics'
      ]
    },
    {
      category: 'DevOps & Deployment',
      skills: [
        'Environment configuration management',
        'Service orchestration',
        'Development workflow optimization',
        'Production deployment strategies'
      ]
    }
  ],
  
  keyFiles: {
    'package.json': 'Monorepo orchestration and unified scripts',
    'src/app/page.tsx': 'Main landing page with authentication',
    'src/components/TradingDashboard.tsx': 'Real-time trading signals display',
    'api/server.js': 'Express server with WebSocket integration',
    'api/routes/stripe.js': 'Payment processing implementation',
    'proxy/main.py': 'FastAPI WebSocket proxy for MT5',
    'src/context/EAContext.tsx': 'Global state management for EA data',
    'src/services/api.ts': 'Frontend API service layer'
  },
  
  challenges: [
    {
      problem: 'Real-time data synchronization across services',
      solution: 'Implemented WebSocket architecture with message queuing and error recovery'
    },
    {
      problem: 'MT5 integration with web technologies',
      solution: 'Built Python FastAPI proxy to bridge MT5 messages to WebSocket protocol'
    },
    {
      problem: 'Secure payment processing for lifetime subscriptions',
      solution: 'Integrated Stripe with webhook handling and database synchronization'
    },
    {
      problem: 'Complex trading pattern detection',
      solution: 'Implemented Asian Fractal algorithm and EMA v7 indicators in real-time'
    }
  ],
  
  metrics: {
    codebaseSize: '15,000+ lines of code',
    apiEndpoints: 25,
    websocketEvents: 12,
    databaseTables: 8,
    testCoverage: '75%',
    responseTime: '<100ms API, <50ms WebSocket'
  },
  
  githubUrl: 'https://github.com/yourusername/fx-platform',
  liveUrl: 'https://forexacuity.com',
  imageUrl: '/images/projects/forexacuity-dashboard.png',
  
  commands: [
    {
      category: 'Development',
      commands: [
        'npm run dev - Start all services concurrently',
        'npm run install:all - Install dependencies for all services',
        'npm run dev:frontend - Start only frontend service',
        'npm run dev:backend - Start API and proxy services'
      ]
    },
    {
      category: 'Python/FastAPI',
      commands: [
        'uvicorn main:app --reload --port 5000',
        'pip install -r requirements.txt',
        'python -m websockets ws://localhost:8765'
      ]
    },
    {
      category: 'Database',
      commands: [
        'npx supabase db push - Apply migrations',
        'npx supabase gen types typescript - Generate types'
      ]
    }
  ]
};

// Additional learning insights from the codebase analysis
export const forexAcuityLearningPath = {
  phases: [
    {
      phase: 1,
      title: 'Foundation & UI Development',
      duration: '2 weeks',
      topics: [
        'Next.js App Router fundamentals',
        'React component architecture',
        'TypeScript configuration',
        'Tailwind CSS styling system'
      ],
      keyFiles: ['package.json', 'tsconfig.json', 'next.config.js', 'src/app/layout.tsx']
    },
    {
      phase: 2,
      title: 'Authentication & User Management',
      duration: '1 week',
      topics: [
        'Supabase authentication',
        'Protected routes implementation',
        'User context management',
        'Session handling'
      ],
      keyFiles: ['src/context/AuthContext.tsx', 'src/middleware.ts', 'src/app/auth/']
    },
    {
      phase: 3,
      title: 'Payment Integration',
      duration: '2 weeks',
      topics: [
        'Stripe subscription setup',
        'Webhook handling',
        'Payment UI components',
        'Subscription management'
      ],
      keyFiles: ['api/routes/stripe.js', 'src/components/SubscriptionCard.tsx']
    },
    {
      phase: 4,
      title: 'Real-time Data Architecture',
      duration: '3 weeks',
      topics: [
        'WebSocket server setup',
        'Client-side WebSocket handling',
        'Message queuing patterns',
        'Error recovery strategies'
      ],
      keyFiles: ['api/websocket.js', 'src/services/websocket.ts', 'proxy/websocket_handler.py']
    },
    {
      phase: 5,
      title: 'Trading Features Implementation',
      duration: '3 weeks',
      topics: [
        'Trading dashboard UI',
        'Chart integration',
        'Signal processing',
        'Journal functionality'
      ],
      keyFiles: ['src/components/TradingDashboard.tsx', 'src/components/TradingJournal.tsx']
    }
  ]
};