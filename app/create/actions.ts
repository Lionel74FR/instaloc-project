"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createListing(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non autorisé");

  const images = JSON.parse(formData.get("images") as string) as string[];

  await db.listing.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("desc") as string,
      price: Number(formData.get("price")),
      surface: Number(formData.get("surface")),
      rooms: Number(formData.get("rooms")),
      address: formData.get("address") as string,
      images: images, // Stocke les URLs des images
      userId: session.user.id,
    },
  });

  revalidatePath("/");
}