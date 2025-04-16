"use client";

import { useState } from "react";
import { Filter, Search, Sliders } from "lucide-react";
import { TaskList } from "@/components/tasks/task-list";
import { TaskFilters } from "@/components/tasks/task-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TasksPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    platform: "all",
    taskType: "all",
    reward: "all",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Available Tasks</h1>
        
        <div className="flex space-x-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="task-search"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            data-testid="filter-button"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <TaskFilters 
          activeFilters={activeFilters} 
          setActiveFilters={setActiveFilters} 
          onClose={() => setShowFilters(false)} 
        />
      )}
      
      <TaskList searchQuery={searchQuery} filters={activeFilters} />
    </div>
  );
}