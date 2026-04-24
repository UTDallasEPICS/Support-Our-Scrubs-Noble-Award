import nodemailer from "nodemailer"

import { oAuth2Client } from "./googleAPI"


const config = useRuntimeConfig()

// Generating Access Token 
// const accessToken = await oAuth2Client.getAccessToken()
// if (!accessToken || !accessToken.token) {
//   throw new Error("Failed to retrieve access token.");
// }
console.log("Access token retrieved successfully.");

// use your Gmail 0Auth2.0 credentials
export const mailer = nodemailer.createTransport({
  service: "gmail",       // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: config.public.emailHost,
    clientId: config.clientID,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken
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