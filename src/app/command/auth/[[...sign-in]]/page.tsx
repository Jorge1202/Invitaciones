"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommandSignInPage() {
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
        setError("Credenciales inválidas");
      } else {
        router.push("/command");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-command-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-command-surface border border-command-border rounded-xl p-8 shadow-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-fraunces font-bold text-command-text mb-2">
            InvitaWeb Command
          </h1>
          <p className="text-command-text-dim">Acceso Restringido a Infraestructura</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-command-text-dim">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2.5 text-command-text focus:ring-2 focus:ring-command-accent focus:border-transparent outline-none transition-all"
              placeholder="admin@invitaweb.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-command-text-dim">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-command-bg border border-command-border rounded-lg px-4 py-2.5 text-command-text focus:ring-2 focus:ring-command-accent focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-command-accent hover:bg-command-accent-hi text-white font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión..." : "Entrar al Centro de Mando"}
          </button>
        </form>

        <footer className="mt-8 text-center text-xs text-command-text-dim">
          &copy; 2026 InvitaWeb Systems. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
