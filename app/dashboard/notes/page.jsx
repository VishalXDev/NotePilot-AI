"use client";

import { useEffect, useState } from "react";
import useStore from "@/store";
import NoteCard from "@/components/NoteCard";
import { FiPlus, FiEdit2, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

export default function NotesPage() {
  const { notes, setNotes, loading, setLoading, error, setError } = useStore();
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/notes");
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/notes/${editingId}` : "/api/notes";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(editingId ? "Update failed" : "Create failed");

      const newNote = await res.json();
      
      if (editingId) {
        setNotes(notes.map((n) => (n._id === newNote._id ? newNote : n)));
        toast.success("Note updated");
        setEditingId(null);
      } else {
        setNotes([newNote, ...notes]);
        toast.success("Note created");
      }

      setForm({ title: "", content: "" });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setNotes(notes.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", content: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Notes</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">
          {editingId ? "Edit Note" : "Create New Note"}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              id="title"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Note title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={5}
              placeholder="Write your note here..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <FiLoader className="animate-spin" />
              ) : editingId ? (
                <>
                  <FiEdit2 />
                  Update
                </>
              ) : (
                <>
                  <FiPlus />
                  Add Note
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <FiLoader className="animate-spin text-2xl text-gray-500" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      ) : notes.length === 0 ? (
        <div className="bg-gray-50 text-gray-500 p-8 rounded-lg text-center">
          No notes yet. Create your first note above!
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}