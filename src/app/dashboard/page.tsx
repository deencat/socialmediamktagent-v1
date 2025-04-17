"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ContentCalendarWidget } from "@/components/dashboard/content-calendar-widget";
import { EngagementStatsWidget } from "@/components/dashboard/engagement-stats-widget";
import { CampaignLauncherWidget } from "@/components/dashboard/campaign-launcher-widget";
import { AnalyticsOverviewWidget } from "@/components/dashboard/analytics-overview-widget";
import { RecentActivityWidget } from "@/components/dashboard/recent-activity-widget";
import { DashboardGrid, WidgetItem } from "@/components/dashboard/dashboard-grid";
import { WidgetContainer } from "@/components/dashboard/widget-container";
import { WidgetConfigModal } from "@/components/dashboard/widget-config-modal";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<WidgetItem | null>(null);

  // Initial dashboard widgets
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    {
      id: "analytics-overview",
      width: "medium",
      component: (
        <WidgetContainer 
          id="analytics-overview" 
          title="Analytics Overview"
          onConfigure={() => handleConfigureWidget("analytics-overview")}
          onRemove={() => handleRemoveWidget("analytics-overview")}
        >
          <AnalyticsOverviewWidget />
        </WidgetContainer>
      ),
    },
    {
      id: "engagement-stats",
      width: "small",
      component: (
        <WidgetContainer 
          id="engagement-stats" 
          title="Engagement Stats"
          onConfigure={() => handleConfigureWidget("engagement-stats")}
          onRemove={() => handleRemoveWidget("engagement-stats")}
        >
          <EngagementStatsWidget />
        </WidgetContainer>
      ),
    },
    {
      id: "content-calendar",
      width: "medium",
      component: (
        <WidgetContainer 
          id="content-calendar" 
          title="Content Calendar"
          onConfigure={() => handleConfigureWidget("content-calendar")}
          onRemove={() => handleRemoveWidget("content-calendar")}
        >
          <ContentCalendarWidget />
        </WidgetContainer>
      ),
    },
    {
      id: "recent-activity",
      width: "small",
      component: (
        <WidgetContainer 
          id="recent-activity" 
          title="Recent Activity"
          onConfigure={() => handleConfigureWidget("recent-activity")}
          onRemove={() => handleRemoveWidget("recent-activity")}
        >
          <RecentActivityWidget />
        </WidgetContainer>
      ),
    },
    {
      id: "campaign-launcher",
      width: "small",
      component: (
        <WidgetContainer 
          id="campaign-launcher" 
          title="Campaign Launcher"
          onConfigure={() => handleConfigureWidget("campaign-launcher")}
          onRemove={() => handleRemoveWidget("campaign-launcher")}
        >
          <CampaignLauncherWidget />
        </WidgetContainer>
      ),
    },
  ]);

  // Handle widget configuration
  const handleConfigureWidget = (widgetId: string) => {
    const widget = widgets.find((w) => w.id === widgetId);
    if (widget) {
      setSelectedWidget(widget);
      setConfigModalOpen(true);
    }
  };

  // Handle widget removal
  const handleRemoveWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== widgetId));
  };

  // Save widget configuration
  const handleSaveWidgetConfig = (widgetId: string, config: { width: WidgetItem["width"] }) => {
    setWidgets((prev) =>
      prev.map((widget) => {
        if (widget.id === widgetId) {
          return {
            ...widget,
            width: config.width,
          };
        }
        return widget;
      })
    );
  };

  return (
    <div className="space-y-6">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "overview" && (
        <>
          <div className="flex justify-end mb-4">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Widget
            </Button>
          </div>
          
          <DashboardGrid widgets={widgets} onWidgetsChange={setWidgets} />
          
          <WidgetConfigModal
            open={configModalOpen}
            onOpenChange={setConfigModalOpen}
            widget={selectedWidget}
            onSave={handleSaveWidgetConfig}
          />
        </>
      )}
      
      {activeTab === "content" && (
        <div className="space-y-6">
          <ContentCalendarWidget fullWidth />
        </div>
      )}
      
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <CampaignLauncherWidget fullWidth />
        </div>
      )}
      
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <AnalyticsOverviewWidget fullWidth />
        </div>
      )}
    </div>
  );
}