import { test, expect } from '@playwright/test';
import { format, addMonths, subMonths } from 'date-fns';

test.describe('Content Calendar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to content schedule page before each test
    await page.goto('/content/schedule');
    await page.waitForLoadState('networkidle');
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

  test('should toggle between month and list views', async ({ page }) => {
    // Default view should be month view
    await expect(page.locator('[data-testid="month-view-tab"][aria-selected="true"]')).toBeVisible();
    
    // Switch to list view
    await page.locator('[data-testid="list-view-tab"]').click();
    await expect(page.locator('[data-testid="list-view-tab"][aria-selected="true"]')).toBeVisible();
    
    // Check if list view content is visible
    await expect(page.locator('.border.rounded-md.divide-y')).toBeVisible();
    
    // Switch back to month view
    await page.locator('[data-testid="month-view-tab"]').click();
    await expect(page.locator('[data-testid="month-view-tab"][aria-selected="true"]')).toBeVisible();
    
    // Check that month view is visible again - use a more specific selector
    await expect(page.locator('.grid.grid-cols-7.gap-px.bg-muted.text-center')).toBeVisible();
  });

  test('should select a date and show detail view', async ({ page }) => {
    // Get the date format for today
    const today = new Date();
    const todayFormat = format(today, 'yyyy-MM-dd');
    
    // Click on a date in the current month using the data-testid
    await page.locator(`[data-testid="date-${todayFormat}"]`).click();
    
    // Check if detail view for selected date is shown
    const formattedDate = format(today, 'MMMM d, yyyy');
    await expect(page.getByText(`Content for ${formattedDate}`)).toBeVisible();
    
    // Check if "Add Content" button is present in the detail view
    await expect(page.getByTestId('add-content-to-date-button')).toBeVisible();
  });

  test('should open content creation modal', async ({ page }) => {
    // Click on the create content button
    await page.locator('[data-testid="create-content-button"]').click();
    
    // Check if modal is open
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // The title could be either "Create New Content" or just "Create Content" depending on implementation
    await expect(page.getByRole('dialog').getByRole('heading')).toBeVisible();
    
    // Check if form elements are present
    await expect(page.locator('[data-testid="content-title-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-description-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-platform-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-date-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-status-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-hashtag-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-save-button"]')).toBeVisible();
    
    // Close the modal by clicking the Cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
  });

  test('should create new content and add it to calendar', async ({ page }) => {
    // Click on the create content button
    await page.locator('[data-testid="create-content-button"]').click();
    
    // Fill out the form
    await page.locator('[data-testid="content-title-input"]').fill('Test Content');
    await page.locator('[data-testid="content-description-input"]').fill('This is a test post');
    
    // No need to select Instagram as it's default
    
    // Set status to scheduled
    await page.locator('#scheduled').click();
    
    // Add a hashtag
    await page.locator('[data-testid="content-hashtag-input"]').fill('testpost');
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Save the content - need to make sure the button is visible and clickable
    await page.getByTestId('content-save-button').scrollIntoViewIfNeeded();
    await page.getByTestId('content-save-button').click();
    
    // Wait for modal to close
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
    
    // Check that we're back to the calendar view
    await expect(page.getByRole('heading', { name: 'Content Calendar' })).toBeVisible();
    
    // If in month view, verify the content appears in the calendar by switching to list view
    await page.locator('[data-testid="list-view-tab"]').click();
    
    // Wait for list view to be visible and check for our new content
    await expect(page.locator('.border.rounded-md.divide-y')).toBeVisible();
    await expect(page.getByText('Test Content')).toBeVisible();
  });

  test('should sort content items by date in list view', async ({ page }) => {
    // Switch to list view
    await page.locator('[data-testid="list-view-tab"]').click();
    await expect(page.locator('[data-testid="list-view-tab"][aria-selected="true"]')).toBeVisible();
    
    // Wait for list view to be visible
    await expect(page.locator('.border.rounded-md.divide-y')).toBeVisible();
    
    // Check dates are in chronological order
    const dateElements = await page.locator('.text-right .text-sm.font-medium').allInnerTexts();
    
    // Check that we have date elements
    expect(dateElements.length).toBeGreaterThan(0);
    
    // Convert text dates to actual dates and check they're in order
    const dates = dateElements.map(dateText => new Date(dateText));
    
    // Verify dates are sorted
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i-1].getTime());
    }
  });
}); 