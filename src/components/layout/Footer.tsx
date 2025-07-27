'use client';

import Link from 'next/link';
import { Linkedin, Mail, Terminal, Heart } from 'lucide-react';

const quickLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/commands', label: 'Commands' },
  { href: '/templates', label: 'Templates' },
  { href: '/journey', label: 'Journey' },
  { href: '/contact', label: 'Contact' }
];

const projectLinks = [
  { href: '/projects/forexacuity', label: 'ForexAcuity' },
  { href: '/projects/portfolio', label: 'Portfolio Website' },
  { href: '/projects/healthcare-api', label: 'Healthcare API' },
  { href: '/projects', label: 'View All Projects' }
];

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/zaehid-hakim-1004016b',
    label: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />
  },
  {
    href: 'mailto:zaehid.hakim78@gmail.com',
    label: 'Email',
    icon: <Mail className="w-5 h-5" />
  }
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">DevHakim</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Full-Stack Developer transitioning from healthcare to software engineering. 
              Aiming to specialise in fintech applications and real-time systems but open to general Full-Stack.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-slate-700/50 rounded-lg"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects */}
          <div>
            <h3 className="text-white font-semibold mb-4">Featured Projects</h3>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Learning */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 mb-4">
              <p className="text-gray-400">
                <span className="font-medium">Status:</span> Open to opportunities
              </p>
              <p className="text-gray-400">
                <span className="font-medium">Focus:</span> Fintech & Full-Stack Python
              </p>
              <p className="text-gray-400">
                <span className="font-medium">Location:</span> UK (Remote/Hybrid)
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 DevHakim. Built with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>and</span>
              <span className="text-blue-400 font-medium">Next.js</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>Built with:</span>
              <div className="flex space-x-2">
                {['Next.js', 'TypeScript', 'Tailwind'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-slate-700/50 rounded text-xs border border-slate-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Career Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">3</div>
              <div className="text-xs text-gray-400">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">100+</div>
              <div className="text-xs text-gray-400">Commands Learned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">800+</div>
              <div className="text-xs text-gray-400">Hours Learning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">12</div>
              <div className="text-xs text-gray-400">Months Journey</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}