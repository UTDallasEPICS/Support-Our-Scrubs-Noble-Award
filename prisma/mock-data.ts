import { Status, EmailTemplateType } from "../shared/types";

export type MockUser = {
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
};

export type MockAdmin = {
    email: string;
    Position: string;
};

export type MockNominator = {
    email: string;
};

export type MockNominee = {
    slug: string;
    phoneNumber: string;
    address: string;
    placeOfWork: string;
    occupation: string;
    description: string;
    aboutme: string | null;
    photoURL: string | null;
    email: string;
    nominatorEmail: string;
    adminEmail: string | null;
    status: Status;
    deleted: boolean;
};

export type MockEmailTemplate = {
    key: EmailTemplateType;
    subject: string;
    html: string;
    text: string | null;
    enabled: boolean;
};

export const users: MockUser[] = [
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

export const admins: MockAdmin[] = [
    { email: "ava.patel@example.com",    Position: "Program Director" },
    { email: "marcus.reyes@example.com", Position: "Selection Chair" },
];

export const nominators: MockNominator[] = [
    { email: "hannah.kim@example.com" },
    { email: "diego.ramirez@example.com" },
    { email: "priya.shah@example.com" },
    { email: "jonathan.walker@example.com" },
    { email: "sofia.gonzalez@example.com" },
];

export const nominees: MockNominee[] = [
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
        status: Status.APPROVED,
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
        status: Status.CREATED,
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
        status: Status.CONFIRMED,
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
        status: Status.VERIFIED,
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
        status: Status.DENIED,
        deleted: false,
    },
];

export const emailTemplates: MockEmailTemplate[] = [
    {
        key: EmailTemplateType.SIGNUP,
        subject: "Welcome to Support Our Scrubs, {{name}}",
        html: "<p>Hi {{name}},</p><p>Thanks for joining <strong>Support Our Scrubs</strong>. You can now sign in with your email and start nominating healthcare heroes for the Noble Award.</p><p>— The Support Our Scrubs Team</p>",
        text: "Hi {{name}}, thanks for joining Support Our Scrubs. You can now sign in and start nominating healthcare heroes for the Noble Award.",
        enabled: true,
    },
    {
        key: EmailTemplateType.NOMINATION,
        subject: "You've been nominated for the Noble Award, {{name}}",
        html: "<p>Dear {{name}},</p><p>You have been nominated for the <strong>Noble Award</strong> in recognition of your service in healthcare. We'd love for you to complete your nominee profile so the selection committee can learn more about you.</p><p>Click the link in your account to finish setting up your profile.</p><p>With gratitude,<br/>The Support Our Scrubs Team</p>",
        text: "Dear {{name}}, you have been nominated for the Noble Award. Please sign in and complete your nominee profile so the selection committee can learn more about you.",
        enabled: true,
    },
    {
        key: EmailTemplateType.ACCEPTED,
        subject: "Congratulations, {{name}} — you've been selected",
        html: "<p>Dear {{name}},</p><p>We are thrilled to share that you have been <strong>selected</strong> as a recipient of this year's Noble Award. A member of our team will reach out within the next few days with details about the ceremony.</p><p>Thank you for the care you give your patients and community.</p><p>Warmly,<br/>The Support Our Scrubs Team</p>",
        text: "Dear {{name}}, we are thrilled to share that you have been selected as a recipient of this year's Noble Award. A team member will be in touch about the ceremony soon.",
        enabled: true,
    },
    {
        key: EmailTemplateType.REJECTED,
        subject: "An update on your Noble Award nomination",
        html: "<p>Dear {{name}},</p><p>Thank you for being part of this year's Noble Award nominations. After careful review, the selection committee has chosen a different recipient for this cycle.</p><p>We are deeply grateful for the work you do every day, and we hope you will stay connected with us for future nominations.</p><p>With appreciation,<br/>The Support Our Scrubs Team</p>",
        text: "Dear {{name}}, thank you for being part of this year's Noble Award nominations. After careful review, the committee has chosen a different recipient for this cycle. We are deeply grateful for your work.",
        enabled: true,
    },
];

export const mockData = {
    users,
    admins,
    nominators,
    nominees,
    emailTemplates,
};
