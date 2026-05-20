import Link from "next/link";
import { redirect } from "next/navigation";
import { CreateNoteForm } from "@/components/notes/create-note-form";
import { NotesList } from "@/components/notes/notes-list";
import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import type { Note } from "@/types/note";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, user_id, title, content, created_at, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error loading notes:", error.message);
  }

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              AI Notes Assistant
            </Link>
            <h1 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Mis notas
            </h1>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {error ? (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            No se pudieron cargar las notas. Ejecutá la migración SQL en
            Supabase (
            <code className="text-xs">supabase/migrations/001_notes.sql</code>
            ).
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-8">
            <CreateNoteForm />
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Tus notas
              </h2>
              <span className="rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {(notes ?? []).length}
              </span>
            </div>
            <NotesList notes={(notes ?? []) as Note[]} />
          </section>
        </div>
      </main>
    </div>
  );
}
