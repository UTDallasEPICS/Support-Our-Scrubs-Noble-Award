import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const Status = {
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  VERIFIED: "VERIFIED",
  APPROVED: "APPROVED",
  DENIED: "DENIED",
  SENT: "SENT"
} as const

export type Status = typeof Status[keyof typeof Status]

export const EmailTemplateType = {
  SIGNUP: "SIGNUP",
  NOMINATION: "NOMINATION",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED"
} as const

export type EmailTemplateType =
  typeof EmailTemplateType[keyof typeof EmailTemplateType]
