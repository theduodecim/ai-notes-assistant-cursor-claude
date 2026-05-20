"use client";

import { useActionState, useEffect, useState } from "react";
import {
  deleteNote,
  updateNote,
  type NoteActionState,
} from "@/app/dashboard/actions";
import type { Note } from "@/types/note";

const initialState: NoteActionState = {};

function useFormattedDate(iso: string) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(
      new Intl.DateTimeFormat("es", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso)),
    );
  }, [iso]);

  return label;
}

type NoteCardProps = {
  note: Note;
};

export function NoteCard({ note }: NoteCardProps) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(updateNote, initialState);
  const updatedAtLabel = useFormattedDate(note.updated_at);

  useEffect(() => {
    if (state.success) {
      setEditing(false);
    }
  }, [state.success]);

  if (editing) {
    return (
      <article className="rounded-xl border border-zinc-300 bg-white p-5 shadow-sm ring-2 ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 dark:ring-zinc-700">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={note.id} />

          <div className="space-y-2">
            <label
              htmlFor={`title-${note.id}`}
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Título
            </label>
            <input
              id={`title-${note.id}`}
              name="title"
              type="text"
              required
              defaultValue={note.title}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`content-${note.id}`}
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Contenido
            </label>
            <textarea
              id={`content-${note.id}`}
              name="content"
              rows={6}
              defaultValue={note.content}
              className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </div>

          {state.error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {state.error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {pending ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {note.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Actualizada {updatedAtLabel ?? "…"}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Editar
          </button>
          <form action={deleteNote}>
            <input type="hidden" name="id" value={note.id} />
            <button
              type="submit"
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>

      {note.content ? (
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {note.content}
        </p>
      ) : (
        <p className="mt-4 text-sm italic text-zinc-400 dark:text-zinc-500">
          Sin contenido
        </p>
      )}
    </article>
  );
}
