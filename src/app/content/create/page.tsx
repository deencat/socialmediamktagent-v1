"use client";

import { useState } from "react";
import { ArrowLeft, Image, Send, Clock, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContentCreationPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("editor");

  // Platform-specific content state
  const [content, setContent] = useState<{
    title: string;
    text: string;
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  }>({
    title: "",
    text: "",
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  // Function to add a hashtag
  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag("");
    }
  };

  // Function to remove a hashtag
  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  // Function to toggle platform selection
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Function to simulate media upload
  const handleMediaUpload = () => {
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
    }, 1500);
  };

  // Function to handle content submission
  const handleSubmit = () => {
    // This would integrate with a backend in a real implementation
    console.log({
      title: content.title,
      platformContent: {
        instagram: content.instagram || content.text,
        facebook: content.facebook || content.text,
        twitter: content.twitter || content.text,
        linkedin: content.linkedin || content.text,
      },
      scheduledDate: date,
      hashtags,
      platforms: selectedPlatforms,
    });
    
    // In a real implementation, we would navigate to a confirmation page
    // or show a success message
  };

  // Helper function to get character count styling
  const getCharCountColor = (text: string, limit: number) => {
    const remaining = limit - text.length;
    if (remaining < 0) return "text-red-500";
    if (remaining < limit * 0.2) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create New Content</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Editor</CardTitle>
              <CardDescription>Craft your content for multiple platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="editor" value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">General Editor</TabsTrigger>
                  <TabsTrigger value="platform-specific">Platform Specific</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Content Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter a title for your post" 
                      value={content.title}
                      onChange={(e) => setContent({...content, title: e.target.value})}
                      data-testid="content-title-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="content">Content</Label>
                      <span className={cn("text-xs", getCharCountColor(content.text, 2200))}>
                        {content.text.length}/2200
                      </span>
                    </div>
                    <Textarea 
                      id="content" 
                      placeholder="Write your content here..." 
                      rows={8}
                      value={content.text}
                      onChange={(e) => setContent({...content, text: e.target.value})}
                      data-testid="content-text-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="media">Media Upload</Label>
                    <div 
                      className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={handleMediaUpload}
                      data-testid="media-upload-area"
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
                          <span className="text-sm text-muted-foreground">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Image className="h-8 w-8 mb-2 opacity-70" />
                          <p className="text-sm text-muted-foreground">Drag and drop an image/video or click to browse</p>
                        </>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="platform-specific" className="space-y-6">
                  {selectedPlatforms.includes('instagram') && (
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <h3 className="font-medium">Instagram</h3>
                      </div>
                      <div className="flex justify-between">
                        <Label htmlFor="instagram-content">Caption</Label>
                        <span className={cn("text-xs", getCharCountColor(content.instagram || content.text, 2200))}>
                          {(content.instagram || content.text).length}/2200
                        </span>
                      </div>
                      <Textarea 
                        id="instagram-content" 
                        placeholder="Instagram caption..." 
                        rows={4}
                        value={content.instagram || content.text}
                        onChange={(e) => setContent({...content, instagram: e.target.value})}
                        data-testid="instagram-content-input"
                      />
                    </div>
                  )}
                  
                  {selectedPlatforms.includes('facebook') && (
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">Facebook</h3>
                      </div>
                      <div className="flex justify-between">
                        <Label htmlFor="facebook-content">Post Text</Label>
                        <span className={cn("text-xs", getCharCountColor(content.facebook || content.text, 63206))}>
                          {(content.facebook || content.text).length}/63,206
                        </span>
                      </div>
                      <Textarea 
                        id="facebook-content" 
                        placeholder="Facebook post..." 
                        rows={4}
                        value={content.facebook || content.text}
                        onChange={(e) => setContent({...content, facebook: e.target.value})}
                        data-testid="facebook-content-input"
                      />
                    </div>
                  )}
                  
                  {selectedPlatforms.includes('twitter') && (
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Twitter className="h-5 w-5 text-sky-500" />
                        <h3 className="font-medium">Twitter/X</h3>
                      </div>
                      <div className="flex justify-between">
                        <Label htmlFor="twitter-content">Tweet</Label>
                        <span className={cn("text-xs", getCharCountColor(content.twitter || content.text, 280))}>
                          {(content.twitter || content.text).length}/280
                        </span>
                      </div>
                      <Textarea 
                        id="twitter-content" 
                        placeholder="Twitter post..." 
                        rows={3}
                        value={content.twitter || content.text}
                        onChange={(e) => setContent({...content, twitter: e.target.value})}
                        data-testid="twitter-content-input"
                      />
                    </div>
                  )}
                  
                  {selectedPlatforms.includes('linkedin') && (
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Linkedin className="h-5 w-5 text-blue-700" />
                        <h3 className="font-medium">LinkedIn</h3>
                      </div>
                      <div className="flex justify-between">
                        <Label htmlFor="linkedin-content">Post</Label>
                        <span className={cn("text-xs", getCharCountColor(content.linkedin || content.text, 3000))}>
                          {(content.linkedin || content.text).length}/3,000
                        </span>
                      </div>
                      <Textarea 
                        id="linkedin-content" 
                        placeholder="LinkedIn post..." 
                        rows={4}
                        value={content.linkedin || content.text}
                        onChange={(e) => setContent({...content, linkedin: e.target.value})}
                        data-testid="linkedin-content-input"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => alert("Content saved as draft")}>
                  Save as Draft
                </Button>
                <Button onClick={handleSubmit} data-testid="publish-content-button">
                  <Send className="h-4 w-4 mr-2" />
                  {date && date > new Date() ? "Schedule" : "Publish Now"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Settings & Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
              <CardDescription>Configure your publication details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platforms</Label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedPlatforms.includes("instagram") ? "default" : "outline"} 
                    size="sm"
                    onClick={() => togglePlatform("instagram")}
                    className="flex items-center gap-1.5"
                    data-testid="platform-instagram"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </Button>
                  <Button 
                    variant={selectedPlatforms.includes("facebook") ? "default" : "outline"} 
                    size="sm"
                    onClick={() => togglePlatform("facebook")}
                    className="flex items-center gap-1.5"
                    data-testid="platform-facebook"
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </Button>
                  <Button 
                    variant={selectedPlatforms.includes("twitter") ? "default" : "outline"} 
                    size="sm"
                    onClick={() => togglePlatform("twitter")}
                    className="flex items-center gap-1.5"
                    data-testid="platform-twitter"
                  >
                    <Twitter className="h-4 w-4" /> Twitter/X
                  </Button>
                  <Button 
                    variant={selectedPlatforms.includes("linkedin") ? "default" : "outline"} 
                    size="sm"
                    onClick={() => togglePlatform("linkedin")}
                    className="flex items-center gap-1.5"
                    data-testid="platform-linkedin"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                        data-testid="schedule-date-button"
                      >
                        <Clock className="mr-2 h-4 w-4" />
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
                  
                  <Select defaultValue="now">
                    <SelectTrigger data-testid="schedule-time-select">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Publish now</SelectItem>
                      <SelectItem value="morning">Morning (9:00 AM)</SelectItem>
                      <SelectItem value="noon">Noon (12:00 PM)</SelectItem>
                      <SelectItem value="evening">Evening (6:00 PM)</SelectItem>
                      <SelectItem value="custom">Custom time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashtags">Hashtags</Label>
                <div className="flex space-x-2">
                  <Input
                    id="hashtags"
                    placeholder="Add hashtag"
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHashtag();
                      }
                    }}
                    data-testid="hashtag-input"
                  />
                  <Button type="button" onClick={addHashtag}>Add</Button>
                </div>
                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hashtags.map((tag) => (
                      <Badge key={tag} className="flex items-center gap-1" variant="secondary" data-testid={`hashtag-${tag}`}>
                        #{tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0"
                          onClick={() => removeHashtag(tag)}
                          data-testid={`remove-hashtag-${tag}`}
                        >
                          <ArrowLeft className="h-3 w-3 rotate-45" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="promotion">
                  <SelectTrigger id="category" data-testid="content-category-select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
              <CardDescription>Recommended hashtags and improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Suggested Hashtags</Label>
                <div className="flex flex-wrap gap-2">
                  {["marketing", "socialmedia", "digital", "strategy", "growth"].map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        if (!hashtags.includes(tag)) {
                          setHashtags([...hashtags, tag]);
                        }
                      }}
                      data-testid={`suggestion-${tag}`}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Content Improvements</Label>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="p-2 bg-muted rounded-md">Add a call-to-action to improve engagement</p>
                  <p className="p-2 bg-muted rounded-md">Consider adding emojis to increase visual appeal</p>
                  <p className="p-2 bg-muted rounded-md">Your post could benefit from more specific details</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 