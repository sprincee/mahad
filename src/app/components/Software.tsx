'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Calendar, Download, ArrowLeft, Code2, Sparkles } from 'lucide-react'

const Software: React.FC = () => {
  const [activeSection, setActiveSection] = useState('experience')

  const experience = [
    {
      period: 'JUN 2025 — PRESENT',
      title: 'Software Engineering Intern',
      subtitle: 'Fullstack + Infrastructure',
      company: 'The Wills Group',
      description: 'Architecting full-stack React.js dashboards, performing TLS certificate provisioning, aiding in building ML pipelines with 1TB of enterprise data, and establishing testing protocols with 85% coverage.',
      tech: ['React.js', 'TypeScript', 'Pandas', 'GitHub Actions', 'ESLint']
    },
    {
      period: 'JUN 2024 — AUG 2024',
      title: 'Software Engineering Intern',
      subtitle: 'Networks',
      company: 'The Wills Group',
      description: 'Deployed 8+ Meraki MX67/MS120s to retail sites, hacked together initialization scripts for 45+ BOHA IoT devices, shipping 50% ahead of schedule.',
      tech: ['Meraki Portal', 'PowerShell', 'IoT', 'Networking']
    },
    {
      period: 'JUN 2023 — AUG 2023',
      title: 'Software Engineering Intern',
      subtitle: 'DevOps Automation',
      company: 'The Wills Group',
      description: 'Resolved 40+ hardware/software tickets, automated PC imaging using Microsoft Deployment Toolkit, reducing device setup time by 50% across regional sites.',
      tech: ['PowerShell', 'MDT', 'Windows Imaging']
    },
    {
      period: 'JUN 2022 — SEP 2022',
      title: 'Data Science Intern',
      subtitle: 'Database + Backend Development',
      company: 'ReMax One',
      description: 'Designed scalable MySQL database replacing Excel workflows, normalized 150+ client and 200+ property records, reducing query latency by 45%.',
      tech: ['MySQL', 'Python', 'SQLAlchemy', 'Pandas']
    }
  ]

  const projects = [
    {
      title: 'PoliView',
      date: 'May 2025',
      description: 'Full-stack legislative platform that tracks bills and congressional actions, enabling users to stay informed on vital U.S. legislation.',
      tech: ['React.js', 'Next.js', 'TypeScript', 'Supabase', 'Congress.gov API'],
      github: 'https://github.com/sprincee/poliview',
      live: 'https://poliview.vercel.app'
    },
    {
      title: 'Flame',
      date: 'Oct 2024',
      description: 'AI-powered thumbnail generator utilizing OpenAI GPT-4o, handling user-auth and bulk image generation at scale with 35+ peak users.',
      tech: ['React.js', 'TypeScript', 'Firebase', 'OpenAI DALL-E', 'Tailwind'],
      github: 'https://github.com/sprincee/flame',
      live: 'https://flame-ai.vercel.app'
    },
    {
      title: 'QuranQuest',
      date: 'Dec 2023',
      description: 'Islamic education platform serving 2+ local mosques with interactive quizzes, progress tracking, and personalized learning modules for 80+ students.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Python'],
      github: 'https://github.com/sprincee/quranquest',
      live: null
    },
    {
      title: 'EnchantmentPLUS',
      date: 'Aug 2023',
      description: 'Minecraft mod revamping the enchantment system, deployed on production server handling 100+ concurrent connections.',
      tech: ['Java', 'Forge API', 'Spigot API', 'Blockbench'],
      github: 'https://github.com/sprincee',
      live: null
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  }

  return (
    <section className="relative min-h-screen w-full">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left Column - Fixed with better spacing */}
        <motion.div 
          className="w-full lg:w-[35%] xl:w-[30%] px-6 sm:px-8 lg:px-12 py-8 lg:py-12 lg:fixed lg:h-screen lg:overflow-y-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="h-full flex flex-col">
            {/* Back Button */}
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-6 group flex-shrink-0"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
              <span className="font-light text-sm">Back to Home</span>
            </motion.a>

            {/* Artistic Header */}
            <div className="mb-8 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <Code2 size={24} strokeWidth={1} className="text-gray-500" />
                <Sparkles size={18} strokeWidth={1} className="text-gray-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extralight text-white mb-4 leading-tight">
                where code meets <br />
                <span className="italic">creativity</span>
              </h1>
              <p className="text-base font-extralight text-gray-400 leading-relaxed">
              Since getting my first computer at age 5, 
              I&apos;ve been captivated by what&apos;s possible when you combine technology and the arts. This is where my technical and design worlds collide.
              </p>
            </div>

            {/* Navigation - with auto spacing */}
            <nav className="mb-8 flex-grow">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('experience')}
                    className={`text-left font-extralight tracking-wider transition-all duration-300 ${
                      activeSection === 'experience' 
                        ? 'text-white translate-x-2' 
                        : 'text-gray-500 hover:text-gray-300 hover:translate-x-1'
                    }`}
                  >
                    EXPERIENCE
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('projects')}
                    className={`text-left font-extralight tracking-wider transition-all duration-300 ${
                      activeSection === 'projects' 
                        ? 'text-white translate-x-2' 
                        : 'text-gray-500 hover:text-gray-300 hover:translate-x-1'
                    }`}
                  >
                    PROJECTS
                  </button>
                </li>
              </ul>
            </nav>

            {/* Bottom Section - Resume & Social */}
            <div className="flex-shrink-0 space-y-6">
              {/* Resume Download */}
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-full hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-300 group text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)'
                }}
              >
                <Download size={16} strokeWidth={1.5} />
                <span className="font-extralight">Download Resume</span>
              </motion.a>

              {/* Social Links */}
              <div className="flex gap-5">
                <a
                  href="https://github.com/sprincee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://linkedin.com/in/mahad-skhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:mahadsuhaibkhan@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Scrollable */}
        <div className="w-full lg:w-[65%] xl:w-[70%] lg:ml-[35%] xl:ml-[30%]">
          <motion.div
            className="px-6 sm:px-8 lg:px-12 xl:px-20 py-8 lg:py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Experience Section */}
            {activeSection === 'experience' && (
              <motion.div variants={itemVariants}>
                <div className="space-y-10">
                  {experience.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-6"
                    >
                      <div className="text-xs font-extralight text-gray-500 uppercase tracking-wider">
                        {job.period}
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-extralight text-white mb-1">
                          {job.title}
                        </h4>
                        {job.subtitle && (
                          <h5 className="text-base sm:text-lg font-extralight text-gray-300 mb-1">
                            {job.subtitle}
                          </h5>
                        )}
                        <h5 className="text-base sm:text-lg font-extralight text-gray-400 mb-2">
                          {job.company}
                        </h5>
                        <p className="text-gray-300 font-extralight leading-relaxed mb-3 text-sm">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs text-gray-400 border border-gray-800 px-2 py-0.5 rounded-full font-extralight"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <motion.div variants={itemVariants}>
                <div className="space-y-10">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-6"
                    >
                      <div className="flex items-start gap-1.5 text-xs font-extralight text-gray-500 uppercase tracking-wider">
                        <Calendar size={12} className="mt-0.5" />
                        {project.date}
                      </div>
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-xl sm:text-2xl font-extralight text-white">
                            {project.title}
                          </h4>
                          <div className="flex gap-3">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-white transition-colors duration-300"
                              aria-label="GitHub"
                            >
                              <Github size={16} strokeWidth={1.5} />
                            </a>
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors duration-300"
                                aria-label="Live Demo"
                              >
                                <ExternalLink size={16} strokeWidth={1.5} />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 font-extralight leading-relaxed mb-3 text-sm">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs text-gray-400 border border-gray-800 px-2 py-0.5 rounded-full font-extralight"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap');
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .font-extralight {
          font-weight: 200;
        }
      `}</style>
    </section>
  )
}

export default Software