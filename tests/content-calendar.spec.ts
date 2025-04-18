import { test, expect } from '@playwright/test';

test.describe('Content Calendar Widget', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the dashboard page
    await page.goto('/dashboard');
    
    // Ensure we're on the dashboard
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('should display calendar dates', async ({ page }) => {
    // Check that dates are displayed
    await expect(page.getByTestId('date-2023-06-15')).toBeVisible();
    await expect(page.getByTestId('date-2023-06-16')).toBeVisible();
    await expect(page.getByTestId('date-2023-06-17')).toBeVisible();
  });

  test('should show content items for selected date', async ({ page }) => {
    // Click on a date
    await page.getByTestId('date-2023-06-15').click();
    
    // Verify content items are displayed for that date
    await expect(page.getByTestId('content-item-1')).toBeVisible();
    await expect(page.getByTestId('content-item-2')).toBeVisible();
  });

  test('should open content creation modal', async ({ page }) => {
    // Click the create button
    await page.getByTestId('create-content-button').click();
    
    // Verify modal is shown
    await expect(page.getByText('Create New Content')).toBeVisible();
    await expect(page.getByTestId('content-title-input')).toBeVisible();
    
    // Close the modal
    await page.getByText('Cancel').click();
  });

  test('should create new content item', async ({ page }) => {
    // Click the create button
    await page.getByTestId('create-content-button').click();
    
    // Fill in the form
    await page.getByTestId('content-title-input').fill('Test content item');
    await page.getByTestId('content-description-input').fill('This is a test description');
    await page.getByText('Instagram').click();
    await page.getByText('Draft').click();
    
    // Add a hashtag
    await page.getByTestId('content-hashtag-input').fill('testhashtag');
    await page.getByText('Add').click();
    
    // Save the content
    await page.getByTestId('content-save-button').click();
    
    // Verify modal is closed
    await expect(page.getByText('Create New Content')).not.toBeVisible();
  });

  test('should edit content item', async ({ page }) => {
    // Click on a date with content
    await page.getByTestId('date-2023-06-15').click();
    
    // Click edit button on a content item
    await page.getByTestId('edit-content-1').click();
    
    // Verify edit modal is shown
    await expect(page.getByText('Edit Content')).toBeVisible();
    
    // Update title
    await page.getByTestId('content-title-input').fill('Updated content title');
    
    // Save changes
    await page.getByTestId('content-save-button').click();
    
    // Verify changes are saved
    await expect(page.getByText('Updated content title')).toBeVisible();
  });

  test('should delete content item', async ({ page }) => {
    // Click on a date with content
    await page.getByTestId('date-2023-06-15').click();
    
    // Get initial count of content items
    const initialItemCount = await page.getByTestId(/^content-item-/).count();
    
    // Click delete button on a content item
    await page.getByTestId('delete-content-1').click();
    
    // Verify item is removed
    const newItemCount = await page.getByTestId(/^content-item-/).count();
    expect(newItemCount).toBe(initialItemCount - 1);
  });

  test('should add content to specific date', async ({ page }) => {
    // Click on a date
    await page.getByTestId('date-2023-06-16').click();
    
    // Click "Add Content to" button
    await page.getByTestId('add-content-to-date').click();
    
    // Fill in form
    await page.getByTestId('content-title-input').fill('Content for specific date');
    
    // Save
    await page.getByTestId('content-save-button').click();
    
    // Verify new content appears
    await expect(page.getByText('Content for specific date')).toBeVisible();
  });
}); 