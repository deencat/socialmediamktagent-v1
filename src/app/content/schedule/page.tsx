"use client";

import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ContentCreationModal, ContentItem } from "@/components/dashboard/content-creation-modal";
import Link from "next/link";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { cn } from "@/lib/utils";

export default function ContentSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  
  // Mock data for content calendar - in a real app this would come from an API call
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Summer promotion post with product showcase",
      description: "Highlight our summer collection with beach theme",
      date: "2023-06-15",
      platform: "instagram",
      status: "scheduled",
      hashtags: ["summer", "beachvibes", "newcollection"]
    },
    {
      id: "2",
      title: "Customer testimonial highlight",
      description: "Share positive feedback from @customer123",
      date: "2023-06-15",
      platform: "threads",
      status: "draft",
      hashtags: ["testimonial", "happycustomers"]
    },
    {
      id: "3",
      title: "New product teaser video",
      description: "15-second preview of upcoming product",
      date: "2023-06-17",
      platform: "instagram",
      status: "scheduled",
      hashtags: ["comingsoon", "newproduct", "teaser"]
    },
    {
      id: "4",
      title: "Behind the scenes at our workshop",
      description: "Show our creative process and team at work",
      date: "2023-06-18",
      platform: "instagram",
      status: "published",
      hashtags: ["behindthescenes", "meettheteam"]
    },
    {
      id: "5",
      title: "Weekly product tips and tricks",
      description: "How to get the most out of our product",
      date: "2023-06-20",
      platform: "instagram",
      status: "scheduled",
      hashtags: ["tips", "howto", "tutorial"]
    },
    {
      id: "6",
      title: "Industry news roundup",
      description: "Weekly summary of top industry news",
      date: "2023-06-22",
      platform: "threads",
      status: "draft",
      hashtags: ["news", "industry", "weekly"]
    },
    {
      id: "7",
      title: "Team spotlight - Interview with lead designer",
      description: "Get to know our creative team",
      date: "2023-06-25",
      platform: "instagram",
      status: "scheduled",
      hashtags: ["team", "interview", "meettheteam"]
    },
    {
      id: "8",
      title: "Monthly newsletter promo",
      description: "Reminder to sign up for our newsletter",
      date: "2023-06-30",
      platform: "instagram",
      status: "scheduled",
      hashtags: ["newsletter", "signup", "monthly"]
    }
  ]);

  // Get content for selected date
  const selectedDateContent = selectedDate 
    ? contentItems.filter(item => item.date === format(selectedDate, "yyyy-MM-dd"))
    : [];

  // Get days in current month with content
  const daysWithContent = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  }).map(day => {
    const dayContent = contentItems.filter(item => item.date === format(day, "yyyy-MM-dd"));
    return {
      date: day,
      content: dayContent
    };
  });

  // Handle navigation between months
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Handle saving content
  const handleSaveContent = (content: ContentItem) => {
    if (editingContent) {
      // Update existing item
      setContentItems((prev) => 
        prev.map((item) => (item.id === content.id ? content : item))
      );
      setEditingContent(null);
    } else {
      // Add new item
      setContentItems((prev) => [...prev, content]);
    }
    setIsCreatingContent(false);
  };

  // Helper function to get platform icon color
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "text-pink-500";
      case "threads":
        return "text-black dark:text-white";
      case "facebook":
        return "text-blue-600";
      case "twitter":
        return "text-sky-400";
      case "linkedin":
        return "text-blue-700";
      default:
        return "text-muted-foreground";
    }
  };
  
  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published":
        return "default";
      case "scheduled":
        return "outline";
      case "draft":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Content Calendar</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "month" | "list")}>
            <TabsList>
              <TabsTrigger value="month" data-testid="month-view-tab">
                <Grid3x3 className="h-4 w-4 mr-2" />
                Month
              </TabsTrigger>
              <TabsTrigger value="list" data-testid="list-view-tab">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => {
            setEditingContent(null);
            setIsCreatingContent(true);
          }} data-testid="create-content-button">
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>
            {format(currentMonth, "MMMM yyyy")}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth} data-testid="prev-month-button">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth} data-testid="next-month-button">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} defaultValue={viewMode}>
            <TabsContent value="month" className="mt-0">
              <div className="grid grid-cols-7 gap-px bg-muted text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-2 text-sm font-medium" data-testid={`weekday-${day}`}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-muted">
                {daysWithContent.map(({ date, content }) => {
                  const isCurrentMonth = isSameMonth(date, currentMonth);
                  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                  
                  return (
                    <div
                      key={date.toString()}
                      className={cn(
                        "min-h-28 p-2 bg-background",
                        !isCurrentMonth && "text-muted-foreground opacity-50",
                        isSelected && "bg-muted",
                        "relative"
                      )}
                      onClick={() => setSelectedDate(date)}
                      data-testid={`date-${format(date, "yyyy-MM-dd")}`}
                    >
                      <time
                        dateTime={format(date, "yyyy-MM-dd")}
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full",
                          isSelected && "bg-primary text-primary-foreground"
                        )}
                        data-testid={`time-${format(date, "yyyy-MM-dd")}`}
                      >
                        {format(date, "d")}
                      </time>
                      <div className="mt-1 space-y-1 max-h-[calc(100%-1.5rem)] overflow-auto">
                        {content.map((item) => (
                          <div
                            key={item.id}
                            className="text-xs bg-background border rounded p-1 cursor-pointer hover:bg-muted transition-colors truncate"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingContent(item);
                              setIsCreatingContent(true);
                            }}
                            data-testid={`content-item-${item.id}`}
                          >
                            <div className="flex items-center gap-1">
                              <div className={cn("h-2 w-2 rounded-full", getPlatformColor(item.platform))} />
                              <span className="font-medium truncate">{item.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                <div className="border rounded-md divide-y">
                  {contentItems.length > 0 ? (
                    contentItems
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between p-4 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            setEditingContent(item);
                            setIsCreatingContent(true);
                          }}
                          data-testid={`list-content-item-${item.id}`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className={cn("h-3 w-3 rounded-full", getPlatformColor(item.platform))} />
                              <h3 className="font-medium">{item.title}</h3>
                              <Badge variant={getStatusVariant(item.status)}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                            </div>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {format(new Date(item.date), "MMM d, yyyy")}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      No content scheduled. Click &quot;Create Content&quot; to add something new.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedDate && viewMode === "month" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">
              Content for {format(selectedDate, "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateContent.length > 0 ? (
              <div className="space-y-4">
                {selectedDateContent.map((item) => (
                  <div key={item.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-3 w-3 rounded-full", getPlatformColor(item.platform))} />
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    )}
                    {item.hashtags && item.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.hashtags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingContent(item);
                          setIsCreatingContent(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No content scheduled for this date.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => {
                    setEditingContent(null);
                    setIsCreatingContent(true);
                  }}
                  data-testid="add-content-to-date-button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Content Creation Modal */}
      <ContentCreationModal
        open={isCreatingContent}
        onOpenChange={setIsCreatingContent}
        onSave={handleSaveContent}
        initialContent={editingContent ? editingContent : selectedDate ? {
          id: String(Date.now()),
          title: "",
          description: "",
          date: format(selectedDate, "yyyy-MM-dd"),
          platform: "instagram",
          status: "draft",
          hashtags: []
        } : undefined}
      />
    </div>
  );
} 