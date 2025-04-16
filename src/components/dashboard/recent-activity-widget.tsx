"use client";

import { Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecentActivityWidgetProps {
  fullWidth?: boolean;
}

export function RecentActivityWidget({ fullWidth = false }: RecentActivityWidgetProps) {
  // Mock data for recent activities
  const activities = [
    {
      id: "1",
      action: "New follower",
      subject: "@design_enthusiast",
      time: "5 minutes ago",
      platform: "instagram"
    },
    {
      id: "2",
      action: "Post engagement",
      subject: "Summer collection showcase",
      time: "15 minutes ago",
      platform: "instagram"
    },
    {
      id: "3",
      action: "Campaign completed",
      subject: "Spring Sale Promotion",
      time: "2 hours ago",
      platform: "threads"
    },
    {
      id: "4",
      action: "New comment",
      subject: "Customer testimonial video",
      time: "3 hours ago",
      platform: "instagram"
    }
  ];

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <CardDescription>Latest updates from your accounts</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0"
              data-testid={`activity-${activity.id}`}
            >
              <div className="rounded-full bg-muted p-2 mt-0.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{activity.subject}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full justify-start text-muted-foreground" data-testid="view-all-activity-button">
            View all activity <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}