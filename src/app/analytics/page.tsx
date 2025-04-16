"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users, Eye, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");
  
  // Mock data for analytics
  const overviewStats = [
    {
      title: "Total Followers",
      value: "2,845",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Engagement Rate",
      value: "4.6%",
      change: "+0.8%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Profile Visits",
      value: "12,938",
      change: "+23.1%",
      trend: "up",
      icon: <Eye className="h-4 w-4" />
    },
    {
      title: "Content Published",
      value: "24",
      change: "+4",
      trend: "up",
      icon: <Calendar className="h-4 w-4" />
    },
  ];
  
  const topPosts = [
    {
      id: "1",
      title: "Summer collection showcase",
      platform: "instagram",
      engagement: 342,
      impressions: 2156,
      date: "2023-06-12"
    },
    {
      id: "2",
      title: "Behind the scenes: Product design",
      platform: "threads",
      engagement: 287,
      impressions: 1845,
      date: "2023-06-10"
    },
    {
      id: "3",
      title: "Customer testimonial highlight",
      platform: "instagram",
      engagement: 256,
      impressions: 1632,
      date: "2023-06-08"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        
        <div className="flex items-center space-x-2">
          <div className="flex">
            <Button 
              variant={dateRange === "7d" ? "default" : "outline"} 
              className="rounded-r-none" 
              onClick={() => setDateRange("7d")}
            >
              7 days
            </Button>
            <Button 
              variant={dateRange === "30d" ? "default" : "outline"} 
              className="rounded-none border-x-0" 
              onClick={() => setDateRange("30d")}
            >
              30 days
            </Button>
            <Button 
              variant={dateRange === "90d" ? "default" : "outline"} 
              className="rounded-l-none" 
              onClick={() => setDateRange("90d")}
            >
              90 days
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>Follower growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted" />
                <p className="ml-2 text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best performing posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs capitalize">{post.platform}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{post.engagement} engagements</p>
                      <p className="text-xs text-muted-foreground">{post.impressions} impressions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="followers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Follower Demographics</CardTitle>
              <CardDescription>Insights about your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <Users className="h-16 w-16 text-muted" />
                <p className="ml-2 text-muted-foreground">Demographics visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>How users interact with your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <TrendingUp className="h-16 w-16 text-muted" />
                <p className="ml-2 text-muted-foreground">Engagement metrics visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>How your posts are performing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted" />
                <p className="ml-2 text-muted-foreground">Content performance visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}