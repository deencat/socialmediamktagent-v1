# Social Media Marketing Agent - Component Library Plan

## Overview

This document outlines the component library structure for the Social Media Marketing Agent platform. It provides a comprehensive list of UI components that need to be developed, organized by category and priority.

## Core Components

These foundational components will be used throughout the application and should be developed first.

### Layout Components

1. **AppShell**
   - Main application container with responsive layout
   - Handles sidebar/bottom navigation switching based on screen size
   - Contains header, main content area, and navigation

2. **Sidebar**
   - Vertical navigation for desktop/tablet
   - Collapsible on smaller screens
   - Contains logo, navigation links, and user profile

3. **BottomNavBar**
   - Mobile navigation bar
   - Contains icon buttons for main sections
   - Highlights active section

4. **Header**
   - Contains search, notifications, and user menu
   - Responsive design for all screen sizes
   - Optional breadcrumb navigation

5. **DashboardGrid**
   - Responsive grid layout for dashboard widgets
   - Supports drag-and-drop rearrangement
   - Adjusts columns based on screen size

6. **WidgetContainer**
   - Standard container for dashboard widgets
   - Includes header, content area, and optional footer
   - Supports expand/collapse functionality

### Authentication Components

1. **LoginForm**
   - Email/password login fields
   - Social login buttons
   - Form validation and error handling

2. **RegistrationForm**
   - User registration fields
   - Role selection (SME, Service Provider)
   - Multi-step form with progress indicator

3. **OnboardingWizard**
   - Step-by-step onboarding process
   - Different flows based on user role
   - Progress indicator and navigation controls

4. **SocialAccountLinking**
   - Interface for connecting Instagram/Threads accounts
   - OAuth flow visualization
   - Connected accounts management

### Common UI Elements

1. **Button**
   - Primary, secondary, tertiary variants
   - Icon buttons
   - Loading state
   - Disabled state

2. **Input**
   - Text input
   - Number input
   - Textarea
   - Form validation integration

3. **Select**
   - Dropdown select
   - Multi-select
   - Searchable select

4. **Modal**
   - Standard modal dialog
   - Confirmation modal
   - Form modal
   - Full-screen modal for mobile

5. **Toast**
   - Success, error, warning, info variants
   - Auto-dismiss functionality
   - Action buttons

6. **Tabs**
   - Horizontal tabs
   - Vertical tabs
   - Mobile-friendly tab navigation

7. **Card**
   - Basic card layout
   - Interactive card
   - Card with media
   - Loading state

8. **Badge**
   - Status badges
   - Counter badges
   - Achievement badges

9. **Avatar**
   - User avatar
   - Brand avatar
   - Avatar group

10. **Tooltip**
    - Information tooltip
    - Action tooltip
    - Placement options

## Feature-Specific Components

These components are specific to certain features of the application.

### Dashboard Widgets

1. **AnalyticsWidget**
   - Summary metrics
   - Mini charts
   - Period selector
   - Drill-down capability

2. **ContentCalendarWidget**
   - Monthly/weekly view
   - Post previews
   - Drag-and-drop scheduling
   - Quick actions

3. **TaskFeedWidget**
   - List of available tasks
   - Task filtering and sorting
   - Quick accept functionality
   - Empty state

4. **PointsBalanceWidget**
   - Current points balance
   - Recent transactions
   - Points history chart
   - Redemption shortcuts

5. **AccountHealthWidget**
   - Health status indicator
   - Safety tips
   - Activity limits
   - Warning notifications

6. **QuickActionsWidget**
   - Frequently used actions
   - Personalized suggestions
   - Shortcut buttons

7. **RecentActivityWidget**
   - Timeline of recent activities
   - Filterable by type
   - Interactive items

8. **AchievementsWidget**
   - Earned badges
   - Progress towards next achievements
   - Leaderboard position

### Content Management

1. **ContentCreationForm**
   - Multi-platform content editor
   - Media upload/preview
   - Hashtag suggestions
   - Scheduling options

2. **ContentCalendar**
   - Full-screen calendar view
   - Day, week, month views
   - Content scheduling interface
   - Drag-and-drop functionality

3. **PostPreviewCard**
   - Platform-specific post preview
   - Edit/delete actions
   - Scheduling information
   - Performance metrics

4. **HashtagSelector**
   - Hashtag search and selection
   - Trending hashtags
   - Custom hashtag input
   - Saved hashtag groups

5. **MediaUploader**
   - Image/video upload
   - Preview functionality
   - Basic editing tools
   - Gallery selection

### Task Management

1. **TaskCard**
   - Task details
   - Accept/complete actions
   - Points reward
   - Time remaining

2. **TaskDetailModal**
   - Comprehensive task information
   - Step-by-step instructions
   - Submission form
   - Related tasks

