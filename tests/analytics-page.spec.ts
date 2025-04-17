import { test, expect } from '@playwright/test';

// Using test.skip to avoid running these tests until we have a proper test environment
test.describe.skip('Analytics Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the analytics page
    await page.goto('/analytics');
  });

  test('should display analytics page with heading and time period selector', async ({ page }) => {
    // Check that the page title is displayed
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();
    
    // Check that time period selector is present
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('should display platform tabs and allow switching', async ({ page }) => {
    // Check that platform tabs are visible
    await expect(page.getByRole('tab', { name: 'Instagram' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Threads' })).toBeVisible();
    
    // Default should be Instagram
    await expect(page.getByRole('tab', { name: 'Instagram' })).toHaveAttribute('data-state', 'active');
    
    // Switch to Threads
    await page.getByRole('tab', { name: 'Threads' }).click();
    await expect(page.getByRole('tab', { name: 'Threads' })).toHaveAttribute('data-state', 'active');
    
    // Switch back to Instagram
    await page.getByRole('tab', { name: 'Instagram' }).click();
    await expect(page.getByRole('tab', { name: 'Instagram' })).toHaveAttribute('data-state', 'active');
  });

  test('should display key metric cards', async ({ page }) => {
    // Check that key metrics are displayed
    await expect(page.getByText('Total Followers')).toBeVisible();
    await expect(page.getByText('Engagement Rate')).toBeVisible();
    await expect(page.getByText('Reach')).toBeVisible();
    await expect(page.getByText('Impressions')).toBeVisible();
  });

  test('should display audience insights section', async ({ page }) => {
    // Check that audience insights section is displayed
    await expect(page.getByText('Audience Insights')).toBeVisible();
    
    // Check audience demographic tabs
    await expect(page.getByRole('tab', { name: 'Age' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Location' })).toBeVisible();
    
    // Switch tabs and verify they change content
    await page.getByRole('tab', { name: 'Gender' }).click();
    await expect(page.getByRole('tab', { name: 'Gender' })).toHaveAttribute('data-state', 'active');
    
    await page.getByRole('tab', { name: 'Location' }).click();
    await expect(page.getByRole('tab', { name: 'Location' })).toHaveAttribute('data-state', 'active');
    
    await page.getByRole('tab', { name: 'Age' }).click();
    await expect(page.getByRole('tab', { name: 'Age' })).toHaveAttribute('data-state', 'active');
  });

  test('should display content performance section', async ({ page }) => {
    // Check that content performance section is displayed
    await expect(page.getByText('Content Performance')).toBeVisible();
    
    // Check that posts are displayed and can be interacted with
    const postCards = page.locator('.post-card');
    await expect(postCards.first()).toBeVisible();
    
    // Check that interaction metrics are shown for posts
    await expect(page.getByText('Likes')).toBeVisible();
    await expect(page.getByText('Comments')).toBeVisible();
    await expect(page.getByText('Shares')).toBeVisible();
  });

  test('should download reports', async ({ page }) => {
    // Find and click the download report button
    const downloadButton = page.getByRole('button', { name: 'Download Report' });
    await expect(downloadButton).toBeVisible();
    
    // Click download button (not checking actual download as it would be mocked in testing env)
    await downloadButton.click();
  });
}); 