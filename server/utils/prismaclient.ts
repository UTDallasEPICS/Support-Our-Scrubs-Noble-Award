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
