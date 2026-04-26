import nodemailer from "nodemailer"

const config = useRuntimeConfig()

// use your Gmail 0Auth2.0 credentials
export const mailer = nodemailer.createTransport({
  service: "SES-US-EAST-2",
  auth: {
    user: config.nodemailerAuthUser,
    pass: config.nodemailerAuthPass
  }
})

// // Verify if the SMTP server is ready
// await mailer.verify();

const inSandbox = process.env.RESEND_SANDBOX === '1'
const devRecipient = process.env.TEST_RECIPIENT

export function routeRecipient(to: string) {
  return inSandbox && devRecipient ? devRecipient : to
}
// optional helper function
export async function sendEmail(to: string, subject: string, html: string) {
  await mailer.sendMail({
    from: config.public.emailHost,
    to,
    subject,
    html
  })
}