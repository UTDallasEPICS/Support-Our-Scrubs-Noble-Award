import { PrismaClient } from './generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

/**
 * Development seed, run via `pnpm prisma db seed` (and automatically at the
 * end of `pnpm prisma migrate reset`).
 *
 * Self-contained on purpose: it builds its own PrismaClient on the
 * better-sqlite3 driver adapter instead of importing the Nitro singleton from
 * `./prisma`, so it runs as a plain tsx script outside of Nuxt. All mock data
 * lives inline below, and every write is an `upsert`, so re-running the seed
 * is idempotent.
 *
 * Usage:
 *   pnpm prisma db seed -- --admin-email <email> --admin-name "First Last" --load-mock-data true
 */

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

type NomineeStatus =
  | 'CREATED'
  | 'CONFIRMED'
  | 'VERIFIED'
  | 'APPROVED'
  | 'DENIED'
  | 'SENT'

type TemplateKey = 'SIGNUP' | 'NOMINATION' | 'ACCEPTED' | 'REJECTED'

type MockUser = {
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
}

type MockAdmin = {
  email: string
  Position: string
}

type MockNominator = {
  email: string
}

type MockNominee = {
  slug: string
  phoneNumber: string
  address: string
  placeOfWork: string
  occupation: string
  description: string
  aboutme: string | null
  photoURL: string | null
  email: string
  nominatorEmail: string
  adminEmail: string | null
  status: NomineeStatus
  deleted: boolean
}

type MockEmailTemplate = {
  key: TemplateKey
  subject: string
  html: string
  text: string | null
  enabled: boolean
}

const users: MockUser[] = [
    { firstName: "Ava",      lastName: "Patel",    email: "ava.patel@example.com",       emailVerified: true },
    { firstName: "Marcus",   lastName: "Reyes",    email: "marcus.reyes@example.com",    emailVerified: true },
    { firstName: "Hannah",   lastName: "Kim",      email: "hannah.kim@example.com",      emailVerified: true },
    { firstName: "Diego",    lastName: "Ramirez",  email: "diego.ramirez@example.com",   emailVerified: true },
    { firstName: "Priya",    lastName: "Shah",     email: "priya.shah@example.com",      emailVerified: true },
    { firstName: "Jonathan", lastName: "Walker",   email: "jonathan.walker@example.com", emailVerified: true },
    { firstName: "Sofia",    lastName: "Gonzalez", email: "sofia.gonzalez@example.com",  emailVerified: true },
    { firstName: "Clara",    lastName: "Nguyen",   email: "clara.nguyen@example.com",    emailVerified: true },
    { firstName: "Samuel",   lastName: "Johnson",  email: "samuel.johnson@example.com",  emailVerified: true },
    { firstName: "Elena",    lastName: "Martinez", email: "elena.martinez@example.com",  emailVerified: true },
    { firstName: "Noah",     lastName: "Bennett",  email: "noah.bennett@example.com",    emailVerified: true },
    { firstName: "Isabella", lastName: "Chen",     email: "isabella.chen@example.com",   emailVerified: true },
];

const admins: MockAdmin[] = [
    { email: "ava.patel@example.com",    Position: "Program Director" },
    { email: "marcus.reyes@example.com", Position: "Selection Chair" },
];

const nominators: MockNominator[] = [
    { email: "hannah.kim@example.com" },
    { email: "diego.ramirez@example.com" },
    { email: "priya.shah@example.com" },
    { email: "jonathan.walker@example.com" },
    { email: "sofia.gonzalez@example.com" },
];

const nominees: MockNominee[] = [
    {
        slug: "clara-nguyen",
        phoneNumber: "+1-214-555-0101",
        address: "1240 Harwood St, Dallas, TX 75201",
        placeOfWork: "Parkland Memorial Hospital",
        occupation: "Registered Nurse, ICU",
        description: "Led the night-shift ICU through the winter surge with compassion and calm.",
        aboutme: "Ten years at Parkland. I believe nursing is as much presence as procedure.",
        photoURL: null,
        email: "clara.nguyen@example.com",
        nominatorEmail: "hannah.kim@example.com",
        adminEmail: "ava.patel@example.com",
        status: 'APPROVED',
        deleted: false,
    },
    {
        slug: "samuel-johnson",
        phoneNumber: "+1-469-555-0102",
        address: "3500 Gaston Ave, Dallas, TX 75246",
        placeOfWork: "Baylor University Medical Center",
        occupation: "Respiratory Therapist",
        description: "Designed a peer-mentoring program that cut onboarding time for new therapists in half.",
        aboutme: "Dad of two, marathoner, and a stubborn optimist.",
        photoURL: null,
        email: "samuel.johnson@example.com",
        nominatorEmail: "diego.ramirez@example.com",
        adminEmail: null,
        status: 'CREATED',
        deleted: false,
    },
    {
        slug: "elena-martinez",
        phoneNumber: "+1-972-555-0103",
        address: "8200 Preston Rd, Plano, TX 75024",
        placeOfWork: "Children's Medical Center Plano",
        occupation: "Pediatric Oncology Nurse",
        description: "Built the hospital's first bilingual family-navigator program.",
        aboutme: "I speak English, Spanish, and fluent bad-dad-joke.",
        photoURL: null,
        email: "elena.martinez@example.com",
        nominatorEmail: "priya.shah@example.com",
        adminEmail: "marcus.reyes@example.com",
        status: 'CONFIRMED',
        deleted: false,
    },
    {
        slug: "noah-bennett",
        phoneNumber: "+1-817-555-0104",
        address: "1500 S Main St, Fort Worth, TX 76104",
        placeOfWork: "Texas Health Harris Methodist",
        occupation: "ER Charge Nurse",
        description: "Stayed 36 hours during the February ice storm to keep the ER staffed.",
        aboutme: "Coffee, trail running, and three rescue dogs.",
        photoURL: null,
        email: "noah.bennett@example.com",
        nominatorEmail: "jonathan.walker@example.com",
        adminEmail: null,
        status: 'VERIFIED',
        deleted: false,
    },
    {
        slug: "isabella-chen",
        phoneNumber: "+1-214-555-0105",
        address: "5323 Harry Hines Blvd, Dallas, TX 75390",
        placeOfWork: "UT Southwestern Medical Center",
        occupation: "OR Surgical Technologist",
        description: "Standardized sterile-field checklists adopted across the surgical department.",
        aboutme: "First-gen college grad. Ceramics on the weekends.",
        photoURL: null,
        email: "isabella.chen@example.com",
        nominatorEmail: "sofia.gonzalez@example.com",
        adminEmail: "ava.patel@example.com",
        status: 'DENIED',
        deleted: false,
    },
];

