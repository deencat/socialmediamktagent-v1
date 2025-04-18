"use client";

import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, Instagram, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragStartEvent 
} from "@dnd-kit/core";
import { ContentCreationModal, ContentItem } from "./content-creation-modal";

interface ContentCalendarWidgetProps {
  fullWidth?: boolean;
}

export function ContentCalendarWidget({ fullWidth = false }: ContentCalendarWidgetProps) {
  const [activeDay, setActiveDay] = useState<string | null>("2023-06-15");
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  
  // Mock data for content calendar
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
  ]);
  
  const filteredItems = activeDay 
    ? contentItems.filter(item => item.date === activeDay)
    : contentItems;
  
  // Configure drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );
  
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

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setDraggedItemId(String(active.id));
  };

  // Handle drag end (update date when dropping on a new date)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const newDate = String(over.id);
      
      setContentItems((prevItems) => 
        prevItems.map((item) => {
          if (item.id === draggedItemId) {
            return {
              ...item,
              date: newDate
            };
          }
          return item;
        })
      );
    }
    
    setDraggedItemId(null);
  };

  // Handle creating/editing content
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

  // Handle editing content
  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
    setIsCreatingContent(true);
  };

  // Handle deleting content
  const handleDeleteContent = (id: string) => {
    setContentItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Card className={fullWidth ? "w-full" : "h-full"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-medium">Content Calendar</CardTitle>
            <CardDescription>Schedule and manage your content</CardDescription>
          </div>
          <Button 
            size="sm" 
            className="h-8 gap-1" 
            onClick={() => setIsCreatingContent(true)}
            data-testid="create-content-button"
          >
            <Plus className="h-4 w-4" /> Create
          </Button>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Date selector (droppable areas) */}
            <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
              {dates.map((date) => (
                <button
                  key={date.dateString}
                  id={date.dateString}
                  onClick={() => setActiveDay(date.dateString)}
                  className={`flex flex-col items-center justify-center rounded-md p-2 min-w-[60px] ${
                    activeDay === date.dateString 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  } ${draggedItemId ? 'border-2 border-dashed border-primary/50' : ''}`}
                  data-testid={`date-${date.dateString}`}
                >
                  <span className="text-xs">{date.day}</span>
                  <span className="text-lg font-bold">{date.date}</span>
                </button>
              ))}
            </div>
            
            {/* Content items */}
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
                    id={item.id}
                    className={`flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors ${
                      draggedItemId === item.id ? 'opacity-50' : ''
                    } cursor-grab active:cursor-grabbing`}
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
                      <div className="max-w-[200px]">
                        <p className="font-medium line-clamp-1">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={
                            item.status === "published" 
                              ? "success" 
                              : item.status === "scheduled" 
                                ? "default" 
                                : "secondary"
                          }>
                            {item.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        {item.hashtags && item.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.hashtags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs text-blue-500">#{tag}</span>
                            ))}
                            {item.hashtags.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{item.hashtags.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleEditContent(item)}
                        data-testid={`edit-content-${item.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteContent(item.id)}
                        data-testid={`delete-content-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DndContext>
          
          {activeDay && (
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setEditingContent(null);
                  setIsCreatingContent(true);
                }}
                data-testid="add-content-to-date"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Content to {new Date(activeDay).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Content Creation Modal */}
      <ContentCreationModal
        open={isCreatingContent}
        onOpenChange={setIsCreatingContent}
        onSave={handleSaveContent}
        initialContent={editingContent ? editingContent : activeDay ? {
          id: String(Date.now()),
          title: "",
          description: "",
          date: activeDay,
          platform: "instagram",
          status: "draft",
          hashtags: []
        } : undefined}
      />
    </>
  );
}