"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type NoteActionState = {
  error?: string;
  success?: boolean;
};

function getNoteFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  return { title, content };
}

export async function createNote(
  _prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const { title, content } = getNoteFields(formData);

  if (!title) {
    return { error: "El título es obligatorio." };
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

  if (!title) {
    return { error: "El título es obligatorio." };
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
