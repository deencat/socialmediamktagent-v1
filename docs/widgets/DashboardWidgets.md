# Dashboard Widgets Documentation

This document provides detailed information about the dashboard widgets implemented in the Social Media Marketing Agent platform.

## Widget System Overview

The dashboard features a flexible widget system with the following capabilities:
- Drag-and-drop widget repositioning
- Widget size configuration (small, medium, large)
- Widget removal and addition
- Widget configuration through a modal interface

All widgets are implemented as React components and use Shadcn UI for consistent styling.

## Core Widgets

### Analytics Overview Widget

**Purpose:** Provides at-a-glance analytics data for social media performance.

**Features:**
- Mini charts for key metrics
- Period selection (day, week, month)
- Platform filtering
- Responsive design for all screen sizes

**Implementation:** `src/components/dashboard/analytics-overview-widget.tsx`

### Content Calendar Widget

**Purpose:** Shows upcoming scheduled content in a calendar view.

**Features:**
- Monthly/weekly calendar view
- Post preview cards
- Drag-and-drop scheduling
- Quick action buttons

**Implementation:** `src/components/dashboard/content-calendar-widget.tsx`

### Quick Actions Widget

**Purpose:** Provides easy access to common tasks and actions.

**Features:**
- Colorful action buttons with icons
- Direct navigation to key sections of the app
- Visual emphasis on primary actions
- Responsive grid layout

**Implementation Details:**
- Located at: `src/components/dashboard/quick-actions-widget.tsx`
- Each action includes:
  - An icon (using Lucide icons)
  - Action title
  - Navigation link
  - Colorful badge indicator
- Actions are rendered in a responsive 2-column grid
- Uses the Link component for client-side navigation
- Includes data-testid attributes for Playwright testing

**Data Structure:**
```typescript
{
  id: string;          // Unique identifier
  title: string;       // Action name
  icon: ReactNode;     // Lucide icon component
  path: string;        // Navigation path
  color: string;       // Badge color class
}
```

**Usage Example:**
```jsx
<QuickActionsWidget fullWidth={false} />
```

### Recent Activity Widget

**Purpose:** Displays recent activities and events from connected social media platforms.

**Features:**
- Platform filtering (All, Instagram, LinkedIn, Twitter, Facebook)
- Interactive activity items with detail dialogs
- Platform-specific icons with brand colors
- Activity type badges with visual indication
- Detailed metrics and information in expandable dialogs
- Empty state for when no activities match filters
- Relative timestamp formatting

**Implementation Details:**
- Located at: `src/components/dashboard/recent-activity-widget.tsx`
- Each activity includes:
  - Platform icon with brand color
  - Description
  - Type badge (Published, Milestone, Spike, Scheduled)
  - Relative timestamp
  - Detailed metrics when available
- Uses dialog component for detailed view
- Implements filtering using React state
- Formats timestamps using date-fns
- Includes comprehensive Playwright tests

**Data Structure:**
```typescript
interface Activity {
  id: string;
  type: string;        // post_published, follower_milestone, etc.
  platform: string;    // Instagram, LinkedIn, Twitter, Facebook
  description: string;
  timestamp: string;   // ISO date string
  metrics?: {
    likes?: number;
    comments?: number;
    shares?: number;
    increase?: number;
    percentageChange?: number;
  };
  scheduledFor?: string; // ISO date string for scheduled posts
}
```

**Usage Example:**
```jsx
<RecentActivityWidget fullWidth={false} />
```

### Engagement Stats Widget

**Purpose:** Shows detailed engagement statistics for social media content.

**Features:**
- Visual metrics for engagement rates
- Trend indicators
- Platform comparison
- Responsive design

**Implementation:** `src/components/dashboard/engagement-stats-widget.tsx`

## Widget Container

All widgets are wrapped in a container component that provides:
- Consistent styling
- Drag handle for repositioning
- Configuration and removal buttons
- Title and optional description

**Implementation:** `src/components/dashboard/widget-container.tsx`

## Dashboard Grid

The dashboard grid manages the layout and positioning of widgets:

**Features:**
- Responsive grid layout
- Widget size management
- Drag-and-drop capabilities
- Widget repositioning

**Implementation:** `src/components/dashboard/dashboard-grid.tsx`

## Adding New Widgets

To add a new widget to the dashboard:

1. Create a new component file in `src/components/dashboard/`
2. Implement the widget component with appropriate props
3. Add the widget to the initial widgets array in `src/app/dashboard/page.tsx`
4. Create Playwright tests for the new widget
5. Update this documentation

## Testing

All widgets have comprehensive Playwright tests that verify:
- Proper rendering
- Interactive behavior
- Responsive design
- Data display

Test files are located in the `tests/` directory.

## Future Enhancements

Planned improvements for the dashboard widgets:
- Customizable widget themes
- User-specific widget preferences saved in memory
- Additional filtering options for activity and analytics
- Real-time updates for the activity feed
- More detailed metrics visualizations 