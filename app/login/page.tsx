'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/check-user', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.exists) {
        setUserExists(true);
        setStep('password');
      } else {
        router.push('/register');
      }
    } else {
      setError("Erreur lors de la vérification de l'email.");
    }
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-semibold mb-6">Connexion</h1>

      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Continuer
          </button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Se connecter
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}