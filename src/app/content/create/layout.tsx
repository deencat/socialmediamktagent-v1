import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Content | Social Media Marketing Agent",
  description: "Create and schedule content for multiple social media platforms",
};

export default function ContentLayout({
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