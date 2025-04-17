import { test, expect } from '@playwright/test';

// Using test.skip to avoid running these tests until we have a proper test environment
test.describe.skip('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the settings page
    await page.goto('/settings');
  });

  test('should display settings page with tabs', async ({ page }) => {
    // Check that the page title is displayed
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    
    // Check that all tabs are displayed
    await expect(page.getByRole('tab', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Notifications' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Connected Accounts' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Billing' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Privacy & Security' })).toBeVisible();
  });

  test('should allow profile information updates', async ({ page }) => {
    // Default tab should be profile
    await expect(page.getByText('Personal Information')).toBeVisible();
    
    // Update profile information
    await page.getByLabel('Full Name').clear();
    await page.getByLabel('Full Name').fill('Jane Smith');
    
    await page.getByLabel('Email Address').clear();
    await page.getByLabel('Email Address').fill('jane.smith@example.com');
    
    await page.getByLabel('Phone Number').clear();
    await page.getByLabel('Phone Number').fill('+852 9876 5432');
    
    // Click save button
    await page.getByRole('button', { name: 'Save Changes' }).click();
    
    // Verify inputs have updated values (in a real app we'd check for success message)
    await expect(page.getByLabel('Full Name')).toHaveValue('Jane Smith');
    await expect(page.getByLabel('Email Address')).toHaveValue('jane.smith@example.com');
    await expect(page.getByLabel('Phone Number')).toHaveValue('+852 9876 5432');
  });

  test('should allow profile picture upload', async ({ page }) => {
    // Check that upload button exists
    await expect(page.getByRole('button', { name: 'Upload New Image' })).toBeVisible();
  });

  test('should allow notification preference changes', async ({ page }) => {
    // Navigate to notifications tab
    await page.getByRole('tab', { name: 'Notifications' }).click();
    
    // Check that notification settings are displayed
    await expect(page.getByText('Notification Preferences')).toBeVisible();
    
    // Toggle notification settings
    const emailSwitch = page.getByLabel('Email Notifications').locator('..').getByRole('switch');
    const initialEmailState = await emailSwitch.isChecked();
    await emailSwitch.click();
    await expect(emailSwitch.isChecked()).resolves.toBe(!initialEmailState);
    
    // Toggle back
    await emailSwitch.click();
    await expect(emailSwitch.isChecked()).resolves.toBe(initialEmailState);
    
    // Save preferences
    await page.getByRole('button', { name: 'Save Preferences' }).click();
  });

  test('should display connected accounts', async ({ page }) => {
    // Navigate to connected accounts tab
    await page.getByRole('tab', { name: 'Connected Accounts' }).click();
    
    // Check that accounts are displayed
    await expect(page.getByText('Connected Social Accounts')).toBeVisible();
    await expect(page.getByText('Instagram')).toBeVisible();
    await expect(page.getByText('Threads')).toBeVisible();
    
    // Check that disconnect buttons are present
    const instagramButton = page.getByText('Instagram').locator('../../../..').getByRole('button');
    await expect(instagramButton).toBeVisible();
    
    const threadsButton = page.getByText('Threads').locator('../../../..').getByRole('button');
    await expect(threadsButton).toBeVisible();
  });

  test('should display billing information', async ({ page }) => {
    // Navigate to billing tab
    await page.getByRole('tab', { name: 'Billing' }).click();
    
    // Check that payment methods are displayed
    await expect(page.getByText('Payment Methods')).toBeVisible();
    await expect(page.getByText('Visa ending in 4242')).toBeVisible();
    
    // Check that subscription plan is displayed
    await expect(page.getByText('Subscription Plan')).toBeVisible();
    await expect(page.getByText('Basic Plan')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
    
    // Check upgrade button
    await expect(page.getByRole('button', { name: 'Upgrade Plan' })).toBeVisible();
  });

  test('should display privacy and security settings', async ({ page }) => {
    // Navigate to privacy tab
    await page.getByRole('tab', { name: 'Privacy & Security' }).click();
    
    // Check that privacy settings are displayed
    await expect(page.getByText('Privacy Settings')).toBeVisible();
    
    // Toggle privacy settings
    const publicProfileSwitch = page.getByLabel('Public Profile').locator('..').getByRole('switch');
    const initialState = await publicProfileSwitch.isChecked();
    await publicProfileSwitch.click();
    await expect(publicProfileSwitch.isChecked()).resolves.toBe(!initialState);
    
    // Toggle back
    await publicProfileSwitch.click();
    await expect(publicProfileSwitch.isChecked()).resolves.toBe(initialState);
    
    // Check that security settings are displayed
    await expect(page.getByText('Security')).toBeVisible();
    await expect(page.getByLabel('Current Password')).toBeVisible();
    await expect(page.getByLabel('New Password')).toBeVisible();
    await expect(page.getByLabel('Confirm New Password')).toBeVisible();
    
    // Check update password button
    await expect(page.getByRole('button', { name: 'Update Password' })).toBeVisible();
    
    // Check two-factor authentication
    await expect(page.getByText('Two-Factor Authentication')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enable' })).toBeVisible();
  });
}); 