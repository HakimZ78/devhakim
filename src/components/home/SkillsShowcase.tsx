'use client';

import { Code, Database, Globe, Zap } from 'lucide-react';

const skillCategories = [
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Full-Stack Development',
    skills: ['Python', 'FastAPI', 'Django', 'React', 'TypeScript', 'Next.js'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Trading Analytics & Fintech',
    skills: ['Real-time Dashboards', 'WebSocket APIs', 'Data Visualization', 'Trading Signals', 'Payment Systems'],
    color: 'from-green-500 to-green-600'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Backend & Data',
    skills: ['PostgreSQL', 'Supabase', 'Express.js', 'RESTful APIs', 'Database Design'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'npm Workspaces', 'Monorepo', 'CI/CD'],
    color: 'from-orange-500 to-orange-600'
  }
];

const currentFocus = [
  { skill: 'Trading Analytics', progress: 85 },
  { skill: 'Full-Stack Development', progress: 80 },
  { skill: 'Real-time Data Systems', progress: 75 },
  { skill: 'Database Design', progress: 70 },
  { skill: 'DevOps/Docker', progress: 60 }
];

export default function SkillsShowcase() {
  return (
    <section className="py-20 px-6 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-400">
            Building expertise through hands-on projects and real-world applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                <span className="text-white">{category.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-slate-600/50 text-gray-300 rounded-full text-sm border border-slate-500/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Learning Progress */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Current Learning Focus</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {currentFocus.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">{item.skill}</span>
                  <span className="text-gray-400">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Transition Highlight */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 font-semibold mr-2">🏥</span>
            <span className="text-gray-300">Healthcare Professional</span>
            <span className="text-gray-500 mx-3">→</span>
            <span className="text-green-400 font-semibold mr-2">💻</span>
            <span className="text-gray-300">Software Engineer</span>
          </div>
          <p className="text-gray-400 mt-3 text-sm">
            Leveraging domain expertise in healthcare while mastering modern software development
          </p>
        </div>
      </div>
    </section>
  );
}