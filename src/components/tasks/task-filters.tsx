"use client";

import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TaskFiltersProps {
  activeFilters: {
    platform: string;
    taskType: string;
    reward: string;
  };
  setActiveFilters: (filters: any) => void;
  onClose: () => void;
}

export function TaskFilters({ activeFilters, setActiveFilters, onClose }: TaskFiltersProps) {
  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters({
      ...activeFilters,
      [category]: value
    });
  };

  const resetFilters = () => {
    setActiveFilters({
      platform: "all",
      taskType: "all",
      reward: "all"
    });
  };

  return (
    <Card className="relative" data-testid="task-filters">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2" 
        onClick={onClose}
        data-testid="close-filters"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <CardHeader>
        <CardTitle className="text-lg">Filter Tasks</CardTitle>
      </CardHeader>
      
      <CardContent className="grid gap-6">
        <div className="space-y-2">
          <h3 className="font-medium">Platform</h3>
          <RadioGroup 
            value={activeFilters.platform} 
            onValueChange={(value) => handleFilterChange("platform", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="platform-all" data-testid="platform-all" />
              <Label htmlFor="platform-all">All Platforms</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="instagram" id="platform-instagram" data-testid="platform-instagram" />
              <Label htmlFor="platform-instagram">Instagram</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="threads" id="platform-threads" data-testid="platform-threads" />
              <Label htmlFor="platform-threads">Threads</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Task Type</h3>
          <RadioGroup 
            value={activeFilters.taskType} 
            onValueChange={(value) => handleFilterChange("taskType", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="type-all" data-testid="type-all" />
              <Label htmlFor="type-all">All Types</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="like" id="type-like" data-testid="type-like" />
              <Label htmlFor="type-like">Like</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comment" id="type-comment" data-testid="type-comment" />
              <Label htmlFor="type-comment">Comment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="share" id="type-share" data-testid="type-share" />
              <Label htmlFor="type-share">Share</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="follow" id="type-follow" data-testid="type-follow" />
              <Label htmlFor="type-follow">Follow</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Reward Points</h3>
          <RadioGroup 
            value={activeFilters.reward} 
            onValueChange={(value) => handleFilterChange("reward", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="reward-all" data-testid="reward-all" />
              <Label htmlFor="reward-all">All Rewards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="reward-high" data-testid="reward-high" />
              <Label htmlFor="reward-high">High (15+ points)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="reward-medium" data-testid="reward-medium" />
              <Label htmlFor="reward-medium">Medium (10-14 points)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="reward-low" data-testid="reward-low" />
              <Label htmlFor="reward-low">Low (1-9 points)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          variant="outline" 
          onClick={resetFilters}
          data-testid="reset-filters"
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}