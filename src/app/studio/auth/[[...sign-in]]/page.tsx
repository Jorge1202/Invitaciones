"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudioSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña incorrectos");
      } else {
        router.push("/studio");
      }
    } catch {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-studio-surface border border-studio-border rounded-2xl p-8 shadow-sm">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-fraunces font-bold text-studio-text mb-2">
            InvitaWeb Studio
          </h1>
          <p className="text-studio-text-dim">Crea experiencias, no solo invitaciones.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-studio-text-dim">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all placeholder:text-studio-text-dim/50"
              placeholder="hola@tuempresa.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-studio-text-dim">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-studio-bg border border-studio-border rounded-xl px-4 py-3 text-studio-text focus:ring-2 focus:ring-studio-accent focus:border-transparent outline-none transition-all placeholder:text-studio-text-dim/50"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-studio-accent hover:bg-studio-accent-hi text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-studio-accent/20 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Iniciar Sesión"}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-sm text-studio-text-dim">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-studio-accent font-semibold hover:underline">
              Contáctanos para ser revendedor
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
