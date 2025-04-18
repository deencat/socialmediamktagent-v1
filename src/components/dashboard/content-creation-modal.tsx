"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Instagram, MessageCircle, Image, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ContentCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (content: ContentItem) => void;
  initialContent?: ContentItem;
}

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  platform: "instagram" | "threads";
  status: "scheduled" | "published" | "draft";
  hashtags?: string[];
}

export function ContentCreationModal({
  open,
  onOpenChange,
  onSave,
  initialContent,
}: ContentCreationModalProps) {
  const [content, setContent] = useState<ContentItem>(
    initialContent || {
      id: String(Date.now()),
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      platform: "instagram",
      status: "draft",
      hashtags: [],
    }
  );
  
  const [date, setDate] = useState<Date | undefined>(
    initialContent ? new Date(initialContent.date) : new Date()
  );
  
  const [newHashtag, setNewHashtag] = useState("");

  const handleSave = () => {
    onSave({
      ...content,
      date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
    });
    onOpenChange(false);
  };

  const addHashtag = () => {
    if (!newHashtag.trim()) return;
    
    setContent({
      ...content,
      hashtags: [...(content.hashtags || []), newHashtag.trim()]
    });
    
    setNewHashtag("");
  };

  const removeHashtag = (tag: string) => {
    setContent({
      ...content,
      hashtags: (content.hashtags || []).filter(t => t !== tag)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{initialContent ? "Edit Content" : "Create New Content"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="Enter post title"
              data-testid="content-title-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={content.description || ""}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              placeholder="Enter post description"
              rows={3}
              data-testid="content-description-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Platform</Label>
            <RadioGroup
              value={content.platform}
              onValueChange={(value) => setContent({ ...content, platform: value as "instagram" | "threads" })}
              className="flex gap-4"
              data-testid="content-platform-input"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instagram" id="instagram" />
                <Label htmlFor="instagram" className="flex items-center gap-1.5">
                  <Instagram className="h-4 w-4" /> Instagram
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="threads" id="threads" />
                <Label htmlFor="threads" className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" /> Threads
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  data-testid="content-date-input"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={content.status}
              onValueChange={(value) => 
                setContent({ ...content, status: value as "scheduled" | "published" | "draft" })
              }
              className="flex gap-4"
              data-testid="content-status-input"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft">Draft</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scheduled" id="scheduled" />
                <Label htmlFor="scheduled">Scheduled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <Label htmlFor="published">Published</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <div className="flex gap-2">
              <Input
                id="hashtags"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                placeholder="Add hashtag"
                data-testid="content-hashtag-input"
              />
              <Button type="button" onClick={addHashtag} size="sm">
                Add
              </Button>
            </div>
            
            {(content.hashtags && content.hashtags.length > 0) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {content.hashtags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-1">
                    #{tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => removeHashtag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Media Upload (Coming Soon)</Label>
            <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground">
              <Image className="h-8 w-8 mb-2 opacity-70" />
              <p className="text-sm">Drag and drop an image/video or click to browse</p>
              <p className="text-xs mt-1">(Feature coming soon)</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} data-testid="content-save-button">
            {initialContent ? "Save Changes" : "Create Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 