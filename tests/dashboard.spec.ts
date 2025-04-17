import { test, expect } from '@playwright/test';

// Using test.skip to avoid running these tests until we have a proper test environment
test.describe.skip('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard
    // Use a relative URL to work with baseURL in playwright.config.ts
    await page.goto('/dashboard');
  });

  test('should display dashboard with widgets', async ({ page }) => {
    // Verify page title
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Verify all initial widgets are present
    await expect(page.getByText('Analytics Overview')).toBeVisible();
    await expect(page.getByText('Engagement Stats')).toBeVisible();
    await expect(page.getByText('Content Calendar')).toBeVisible();
    await expect(page.getByText('Recent Activity')).toBeVisible();
    await expect(page.getByText('Campaign Launcher')).toBeVisible();
  });

  test('should open widget configuration modal', async ({ page }) => {
    // Find the first widget settings button and click it
    const settingsButtons = page.getByRole('button').filter({ has: page.locator('svg[data-lucide="Settings"]') });
    await settingsButtons.first().click();
    
    // Verify configuration modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Widget Configuration')).toBeVisible();
    
    // Verify width options are available
    await expect(page.getByText('Small (1 column)')).toBeVisible();
    await expect(page.getByText('Medium (2 columns)')).toBeVisible();
    await expect(page.getByText('Large (3 columns)')).toBeVisible();
    await expect(page.getByText('Full width')).toBeVisible();
    
    // Close the modal
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should allow widget removal', async ({ page }) => {
    // Count initial widgets
    const initialWidgetCount = await page.locator('.grid > div').count();
    
    // Find the first widget remove button and click it
    const removeButtons = page.getByRole('button').filter({ has: page.locator('svg[data-lucide="X"]') });
    await removeButtons.first().click();
    
    // Verify widget count is reduced
    await expect(await page.locator('.grid > div').count()).toBe(initialWidgetCount - 1);
  });

  test('should navigate between dashboard tabs', async ({ page }) => {
    // Default view should be overview with widgets
    await expect(page.getByText('Add Widget')).toBeVisible();
    
    // Navigate to Content tab
    await page.getByRole('tab', { name: 'Content' }).click();
    await expect(page.getByText('Add Widget')).not.toBeVisible();
    await expect(page.getByText('Content Calendar')).toBeVisible();
    
    // Navigate to Campaigns tab
    await page.getByRole('tab', { name: 'Campaigns' }).click();
    await expect(page.getByText('Add Widget')).not.toBeVisible();
    await expect(page.getByText('Campaign Launcher')).toBeVisible();
    
    // Navigate to Analytics tab
    await page.getByRole('tab', { name: 'Analytics' }).click();
    await expect(page.getByText('Add Widget')).not.toBeVisible();
    await expect(page.getByText('Analytics Overview')).toBeVisible();
    
    // Navigate back to Overview
    await page.getByRole('tab', { name: 'Overview' }).click();
    await expect(page.getByText('Add Widget')).toBeVisible();
  });
}); 