3. **TaskFilterBar**
   - Filter by type, reward, platform
   - Sort options
   - Search functionality
   - Save filter presets

4. **TaskCompletionForm**
   - Proof of completion upload
   - Verification steps
   - Submission confirmation

### Rewards Marketplace

1. **RewardCard**
   - Reward details
   - Points cost
   - Availability status
   - Redeem action

2. **RewardCatalog**
   - Grid/list of available rewards
   - Category filters
   - Search functionality
   - Sort options

3. **RedemptionModal**
   - Confirmation details
   - Points balance check
   - Delivery information
   - Success/failure states

4. **TransactionHistoryTable**
   - List of past transactions
   - Filtering and sorting
   - Transaction details
   - Export functionality

### Analytics & Reporting

1. **MetricCard**
   - Key metric display
   - Trend indicator
   - Comparison to previous period
   - Mini chart

2. **AnalyticsChart**
   - Line, bar, area charts
   - Interactive tooltips
   - Time period selection
   - Data export

3. **PerformanceTable**
   - Tabular data display
   - Sorting and filtering
   - Pagination
   - Export functionality

4. **ReportGenerator**
   - Report template selection
   - Customization options
   - Preview functionality
   - Export/schedule options

### Campaign Management

1. **CampaignCard**
   - Campaign summary
   - Status indicator
   - Key metrics
   - Quick actions

2. **CampaignCreationWizard**
   - Multi-step campaign setup
   - Goal selection
   - Budget allocation
   - Target audience definition

3. **BudgetAllocator**
   - Visual budget distribution
   - Drag-and-drop adjustment
   - ROI projections
   - Spend tracking

4. **CampaignPerformanceDashboard**
   - Campaign-specific analytics
   - Goal tracking
   - Budget utilization
   - Optimization suggestions

### Community & Gamification

1. **ForumThread**
   - Thread title and content
   - Replies and interactions
   - Author information
   - Moderation actions

2. **LeaderboardTable**
   - Ranking display
   - User scores
   - Position changes
   - Category filters

3. **AchievementCard**
   - Badge display
   - Achievement description
   - Unlock date
   - Progress for locked achievements

4. **StreakTracker**
   - Visual streak display
   - Daily checkmarks
   - Streak rewards
   - Recovery options

5. **QuestCard**
   - Quest description
   - Progress tracking
   - Reward information
   - Time remaining

## Component Development Priority

### Phase 1 Priority

1. AppShell
2. Sidebar
3. BottomNavBar
4. Header
5. LoginForm
6. RegistrationForm
7. Button
8. Input
9. Select
10. Modal
11. Toast
12. Card
13. WidgetContainer
14. DashboardGrid

### Phase 2 Priority

1. ContentCalendarWidget
2. AnalyticsWidget
3. QuickActionsWidget
4. RecentActivityWidget
5. ContentCreationForm
6. ContentCalendar
7. PostPreviewCard
8. HashtagSelector
9. MediaUploader
10. OnboardingWizard

### Phase 3 Priority

1. TaskFeedWidget
2. PointsBalanceWidget
3. AccountHealthWidget
4. AchievementsWidget
5. TaskCard
6. TaskDetailModal
7. TaskFilterBar
8. TaskCompletionForm
9. RewardCard
10. RewardCatalog
11. RedemptionModal
12. TransactionHistoryTable

### Phase 4 Priority

1. CampaignCard
2. CampaignCreationWizard
3. BudgetAllocator
4. CampaignPerformanceDashboard
5. MetricCard
6. AnalyticsChart
7. PerformanceTable
8. ReportGenerator

### Phase 5 Priority

1. ForumThread
2. LeaderboardTable
3. AchievementCard
4. StreakTracker
5. QuestCard
6. SocialAccountLinking

## Component Documentation Template

Each component should be documented using the following template:

```markdown
# ComponentName

## Description
Brief description of the component and its purpose.

## Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | '' | Description of prop1 |
| prop2 | boolean | false | Description of prop2 |
| ... | ... | ... | ... |

## Usage Examples
```tsx
// Basic usage
<ComponentName prop1="value" prop2={true} />

// Advanced usage
<ComponentName
  prop1="value"
  prop2={true}
  onEvent={() => console.log('Event triggered')}
/>
```

## Variants
- **Variant 1**: Description of variant 1
- **Variant 2**: Description of variant 2

## Accessibility
Accessibility considerations and ARIA attributes used.

## Dependencies
List of dependencies or related components.

## Notes
Any additional information, edge cases, or limitations.
```

## Next Steps

1. Set up the component library structure in the project
2. Create a storybook or component showcase page
3. Begin implementing Phase 1 components
4. Document each component as it's developed
5. Create Playwright tests for each component