'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X, Terminal, Layers, Zap, BarChart2, GitBranch, Wrench } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface App {
  id: string
  icon: React.ReactNode
  label: string
  content: string[]
}

// ─── Terminal content ─────────────────────────────────────────────────────────
// Each string in content[] is one line in the terminal window.

const apps: App[] = [
  {
    id: 'stack',
    icon: <Layers size={20} strokeWidth={1.5} />,
    label: 'stack.sh',
    content: [
      '$ cat stack.txt',
      '',
      'FRAMEWORK',
      '  Next.js 15 (App Router) + React 19 + TypeScript',
      '',
      'STYLING',
      '  Tailwind CSS 4  →  utility-first, no PostCSS config',
      '  Framer Motion   →  animations + transitions',
      '  Cormorant Garamond  →  display type (photography, recruiter)',
      '  Inter           →  body + UI',
      '',
      'IMAGE DELIVERY',
      '  AWS S3          →  mahad-studio-photos, us-east-1',
      '  AWS CloudFront  →  CDN via Origin Access Control',
      '  No public bucket access. CloudFront only.',
      '',
      'EMAIL',
      '  Resend          →  transactional email, custom domain',
      '  hello@mahad.studio',
      '',
      'DEPLOYMENT',
      '  Vercel          →  hosting, CI/CD, preview deploys',
      '  GitHub          →  source control (sprincee)',
      '',
      'ANALYTICS',
      '  Google Analytics 4  →  page traffic + custom events',
      '',
      '$ _',
    ],
  },
  {
    id: 'image-pipeline',
    icon: <Zap size={20} strokeWidth={1.5} />,
    label: 'images.sh',
    content: [
      '$ cat image_pipeline.txt',
      '',
      'PIPELINE',
      '  Camera (RAW)',
      '    ↓',
      '  Lightroom  →  edit, export 85% JPEG, 1080×1350',
      '    ↓',
      '  S3  →  mahad-studio-photos, us-east-1',
      '    ↓',
      '  CloudFront  →  OAC, no public S3 access',
      '    ↓',
      '  Next.js <Image>  →  srcset + lazy load',
      '    ↓',
      '  Browser',
      '',
      'WHY OAC?',
      '  Client photos are paid work.',
      '  OAC = S3 bucket has zero public access policy.',
      '  CloudFront is the only way in.',
      '  Right-click + no-download enforced client-side too.',
      '',
      'EXPORT SETTINGS',
      '  Format:   JPEG',
      '  Quality:  85%',
      '  Size:     1080 × 1350px (4:5 ratio)',
      '',
      '$ _',
    ],
  },
  {
    id: 'decisions',
    icon: <GitBranch size={20} strokeWidth={1.5} />,
    label: 'decisions.sh',
    content: [
      '$ cat decisions.txt',
      '',
      '[1] App Router over Pages Router',
      '    → Server components keep form logic server-side.',
      '    → File-based routing maps cleanly to site structure.',
      '    ⚠ Sharper edges. Framer Motion + HMR quirks.',
      '      Workaround: restart dev server.',
      '',
      '[2] CloudFront OAC over public S3',
      '    → Client photos need protection.',
      '    → Zero public bucket policy.',
      '    ⚠ Cache miss latency on first request to new edge.',
      '      Acceptable tradeoff.',
      '',
      '[3] Resend over Nodemailer / SendGrid',
      '    → Custom domain verification built into Vercel DNS.',
      '    → Typed SDK end-to-end. No SMTP debugging.',
      '    ⚠ Vendor dependency on a critical flow.',
      '      Acceptable at this scale.',
      '',
      '[4] TypeScript files over a CMS',
      '    → Typed constants. One-line to add an entry.',
      '    → Type safety catches mistakes before deploy.',
      '    ⚠ Every update needs a code push.',
      '      Acceptable. I do not mind.',
      '',
      '[5] Tailwind 4 over v3',
      '    → CSS variables as first-class tokens.',
      '    → Faster builds, no PostCSS config.',
      '    ⚠ Plugin ecosystem still catching up.',
      '      Avoided plugins entirely.',
      '',
      '[6] Vercel over self-hosted',
      '    → Zero-config Next.js. Preview deploys per PR.',
      '    ⚠ Platform lock-in. Codebase is portable.',
      '      Worth the tradeoff for a solo project.',
      '',
      '$ _',
    ],
  },
  {
    id: 'stats',
    icon: <BarChart2 size={20} strokeWidth={1.5} />,
    label: 'stats.sh',
    content: [
      '$ cat stats.txt',
      '',
      'SITE STATS',
      '  Pages:          6',
      '  Journey entries: 18',
      '  Photo categories: 4',
      '  JPEG quality:   85%',
      '  S3 access model: OAC (zero public)',
      '  CMS deps:       0',
      '  Database ETA:   V2 (Vercel Postgres)',
      '',
      'PAGES',
      '  /           →  Home',
      '  /software   →  Journey in Tech',
      '  /photography →  Gallery',
      '  /about      →  About (section on home)',
      '  /architecture →  You are here',
      '',
      'EVENTS TRACKED',
      '  recruiter_mode_toggle',
      '  timeline_entry_expand',
      '  contact_form_submit',
      '  gallery_image_open',
      '',
      '$ _',
    ],
  },
  {
    id: 'todo',
    icon: <Wrench size={20} strokeWidth={1.5} />,
    label: 'todo.sh',
    content: [
      '$ cat what_id_change.txt',
      '',
      '[TODO]',
      '',
      '  [ ] EXIF metadata in the lightbox',
      '      Camera, lens, focal length, ISO, shutter.',
      '      Data is already in S3. Just not plumbed through.',
      '',
      '  [ ] MDX for the Now page',
      '      Updating it currently needs a code push.',
      '      One MDX file would fix that.',
      '',
      '  [ ] Responsive srcset with WebP variants',
      '      Photos exported at 1080×1350.',
      '      Proper multi-breakpoint srcset would cut LCP.',
      '',
      '$ _',
    ],
  },
  {
    id: 'source',
    icon: <Terminal size={20} strokeWidth={1.5} />,
    label: 'source.sh',
    content: [
      '$ cat source.txt',
      '',
      'REPO',
      '  github.com/sprincee',
      '',
      'BUILT WITH',
      '  Next.js 15  ·  React 19  ·  TypeScript',
      '  Tailwind CSS 4  ·  Framer Motion',
      '  AWS S3 + CloudFront  ·  Resend  ·  Vercel',
      '',
      'DEV ENVIRONMENT',
      '  VS Code dev container',
      '  LF line endings (.gitattributes)',
      '  ESLint + TypeScript strict mode',
      '',
      'DEPLOY',
      '  git push → Vercel CI → preview URL',
      '  merge to main → production deploy',
      '',
      'VERSION',
      '  V1 — Basic (2025)',
      '  V2 — Basic+ (current)',
      '  V3 — BasicUltra+ (someday)',
      '',
      '$ _',
    ],
  },
]

