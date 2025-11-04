// server/api/nominee.post.ts
import { defineEventHandler, readBody, createError, setResponseHeaders } from 'h3'
import { prisma } from '~/server/utils/prismaclient'
import { sendTemplateEmail } from '~/server/utils/sendTemplateEmail'
// Optional: if using Supabase auth on server
// import { serverSupabaseUser } from '#supabase/server'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  // --- CORS ---
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  if (event.node.req.method === 'OPTIONS') {
    // Preflight
    return ''
  }
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  // --- Auth (optional, recommended) ---
  // const user = await serverSupabaseUser(event)
  // if (!user) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })

  // --- Parse & validate body ---
  const body = await readBody<{
    firstName: string
    lastName: string
    phoneNumber: string
    address: string
    placeOfWork: string
    occupation: string
    email: string
    description: string
    photoURL: string
    slug: string
    nominatorName?: string
    nominatorEmail: string
  }>(event)

  const required = ['firstName','lastName','phoneNumber','address','placeOfWork','occupation','email','description','photoURL','slug','nominatorEmail'] as const
  for (const k of required) {
    if (!body?.[k] || typeof body[k] !== 'string') {
      throw createError({ statusCode: 400, statusMessage: `Missing or invalid field: ${k}` })
    }
  }

  const {
    firstName, lastName, phoneNumber, address, placeOfWork, occupation,
    email, description, photoURL, slug, nominatorEmail, nominatorName = ''
  } = body

  try {
    // Create or reuse nominator by unique email
    const nominator = await prisma.nominator.upsert({
      where: { email: nominatorEmail }, // email must be @unique in your schema
      update: {},
      create: {
        email: nominatorEmail,
        // If you have first/last on Nominator, split provided name
        firstName: nominatorName || 'Nominator',
        lastName: nominatorName || 'User',
      },
      select: { id: true }
    })

    // Create nominee (let Prisma generate id if your schema has @default(uuid()))
    const newNominee = await prisma.nominee.create({
      data: {
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
        nominator: { connect: { id: nominator.id } },
      }
    })

    // Fire-and-forget email (await if you need to surface errors)
    await sendTemplateEmail(email, 'NOMINATION', { name: firstName }).catch((e) => {
      // Log but don't fail the whole request
      console.error('sendTemplateEmail failed:', e)
    })

    return newNominee
  } catch (err: any) {
    // Handle unique constraint violations nicely
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      // err.meta?.target might contain ['email'] or ['slug']
      return createError({ statusCode: 409, statusMessage: 'Nominee already exists (email or slug conflict).' })
    }
    console.error(err)
    throw createError({ statusCode: 500, statusMessage: 'Error creating nominee' })
  }
})
