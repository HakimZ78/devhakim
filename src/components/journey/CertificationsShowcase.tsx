'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  FileText
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer?: string;
  provider?: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  completion_date?: string;
  expected_date?: string;
  date_earned?: string;
  credential_id?: string;
  certificate_url?: string;
  certificate_pdf?: string;
  skills: string[];
  order_index?: number;
}

export default function CertificationsShowcase() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/journey/certifications');
      if (!response.ok) throw new Error('Failed to fetch certifications');
      const data = await response.json();
      setCertifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCertifications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'in_progress':
        return <Clock className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in_progress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Planned';
    }
  };

  const getDate = (cert: Certification) => {
    return cert.completion_date || cert.expected_date || cert.date_earned || '';
  };

  const getIssuer = (cert: Certification) => {
    return cert.issuer || cert.provider || '';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading certifications: {error}</p>
        <button 
          onClick={fetchCertifications}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const completedCerts = certifications.filter(c => c.status === 'completed');
  const inProgressCerts = certifications.filter(c => c.status === 'in_progress');
  const plannedCerts = certifications.filter(c => c.status === 'planned');

  return (
    <div className="space-y-8">
      {/* Completed Certifications */}
      {completedCerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
            Completed
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {completedCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Award className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{cert.title}</h4>
                      <p className="text-gray-400 text-sm">{getIssuer(cert)}</p>
                    </div>
                  </div>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert.status)}`}>
                    {getStatusIcon(cert.status)}
                    <span className="ml-1">{getStatusText(cert.status)}</span>
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{cert.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {getDate(cert)}
                  </div>
                  {(cert.certificate_url || cert.certificate_pdf) && (
                    <a
                      href={cert.certificate_url || cert.certificate_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      View Certificate
                    </a>
                  )}
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Certifications */}
      {inProgressCerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Clock className="w-6 h-6 text-blue-400 mr-2" />
            In Progress
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {inProgressCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{cert.title}</h4>
                      <p className="text-gray-400 text-sm">{getIssuer(cert)}</p>
                    </div>
                  </div>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert.status)}`}>
                    {getStatusIcon(cert.status)}
                    <span className="ml-1">{getStatusText(cert.status)}</span>
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{cert.description}</p>

                {getDate(cert) && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Expected: {getDate(cert)}
                  </div>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Planned Certifications */}
      {plannedCerts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Star className="w-6 h-6 text-gray-400 mr-2" />
            Planned
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {plannedCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-500/10 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{cert.title}</h4>
                      <p className="text-gray-400 text-sm">{getIssuer(cert)}</p>
                    </div>
                  </div>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert.status)}`}>
                    {getStatusIcon(cert.status)}
                    <span className="ml-1">{getStatusText(cert.status)}</span>
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{cert.description}</p>

                {getDate(cert) && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Target: {getDate(cert)}
                  </div>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {certifications.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No certifications added yet.</p>
        </div>
      )}
    </div>
  );
}