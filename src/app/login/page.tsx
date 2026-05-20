import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

type LoginPageProps = {
  searchParams: Promise<{
    redirect?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

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

      <AuthForm redirectTo={params.redirect} />

      {params.error === "auth_confirm_failed" ? (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
          No se pudo confirmar el enlace. Probá iniciar sesión de nuevo.
        </p>
      ) : null}
    </div>
  );
}
