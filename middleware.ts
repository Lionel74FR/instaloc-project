// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. On récupère le cookie de session NextAuth
  const token = request.cookies.get("next-auth.session-token");

  // 2. Si pas de token → on redirige vers l’accueil
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Sinon on laisse passer
  return NextResponse.next();
}

// 4. On définit quelles routes protéger
export const config = {
  matcher: ["/create", "/profile/:path*"],
};