import { test, expect } from '@playwright/test';

test.describe('Memory System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the memory management page
    await page.goto('/memory/management');
  });

  test('should display memory management interface', async ({ page }) => {
    // Check that the page title is visible
    await expect(page.getByRole('heading', { name: 'Memory Management' })).toBeVisible();
    
    // Check that the main components are visible
    await expect(page.locator('[data-testid="memory-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="create-memory-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="memory-search-input"]')).toBeVisible();
  });

  test('should create a new memory entity', async ({ page }) => {
    // Click the create memory button
    await page.locator('[data-testid="create-memory-button"]').click();
    
    // Check that the create memory modal is visible
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Create New Memory Entity')).toBeVisible();
    
    // Fill out the form
    await page.locator('[data-testid="memory-name-input"]').fill('Test Memory');
    await page.locator('[data-testid="memory-type-select"]').click();
    await page.getByRole('option', { name: 'Conversation' }).click();
    await page.locator('[data-testid="memory-content-input"]').fill('This is a test memory content');
    
    // Add a tag
    await page.locator('[data-testid="memory-tag-input"]').fill('test');
    await page.getByRole('button', { name: 'Add Tag' }).click();
    
    // Save the memory
    await page.locator('[data-testid="save-memory-button"]').click();
    
    // Check that the modal closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Check that the new memory appears in the list
    await expect(page.getByText('Test Memory')).toBeVisible();
    
    // Check for success notification
    await expect(page.getByText('Memory entity created successfully')).toBeVisible();
  });

  test('should search for memory entities', async ({ page }) => {
    // Enter search term
    await page.locator('[data-testid="memory-search-input"]').fill('conversation');
    await page.locator('[data-testid="memory-search-button"]').click();
    
    // Check that the search results are filtered
    const count = await page.locator('[data-testid="memory-list-item"]').count();
    expect(count).toBeGreaterThan(0);
    
    // Clear search
    await page.locator('[data-testid="memory-search-clear"]').click();
    
    // Check that all entities are shown again
    const newCount = await page.locator('[data-testid="memory-list-item"]').count();
    expect(newCount).toBeGreaterThan(0);
  });

  test('should view memory entity details', async ({ page }) => {
    // Click on the first memory entity in the list
    await page.locator('[data-testid="memory-list-item"]').first().click();
    
    // Check that the detail view is visible
    await expect(page.locator('[data-testid="memory-detail-view"]')).toBeVisible();
    
    // Check that the memory content is visible
    await expect(page.locator('[data-testid="memory-content"]')).toBeVisible();
    
    // Check that related entities section is visible
    await expect(page.locator('[data-testid="related-entities-section"]')).toBeVisible();
  });

  test('should update a memory entity', async ({ page }) => {
    // Click on the first memory entity in the list
    await page.locator('[data-testid="memory-list-item"]').first().click();
    
    // Click the edit button
    await page.locator('[data-testid="edit-memory-button"]').click();
    
    // Check that the edit modal is visible
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Update the memory content
    await page.locator('[data-testid="memory-content-input"]').fill('Updated memory content');
    
    // Save the changes
    await page.locator('[data-testid="save-memory-button"]').click();
    
    // Check that the modal closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Check that the updated content is visible
    await expect(page.getByText('Updated memory content')).toBeVisible();
    
    // Check for success notification
    await expect(page.getByText('Memory entity updated successfully')).toBeVisible();
  });

  test('should delete a memory entity', async ({ page }) => {
    // Get the count of memory entities before deletion
    const initialCount = await page.locator('[data-testid="memory-list-item"]').count();
    
    // Click on the first memory entity in the list
    await page.locator('[data-testid="memory-list-item"]').first().click();
    
    // Click the delete button
    await page.locator('[data-testid="delete-memory-button"]').click();
    
    // Confirm deletion in the dialog
    await page.getByRole('button', { name: 'Confirm' }).click();
    
    // Check that the memory entity was deleted
    await expect(page.locator('[data-testid="memory-list-item"]')).toHaveCount(initialCount - 1);
    
    // Check for success notification
    await expect(page.getByText('Memory entity deleted successfully')).toBeVisible();
  });

  test('should create a relation between memory entities', async ({ page }) => {
    // Create first test entity if needed
    if (await page.locator('[data-testid="memory-list-item"]:has-text("Test Entity 1")').count() === 0) {
      await page.locator('[data-testid="create-memory-button"]').click();
      await page.locator('[data-testid="memory-name-input"]').fill('Test Entity 1');
      await page.locator('[data-testid="memory-type-select"]').click();
      await page.getByRole('option', { name: 'Conversation' }).click();
      await page.locator('[data-testid="memory-content-input"]').fill('First test entity');
      await page.locator('[data-testid="save-memory-button"]').click();
    }
    
    // Create second test entity if needed
    if (await page.locator('[data-testid="memory-list-item"]:has-text("Test Entity 2")').count() === 0) {
      await page.locator('[data-testid="create-memory-button"]').click();
      await page.locator('[data-testid="memory-name-input"]').fill('Test Entity 2');
      await page.locator('[data-testid="memory-type-select"]').click();
      await page.getByRole('option', { name: 'Conversation' }).click();
      await page.locator('[data-testid="memory-content-input"]').fill('Second test entity');
      await page.locator('[data-testid="save-memory-button"]').click();
    }
    
    // Click on "Test Entity 1"
    await page.locator('[data-testid="memory-list-item"]:has-text("Test Entity 1")').click();
    
    // Click the "Create Relation" button
    await page.locator('[data-testid="create-relation-button"]').click();
    
    // In the relation dialog, select "Test Entity 2" as the target
    await page.locator('[data-testid="relation-target-select"]').click();
    await page.getByRole('option', { name: 'Test Entity 2' }).click();
    
    // Select relation type
    await page.locator('[data-testid="relation-type-select"]').click();
    await page.getByRole('option', { name: 'references' }).click();
    
    // Save the relation
    await page.locator('[data-testid="save-relation-button"]').click();
    
    // Check that the relation appears in the related entities section
    await expect(page.locator('[data-testid="related-entities-section"]')).toContainText('Test Entity 2');
    
    // Check for success notification
    await expect(page.getByText('Relation created successfully')).toBeVisible();
  });
}); 