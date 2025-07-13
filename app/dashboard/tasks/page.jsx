"use client";

import { useEffect, useState } from "react";
import useStore from "@/store";
import { FiPlus, FiTrash2, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

export default function TasksPage() {
  const { tasks, setTasks, loading, setLoading } = useStore();
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setTitle("");
      toast.success("Task added");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDone = async (task) => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !task.done, title: task.title }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updated = await res.json();
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      toast.error(err.message);
      // Revert UI on error
      setTasks(tasks.map((t) => 
        t._id === task._id ? { ...t, done: !t.done } : t
      ));
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { 
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Tasks</h2>

      <form onSubmit={addTask} className="mb-6 flex gap-2">
        <input
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-70"
        >
          {isSubmitting ? <FiLoader className="animate-spin" /> : <FiPlus />}
          Add
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <FiLoader className="animate-spin text-2xl text-gray-500" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-gray-50 text-gray-500 p-8 rounded-lg text-center">
          No tasks yet. Add your first task above!
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`text-gray-800 ${
                    task.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                aria-label="Delete task"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}