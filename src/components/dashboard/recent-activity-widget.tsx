"use client";

import { useState } from "react";
import { Clock, ChevronRight, ChevronDown, Instagram, Linkedin, Twitter, Facebook, Filter, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { getRecentActivity } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityWidgetProps {
  fullWidth?: boolean;
}

interface Activity {
  id: string;
  type: string;
  platform: string;
  description: string;
  timestamp: string;
  metrics?: {
    likes?: number;
    comments?: number;
    shares?: number;
    increase?: number;
    percentageChange?: number;
  };
  scheduledFor?: string;
}

export function RecentActivityWidget({ fullWidth = false }: RecentActivityWidgetProps) {
  // Get activity data from mock API
  const activityData = getRecentActivity() || [];
  
  // State for filtering and selected activity
  const [filter, setFilter] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  // Filter activities based on selected filter
  const filteredActivities = activityData.filter(activity => {
    if (filter === "all") return true;
    return activity.platform.toLowerCase() === filter.toLowerCase();
  });

  // Function to get platform icon
  const getPlatformIcon = (platform: string) => {
    switch(platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-600" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-sky-400" />;
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Function to get activity type badge
  const getActivityTypeBadge = (type: string) => {
    let variant = "default";
    let label = type.replace("_", " ");
    
    switch(type) {
      case "post_published":
        variant = "default";
        label = "Published";
        break;
      case "follower_milestone":
        variant = "success";
        label = "Milestone";
        break;
      case "engagement_spike":
        variant = "destructive";
        label = "Spike";
        break;
      case "scheduled_post":
        variant = "outline";
        label = "Scheduled";
        break;
    }
    
    return <Badge variant={variant as any}>{label}</Badge>;
  };

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "recently";
    }
  };

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <CardDescription>Latest updates from your accounts</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Activities</DialogTitle>
              <DialogDescription>Filter activities by platform</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue={filter} className="w-full" onValueChange={setFilter}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
              </TabsList>
            </Tabs>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Apply Filter</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <Dialog key={activity.id}>
                <DialogTrigger asChild>
                  <div 
                    className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    data-testid={`activity-${activity.id}`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className="rounded-full bg-muted p-2 mt-0.5">
                      {getPlatformIcon(activity.platform)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.description}</p>
                        {getActivityTypeBadge(activity.type)}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{activity.platform}</p>
                        <p className="text-xs text-muted-foreground">•</p>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground mt-2" />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(activity.platform)}
                      <DialogTitle>{activity.platform} Activity</DialogTitle>
                    </div>
                    <DialogDescription>{formatTimestamp(activity.timestamp)}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">{activity.description}</h4>
                      <div className="mt-2">
                        {getActivityTypeBadge(activity.type)}
                      </div>
                    </div>
                    
                    {activity.metrics && (
                      <div className="p-4 border rounded-md bg-muted/30 space-y-2">
                        <h4 className="text-sm font-medium">Metrics</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {activity.metrics.likes && (
                            <div className="text-center p-2 bg-background rounded">
                              <p className="text-xl font-semibold">{activity.metrics.likes}</p>
                              <p className="text-xs text-muted-foreground">Likes</p>
                            </div>
                          )}
                          {activity.metrics.comments && (
                            <div className="text-center p-2 bg-background rounded">
                              <p className="text-xl font-semibold">{activity.metrics.comments}</p>
                              <p className="text-xs text-muted-foreground">Comments</p>
                            </div>
                          )}
                          {activity.metrics.shares && (
                            <div className="text-center p-2 bg-background rounded">
                              <p className="text-xl font-semibold">{activity.metrics.shares}</p>
                              <p className="text-xs text-muted-foreground">Shares</p>
                            </div>
                          )}
                          {activity.metrics.increase && (
                            <div className="text-center p-2 bg-background rounded">
                              <p className="text-xl font-semibold">{activity.metrics.increase}</p>
                              <p className="text-xs text-muted-foreground">Increase</p>
                            </div>
                          )}
                          {activity.metrics.percentageChange && (
                            <div className="text-center p-2 bg-background rounded">
                              <p className="text-xl font-semibold">{activity.metrics.percentageChange}%</p>
                              <p className="text-xs text-muted-foreground">Change</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activity.scheduledFor && (
                      <div className="p-4 border rounded-md bg-muted/30">
                        <h4 className="text-sm font-medium">Scheduled For</h4>
                        <p className="text-sm">
                          {new Date(activity.scheduledFor).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button className="flex items-center gap-1">
                      View on {activity.platform} <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No activities found</p>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground" 
            data-testid="view-all-activity-button"
          >
            View all activity <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}