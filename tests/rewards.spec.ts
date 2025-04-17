import { test, expect } from '@playwright/test';

// Using test.skip to avoid running these tests until we have a proper test environment
test.describe.skip('Rewards Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the rewards page
    await page.goto('/rewards');
  });

  test('should display rewards page with heading and points balance', async ({ page }) => {
    // Check that the page title is displayed
    await expect(page.getByRole('heading', { name: 'Rewards Marketplace' })).toBeVisible();
    
    // Check that points balance is displayed
    await expect(page.getByText('Your Points:')).toBeVisible();
    await expect(page.getByText('Points Balance')).toBeVisible();
  });

  test('should display reward categories and filter rewards', async ({ page }) => {
    // Check that category tabs are visible
    await expect(page.getByRole('tab', { name: 'All Rewards' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Discounts' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Gift Cards' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Services' })).toBeVisible();
    
    // Switch to Gift Cards tab
    await page.getByRole('tab', { name: 'Gift Cards' }).click();
    await expect(page.getByRole('tab', { name: 'Gift Cards' })).toHaveAttribute('data-state', 'active');
    
    // Switch to Services tab
    await page.getByRole('tab', { name: 'Services' }).click();
    await expect(page.getByRole('tab', { name: 'Services' })).toHaveAttribute('data-state', 'active');
    
    // Switch to Discounts tab
    await page.getByRole('tab', { name: 'Discounts' }).click();
    await expect(page.getByRole('tab', { name: 'Discounts' })).toHaveAttribute('data-state', 'active');
    
    // Switch back to All Rewards tab
    await page.getByRole('tab', { name: 'All Rewards' }).click();
    await expect(page.getByRole('tab', { name: 'All Rewards' })).toHaveAttribute('data-state', 'active');
  });

  test('should display reward cards with key information', async ({ page }) => {
    // Check that reward cards are visible
    const rewardCards = page.locator('.reward-card');
    await expect(rewardCards.first()).toBeVisible();
    
    // Check that reward cards contain key information
    await expect(page.getByText('Points:')).toBeVisible();
    await expect(page.getByText('Value:')).toBeVisible();
  });

  test('should open reward redemption modal', async ({ page }) => {
    // Find and click the Redeem button on the first reward card
    const redeemButton = page.getByRole('button', { name: 'Redeem' }).first();
    await redeemButton.click();
    
    // Verify modal appears
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Confirm Redemption')).toBeVisible();
    
    // Verify modal shows points required
    await expect(page.getByText('Points Required:')).toBeVisible();
    
    // Verify modal shows confirmation buttons
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
    
    // Close the modal
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should display transaction history tab', async ({ page }) => {
    // Navigate to transaction history tab
    await page.getByRole('tab', { name: 'Transaction History' }).click();
    
    // Verify transaction history is displayed
    await expect(page.getByText('Recent Transactions')).toBeVisible();
    
    // Check that transaction table is displayed
    await expect(page.getByText('Date')).toBeVisible();
    await expect(page.getByText('Description')).toBeVisible();
    await expect(page.getByText('Points')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
  });
}); 