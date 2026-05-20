import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <main className="w-full max-w-lg space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            SaaS con IA
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            AI Notes Assistant
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Notas y tareas con resúmenes, mejoras de redacción y action items
            generados por IA.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Ir al dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 px-6 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>

        {user ? (
          <p className="text-sm text-zinc-500">
            Conectado como{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {user.email}
            </span>
          </p>
        ) : null}
      </main>
    </div>
  );
}
