"use client";

import { startTransition, useActionState, useState } from "react";
import {
  authenticate,
  forgotPassword,
  type AuthActionState,
} from "@/app/auth/actions";

const initialState: AuthActionState = {};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  email?: string;
  password?: string;
};

function validateFields(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "El email es obligatorio.";
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Ingresá un email válido.";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  return errors;
}

function hasFieldErrors(errors: FieldErrors) {
  return Boolean(errors.email || errors.password);
}

type AuthFormProps = {
  redirectTo?: string;
};

const inputBaseClass =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:bg-zinc-950 dark:text-zinc-50";
const inputValidClass = "border-zinc-300 dark:border-zinc-700";
const inputInvalidClass =
  "border-red-500 ring-red-400/50 dark:border-red-500";

export function AuthForm({ redirectTo }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [state, formAction, pending] = useActionState(authenticate, initialState);
  const [forgotState, forgotAction, forgotPending] = useActionState(
    forgotPassword,
    initialState,
  );

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleModeSwitch() {
    setMode((current) => (current === "login" ? "signup" : "login"));
    setShowForgot(false);
    setFieldErrors({});
    setEmail("");
    setPassword("");
    setForgotEmail("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validateFields(email, password);
    setFieldErrors(errors);

    if (hasFieldErrors(errors)) {
      return;
    }

    const formData = new FormData();
    formData.set("mode", mode);
    formData.set("email", email.trim());
    formData.set("password", password);
    if (redirectTo) {
      formData.set("redirect", redirectTo);
    }

    startTransition(() => {
      formAction(formData);
    });
  }

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

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
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
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearFieldError("email");
            }}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`${inputBaseClass} ${fieldErrors.email ? inputInvalidClass : inputValidClass}`}
            placeholder="tu@email.com"
          />
          {fieldErrors.email ? (
            <p
              id="email-error"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {fieldErrors.email}
            </p>
          ) : null}
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
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearFieldError("password");
            }}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
            className={`${inputBaseClass} ${fieldErrors.password ? inputInvalidClass : inputValidClass}`}
            placeholder="••••••••"
          />
          {fieldErrors.password ? (
            <p
              id="password-error"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {fieldErrors.password}
            </p>
          ) : null}
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
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {pending
            ? "Procesando…"
            : mode === "login"
              ? "Entrar"
              : "Registrarse"}
        </button>
      </form>

      {mode === "login" ? (
        <div className="space-y-3 text-center">
          <button
            type="button"
            onClick={() => setShowForgot((current) => !current)}
            className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
          >
            ¿Olvidaste tu contraseña?
          </button>

          {showForgot ? (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-700 dark:bg-zinc-950">
              <form action={forgotAction} className="space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Email
                  </label>
                  <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={forgotEmail}
                    onChange={(event) => setForgotEmail(event.target.value)}
                    className={`${inputBaseClass} ${inputValidClass}`}
                    placeholder="tu@email.com"
                  />
                </div>

                {forgotState.error ? (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
                    {forgotState.error}
                  </p>
                ) : null}

                {forgotState.message ? (
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {forgotState.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={forgotPending}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                >
                  {forgotPending ? "Enviando…" : "Enviar link"}
                </button>
              </form>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {mode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
        <button
          type="button"
          onClick={handleModeSwitch}
          className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
        >
          {mode === "login" ? "Registrate" : "Iniciá sesión"}
        </button>
      </p>
    </div>
  );
}
