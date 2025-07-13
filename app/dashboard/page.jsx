"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBook, FiCheckSquare, FiLogOut } from "react-icons/fi"; // Or your preferred icon library

export default function DashboardPage() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">NotePilot AI</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-6">
          <Link
            href="/dashboard/notes"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              pathname.startsWith("/dashboard/notes")
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            <FiBook className="w-5 h-5" />
            Notes
          </Link>
          <Link
            href="/dashboard/tasks"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              pathname.startsWith("/dashboard/tasks")
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            <FiCheckSquare className="w-5 h-5" />
            Tasks
          </Link>
        </div>

        <div className="mt-8">
          {/* Main dashboard content will go here */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
            <p className="text-gray-600">
              Select "Notes" or "Tasks" to start managing your content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}