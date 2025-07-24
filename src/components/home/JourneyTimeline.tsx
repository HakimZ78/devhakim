'use client';

import { CheckCircle, Circle, ArrowRight, Calendar, Target } from 'lucide-react';
import Link from 'next/link';

const timelineEvents = [
  {
    id: 1,
    date: 'January 2024',
    title: 'Career Transition Decision',
    description: 'Made the decision to transition from healthcare (optometry) to software engineering',
    status: 'completed',
    category: 'milestone',
    details: ['Researched career paths', 'Identified fintech opportunity', 'Started learning plan']
  },
  {
    id: 2,
    date: 'February 2024',
    title: 'Python Foundation',
    description: 'Started intensive Python learning focusing on full-stack development',
    status: 'completed',
    category: 'learning',
    details: ['Python basics & OOP', 'FastAPI framework', 'Database fundamentals']
  },
  {
    id: 3,
    date: 'March 2024',
    title: 'MSc Computer Science',
    description: 'Enrolled in MSc Computer Science conversion course',
    status: 'completed',
    category: 'education',
    details: ['Algorithms & Data Structures', 'Software Engineering', 'Database Systems']
  },
  {
    id: 4,
    date: 'June 2024',
    title: 'First Full-Stack Project',
    description: 'Built healthcare data management API with Django',
    status: 'completed',
    category: 'project',
    details: ['Django REST Framework', 'PostgreSQL integration', 'JWT authentication']
  },
  {
    id: 5,
    date: 'September 2024',
    title: 'ForexAcuity Development',
    description: 'Started building real-time forex trading platform',
    status: 'completed',
    category: 'project',
    details: ['WebSocket architecture', 'MT5 integration', 'Payment processing']
  },
  {
    id: 6,
    date: 'December 2024',
    title: 'ForexAcuity Launch',
    description: 'Successfully launched production trading platform with paying users',
    status: 'completed',
    category: 'milestone',
    details: ['Production deployment', 'Real-time monitoring', '£250 subscriptions']
  },
  {
    id: 7,
    date: 'January 2025',
    title: 'Portfolio Development',
    description: 'Building comprehensive portfolio to showcase technical journey',
    status: 'in-progress',
    category: 'project',
    details: ['Next.js portfolio site', 'Command reference table', 'Journey documentation']
  },
  {
    id: 8,
    date: 'March 2025',
    title: 'Job Search & Applications',
    description: 'Begin applying for full-stack Python and fintech positions',
    status: 'upcoming',
    category: 'milestone',
    details: ['Resume optimization', 'Interview preparation', 'Technical challenges']
  },
  {
    id: 9,
    date: 'Summer 2025',
    title: 'First Developer Role',
    description: 'Target: Secure first professional software engineering position',
    status: 'upcoming',
    category: 'goal',
    details: ['Full-stack Python role', 'Fintech industry preferred', 'Remote-friendly company']
  }
];

const statusConfig = {
  completed: {
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    color: 'border-green-400 bg-green-400/10',
    textColor: 'text-green-400'
  },
  'in-progress': {
    icon: <Circle className="w-6 h-6 text-blue-400 animate-pulse" />,
    color: 'border-blue-400 bg-blue-400/10',
    textColor: 'text-blue-400'
  },
  upcoming: {
    icon: <Circle className="w-6 h-6 text-gray-500" />,
    color: 'border-gray-500 bg-gray-500/10',
    textColor: 'text-gray-500'
  }
};

const categoryIcons = {
  milestone: '🎯',
  learning: '📚',
  education: '🎓',
  project: '💻',
  goal: '⭐'
};

export default function JourneyTimeline() {
  const completedEvents = timelineEvents.filter(event => event.status === 'completed').length;
  const totalEvents = timelineEvents.length;
  const progressPercentage = (completedEvents / totalEvents) * 100;

  return (
    <section id="journey" className="py-20 px-6 bg-slate-800/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">My Learning Journey</h2>
          <p className="text-xl text-gray-400 mb-8">
            From healthcare professional to software engineer - tracking every milestone
          </p>
          
          {/* Progress Bar */}
          <div className="bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            {completedEvents} of {totalEvents} milestones completed ({Math.round(progressPercentage)}%)
          </p>

          <Link 
            href="/journey"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200"
          >
            View Full Journey
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-gray-500"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const config = statusConfig[event.status as keyof typeof statusConfig];
              
              return (
                <div key={event.id} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full border-2 ${config.color} flex items-center justify-center relative z-10`}>
                    {config.icon}
                  </div>

                  {/* Event Content */}
                  <div className="ml-6 flex-1">
                    <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{categoryIcons[event.category as keyof typeof categoryIcons]}</span>
                          <div>
                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-400 text-sm">{event.date}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color} ${config.textColor}`}>
                          {event.status.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4">{event.description}</p>

                      {/* Details */}
                      <ul className="space-y-1">
                        {event.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-xl p-8 border border-blue-500/30">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready for the Next Challenge</h3>
            <p className="text-gray-400 mb-6">
              Looking for opportunities to apply my skills in a professional environment. 
              Particularly interested in fintech, healthcare tech, or any company building impactful software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Get In Touch
              </a>
              <a 
                href="/resume.pdf"
                className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors duration-200"
                download
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}