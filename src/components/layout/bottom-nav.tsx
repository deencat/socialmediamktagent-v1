"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Award, Users, Settings } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      name: "Rewards",
      href: "/rewards",
      icon: <Award className="h-5 w-5" />,
    },
    {
      name: "Community",
      href: "/community",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${isActive ? "text-primary" : "text-muted-foreground"}`}
              data-testid={`bottom-nav-${item.name.toLowerCase()}`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}