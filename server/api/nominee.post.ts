import { prisma } from "../utils/prismaclient";
import { sendTemplateEmail } from '../utils/sendTemplateEmail';
import { SESClient } from '@aws-sdk/client-ses';
import { v4 as uuidv4 } from 'uuid';
import { readMultipartFormData, setResponseHeaders } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export default defineEventHandler(async (event) => {

  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:3000', // adjust if needed
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  // Parse multipart/form-data
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'No form data received' });
  }

  type MultipartEntry = {
    name: string;
    filename?: string;
    type?: string;
    data: Buffer;
  };

  const fields: Record<string, string> = {};
  let filePart: MultipartEntry | null = null;

  for (const rawPart of form) {
    const part = rawPart as MultipartEntry;
    if (part.filename) {
      filePart = part;
    } else {
      fields[part.name] = part.data.toString('utf8');
    }
  }

  const firstName = fields.firstName;
  const lastName = fields.lastName;
  const phoneNumber = fields.phoneNumber;
  const address = fields.address;
  const placeOfWork  = fields.placeOfWork;
  const occupation = fields.occupation;
  const email = fields.email;
  const description = fields.description;
  const nominatorId = fields.nominatorId || undefined;
  const adminId = fields.adminId || undefined;
  const nominatorName = fields.nominatorName;
  const nominatorEmail = fields.nominatorEmail;
  const slugFromClient = fields.slug;

  const nomineeId = uuidv4();

  // Save file (if provided)
  let photoURL: string | null = null;

  if (filePart && filePart.filename) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(filePart.filename) || '.jpg';
    const fileName = `${nomineeId}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, filePart.data);

    // This URL will be accessible at https://your-domain/uploads/<fileName>
    photoURL = `/uploads/${fileName}`;
  }

  // Generate slug server-side if missing
  const slug =
    slugFromClient ||
    `${(firstName || 'nominee').toLowerCase()}-${(lastName || 'noble').toLowerCase()}-${Date.now()}`;

  let newNominee = null;

  try {
    // Find or create nominator by email
    let nominator = await prisma.nominator.findUnique({
      where: { email: nominatorEmail }
    });

    if (!nominator) {
      nominator = await prisma.nominator.create({
        data: {
          firstName: nominatorName,
          lastName: nominatorName, // you can split first/last later if needed
          email: nominatorEmail
        }
      });
    }

    newNominee = await prisma.nominee.create({
      data: {
        nominator: {
          connect: {
            id: nominator.id
          }
        },
        id: nomineeId,
        firstName,
        lastName,
        phoneNumber,
        address,
        placeOfWork,
        occupation,
        email,
        description,
        photoURL,
        slug,
        // if your schema has status with a default, you don't need to set it here
      }
    });

    await sendTemplateEmail(email, "NOMINATION", {
      name: firstName
    });
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, statusMessage: "Error creating nominee" });
  }

  return newNominee;
});
