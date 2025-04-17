
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "@/components/navigation/Sidebar";
import BottomNavBar from "@/components/navigation/BottomNavBar";
import Header from "@/components/navigation/header/Header";

// Configure the Inter font as specified in the UI Design Doc (or similar sans-serif)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media Marketing Agent",
  description: "AI-Powered Social Growth Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}> {/* Neutral background with dark mode support */}
        <div className="flex h-screen">
          {/* Sidebar for larger screens */}
          <div className="hidden md:flex">
            <Sidebar />
          </div>

          {/* Main content area with header */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>

        {/* Bottom Navigation Bar for smaller screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0">
          <BottomNavBar />
        </div>
      </body>
    </html>
  );
}
