import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
}

export default async function Home() {
  const listings: Listing[] = await prisma.listing.findMany();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Logements disponibles</h1>
      <div className="grid gap-4">
        {listings.map((l: Listing) => (
          <div key={l.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{l.title}</h2>
            <p>{l.description}</p>
            <p className="text-green-700 font-bold">{l.price / 100} € / mois</p>
          </div>
        ))}
      </div>
    </main>
  );
}