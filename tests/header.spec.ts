import { test, expect } from '@playwright/test';

test.describe('Header Components', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the dashboard page where the header should be visible
    await page.goto('/dashboard');
  });

  test('should display the header with all components', async ({ page }) => {
    // Check if header exists
    const header = await page.locator('header');
    await expect(header).toBeVisible();

    // Check if app title is visible
    const title = await page.locator('header h1');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Social Media Marketing Agent');

    // Check if theme toggle is visible
    const themeToggle = await page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible();

    // Check if notification button is visible
    const notificationButton = await page.locator('[data-testid="notification-button"]');
    await expect(notificationButton).toBeVisible();

    // Check if user menu button is visible
    const userMenuButton = await page.locator('[data-testid="user-menu-button"]');
    await expect(userMenuButton).toBeVisible();
  });

  test('should toggle theme when theme button is clicked', async ({ page }) => {
    // Click the theme toggle button
    await page.locator('[data-testid="theme-toggle"]').click();

    // Check if dark mode class is added to html element
    const html = await page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Click again to toggle back to light mode
    await page.locator('[data-testid="theme-toggle"]').click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should open notification dropdown when notification button is clicked', async ({ page }) => {
    // Click the notification button
    await page.locator('[data-testid="notification-button"]').click();

    // Check if notification dropdown is visible
    const notificationDropdown = await page.locator('[data-testid="notification-dropdown"]');
    await expect(notificationDropdown).toBeVisible();

    // Check if dropdown has notifications or empty state
    const notificationItems = await page.locator('[data-testid="notification-dropdown"] > div:nth-child(2) > div');
    await expect(notificationItems.first()).toBeVisible();
  });

  test('should open user menu dropdown when user menu button is clicked', async ({ page }) => {
    // Click the user menu button
    await page.locator('[data-testid="user-menu-button"]').click();

    // Check if user menu dropdown is visible
    const userMenuDropdown = await page.locator('[data-testid="user-menu-dropdown"]');
    await expect(userMenuDropdown).toBeVisible();

    // Check if dropdown has user info and menu items
    const userInfo = await page.locator('[data-testid="user-menu-dropdown"] > div:first-child');
    await expect(userInfo).toBeVisible();

    // Check if sign out option is available
    const signOutOption = await page.locator('[data-testid="user-menu-dropdown"] a:has-text("Sign out")');
    await expect(signOutOption).toBeVisible();
  });
});