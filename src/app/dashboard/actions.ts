"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  hasNoteFieldErrors,
  normalizeNoteContent,
  validateNoteFields,
} from "@/lib/notes-validation";

export type NoteActionState = {
  error?: string;
  success?: boolean;
};

function getNoteFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = normalizeNoteContent(
    String(formData.get("content") ?? ""),
  ).trim();
  return { title, content };
}

function getServerValidationError(title: string, content: string) {
  const errors = validateNoteFields(title, content);
  if (!hasNoteFieldErrors(errors)) {
    return null;
  }
  return errors.title ?? errors.content ?? "Revisá los campos del formulario.";
}

export async function createNote(
  _prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const { title, content } = getNoteFields(formData);

  const validationError = getServerValidationError(title, content);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debés iniciar sesión." };
  }

  const { error } = await supabase.from("notes").insert({
    user_id: user.id,
    title,
    content,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateNote(
  _prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const id = String(formData.get("id") ?? "");
  const { title, content } = getNoteFields(formData);

  if (!id) {
    return { error: "Nota no encontrada." };
  }

  const validationError = getServerValidationError(title, content);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteNote(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const supabase = await createClient();
  await supabase.from("notes").delete().eq("id", id);
  revalidatePath("/dashboard");
}
