import nodemailer from "nodemailer"

// use your SMTP info from Supabase Auth settings (or Resend / Gmail / etc.)
export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,           // e.g. smtp.sendgrid.net
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true if using port 465
  auth: {
    user: process.env.SMTP_USER,         // e.g. "apikey"
    pass: process.env.SMTP_PASS          // e.g. your real key
  }
})
const inSandbox = process.env.RESEND_SANDBOX === '1'
const devRecipient = process.env.TEST_RECIPIENT

export function routeRecipient(to: string) {
  return inSandbox && devRecipient ? devRecipient : to
}
// optional helper function
export async function sendEmail(to: string, subject: string, html: string) {
  await mailer.sendMail({
    from: process.env.MAIL_FROM || "onboarding@resend.dev",
    to,
    subject,
    html
  })
}