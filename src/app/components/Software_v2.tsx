'use client'

import Link from 'next/link'
import React, { useState, useCallback } from 'react'
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
  if (typeof window !== 'undefined' && typeof (window).gtag === 'function') {
    ;(window).gtag('event', name, params)
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
    description:
      'Got my first computer at 5. Spent most of it taking things apart to see what was inside — physically and digitally. Never really recovered from that.',
    reflection:
      'Every career decision since has been some version of the same question: what\'s inside this thing, and can I change it?',
  },
  {
    id: 'scratch',
    date: '2016',
    sortDate: new Date('2016-01-01').getTime(),
    title: 'Learned Scratch',
    category: 'personal',
    description:
      'At 13, discovered Scratch. Drag-and-drop blocks that actually did something. First time I understood that you could give a computer instructions and it would just... follow them.',
    reflection: 'Scratch taught me that programming is logic made visible. Everything after that was just syntax.',
  },
  {
    id: 'minecraft-team',
    date: '2017 — 2018',
    sortDate: new Date('2017-06-01').getTime(),
    title: 'Joined a Minecraft plugin dev team',
    category: 'personal',
    description:
      'At 14, joined the dev team for a Minecraft server that peaked at 1,000+ concurrent players. I wasn\'t just playing anymore — I was reading source code, shipping features, watching real people hit bugs I introduced.',
    tech: ['Java', 'Spigot API'],
    reflection:
      'First taste of production. Something I built was live, at scale, for a community that expected it to work. That weight doesn\'t go away.',
  },
  {
    id: 'duels-plugin',
    date: '2019',
    sortDate: new Date('2019-06-01').getTime(),
    title: 'Built a Duels plugin',
    category: 'project',
    description:
      'At 16, designed and shipped a 1v1 matchmaking system for the same server. Players could challenge each other, the system managed sessions, and it had to handle concurrent matches without stepping on itself.',
    tech: ['Java', 'Spigot API'],
    outcomes: ['Live on a 1,000+ player server', 'Custom stateful matchmaking from scratch'],
    reflection:
      'I was dealing with concurrency problems before I knew the word. Two events arriving at the same time will always be a problem — you just get better tools for handling it.',
  },
  {
    id: 'python-start',
    date: '2020',
    sortDate: new Date('2020-01-01').getTime(),
    title: 'Learned Python',
    category: 'personal',
    description:
      'At 17, picked up Python and built the first things that felt like real software — scrapers, small tools, experiments. The gap between idea and working code shrank to hours.',
    tech: ['Python'],
    reflection: 'Python was the first language that got out of the way. The bottleneck stopped being the language and started being the idea.',
  },
  {
    id: 'remax',
    date: 'Jun — Sep 2022',
    sortDate: new Date('2022-06-01').getTime(),
    title: 'Data Science Intern',
    subtitle: 'ReMax One',
    category: 'work',
    description:
      'First real job. Replaced a spreadsheet system with a normalized MySQL database for 175+ client and property records. Built ETL pipelines that actually validated the data going in.',
    tech: ['MySQL', 'Python', 'SQLAlchemy', 'Pandas'],
    outcomes: ['Query latency down 45%', '95% data integrity validation across all pipelines', 'Replaced spreadsheets nobody trusted with a database people actually used'],
    reflection:
      'The hard part wasn\'t the schema. It was convincing people that a database could be trusted more than the spreadsheet they\'d been using for three years.',
  },
  {
    id: 'wills-it',
    date: 'Jun — Aug 2023',
    sortDate: new Date('2023-06-01').getTime(),
    title: 'IT Intern',
    subtitle: 'The Wills Group',
    category: 'work',
    description:
      'Triaged 40+ tickets across 250 employees. Automated Windows device provisioning with MDT and golden images so setup stopped being a manual, three-hour process.',
    tech: ['PowerShell', 'MDT', 'Windows Imaging', 'Jira'],
    outcomes: ['Setup time cut 50% across three regional sites', 'Downtime reduced 35%', 'L2/L3 escalation rate dropped'],
    reflection:
      'Reliability engineering starts at the bottom of the stack. If you can\'t trust the endpoints, nothing above them is stable.',
  },
  {
    id: 'enchantmentplus',
    date: 'Aug 2023',
    sortDate: new Date('2023-08-01').getTime(),
    title: 'EnchantmentPLUS',
    category: 'project',
    description:
      'A Minecraft mod that overhauled the enchantment system — custom mechanics, particle effects, a balanced progression engine built by reverse-engineering game internals. Deployed to a server with 100+ concurrent players.',
    tech: ['Java', 'Forge API', 'Spigot API', 'Blockbench', 'GIMP'],
    outcomes: ['Production deploy: 100+ concurrent connections', 'Custom progression system built on reverse-engineered game mechanics'],
    github: 'https://github.com/sprincee',
    reflection: 'You can\'t safely modify a system you don\'t understand. Reverse-engineering this was the only honest way to build on top of it.',
  },
  {
    id: 'quranquest',
    date: 'Dec 2023',
    sortDate: new Date('2023-12-01').getTime(),
    title: 'QuranQuest',
    category: 'project',
    description:
      'A gamified Islamic education platform with quizzes, progress tracking, and personalized learning paths. Deployed across two local mosques and used by 80+ students.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Python'],
    outcomes: ['80+ students across 2 mosque deployments', 'Personalized progress tracking per student'],
    github: 'https://github.com/sprincee/quranquest',
    reflection: 'Building for a community is different. These weren\'t users — I knew most of them. That changes how careful you are.',
  },
  {
    id: 'wills-sre',
    date: 'Jun — Aug 2024',
    sortDate: new Date('2024-06-01').getTime(),
    title: 'Site Reliability Intern',
    subtitle: 'The Wills Group',
    category: 'work',
    description:
      'Deployed Meraki hardware across 8 retail sites. Built IoT provisioning automation for 45+ BOHA devices and finished 50% ahead of schedule. Wrote the runbooks so the next person wouldn\'t have to call me.',
    tech: ['Meraki Portal', 'PowerShell', 'IoT', 'Networking'],
    outcomes: ['Staging time cut 40% across 8 sites', 'IoT provisioning delivered 50% ahead of schedule', 'Onboarding time down 25% from runbook documentation'],
    reflection: 'A well-written runbook is a reliability mechanism. It means the next person can handle this at 2am without waking you up.',
  },
  {
    id: 'flame',
    date: 'Oct 2024',
    sortDate: new Date('2024-10-01').getTime(),
    title: 'Flame',
    category: 'project',
    description:
      'AI thumbnail generator using a GPT-4o + DALL-E pipeline with request queuing. Hit 35+ concurrent users at peak without throttling.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Firebase', 'OpenAI DALL-E', 'Tailwind CSS'],
    outcomes: ['35+ concurrent users at peak', 'Request queuing to absorb LLM rate limits without user-facing errors'],
    github: 'https://github.com/sprincee/flame',
    live: 'https://flame3.vercel.app/',
    reflection: 'The interesting problem wasn\'t the AI. It was the queue — managing async load, rate limits, and user expectations at the same time.',
  },
  {
    id: 'poliview',
    date: 'May 2025',
    sortDate: new Date('2025-05-01').getTime(),
    title: 'PoliView',
    category: 'project',
    description:
      'A legislative tracking platform that pulls 500+ daily bill updates from the Congress.gov API. Users can follow voting records and policy shifts in real time.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Supabase', 'Congress.gov API', 'Framer Motion'],
    outcomes: ['500+ daily bill updates ingested', 'Real-time voting record and policy tracking'],
    github: 'https://github.com/sprincee/poliview',
    live: 'https://politcalview.vercel.app/',
    reflection: 'Government APIs will let you down. I built fallbacks early. That\'s the only honest way to work with upstream dependencies you don\'t control.',
  },
  {
    id: 'wills-swe',
    date: 'Jun — Aug 2025',
    sortDate: new Date('2025-06-01').getTime(),
    title: 'Software Engineering Intern',
    subtitle: 'The Wills Group · Fullstack + Infrastructure',
    category: 'work',
    description:
      'Architected an ML pipeline ingesting 1TB+ of enterprise data, cutting L1 manual analysis by 40%. Shipped a React dashboard with RBAC for 20+ stakeholders and zero-touch CI/CD. Automated TLS provisioning across 10+ POS terminals — config drift down 80%, PCI-DSS compliance maintained.',
    tech: ['React.js', 'Node.js', 'TypeScript', 'Python', 'SQLAlchemy', 'GitHub Actions', 'CI/CD'],
    outcomes: [
      '1TB+ ML pipeline; L1 manual analysis down 40%',
      'RBAC dashboard deployed to 20+ stakeholders',
      'Config drift reduced 80% via automated TLS provisioning',
      'PCI-DSS compliance across POS fleet',
    ],
    reflection: 'First time infra, data, and product all lived in the same sprint. Keeping them from stepping on each other is half organizational, half engineering.',
  },
  {
    id: 'umd-consultant',
    date: 'Sep — Dec 2025',
    sortDate: new Date('2025-09-01').getTime(),
    title: 'Technical Consultant',
    subtitle: 'University of Maryland',
    category: 'work',
    description:
      'Led a HubSpot CRM implementation for a career consulting client. Migrated 2,200+ contact records using Python automation and built the process documentation for what comes after you leave.',
    tech: ['HubSpot', 'Python', 'CRM', 'Data Migration'],
    outcomes: ['2,200+ records migrated', 'Full outreach tracking infrastructure delivered with documentation'],
    reflection: 'Data migrations are never just technical. Someone built their entire workflow around the old system. You\'re not just moving data — you\'re asking them to change habits.',
  },
  {
    id: 'supercrowd',
    date: 'Jan — May 2026',
    sortDate: new Date('2026-01-01').getTime(),
    title: 'Technical Consultant',
    subtitle: 'The Super Crowd, Inc. · Resuming Fall 2026',
    category: 'work',
    description:
      'Led system design for WorkOS — an AI-assisted Regulation Crowdfunding diligence platform. Designed the full pipeline: SEC EDGAR filing ingestion, LLM-driven impact scoring, founder claim verification, and phased delivery architecture. Ran feasibility analysis across three architecture candidates; the hybrid Hostinger/GitHub Actions stack scored 91.75/100 — outperformed AWS on cost, schedule, and operational risk.',
    tech: ['Python', 'GitHub Actions', 'MySQL', 'LLM APIs', 'SEC EDGAR API', 'System Design'],
    outcomes: [
      'Full system design: DFD, ERD, CRUD matrix, physical architecture',
      'Hybrid stack selected via weighted feasibility analysis (91.75/100)',
      'Pipeline: filing ingestion → LLM scoring → claim verification → report delivery',
    ],
    reflection:
      'Designing for someone else\'s methodology means the system has to be auditable, not just accurate. Every decision it makes needs to be traceable. That\'s a reliability requirement.',
  },
  {
    id: 'bs-graduation',
    date: 'May 2026',
    sortDate: new Date('2026-05-15').getTime(),
    title: 'BS Information Science',
    subtitle: 'University of Maryland, College Park',
    category: 'education',
    description:
      'Graduated from the University of Maryland with a BS in Information Science. Coursework across computer architecture, database design, UX, and data science — and a lot learned outside the classroom.',
    outcomes: ['Graduated May 2026', 'Concurrent enrollment in MS Information Systems (Plus One Program)'],
    reflection: 'The degree is the receipt. The real education was everything happening alongside it.',
  },
  {
    id: 'wills-infra',
    date: 'Jun 2026 — Present',
    sortDate: new Date('2026-06-01').getTime(),
    title: 'Infrastructure Specialist',
    subtitle: 'The Wills Group',
    category: 'work',
    isCurrent: true,
    description:
      'On-site infrastructure work across enterprise retail environments. Configuring firewalls, routing, and VLANs. Contributing to a virtualization project that will shrink back-office server rack footprint. Coordinating lifecycle management for 500+ phones and end-user devices.',
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
    description:
      'Currently enrolled in the Plus One accelerated MS program at UMD\'s Smith School of Business. Coursework: Advanced Data Science, Cloud Computing, Machine Learning.',
    outcomes: ['Advanced Data Science, Cloud Computing, Machine Learning', 'Accelerated BS → MS pathway'],
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
    body: "A first computer. Scratch blocks. A Minecraft server with real players and real stakes. The foundation wasn't school — it was obsession.",
    entryIds: ['first-computer', 'scratch', 'minecraft-team', 'duels-plugin', 'python-start'],
  },
  {
    num: '02',
    title: 'First Code',
    years: '2022 — 2023',
    ghostYear: '2022',
    headline: (
      <>
        First real job.<br />
        First real data.<br />
        First <strong style={{ fontWeight: 700 }}>failure</strong> that taught me something.
      </>
    ),
    body: "Two internships. Two projects. The things I built started mattering to people I hadn't met.",
    entryIds: ['remax', 'wills-it', 'enchantmentplus', 'quranquest'],
  },
  {
    num: '03',
    title: 'Going Pro',
    years: '2024 — 2025',
    ghostYear: '2024',
    headline: (
      <>
        I stopped<br />
        calling myself<br />
        a student.{' '}
        <strong style={{ fontWeight: 700 }}>Nobody</strong>{' '}
        <em style={{ fontStyle: 'italic', color: '#444' }}>argued.</em>
      </>
    ),
    body: 'Site reliability. ML pipelines. Legislative platforms. AI tools. Each one a harder problem than the last.',
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
    body: "Graduated. Building infrastructure. Shipping systems. Looking for the next hard thing.",
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
    body: 'MS graduation. The first SRE role. Whatever comes after that.',
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
        <span className="text-[10px] font-light tracking-widest text-white/20 uppercase">
          {entry.date}
        </span>
        <span className="text-[9px] font-light tracking-widest text-white/15 uppercase">
          {catLabel[entry.category]}
        </span>
        {entry.isCurrent && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-[9px] text-white/25 tracking-widest uppercase">Current</span>
          </span>
        )}
        {entry.isFuture && (
          <span className="text-[9px] text-white/15 tracking-widest uppercase">Upcoming</span>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm font-light leading-snug transition-colors duration-200 ${
            entry.isFuture ? 'text-white/25' : 'text-white/60 group-hover:text-white/90'
          }`}>
            {entry.title}
          </p>
          {entry.subtitle && (
            <p className="text-xs font-light text-white/20 mt-0.5">{entry.subtitle}</p>
          )}
        </div>
        <span className={`text-white/15 text-xs mt-0.5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
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
              <p className="text-xs font-light text-white/40 leading-relaxed">
                {entry.description}
              </p>

              {entry.outcomes && entry.outcomes.length > 0 && (
                <ul className="space-y-1">
                  {entry.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-light text-white/35">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              )}

              {entry.tech && entry.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entry.tech.map((t) => (
                    <span key={t} className="text-[9px] font-light text-white/20 border border-white/[0.07] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {entry.reflection && (
                <div className="border-l border-white/[0.07] pl-3 mt-2">
                  <p className="text-[11px] font-light text-white/25 leading-relaxed italic">
                    {entry.reflection}
                  </p>
                </div>
              )}

              {(entry.github || entry.live) && (
                <div className="flex gap-4 pt-1">
                  {entry.github && (
                    <a href={entry.github} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[10px] font-light text-white/25 hover:text-white/60 transition-colors">
                      <Github size={11} strokeWidth={1.5} /> GitHub
                    </a>
                  )}
                  {entry.live && (
                    <a href={entry.live} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[10px] font-light text-white/25 hover:text-white/60 transition-colors">
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
    'Frameworks & Cloud': ['React.js', 'Next.js', 'Node.js', 'Flask', 'Docker', 'AWS', 'GitHub Actions', 'CI/CD', 'REST APIs'],
    'Data & Infra': ['OpenAI API', 'Pandas', 'SQLAlchemy', 'Supabase', 'MySQL', 'Vercel', 'Linux', 'Git', 'Networking', 'VLANs'],
  }

  const recruiterEntries = [...entries]
    .filter((e) => !e.isFuture)
    .sort((a, b) => b.sortDate - a.sortDate)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#050505] text-white"
    >
      <div className="flex items-center justify-between px-10 py-5 border-b border-white/[0.05]">
        <span className="text-xs font-light tracking-widest text-white/20 uppercase">Recruiter View</span>
        <button onClick={onExit} className="text-xs font-light text-white/25 hover:text-white/60 transition-colors tracking-wider">
          ← Back to journey
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-10 py-14 space-y-16">
        {/* Hero block */}
        <div className="space-y-5">
          <div>
            <h1 className="text-4xl font-extralight text-white/90 tracking-tight">Mahad S. Khan</h1>
            <p className="text-sm font-light text-white/30 mt-1">
              BS Information Science, UMD &apos;26 &nbsp;·&nbsp; MS Information Systems (in progress) &nbsp;·&nbsp; Targeting SRE
            </p>
          </div>
          <p className="text-sm font-light text-white/40 leading-relaxed max-w-2xl">
            Four years of professional experience across infrastructure, fullstack development, and data engineering —
            consistently at the same company, earning broader scope with each return. I build things that run reliably and
            write the documentation to prove it.
          </p>
          <a
            href="/resume.pdf"
            download
            onClick={() => track('resume_download', { referrer: 'recruiter_mode', recruiter_mode: true })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-light tracking-wider rounded-full hover:bg-white/90 transition-colors"
          >
            <Download size={13} strokeWidth={1.5} />
            Download Resume
          </a>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/15 font-light mb-6">Skills</p>
          <div className="space-y-4">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="grid grid-cols-[160px_1fr] gap-6">
                <span className="text-xs font-light text-white/25 pt-0.5">{group}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <span key={s} className="text-[10px] font-light text-white/30 border border-white/[0.07] px-2.5 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/15 font-light mb-6">Experience & Projects</p>
          <div className="space-y-0">
            {recruiterEntries.map((e) => (
              <div key={e.id} className="grid grid-cols-[180px_1fr] gap-6 py-5 border-b border-white/[0.04] last:border-none">
                <div>
                  <p className="text-[10px] font-light text-white/20 uppercase tracking-wider">{e.date}</p>
                  <p className="text-[9px] font-light text-white/15 uppercase tracking-wider mt-0.5">{e.category}</p>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-light text-white/70">
                        {e.title}
                        {e.isCurrent && <span className="ml-2 text-[9px] text-white/25 tracking-widest">Current</span>}
                      </p>
                      {e.subtitle && <p className="text-xs font-light text-white/25 mt-0.5">{e.subtitle}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {e.github && (
                        <a href={e.github} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors">
                          <Github size={12} strokeWidth={1.5} />
                        </a>
                      )}
                      {e.live && (
                        <a href={e.live} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/50 transition-colors">
                          <ExternalLink size={12} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-light text-white/25 mt-1 leading-relaxed">
                    {e.outcomes?.[0] ?? e.description.split('.')[0] + '.'}
                  </p>
                  {e.tech && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {e.tech.slice(0, 5).map((t) => (
                        <span key={t} className="text-[9px] font-light text-white/20 border border-white/[0.05] px-1.5 py-px rounded-full">
                          {t}
                        </span>
                      ))}
                      {e.tech.length > 5 && (
                        <span className="text-[9px] text-white/15 font-light">+{e.tech.length - 5}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
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

  const goNext = useCallback(() => {
    if (chapterIndex < chapters.length - 1) setChapterIndex((i) => i + 1)
  }, [chapterIndex])

  const goPrev = useCallback(() => {
    if (chapterIndex > 0) setChapterIndex((i) => i - 1)
  }, [chapterIndex])

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
        <RecruiterView key="recruiter" onExit={() => setPhase('hero')} />
      </AnimatePresence>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden">
      {/* Blue ambient glow — bottom right, mirrors homepage */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[400px] z-0"
        style={{
          background: 'radial-gradient(ellipse at 85% 100%, rgba(29,78,216,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.04]">
        <Link href="/" className="flex items-center gap-2 text-white/20 hover:text-white/50 transition-colors group">
          <ArrowLeft size={14} strokeWidth={1.5} />
          <span className="text-xs font-light tracking-wider">home</span>
        </Link>
        <span className="text-xs font-light tracking-widest text-white/15 uppercase">mahad.studio</span>
        <button
          onClick={enterRecruiter}
          className="text-[10px] font-light tracking-widest text-white/25 uppercase border border-white/[0.08] px-4 py-2 rounded-full hover:border-white/20 hover:text-white/50 transition-all"
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
            className="relative z-10 flex min-h-[calc(100vh-57px)]"
          >
            {/* Ghost name */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 font-black text-white select-none leading-none z-0"
              style={{ fontSize: 'clamp(120px, 22vw, 240px)', color: '#0c0c0c', letterSpacing: '-0.05em', bottom: '-0.1em', left: '-0.05em' }}
            >
              MAHAD
            </div>

            <div className="relative z-10 flex w-full">
              {/* Left */}
              <div className="flex-1 flex flex-col justify-between px-12 py-16">
                <div>
                  <p className="text-[10px] font-light tracking-[0.22em] text-white/20 uppercase mb-8">
                    Journey in Tech
                  </p>
                  <h1 className="font-extralight leading-[0.94] tracking-tight text-white/90"
                    style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}>
                    I&apos;ve been<br />
                    taking things<br />
                    <strong className="font-black text-white">apart</strong> since{' '}
                    <em className="italic font-extralight text-white/35">five.</em>
                  </h1>
                  <p className="text-sm font-light text-white/25 leading-relaxed max-w-xs mt-6">
                    Still haven&apos;t stopped. This is the log — every build, every role, every moment something clicked. In order.
                  </p>
                  <div className="flex items-center gap-6 mt-10">
                    <button
                      onClick={enterJourney}
                      className="inline-flex items-center gap-3 bg-white text-black text-xs font-light tracking-wider px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                    >
                      Begin the journey <ArrowRight size={13} strokeWidth={1.5} />
                    </button>
                    <span className="text-[10px] text-white/15 tracking-widest uppercase">or scroll down</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 pb-2">
                  <a href="https://github.com/sprincee" target="_blank" rel="noopener noreferrer"
                    className="text-white/20 hover:text-white/60 transition-colors">
                    <Github size={16} strokeWidth={1.5} />
                  </a>
                  <a href="https://linkedin.com/in/mahad-skhan" target="_blank" rel="noopener noreferrer"
                    className="text-white/20 hover:text-white/60 transition-colors">
                    <Linkedin size={16} strokeWidth={1.5} />
                  </a>
                  <a href="mailto:mahadsuhaibkhan@gmail.com"
                    className="text-white/20 hover:text-white/60 transition-colors">
                    <Mail size={16} strokeWidth={1.5} />
                  </a>
                  <a href="/resume.pdf" download
                    onClick={() => track('resume_download', { referrer: 'hero', recruiter_mode: false })}
                    className="flex items-center gap-1.5 text-white/20 hover:text-white/60 transition-colors">
                    <Download size={16} strokeWidth={1.5} />
                    <span className="text-xs font-light tracking-wider">Resume</span>
                  </a>
                </div>
              </div>

              {/* Chapter index */}
              <div className="w-56 flex-shrink-0 border-l border-white/[0.04] px-7 py-16 flex flex-col">
                <p className="text-[9px] font-light tracking-[0.22em] text-white/15 uppercase mb-5">Five chapters</p>
                {chapters.map((ch, i) => (
                  <button
                    key={ch.num}
                    onClick={() => { setChapterIndex(i); setPhase('chapters') }}
                    className={`text-left px-3 py-2.5 rounded-md mb-1 group transition-colors ${
                      i === chapterIndex ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'
                    } ${ch.title === "What's Next" ? 'opacity-30' : ''}`}
                  >
                    <p className="text-[9px] text-white/15 font-light tracking-wider mb-0.5">{ch.num}</p>
                    <p className="text-[13px] font-light text-white/35 group-hover:text-white/55 transition-colors">{ch.title}</p>
                    <p className="text-[10px] text-white/15 font-light mt-0.5">{ch.years}</p>
                  </button>
                ))}
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
            className="relative z-10 flex flex-col min-h-[calc(100vh-57px)]"
          >
            {/* Progress bar */}
            <div className="h-px bg-white/[0.04] relative">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white/10"
                animate={{ width: `${((chapterIndex + 1) / chapters.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="flex flex-1">
              {/* Chapter sidebar */}
              <div className="w-52 flex-shrink-0 border-r border-white/[0.04] px-6 py-10 flex flex-col">
                <p className="text-[9px] font-light tracking-[0.22em] text-white/15 uppercase mb-5">Chapters</p>
                {chapters.map((ch, i) => (
                  <button
                    key={ch.num}
                    onClick={() => setChapterIndex(i)}
                    className={`text-left px-3 py-2.5 rounded-md mb-1 transition-all ${
                      i === chapterIndex ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                    } ${ch.title === "What's Next" ? 'opacity-30' : ''}`}
                  >
                    <p className="text-[9px] text-white/15 font-light tracking-wider mb-0.5">{ch.num}</p>
                    <p className={`text-[13px] font-light transition-colors ${i === chapterIndex ? 'text-white/75' : 'text-white/25'}`}>
                      {ch.title}
                    </p>
                    <p className="text-[10px] text-white/12 font-light mt-0.5">{ch.years}</p>
                  </button>
                ))}

                <div className="mt-auto space-y-5 pb-2">
                  <a href="/resume.pdf" download
                    onClick={() => track('resume_download', { referrer: 'chapter_sidebar', recruiter_mode: false })}
                    className="flex items-center gap-2 text-[10px] font-light text-white/20 hover:text-white/50 transition-colors tracking-wider">
                    <Download size={12} strokeWidth={1.5} /> Resume
                  </a>
                  <div className="flex gap-4">
                    <a href="https://github.com/sprincee" target="_blank" rel="noopener noreferrer" className="text-white/15 hover:text-white/50 transition-colors"><Github size={14} strokeWidth={1.5} /></a>
                    <a href="https://linkedin.com/in/mahad-skhan" target="_blank" rel="noopener noreferrer" className="text-white/15 hover:text-white/50 transition-colors"><Linkedin size={14} strokeWidth={1.5} /></a>
                    <a href="mailto:mahadsuhaibkhan@gmail.com" className="text-white/15 hover:text-white/50 transition-colors"><Mail size={14} strokeWidth={1.5} /></a>
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
                  className="flex flex-1 min-w-0"
                >
                  {/* Left: chapter frame */}
                  <div className="w-[42%] flex-shrink-0 border-r border-white/[0.04] px-12 py-10 flex flex-col justify-between overflow-hidden relative">
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 font-black text-white select-none leading-none"
                      style={{ fontSize: '160px', color: '#080808', letterSpacing: '-0.05em', bottom: '-0.08em', left: '-0.04em' }}
                    >
                      {currentChapter.ghostYear}
                    </div>

                    <div className="relative z-10">
                      <p className="text-[9px] font-light tracking-[0.2em] text-white/15 uppercase mb-3">
                        Chapter {currentChapter.num}
                      </p>
                      <h2
                        className="font-extralight leading-[1.0] tracking-tight text-white/85"
                        style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                      >
                        {currentChapter.headline}
                      </h2>
                      <p className="text-sm font-light text-white/25 leading-relaxed mt-4 max-w-[280px]">
                        {currentChapter.body}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 mt-8">
                      <button
                        onClick={goPrev}
                        disabled={chapterIndex === 0}
                        className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-white/25 hover:border-white/20 hover:text-white/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <ArrowLeft size={13} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={goNext}
                        disabled={chapterIndex === chapters.length - 1}
                        className="w-8 h-8 rounded-full border border-white/[0.12] flex items-center justify-center text-white/40 hover:border-white/25 hover:text-white/70 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <ArrowRight size={13} strokeWidth={1.5} />
                      </button>
                      <span className="text-[10px] text-white/15 font-light tracking-wider">
                        {chapterIndex + 1} / {chapters.length}
                      </span>
                    </div>
                  </div>

                  {/* Right: entries */}
                  <div className="flex-1 min-w-0 px-10 py-10 overflow-y-auto">
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

            {/* Bottom bar */}
            <div className="border-t border-white/[0.04] px-10 py-4 flex items-center justify-between">
              <button
                onClick={() => setPhase('hero')}
                className="text-[10px] font-light text-white/20 hover:text-white/50 transition-colors tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft size={11} strokeWidth={1.5} /> Back to start
              </button>
              <span className="text-[10px] text-white/12 tracking-widest uppercase font-light">
                {currentChapter.title} · {currentChapter.years}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  disabled={chapterIndex === 0}
                  className="text-[10px] text-white/20 hover:text-white/50 disabled:opacity-20 transition-colors font-light tracking-wider"
                >
                  ← prev
                </button>
                <button
                  onClick={goNext}
                  disabled={chapterIndex === chapters.length - 1}
                  className="text-[10px] text-white/20 hover:text-white/50 disabled:opacity-20 transition-colors font-light tracking-wider"
                >
                  next →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Software_v2