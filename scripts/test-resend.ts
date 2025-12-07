/**
 * Test script to verify Resend API configuration
 * Run with: npx tsx scripts/test-resend.ts
 */

import { resend } from '../lib/resend'

async function testResend() {
  console.log('🧪 Testing Resend API configuration...\n')

  try {
    console.log('📧 Attempting to send test email...')

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'donskas@gmail.com', // Your verified email address
      subject: 'Test Email from Contact Form',
      text: 'This is a test email to verify Resend configuration works correctly.',
    })

    if (error) {
      console.error('❌ Resend API Error:')
      console.error(JSON.stringify(error, null, 2))

      // Check for common errors
      if (error.message?.includes('API key')) {
        console.error('\n💡 Tip: Your RESEND_API_KEY might be invalid or expired.')
        console.error('   Get a new key from: https://resend.com/api-keys')
      }

      process.exit(1)
    }

    console.log('✅ Email API call successful!')
    console.log('📬 Email ID:', data?.id)
    console.log('\n✨ Resend is configured correctly!')

  } catch (error) {
    console.error('❌ Unexpected error:')
    console.error(error)
    process.exit(1)
  }
}

testResend()
