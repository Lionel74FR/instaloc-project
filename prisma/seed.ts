import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Test@1234', 12);

  // 1. Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      firstName: 'Lionel',
      lastName: 'Test',
      email: 'lionel@example.com',
      password: hashedPassword,
    },
  });

  // 2. Créer un listing
  await prisma.listing.create({
    data: {
      title: 'Studio au centre d’Annecy',
      description: 'Charmant studio meublé proche du lac',
      price: 90000,
      surface: 25,
      rooms: 1,
      bedrooms: 1,
      bathrooms: 1,
      address: '10 rue Vaugelas',
      zipCode: '74000',
      city: 'Annecy',
      country: 'France',
      type: 'Studio',
      images: ['https://via.placeholder.com/300'],
      userId: user.id,
    },
  });

  // 3. Créer un document
  await prisma.document.create({
    data: {
      type: 'CNI',
      fileUrl: 'https://via.placeholder.com/100',
      verified: true,
      userId: user.id,
    },
  });

  // 4. Créer un message
  await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId: user.id,
      content: 'Bienvenue sur Instaloc !',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });