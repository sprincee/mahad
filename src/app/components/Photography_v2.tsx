'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Instagram, Linkedin, X, ChevronLeft, ChevronRight, Send, Menu, ArrowUp } from 'lucide-react'

// ─── Config ────────────────────────────────────────────────────────────────────
const CDN = process.env.NEXT_PUBLIC_CDN_URL ?? 'https://d34bpsez1zvxwv.cloudfront.net'

// ─── Types ─────────────────────────────────────────────────────────────────────
type Category = 'all' | 'graduation' | 'portraits' | 'concerts' | 'bw'

interface Photo {
  id: string
  src: string
  alt: string
  category: Exclude<Category, 'all'>
  width: number
  height: number
}

// ─── Photo Manifest ────────────────────────────────────────────────────────────
const PHOTOS: Photo[] = [
  {
    id: 'home-1',
    src: `${CDN}/home/riyaFinalPhoto-16.jpg`,
    alt: 'Portrait — Riya',
    category: 'portraits',
    width: 1600,
    height: 2400,
  },
  {
    id: 'portraits-1',
    src: `${CDN}/portraits/NSA_Photo (2 of 17).jpg`,
    alt: 'NSA Portrait',
    category: 'portraits',
    width: 1600,
    height: 2400,
  },
  {
    id: 'graduation-1',
    src: `${CDN}/graduation/DavidGradPhoto-16.jpg`,
    alt: 'David — Graduation',
    category: 'graduation',
    width: 1600,
    height: 2400,
  },
  {
    id: 'concerts-1',
    src: `${CDN}/concerts/Moonfall-16.jpg`,
    alt: 'Moonfall Concert',
    category: 'concerts',
    width: 900,
    height: 1350,
  },
  {
    id: 'bw-1',
    src: `${CDN}/bw/BWExtra-9.jpg`,
    alt: 'B&W Series',
    category: 'bw',
    width: 1600,
    height: 2400,
  },
]

// ─── Category Tabs ─────────────────────────────────────────────────────────────
const TABS: { key: Category; label: string }[] = [
  { key: 'all',        label: 'All'        },
  { key: 'graduation', label: 'Graduation' },
  { key: 'portraits',  label: 'Portraits'  },
  { key: 'concerts',   label: 'Concerts'   },
  { key: 'bw',         label: 'B&W'        },
]

const SHOOT_TYPES = ['Graduation Portraits', 'Streetwear', 'Concerts / Events', 'Street', 'B&W', 'Other']
type FormStatus = 'idle' | 'sending' | 'success' | 'error'

// ─── Helpers ───────────────────────────────────────────────────────────────────
function splitIntoColumns<T>(items: T[], cols: number): T[][] {
  const columns: T[][] = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => columns[i % cols].push(item))
  return columns
}

const SERIF = "'Cormorant Garamond', Georgia, serif"

// ─── Sidebar Content (shared between desktop + mobile drawer) ──────────────────
interface SidebarContentProps {
  activeCategory: Category
  setActiveCategory: (c: Category) => void
  onBookClick: () => void
  onClose?: () => void
}

