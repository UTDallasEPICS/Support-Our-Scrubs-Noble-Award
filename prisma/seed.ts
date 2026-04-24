import { PrismaClient } from "@prisma/client";
import {
    admins,
    emailTemplates,
    nominees,
    nominators,
    users,
} from "./mock-data";

const prisma = new PrismaClient();

async function seedAdmin(email: string, firstName: string, lastName: string) {
    try {
    const user = await prisma.user.upsert({
        where: { email },
        update: {firstName: firstName, lastName: lastName},
        create: { email, emailVerified: true, firstName: firstName, lastName: lastName },
    });
    const admin = await prisma.admin.upsert({
        include: { user: true },
        where: { userId: user.id },
        update: {},
        create: { user: { connect: { id: user.id } }, Position: "admin" },
    });
    console.log(`Admin user ensured: ${admin.user.email}`);
    } catch (err) {
        console.error('Error seeding admin', err)
        throw createError({ statusCode: 500, statusMessage: err as string })
    }
}

async function seedMockData() {
    console.log("Seeding mock data…");

    for (const u of users) {
        const name = [u.firstName, u.lastName].filter(Boolean).join(" ") || null;
        await prisma.user.upsert({
            where: { email: u.email },
            update: { firstName: u.firstName, lastName: u.lastName, name: name ?? undefined },
            create: {
                email: u.email,
                emailVerified: u.emailVerified,
                firstName: u.firstName,
                lastName: u.lastName,
                name: name ?? undefined,
            },
        });
    }
    console.log(`  • Users:    ${users.length}`);

    for (const a of admins) {
        const user = await prisma.user.findUniqueOrThrow({ where: { email: a.email } });
        await prisma.admin.upsert({
            where: { userId: user.id },
            update: { Position: a.Position },
            create: { user: { connect: { id: user.id } }, Position: a.Position },
        });
    }
    console.log(`  • Admins:   ${admins.length}`);

    for (const n of nominators) {
        const user = await prisma.user.findUniqueOrThrow({ where: { email: n.email } });
        await prisma.nominator.upsert({
            where: { userId: user.id },
            update: {},
            create: { user: { connect: { id: user.id } } },
        });
    }
    console.log(`  • Nominators: ${nominators.length}`);

    for (const nom of nominees) {
        const nomineeUser = await prisma.user.findUniqueOrThrow({
            where: { email: nom.email },
        });
        const nominatorUser = await prisma.user.findUniqueOrThrow({
            where: { email: nom.nominatorEmail },
        });
        const nominator = await prisma.nominator.findUniqueOrThrow({
            where: { userId: nominatorUser.id },
        });



        await prisma.nominee.upsert({
            where: { slug: nom.slug },
            update: {
                phoneNumber: nom.phoneNumber,
                address: nom.address,
                placeOfWork: nom.placeOfWork,
                occupation: nom.occupation,
                description: nom.description,
                aboutme: nom.aboutme,
                photoURL: nom.photoURL,
                user: { connect: { id: nomineeUser.id } },
                nominator: { connect: { id: nominator.id } },
                // admin: { connect: { id: adminId! } },
                status: nom.status,
                deleted: nom.deleted,
            },
            create: {
                slug: nom.slug,
                phoneNumber: nom.phoneNumber,
                address: nom.address,
                placeOfWork: nom.placeOfWork,
                occupation: nom.occupation,
                description: nom.description,
                aboutme: nom.aboutme,
                photoURL: nom.photoURL,
                user: { connect: { id: nomineeUser.id } },
                nominator: { connect: { id: nominator.id } },
                // admin: { connect: { id: adminId! } },
                status: nom.status,
                deleted: nom.deleted,
            },
        });
    }
    console.log(`  • Nominees: ${nominees.length}`);

    for (const t of emailTemplates) {
        await prisma.emailTemplate.upsert({
            where: { key: t.key },
            update: { subject: t.subject, html: t.html, text: t.text, enabled: t.enabled },
            create: {
                key: t.key,
                subject: t.subject,
                html: t.html,
                text: t.text,
                enabled: t.enabled,
            },
        });
    }
    console.log(`  • Email templates: ${emailTemplates.length}`);
}

async function main() {
    const arg = process.argv[2];
// arg: email, firstName, lastName
    if (arg && arg.includes("@")) {
        const args = arg.split(" ");
        const email = args[0];
        const firstName = args[1];
        const lastName = args[2];
        await seedAdmin(email, firstName, lastName);
    }

    await seedMockData();
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
