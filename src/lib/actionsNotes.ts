"use server";
import { sql, asc } from "drizzle-orm";
import { db } from "@/db/index";
import { c2Notes, type SelectC2Notes, type InsertC2Notes } from "@/db/schema";

export async function fetchNotes(): Promise<SelectC2Notes[]> {
  try {
    const notes = await db
      .select()
      .from(c2Notes)
      .orderBy(asc(c2Notes.createdAt));
    return notes;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes");
  }
}

export async function addNote(data: {
  title: string;
  text: string;
}): Promise<InsertC2Notes> {
  try {
    const [newNote] = await db
      .insert(c2Notes)
      .values({
        title: data.title,
        text: data.text,
      })
      .returning();

    return newNote;
  } catch (error) {
    console.error("Failed to add note:", error);
    throw new Error("Failed to add note");
  }
}

export async function editNote(
  id: number,
  data: {
    title: string;
    text: string;
  }
): Promise<SelectC2Notes> {
  try {
    const [updatedNote] = await db
      .update(c2Notes)
      .set({
        title: data.title,
        text: data.text,
        // updatedAt will be automatically set by the $onUpdate hook in the schema
      })
      .where(sql`id = ${id}`)
      .returning();

    return updatedNote;
  } catch (error) {
    console.error("Failed to edit note:", error);
    throw new Error("Failed to edit note");
  }
}

export async function deleteNote(id: number): Promise<void> {
  try {
    await db.delete(c2Notes).where(sql`id = ${id}`);
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw new Error("Failed to delete note");
  }
}
