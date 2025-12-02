<<<<<<< HEAD
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
=======
import { PrismaClient } from "@prisma/client"

class prismacl {
  public prismacl: PrismaClient
  private static instance: prismacl
  private constructor() {
    this.prismacl = new PrismaClient()
  }

  public static getInstance = () => {
    if (!prismacl.instance) {
      prismacl.instance = new prismacl()
    }
    return prismacl.instance
  }
}

export const prisma = prismacl.getInstance().prismacl;

>>>>>>> origin/mobileFriendly

export const Status = {
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  VERIFIED: "VERIFIED",
  APPROVED: "APPROVED",
  DENIED: "DENIED",
  SENT: "SENT"
<<<<<<< HEAD
} as const

export type Status = typeof Status[keyof typeof Status]
=======
} as const;

export type Status = typeof Status[keyof typeof Status];
>>>>>>> origin/mobileFriendly

export const EmailTemplateType = {
  SIGNUP: "SIGNUP",
  NOMINATION: "NOMINATION",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED"
<<<<<<< HEAD
} as const

export type EmailTemplateType =
  typeof EmailTemplateType[keyof typeof EmailTemplateType]
=======
} as const;

export type EmailTemplateType =
  typeof EmailTemplateType[keyof typeof EmailTemplateType];
>>>>>>> origin/mobileFriendly
