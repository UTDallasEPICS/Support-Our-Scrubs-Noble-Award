import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
const REGION = process.env.AWS_REGION;
const sesClient = new SESClient({ region: REGION });

export default defineEventHandler(async (event) => {
    const reqBody = await readBody(event);

    const emailAddress = reqBody.email as string;
    const content = reqBody.content as string;
    const subjectLine = reqBody.subject as string;

    const createEmailCommand = () => {
        return new SendEmailCommand({
            Destination: { ToAddresses: [ emailAddress ] },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: content
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subjectLine
                }
            },
            Source: process.env.AWS_SES_ADDRESS
        });
    };

    const sendEmailCommand = createEmailCommand();
    try {
        await sesClient.send(sendEmailCommand);
    } catch (err) {
        console.error(err)
        if (err instanceof Error && err.name === "MessageRejected") {
            throw createError({
                statusCode: 502,
                statusMessage: "Email message rejected",
            });
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: "Error occurred while sending email",
            });
        }
    }
});