"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CreatePage() {
  async function create(formData: FormData) {
    "use server";
    await prisma.listing.create({
  data: {
    title: formData.get("title") as string,
    description: formData.get("desc") as string,
    price: Number(formData.get("price")),
    surface: Number(formData.get("surface")),
    rooms: Number(formData.get("rooms")),
    address: formData.get("address") as string,
    images: [], 
    userId: "un-id-temporaire-en-attente-de-nextauth", // 🔥 TEMPORAIRE
  },
});
    revalidatePath("/");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Créer une annonce</h1>
      <form action={create} className="flex flex-col gap-4 max-w-sm">
        <input name="title" placeholder="Titre" required />
        <textarea name="desc" placeholder="Description" required />
        <input name="price" type="number" placeholder="Prix / mois" required />
        <input name="surface" type="number" placeholder="Surface m²" required />
        <input name="rooms" type="number" placeholder="Pièces" required />
        <input name="address" placeholder="Adresse" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Publier
        </button>
      </form>
    </main>
  );
}