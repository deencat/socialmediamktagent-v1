import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grip, X, Settings } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export interface WidgetContainerProps {
  id: string;
  title: string;
  children: ReactNode;
  onRemove?: () => void;
  onConfigure?: () => void;
  className?: string;
}

export function WidgetContainer({
  id,
  title,
  children,
  onRemove,
  onConfigure,
  className,
}: WidgetContainerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`h-full ${className || ""} ${isDragging ? "border-2 border-primary" : ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div 
          className="flex items-center gap-2 cursor-grab" 
          {...attributes} 
          {...listeners}
        >
          <Grip className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        <div className="flex space-x-1">
          {onConfigure && (
            <Button
              className={cn(
                "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
                "hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={onConfigure}
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
          {onRemove && (
            <Button
              className={cn(
                "h-8 w-8 p-0 text-muted-foreground hover:text-destructive",
                "hover:bg-accent hover:text-destructive"
              )}
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
} 