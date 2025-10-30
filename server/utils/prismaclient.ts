import { PrismaClient } from '@prisma/client'

// This allows reusing the Prisma instance during hot-reloads in dev
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'],
  })

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const Status = {
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  VERIFIED: "VERIFIED",
  APPROVED: "APPROVED",
  DENIED: "DENIED",
  SENT: "SENT"
} as const;

export type Status = typeof Status[keyof typeof Status];

export const EmailTemplateType = {
  SIGNUP: "SIGNUP",
  NOMINATION: "NOMINATION",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED"
} as const;

export type EmailTemplateType =
  typeof EmailTemplateType[keyof typeof EmailTemplateType];

  