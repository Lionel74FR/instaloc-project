// app/page.tsx
import { db } from "@/lib/db";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
export const dynamic = "force-dynamic";

export default async function Home() {
const listings = await db.listing.findMany().catch(() => []);

  return (
    <main className="p-8">
      <header className="flex items-center justify-between p-4">
        <h1>Instaloc</h1>
        <Suspense>
          <AuthButton />
        </Suspense>
      </header>

      <h1 className="text-3xl font-bold mb-6">Logements disponibles</h1>
      <div className="grid gap-4">
        {listings.map((l) => (
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