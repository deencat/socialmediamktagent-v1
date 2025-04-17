"use client";

import { useState } from "react";
import { Download, Instagram, MessageCircle, Calendar, Megaphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { instagramData, threadsData } from "@/lib/data/analytics-data";
import { MetricCard } from "./metric-card";
import { ContentItem } from "./content-item";
import { DemographicsChart } from "./demographics-chart";

interface AnalyticsOverviewWidgetProps {
  fullWidth?: boolean;
}

export function AnalyticsOverviewWidget({ fullWidth = false }: AnalyticsOverviewWidgetProps) {
  const [platform, setPlatform] = useState<"instagram" | "threads">("instagram");
  const [period, setPeriod] = useState<"7d" | "14d" | "30d" | "90d">("14d");
  
  // Get data based on selected platform
  const data = platform === "instagram" ? instagramData : threadsData;

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Analytics Overview</CardTitle>
          <CardDescription>Performance across platforms</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Tabs 
            defaultValue="instagram" 
            className="w-[200px]"
            onValueChange={(value) => setPlatform(value as "instagram" | "threads")}
            value={platform}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="instagram" className="flex items-center gap-1">
                <Instagram className="h-4 w-4" /> Instagram
              </TabsTrigger>
              <TabsTrigger value="threads" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> Threads
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={period} onValueChange={(value) => setPeriod(value as "7d" | "14d" | "30d" | "90d")}>
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="14d">14 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <MetricCard
            title="Followers"
            value={data.followers.current}
            change={data.followers.change}
            data={data.followers.data}
          />
          
          <MetricCard
            title="Engagement Rate"
            value={data.engagementRate.current}
            change={data.engagementRate.change}
            data={data.engagementRate.data}
            suffix="%"
          />
          
          <MetricCard
            title="Avg. Reach"
            value={data.reach.current > 1000 ? (data.reach.current / 1000).toFixed(1) + "K" : data.reach.current}
            change={data.reach.change}
            data={data.reach.data}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Top Performing Content</CardTitle>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-3">
                  {data.topContent.map((item, index) => (
                    <ContentItem
                      key={index}
                      title={item.title}
                      engagement={item.engagement}
                      reach={item.reach}
                      change={item.change}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    <Megaphone className="h-3.5 w-3.5 mr-1" /> Boost Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <DemographicsChart
              ageData={data.demographics.age}
              genderData={data.demographics.gender}
              locationData={data.demographics.location}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}