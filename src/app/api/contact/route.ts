import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string
  email: string
  shootType: string
  date: string
  message: string
}

// ─── Validation ────────────────────────────────────────────────────────────────
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim())    return 'Name is required.'
  if (!body.email?.trim())   return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Invalid email address.'
  if (!body.shootType)       return 'Please select a shoot type.'
  if (!body.message?.trim()) return 'Message is required.'
  return null
}

// ─── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body: Partial<ContactPayload> = await req.json()

    const error = validate(body)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const { name, email, shootType, date, message } = body as ContactPayload

    await resend.emails.send({
      from: 'Mahad Studio <hello@mahad.studio>',
      to: process.env.CONTACT_EMAIL ?? 'hello@mahad.studio',
      replyTo: email,
      subject: `New booking inquiry — ${shootType}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-weight: 300; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
            New Inquiry from mahad.studio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a1a1a;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Shoot Type</td>
              <td style="padding: 8px 0;">${shootType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Preferred Date</td>
              <td style="padding: 8px 0;">${date || 'Not specified'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #666; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="margin-top: 32px; color: #999; font-size: 12px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    // ── Confirmation email to the customer ──
    await resend.emails.send({
      from: 'Mahad Studio <hello@mahad.studio>',
      to: email,
      subject: `Got your inquiry, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-weight: 300; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
            Thanks for reaching out.
          </h2>
          <p style="line-height: 1.8; color: #444;">
            Hey ${name.split(' ')[0]}, I received your inquiry for a <strong>${shootType}</strong> shoot
            ${date ? `on <strong>${date}</strong>` : ''} and I'll be in touch within 24–48 hours.
          </p>
          <p style="line-height: 1.8; color: #444;">
            In the meantime, feel free to browse more of my work at
            <a href="https://mahad.studio/photography" style="color: #1a1a1a;">mahad.studio/photography</a>.
          </p>
          <p style="margin-top: 32px; color: #1a1a1a;">— Mahad</p>
          <p style="margin-top: 32px; color: #999; font-size: 11px; border-top: 1px solid #e5e5e5; padding-top: 16px;">
            mahad.studio · hello@mahad.studio
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}