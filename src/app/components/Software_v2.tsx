'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

// Shared resume button style used in hero + chapter sidebar
const resumeButtonClass =
  'inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-full text-[10px] font-light text-blue-400 hover:text-blue-300 transition-all tracking-wider'

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'work' | 'project' | 'education' | 'personal'

interface JourneyEntry {
  id: string
  date: string
  sortDate: number
  title: string
  subtitle?: string
  category: Category
  description: string
  tech?: string[]
  outcomes?: string[]
  reflection?: string
  github?: string
  live?: string
  isCurrent?: boolean
  isFuture?: boolean
}

interface Chapter {
  num: string
  title: string
  years: string
  headline: React.ReactNode
  body: string
  ghostYear: string
  entryIds: string[]
}

// ─── GA helper ────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (command: string, event: string, params: Record<string, string | boolean | number>) => void
  }
}

function track(name: string, params: Record<string, string | boolean | number>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

// ─── Data: Entries ─────────────────────────────────────────────────────────────

const entries: JourneyEntry[] = [
  {
    id: 'first-computer',
    date: '2008',
    sortDate: new Date('2008-01-01').getTime(),
    title: 'First computer',
    category: 'personal',
    description: 'Got my first computer at 5. Spent most of it just tinkering around, asking "What does this button do?".',
    reflection: "Thankfully, there was no red 'EXPLODE' button. Would've ended terribly.",
  },
  {
    id: 'scratch',
    date: '2016',
    sortDate: new Date('2016-01-01').getTime(),
    title: 'Learned Scratch',
    category: 'personal',
    description: 'At 13, I discovered Scratch. Drag-and-drop blocks, that tell a computer to do something. Cool, right?',
    reflection: 'Scratch taught me that programming was fun. I made funny animations for myself and my friends.',
  },
  {
    id: 'minecraft-team',
    date: '2017 — 2018',
    sortDate: new Date('2017-06-01').getTime(),
    title: 'Joined a Minecraft Plugin Developer team',
    category: 'personal',
    description: "At 14, I joined the dev team for a Minecraft server with 1,000+ concurrent players. I was reading source code, shipping features, watching real people use stuff I built. That was new.",
    tech: ['Java', 'Spigot API'],
    reflection: "Learned to never push to 'prod' on a Friday.",
  },
  {
    id: 'duels-plugin',
    date: '2019',
    sortDate: new Date('2019-06-01').getTime(),
    title: 'Built a Duels Plugin',
    category: 'project',
    description: "At 16, I designed and shipped a 1v1 matchmaking system for the same server. Players could challenge each other, the system managed sessions, and it had to handle concurrent matches without stepping on itself.",
    tech: ['Java', 'Spigot API'],
    outcomes: ['Live on a 1,000+ player server', 'Custom stateful matchmaking from scratch'],
    reflection: "I was dealing with concurrency problems before I knew the word.",
  },
  {
    id: 'python-start',
    date: '2020',
    sortDate: new Date('2020-01-01').getTime(),
    title: 'Learned Python',
    category: 'personal',
    description: 'At 17, I picked up Python and became a victim of the Dunning-Kruger effect. Thought I was the best building scrapers and small tools. It was fun.',
    tech: ['Python'],
    reflection: 'Python quickly became my favorite language. Python > Java, everyday. ',
  },
  {
    id: 'remax',
    date: 'Jun — Sep 2022',
    sortDate: new Date('2022-06-01').getTime(),
    title: 'Data Science Intern',
    subtitle: 'ReMax One',
    category: 'work',
    description: "First real job. Replaced a spreadsheet system with a normalized MySQL database for 175+ client and property records. Built ETL pipelines that actually validated the data going in.",
    tech: ['MySQL', 'Python', 'SQLAlchemy', 'Pandas'],
    outcomes: ['Query latency down 45%', '95% data integrity validation across all pipelines', 'Replaced spreadsheets nobody trusted with a database people actually used'],
    reflection: "The hard part wasn't the schema. It was convincing people that a database could be trusted more than the spreadsheet they'd been using for three years.",
  },
  {
    id: 'wills-it',
    date: 'Jun — Aug 2023',
    sortDate: new Date('2023-06-01').getTime(),
    title: 'IT Intern',
    subtitle: 'The Wills Group',
    category: 'work',
    description: 'Triaged 40+ tickets across 250 employees. Automated Windows device provisioning with MDT and golden images so setup stopped being a manual, three-hour process.',
    tech: ['PowerShell', 'MDT', 'Windows Imaging', 'Jira'],
    outcomes: ['Setup time cut 50% across three regional sites', 'Downtime reduced 35%', 'L2/L3 escalation rate dropped'],
    reflection: "That summer taught me one thing: if you're doing it twice, automate it. Or at the very least, try to.",
  },
  {
    id: 'enchantmentplus',
    date: 'Aug 2023',
    sortDate: new Date('2023-08-01').getTime(),
    title: 'EnchantmentPLUS',
    category: 'project',
    description: 'A Minecraft mod that overhauled the enchantment system. Custom mechanics, particle effects, a balanced progression engine built by studying game internals. Deployed to a server with 100+ concurrent players.',
    tech: ['Java', 'Forge API', 'Spigot API', 'Blockbench', 'GIMP'],
    outcomes: ['Production deploy: 100+ concurrent connections', 'Custom progression system built on studying game mechanics'],
    github: 'https://github.com/sprincee',
    reflection: "Looking back, I should make more Minecraft mods.",
  },
  {
    id: 'quranquest',
    date: 'Dec 2023',
    sortDate: new Date('2023-12-01').getTime(),
    title: 'QuranQuest',
    category: 'project',
    description: 'A gamified Islamic education platform with quizzes, progress tracking, and personalized learning paths. Deployed across two local mosques and used by 80+ students.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Python'],
    outcomes: ['80+ students across 2 mosque deployments'],
    github: 'https://github.com/sprincee/quranquest',
    reflection: "Building for a community is different. I'll never forget the smile of a little boy extracting value from something I made.",
  },
  {
    id: 'wills-sre',
    date: 'Jun — Aug 2024',
    sortDate: new Date('2024-06-01').getTime(),
    title: 'Site Reliability Intern',
    subtitle: 'The Wills Group',
    category: 'work',
    description: "Deployed Meraki hardware across 8 retail sites. Built IoT provisioning automation for 45+ BOHA devices and finished 50% ahead of schedule.",
    tech: ['Meraki Portal', 'PowerShell', 'IoT', 'Networking'],
    outcomes: ['Staging time cut 40% across 8 sites', 'IoT provisioning delivered 50% ahead of schedule', 'Onboarding time down 25% from runbook documentation'],
    reflection: "A well-written playbook is the backbone of any technology or process.",
  },
  {
    id: 'flame',
    date: 'Oct 2024',
    sortDate: new Date('2024-10-01').getTime(),
    title: 'Flame',
    category: 'project',
    description: 'AI thumbnail generator using a GPT-4o + DALL-E pipeline with request queuing. Hit 35+ concurrent users at peak without throttling.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Firebase', 'OpenAI DALL-E', 'Tailwind CSS'],
    outcomes: ['35+ concurrent users at peak', 'Request queuing to absorb LLM rate limits without user-facing errors'],
    github: 'https://github.com/sprincee/flame',
    live: 'https://flame3.vercel.app/',
    reflection: "It was my first project with AI. . . All to impress my friend's dad who worked at NVIDIA.",
  },
  {
    id: 'poliview',
    date: 'May 2025',
    sortDate: new Date('2025-05-01').getTime(),
    title: 'PoliView',
    category: 'project',
    description: 'A legislative tracking platform that pulls 500+ daily bill updates from the Congress.gov API. Users can follow voting records and policy shifts in real time.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Supabase', 'Congress.gov API', 'Framer Motion'],
    outcomes: ['500+ daily bill updates ingested', 'Real-time voting record and policy tracking'],
    github: 'https://github.com/sprincee/poliview',
    live: 'https://politcalview.vercel.app/',
    reflection: "No fancy reflection here. Just don't do anything last minute. Don't build a website for a class three days before the due date.",
  },
  {
    id: 'wills-swe',
    date: 'Jun — Aug 2025',
    sortDate: new Date('2025-06-01').getTime(),
    title: 'Software Solutions Intern',
    subtitle: 'The Wills Group · Fullstack + Infrastructure',
    category: 'work',
    description: 'Assisted in planning an ML pipeline ingesting 1TB+ of enterprise data, cutting L1 manual analysis by 40%. Shipped a React dashboard with RBAC for 20+ stakeholders. Automated TLS provisioning across 10+ POS terminals leading to config drift down 80%, PCI-DSS compliance maintained.',
    tech: ['React.js', 'Node.js', 'TypeScript', 'Python', 'SQLAlchemy', 'GitHub Actions', 'CI/CD'],
    outcomes: [
      '1TB+ ML pipeline; L1 manual analysis down 40%',
      'Dashboard deployed to 20+ stakeholders',
      'Config drift reduced 80% via automated TLS provisioning',
      'PCI-DSS compliance across POS fleet',
    ],
    reflection: 'Another not-so-fancy reflection, but always have a back-up plan. You cannot guarantee that your website will not break mid-presentation.',
  },
  {
    id: 'umd-consultant',
    date: 'Sep — Dec 2025',
    sortDate: new Date('2025-09-01').getTime(),
    title: 'Technical Consultant',
    subtitle: 'University of Maryland',
    category: 'work',
    description: 'Led a HubSpot CRM implementation for a career consulting client. Migrated 2,200+ contact records using Python automation and built the process documentation for what comes after I leave.',
    tech: ['HubSpot', 'Python', 'CRM', 'Data Migration'],
    outcomes: ['2,200+ records migrated', 'Full outreach tracking infrastructure delivered with documentation'],
    reflection: "Working in Tech is more than just picking the fanciest tech-stack.",
  },
  {
    id: 'supercrowd',
    date: 'Jan — May 2026',
    sortDate: new Date('2026-01-01').getTime(),
    title: 'Technical Consultant',
    subtitle: 'The Super Crowd, Inc. · Resuming Fall 2026',
    category: 'work',
    description: "Led system design for WorkOS — an AI-assisted Regulation Crowdfunding diligence platform. Designed the full pipeline: SEC EDGAR filing ingestion, LLM-driven impact scoring, founder claim verification, and phased delivery architecture. Ran feasibility analysis across three architecture candidates; the hybrid Hostinger/GitHub Actions stack scored 91.75/100 — outperformed AWS on cost, schedule, and operational risk.",
    tech: ['Python', 'GitHub Actions', 'MySQL', 'LLM APIs', 'SEC EDGAR API', 'System Design'],
    outcomes: [
      'Full system design: DFD, ERD, CRUD matrix, physical architecture',
      'Hybrid stack selected via weighted feasibility analysis (91.75/100)',
      'Pipeline: filing ingestion → LLM scoring → claim verification → report delivery',
    ],
    reflection: "Designing for someone else's methodology means the system has to be auditable, not just accurate. Every decision it makes needs to be traceable.",
  },
  {
    id: 'bs-graduation',
    date: 'May 2026',
    sortDate: new Date('2026-05-15').getTime(),
    title: 'BS Information Science',
    subtitle: 'University of Maryland, College Park',
    category: 'education',
    description: 'Graduated from the University of Maryland with a BS in Information Science. Coursework across computer architecture, database design, UX, and data science — and a lot learned outside the classroom.',
    outcomes: ['Graduated May 2026', 'Concurrent enrollment in MS Information Systems (Plus One Program)'],
    reflection: 'Yay! Class of 2026! GO Terps!!',
  },
  {
    id: 'wills-infra',
    date: 'Jun 2026 — Present',
    sortDate: new Date('2026-06-01').getTime(),
    title: 'Infrastructure Specialist',
    subtitle: 'The Wills Group',
    category: 'work',
    isCurrent: true,
    description: 'On-site infrastructure work across enterprise retail environments. Configuring firewalls and routing. Contributing to a virtualization project that will transform the organization. Coordinating lifecycle management for 500+ phones and end-user devices.',
    tech: ['Networking', 'Firewall Configuration', 'VLANs', 'Virtualization', 'Device Lifecycle Management'],
    outcomes: [
      'VLAN segmentation and firewall hardening across retail sites',
      'Virtualization project in progress — reducing physical rack footprint',
      '500+ devices enrolled in structured lifecycle plan',
    ],
    reflection: 'Good infrastructure is invisible. The goal is a network so well-configured nobody notices it exists.',
  },
  {
    id: 'ms-graduation',
    date: 'Expected May 2027',
    sortDate: new Date('2027-05-15').getTime(),
    title: 'MS Information Systems',
    subtitle: 'University of Maryland, College Park',
    category: 'education',
    isFuture: true,
    description: "Currently enrolled in the Plus One accelerated MS program at UMD's Smith School of Business.",
    outcomes: ['Advanced Data Science, Cloud Computing, Machine Learning'],
  },
]

