import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@myattendo.local' },
    update: {},
    create: {
      fullName: 'System Administrator',
      email: 'admin@myattendo.local',
      passwordHash: '$2a$10$G1Nh1ahw6U7N0x6YIwlm8.0lVrXxx6J0pN3G1wYiez5s8D7aV5hS2',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@myattendo.local' },
    update: {},
    create: {
      fullName: 'Student Demo',
      email: 'student@myattendo.local',
      passwordHash: '$2a$10$eVd8NlcVfG1jaTS8lXJqqOjL2o2n.ZS/2h1LwJZ0tGHYxV1c3i.Wi',
      role: 'STUDENT',
      status: 'ACTIVE',
    },
  });

  console.log({ admin: admin.email, student: student.email });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
