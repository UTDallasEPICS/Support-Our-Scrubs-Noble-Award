// import { prisma, EmailTemplateType} from "../utils/prismaclient";
// import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';


// export async function sendTemplateEmail(destinationEmail: string, template: EmailTemplateType, args: {[k: string]: string}) {
//     const templateData = await prisma.emailTemplate.findUniqueOrThrow({
//         where: { type: template }
//     });

//     let templateSubject = templateData.subject;
//     let templateText = templateData.content;

//     for (const key in args) {
//         templateSubject = templateSubject.replaceAll(`{${key}}`, args[key]);
//         templateText = templateText.replaceAll(`{${key}}`, args[key]);
//     }

//     await sesClient.send(new SendEmailCommand({
//         Source: process.env.AWS_SES_ADDRESS,
//         Destination: { ToAddresses: [destinationEmail] },
//         Message: {
//             Subject: { Data: templateSubject },
//             Body: {
//                 Html: { Data: templateText }
//             }
//         }
//     }));
// }