export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'learning' | 'fintech' | 'business' | 'personal';
  technologies: string[];
  highlights: string[];
  
  // Support both camelCase (static) and snake_case (database) naming
  liveUrl?: string;
  live_url?: string;
  imageUrl?: string;
  image_url?: string;
  featured: boolean;
  completionDate?: Date | string;
  completion_date?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'planning';
  
  // Detailed content
  overview: string;
  problemStatement?: string;
  problem_statement?: string;
  solution: string;
  challenges: Array<{
    title: string;
    description: string;
    solution: string;
  }>;
  keyLearnings?: string[];
  key_learnings?: string[];
  futureEnhancements?: string[];
  future_enhancements?: string[];
  gallery?: Array<{
    url: string;
    caption: string;
    type: 'image' | 'video';
  }>;
  
  // Additional database fields
  order_index?: number;
  created_at?: string;
  updated_at?: string;
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
  },
  
  {
    id: 'fastapi-task-manager',
    slug: 'fastapi-task-manager',
    title: 'FastAPI Task Manager',
    description: 'A RESTful task management API built with FastAPI, featuring user authentication, task CRUD operations, and data validation.',
    category: 'learning',
    technologies: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Pydantic', 'JWT'],
    highlights: [
      'OpenAPI documentation generation',
      'Async database operations',
      'Comprehensive test coverage'
    ],
    imageUrl: '/images/projects/task-manager-preview.jpg',
    featured: false,
    completionDate: new Date('2025-03-01'),
    difficulty: 'beginner',
    status: 'planning',
    
    overview: `This project aims to build a robust task management API using FastAPI, focusing on modern Python development practices and API design principles. The project will serve as a foundation for learning advanced backend concepts and API development.`,
    
    problemStatement: `Many task management solutions are either too complex for simple use cases or lack proper API design. This project addresses the need for a clean, well-documented API that follows RESTful principles and modern authentication patterns.`,
    
    solution: `The planned solution involves creating a FastAPI application with user authentication, CRUD operations for tasks, proper data validation using Pydantic models, and comprehensive API documentation. The focus will be on code quality, testing, and following Python best practices.`,
    
    challenges: [
      {
        title: 'API Design and Documentation',
        description: 'Creating intuitive API endpoints with comprehensive documentation that serves both developers and end users.',
        solution: 'Leverage FastAPI\'s automatic OpenAPI generation, implement proper HTTP status codes, and create detailed endpoint descriptions with examples.'
      },
      {
        title: 'Authentication and Security',
        description: 'Implementing secure JWT-based authentication with proper token management and user session handling.',
        solution: 'Plan to use FastAPI\'s security utilities, implement proper password hashing, and create middleware for token validation and refresh.'
      },
      {
        title: 'Database Design and Relationships',
        description: 'Designing efficient database schema for users, tasks, and potential future features like categories or collaborators.',
        solution: 'Use SQLAlchemy ORM with proper relationship definitions, implement database migrations, and plan for scalable schema evolution.'
      }
    ],
    
    keyLearnings: [
      'FastAPI provides excellent developer experience with automatic documentation',
      'Pydantic models ensure type safety and data validation',
      'Async/await patterns improve API performance for I/O operations',
      'Proper API design requires thinking about future extensibility',
      'Testing strategies for APIs differ from frontend applications',
      'Database migrations and schema evolution require careful planning'
    ],
    
    futureEnhancements: [
      'Add task categories and tagging system',
      'Implement task sharing and collaboration features',
      'Add email notifications for task deadlines',
      'Create task templates and recurring tasks',
      'Add analytics and reporting endpoints',
      'Implement rate limiting and API usage tracking'
    ]
  },
  
  {
    id: 'healthcare-api',
    slug: 'healthcare-api',
    title: 'Healthcare Data Management API',
    description: 'RESTful API for healthcare data management with secure authentication and HIPAA compliance considerations.',
    category: 'business',
    technologies: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'JWT'],
    highlights: [
      'HIPAA-compliant data handling patterns',
      'Role-based access control system',
      'Comprehensive audit trail functionality'
    ],
    imageUrl: '/images/projects/healthcare-api-preview.jpg',
    featured: false,
    completionDate: new Date('2025-04-01'),
    difficulty: 'intermediate',
    status: 'planning',
    
    overview: `This project plans to create a healthcare data management API that prioritizes security, compliance, and data integrity. Drawing from my healthcare background, it will address real-world needs for patient data management while maintaining strict privacy standards.`,
    
    problemStatement: `Healthcare providers need secure, compliant systems for managing patient data, but many existing solutions are either too expensive or don't adequately address privacy requirements. There's a need for a well-designed API that balances functionality with strict security measures.`,
    
    solution: `The planned solution involves building a Django REST Framework API with role-based access control, comprehensive audit logging, and data encryption. The system will implement HIPAA-compliant patterns while maintaining developer-friendly interfaces.`,
    
    challenges: [
      {
        title: 'HIPAA Compliance Implementation',
        description: 'Ensuring all data handling, storage, and transmission meets HIPAA requirements without over-engineering.',
        solution: 'Research and implement industry-standard encryption patterns, create comprehensive audit trails, and design proper access controls with minimal necessary access principles.'
      },
      {
        title: 'Role-Based Access Control',
        description: 'Creating flexible permission systems that can handle different healthcare roles (doctors, nurses, administrators) with varying access levels.',
        solution: 'Plan to use Django\'s built-in permissions system extended with custom roles, implement object-level permissions, and create middleware for role validation.'
      },
      {
        title: 'Data Integrity and Audit Trails',
        description: 'Maintaining complete audit logs for all data access and modifications while ensuring system performance.',
        solution: 'Implement Django signals for automatic audit logging, use Redis for caching frequently accessed audit data, and design efficient query patterns for audit reports.'
      }
    ],
    
    keyLearnings: [
      'Healthcare data requires multiple layers of security considerations',
      'Django REST Framework provides robust tools for API security',
      'Audit logging can significantly impact performance if not designed carefully',
      'Role-based access control needs to be flexible yet secure',
      'Compliance requirements should drive technical architecture decisions',
      'Redis caching strategies are crucial for audit-heavy applications'
    ],
    
    futureEnhancements: [
      'Add integration with Electronic Health Record (EHR) systems',
      'Implement real-time notifications for critical patient updates',
      'Add advanced reporting and analytics capabilities',
      'Create mobile SDK for healthcare applications',
      'Add support for medical device data integration',
      'Implement automated compliance checking and reporting'
    ]
  },
  
  {
    id: 'ecommerce-platform',
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform MVP',
    description: 'A small business e-commerce solution with product catalog, shopping cart, and payment integration.',
    category: 'business',
    technologies: ['Django', 'React', 'Stripe', 'PostgreSQL', 'Redis'],
    highlights: [
      'Stripe payment integration',
      'Inventory management system',
      'Order tracking functionality'
    ],
    imageUrl: '/images/projects/ecommerce-preview.jpg',
    featured: false,
    completionDate: new Date('2025-05-01'),
    difficulty: 'intermediate',
    status: 'planning',
    
    overview: `This project aims to create a complete e-commerce platform tailored for small businesses, focusing on essential features while maintaining simplicity and ease of use. The platform will demonstrate full-stack development skills and business application design.`,
    
    problemStatement: `Small businesses often struggle with expensive e-commerce solutions that include features they don't need, or simple solutions that lack essential functionality. There's a need for a balanced approach that provides core e-commerce features without unnecessary complexity.`,
    
    solution: `The planned solution involves creating a Django backend API with a React frontend, integrated with Stripe for payments. The system will focus on product management, order processing, and customer management while maintaining clean, maintainable code architecture.`,
    
    challenges: [
      {
        title: 'Payment Processing Security',
        description: 'Implementing secure payment flows with Stripe while handling edge cases and ensuring PCI compliance.',
        solution: 'Plan to use Stripe\'s recommended integration patterns, implement proper error handling for payment failures, and create secure webhook handling for payment confirmations.'
      },
      {
        title: 'Inventory Management',
        description: 'Creating a system that accurately tracks inventory across multiple sales channels and prevents overselling.',
        solution: 'Design database schemas with proper locking mechanisms, implement real-time inventory updates, and create alerting systems for low stock situations.'
      },
      {
        title: 'Order Fulfillment Workflow',
        description: 'Building a complete order lifecycle from cart to delivery with proper status tracking and notifications.',
        solution: 'Create state machines for order processing, implement email notifications for status updates, and design admin interfaces for order management.'
      }
    ],
    
    keyLearnings: [
      'E-commerce applications require careful consideration of data consistency',
      'Payment processing involves many edge cases that must be handled properly',
      'User experience is crucial for conversion rates in e-commerce',
      'Inventory management is more complex than it initially appears',
      'Email notifications and order tracking significantly improve customer satisfaction',
      'Admin interfaces are as important as customer-facing features'
    ],
    
    futureEnhancements: [
      'Add multi-vendor marketplace functionality',
      'Implement advanced product recommendations',
      'Add support for digital product delivery',
      'Create mobile app for better user experience',
      'Add social media integration for marketing',
      'Implement advanced analytics and reporting dashboard'
    ]
  },
  
  {
    id: 'crypto-tracker',
    slug: 'crypto-tracker',
    title: 'Crypto Price Tracker',
    description: 'Personal cryptocurrency portfolio tracker with real-time price updates and profit/loss calculations.',
    category: 'personal',
    technologies: ['React', 'Node.js', 'Express', 'CoinGecko API', 'Chart.js'],
    highlights: [
      'Real-time price data integration',
      'Portfolio performance analytics',
      'Price alert notifications'
    ],
    imageUrl: '/images/projects/crypto-tracker-preview.jpg',
    featured: false,
    completionDate: new Date('2025-06-01'),
    difficulty: 'beginner',
    status: 'planning',
    
    overview: `This project plans to create a personal cryptocurrency portfolio tracking application that helps users monitor their investments, track performance, and stay informed about market movements. The focus will be on clean data visualization and user-friendly interfaces.`,
    
    problemStatement: `Crypto investors often use multiple exchanges and wallets, making it difficult to get a comprehensive view of their portfolio performance. Existing solutions are either too complex or lack the specific features that individual investors need.`,
    
    solution: `The planned solution involves creating a React application with a Node.js backend that integrates with cryptocurrency APIs to provide real-time pricing data, portfolio tracking, and performance analytics. The system will focus on simplicity and clear data presentation.`,
    
    challenges: [
      {
        title: 'Real-time Data Management',
        description: 'Handling frequent price updates efficiently without overwhelming the user interface or exceeding API rate limits.',
        solution: 'Plan to implement WebSocket connections for real-time updates, use intelligent caching strategies, and create efficient data update mechanisms that only refresh when necessary.'
      },
      {
        title: 'Data Visualization',
        description: 'Creating clear, informative charts and graphs that help users understand their portfolio performance and market trends.',
        solution: 'Use Chart.js for creating responsive, interactive charts. Design clean interfaces that highlight important information without overwhelming users with too much data.'
      },
      {
        title: 'Portfolio Calculations',
        description: 'Accurately calculating portfolio values, profit/loss, and performance metrics across different cryptocurrencies and time periods.',
        solution: 'Implement robust calculation logic that handles different purchase dates and amounts, create proper data models for tracking transactions, and ensure accuracy in all financial calculations.'
      }
    ],
    
    keyLearnings: [
      'Real-time applications require careful consideration of update frequencies',
      'Financial calculations demand high precision and thorough testing',
      'Data visualization should prioritize clarity over complexity',
      'API rate limiting requires intelligent caching and update strategies',
      'User experience in financial applications requires trust and reliability',
      'Performance optimization is crucial for real-time data applications'
    ],
    
    futureEnhancements: [
      'Add support for multiple exchanges and wallets',
      'Implement advanced portfolio analytics and insights',
      'Add news feed integration for market updates',
      'Create mobile app for portfolio monitoring on the go',
      'Add social features for sharing portfolio performance',
      'Implement automated trading integration with exchange APIs'
    ]
  },
  
  {
    id: 'healthcare-ai',
    slug: 'healthcare-ai',
    title: 'Healthcare AI Assistant',
    description: 'AI-powered chatbot for basic healthcare information using OpenAI API with healthcare domain knowledge.',
    category: 'learning',
    technologies: ['Python', 'OpenAI API', 'Streamlit', 'LangChain', 'Pinecone'],
    highlights: [
      'Healthcare-specific knowledge base',
      'Conversational AI interface',
      'Vector database integration'
    ],
    imageUrl: '/images/projects/ai-chatbot-preview.jpg',
    featured: false,
    completionDate: new Date('2025-07-01'),
    difficulty: 'advanced',
    status: 'planning',
    
    overview: `This project aims to explore AI applications in healthcare by creating an intelligent assistant that can provide basic health information and guidance. Drawing from my healthcare background, it will focus on responsible AI implementation with proper disclaimers and limitations.`,
    
    problemStatement: `People often seek health information online but struggle to find reliable, accessible sources. While AI can help provide information, it must be implemented responsibly with clear limitations and proper medical disclaimers to avoid providing medical advice.`,
    
    solution: `The planned solution involves creating a Streamlit application powered by OpenAI's API and LangChain, with a curated healthcare knowledge base stored in Pinecone vector database. The system will provide information while maintaining clear boundaries about what it can and cannot do.`,
    
    challenges: [
      {
        title: 'Responsible AI Implementation',
        description: 'Ensuring the AI provides helpful information while clearly communicating its limitations and avoiding medical advice.',
        solution: 'Plan to implement strict prompt engineering with built-in disclaimers, create content filters for inappropriate medical queries, and design clear UI elements that remind users about limitations.'
      },
      {
        title: 'Healthcare Knowledge Curation',
        description: 'Building a reliable knowledge base with accurate, up-to-date healthcare information from trusted sources.',
        solution: 'Research and compile information from reputable medical sources, implement proper citation systems, and create processes for keeping information current and accurate.'
      },
      {
        title: 'Vector Database Optimization',
        description: 'Designing efficient vector storage and retrieval systems for healthcare knowledge that provide relevant, contextual responses.',
        solution: 'Plan to use Pinecone for vector storage, experiment with different embedding strategies, and implement relevance scoring to ensure high-quality information retrieval.'
      }
    ],
    
    keyLearnings: [
      'AI applications in healthcare require extra responsibility and careful implementation',
      'Vector databases open new possibilities for intelligent information retrieval',
      'LangChain provides powerful tools for building AI applications',
      'Prompt engineering is crucial for reliable AI behavior',
      'User interface design for AI applications requires clear communication of capabilities',
      'Healthcare AI must balance helpfulness with appropriate limitations'
    ],
    
    futureEnhancements: [
      'Add multilingual support for broader accessibility',
      'Implement more sophisticated medical reasoning capabilities',
      'Add integration with wearable device data for personalized insights',
      'Create specialized modules for different health conditions',
      'Add voice interface for improved accessibility',
      'Implement feedback mechanisms for continuous improvement'
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