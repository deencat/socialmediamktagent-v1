"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentItemProps {
  title: string;
  engagement: string;
  reach: string;
  change: number;
  className?: string;
}

export function ContentItem({
  title,
  engagement,
  reach,
  change,
  className,
}: ContentItemProps) {
  const isPositive = change >= 0;

  return (
    <div className={cn("flex items-center justify-between p-3 rounded-md border", className)}>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{engagement}</p>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm font-medium">{reach}</div>
        <div
          className={cn(
            "text-xs flex items-center gap-1",
            isPositive ? "text-green-500" : "text-red-500"
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {isPositive ? "+" : ""}
          {change}%
        </div>
      </div>
    </div>
  );
} 