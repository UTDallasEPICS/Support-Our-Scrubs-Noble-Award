import { sendEmail, routeRecipient } from '~/server/utils/mailer'
import { contactSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': process.env.PUBLIC_ORIGIN || 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  if (getMethod(event) === 'OPTIONS') {
    return new Response(null, { status: 204 })
  }

  const { name, email, subject, message } = await readValidatedBody(event, b => contactSchema.parse(b))

  const rawAdmin = process.env.ADMIN_TO || process.env.CONTACT_TO || email
  const adminTo = routeRecipient(rawAdmin)

  const subjectLine =
    subject && subject.trim().length > 0
      ? `[Contact Form] ${subject.trim()}`
      : '[Contact Form] New message from website'

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #2c3e50; margin-bottom: 10px;">New Contact Form Message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject || '(no subject)'}</p>
      <p style="margin-top: 16px; margin-bottom: 8px;"><strong>Message:</strong></p>
      <div style="background:#f5f5f5; padding:12px 16px; border-radius: 6px; white-space:pre-wrap;">
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>
  `

  try {
    await sendEmail(adminTo, subjectLine, htmlBody)
    return { success: true }
  } catch (err: any) {
    console.error('[contact] email failed:', err)
    setResponseStatus(event, 500)
    return { success: false, error: 'Failed to send email' }
  }
})
