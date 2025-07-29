// components/auth-button.tsx
"use client";

import { signIn, signOut } from "next-auth/react";
import { auth } from "@/lib/auth";

export function AuthButton() {
  return (
    <>
      <button
  onClick={() => signIn("credentials", { email: "test@demo.fr", password: "123456" })}
  className="btn btn-sm btn-secondary"
>
  Demo User
</button>
      <button
        onClick={() => signIn("google")}
        className="btn btn-sm btn-primary"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signOut()}
        className="btn btn-sm btn-outline"
      >
        Sign out
      </button>
    </>
  );
}