import { PrismaClient } from '@prisma/client';
import { profileData } from './profile.data';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {  
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(18376291)`;

    const existing = await tx.profile.findFirst({ select: { id: true } });

    if (!existing) await tx.profile.create({ data: profileData });
  });

  console.log('Database seed ready (existing profile preserved).');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
