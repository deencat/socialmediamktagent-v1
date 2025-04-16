"use client";

import { useState } from "react";
import { Instagram, MessageCircle, Heart, MessageSquare, Share2, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  smeId: string;
  smeName: string;
  platform: "instagram" | "threads";
  type: "like" | "comment" | "share" | "follow";
  contentId: string;
  contentTitle: string;
  contentImage: string;
  rewardPoints: number;
  status: "available" | "completed" | "expired";
  expiresAt: string;
}

interface TaskListProps {
  searchQuery: string;
  filters: {
    platform: string;
    taskType: string;
    reward: string;
  };
}

export function TaskList({ searchQuery, filters }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      smeId: "sme1",
      smeName: "Urban Outfitters HK",
      platform: "instagram",
      type: "like",
      contentId: "content1",
      contentTitle: "Summer collection showcase",
      contentImage: "/placeholder-1.jpg",
      rewardPoints: 5,
      status: "available",
      expiresAt: "2023-06-20"
    },
    {
      id: "2",
      smeId: "sme2",
      smeName: "Green Earth Organics",
      platform: "threads",
      type: "comment",
      contentId: "content2",
      contentTitle: "Sustainable packaging initiative",
      contentImage: "/placeholder-2.jpg",
      rewardPoints: 15,
      status: "available",
      expiresAt: "2023-06-21"
    },
    {
      id: "3",
      smeId: "sme3",
      smeName: "Tech Innovations Lab",
      platform: "instagram",
      type: "share",
      contentId: "content3",
      contentTitle: "New gadget launch event",
      contentImage: "/placeholder-3.jpg",
      rewardPoints: 20,
      status: "available",
      expiresAt: "2023-06-19"
    },
    {
      id: "4",
      smeId: "sme4",
      smeName: "Fitness First HK",
      platform: "instagram",
      type: "follow",
      contentId: "content4",
      contentTitle: "Follow our page for daily workout tips",
      contentImage: "/placeholder-4.jpg",
      rewardPoints: 10,
      status: "available",
      expiresAt: "2023-06-22"
    },
    {
      id: "5",
      smeId: "sme5",
      smeName: "Artisan Bakery",
      platform: "threads",
      type: "like",
      contentId: "content5",
      contentTitle: "Behind the scenes: Bread making process",
      contentImage: "/placeholder-5.jpg",
      rewardPoints: 5,
      status: "available",
      expiresAt: "2023-06-23"
    },
  ]);

  // Apply filters and search
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.contentTitle.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.smeName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Platform filter
    if (filters.platform !== "all" && task.platform !== filters.platform) {
      return false;
    }
    
    // Task type filter
    if (filters.taskType !== "all" && task.type !== filters.taskType) {
      return false;
    }
    
    // Reward filter
    if (filters.reward === "high" && task.rewardPoints < 15) {
      return false;
    } else if (filters.reward === "medium" && (task.rewardPoints < 10 || task.rewardPoints >= 15)) {
      return false;
    } else if (filters.reward === "low" && task.rewardPoints >= 10) {
      return false;
    }
    
    return true;
  });

  const handleCompleteTask = (taskId: string) => {
    // In a real app, this would call an API to mark the task as completed
    // For now, we'll just update the local state
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5" />;
      case "comment":
        return <MessageSquare className="h-5 w-5" />;
      case "share":
        return <Share2 className="h-5 w-5" />;
      case "follow":
        return <Award className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks match your filters</p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <Card key={task.id} className="overflow-hidden" data-testid={`task-${task.id}`}>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-muted/30 flex items-center justify-center p-6">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  {task.platform === "instagram" ? (
                    <Instagram className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              <CardContent className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{task.platform}</Badge>
                      <span className="text-sm text-muted-foreground">{task.smeName}</span>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{task.contentTitle}</h3>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary p-1 rounded-md">
                        {getTaskIcon(task.type)}
                      </div>
                      <span className="capitalize font-medium">{task.type}</span>
                      <span className="text-sm text-muted-foreground">
                        Expires {new Date(task.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="flex items-center gap-1">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-bold text-lg">{task.rewardPoints} points</span>
                    </div>
                    <Button 
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={task.status === "completed"}
                      data-testid={`complete-task-${task.id}`}
                    >
                      {task.status === "completed" ? "Completed" : "Complete Task"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}