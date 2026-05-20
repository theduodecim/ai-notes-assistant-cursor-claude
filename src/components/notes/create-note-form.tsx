"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createNote,
  type NoteActionState,
} from "@/app/dashboard/actions";

const initialState: NoteActionState = {};

export function CreateNoteForm() {
  const [state, formAction, pending] = useActionState(createNote, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Nueva nota
      </h2>

      <form ref={formRef} action={formAction} className="mt-4 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="create-title"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Título
          </label>
          <input
            id="create-title"
            name="title"
            type="text"
            required
            placeholder="Ej: Ideas para el proyecto"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="create-content"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Contenido
          </label>
          <textarea
            id="create-content"
            name="content"
            rows={5}
            placeholder="Escribí tu nota aquí…"
            className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </div>

        {state.error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {state.error}
          </p>
        ) : null}

        {state.success ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            Nota creada.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {pending ? "Guardando…" : "Crear nota"}
        </button>
      </form>
    </section>
  );
}
