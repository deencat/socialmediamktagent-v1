"use client";

import { TrendingUp, Users, Heart, MessageSquare, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EngagementStatsWidgetProps {
  fullWidth?: boolean;
}

export function EngagementStatsWidget({ fullWidth = false }: EngagementStatsWidgetProps) {
  // Mock data for engagement stats
  const stats = [
    {
      title: "New Followers",
      value: "+124",
      change: "+14%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Engagement Rate",
      value: "5.2%",
      change: "+0.8%",
      icon: Heart,
      trend: "up"
    },
    {
      title: "Comments",
      value: "87",
      change: "-3%",
      icon: MessageSquare,
      trend: "down"
    },
    {
      title: "Reach",
      value: "12.4K",
      change: "+22%",
      icon: BarChart,
      trend: "up"
    }
  ];

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Engagement Stats</CardTitle>
          <CardDescription>Your social media performance</CardDescription>
        </div>
        <Tabs defaultValue="7days" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="7days">7d</TabsTrigger>
            <TabsTrigger value="30days">30d</TabsTrigger>
            <TabsTrigger value="90days">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col space-y-2 p-4 rounded-xl bg-muted/50"
              data-testid={`stat-${stat.title.toLowerCase().replace(' ', '-')}`}
            >
              <div className="flex justify-between items-start">
                <div className="rounded-md bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === 'down' && 'rotate-180'}`} />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.title}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 h-[120px] w-full">
          {/* Placeholder for chart */}
          <div className="h-full w-full rounded-md bg-muted/50 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Engagement trend chart</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}