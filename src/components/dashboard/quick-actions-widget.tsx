"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, CalendarIcon, BarChart3Icon, LayoutGridIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionsWidgetProps {
  fullWidth?: boolean;
}

// QuickAction type definition
type QuickAction = {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  color: string;
};

export function QuickActionsWidget({ fullWidth = false }: QuickActionsWidgetProps) {
  // Define quick actions
  const actions: QuickAction[] = [
    {
      id: "create-post",
      title: "Create Post",
      icon: <HomeIcon className="h-5 w-5" />,
      path: "/content/create",
      color: "bg-blue-500",
    },
    {
      id: "schedule-content",
      title: "Schedule Content",
      icon: <CalendarIcon className="h-5 w-5" />,
      path: "/content/schedule",
      color: "bg-purple-500",
    },
    {
      id: "view-analytics",
      title: "View Analytics",
      icon: <BarChart3Icon className="h-5 w-5" />,
      path: "/analytics",
      color: "bg-green-500",
    },
    {
      id: "manage-campaigns",
      title: "Manage Campaigns",
      icon: <LayoutGridIcon className="h-5 w-5" />,
      path: "/campaigns",
      color: "bg-amber-500",
    },
  ];

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.path}
              data-testid={`quick-action-${action.id}`}
            >
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 ${action.color} bg-opacity-10 hover:bg-opacity-20`}
              >
                <div
                  className={`p-2 rounded-full ${action.color} text-white mb-2`}
                >
                  {action.icon}
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 