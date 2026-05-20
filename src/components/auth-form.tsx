"use client";

import { useActionState, useState } from "react";
import {
  login,
  signUp,
  type AuthActionState,
} from "@/app/auth/actions";

const initialState: AuthActionState = {};

type AuthFormProps = {
  redirectTo?: string;
};

export function AuthForm({ redirectTo }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const action = mode === "login" ? login : signUp;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {mode === "login"
            ? "Accedé a tu dashboard de notas"
            : "Registrate con email y contraseña"}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {redirectTo ? (
          <input type="hidden" name="redirect" value={redirectTo} />
        ) : null}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            placeholder="tu@email.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            required
            minLength={6}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            placeholder="••••••••"
          />
        </div>

        {state.error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {state.error}
          </p>
        ) : null}

        {state.message ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {pending
            ? "Procesando…"
            : mode === "login"
              ? "Entrar"
              : "Registrarse"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {mode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
        <button
          type="button"
          onClick={() =>
            setMode((current) => (current === "login" ? "signup" : "login"))
          }
          className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
        >
          {mode === "login" ? "Registrate" : "Iniciá sesión"}
        </button>
      </p>
    </div>
  );
}
