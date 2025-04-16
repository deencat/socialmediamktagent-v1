"use client";

import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, Instagram, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentCalendarWidgetProps {
  fullWidth?: boolean;
}

interface ContentItem {
  id: string;
  title: string;
  date: string;
  platform: "instagram" | "threads";
  status: "scheduled" | "published" | "draft";
}

export function ContentCalendarWidget({ fullWidth = false }: ContentCalendarWidgetProps) {
  const [activeDay, setActiveDay] = useState<string | null>("2023-06-15");
  
  // Mock data for content calendar
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Summer promotion post with product showcase",
      date: "2023-06-15",
      platform: "instagram",
      status: "scheduled"
    },
    {
      id: "2",
      title: "Customer testimonial highlight",
      date: "2023-06-15",
      platform: "threads",
      status: "draft"
    },
    {
      id: "3",
      title: "New product teaser video",
      date: "2023-06-17",
      platform: "instagram",
      status: "scheduled"
    },
    {
      id: "4",
      title: "Behind the scenes at our workshop",
      date: "2023-06-18",
      platform: "instagram",
      status: "published"
    },
  ];
  
  const filteredItems = activeDay 
    ? contentItems.filter(item => item.date === activeDay)
    : contentItems;
  
  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      dateString: `2023-06-${15 + i}`, // Simplified for demo
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate()
    };
  });

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Content Calendar</CardTitle>
          <CardDescription>Schedule and manage your content</CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1" data-testid="create-content-button">
          <Plus className="h-4 w-4" /> Create
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
          {dates.map((date) => (
            <button
              key={date.dateString}
              onClick={() => setActiveDay(date.dateString)}
              className={`flex flex-col items-center justify-center rounded-md p-2 min-w-[60px] ${activeDay === date.dateString ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              data-testid={`date-${date.dateString}`}
            >
              <span className="text-xs">{date.day}</span>
              <span className="text-lg font-bold">{date.date}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mb-2 opacity-20" />
              <h3 className="font-medium">No content scheduled</h3>
              <p className="text-sm">Create new content for this day</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                data-testid={`content-item-${item.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-muted p-2 rounded-md">
                    {item.platform === "instagram" ? (
                      <Instagram className="h-5 w-5" />
                    ) : (
                      <MessageCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={item.status === "published" ? "success" : item.status === "scheduled" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}