function SidebarContent({ activeCategory, setActiveCategory, onBookClick, onClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Back */}
      <motion.a
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-7 group"
        whileHover={{ x: -3 }}
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        <span className="text-sm tracking-wide" style={{ fontFamily: SERIF, fontWeight: 400 }}>Back to Home</span>
      </motion.a>

      {/* Hero text */}
      <div className="mb-7">
        <h1 className="text-4xl sm:text-5xl text-gray-900 leading-[1.1] mb-4" style={{ fontFamily: SERIF, fontWeight: 300 }}>
          capturing <br />
          <em className="italic text-gray-800">moments</em> &{' '}
          <span className="text-gray-700">memories</span>
        </h1>
        <p className="text-sm text-gray-700 leading-relaxed max-w-xs" style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '0.95rem' }}>
          My late father loved capturing the beauty in everyday moments with his Canon EOS 50D.
          Now, with my own camera, I&apos;m continuing what he started — finding the
          extraordinary hiding in the mundane.
        </p>
      </div>

      {/* Nav */}
      <nav>
        <ul className="flex flex-col gap-0.5">
          {TABS.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => { setActiveCategory(tab.key); onClose?.() }}
                className={`text-left tracking-widest uppercase transition-all duration-200 py-[5px] ${
                  activeCategory === tab.key ? 'text-gray-900' : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ fontFamily: SERIF, fontWeight: activeCategory === tab.key ? 500 : 400, fontSize: '0.8rem', letterSpacing: '0.12em' }}
              >
                {activeCategory === tab.key && <span className="mr-2 text-gray-400">—</span>}
                {tab.label}
              </button>
            </li>
          ))}

          <li className="my-2 border-t border-gray-200" />

          {/* Book a Shoot */}
          <li>
            <button
              onClick={() => { onBookClick(); onClose?.() }}
              className="text-left tracking-widest uppercase transition-all duration-200 py-[5px] text-gray-600 hover:text-gray-800 inline-block"
              style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.12em' }}
            >
              Book a Shoot
            </button>
          </li>

          {/* Availability indicator */}
          <li className="pt-1 pb-1">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] text-gray-500 tracking-wide" style={{ fontFamily: SERIF }}>
                Currently available for bookings
              </span>
            </span>
          </li>
        </ul>
      </nav>

      <div className="flex-grow" />

      {/* Social + copyright */}
      <div className="pb-2">
        <div className="flex items-center gap-4 mb-3">
          <a href="https://instagram.com/mahadphotos" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <Instagram size={15} strokeWidth={1.5} />
          </a>
          <a href="https://linkedin.com/in/mahadkhan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <Linkedin size={15} strokeWidth={1.5} />
          </a>
        </div>
        <p className="text-gray-500 text-[11px] tracking-wide" style={{ fontFamily: SERIF }}>
          © {new Date().getFullYear()} Mahad Photos. All rights reserved.
        </p>
        <p className="text-gray-400 text-[11px] tracking-widest uppercase mt-1" style={{ fontFamily: SERIF }}>
          Est. 2023
        </p>
      </div>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  photos: Photo[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index]
  const touchStartX = useRef<number | null>(null)

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) { onNext() } else { onPrev() }
    }
    touchStartX.current = null
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10" onClick={onClose} aria-label="Close">
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest font-light">
        {index + 1} / {photos.length}
      </span>

      {/* Prev — hidden on mobile, use swipe */}
      <button className="absolute left-4 text-white/40 hover:text-white transition-colors z-10 p-2 hidden sm:block" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous photo">
        <ChevronLeft size={32} strokeWidth={1} />
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="object-contain max-h-[90vh] w-auto select-none"
          quality={90}
          priority
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        {/* Watermark */}
        <span
          className="absolute bottom-3 right-3 text-white/20 text-[10px] tracking-widest pointer-events-none select-none"
          style={{ fontFamily: SERIF }}
        >
          © mahad.studio
        </span>
      </motion.div>

      {/* Next — hidden on mobile, use swipe */}
      <button className="absolute right-4 text-white/40 hover:text-white transition-colors z-10 p-2 hidden sm:block" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next photo">
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* Swipe hint — mobile only, fades after first swipe */}
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest sm:hidden">
        swipe to navigate
      </p>

      {/* Caption */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest font-light">
        {photo.alt}
      </p>
    </motion.div>
  )
}

// ─── Contact Modal ─────────────────────────────────────────────────────────────
interface ContactModalProps { onClose: () => void }

function ContactModal({ onClose }: ContactModalProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', shootType: '', date: '', message: '' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputClass = `w-full border-b border-gray-300 bg-transparent py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-gray-700`
  const labelClass = `block text-[11px] tracking-widest uppercase text-gray-700 mb-1`

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-md bg-white z-10 p-8 sm:p-10 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Close">
          <X size={18} strokeWidth={1.5} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-3" style={{ fontFamily: SERIF, fontWeight: 300 }}>Message sent.</p>
            <p className="text-sm text-gray-700 mb-8" style={{ fontFamily: SERIF }}>I&apos;ll get back to you within 24–48 hours.</p>
            <button onClick={onClose} className="text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors" style={{ fontFamily: SERIF }}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl mb-1 text-gray-900" style={{ fontFamily: SERIF, fontWeight: 500 }}>Book a Shoot</h2>
            <p className="text-xs text-gray-600 tracking-wide mb-8" style={{ fontFamily: SERIF }}>Fill in the details and I&apos;ll be in touch.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={{ fontFamily: SERIF }}>Name</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={inputClass} style={{ fontFamily: SERIF }} required />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: SERIF }}>Email</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} className={inputClass} style={{ fontFamily: SERIF }} required />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: SERIF }}>Shoot Type</label>
                <select value={form.shootType} onChange={set('shootType')} className={`${inputClass} cursor-pointer`} style={{ fontFamily: SERIF }} required>
                  <option value="" disabled>Select a type</option>
                  {SHOOT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: SERIF }}>Preferred Date <span className="normal-case text-gray-400">(optional)</span></label>
                <input type="date" value={form.date} onChange={set('date')} className={inputClass} style={{ fontFamily: SERIF }} />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: SERIF }}>Message</label>
                <textarea placeholder="Tell me about your vision..." value={form.message} onChange={set('message')} rows={3} className={`${inputClass} resize-none`} style={{ fontFamily: SERIF }} required />
              </div>
              {status === 'error' && <p className="text-xs text-red-500">{errorMsg}</p>}
              <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50" style={{ fontFamily: SERIF }}>
                {status === 'sending' ? 'Sending...' : <><Send size={12} strokeWidth={1.5} />Send Inquiry</>}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Gallery Image Card ────────────────────────────────────────────────────────
interface GalleryImageProps { photo: Photo; index: number; onClick: () => void }

function GalleryImage({ photo, index, onClick }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      className="relative w-full overflow-hidden bg-gray-100 cursor-pointer group"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        quality={85}
        loading={index < 2 ? 'eager' : 'lazy'}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
const PhotographyV2: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  // Back to top visibility
  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 300)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Lock scroll when drawer open
  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const columns2 = splitIntoColumns(filtered, 2)
  const columns3 = splitIntoColumns(filtered, 3)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        .photo-grid img { -webkit-user-drag: none; user-select: none; }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
      `}</style>

      <section className="relative min-h-screen w-full bg-white" onContextMenu={(e) => e.preventDefault()}>

        {/* ── Mobile Top Bar (< lg) ─────────────────────────────── */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <span className="text-base text-gray-900" style={{ fontFamily: SERIF, fontWeight: 400 }}>
            Mahad&apos;s Studio
          </span>
          <span className="text-[10px] text-gray-400 tracking-widest uppercase hidden xs:inline" style={{ fontFamily: SERIF }}>
            Est. 2023
          </span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-gray-700 hover:text-gray-900 transition-colors p-1"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Mobile Drawer ─────────────────────────────────────── */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div
                className="fixed top-0 left-0 bottom-0 z-50 w-[80vw] max-w-xs bg-white px-8 py-8 overflow-y-auto"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <button onClick={() => setDrawerOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900" aria-label="Close menu">
                  <X size={18} strokeWidth={1.5} />
                </button>
                <SidebarContent
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  onBookClick={() => setContactOpen(true)}
                  onClose={() => setDrawerOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex min-h-screen">

          {/* ── Desktop Left Sidebar (>= lg) ──────────────────────── */}
          <motion.div
            className="hidden lg:flex lg:w-[38%] xl:w-[32%] px-12 py-8 lg:fixed lg:h-screen flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SidebarContent
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onBookClick={() => setContactOpen(true)}
            />
          </motion.div>

          {/* ── Right Column — Masonry Grid ───────────────────────── */}
          <div ref={gridRef} className="w-full lg:w-[62%] xl:w-[68%] lg:ml-[38%] xl:ml-[32%] min-h-screen pt-14 lg:pt-0">
            <div className="px-4 sm:px-8 py-6 lg:py-10 photo-grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-64 text-gray-300 text-sm font-light tracking-widest uppercase">
                      Coming soon
                    </div>
                  ) : (
                    <>
                      {/* Mobile: 2 cols */}
                      <div className="flex gap-2 sm:gap-3 lg:hidden">
                        {columns2.map((col, ci) => (
                          <div key={ci} className="flex-1 flex flex-col gap-2 sm:gap-3">
                            {col.map((photo, pi) => (
                              <GalleryImage key={photo.id} photo={photo} index={pi} onClick={() => openLightbox(filtered.indexOf(photo))} />
                            ))}
                          </div>
                        ))}
                      </div>
                      {/* Desktop: 3 cols */}
                      <div className="hidden lg:flex gap-3 xl:gap-4">
                        {columns3.map((col, ci) => (
                          <div key={ci} className="flex-1 flex flex-col gap-3 xl:gap-4">
                            {col.map((photo, pi) => (
                              <GalleryImage key={photo.id} photo={photo} index={pi} onClick={() => openLightbox(filtered.indexOf(photo))} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back to Top ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Contact Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox photos={filtered} index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
        )}
      </AnimatePresence>
    </>
  )
}

export default PhotographyV2