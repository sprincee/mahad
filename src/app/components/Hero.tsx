'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero: React.FC = () => {
  const words = ['create', 'build', 'design', 'capture', 'develop', 'craft', 'imagine']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [words.length])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const wordVariants: Variants = {
    enter: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' seed='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Text */}
        <motion.div 
          className="text-center max-w-7xl mx-auto"
          variants={itemVariants}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tight leading-[0.9] font-sans">
            <span className="text-white/90 block sm:inline">hi, i&apos;m </span>
            <span className="text-white/95 italic inline-block transform hover:scale-105 transition-transform duration-300">
              mahad
            </span>
            <span className="text-white/90">,</span>
            <br className="hidden sm:block" />
            <span className="text-white/90">i </span>
            <span className="inline-block relative h-[1em] w-[200px] sm:w-[280px] md:w-[340px] lg:w-[400px] xl:w-[500px] overflow-hidden align-middle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  variants={wordVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 text-white font-bold"
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-white/90"> things</span>
          </h1>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Custom Font Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .font-thin {
          font-weight: 200;
          letter-spacing: -0.02em;
        }
        
        .font-bold {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  )
}

export default Hero