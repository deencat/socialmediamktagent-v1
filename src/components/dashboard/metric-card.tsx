"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniChart, DataPoint } from "./mini-chart";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  data: DataPoint[];
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  data,
  prefix = "",
  suffix = "",
  className,
}: MetricCardProps) {
  const isPositive = change >= 0;
  const formattedValue = typeof value === "number" && !isNaN(value) ? value.toLocaleString() : value;

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="text-2xl font-bold">
          {prefix}
          {formattedValue}
          {suffix}
        </div>
        <div className="flex items-center mt-1">
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
            {change}% from last month
          </div>
        </div>
        <div className="h-12 mt-3">
          <MiniChart 
            data={data}
            height={40}
            strokeColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
            fillColor={isPositive ? "hsl(var(--success) / 0.2)" : "hsl(var(--destructive) / 0.2)"}
            tooltip={false}
          />
        </div>
      </CardContent>
    </Card>
  );
} 