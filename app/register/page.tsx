"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      await signIn("credentials", { email, password, redirectTo: "/" });
    } else {
      alert("Erreur inscription");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Créer un compte</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" type="password" required />
      <button type="submit" className="btn btn-primary">S’inscrire</button>
    </form>
  );
}