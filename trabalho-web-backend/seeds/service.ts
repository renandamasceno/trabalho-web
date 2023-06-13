import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

// Default services
const defaultServices = [
  {
    name: 'Spotify',
    image_url: ' https://gcdnb.pbrd.co/images/gbBRcLYKy6FW.png?o=1',
    price: 5.99,
  },
  {
    name: 'Netflix',
    image_url: 'https://gcdnb.pbrd.co/images/PdMb4LBTmPVT.png?o=1',
    price: 37.99,
  },
  {
    name: 'Microsoft OneDrive',
    image_url: 'https://gcdnb.pbrd.co/images/TI579p6p25TE.png?o=1',
    price: 29.99,
  },
  {
    name: 'YouTube Premium',
    image_url: 'https://gcdnb.pbrd.co/images/27V1KisQEfpK.png?o=1',
    price: 18.99,
  },
];

// Function to seed database
async function main() {
  for (const { name, image_url, price } of defaultServices) {
    await prisma.service.create({
      data: {
        name,
        image_url,
        price,
      },
    });
  }
}

// Execute seed function
main();
