import { test, expect } from '@playwright/test';

test.describe('Content Calendar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the content schedule page
    await page.goto('/content/schedule');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title and components', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Content Calendar/);
    
    // Check main components are present
    await expect(page.getByText('Content Calendar')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Month' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'List' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Content' })).toBeVisible();
    
    // Check calendar view shows days of week
    for (const day of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']) {
      await expect(page.getByText(day, { exact: true })).toBeVisible();
    }
  });

  test('should navigate between months', async ({ page }) => {
    // Get current month title
    const initialMonth = await page.locator('h3').first().textContent();
    
    // Navigate to next month - use a more specific selector
    await page.locator('button').filter({ has: page.locator('svg[data-lucide="chevron-right"]') }).click();
    
    // Get new month title
    const nextMonth = await page.locator('h3').first().textContent();
    
    // Check that month changed
    expect(initialMonth).not.toEqual(nextMonth);
    
    // Navigate back to previous month
    await page.locator('button').filter({ has: page.locator('svg[data-lucide="chevron-left"]') }).click();
    
    // Get month title again
    const prevMonth = await page.locator('h3').first().textContent();
    
    // Check that we're back to initial month
    expect(prevMonth).toEqual(initialMonth);
  });

  test('should toggle between month and list views', async ({ page }) => {
    // Check calendar elements are visible (instead of grid-cols-7 class)
    await expect(page.locator('.py-2.text-sm.font-medium').first()).toBeVisible();
    
    // Switch to list view
    await page.getByRole('tab', { name: 'List' }).click();
    
    // Check month grid is hidden and list is visible
    await expect(page.locator('.py-2.text-sm.font-medium').first()).not.toBeVisible();
    await expect(page.locator('.border.rounded-md.divide-y')).toBeVisible();
    
    // Switch back to month view
    await page.getByRole('tab', { name: 'Month' }).click();
    
    // Check grid elements are visible again
    await expect(page.locator('.py-2.text-sm.font-medium').first()).toBeVisible();
  });

  test('should show content details when selecting a date', async ({ page }) => {
    // Find and select a date cell with content
    // Instead of using a fixed date, we'll find the first date cell with content
    const dateCell = await page.locator('.min-h-28.p-2').filter({ 
      has: page.locator('.text-xs.bg-background.border.rounded') 
    }).first();
    
    await dateCell.click();
    
    // Check that content details appear - look for the section that shows content
    await expect(page.locator('.mt-6 .card-header .card-title')).toBeVisible();
    
    // Check content items are listed
    const contentItems = await page.locator('.mt-6 .border.rounded-md.p-4').count();
    expect(contentItems).toBeGreaterThan(0);
  });

  test('should open content creation modal from calendar', async ({ page }) => {
    // Click create content button - use a more specific selector
    await page.locator('button').filter({ hasText: 'Create Content' }).click();
    
    // Check modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Fill form fields
    await page.getByLabel('Title').fill('Calendar Test Post');
    await page.getByPlaceholder('Enter post description').fill('This is a test post from calendar view');
    
    // Select a platform
    await page.getByText('Instagram').first().click();
    
    // Select status
    await page.getByText('Scheduled').click();
    
    // Add a hashtag
    await page.getByTestId('content-hashtag-input').fill('calendartest');
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Save content
    await page.getByTestId('content-save-button').click();
    
    // Check modal is closed
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
  });

  test('should edit existing content item', async ({ page }) => {
    // Switch to list view - use a more specific selector
    await page.locator('button').filter({ hasText: 'List' }).click();
    
    // Wait for list view to be visible
    await expect(page.locator('.border.rounded-md.divide-y')).toBeVisible();
    
    // Click on the first content item that's visible
    await page.locator('[data-testid^="list-content-item-"]').first().click();
    
    // Check edit modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Update the title
    await page.getByLabel('Title').clear();
    await page.getByLabel('Title').fill('Updated Test Title');
    
    // Save changes
    await page.getByTestId('content-save-button').click();
    
    // Check modal is closed
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
    
    // Verify the title was updated in the list
    await expect(page.getByText('Updated Test Title')).toBeVisible();
  });

  test('should add content to specific date', async ({ page }) => {
    // Find and select a date cell
    const dateCell = await page.locator('.min-h-28.p-2').nth(10); // Select a random date
    await dateCell.click();
    
    // Click add content button - find it within the selected date's details
    await page.locator('.mt-6 button').filter({ hasText: 'Add Content' }).click();
    
    // Check modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Fill form fields
    await page.getByLabel('Title').fill('New Date Specific Post');
    await page.getByPlaceholder('Enter post description').fill('Added to specific date');
    
    // Save content
    await page.getByTestId('content-save-button').click();
    
    // Check modal is closed
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
    
    // Verify new content appears in the date content section
    await expect(page.getByText('New Date Specific Post')).toBeVisible();
  });

  test('should sort content items by date in list view', async ({ page }) => {
    // Switch to list view - use a more specific selector
    await page.locator('button').filter({ hasText: 'List' }).click();
    
    // Wait for list view to be visible
    await expect(page.locator('.border.rounded-md.divide-y')).toBeVisible();
    
    // Get all date elements
    const dateElements = await page.locator('.text-right .text-sm.font-medium').allInnerTexts();
    
    // Check dates are in chronological order
    const dates = dateElements.map(dateText => new Date(dateText));
    
    // Check that the dates are sorted (each date should be >= the previous date)
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i-1].getTime());
    }
  });
}); 