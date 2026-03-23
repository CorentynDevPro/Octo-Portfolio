/**
 * POST /api/contact
 * Handles contact form submissions.
 * In production, integrate with an email provider (e.g. Resend, Nodemailer).
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, email, message } = body || {}

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: name, email, message',
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address',
    })
  }

  // Sanitized log: only log name and subject (no PII like email/message content)
  console.log('[Contact Form] New submission from:', name, '| Subject:', body.subject || 'N/A')

  return {
    success: true,
    message: 'Message received. Thank you!',
  }
})
