"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ContentCalendarWidget } from "@/components/dashboard/content-calendar-widget";
import { EngagementStatsWidget } from "@/components/dashboard/engagement-stats-widget";
import { CampaignLauncherWidget } from "@/components/dashboard/campaign-launcher-widget";
import { AnalyticsOverviewWidget } from "@/components/dashboard/analytics-overview-widget";
import { RecentActivityWidget } from "@/components/dashboard/recent-activity-widget";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EngagementStatsWidget />
          </div>
          <div className="">
            <CampaignLauncherWidget />
          </div>
          <div className="lg:col-span-2">
            <ContentCalendarWidget />
          </div>
          <div className="">
            <RecentActivityWidget />
          </div>
          <div className="lg:col-span-3">
            <AnalyticsOverviewWidget />
          </div>
        </div>
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