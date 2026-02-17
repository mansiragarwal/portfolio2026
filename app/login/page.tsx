"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get("redirect") ?? "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid password");
        setLoading(false);
        return;
      }
      // Full page redirect so the cookie is sent on the next request, and we
      // replace the login page in history so Back goes to the previous page (e.g. home)
      window.location.replace(redirect);
      return;
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F4] px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-2xl font-medium text-[#1A1A1A]">
          Enter password
        </h1>
        <p className="mb-6 text-[15px] text-[#6B6360]">
          This portfolio is password protected.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-[#EAE4DE] bg-white px-4 py-3 text-[15px] text-[#1A1A1A] placeholder-[#A09893] focus:border-[#C74B6F] focus:outline-none focus:ring-1 focus:ring-[#C74B6F]"
            autoFocus
            required
          />
          {error && (
            <p className="text-[14px] text-[#C74B6F]">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#C74B6F] px-4 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#B3405F] disabled:opacity-50"
          >
            {loading ? "Checking…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FAF7F4] px-6">
          <div className="w-full max-w-sm">
            <div className="mb-2 h-8 w-48 animate-pulse rounded bg-[#EAE4DE]" />
            <div className="mb-6 h-4 w-full animate-pulse rounded bg-[#EAE4DE]" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-[#EAE4DE]" />
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
