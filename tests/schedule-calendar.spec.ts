import { test, expect } from '@playwright/test';
import { format, addMonths, subMonths } from 'date-fns';

test.describe('Content Schedule Calendar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to content schedule page before each test
    await page.goto('/content/schedule');
  });

  test('should load the calendar page correctly', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: 'Content Calendar' })).toBeVisible();
    
    // Check current month/year is displayed
    const currentMonthYear = format(new Date(), 'MMMM yyyy');
    await expect(page.getByText(currentMonthYear, { exact: true })).toBeVisible();
    
    // Check weekday headers are visible
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const day of weekdays) {
      await expect(page.locator(`[data-testid="weekday-${day}"]`)).toBeVisible();
    }
  });

  test('should navigate between months', async ({ page }) => {
    // Get current month/year text
    const currentMonthYear = format(new Date(), 'MMMM yyyy');
    
    // Click next month button
    await page.locator('[data-testid="next-month-button"]').click();
    
    // Check that next month is displayed
    const nextMonthYear = format(addMonths(new Date(), 1), 'MMMM yyyy');
    await expect(page.getByText(nextMonthYear, { exact: true })).toBeVisible();
    
    // Click previous month button twice to go back to previous month
    await page.locator('[data-testid="prev-month-button"]').click();
    await page.locator('[data-testid="prev-month-button"]').click();
    
    // Check that previous month is displayed
    const prevMonthYear = format(subMonths(new Date(), 1), 'MMMM yyyy');
    await expect(page.getByText(prevMonthYear, { exact: true })).toBeVisible();
  });

  test('should switch between month and list views', async ({ page }) => {
    // Default view should be month view
    await expect(page.locator('[data-testid="month-view-tab"][aria-selected="true"]')).toBeVisible();
    
    // Switch to list view
    await page.locator('[data-testid="list-view-tab"]').click();
    await expect(page.locator('[data-testid="list-view-tab"][aria-selected="true"]')).toBeVisible();
    
    // Check if list view content is visible
    await expect(page.locator('[data-testid^="list-content-item-"]').first()).toBeVisible();
    
    // Switch back to month view
    await page.locator('[data-testid="month-view-tab"]').click();
    await expect(page.locator('[data-testid="month-view-tab"][aria-selected="true"]')).toBeVisible();
  });

  test('should select a date and show detail view', async ({ page }) => {
    // Click on a date in the current month
    const today = new Date();
    const dateSelector = `[data-testid="date-${format(today, 'yyyy-MM-dd')}"]`;
    await page.locator(dateSelector).click();
    
    // Check if detail view for selected date is shown
    const formattedDate = format(today, 'MMMM d, yyyy');
    await expect(page.getByText(`Content for ${formattedDate}`)).toBeVisible();
    
    // Check if "Add Content" button is present in the detail view
    await expect(page.locator('[data-testid="add-content-to-date-button"]')).toBeVisible();
  });

  test('should open content creation modal', async ({ page }) => {
    // Click on the create content button
    await page.locator('[data-testid="create-content-button"]').click();
    
    // Check if modal is open
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Create New Content')).toBeVisible();
    
    // Check if form elements are present
    await expect(page.locator('[data-testid="content-title-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-description-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-platform-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-date-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-status-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-hashtag-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-save-button"]')).toBeVisible();
  });

  test('should create new content and add it to calendar', async ({ page }) => {
    // Click on the create content button
    await page.locator('[data-testid="create-content-button"]').click();
    
    // Fill out the form
    await page.locator('[data-testid="content-title-input"]').fill('Test Content');
    await page.locator('[data-testid="content-description-input"]').fill('This is a test post');
    
    // Select platform (Instagram is default)
    await page.getByLabel('Instagram').click();
    
    // Set date to today (default)
    
    // Set status to scheduled
    await page.getByLabel('Scheduled').click();
    
    // Add a hashtag
    await page.locator('[data-testid="content-hashtag-input"]').fill('testpost');
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Save the content
    await page.locator('[data-testid="content-save-button"]').click();
    
    // Modal should close
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Check if content is added to the calendar or list
    // Since we can't know the exact ID of the new post, we'll check for the title
    const todaySelector = `[data-testid="date-${format(new Date(), 'yyyy-MM-dd')}"]`;
    await page.locator(todaySelector).click();
    
    // The content should be visible in the detail view
    await expect(page.getByText('Test Content')).toBeVisible();
  });
}); 