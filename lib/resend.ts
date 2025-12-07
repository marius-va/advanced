import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.error('[Resend] RESEND_API_KEY is not defined in environment variables')
  throw new Error('RESEND_API_KEY is not defined in environment variables')
}

console.log('[Resend] Initializing Resend client with API key:',
  process.env.RESEND_API_KEY.substring(0, 10) + '...')

export const resend = new Resend(process.env.RESEND_API_KEY)
