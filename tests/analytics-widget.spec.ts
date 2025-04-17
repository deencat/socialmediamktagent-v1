import { test, expect } from '@playwright/test';

test.describe('Analytics Overview Widget', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard which contains the widget
    await page.goto('/dashboard');
  });

  test('should display analytics widget with key metrics', async ({ page }) => {
    // Check that the widget title is displayed
    await expect(page.getByText('Analytics Overview')).toBeVisible();
    
    // Check that platform tabs are displayed
    await expect(page.getByRole('tab', { name: 'Instagram' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Threads' })).toBeVisible();
    
    // Check that key metrics are displayed
    await expect(page.getByText('Followers')).toBeVisible();
    await expect(page.getByText('Engagement Rate')).toBeVisible();
    await expect(page.getByText('Avg. Reach')).toBeVisible();
    
    // Check that top content section is displayed
    await expect(page.getByText('Top Performing Content')).toBeVisible();
  });

  test('should switch between platforms', async ({ page }) => {
    // Default platform is Instagram, check that Instagram-specific content is visible
    await expect(page.getByText('Summer collection showcase')).toBeVisible();
    
    // Switch to Threads
    await page.getByRole('tab', { name: 'Threads' }).click();
    
    // Check that Threads-specific content is visible
    await expect(page.getByText('Industry insights thread')).toBeVisible();
    
    // Switch back to Instagram
    await page.getByRole('tab', { name: 'Instagram' }).click();
    
    // Check that Instagram-specific content is visible again
    await expect(page.getByText('Summer collection showcase')).toBeVisible();
  });

  test('should change time period', async ({ page }) => {
    // Open the period selector
    await page.getByRole('combobox').click();
    
    // Select a different period
    await page.getByRole('option', { name: '30 days' }).click();
    
    // Check that the selected period is applied
    await expect(page.getByRole('combobox')).toHaveValue('30d');
    
    // Change to another period
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: '7 days' }).click();
    
    // Check that the selected period is applied
    await expect(page.getByRole('combobox')).toHaveValue('7d');
  });

  test('should display demographics chart with tabs', async ({ page }) => {
    // Check that demographics chart is visible
    await expect(page.getByText('Audience Demographics')).toBeVisible();
    
    // Check that demographic tabs are available
    await expect(page.getByRole('tab', { name: 'Age' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Location' })).toBeVisible();
    
    // Switch to Gender tab and check content
    await page.locator('text=Gender').click();
    
    // Switch to Location tab and check content
    await page.locator('text=Location').click();
  });
}); 