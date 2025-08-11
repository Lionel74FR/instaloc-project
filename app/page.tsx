// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";

export const dynamic = "force-dynamic";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    (cents || 0) / 100
  );
}

export default async function Home() {
  const listings = await db.listing
    .findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
    })
    .catch(() => [] as any[]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Instaloc
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/search" className="hover:text-gray-900">Rechercher</Link>
            <Link href="/create" className="hover:text-gray-900">Publier un bien</Link>
            <Link href="/help" className="hover:text-gray-900">Aide</Link>
          </nav>
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Logements disponibles
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Découvrez des appartements meublés prêts à vivre en bail mobilité. Réservation
            simple, contrats sécurisés.
          </p>
        </div>
      </section>

      {/* Listings grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {listings.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l) => (
              <li key={l.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border transition hover:shadow-md">
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={`https://picsum.photos/seed/${encodeURIComponent(l.id)}/800/600`}
                    alt={l.title || "Logement"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold line-clamp-1">{l.title}</h3>
                    <span className="shrink-0 rounded-full bg-emerald-50 text-emerald-700 text-sm px-3 py-1">
                      {formatPrice(l.price)} / mois
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{l.description}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                    <span className="rounded bg-gray-100 px-2 py-1">Meublé</span>
                    <span className="rounded bg-gray-100 px-2 py-1">Bail mobilité</span>
                    <span className="rounded bg-gray-100 px-2 py-1">Wi‑Fi</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/listing/${l.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Voir le détail →
                    </Link>
                    <button className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50">
                      Demander
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl text-center py-24">
      <h2 className="text-xl font-semibold">Aucun logement pour le moment</h2>
      <p className="mt-2 text-gray-600">
        Revenez plus tard ou <Link href="/create" className="text-indigo-600 hover:underline">publiez votre premier bien</Link>.
      </p>
    </div>
  );
}