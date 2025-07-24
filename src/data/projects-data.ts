export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'learning' | 'fintech' | 'business' | 'personal';
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
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
  technicalDetails: Array<{
    title: string;
    description: string;
    codeExample?: string;
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
    githubUrl: 'https://github.com/yourusername/fx-platform',
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
    
    technicalDetails: [
      {
        title: 'WebSocket Implementation',
        description: 'Real-time bidirectional communication between server and clients for live market data.',
        codeExample: `
// WebSocket server implementation
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL }
});

io.on('connection', (socket) => {
  socket.on('subscribe_pair', (pair) => {
    socket.join(\`market_\${pair}\`);
    // Send latest data immediately
    socket.emit('market_data', getLatestData(pair));
  });
  
  socket.on('unsubscribe_pair', (pair) => {
    socket.leave(\`market_\${pair}\`);
  });
});

// Broadcast market updates
setInterval(() => {
  const updates = fetchMarketUpdates();
  updates.forEach(update => {
    io.to(\`market_\${update.pair}\`).emit('market_data', update);
  });
}, 500); // 500ms intervals for real-time feel
        `
      },
      {
        title: 'Pattern Detection Algorithm',
        description: 'Custom implementation of Asian Fractal pattern recognition using price action analysis.',
        codeExample: `
def detect_asian_fractal(candles, lookback=20):
    """
    Detect Asian Fractal patterns in price data
    """
    fractals = []
    
    for i in range(lookback, len(candles) - lookback):
        high = candles[i]['high']
        low = candles[i]['low']
        
        # Check if current candle is a fractal high
        is_fractal_high = all(
            high >= candles[j]['high'] 
            for j in range(i - lookback, i + lookback + 1) 
            if j != i
        )
        
        # Check if current candle is a fractal low  
        is_fractal_low = all(
            low <= candles[j]['low'] 
            for j in range(i - lookback, i + lookback + 1) 
            if j != i
        )
        
        if is_fractal_high or is_fractal_low:
            fractals.append({
                'index': i,
                'type': 'high' if is_fractal_high else 'low',
                'price': high if is_fractal_high else low,
                'timestamp': candles[i]['timestamp']
            })
    
    return fractals
        `
      },
      {
        title: 'Data Pipeline Architecture',
        description: 'Efficient data flow from MT5 through processing to client delivery.',
        codeExample: `
# Data pipeline using asyncio and queues
import asyncio
from asyncio import Queue

class ForexDataPipeline:
    def __init__(self):
        self.raw_data_queue = Queue()
        self.processed_data_queue = Queue()
        
    async def mt5_data_collector(self):
        """Continuously collect data from MT5"""
        while True:
            try:
                ticks = mt5.copy_ticks_from('EURUSD', 
                                          datetime.now(), 
                                          100, 
                                          mt5.COPY_TICKS_ALL)
                await self.raw_data_queue.put(ticks)
                await asyncio.sleep(0.1)
            except Exception as e:
                logger.error(f"MT5 data collection error: {e}")
                
    async def data_processor(self):
        """Process raw data and detect patterns"""
        while True:
            raw_data = await self.raw_data_queue.get()
            processed = self.analyze_ticks(raw_data)
            await self.processed_data_queue.put(processed)
            
    async def websocket_broadcaster(self):
        """Send processed data to connected clients"""
        while True:
            data = await self.processed_data_queue.get()
            await self.broadcast_to_clients(data)
        `
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
    githubUrl: 'https://github.com/yourusername/homeeyeclinic',
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
    
    technicalDetails: [
      {
        title: 'Livewire Booking Components',
        description: 'Reactive booking forms with real-time validation and user feedback.',
        codeExample: `
<?php

namespace App\\Http\\Livewire;

use Livewire\\Component;
use App\\Models\\Booking;
use App\\Mail\\BookingConfirmation;
use Illuminate\\Support\\Facades\\Mail;

class BookingForm extends Component
{
    public $name;
    public $email;
    public $phone;
    public $preferred_date;
    public $service_type;
    public $notes;
    
    protected $rules = [
        'name' => 'required|min:2',
        'email' => 'required|email',
        'phone' => 'required|regex:/^([0-9\\s\\-\\+\\(\\)]*)$/',
        'preferred_date' => 'required|date|after:today',
        'service_type' => 'required|in:eye_test,contact_lens,diabetic',
    ];
    
    public function submitBooking()
    {
        $this->validate();
        
        $booking = Booking::create([
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'preferred_date' => $this->preferred_date,
            'service_type' => $this->service_type,
            'notes' => $this->notes,
            'status' => 'pending'
        ]);
        
        // Send confirmation emails
        Mail::to($this->email)->send(new BookingConfirmation($booking));
        Mail::to(config('mail.admin_email'))->send(new NewBookingNotification($booking));
        
        session()->flash('success', 'Booking submitted successfully!');
        $this->reset();
    }
    
    public function render()
    {
        return view('livewire.booking-form');
    }
}
        `
      },
      {
        title: 'Responsive Design System',
        description: 'Mobile-first design with careful consideration for accessibility.',
        codeExample: `
/* Tailwind CSS components for accessibility */
@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300;
  }
  
  .form-input {
    @apply w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200;
  }
  
  .section-header {
    @apply text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .btn-primary {
      @apply border-2 border-white;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .transition-all {
      transition: none;
    }
  }
}
        `
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
    githubUrl: 'https://github.com/yourusername/devhakim-portfolio',
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
    
    technicalDetails: [
      {
        title: 'State Management with Zustand',
        description: 'Lightweight state management for user preferences and data persistence.',
        codeExample: `
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioState {
  skills: Skill[];
  timelineEvents: TimelineEvent[];
  preferences: UserPreferences;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      skills: defaultSkills,
      timelineEvents: defaultTimelineEvents,
      preferences: defaultPreferences,
      
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, { ...skill, id: generateId() }],
        })),
        
      updateSkill: (id, updates) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === id ? { ...skill, ...updates } : skill
          ),
        })),
        
      addTimelineEvent: (event) =>
        set((state) => ({
          timelineEvents: [...state.timelineEvents, { ...event, id: generateId() }]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        })),
        
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({
        skills: state.skills,
        timelineEvents: state.timelineEvents,
        preferences: state.preferences,
      }),
    }
  )
);
        `
      },
      {
        title: 'Responsive Animation System',
        description: 'Performance-optimized animations that work across all devices.',
        codeExample: `
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
        `
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