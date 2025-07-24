'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how my healthcare background and 
            technical skills can bring unique value to your team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Let's Connect</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:zaehid.hakim78@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                    zaehid.hakim78@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <a href="tel:+1234567890" className="text-white hover:text-green-400 transition-colors">
                    Available upon request
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white">Open to remote & on-site opportunities</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Find me on</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/zaehid-hakim-1004016b" 
                  className="p-3 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="bg-green-600/20 border border-green-600/30 rounded-lg p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}