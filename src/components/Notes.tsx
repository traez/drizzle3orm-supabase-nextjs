"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaRegTrashAlt, FaPenSquare, FaPlusCircle } from "react-icons/fa";
import { fetchNotes, addNote, editNote, deleteNote } from "@/lib/actionsNotes";
import { type SelectC2Notes } from "@/db/schema";

const Notes = () => {
  const [notes, setNotes] = useState<SelectC2Notes[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", text: "" });
  const [editingNote, setEditingNote] = useState<SelectC2Notes | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        toast.error("Failed to load notes");
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNote) {
        // Edit existing note
        await editNote(editingNote.id, {
          title: newNote.title,
          text: newNote.text,
        });
        toast.success("Note updated successfully");
      } else {
        // Add new note
        await addNote({
          title: newNote.title,
          text: newNote.text,
        });
        toast.success("Note added successfully");
      }

      // Refresh the notes list
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);

      // Reset form
      setNewNote({ title: "", text: "" });
      setShowForm(false);
      setEditingNote(null);
    } catch (error) {
      toast.error("Failed to add/edit note");
      console.error("Error adding/editing note:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleEditNote = (note: SelectC2Notes) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      text: note.text,
    });
    setShowForm(true);
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);

      // Refresh the notes list
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
      // Optionally, you could add user-facing error handling here
    }
  };

  return (
    <section className="min-h-[calc(100vh-91px)] w-full flex flex-col text-[#1B2232] bg-[#aad8c3] mx-auto py-4 px-8 sm:px-20">
      <h1 className="mx-auto text-[1.5rem] mb-2 font-extrabold">
        Notes (Server-Actions)
      </h1>
      {/* Menu */}
      <menu className="flex justify-end items-center mb-8 px-4">
        <button
          className="p-2 rounded-full bg-[#1B2232] hover:bg-[#2648ad] transition-colors hover:ring-4 hover:ring-white"
          onClick={() => {
            setShowForm(!showForm);
            setEditingNote(null);
            setNewNote({ title: "", text: "" });
          }}
        >
          <FaPlusCircle className="w-6 h-6 text-[white]" />
        </button>
      </menu>

      {/* Add/Edit Note Form */}
      {showForm && (
        <form
          onSubmit={handleAddNote}
          className="mb-8 bg-[#1B2232] rounded-lg p-4 text-white"
        >
          <input
            type="text"
            placeholder="Title"
            maxLength={30}
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full mb-4 p-2 bg-[#2D3343] rounded"
            required
          />
          <textarea
            placeholder="text (comma-separated)"
            value={newNote.text}
            onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
            maxLength={250}
            className="w-full mb-4 p-2 bg-[#2D3343] rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#2D3343] rounded hover:bg-[#3E4758] transition-colors"
          >
            {editingNote ? "Update Note" : "Add Note"}
          </button>
        </form>
      )}

      {isLoading && (
        <div className="flex flex-col justify-center items-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B2232]"></div>
          <span className="mt-2 text-sm text-[#1B2232]">Loading notes...</span>
        </div>
      )}

      {!isLoading && (
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-white">
          {notes.map((note) => (
            <aside
              key={note.id}
              className="bg-[#1B2232] rounded-lg p-4 hover:bg-[#2D3343] transition-colors flex flex-col justify-between"
            >
              <nav className="flex flex-col justify-between mb-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {new Date(note.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <FaPenSquare
                      onClick={() => handleEditNote(note)}
                      className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-sm text-gray-400">{note.text}</p>
                </div>
              </nav>
              <div className="flex justify-between items-center">
                <b>Update:</b>
                <span className="text-sm text-gray-400 flex justify-start items-center">
                  {new Date(note.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </aside>
          ))}
        </article>
      )}

      <menu className="flex justify-end items-center my-8 px-4">
        <button
          className="p-2 rounded-full bg-[#1B2232] hover:bg-[#2648ad] transition-colors hover:ring-4 hover:ring-white"
          onClick={() => {
            setShowForm(!showForm);
            setEditingNote(null);
            setNewNote({ title: "", text: "" });
          }}
        >
          <FaPlusCircle className="w-6 h-6 text-[white]" />
        </button>
      </menu>
    </section>
  );
};

export default Notes;
