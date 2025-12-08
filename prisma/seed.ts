
const prisma = new PrismaClient();
async function main() {
    await prisma.admin.upsert({
        where: { email: process.env.SEED_EMAIL! },
        update: {},
        create: {
            email: process.env.SEED_EMAIL!,
            Position: "admin",
        }
    });

    console.log(`A seed admin account has been created with the email ${process.env.SEED_EMAIL}`);
    console.log("In order to login, register for an account using this email and click the link it sends");    
}

main().catch((err) => {
    console.error(err);
}).finally(async () => {
    await prisma.$disconnect();
});