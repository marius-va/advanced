import { type NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

type EmailRequest = {
  to: string
  subject: string
  text: string
  replyTo?: string
  from?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: EmailRequest = await req.json()

    if (!body.to || !body.subject || !body.text) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, text' },
        { status: 400 }
      )
    }

    // Use custom from address if provided, otherwise use default
    const fromEmail = body.from || 'onboarding@resend.dev'

    console.log('[Email API] Sending email:', {
      from: fromEmail,
      to: body.to,
      replyTo: body.replyTo,
      subject: body.subject,
    })

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: body.to,
      subject: body.subject,
      text: body.text,
      ...(body.replyTo && { reply_to: body.replyTo }),
    })

    if (error) {
      console.error('[Email API] Resend error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: error,
          message: error.message || 'Unknown error from email service'
        },
        { status: 500 }
      )
    }

    console.log('[Email API] Email sent successfully:', data?.id)
    return NextResponse.json({
      success: true,
      emailId: data?.id,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error('[Email API] Unexpected error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: (error as Error).message,
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
      },
      { status: 500 }
    )
  }
}
