"use client";

import { useState } from "react";
import { Award, Gift, ChevronRight, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RewardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for rewards
  const availableRewards = [
    {
      id: "1",
      title: "$10 Starbucks Gift Card",
      description: "Redeem for a $10 Starbucks gift card",
      pointsCost: 100,
      category: "gift-card",
      image: "/placeholder-reward-1.jpg"
    },
    {
      id: "2",
      title: "$20 Amazon Voucher",
      description: "Redeem for a $20 Amazon shopping voucher",
      pointsCost: 200,
      category: "gift-card",
      image: "/placeholder-reward-2.jpg"
    },
    {
      id: "3",
      title: "Premium Content Template Pack",
      description: "Access to 20 premium content templates",
      pointsCost: 150,
      category: "platform",
      image: "/placeholder-reward-3.jpg"
    },
    {
      id: "4",
      title: "Analytics Pro Upgrade (1 month)",
      description: "Upgrade to Analytics Pro for 1 month",
      pointsCost: 300,
      category: "platform",
      image: "/placeholder-reward-4.jpg"
    },
    {
      id: "5",
      title: "Featured Service Provider Status",
      description: "Get featured at the top of task lists for 1 week",
      pointsCost: 250,
      category: "platform",
      image: "/placeholder-reward-5.jpg"
    },
  ];
  
  const redeemHistory = [
    {
      id: "h1",
      rewardTitle: "$10 Starbucks Gift Card",
      pointsCost: 100,
      redeemedAt: "2023-06-10",
      status: "delivered"
    },
    {
      id: "h2",
      rewardTitle: "Premium Content Template Pack",
      pointsCost: 150,
      redeemedAt: "2023-05-28",
      status: "delivered"
    }
  ];
  
  // Filter rewards based on search query
  const filteredRewards = availableRewards.filter(reward =>
    reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Rewards Marketplace</h1>
        
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 text-primary p-2 rounded-md">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your Points</p>
            <p className="font-bold">450 points</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="history">Redemption History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4">
          <div className="flex justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rewards..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRewards.map(reward => (
              <Card key={reward.id} className="overflow-hidden" data-testid={`reward-${reward.id}`}>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Gift className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-primary mr-1" />
                      <span className="font-bold">{reward.pointsCost} points</span>
                    </div>
                    <Button size="sm">
                      Redeem <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-4">
            {redeemHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No redemption history yet</p>
              </div>
            ) : (
              redeemHistory.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{item.rewardTitle}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{item.pointsCost} points</span>
                          <span className="text-sm text-muted-foreground">
                            • Redeemed on {new Date(item.redeemedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}