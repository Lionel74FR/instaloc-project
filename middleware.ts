// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const authRequired = process.env.AUTH_REQUIRED === "true";

  // Read session cookie issued by Lucia
  const sessionId = req.cookies.get(lucia.sessionCookieName)?.value;
  const validation = sessionId ? await lucia.validateSession(sessionId) : null;
  const isAuthed = !!validation?.user;

  // Protected paths
  const protectedPaths = ["/create", "/profile", "/dashboard"]; // add here as needed
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (authRequired && !isAuthed && isProtected) {
    // Redirect to login with callback URL
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", url.pathname + url.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create", "/profile/:path*", "/dashboard/:path*"],
};