// ─── Chapters ─────────────────────────────────────────────────────────────────

const chapters: Chapter[] = [
  {
    num: '01',
    title: 'Origins',
    years: '2008 — 2021',
    ghostYear: '2008',
    headline: (
      <>
        Before the<br />
        résumé, there<br />
        was just <em style={{ fontStyle: 'italic', color: '#444' }}>curiosity.</em>
      </>
    ),
    body: "My first computer. Learning Scratch. Yelling in Skype calls about Minecraft and code. Pretty fun time, if you ask me.",
    entryIds: ['first-computer', 'scratch', 'minecraft-team', 'duels-plugin', 'python-start'],
  },
  {
    num: '02',
    title: 'Baby Steps',
    years: '2022 — 2023',
    ghostYear: '2022',
    headline: (
      <>
        First real job.<br />
        First real data.<br />
        First <strong style={{ fontWeight: 700 }}>failures</strong> that taught me something.
      </>
    ),
    body: "Two internships. Two projects. Would I go back and change a few things? Yeah. Did I learn a lot? Definitely.",
    entryIds: ['remax', 'wills-it', 'enchantmentplus', 'quranquest'],
  },
  {
    num: '03',
    title: 'Leveling up',
    years: '2024 — 2025',
    ghostYear: '2024',
    headline: (
  <>
    Things started<br />
    getting <em style={{ fontStyle: 'italic', color: '#333' }}>interesting.</em>
  </>
  ),
    body: 'Gathered XP with every side and main quest.',
    entryIds: ['wills-sre', 'flame', 'poliview', 'wills-swe', 'umd-consultant'],
  },
  {
    num: '04',
    title: 'Now',
    years: '2026 — Present',
    ghostYear: '2026',
    headline: (
      <>
        This is the<br />
        part still being{' '}
        <em style={{ fontStyle: 'italic', color: '#444' }}>written.</em>
      </>
    ),
    body: 'Graduated! Building infrastructure! Writing code! Looking for the next fun thing!',
    entryIds: ['supercrowd', 'bs-graduation', 'wills-infra'],
  },
  {
    num: '05',
    title: "What's Next",
    years: '2027 →',
    ghostYear: '2027',
    headline: (
      <>
        The next<br />
        chapter hasn&apos;t<br />
        <em style={{ fontStyle: 'italic', color: '#333' }}>started yet.</em>
      </>
    ),
    body: 'Getting my MS degree. My first-job post grad. Whatever comes after that.',
    entryIds: ['ms-graduation'],
  },
]

