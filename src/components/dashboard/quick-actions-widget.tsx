"use client";

import { Plus, Calendar, BarChart3, Megaphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getQuickActions } from "@/lib/data";

interface QuickActionsWidgetProps {
  fullWidth?: boolean;
}

export function QuickActionsWidget({ fullWidth = false }: QuickActionsWidgetProps) {
  // Get quick actions from data
  const actions = [
    {
      id: "action-1",
      title: "Create Post",
      icon: <Plus className="h-4 w-4 mr-2" />,
      path: "/content/create",
      color: "bg-blue-500"
    },
    {
      id: "action-2",
      title: "Schedule Content",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      path: "/content/schedule",
      color: "bg-green-500"
    },
    {
      id: "action-3",
      title: "View Analytics",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      path: "/analytics",
      color: "bg-purple-500"
    },
    {
      id: "action-4",
      title: "Manage Campaigns",
      icon: <Megaphone className="h-4 w-4 mr-2" />,
      path: "/campaigns",
      color: "bg-orange-500"
    }
  ];

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="flex items-center justify-start h-auto py-3"
              asChild
              data-testid={`quick-action-${action.id}`}
            >
              <Link href={action.path}>
                <div className={`${action.color} rounded-full p-1 text-white mr-3`}>
                  {action.icon}
                </div>
                <span>{action.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 