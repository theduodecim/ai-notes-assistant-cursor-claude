import { NoteCard } from "@/components/notes/note-card";
import type { Note } from "@/types/note";

type NotesListProps = {
  notes: Note[];
};

export function NotesList({ notes }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Todavía no tenés notas
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Creá la primera con el formulario de la izquierda.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard note={note} />
        </li>
      ))}
    </ul>
  );
}
