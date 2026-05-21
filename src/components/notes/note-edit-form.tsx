"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import {
  updateNote,
  type NoteActionState,
} from "@/app/dashboard/actions";
import { NoteFormFields } from "@/components/notes/note-form-fields";
import {
  hasNoteFieldErrors,
  normalizeNoteContent,
  validateNoteContent,
  validateNoteFields,
  validateNoteTitle,
  type NoteFieldErrors,
} from "@/lib/notes-validation";
import type { Note } from "@/types/note";

const initialState: NoteActionState = {};

type TouchedFields = {
  title: boolean;
  content: boolean;
};

type NoteEditFormProps = {
  note: Note;
  onCancel: () => void;
  onSaved: () => void;
};

export function NoteEditForm({ note, onCancel, onSaved }: NoteEditFormProps) {
  const [state, formAction, pending] = useActionState(updateNote, initialState);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [fieldErrors, setFieldErrors] = useState<NoteFieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    title: false,
    content: false,
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const showTitleError = touched.title || attemptedSubmit;
  const showContentError = touched.content || attemptedSubmit;
  const hasValidationErrors = hasNoteFieldErrors(
    validateNoteFields(title, content),
  );

  useEffect(() => {
    if (state.success) {
      onSaved();
    }
  }, [state.success, onSaved]);

  function handleTitleBlur() {
    setTouched((prev) => ({ ...prev, title: true }));
    setFieldErrors((prev) => ({
      ...prev,
      title: validateNoteTitle(title),
    }));
  }

  function handleContentBlur() {
    setTouched((prev) => ({ ...prev, content: true }));
    setFieldErrors((prev) => ({
      ...prev,
      content: validateNoteContent(content),
    }));
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (showTitleError) {
      setFieldErrors((prev) => ({
        ...prev,
        title: validateNoteTitle(value),
      }));
    } else {
      setFieldErrors((prev) => {
        if (!prev.title) return prev;
        const next = { ...prev };
        delete next.title;
        return next;
      });
    }
  }

  function handleContentChange(value: string) {
    setContent(value);
    if (showContentError) {
      setFieldErrors((prev) => ({
        ...prev,
        content: validateNoteContent(value),
      }));
    } else {
      setFieldErrors((prev) => {
        if (!prev.content) return prev;
        const next = { ...prev };
        delete next.content;
        return next;
      });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);
    setTouched({ title: true, content: true });

    const errors = validateNoteFields(title, content);
    setFieldErrors(errors);

    if (hasNoteFieldErrors(errors)) {
      return;
    }

    const formData = new FormData();
    formData.set("id", note.id);
    formData.set("title", title.trim());
    formData.set("content", normalizeNoteContent(content).trim());

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <article className="rounded-xl border border-zinc-300 bg-white p-5 shadow-sm ring-2 ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 dark:ring-zinc-700">
      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <NoteFormFields
          idPrefix={`edit-${note.id}`}
          title={title}
          content={content}
          fieldErrors={fieldErrors}
          showTitleError={showTitleError}
          showContentError={showContentError}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onTitleBlur={handleTitleBlur}
          onContentBlur={handleContentBlur}
        />

        {state.error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {state.error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending || hasValidationErrors}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {pending ? "Guardando…" : "Guardar"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
        </div>
      </form>
    </article>
  );
}
