'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const About: React.FC = () => {
  const skills = [
    'React / Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'UI/UX Design',
    'Photography'
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
    <section id="about" className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
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
                <p className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed">
                <strong>I&apos;m a 22-year old creative from La Plata, Maryland, passionate about bringing ideas to life.</strong> 
                </p>
                <p className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed">
                From making silly YouTube videos for my family or painstakingly recreating my entire house in Minecraft, 
                I&apos;ve always been drawn to creating something out of nothing.
                </p>
                <p className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed">
                When I&apos;m not contemplating running away and starting my life over, I&apos;m out with my camera, capturing life&apos;s moments. 
                If not that, you&apos;ll find me on adventures with my friends, exploring hidden spots, or just soaking up as much life as I can.
                </p>
                <p className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed">
                Blending my engineering background with my artistic eye, I seek to create digital experiences that actually mean something 
                -- because I want to be understood, not just seen.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <a
                  href="https://linkedin.com/in/mahadkhan"
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

            {/* Right Column - Skills & Info */}
            <div className="space-y-12">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light text-gray-900 mb-6">Skills & Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="text-gray-600 font-light"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light text-gray-900 mb-6">Currently</h3>
                <div className="space-y-4 text-gray-600 font-light">
                  <p>Building innovative web experiences</p>
                  <p>Exploring computational photography</p>
                  <p>Writing about design & technology</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light text-gray-900 mb-6">Connect with me =&#41;</h3>
                <div className="space-y-2">
                  <a 
                    href="mailto:hello@mahadkhan.com" 
                    className="block text-gray-600 font-light hover:text-gray-900 transition-colors duration-300"
                  >
                    mahadsuhaibkhan@gmail.com
                  </a>
                  <a 
                    href="https://github.com/sprincee" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 font-light hover:text-gray-900 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mahad-skhan/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 font-light hover:text-gray-900 transition-colors duration-300"
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