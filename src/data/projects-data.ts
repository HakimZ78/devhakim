export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'learning' | 'fintech' | 'business' | 'personal';
  technologies: string[];
  highlights: string[];
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  completionDate: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'planning';
  
  // Detailed content
  overview: string;
  problemStatement: string;
  solution: string;
  challenges: Array<{
    title: string;
    description: string;
    solution: string;
  }>;
  keyLearnings: string[];
  futureEnhancements: string[];
  gallery?: Array<{
    url: string;
    caption: string;
    type: 'image' | 'video';
  }>;
}

export const projectsData: ProjectDetail[] = [
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
    liveUrl: 'https://forexacuity.co.uk',
    imageUrl: '/images/projects/forexacuity-dashboard.png',
    featured: true,
    completionDate: new Date('2024-12-01'),
    difficulty: 'advanced',
    status: 'completed',
    
    overview: `ForexAcuity is a comprehensive forex trading analytics platform that provides real-time market data, technical analysis, and pattern recognition for forex traders. Built from the ground up to handle high-frequency data streams and provide actionable insights for trading decisions.`,
    
    problemStatement: `Forex traders often struggle with fragmented tools and delayed data feeds that can cost them profitable opportunities. Existing solutions are either too expensive for individual traders or lack the real-time responsiveness needed for scalping and day trading strategies.`,
    
    solution: `I developed ForexAcuity as an all-in-one solution featuring real-time data feeds from MT5, advanced pattern recognition algorithms, and a responsive web interface. The platform combines the power of Python for data processing with modern web technologies for seamless user experience.`,
    
    challenges: [
      {
        title: 'Real-time Data Synchronization',
        description: 'Ensuring sub-second data updates across multiple currency pairs without overwhelming the client or server.',
        solution: 'Implemented WebSocket connections with intelligent throttling and data compression. Used Redis for caching and implemented connection pooling to handle concurrent users efficiently.'
      },
      {
        title: 'Pattern Recognition Accuracy',
        description: 'Developing reliable algorithms to detect Asian Fractal patterns and other technical formations.',
        solution: 'Created custom algorithms based on established trading principles, implemented backtesting functionality to validate pattern accuracy, and added configurable sensitivity settings.'
      },
      {
        title: 'Scalable Architecture',
        description: 'Building a system that can handle multiple users and high-frequency data without performance degradation.',
        solution: 'Adopted microservices architecture with separate services for data ingestion, processing, and client communication. Used Docker for containerization and implemented horizontal scaling strategies.'
      }
    ],
    
    keyLearnings: [
      'Real-time systems require careful consideration of data flow and bottlenecks',
      'WebSocket connections need proper error handling and reconnection logic',
      'Financial data demands high precision and reliability in calculations',
      'User experience is crucial - even milliseconds of delay can impact trading decisions',
      'Caching strategies are essential for performance with high-frequency data',
      'Proper logging and monitoring are critical for debugging complex data flows'
    ],
    
    futureEnhancements: [
      'Add machine learning models for price prediction',
      'Implement automated trading signals and alerts',
      'Add support for more asset classes (stocks, crypto, commodities)',
      'Create mobile app for iOS and Android',
      'Implement social trading features and community',
      'Add advanced charting with more technical indicators'
    ],
    
    gallery: [
      {
        url: '/images/projects/forexacuity/dashboard-overview.png',
        caption: 'Main dashboard with real-time price feeds and pattern detection',
        type: 'image'
      },
      {
        url: '/images/projects/forexacuity/pattern-detection.png', 
        caption: 'Asian Fractal pattern detection on EURUSD 1-hour chart',
        type: 'image'
      },
      {
        url: '/images/projects/forexacuity/multi-timeframe.png',
        caption: 'Multi-timeframe analysis view with synchronized charts',
        type: 'image'
      }
    ]
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
    liveUrl: 'https://homeeyeclinic.co.uk',
    imageUrl: '/images/projects/home-eye-clinic-preview.jpg',
    featured: true,
    completionDate: new Date('2024-09-30'),
    difficulty: 'intermediate',
    status: 'completed',
    
    overview: `Home Eye Clinic provides professional eye examinations in the comfort of patients' homes across the UK. I developed their complete web presence including booking system, service information, and administrative tools.`,
    
    problemStatement: `The client needed a professional website that would appeal to elderly patients who prefer home visits, while providing multiple ways to book appointments and manage the business efficiently.`,
    
    solution: `I created a clean, accessible website with multiple booking options - full forms for detailed bookings, quick booking for regular patients, and callback requests for those who prefer phone contact. The site includes comprehensive service information and an admin panel for managing appointments.`,
    
    challenges: [
      {
        title: 'Accessibility for Elderly Users',
        description: 'Designing an interface that works well for users with varying technical skills and potential vision issues.',
        solution: 'Implemented large, clear fonts, high contrast colors, simple navigation, and multiple booking options. Conducted user testing with target demographic.'
      },
      {
        title: 'Multi-channel Booking System',
        description: 'Creating different booking flows that serve different user preferences while maintaining data consistency.',
        solution: 'Used Laravel Livewire for reactive components, created a unified booking model that handles all booking types, and implemented proper validation for each flow.'
      },
      {
        title: 'Email Notifications',
        description: 'Reliable email delivery for appointment confirmations and admin notifications.',
        solution: 'Integrated with reliable email service provider, implemented queue system for email processing, and added proper error handling and retry logic.'
      }
    ],
    
    keyLearnings: [
      'Accessibility should be considered from the start, not added later',
      'User testing with the actual target demographic provides invaluable insights',
      'Laravel Livewire provides excellent developer experience for reactive UIs',
      'Email reliability is crucial for business applications',
      'Simple, clear design often works better than complex interfaces',
      'Performance optimization is important even for simple websites'
    ],
    
    futureEnhancements: [
      'Add online payment processing for deposits',
      'Implement calendar integration for appointment scheduling',
      'Add patient portal for managing appointment history',
      'Create mobile app for easier booking',
      'Add live chat support feature',
      'Implement automated appointment reminders via SMS'
    ]
  },
  
  {
    id: 'portfolio',
    slug: 'portfolio',
    title: 'DevHakim Portfolio',
    description: 'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
    category: 'personal',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    highlights: [
      'Responsive design system',
      'Interactive skill and timeline editing',
      'localStorage persistence',
      'Phase-based implementation'
    ],
    liveUrl: 'https://devhakim.com',
    imageUrl: '/images/projects/portfolio-preview.jpg',
    featured: true,
    completionDate: new Date('2025-01-15'),
    difficulty: 'intermediate',
    status: 'in-progress',
    
    overview: `This portfolio website serves as both a showcase of my technical skills and a living document of my career transition from healthcare to software engineering. Built with modern web technologies and designed with user experience in mind.`,
    
    problemStatement: `As a career changer, I needed a platform that would effectively communicate my story, demonstrate my technical abilities, and provide evidence of my learning journey to potential employers.`,
    
    solution: `I created a comprehensive portfolio with interactive elements, detailed project showcases, learning progress tracking, and a command reference system. The site demonstrates both my technical skills and my systematic approach to learning and documentation.`,
    
    challenges: [
      {
        title: 'Performance with Rich Animations',
        description: 'Balancing engaging animations with fast loading times and smooth performance.',
        solution: 'Used Framer Motion for optimized animations, implemented lazy loading for images, and used code splitting to reduce initial bundle size.'
      },
      {
        title: 'Data Persistence Without Backend',
        description: 'Allowing users to customize content and persist changes without a database.',
        solution: 'Implemented localStorage with proper error handling and fallback strategies. Created a robust state management system using Zustand.'
      },
      {
        title: 'Mobile-First Responsive Design',
        description: 'Ensuring excellent user experience across all device sizes and orientations.',
        solution: 'Used Tailwind CSS for systematic responsive design, tested extensively on real devices, and implemented touch-friendly interactions.'
      }
    ],
    
    keyLearnings: [
      'Next.js App Router provides excellent developer experience and performance',
      'TypeScript significantly improves code quality and developer confidence',
      'Framer Motion is powerful but requires careful optimization for performance',
      'localStorage needs proper error handling for production applications',
      'User testing reveals issues that developers often miss',
      'Performance budget is important even for portfolio sites'
    ],
    
    futureEnhancements: [
      'Add blog functionality with MDX support',
      'Implement dark mode with system preference detection',
      'Add contact form with backend integration',
      'Create downloadable resume generator',
      'Add visitor analytics and insights',
      'Implement progressive web app features'
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData.find(project => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map(project => project.slug);
}

export function getFeaturedProjects(): ProjectDetail[] {
  return projectsData.filter(project => project.featured);
}

export function getProjectsByCategory(category: string): ProjectDetail[] {
  return projectsData.filter(project => project.category === category);
}