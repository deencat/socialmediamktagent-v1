"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, MessageCircle, User, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for community posts
  const communityPosts = [
    {
      id: "1",
      author: {
        name: "Sarah Wong",
        avatar: "/avatars/sarah.jpg",
        role: "Service Provider"
      },
      content: "Just completed my first 10 tasks! The platform is super easy to use and I'm already seeing my points add up. Any recommendations on which rewards to redeem first?",
      createdAt: "2023-06-15T10:30:00",
      likes: 12,
      comments: 5,
      category: "general"
    },
    {
      id: "2",
      author: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        role: "SME Owner"
      },
      content: "We just launched our summer campaign and the engagement has been amazing! Thanks to everyone who's been helping with likes and comments. We've seen a 30% increase in profile visits!",
      createdAt: "2023-06-14T16:45:00",
      likes: 24,
      comments: 8,
      category: "success-story"
    },
    {
      id: "3",
      author: {
        name: "Jessica Lee",
        avatar: "/avatars/jessica.jpg",
        role: "Service Provider"
      },
      content: "Quick tip for new service providers: Focus on quality comments rather than just likes. I've found that thoughtful comments earn more points and help build better relationships with SMEs.",
      createdAt: "2023-06-13T09:15:00",
      likes: 36,
      comments: 12,
      category: "tips"
    },
    {
      id: "4",
      author: {
        name: "David Lam",
        avatar: "/avatars/david.jpg",
        role: "SME Owner"
      },
      content: "Question for other SMEs: What's your optimal posting frequency? We're currently doing 3 posts per week but wondering if we should increase to daily posts.",
      createdAt: "2023-06-12T14:20:00",
      likes: 18,
      comments: 15,
      category: "question"
    },
  ];
  
  // Filter posts based on search query
  const filteredPosts = communityPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Community Hub</h1>
        
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
          </TabsList>
          
          <div className="relative max-w-xs hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="md:hidden relative max-w-full mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts match your search</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden" data-testid={`post-${post.id}`}>
                <CardHeader className="pb-0">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{post.author.role}</span>
                        <span className="text-xs text-muted-foreground">
                          u2022 {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-4">
          {filteredPosts
            .filter(post => post.category === "tips")
            .map(post => (
              <Card key={post.id} className="overflow-hidden">
                {/* Same card content as above */}
                <CardHeader className="pb-0">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{post.author.role}</span>
                        <span className="text-xs text-muted-foreground">
                          u2022 {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          }
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-4">
          {filteredPosts
            .filter(post => post.category === "question")
            .map(post => (
              <Card key={post.id} className="overflow-hidden">
                {/* Same card content as above */}
                <CardHeader className="pb-0">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{post.author.role}</span>
                        <span className="text-xs text-muted-foreground">
                          u2022 {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          }
        </TabsContent>
        
        <TabsContent value="success" className="space-y-4">
          {filteredPosts
            .filter(post => post.category === "success-story")
            .map(post => (
              <Card key={post.id} className="overflow-hidden">
                {/* Same card content as above */}
                <CardHeader className="pb-0">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{post.author.role}</span>
                        <span className="text-xs text-muted-foreground">
                          u2022 {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}