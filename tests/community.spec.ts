import { test, expect } from '@playwright/test';

// Using test.skip to avoid running these tests until we have a proper test environment
test.describe.skip('Community Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the community page
    await page.goto('/community');
  });

  test('should display community page with tabs and heading', async ({ page }) => {
    // Check that the page title is displayed
    await expect(page.getByRole('heading', { name: 'Community Hub' })).toBeVisible();
    
    // Check that tabs are displayed
    await expect(page.getByRole('tab', { name: 'Discussions' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Leaderboard' })).toBeVisible();
  });

  test('should display discussion threads and allow interaction', async ({ page }) => {
    // Check that discussion threads are visible
    const threads = page.locator('.discussion-thread');
    await expect(threads.first()).toBeVisible();
    
    // Check that threads have key information
    await expect(page.getByText('Posted by:')).toBeVisible();
    await expect(page.getByText('Replies:')).toBeVisible();
    
    // Open a thread
    await threads.first().click();
    
    // Verify thread details appear
    await expect(page.getByText('Thread Details')).toBeVisible();
    await expect(page.getByText('Replies')).toBeVisible();
    
    // Add a reply
    await page.getByPlaceholder('Write a reply...').fill('This is a test reply');
    await page.getByRole('button', { name: 'Post Reply' }).click();
    
    // Return to threads list
    await page.getByRole('button', { name: 'Back to Discussions' }).click();
  });

  test('should create new discussion thread', async ({ page }) => {
    // Click new thread button
    await page.getByRole('button', { name: 'New Thread' }).click();
    
    // Verify new thread form appears
    await expect(page.getByText('Create New Thread')).toBeVisible();
    
    // Fill out thread form
    await page.getByLabel('Title').fill('Test Thread Title');
    await page.getByLabel('Category').selectOption('Question');
    await page.getByLabel('Content').fill('This is a test thread content');
    
    // Submit new thread
    await page.getByRole('button', { name: 'Create Thread' }).click();
    
    // Verify confirmation appears
    await expect(page.getByText('Thread Created!')).toBeVisible();
  });

  test('should display events and allow joining', async ({ page }) => {
    // Navigate to events tab
    await page.getByRole('tab', { name: 'Events' }).click();
    
    // Verify events are displayed
    await expect(page.getByText('Upcoming Events')).toBeVisible();
    
    // Find an event card
    const eventCards = page.locator('.event-card');
    await expect(eventCards.first()).toBeVisible();
    
    // Join an event
    await page.getByRole('button', { name: 'Join Event' }).first().click();
    
    // Verify confirmation appears
    await expect(page.getByText('Event Joined!')).toBeVisible();
    
    // Verify button changes to "Leave Event"
    await expect(page.getByRole('button', { name: 'Leave Event' }).first()).toBeVisible();
  });

  test('should display leaderboard with rankings', async ({ page }) => {
    // Navigate to leaderboard tab
    await page.getByRole('tab', { name: 'Leaderboard' }).click();
    
    // Verify leaderboard is displayed
    await expect(page.getByText('Top Contributors')).toBeVisible();
    
    // Check that leaderboard has rankings and user info
    await expect(page.getByText('Rank')).toBeVisible();
    await expect(page.getByText('User')).toBeVisible();
    await expect(page.getByText('Points')).toBeVisible();
    await expect(page.getByText('Badges')).toBeVisible();
    
    // Verify leaderboard has entries
    const leaderboardRows = page.locator('.leaderboard-row');
    await expect(leaderboardRows.first()).toBeVisible();
  });

  test('should filter discussions by category', async ({ page }) => {
    // Verify category filter is present
    const categoryFilter = page.getByRole('combobox', { name: 'Filter by category' });
    await expect(categoryFilter).toBeVisible();
    
    // Change filter to Questions category
    await categoryFilter.selectOption('Questions');
    
    // Verify filtered threads are displayed
    await expect(page.getByText('Questions')).toBeVisible();
    
    // Change filter back to All
    await categoryFilter.selectOption('All');
  });
}); 