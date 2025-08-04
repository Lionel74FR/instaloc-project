"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),    });
    if (res.ok) {
      await signIn("credentials", { email, password, redirectTo: "/dashboard" });
    } else {
      const data = await res.json();
      alert(data?.error || "Erreur d'inscription");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Créer un compte</h1>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" type="password" required />
      <button type="submit" className="btn btn-primary">S’inscrire</button>
    </form>
  );
}