import { test, expect } from '@playwright/test';

// Using test.skip to avoid running these tests until we have a proper test environment
test.describe.skip('Tasks Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the tasks page
    await page.goto('/tasks');
  });

  test('should display tasks page with heading and filter options', async ({ page }) => {
    // Check that the page title is displayed
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
    
    // Check that task filter controls are present
    await expect(page.getByRole('combobox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'All Tasks' })).toBeVisible();
  });

  test('should display task cards with key information', async ({ page }) => {
    // Check that task cards are visible
    const taskCards = page.locator('.task-card');
    await expect(taskCards.first()).toBeVisible();
    
    // Check that task cards contain key information
    await expect(page.getByText('Task Status:')).toBeVisible();
    await expect(page.getByText('Due Date:')).toBeVisible();
    await expect(page.getByText('Priority:')).toBeVisible();
  });

  test('should filter tasks by status', async ({ page }) => {
    // Find and click the status filter dropdown
    const statusFilter = page.getByRole('button', { name: 'All Tasks' });
    await statusFilter.click();
    
    // Select to filter by "In Progress" status
    await page.getByRole('option', { name: 'In Progress' }).click();
    
    // Verify filter was applied (in a real test we'd check that only in progress tasks show)
    await expect(statusFilter).toHaveText('In Progress');
  });

  test('should open task details modal', async ({ page }) => {
    // Find and click the View Details button on the first task card
    const viewButton = page.getByRole('button', { name: 'View Details' }).first();
    await viewButton.click();
    
    // Verify modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Task Details')).toBeVisible();
    
    // Close the modal
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should mark task as complete', async ({ page }) => {
    // Find and click the Complete button on the first task card
    const completeButton = page.getByRole('button', { name: 'Complete' }).first();
    await completeButton.click();
    
    // Verify confirmation appears
    await expect(page.getByText('Task Completed')).toBeVisible();
  });
}); 