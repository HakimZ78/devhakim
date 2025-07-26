'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight, Calendar, Target } from 'lucide-react';
import Link from 'next/link';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  category: string;
  details: string[];
  order_index?: number;
}

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

export default function JourneyTimelineShowcase() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/timeline-events');
      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data);
      } else {
        console.error('Failed to load timeline events:', result.error);
        setError('Failed to load timeline events');
        setEvents([]);
      }
    } catch (error) {
      console.error('Error loading timeline events:', error);
      setError('Error loading timeline events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const completedEvents = events.filter(event => event.status === 'completed').length;
  const totalEvents = events.length;
  const progressPercentage = totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0;

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">Error loading timeline: {error}</p>
            <button 
              onClick={loadEvents}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Key milestones in my transition from healthcare to software engineering
          </p>

          {/* Progress Overview */}
          {totalEvents > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300 font-medium">Progress</span>
                <span className="text-white font-bold">{completedEvents}/{totalEvents}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1 }}
                  className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-600"></div>
          
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 ${statusConfig[event.status].color}`}>
                  {statusConfig[event.status].icon}
                </div>
                
                {/* Content */}
                <div className="ml-6 flex-1">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {categoryIcons[event.category as keyof typeof categoryIcons] || '📌'}
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[event.status].color} ${statusConfig[event.status].textColor}`}>
                        {event.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    
                    {event.details && event.details.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-300 flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          Key Details
                        </h4>
                        <ul className="space-y-1">
                          {event.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-gray-400 text-sm flex items-start">
                              <ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/journey"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View Full Journey
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>

        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No timeline events found.</p>
          </div>
        )}
      </div>
    </section>
  );
}