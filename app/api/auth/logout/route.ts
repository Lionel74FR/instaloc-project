// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

async function handleLogout() {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;

    if (sessionId) {
      await lucia.invalidateSession(sessionId);
    }

    // Remplace le cookie de session par un cookie vide/expiré
    const blank = lucia.createBlankSessionCookie();
    cookies().set(blank.name, blank.value, blank.attributes);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Optionnel : logger l'erreur si besoin
    console.error("Logout error:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  return handleLogout();
}

export async function DELETE() {
  return handleLogout();
}

export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}