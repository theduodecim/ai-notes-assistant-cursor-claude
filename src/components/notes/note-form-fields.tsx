"use client";

import {
  CONTENT_INPUT_MAX,
  CONTENT_MAX,
  getNoteContentLength,
  normalizeNoteContent,
  TITLE_MAX,
  type NoteFieldErrors,
} from "@/lib/notes-validation";

const inputBaseClass =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:bg-zinc-950 dark:text-zinc-50";
const inputValidClass = "border-zinc-300 dark:border-zinc-700";
const inputInvalidClass =
  "border-red-500 ring-red-400/50 dark:border-red-500";

type NoteFormFieldsProps = {
  idPrefix: string;
  title: string;
  content: string;
  fieldErrors: NoteFieldErrors;
  showTitleError: boolean;
  showContentError: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onTitleBlur: () => void;
  onContentBlur: () => void;
};

export function NoteFormFields({
  idPrefix,
  title,
  content,
  fieldErrors,
  showTitleError,
  showContentError,
  onTitleChange,
  onContentChange,
  onTitleBlur,
  onContentBlur,
}: NoteFormFieldsProps) {
  const titleId = `${idPrefix}-title`;
  const contentId = `${idPrefix}-content`;
  const titleCharCount = title.length;
  const contentCharCount = getNoteContentLength(content);

  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor={titleId}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Título
        </label>
        <input
          id={titleId}
          name="title"
          type="text"
          maxLength={TITLE_MAX}
          value={title}
          onChange={(event) => {
            onTitleChange(event.target.value.slice(0, TITLE_MAX));
          }}
          onBlur={onTitleBlur}
          aria-invalid={showTitleError && Boolean(fieldErrors.title)}
          aria-describedby={
            showTitleError && fieldErrors.title ? `${titleId}-error` : undefined
          }
          placeholder="Ej: Ideas para el proyecto"
          className={`${inputBaseClass} ${showTitleError && fieldErrors.title ? inputInvalidClass : inputValidClass}`}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {titleCharCount}/{TITLE_MAX} caracteres
        </p>
        {showTitleError && fieldErrors.title ? (
          <p
            id={`${titleId}-error`}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={contentId}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Contenido
        </label>
        <textarea
          id={contentId}
          name="content"
          rows={5}
          maxLength={CONTENT_INPUT_MAX}
          value={content}
          onChange={(event) => {
            const normalized = normalizeNoteContent(event.target.value);
            onContentChange(normalized.slice(0, CONTENT_INPUT_MAX));
          }}
          onBlur={onContentBlur}
          aria-invalid={showContentError && Boolean(fieldErrors.content)}
          aria-describedby={
            showContentError && fieldErrors.content
              ? `${contentId}-error`
              : undefined
          }
          placeholder="Escribí tu nota aquí…"
          className={`${inputBaseClass} resize-y ${showContentError && fieldErrors.content ? inputInvalidClass : inputValidClass}`}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {contentCharCount}/{CONTENT_MAX} caracteres
        </p>
        {showContentError && fieldErrors.content ? (
          <p
            id={`${contentId}-error`}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {fieldErrors.content}
          </p>
        ) : null}
      </div>
    </>
  );
}
