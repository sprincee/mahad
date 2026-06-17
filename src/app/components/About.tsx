'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const About: React.FC = () => {
  const interests = [
    'Photography',
    'Writing Fiction',
    'Calisthenics',
    'Anime & Manga',
    'Gaming',
    'Building Software',
  ]

  const now = [
    'Studying for the AWS SAA',
    'Planning a trip to Canada',
    'Making my own cologne',
    'Watching One Piece',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
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
    <section id="about" className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-24 md:py-0">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-thin text-gray-900 mb-2">
                  About
                </h2>
                <div className="w-24 h-[1px] bg-gray-300" />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-lg sm:text-xl font-light text-gray-900 leading-relaxed">
                  I&apos;m a 23-year-old Pakistani-American from La Plata, Maryland, and I&apos;m{' '}
                  <em>passionate</em> about bringing ideas to life — whatever form that takes.
                </p>
                <p className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed">
                  From cardboard sculptures as a kid to recreating my entire house in Minecraft,
                  writing short stories to building software. I&apos;ve always believed you can
                  make something remarkable out of anything. Paper becomes a story. Code becomes
                  a product. Trash becomes art.
                </p>
                <p className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed">
                  When I&apos;m not at my desk, I&apos;m usually out with my camera or on some
                  adventure with my friends.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <a
                  href="https://linkedin.com/in/mahad-skhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors duration-300 group"
                >
                  <span className="text-lg font-light">Let&apos;s build</span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Interests */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light text-gray-900 mb-6">Interests</h3>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="text-gray-600 font-light"
                    >
                      {interest}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Now */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light text-gray-900 mb-6">Currently...</h3>
                <div className="space-y-4">
                  {now.map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="text-gray-600 font-light"
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-light mt-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Last updated June 2026
                </span>
              </motion.div>

              {/* Connect */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light text-gray-900 mb-6">Connect with me =&#41;</h3>
                <div className="flex gap-6">
                  <a
                    href="mailto:mahadsuhaibkhan@gmail.com"
                    className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300"
                  >
                    Email
                  </a>
                  <a
                    href="https://github.com/sprincee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mahad-skhan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About