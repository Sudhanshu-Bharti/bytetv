import {PrismaClient} from  '@prisma/client'

declare global {
    var prisma: PrismaClient| undefined
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

// to prevent it from creating multiple instances 
//of prismaclient due to nextjs hot reload