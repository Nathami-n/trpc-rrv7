import { PrismaClient } from "@prisma/client";


const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const GlobalPrismaVariable = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const db = GlobalPrismaVariable.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') GlobalPrismaVariable.prisma = db