// ─── Entry Card ───────────────────────────────────────────────────────────────

const EntryCard: React.FC<{ entry: JourneyEntry }> = ({ entry }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) track('timeline_entry_expand', { entry_id: entry.id, category: entry.category })
  }

  const catLabel: Record<Category, string> = {
    work: 'Work',
    project: 'Project',
    education: 'Education',
    personal: 'Personal',
  }

  return (
    <motion.div
      layout
      onClick={toggle}
      className="py-4 border-b border-white/[0.04] cursor-pointer group last:border-none"
    >
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-[10px] font-light tracking-widest text-white/50 uppercase">
          {entry.date}
        </span>
        <span className="text-[9px] font-light tracking-widest text-white/55 uppercase">
          {catLabel[entry.category]}
        </span>
        {entry.isCurrent && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-[9px] text-white/55 tracking-widest uppercase">Current</span>
          </span>
        )}
        {entry.isFuture && (
          <span className="text-[9px] text-white/55 tracking-widest uppercase">Upcoming</span>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm font-light leading-snug transition-colors duration-200 ${
            entry.isFuture ? 'text-white/55' : 'text-white/60 group-hover:text-white/90'
          }`}>
            {entry.title}
          </p>
          {entry.subtitle && (
            <p className="text-xs font-light text-white/50 mt-0.5">{entry.subtitle}</p>
          )}
        </div>
        <span className={`text-white/55 text-xs mt-0.5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              <p className="text-xs font-light text-white/55 leading-relaxed">
                {entry.description}
              </p>

              {entry.outcomes && entry.outcomes.length > 0 && (
                <ul className="space-y-1">
                  {entry.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-light text-white/50">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              )}

              {entry.tech && entry.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entry.tech.map((t) => (
                    <span key={t} className="text-[9px] font-light text-white/50 border border-white/[0.07] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {entry.reflection && (
                <div className="border-l border-white/[0.07] pl-3 mt-2">
                  <p className="text-[11px] font-light text-white/55 leading-relaxed italic">
                    {entry.reflection}
                  </p>
                </div>
              )}

              {(entry.github || entry.live) && (
                <div className="flex gap-4 pt-1">
                  {entry.github && (
                    <a href={entry.github} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[10px] font-light text-white/55 hover:text-white/60 transition-colors">
                      <Github size={11} strokeWidth={1.5} /> GitHub
                    </a>
                  )}
                  {entry.live && (
                    <a href={entry.live} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[10px] font-light text-white/55 hover:text-white/60 transition-colors">
                      <ExternalLink size={11} strokeWidth={1.5} /> Live
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Recruiter View ────────────────────────────────────────────────────────────

const RecruiterView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const skills = {
    Languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'C++', 'Bash'],
    'Frameworks & Cloud': ['React.js', 'Next.js', 'Node.js', 'Flask', 'Docker', 'AWS', 'GitHub Actions', 'CI/CD'],
    'Data & Infra': ['Pandas', 'SQLAlchemy', 'Supabase', 'MySQL', 'Linux', 'Git', 'Networking', 'VLANs'],
  }

  const experienceEntries = [...entries]
    .filter((e) => e.category === 'work' && !e.isFuture)
    .sort((a, b) => b.sortDate - a.sortDate)

  const projectEntries = [...entries]
    .filter((e) => e.category === 'project' && !e.isFuture)
    .sort((a, b) => b.sortDate - a.sortDate)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#050505] text-white"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.05]">
        <span
          className="text-lg sm:text-xl font-light text-white/60 tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
        >
          Mahad S. Khan
        </span>
        <button
          onClick={onExit}
          className="text-[10px] font-light text-white/55 hover:text-white/60 transition-colors tracking-widest uppercase"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-14 space-y-14">

        {/* Header + resume CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-light mb-3">
              BS Information Science, UMD &apos;26 &nbsp;·&nbsp; MS Information Systems &apos;27 &nbsp;·&nbsp; SRE-focused
            </p>
            <h1
              className="text-5xl sm:text-6xl font-light text-white/90 leading-none tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              The work,<br />
              <em>distilled.</em>
            </h1>
          </div>
          <a
            href="/api/resume"
            download
            onClick={() => track('resume_download', { referrer: 'recruiter_mode', recruiter_mode: true })}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black text-xs font-light tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors self-start sm:self-auto flex-shrink-0"
          >
            <Download size={13} strokeWidth={1.5} />
            Resume
          </a>
        </div>

        {/* Skills */}
        <div>
          <p
            className="text-xs text-white/30 mb-5 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px' }}
          >
            Skills
          </p>
          <div className="space-y-3">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                <span className="text-[10px] font-light text-white/50 uppercase tracking-widest w-40 flex-shrink-0">
                  {group}
                </span>
                <p className="text-xs font-light text-white/55 leading-relaxed">
                  {items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Two column: Experience + Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">

          {/* Experience */}
          <div>
            <p
              className="text-white/30 mb-6 tracking-tight border-b border-white/[0.05] pb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px' }}
            >
              Experience
            </p>
            <div className="space-y-6">
              {experienceEntries.map((e) => (
                <div key={e.id}>
                  <p className="text-[10px] font-light text-white/50 uppercase tracking-widest mb-1">{e.date}</p>
                  <p className="text-sm font-light text-white/75 leading-snug">
                    {e.title}
                    {e.isCurrent && (
                      <span className="ml-2 inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
                        <span className="text-[9px] text-white/55 tracking-widest">Now</span>
                      </span>
                    )}
                  </p>
                  {e.subtitle && (
                    <p className="text-[11px] font-light text-white/55 mt-0.5">{e.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <p
              className="text-white/30 mb-6 tracking-tight border-b border-white/[0.05] pb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px' }}
            >
              Projects
            </p>
            <div className="space-y-6">
              {projectEntries.map((e) => (
                <div key={e.id}>
                  <p className="text-[10px] font-light text-white/50 uppercase tracking-widest mb-1">{e.date}</p>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-light text-white/75 leading-snug">{e.title}</p>
                    <div className="flex gap-2.5 flex-shrink-0 mt-0.5">
                      {e.github && (
                        <a href={e.github} target="_blank" rel="noopener noreferrer"
                          className="text-white/50 hover:text-white/55 transition-colors">
                          <Github size={12} strokeWidth={1.5} />
                        </a>
                      )}
                      {e.live && (
                        <a href={e.live} target="_blank" rel="noopener noreferrer"
                          className="text-white/50 hover:text-white/55 transition-colors">
                          <ExternalLink size={12} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

const Software_v2: React.FC = () => {
  const [phase, setPhase] = useState<'hero' | 'chapters' | 'recruiter'>('hero')
  const [chapterIndex, setChapterIndex] = useState(0)

  const currentChapter = chapters[chapterIndex]
  const chapterEntries = currentChapter.entryIds
    .map((id) => entries.find((e) => e.id === id))
    .filter(Boolean) as JourneyEntry[]

  const enterJourney = () => {
    setChapterIndex(0)
    setPhase('chapters')
  }

  const enterRecruiter = () => {
    track('recruiter_mode_toggle', { new_state: true })
    setPhase('recruiter')
  }

  if (phase === 'recruiter') {
    return (
      <AnimatePresence mode="wait">
        <RecruiterView
          key="recruiter"
          onExit={() => {
            track('recruiter_mode_toggle', { new_state: false })
            setPhase('hero')
          }}
        />
      </AnimatePresence>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden" style={{ maxWidth: '100vw' }}>

      {/* Dual ambient glow — top left + bottom right */}
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
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.5} />
          <span className="text-xs font-light tracking-wider">back to home</span>
        </Link>
        <button
          onClick={enterRecruiter}
          className="text-[10px] font-light tracking-widest text-white/55 uppercase border border-white/[0.08] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:border-white/20 hover:text-white/70 transition-all"
        >
          Recruiter Mode
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* ── HERO PHASE ── */}
        {phase === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-53px)] overflow-hidden"
          >
            {/* Ghost MAHAD — desktop only, clamped to viewport width to prevent scroll */}
            <div
              aria-hidden
              className="pointer-events-none select-none absolute bottom-0 left-0 leading-none z-0 hidden lg:block"
              style={{ width: '100vw', overflowX: 'hidden', lineHeight: 1 }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(100px, 18vw, 220px)',
                  fontWeight: 900,
                  color: '#0c0c0c',
                  letterSpacing: '-0.05em',
                  whiteSpace: 'nowrap',
                  transform: 'translateY(8%)',
                }}
              >
                MAHAD
              </span>
            </div>

            {/* Left content */}
            <div className="relative z-10 flex-1 flex flex-col justify-between px-6 sm:px-12 pt-12 sm:pt-16 pb-8 sm:pb-12">
              <div>
                <p className="text-[10px] font-light tracking-[0.22em] text-white/50 uppercase mb-6 sm:mb-8">
                  Journey in Tech
                </p>
                <h1
                  className="font-extralight leading-[0.94] tracking-tight text-white/90"
                  style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
                >
                  I&apos;ve been<br />
                  curious about<br />
                  <strong className="font-black text-white">Tech</strong> since I was{' '}
                  <em className="italic font-extralight text-white/50">five.</em>
                </h1>
                <p className="text-sm font-light text-white/55 leading-relaxed max-w-xs mt-5 sm:mt-6">
                  Still am. This is everything I&apos;ve built, learned, and worked on since then.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <button
                    onClick={enterJourney}
                    className="inline-flex items-center gap-3 bg-white text-black text-xs font-light tracking-wider px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                  >
                    Begin the journey <ArrowRight size={13} strokeWidth={1.5} />
                  </button>

                  {/* Resume + socials inline on mobile — hidden on desktop (shown in right column) */}
                  <div className="flex lg:hidden items-center gap-4">
                    <a
                      href="/api/resume"
                      download
                      onClick={() => track('resume_download', { referrer: 'hero', recruiter_mode: false })}
                      className={resumeButtonClass}
                    >
                      <Download size={11} strokeWidth={1.5} />
                      Resume
                    </a>
                    <a href="https://github.com/sprincee" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors"><Github size={16} strokeWidth={1.5} /></a>
                    <a href="https://linkedin.com/in/mahad-skhan" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors"><Linkedin size={16} strokeWidth={1.5} /></a>
                    <a href="mailto:mahadsuhaibkhan@gmail.com" className="text-white/40 hover:text-white/70 transition-colors"><Mail size={16} strokeWidth={1.5} /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: chapter index + social links in negative space */}
            <div className="relative z-10 w-full lg:w-56 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-white/[0.04] px-6 sm:px-7 py-8 lg:py-16 flex flex-col">
              <p className="text-[9px] font-light tracking-[0.22em] text-white/55 uppercase mb-4 sm:mb-5">Five chapters</p>

              {/* On mobile: horizontal scroll list */}
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 flex-1">
                {chapters.map((ch, i) => (
                  <button
                    key={ch.num}
                    onClick={() => { setChapterIndex(i); setPhase('chapters') }}
                    className={`text-left px-3 py-2.5 rounded-md flex-shrink-0 lg:flex-shrink transition-colors ${
                      i === chapterIndex ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'
                    } ${ch.title === "What's Next" ? 'opacity-30' : ''}`}
                  >
                    <p className="text-[9px] text-white/55 font-light tracking-wider mb-0.5">{ch.num}</p>
                    <p className="text-[13px] font-light text-white/50 hover:text-white/55 transition-colors whitespace-nowrap lg:whitespace-normal">{ch.title}</p>
                    <p className="text-[10px] text-white/55 font-light mt-0.5 hidden lg:block">{ch.years}</p>
                  </button>
                ))}
              </div>

              {/* Social + resume in negative space (desktop only) — sits between D and chapter border */}
              <div className="hidden lg:flex flex-col items-center gap-4 mt-auto pt-8">
                <a
                  href="/api/resume"
                  download
                  onClick={() => track('resume_download', { referrer: 'hero', recruiter_mode: false })}
                  className={resumeButtonClass}
                >
                  <Download size={11} strokeWidth={1.5} />
                  Resume
                </a>
                <div className="flex items-center justify-center gap-4">
                  <a href="https://github.com/sprincee" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors"><Github size={15} strokeWidth={1.5} /></a>
                  <a href="https://linkedin.com/in/mahad-skhan" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors"><Linkedin size={15} strokeWidth={1.5} /></a>
                  <a href="mailto:mahadsuhaibkhan@gmail.com" className="text-white/30 hover:text-white/70 transition-colors"><Mail size={15} strokeWidth={1.5} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CHAPTERS PHASE ── */}
        {phase === 'chapters' && (
          <motion.div
            key="chapters"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col min-h-[calc(100vh-53px)]"
          >
            {/* Progress bar */}
            <div className="h-px bg-white/[0.04] relative flex-shrink-0">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white/10"
                animate={{ width: `${((chapterIndex + 1) / chapters.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="flex flex-1 min-h-0 flex-col lg:flex-row">

              {/* Chapter sidebar — top strip on mobile, left column on desktop */}
              <div className="lg:w-52 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.04] px-5 lg:px-6 py-4 lg:py-10 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
                <p className="hidden lg:block text-[9px] font-light tracking-[0.22em] text-white/55 uppercase mb-5">Chapters</p>
                <div className="flex flex-row lg:flex-col gap-1 w-full">
                  {chapters.map((ch, i) => (
                    <button
                      key={ch.num}
                      onClick={() => setChapterIndex(i)}
                      className={`text-left px-3 py-2 lg:py-2.5 rounded-md flex-shrink-0 lg:flex-shrink transition-all ${
                        i === chapterIndex ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                      } ${ch.title === "What's Next" ? 'opacity-30' : ''}`}
                    >
                      <p className="hidden lg:block text-[9px] text-white/55 font-light tracking-wider mb-0.5">{ch.num}</p>
                      <p className={`text-xs lg:text-[13px] font-light transition-colors whitespace-nowrap ${i === chapterIndex ? 'text-white/75' : 'text-white/55'}`}>
                        {ch.title}
                      </p>
                      <p className="hidden lg:block text-[10px] text-white/50 font-light mt-0.5">{ch.years}</p>
                    </button>
                  ))}
                </div>

                {/* Resume + social — desktop sidebar bottom */}
                <div className="hidden lg:flex flex-col items-center gap-4 mt-auto pt-6">
                  <a
                    href="/api/resume"
                    download
                    onClick={() => track('resume_download', { referrer: 'chapter_sidebar', recruiter_mode: false })}
                    className={resumeButtonClass}
                  >
                    <Download size={11} strokeWidth={1.5} /> Resume
                  </a>
                  <div className="flex items-center justify-center gap-4">
                    <a href="https://github.com/sprincee" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors"><Github size={14} strokeWidth={1.5} /></a>
                    <a href="https://linkedin.com/in/mahad-skhan" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors"><Linkedin size={14} strokeWidth={1.5} /></a>
                    <a href="mailto:mahadsuhaibkhan@gmail.com" className="text-white/30 hover:text-white/60 transition-colors"><Mail size={14} strokeWidth={1.5} /></a>
                  </div>
                </div>
              </div>

              {/* Chapter stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapterIndex}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-1 min-w-0 flex-col lg:flex-row"
                >
                  {/* Left: chapter frame */}
                  <div className="lg:w-[42%] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.04] px-6 sm:px-10 lg:px-12 py-8 lg:py-10 flex flex-col justify-between overflow-hidden relative">
                    <div
                      aria-hidden
                      className="pointer-events-none select-none absolute bottom-0 left-0 font-black leading-none"
                      style={{ fontSize: '160px', color: '#080808', letterSpacing: '-0.05em', bottom: '-0.08em', left: '-0.04em' }}
                    >
                      {currentChapter.ghostYear}
                    </div>

                    <div className="relative z-10">
                      <p className="text-[9px] font-light tracking-[0.2em] text-white/55 uppercase mb-3">
                        Chapter {currentChapter.num}
                      </p>
                      <h2
                        className="font-extralight leading-[1.0] tracking-tight text-white/85"
                        style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
                      >
                        {currentChapter.headline}
                      </h2>
                      <p className="text-sm font-light text-white/55 leading-relaxed mt-4 max-w-[280px]">
                        {currentChapter.body}
                      </p>
                    </div>
                  </div>

                  {/* Right: entries */}
                  <div className="flex-1 min-w-0 px-6 sm:px-10 py-6 lg:py-10 overflow-y-auto">
                    <AnimatePresence>
                      {chapterEntries.map((entry, i) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <EntryCard entry={entry} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Software_v2