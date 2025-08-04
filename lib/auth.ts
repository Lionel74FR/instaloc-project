// lib/auth.ts
import { getServerSession } from "next-auth"; // Mise à jour pour forcer Vercel à recompiler
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export const auth = async () => {
  return await getServerSession(authOptions);
};