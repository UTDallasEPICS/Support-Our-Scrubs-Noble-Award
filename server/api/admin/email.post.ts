export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const nomineeName = body.name;
    const destinationEmail = body.email;
    const type = body.type.toLowerCase();
    
    await sendTemplateEmail(destinationEmail, (type === "accepted") ? "ACCEPTED" : "REJECTED", {
        name: nomineeName
    });
});