const emailTemplates: MockEmailTemplate[] = [
    {
        key: 'SIGNUP',
        subject: "Welcome to Support Our Scrubs, {{name}}",
        html: "<p>Hi {{name}},</p><p>Thanks for joining <strong>Support Our Scrubs</strong>. You can now sign in with your email and start nominating healthcare heroes for the Noble Award.</p><p>— The Support Our Scrubs Team</p>",
        text: "Hi {{name}}, thanks for joining Support Our Scrubs. You can now sign in and start nominating healthcare heroes for the Noble Award.",
        enabled: true,
    },
    {
        key: 'NOMINATION',
        subject: "You've been nominated for the Noble Award, {{name}}",
        html: "<p>Dear {{name}},</p><p>You have been nominated for the <strong>Noble Award</strong> in recognition of your service in healthcare. We'd love for you to complete your nominee profile so the selection committee can learn more about you.</p><p>Click the link in your account to finish setting up your profile.</p><p>With gratitude,<br/>The Support Our Scrubs Team</p>",
        text: "Dear {{name}}, you have been nominated for the Noble Award. Please sign in and complete your nominee profile so the selection committee can learn more about you.",
        enabled: true,
    },
    {
        key: 'ACCEPTED',
        subject: "Congratulations, {{name}} — you've been selected",
        html: "<p>Dear {{name}},</p><p>We are thrilled to share that you have been <strong>selected</strong> as a recipient of this year's Noble Award. A member of our team will reach out within the next few days with details about the ceremony.</p><p>Thank you for the care you give your patients and community.</p><p>Warmly,<br/>The Support Our Scrubs Team</p>",
        text: "Dear {{name}}, we are thrilled to share that you have been selected as a recipient of this year's Noble Award. A team member will be in touch about the ceremony soon.",
        enabled: true,
    },
    {
        key: 'REJECTED',
        subject: "An update on your Noble Award nomination",
        html: "<p>Dear {{name}},</p><p>Thank you for being part of this year's Noble Award nominations. After careful review, the selection committee has chosen a different recipient for this cycle.</p><p>We are deeply grateful for the work you do every day, and we hope you will stay connected with us for future nominations.</p><p>With appreciation,<br/>The Support Our Scrubs Team</p>",
        text: "Dear {{name}}, thank you for being part of this year's Noble Award nominations. After careful review, the committee has chosen a different recipient for this cycle. We are deeply grateful for your work.",
        enabled: true,
    },
];

async function seedAdmin(email: string, firstName: string, lastName: string) {
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

function getArgValue(argName: string): string | undefined {
    const argIndex = process.argv.indexOf(argName);

    if (argIndex === -1) {
      return undefined;
    }

    return process.argv[argIndex + 1];
  }

function getBooleanArg(argName: string): boolean {
    const value = getArgValue(argName);

    if (!value) {
      return false;
    }

    return value.toLowerCase() === "true";
  }

async function main() {
    // pnpm prisma db seed -- --admin-email <email> --admin-name <name> --load-mock-data <true/false>
    const adminEmail = getArgValue("--admin-email") || process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    const [adminFirstName = "Admin", adminLastName = "User"] = getArgValue("--admin-name")?.split(" ") || [];
    const loadMockData = getBooleanArg("--load-mock-data");

    if (!adminEmail.includes("@")) {
        throw new Error(`Invalid admin email: "${adminEmail}"`);
    }

    await seedAdmin(adminEmail, adminFirstName, adminLastName);
    if (loadMockData) {
        await seedMockData();
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect()
        process.exit(1);
    });
