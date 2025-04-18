import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Calendar | Social Media Marketing Agent",
  description: "Schedule and manage your social media content calendar",
};

export default function ContentScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 