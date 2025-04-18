import { test, expect } from '@playwright/test';

test.describe('Multi-Platform Content Editor', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the content creation page
    await page.goto('/content/create');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title and components', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Create Content/);
    
    // Check main components are present
    await expect(page.getByText('Create New Content')).toBeVisible();
    await expect(page.getByText('Content Editor')).toBeVisible();
    await expect(page.getByText('Publishing Settings')).toBeVisible();
    await expect(page.getByText('AI Suggestions')).toBeVisible();
    
    // Check tabs exist
    await expect(page.getByRole('tab', { name: 'General Editor' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Platform Specific' })).toBeVisible();
  });

  test('should handle content input and character limits', async ({ page }) => {
    // Enter title
    await page.getByTestId('content-title-input').fill('Test Content Title');
    
    // Enter content text
    const content = 'This is a test content for social media post.';
    await page.getByTestId('content-text-input').fill(content);
    
    // Check character count is displayed
    await expect(page.getByText(`${content.length}/2200`)).toBeVisible();
    
    // Enter very long text to test character limit indicator
    const longText = 'A'.repeat(2150);
    await page.getByTestId('content-text-input').fill(longText);
    
    // Should show warning color for character count (yellow)
    const characterCount = await page.locator('.text-yellow-500');
    await expect(characterCount).toBeVisible();
  });

  test('should handle platform selection and platform-specific content', async ({ page }) => {
    // Select Facebook platform (Instagram is selected by default)
    await page.getByTestId('platform-facebook').click();
    
    // Switch to platform-specific tab
    await page.getByRole('tab', { name: 'Platform Specific' }).click();
    
    // Check both Instagram and Facebook editors are present
    // Use more specific selectors to avoid ambiguity
    await expect(page.locator('.space-y-2.border.p-4 h3').filter({ hasText: 'Instagram' })).toBeVisible();
    await expect(page.locator('.space-y-2.border.p-4 h3').filter({ hasText: 'Facebook' })).toBeVisible();
    
    // Enter different content for Instagram
    await page.getByTestId('instagram-content-input').fill('Instagram specific content');
    
    // Enter different content for Facebook
    await page.getByTestId('facebook-content-input').fill('Facebook specific content');
    
    // Remove Instagram platform
    await page.getByRole('tab', { name: 'General Editor' }).click();
    await page.getByTestId('platform-instagram').click();
    
    // Go back to platform specific tab and check Instagram editor is gone
    await page.getByRole('tab', { name: 'Platform Specific' }).click();
    await expect(page.locator('.space-y-2.border.p-4 h3').filter({ hasText: 'Instagram' })).not.toBeVisible();
    await expect(page.locator('.space-y-2.border.p-4 h3').filter({ hasText: 'Facebook' })).toBeVisible();
  });

  test('should handle hashtag management', async ({ page }) => {
    // Add a hashtag
    await page.getByTestId('hashtag-input').fill('testtag');
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Check hashtag is displayed using data-testid
    await expect(page.getByTestId('hashtag-testtag')).toBeVisible();
    
    // Add another hashtag
    await page.getByTestId('hashtag-input').fill('anothertag');
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Check both hashtags are displayed
    await expect(page.getByTestId('hashtag-testtag')).toBeVisible();
    await expect(page.getByTestId('hashtag-anothertag')).toBeVisible();
    
    // Remove the first hashtag using its remove button
    await page.getByTestId('remove-hashtag-testtag').click();
    
    // Check first hashtag is removed and second remains
    await expect(page.getByTestId('hashtag-testtag')).not.toBeVisible();
    await expect(page.getByTestId('hashtag-anothertag')).toBeVisible();
    
    // Add hashtag from suggestions
    await page.getByTestId('suggestion-marketing').click();
    await expect(page.getByTestId('hashtag-marketing')).toBeVisible();
  });

  test('should handle scheduling settings', async ({ page }) => {
    // Open date picker
    await page.getByTestId('schedule-date-button').click();
    
    // Find a date in the calendar and click it
    // The date selector was not finding .rdp-day
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7); // select a date 7 days in the future
    
    // Format the date as it would appear in the calendar (e.g., "15")
    const dateText = futureDate.getDate().toString();
    
    // Find and click on the date
    await page.getByRole('gridcell').filter({ hasText: dateText }).first().click();
    
    // Check that the publish button shows "Schedule" instead of "Publish Now"
    await expect(page.getByTestId('publish-content-button')).toContainText('Schedule');
    
    // Select time
    await page.getByTestId('schedule-time-select').click();
    await page.getByRole('option', { name: 'Morning (9:00 AM)' }).click();
  });

  test('should handle media upload simulation', async ({ page }) => {
    // Click on the media upload area
    await page.getByTestId('media-upload-area').click();
    
    // Check that uploading state is shown
    await expect(page.getByText('Uploading...')).toBeVisible();
    
    // Wait for upload simulation to complete
    await expect(page.getByText('Uploading...')).not.toBeVisible({ timeout: 2000 });
    await expect(page.getByText('Drag and drop an image/video or click to browse')).toBeVisible();
  });

  test('should publish content', async ({ page }) => {
    // Fill required fields
    await page.getByTestId('content-title-input').fill('Test Publish Title');
    await page.getByTestId('content-text-input').fill('Test content text for publishing.');
    
    // Add a hashtag
    await page.getByTestId('hashtag-input').fill('publishtest');
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Mock console.log to capture the published data
    let consoleMessage = '';
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleMessage = msg.text();
      }
    });
    
    // Click publish button
    await page.getByTestId('publish-content-button').click();
    
    // Verify publish action occurred (checking console log from our mock)
    expect(consoleMessage).not.toBe('');
  });
}); 