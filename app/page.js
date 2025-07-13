"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react"; // Or your preferred loading spinner

export default function AuthRedirector() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    // Prevent redirect loop if paths change
    const currentPath = window.location.pathname;
    
    if (status === "authenticated") {
      if (!currentPath.startsWith("/dashboard")) {
        router.replace("/dashboard");
      }
    } else if (status === "unauthenticated") {
      if (!currentPath.startsWith("/login")) {
        router.replace("/login");
      }
    }
  }, [status, router]);

  // Improved loading states
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">Verifying session...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2 text-lg">Redirecting...</span>
    </div>
  );
}