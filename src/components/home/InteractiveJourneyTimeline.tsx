'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, ArrowRight, Calendar, Target, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import AdminOnly from '@/components/admin/AdminOnly';

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

// Timeline events are now fully database-driven - no static fallback data

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

export default function InteractiveJourneyTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [loading, setLoading] = useState(true);

  // Load events from database on component mount
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
        // Show empty state if database fails
        setEvents([]);
      }
    } catch (error) {
      console.error('Error loading timeline events:', error);
      // Show empty state if API fails
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const completedEvents = events.filter(event => event.status === 'completed').length;
  const totalEvents = events.length;
  const progressPercentage = (completedEvents / totalEvents) * 100;

  const handleEdit = (event: TimelineEvent) => {
    setEditingEvent({ ...event });
  };

  const handleSave = async () => {
    if (!editingEvent) return;
    
    try {
      const response = await fetch(`/api/timeline-events/${editingEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingEvent),
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents(events.map(event => 
          event.id === editingEvent.id ? result.data : event
        ));
        setEditingEvent(null);
      } else {
        console.error('Failed to save event:', result.error);
        alert('Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
  };

  const handleStatusChange = async (eventId: string, newStatus: 'completed' | 'in-progress' | 'upcoming') => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const updatedEvent = { ...event, status: newStatus };
    
    try {
      const response = await fetch(`/api/timeline-events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents(events.map(event => 
          event.id === eventId ? result.data : event
        ));
      } else {
        console.error('Failed to update status:', result.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const addNewEvent = async () => {
    const newEventData = {
      date: 'New Date',
      title: 'New Milestone',
      description: 'Description of your milestone',
      status: 'upcoming' as const,
      category: 'project',
      details: ['Add details here'],
    };

    try {
      const response = await fetch('/api/timeline-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents([...events, result.data]);
        setEditingEvent(result.data);
      } else {
        console.error('Failed to create event:', result.error);
        alert('Failed to create new event. Please try again.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create new event. Please try again.');
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) {
      return;
    }

    try {
      const response = await fetch(`/api/timeline-events/${eventId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents(events.filter(event => event.id !== eventId));
        if (editingEvent?.id === eventId) {
          setEditingEvent(null);
        }
      } else {
        console.error('Failed to delete event:', result.error);
        alert('Failed to delete milestone. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete milestone. Please try again.');
    }
  };

  if (loading) {
    return (
      <section id="journey" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading journey timeline...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="py-20 px-6 bg-slate-800/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">My Learning Journey</h2>
          <p className="text-xl text-gray-400 mb-8">
            From qualified Optometrist & Pharmacist to software engineer - tracking every milestone
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/journey"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200"
            >
              View Full Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <AdminOnly>
              <button
                onClick={addNewEvent}
                className="inline-flex items-center px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all duration-200"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add Milestone
              </button>
            </AdminOnly>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-gray-500"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {events.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No timeline events found.</p>
                <AdminOnly>
                  <button
                    onClick={addNewEvent}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add First Event
                  </button>
                </AdminOnly>
              </div>
            ) : (
              events.map((event) => {
              const config = statusConfig[event.status];
              const isCurrentlyEditing = editingEvent?.id === event.id;
              
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
                          {isCurrentlyEditing ? (
                            <div className="flex-1">
                              <input
                                type="text"
                                value={editingEvent?.title || ''}
                                onChange={(e) => setEditingEvent({ ...editingEvent!, title: e.target.value })}
                                className="text-xl font-bold text-white bg-slate-600 px-3 py-1 rounded mb-2 w-full"
                              />
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <input
                                  type="text"
                                  value={editingEvent?.date || ''}
                                  onChange={(e) => setEditingEvent({ ...editingEvent!, date: e.target.value })}
                                  className="text-gray-400 text-sm bg-slate-600 px-2 py-1 rounded"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-xl font-bold text-white">{event.title}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-400 text-sm">{event.date}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <AdminOnly>
                            {/* Status Selector */}
                            <select
                              value={event.status}
                              onChange={(e) => handleStatusChange(event.id, e.target.value as 'completed' | 'in-progress' | 'upcoming')}
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color} ${config.textColor} bg-slate-700`}
                            >
                              <option value="completed">Completed</option>
                              <option value="in-progress">In Progress</option>
                              <option value="upcoming">Upcoming</option>
                            </select>
                            
                            {/* Action Buttons */}
                            {!isCurrentlyEditing ? (
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => handleEdit(event)}
                                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                                  title="Edit milestone"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                                  title="Delete milestone"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex space-x-1">
                                <button
                                  onClick={handleSave}
                                  className="p-2 text-green-400 hover:text-green-300 transition-colors duration-200"
                                  title="Save changes"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                                  title="Cancel editing"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </AdminOnly>
                        </div>
                      </div>

                      {/* Description */}
                      {isCurrentlyEditing ? (
                        <textarea
                          value={editingEvent?.description || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent!, description: e.target.value })}
                          className="text-gray-300 mb-4 bg-slate-600 px-3 py-2 rounded w-full h-20"
                        />
                      ) : (
                        <p className="text-gray-300 mb-4">{event.description}</p>
                      )}

                      {/* Details */}
                      <ul className="space-y-1">
                        {(isCurrentlyEditing ? editingEvent?.details || [] : event.details).map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                            {isCurrentlyEditing ? (
                              <input
                                type="text"
                                value={detail}
                                onChange={(e) => {
                                  const newDetails = [...(editingEvent?.details || [])];
                                  newDetails[detailIndex] = e.target.value;
                                  setEditingEvent({ ...editingEvent!, details: newDetails });
                                }}
                                className="bg-slate-600 px-2 py-1 rounded flex-1"
                              />
                            ) : (
                              detail
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-xl p-8 border border-blue-500/30">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Contribute</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              As a healthcare professional and active retail trader transitioning to tech, I bring analytical rigor, patient-focused problem-solving, and experience managing complex systems under pressure. My background spans pharmacy, optometry, and financial markets - providing unique insights for healthcare tech, fintech solutions, and understanding how end-users actually interact with complex systems. This diverse experience led me to build ForexAcuity, a real-time trading analytics platform, solving problems I personally faced as a trader. Looking to contribute these cross-industry perspectives to teams that value diverse backgrounds and foster collaborative learning cultures.
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