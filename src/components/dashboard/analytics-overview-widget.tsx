"use client";

import { Download, Instagram, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsOverviewWidgetProps {
  fullWidth?: boolean;
}

export function AnalyticsOverviewWidget({ fullWidth = false }: AnalyticsOverviewWidgetProps) {
  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Analytics Overview</CardTitle>
          <CardDescription>Performance across platforms</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Tabs defaultValue="instagram" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="instagram" className="flex items-center gap-1">
                <Instagram className="h-4 w-4" /> Instagram
              </TabsTrigger>
              <TabsTrigger value="threads" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> Threads
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Followers</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-2xl font-bold">2,482</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                +14.2% from last month
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-2xl font-bold">5.2%</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                +0.8% from last month
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Reach</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-2xl font-bold">12.4K</div>
              <div className="text-xs text-green-500 flex items-center mt-1">
                +22% from last month
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Top Performing Content</h4>
            <div className="space-y-3">
              {[
                {
                  title: "Summer collection showcase",
                  engagement: "324 likes, 42 comments",
                  reach: "2.4K"
                },
                {
                  title: "Customer testimonial video",
                  engagement: "287 likes, 36 comments",
                  reach: "1.9K"
                },
                {
                  title: "Behind the scenes at workshop",
                  engagement: "256 likes, 28 comments",
                  reach: "1.7K"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.engagement}</p>
                  </div>
                  <div className="text-sm font-medium">{item.reach}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Audience Demographics</h4>
            <div className="h-[150px] w-full rounded-md bg-muted/50 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Demographics chart placeholder</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}