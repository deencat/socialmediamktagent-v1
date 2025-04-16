"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { BottomNav } from "./bottom-nav";
import { Header } from "./header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  // Check if the current route is an auth route
  const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  // Update isMobile state based on window width
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // If it's an auth route, don't show the navigation
  if (isAuthRoute) {
    return <main>{children}</main>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Sidebar />}
      <div className={`${!isMobile ? "ml-64" : ""} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 p-4">{children}</main>
        {isMobile && <BottomNav />}
      </div>
    </div>
  );
}