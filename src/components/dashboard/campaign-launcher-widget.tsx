"use client";

import { Rocket, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CampaignLauncherWidgetProps {
  fullWidth?: boolean;
}

export function CampaignLauncherWidget({ fullWidth = false }: CampaignLauncherWidgetProps) {
  // Mock data for campaigns
  const campaigns = [
    {
      id: "1",
      name: "Summer Collection Launch",
      status: "active",
      progress: 65,
      budget: 500,
      spent: 325,
      results: "+87 followers"
    },
    {
      id: "2",
      name: "Customer Testimonials",
      status: "draft",
      progress: 0,
      budget: 300,
      spent: 0,
      results: ""
    }
  ];

  return (
    <Card className={fullWidth ? "w-full" : "h-full"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Campaigns</CardTitle>
          <CardDescription>Launch and monitor engagement campaigns</CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1" data-testid="new-campaign-button">
          <Rocket className="h-4 w-4" /> New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="rounded-lg border bg-card p-4"
              data-testid={`campaign-${campaign.id}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{campaign.name}</h3>
                <div className={`text-xs px-2 py-1 rounded-full ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {campaign.status}
                </div>
              </div>
              
              {campaign.status === "active" && (
                <>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2 mb-3" />
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <div className="text-muted-foreground">Budget</div>
                      <div className="font-medium">${campaign.budget}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Spent</div>
                      <div className="font-medium">${campaign.spent}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-muted-foreground">Results</div>
                    <div className="font-medium text-green-600">{campaign.results}</div>
                  </div>
                </>
              )}
              
              {campaign.status === "draft" && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 mr-1" />
                    Ready to launch
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Launch <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          <Button variant="outline" className="w-full justify-start text-muted-foreground" data-testid="view-all-campaigns-button">
            View all campaigns <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}