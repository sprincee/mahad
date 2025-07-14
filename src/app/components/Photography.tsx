'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Sparkles, Instagram, MessageCircle } from 'lucide-react'

const Photography: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 0.5 // Adjust speed as needed

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed
        scrollContainer.scrollTop = scrollAmount

        // Reset when reaching bottom
        if (scrollAmount >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
          scrollAmount = 0
        }
      }
    }

    const intervalId = setInterval(autoScroll, 30)

    // Pause on hover
    const handleMouseEnter = () => clearInterval(intervalId)
    const handleMouseLeave = () => setInterval(autoScroll, 30)

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(intervalId)
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Sample photos - replace with your actual photos
  const photos = [
    { id: 1, src: '/photos/fav1.jpg', title: 'Willow Grad', aspect: 'portrait' },
    { id: 2, src: '/photos/fav2.jpg', title: 'Frame the Moment', aspect: 'portrait' },
    { id: 3, src: '/photos/fav3.jpg', title: 'Stairway Gaze', aspect: 'portrait' },
    { id: 4, src: '/photos/fav4.jpg', title: 'Sari & Stance', aspect: 'portrait' },
    { id: 5, src: '/photos/fav5.jpg', title: 'Bold in Red', aspect: 'portrait' },
    { id: 6, src: '/photos/fav6.jpg', title: 'Ocean Eyes', aspect: 'portrait' },
    { id: 7, src: '/photos/fav7.jpg', title: 'Side Profile Glow', aspect: 'portrait' },
    { id: 8, src: '/photos/fav8.jpg', title: 'Tree Climber', aspect: 'portrait' },
    { id: 9, src: '/photos/fav10.jpg', title: 'Aspen Heights', aspect: 'portrait' },
    { id: 10, src: '/photos/fav11.jpg', title: 'Tidal Basin Look', aspect: 'portrait' },
  ]

  // Duplicate for infinite scroll effect
  const allPhotos = [...photos, ...photos]

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
    <section className="relative min-h-screen w-full bg-white">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Left Column - Fixed with better spacing */}
        <motion.div 
          className="w-full lg:w-[40%] xl:w-[35%] px-6 sm:px-8 lg:px-12 py-8 lg:py-12 lg:fixed lg:h-screen lg:overflow-y-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="h-full flex flex-col">
            {/* Back Button */}
            <motion.a
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-6 group flex-shrink-0"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
              <span className="font-light text-sm">Back to Home</span>
            </motion.a>

            {/* Artistic Header */}
            <div className="mb-8 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <Camera size={24} strokeWidth={1} className="text-gray-400" />
                <Sparkles size={18} strokeWidth={1} className="text-gray-300" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extralight text-gray-900 mb-4 leading-tight">
                capturing <br />
                <span className="italic">moments</span> & <br />
                <span className="text-gray-600">memories</span>
              </h1>
              <p className="text-base font-extralight text-gray-600 leading-relaxed">
              My late father loved capturing the beauty in everyday moments with his Canon EOS 50D. 
              Now, with my own camera, I&apos;m continuing what he started -- finding the extraordinary hiding in the mundane.
              </p>
            </div>

            {/* CTA Section - with auto spacing */}
            <div className="space-y-4 mb-8 flex-grow">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <MessageCircle size={18} strokeWidth={1.5} className="text-gray-400" />
                <p className="text-gray-700 font-extralight text-sm">Feel free to book me!</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Instagram size={18} strokeWidth={1.5} className="text-gray-400" />
                <p className="text-gray-700 font-extralight text-sm">DM for pricing!</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Camera size={18} strokeWidth={1.5} className="text-gray-400" />
                <p className="text-gray-700 font-extralight text-sm">Let me capture your next big thing!</p>
              </motion.div>
            </div>

            {/* Instagram Link - Bottom Section */}
            <div className="flex-shrink-0 pb-4">
              <motion.a
                href="https://instagram.com/mahadphotos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-900 border border-gray-300 rounded-full hover:from-purple-500/30 hover:to-pink-500/30 hover:border-gray-400 transition-all duration-300 group text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={16} strokeWidth={1.5} />
                <span className="font-extralight">@mahadphotos</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Photo Carousel */}
        <div className="w-full lg:w-[60%] xl:w-[65%] lg:ml-[40%] xl:ml-[35%] h-screen overflow-hidden">
          <motion.div
            ref={scrollRef}
            className="h-full overflow-y-scroll scrollbar-hide"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="py-12 px-8 sm:px-12 lg:px-16 xl:px-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {allPhotos.map((photo, index) => (
                  <motion.div
                    key={`${photo.id}-${index}`}
                    variants={itemVariants}
                    className={`relative overflow-hidden bg-gray-100 ${
                      photo.aspect === 'portrait' ? 'aspect-[3/4]' :
                      photo.aspect === 'landscape' ? 'aspect-[4/3]' :
                      'aspect-square'
                    }`}
                  >
                    {/* Placeholder - Replace with actual images */}
                  <div className='relative h-full w-full'>
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      priority
                      className="object-cover"
                    />
                    </div>
                    
                    {/* Hover Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-500 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap');
        
        .font-extralight {
          font-weight: 200;
        }
      `}</style>
    </section>
  )
}

export default Photography