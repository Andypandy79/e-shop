import { PrismaClient } from '@/lib/generated/prisma';
import sampleData from './sample-data';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

async function main() {
  const prisma = new PrismaClient({ adapter });
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  console.log('Database seeded successfully');
}

main();
