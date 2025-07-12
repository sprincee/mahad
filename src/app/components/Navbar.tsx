'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutSection, setIsAboutSection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        setIsAboutSection(rect.top <= 100 && rect.bottom >= 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Software Engineering', href: '/software', external: false },
    { name: 'Photography', href: '/photography', external: false },
    { name: 'Writing', href: 'https://medium.com/@petrichor2', external: true },
    { name: 'About', href: '#about', external: false }
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut
      }
    }
  }

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-start">
          {/* Logo/Name Section */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            className={`${isAboutSection ? 'text-gray-900' : 'text-white'} transition-colors duration-300 cursor-pointer`}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-tight">Mahad Khan</h2>
            <p className={`text-xs sm:text-sm ${isAboutSection ? 'text-gray-600' : 'text-gray-400'} font-light transition-colors duration-300`}>Designer</p>
          </motion.a>

          {/* Hamburger Menu Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-50 p-2 ${isAboutSection ? 'text-gray-900 hover:text-gray-600' : 'text-white hover:text-gray-300'} transition-colors duration-300`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 h-full w-full sm:w-[400px] md:w-[450px] z-40 bg-gradient-to-br from-gray-900 via-black to-gray-950"
            >
              {/* Menu Content */}
              <div className="flex flex-col justify-center h-full px-8 sm:px-12 md:px-16">
                <nav>
                  <ul className="space-y-6 sm:space-y-8">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="group relative block"
                        >
                          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-white hover:text-gray-300 transition-colors duration-300">
                            {link.name}
                          </span>
                          <motion.span
                            className="absolute left-0 -bottom-2 h-[1px] bg-white/30"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Additional Menu Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-16 sm:mt-20 text-gray-400 text-xs sm:text-sm"
                >
                  <p>© 2025 Mahad Khan</p>
                  <p className="mt-2">mahadsuhaibkhan@gmail.com</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar