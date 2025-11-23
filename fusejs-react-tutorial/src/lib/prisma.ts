import { PrismaClient } from "generated/prisma";

export let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    type GlobalWithPrisma = typeof globalThis & { prisma?: PrismaClient };
    const globalWithPrisma = globalThis as GlobalWithPrisma;
    globalWithPrisma.prisma ??= new PrismaClient();
    prisma = globalWithPrisma.prisma;
}
