import { z } from 'zod'
import { Prisma } from '@prisma/client'

// ── Reusable field-level schemas ────────────────────────────────────────────

export const emailField = z.email().toLowerCase()
export const uuidField = z.uuid()

// ── Body / query schemas (grouped by domain) ───────────────────────────────

// Auth & role checks
export const emailBodySchema = z.object({
  email: emailField,
})

// Nominee
export const nomineeCreateSchema = z.object({
  firstName:   z.string().min(1, 'First name is required'),
  lastName:    z.string().min(1, 'Last name is required'),
  nominatorFirstName: z.string().min(1, 'Nominator First Name is required'),
  nominatorLastName: z.string().min(1, 'Nominator Last Name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address:     z.string().min(1, 'Address is required'),
  placeOfWork: z.string().min(1, 'Place of work is required'),
  occupation:  z.string().min(1, 'Occupation is required'),
  email:       emailField,
  description: z.string().min(1, 'Description is required'),
  photoURL:    z.string().optional(),
})

export const nomineeUpdateSchema = z.object({
  id:          uuidField,
  firstName:   z.string().min(1).optional(),
  lastName:    z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional(),
  address:     z.string().min(1).optional(),
  placeOfWork: z.string().min(1).optional(),
  occupation:  z.string().min(1).optional(),
  email:       emailField.optional(),
  description: z.string().min(1).optional(),
  aboutme:     z.string().max(300).optional(),
  photoURL:    z.string().optional(),
})

export const nomineeDeleteQuerySchema = z.object({
  nomineeId: uuidField,
})

// Nominator
export const nominatorCreateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     emailField,
})

// Admin
export const adminCreateSchema = z.object({
  email:    emailField,
  position: z.string().min(1, 'Position is required'),
})

export const adminCreateSimpleSchema = z.object({
  email: emailField,
})

export const adminUpdateNomineeSchema = z.object({
  nomineeId:   uuidField,
  firstName:   z.string().min(1).optional(),
  lastName:    z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional(),
  address:     z.string().min(1).optional(),
  placeOfWork: z.string().min(1).optional(),
  occupation:  z.string().min(1).optional(),
  email:       emailField.optional(),
  description: z.string().min(1).optional(),
  status:      z.enum(['PENDING', 'APPROVED', 'DENIED']).optional(),
})

export const adminSendEmailSchema = z.object({
  name:  z.string().min(1, 'Nominee name is required'),
  email: emailField,
  type:  z.string()
    .transform(v => v.toUpperCase())
    .pipe(z.enum(['ACCEPTED', 'REJECTED'])),
})

// Email templates
export const emailTemplateUpdateSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  html:    z.string().min(1, 'HTML body is required'),
})

// Search
export const searchQuerySchema = z.object({
  searchTerm: z.string().optional(),
})

// About me
export const aboutMeSchema = z.object({
  aboutMe: z.string().max(300).default(''),
})

// Contact
export const contactSchema = z.object({
  name:    z.string().min(1, 'Name is required'),
  email:   emailField,
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

// Magic link
export const magicLinkSchema = z.object({
  email: emailField,
})

export const magicLinkVerifyQuerySchema = z.object({
  token:       z.string().min(1),
  callbackURL: z.string().optional(),
})

// ── Inferred types (for use in handlers / client code) ──────────────────────

export type NomineeCreateInput       = z.infer<typeof nomineeCreateSchema>
export type NomineeUpdateInput       = z.infer<typeof nomineeUpdateSchema>
export type NomineeDeleteQuery       = z.infer<typeof nomineeDeleteQuerySchema>
export type NominatorCreateInput     = z.infer<typeof nominatorCreateSchema>
export type AdminCreateInput         = z.infer<typeof adminCreateSchema>
export type AdminUpdateNomineeInput  = z.infer<typeof adminUpdateNomineeSchema>
export type AdminSendEmailInput      = z.infer<typeof adminSendEmailSchema>
export type EmailTemplateUpdateInput = z.infer<typeof emailTemplateUpdateSchema>
export type ContactInput             = z.infer<typeof contactSchema>
export type SearchQueryInput         = z.infer<typeof searchQuerySchema>
export type AboutMeInput             = z.infer<typeof aboutMeSchema>
export type EmailField               = z.infer<typeof emailField>

export type NomineesWithUser = Prisma.NomineeGetPayload<{include: {user: {select: {firstName: true, lastName: true, email: true}}}}>;