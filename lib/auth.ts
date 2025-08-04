// lib/auth.ts
import { getServerSession } from "next-auth"; //chemin strict
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export const auth = async () => {
  return await getServerSession(authOptions);
};