import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const headersList = await headers()

  // ── Log the download ──────────────────────────────────────────────────────
  // In V1 we log to console (visible in Vercel function logs).
  // Swap this out for a DB insert (Vercel Postgres / PlanetScale) in V2.
  const logEntry = {
    timestamp: new Date().toISOString(),
    userAgent: headersList.get('user-agent') ?? 'unknown',
    referrer: headersList.get('referer') ?? 'direct',
    ip: headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
  }

  console.log('[resume_download]', JSON.stringify(logEntry))

  // ── Fire GA4 Measurement Protocol event (server-side) ─────────────────────
  // Optional but gives you server-confirmed download counts, not just clicks.
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID
  const GA_API_SECRET = process.env.GA_API_SECRET

  if (GA_MEASUREMENT_ID && GA_API_SECRET) {
    fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: logEntry.ip, // best proxy without cookies server-side
          events: [
            {
              name: 'resume_download',
              params: {
                referrer: logEntry.referrer,
                user_agent: logEntry.userAgent,
              },
            },
          ],
        }),
      }
    ).catch(() => {
      // Non-blocking — never fail a download because analytics is down
    })
  }

  // ── Serve the PDF ──────────────────────────────────────────────────────────
  const filePath = path.join(process.cwd(), 'public', 'resume.pdf')

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Resume not found', { status: 404 })
  }

  const fileBuffer = fs.readFileSync(filePath)

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="MahadKhan_Resume.pdf"',
      'Content-Length': fileBuffer.length.toString(),
      // Prevent caching so every download is counted
      'Cache-Control': 'no-store',
    },
  })
}