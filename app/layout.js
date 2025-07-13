// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers"; // 👈 NEW
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NotePilot AI",
  description: "Personal productivity app with notes, tasks, and AI summaries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50"}>
        <Providers>{children}</Providers> {/* 👈 Fix: Wrap in client-only Provider */}
      </body>
    </html>
  );
}
