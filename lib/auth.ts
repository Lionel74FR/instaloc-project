// lib/auth.ts — Lucia configuration (replaces NextAuth)
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

// NOTE: we use a dedicated Prisma model "UserSession" (see prisma/schema.prisma)
export const lucia = new Lucia(
  new PrismaAdapter(db.userSession, db.user),
  {
    sessionCookie: {
      name: "session",
      attributes: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      },
    },
    getUserAttributes: (user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
  }
);

export async function getCurrentUser() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  if (!session) return null;
  return user;
}

export async function validateRequest() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return { user: null, session: null };
  }
  const { user, session } = await lucia.validateSession(sessionId);
  return { user, session };
}