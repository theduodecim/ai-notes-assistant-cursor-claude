"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ConfirmStatus = "loading" | "error";

export default function ConfirmPage() {
  const router = useRouter();
  const [status, setStatus] = useState<ConfirmStatus>("loading");

  useEffect(() => {
    async function processHash() {
      const hash = window.location.hash.substring(1);

      if (!hash) {
        setStatus("error");
        return;
      }

      const params = new URLSearchParams(hash);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      const type = params.get("type");

      if (!access_token || !refresh_token) {
        setStatus("error");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setStatus("error");
        return;
      }

      if (type === "recovery") {
        router.push("/auth/reset-password");
      } else {
        router.push("/dashboard");
      }
    }

    processHash();
  }, [router]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← AI Notes Assistant
        </Link>
      </div>

      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {status === "loading" ? (
          <>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Verificando…
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Estamos procesando tu enlace de acceso.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Enlace inválido
            </p>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              El enlace expiró. Pedí uno nuevo.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
            >
              Volver al inicio de sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
