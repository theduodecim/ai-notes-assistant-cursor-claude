"use client";

import { useCallback, useEffect, useState } from "react";
import { deleteNote } from "@/app/dashboard/actions";
import { NoteEditForm } from "@/components/notes/note-edit-form";
import type { Note } from "@/types/note";

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
  const updatedAtLabel = useFormattedDate(note.updated_at);

  const handleSaved = useCallback(() => {
    setEditing(false);
  }, []);

  if (editing) {
    return (
      <NoteEditForm
        note={note}
        onCancel={() => setEditing(false)}
        onSaved={handleSaved}
      />
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