// ─── Typing hook ──────────────────────────────────────────────────────────────

function useTypedLines(lines: string[], active: boolean) {
  const [displayed, setDisplayed] = useState<string[]>([])
  const indexRef = useRef(0)

  useEffect(() => {
    if (!active) {
      setDisplayed([])
      indexRef.current = 0
      return
    }
    setDisplayed([])
    indexRef.current = 0

    const interval = setInterval(() => {
      if (indexRef.current < lines.length) {
        const next = lines[indexRef.current]
        if (next !== undefined) {
          setDisplayed((prev) => [...prev, next])
        }
        indexRef.current++
      } else {
        clearInterval(interval)
      }
    }, 28)

    return () => clearInterval(interval)
  }, [active, lines])

  return displayed
}

// ─── Terminal Window ──────────────────────────────────────────────────────────

const TerminalWindow: React.FC<{ app: App; onClose: () => void }> = ({ app, onClose }) => {
  const lines = useTypedLines(app.content, true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-xl overflow-hidden border border-white/[0.08]"
      style={{ background: '#0a0a0a' }}
    >
      {/* Terminal title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
        style={{ background: '#111' }}>
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] font-light text-white/30 ml-2 tracking-wider">
            {app.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/25 hover:text-white/60 transition-colors"
        >
          <X size={13} strokeWidth={1.5} />
        </button>
      </div>

      {/* Terminal body */}
      <div className="p-5 max-h-96 overflow-y-auto" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {!line || line === '' ? (
              <br />
            ) : line.startsWith('$') ? (
              <span className="text-green-400/80 text-xs">{line}</span>
            ) : line.startsWith('  ⚠') ? (
              <span className="text-yellow-400/60 text-xs">{line}</span>
            ) : line.startsWith('  →') || line.startsWith('    →') ? (
              <span className="text-blue-400/60 text-xs">{line}</span>
            ) : line.startsWith('  [ ]') ? (
              <span className="text-white/40 text-xs">{line}</span>
            ) : line.match(/^[A-Z\s]+$/) && line.trim().length > 1 ? (
              <span className="text-white/50 text-[10px] tracking-widest uppercase">{line}</span>
            ) : (
              <span className="text-white/55 text-xs">{line}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </motion.div>
  )
}

// ─── App Icon ─────────────────────────────────────────────────────────────────

const AppIcon: React.FC<{ app: App; onClick: () => void; isOpen: boolean }> = ({ app, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 group ${
      isOpen
        ? 'border-white/20 bg-white/[0.06]'
        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
    }`}
  >
    <div className={`transition-colors duration-200 ${isOpen ? 'text-white/70' : 'text-white/35 group-hover:text-white/55'}`}>
      {app.icon}
    </div>
    <span className="text-[10px] font-light tracking-wider text-white/30 group-hover:text-white/50 transition-colors"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      {app.label}
    </span>
    {isOpen && (
      <div className="w-1 h-1 rounded-full bg-white/40" />
    )}
  </button>
)

// ─── Main ─────────────────────────────────────────────────────────────────────

const Architecture: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>([])

  const toggle = (id: string) => {
    setOpenApps((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const close = (id: string) => {
    setOpenApps((prev) => prev.filter((a) => a !== id))
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden">
      {/* Dual ambient glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[380px] z-0"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(29,78,216,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none fixed bottom-0 right-0 w-[600px] h-[400px] z-0"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(29,78,216,0.09) 0%, transparent 70%)' }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-white/[0.04]">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          <span className="text-xs font-light tracking-wider">back to home</span>
        </Link>
        <span className="text-xs font-light tracking-widest text-white/20 uppercase"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
          mahad.studio/architecture
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 py-14 sm:py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[10px] font-light tracking-[0.3em] text-white/25 uppercase mb-4"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
            $ ./nerdy-stuff.sh
          </p>
          <h1
            className="font-extralight leading-tight tracking-tight text-white/90 mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 62px)' }}
          >
            How this thing is<br />
            <strong className="font-black text-white">actually</strong> built.
          </h1>
          <p className="text-sm font-light text-white/35 max-w-md mx-auto leading-relaxed">
            Click anything below. A terminal will open.
          </p>
        </motion.div>

        {/* App icons grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12"
        >
          {apps.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              onClick={() => toggle(app.id)}
              isOpen={openApps.includes(app.id)}
            />
          ))}
        </motion.div>

        {/* Terminal windows */}
        <div className="space-y-4">
          <AnimatePresence>
            {openApps.map((id) => {
              const app = apps.find((a) => a.id === id)
              if (!app) return null
              return (
                <TerminalWindow
                  key={id}
                  app={app}
                  onClose={() => close(id)}
                />
              )
            })}
          </AnimatePresence>
        </div>

        {openApps.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[11px] text-white/15 tracking-widest mt-4"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            no windows open
          </motion.p>
        )}

      </div>
    </div>
  )
}

export default Architecture