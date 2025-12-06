import { type NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

type EmailRequest = {
  to: string
  subject: string
  text: string
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

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with verified domain in production
      to: body.to,
      subject: body.subject,
      text: body.text,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    )
  }
}
