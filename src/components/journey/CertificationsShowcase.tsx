'use client';

import { motion } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  completionDate?: string;
  expectedDate?: string;
  credentialUrl?: string;
  skills: string[];
  category: 'degree' | 'certification' | 'course' | 'bootcamp';
  priority: 'high' | 'medium' | 'low';
}

interface Course {
  id: string;
  title: string;
  platform: string;
  instructor: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  duration: string;
  completionDate?: string;
  expectedDate?: string;
  certificateUrl?: string;
  skills: string[];
}

const certifications: Certification[] = [
  {
    id: 'msc-cs',
    title: 'MSc Computer Science',
    issuer: 'University of London',
    description: 'Master\'s degree focusing on Machine Learning, AI, and Software Engineering',
    status: 'in-progress',
    expectedDate: '2025-09-30',
    skills: ['Machine Learning', 'AI', 'Algorithms', 'Software Engineering', 'Research'],
    category: 'degree',
    priority: 'high'
  },
  {
    id: 'aws-saa',
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    description: 'Cloud architecture and AWS services expertise',
    status: 'planned',
    expectedDate: '2025-03-15',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security', 'Scalability'],
    category: 'certification',
    priority: 'high'
  },
  {
    id: 'python-institute',
    title: 'PCAP - Certified Associate in Python Programming',
    issuer: 'Python Institute',
    description: 'Professional Python programming certification',
    status: 'planned',
    expectedDate: '2025-04-30',
    skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
    category: 'certification',
    priority: 'medium'
  },
  {
    id: 'docker-certified',
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    description: 'Container orchestration and Docker expertise',
    status: 'planned',
    expectedDate: '2025-05-15',
    skills: ['Docker', 'Containers', 'DevOps', 'Microservices'],
    category: 'certification',
    priority: 'medium'
  }
];

const courses: Course[] = [
  {
    id: 'fastapi-course',
    title: 'FastAPI - The Complete Course',
    platform: 'Udemy',
    instructor: 'Eric Roby',
    description: 'Comprehensive FastAPI development from basics to advanced features',
    status: 'completed',
    progress: 100,
    duration: '20 hours',
    completionDate: '2024-08-15',
    skills: ['FastAPI', 'Python', 'API Development', 'Authentication', 'Testing']
  },
  {
    id: 'react-advanced',
    title: 'Advanced React Development',
    platform: 'Frontend Masters',
    instructor: 'Brian Holt',
    description: 'Advanced React patterns, performance optimization, and state management',
    status: 'in-progress',
    progress: 75,
    duration: '15 hours',
    expectedDate: '2025-02-28',
    skills: ['React', 'TypeScript', 'Performance', 'State Management', 'Testing']
  },
  {
    id: 'ml-specialization',
    title: 'Machine Learning Specialization',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    description: 'Comprehensive ML course covering algorithms, neural networks, and applications',
    status: 'in-progress',
    progress: 60,
    duration: '60 hours',
    expectedDate: '2025-04-15',
    skills: ['Machine Learning', 'Neural Networks', 'TensorFlow', 'Python', 'Mathematics']
  },
  {
    id: 'system-design',
    title: 'System Design Interview Course',
    platform: 'Educative',
    instructor: 'Multiple Experts',
    description: 'Learn to design scalable systems for technical interviews',
    status: 'planned',
    progress: 0,
    duration: '25 hours',
    expectedDate: '2025-03-30',
    skills: ['System Design', 'Architecture', 'Scalability', 'Databases', 'Microservices']
  }
];

const statusColors = {
  completed: 'from-green-500 to-green-600',
  'in-progress': 'from-blue-500 to-blue-600',
  planned: 'from-gray-500 to-gray-600'
};

const categoryIcons = {
  degree: GraduationCap,
  certification: Award,
  course: BookOpen,
  bootcamp: Star
};

export default function CertificationsShowcase() {
  const completedCertifications = certifications.filter(c => c.status === 'completed').length;
  const completedCourses = courses.filter(c => c.status === 'completed').length;
  const inProgressCount = [...certifications, ...courses].filter(item => item.status === 'in-progress').length;

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Certifications</p>
              <p className="text-2xl font-bold">{completedCertifications}</p>
            </div>
            <Award className="w-8 h-8 text-purple-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Courses</p>
              <p className="text-2xl font-bold">{completedCourses}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">In Progress</p>
              <p className="text-2xl font-bold">{inProgressCount}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Learning Hours</p>
              <p className="text-2xl font-bold">500+</p>
            </div>
            <GraduationCap className="w-8 h-8 text-green-200" />
          </div>
        </motion.div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2 text-yellow-400" />
          Certifications & Degrees
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const IconComponent = categoryIcons[cert.category];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${statusColors[cert.status]} mr-3`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                      <p className="text-blue-400 text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {cert.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {cert.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-400" />}
                    {cert.credentialUrl && (
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-2 cursor-pointer hover:text-white" />
                    )}
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{cert.description}</p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-slate-700 text-white text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="capitalize">{cert.category}</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {cert.status === 'completed' && cert.completionDate 
                        ? `Completed: ${new Date(cert.completionDate).toLocaleDateString()}`
                        : cert.expectedDate 
                        ? `Expected: ${new Date(cert.expectedDate).toLocaleDateString()}`
                        : 'Date TBD'
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Courses */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-400" />
          Online Courses
        </h3>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${statusColors[course.status]} mr-4`}>
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                    <p className="text-gray-400 text-sm">{course.platform} • {course.instructor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">{course.duration}</div>
                  {course.certificateUrl && (
                    <ExternalLink className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-300" />
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-4">{course.description}</p>

              {course.status !== 'planned' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-blue-400 font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${statusColors[course.status]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-slate-700 text-white text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {course.status === 'completed' && course.completionDate 
                    ? `Completed: ${new Date(course.completionDate).toLocaleDateString()}`
                    : course.expectedDate 
                    ? `Expected completion: ${new Date(course.expectedDate).toLocaleDateString()}`
                    : 'Start date TBD'
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}