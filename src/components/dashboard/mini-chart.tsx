"use client";

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

export interface DataPoint {
  name: string;
  value: number;
}

interface MiniChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
  tooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export function MiniChart({
  data,
  height = 80,
  className,
  strokeColor = "hsl(var(--primary))",
  fillColor = "hsl(var(--primary) / 0.2)",
  tooltip = true,
  showXAxis = false,
  showYAxis = false,
}: MiniChartProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          {showXAxis && (
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
          )}
          {tooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-muted-foreground">
                            {payload[0].payload.name}
                          </span>
                          <span className="text-sm font-bold">
                            {payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            fill={fillColor}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 