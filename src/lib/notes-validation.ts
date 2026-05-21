export const TITLE_MIN = 3;
export const TITLE_MAX = 100;
export const CONTENT_MIN = 10;
export const CONTENT_MAX = 2000;
/** Límite del atributo HTML; la validación real usa CONTENT_MAX. */
export const CONTENT_INPUT_MAX = CONTENT_MAX + 1;

/** Normaliza saltos de línea como los envía el servidor (solo \n). */
export function normalizeNoteContent(content: string): string {
  return content.replace(/\r\n/g, "\n");
}

export function getNoteContentLength(content: string): number {
  return normalizeNoteContent(content).length;
}

export type NoteFieldErrors = {
  title?: string;
  content?: string;
};

export function validateNoteTitle(title: string): string | undefined {
  if (title.length > TITLE_MAX) {
    return "El título no puede superar los 100 caracteres.";
  }

  const value = title.trim();

  if (!value) {
    return "El título es obligatorio.";
  }
  if (value.length < TITLE_MIN) {
    return "El título debe tener al menos 3 caracteres.";
  }

  return undefined;
}

export function validateNoteContent(content: string): string | undefined {
  const normalized = normalizeNoteContent(content);

  if (normalized.length > CONTENT_MAX) {
    return "El contenido no puede superar los 2000 caracteres.";
  }

  const value = normalized.trim();

  if (!value) {
    return "El contenido es obligatorio.";
  }
  if (value.length < CONTENT_MIN) {
    return "El contenido debe tener al menos 10 caracteres.";
  }

  return undefined;
}

export function validateNoteFields(
  title: string,
  content: string,
): NoteFieldErrors {
  const errors: NoteFieldErrors = {};
  const titleError = validateNoteTitle(title);
  const contentError = validateNoteContent(content);

  if (titleError) errors.title = titleError;
  if (contentError) errors.content = contentError;

  return errors;
}

export function hasNoteFieldErrors(errors: NoteFieldErrors) {
  return Boolean(errors.title || errors.content);
}
