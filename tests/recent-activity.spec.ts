import { test, expect } from '@playwright/test';

test.describe('Recent Activity Widget', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard page before each test
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should load the recent activity widget correctly', async ({ page }) => {
    // Check widget title
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible();
    
    // Check widget description
    await expect(page.getByText('Latest updates from your accounts')).toBeVisible();
    
    // Check that we have activities displayed
    await expect(page.locator('[data-testid^="activity-"]').first()).toBeVisible();
  });

  test('should show activity details when clicking on an activity', async ({ page }) => {
    // Click on the first activity
    await page.locator('[data-testid^="activity-"]').first().click();
    
    // Check that the dialog is visible
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Check that the dialog contains activity details
    await expect(page.getByRole('dialog').locator('h4').first()).toBeVisible();
    
    // Close the dialog
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
  });

  test('should filter activities by platform', async ({ page }) => {
    // Open the filter dialog
    await page.getByRole('button', { name: 'Filter' }).click();
    
    // Check that the filter dialog is visible
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Filter Activities')).toBeVisible();
    
    // Select Instagram filter
    await page.getByRole('tab', { name: 'Instagram' }).click();
    
    // Apply filter
    await page.getByRole('button', { name: 'Apply Filter' }).click();
    
    // Check that the dialog closes
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
    
    // Now check that visible activities are from Instagram
    const activities = await page.locator('[data-testid^="activity-"]').all();
    
    // If there are visible activities, check they're from Instagram
    for (const activity of activities) {
      const platformText = await activity.locator('.text-xs.text-muted-foreground').first().textContent();
      expect(platformText).toBe('Instagram');
    }
  });

  test('should show metrics when available in activity details', async ({ page }) => {
    // Click on the first activity (which should have metrics)
    await page.locator('[data-testid^="activity-"]').first().click();
    
    // Check that the dialog is visible
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Check that metrics section is present
    await expect(page.getByText('Metrics')).toBeVisible();
    
    // Check that at least one metric value is visible
    await expect(page.getByRole('dialog').locator('.text-xl.font-semibold').first()).toBeVisible();
    
    // Close the dialog
    await page.getByRole('button', { name: 'Close' }).click();
  });
}); 