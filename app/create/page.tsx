"use client";

import { useState } from "react";
import { createListing } from "./actions";
import { Uploader } from "@/components/uploader";

export default function CreatePage() {
  const [images, setImages] = useState<string[]>([]);

  async function handleSubmit(formData: FormData) {
    formData.set("images", JSON.stringify(images));
    await createListing(formData);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Créer une annonce</h1>
      <form action={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input name="title" placeholder="Titre" required />
        <textarea name="desc" placeholder="Description" required />
        <input name="price" type="number" placeholder="Prix / mois" required />
        <input name="surface" type="number" placeholder="Surface m²" required />
        <input name="rooms" type="number" placeholder="Pièces" required />
        <input name="address" placeholder="Adresse" required />
        <Uploader value={images} onChange={setImages} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Publier
        </button>
      </form>
    </main>
  );
}