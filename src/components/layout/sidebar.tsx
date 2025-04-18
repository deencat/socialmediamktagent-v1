"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ListTodo, 
  Gift, 
  BarChart, 
  Settings, 
  Users,
  MessageSquare,
  Database
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", href: "/tasks", icon: ListTodo },
    { name: "Rewards", href: "/rewards", icon: Gift },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Community", href: "/community", icon: MessageSquare },
    { name: "Memory", href: "/memory", icon: Database },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-10" data-testid="sidebar">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold text-primary">
            SocialGrowth
          </Link>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive
                  ? "bg-primary-50 text-primary"
                  : "text-gray-600 hover:bg-gray-100"}`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}