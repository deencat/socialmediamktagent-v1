import { test, expect } from '@playwright/test';

test.describe('Dashboard Widgets', () => {
  test.beforeEach(async ({ page }) => {
    // Go to dashboard page
    await page.goto('/dashboard');
  });

  test('Quick Actions Widget displays correctly', async ({ page }) => {
    // Check that the widget exists
    const widget = page.locator('[id="quick-actions"]');
    await expect(widget).toBeVisible();
    
    // Check title
    const title = widget.locator('h3:has-text("Quick Actions")');
    await expect(title).toBeVisible();
    
    // Check that all action buttons are visible
    await expect(page.locator('[data-testid="quick-action-action-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="quick-action-action-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="quick-action-action-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="quick-action-action-4"]')).toBeVisible();
    
    // Check content of the first action button
    const firstAction = page.locator('[data-testid="quick-action-action-1"]');
    await expect(firstAction).toContainText('Create Post');
    
    // Test clicking a button (this will navigate to another page)
    await firstAction.click();
    await expect(page).toHaveURL(/\/content\/create/);
  });

  test('Recent Activity Widget displays correctly with interactive elements', async ({ page }) => {
    // Check that the widget exists
    const widget = page.locator('[id="recent-activity"]');
    await expect(widget).toBeVisible();
    
    // Check title
    const title = widget.locator('h3:has-text("Recent Activity")');
    await expect(title).toBeVisible();
    
    // Check that activity items are displayed
    await expect(page.locator('[data-testid="activity-activity-1"]')).toBeVisible();
    
    // Check for filter button
    const filterButton = widget.locator('button >> .lucide-filter');
    await expect(filterButton).toBeVisible();
    
    // Test filter functionality
    await filterButton.click();
    
    // Dialog should appear
    const filterDialog = page.locator('div[role="dialog"]');
    await expect(filterDialog).toBeVisible();
    
    // Check that dialog has filter options
    await expect(filterDialog.locator('button:has-text("Instagram")')).toBeVisible();
    await expect(filterDialog.locator('button:has-text("LinkedIn")')).toBeVisible();
    await expect(filterDialog.locator('button:has-text("Twitter")')).toBeVisible();
    await expect(filterDialog.locator('button:has-text("Facebook")')).toBeVisible();
    
    // Test filtering
    await filterDialog.locator('button:has-text("Twitter")').click();
    await filterDialog.locator('button:has-text("Apply Filter")').click();
    
    // Should show only Twitter activities
    await expect(page.locator('[data-testid="activity-activity-3"]')).toBeVisible();
    
    // Reset filter
    await filterButton.click();
    await filterDialog.locator('button:has-text("All")').click();
    await filterDialog.locator('button:has-text("Apply Filter")').click();
    
    // Test activity detail dialog
    await page.locator('[data-testid="activity-activity-1"]').click();
    
    // Activity detail dialog should appear
    const activityDialog = page.locator('div[role="dialog"]');
    await expect(activityDialog).toBeVisible();
    
    // Check that dialog has activity details
    await expect(activityDialog.locator('h2:has-text("Instagram Activity")')).toBeVisible();
    
    // Check for metrics in the detail dialog
    await expect(activityDialog.locator('text=Likes')).toBeVisible();
    await expect(activityDialog.locator('text=Comments')).toBeVisible();
    
    // Close dialog
    await activityDialog.locator('button:has-text("Close")').click();
    
    // Check "View all" button is present
    const viewAllButton = page.locator('[data-testid="view-all-activity-button"]');
    await expect(viewAllButton).toBeVisible();
    await expect(viewAllButton).toContainText('View all activity');
  });
  
  test('Widget drag and drop functionality works', async ({ page }) => {
    // Identify widgets
    const quickActionsWidget = page.locator('[id="quick-actions"]');
    const recentActivityWidget = page.locator('[id="recent-activity"]');
    
    // Get initial positions
    const initialQuickActionsBox = await quickActionsWidget.boundingBox();
    const initialRecentActivityBox = await recentActivityWidget.boundingBox();
    
    // Perform drag and drop
    await quickActionsWidget.dragTo(recentActivityWidget);
    
    // Wait for animation to complete
    await page.waitForTimeout(500);
    
    // Check that positions have changed
    const newQuickActionsBox = await quickActionsWidget.boundingBox();
    const newRecentActivityBox = await recentActivityWidget.boundingBox();
    
    // This is a simplified check - in a real test you might need to be more specific
    // about exactly how the positions should change
    expect(
      initialQuickActionsBox.x !== newQuickActionsBox.x || 
      initialQuickActionsBox.y !== newQuickActionsBox.y
    ).toBeTruthy();
  });
}); 