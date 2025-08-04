// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = await auth();
  const authRequired = process.env.AUTH_REQUIRED === "true";

  if (authRequired && !token && req.nextUrl.pathname.startsWith("/create")) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/create", "/profile/:path*"],
};