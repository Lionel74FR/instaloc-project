import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Test@1234', 12);

  // 1. Créer un utilisateur
  const user = await prisma.user.upsert({
      where: { email: "test@example.com" },
        update: {},
      create: {
      firstName: 'Lionel',
      lastName: 'Test',
      email: 'test@example.com',
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
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914'],
      userId: user.id,
    },
  });

  await prisma.listing.createMany({
    data: [
      {
        title: 'Charmant T2 au bord du lac',
        description: 'Appartement meublé avec vue sur le lac, proche du centre.',
        price: 120000,
        surface: 45,
        rooms: 2,
        bedrooms: 1,
        bathrooms: 1,
        address: '15 avenue du Petit Port',
        zipCode: '74000',
        city: 'Annecy',
        country: 'France',
        type: 'T2',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
        userId: user.id,
      },
      {
        title: 'Grand duplex lumineux',
        description: 'Duplex meublé avec balcon et parking, quartier résidentiel.',
        price: 150000,
        surface: 80,
        rooms: 3,
        bedrooms: 2,
        bathrooms: 2,
        address: '8 chemin des Aravis',
        zipCode: '74000',
        city: 'Annecy',
        country: 'France',
        type: 'Duplex',
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'],
        userId: user.id,
      },
      {
        title: 'Studio cosy en vieille ville',
        description: 'Studio rénové au cœur du centre historique, idéal bail mobilité.',
        price: 85000,
        surface: 20,
        rooms: 1,
        bedrooms: 0,
        bathrooms: 1,
        address: '3 rue Sainte-Claire',
        zipCode: '74000',
        city: 'Annecy',
        country: 'France',
        type: 'Studio',
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'],
        userId: user.id,
      },
    ],
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