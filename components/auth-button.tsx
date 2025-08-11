// components/auth-button.tsx
// Server component version for Lucia
import Link from "next/link";
import { validateRequest } from "@/lib/auth"; // must expose validateRequest() from your Lucia setup

export async function AuthButton() {
  // With Lucia, we read the session server-side
  const { user } = await validateRequest();

  // Not authenticated → show a single login button
  if (!user) {
    return (
      <Link href="/login" className="btn btn-sm btn-primary">
        Se connecter
      </Link>
    );
  }

  // Authenticated → show a sign-out button that posts to the logout route
  return (
    <form action="/api/auth/logout" method="post">
      <button type="submit" className="btn btn-sm btn-outline" title="Se déconnecter">
        ⎋
      </button>
    </form>
  );
}