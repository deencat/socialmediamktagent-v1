import { test, expect } from '@playwright/test';

test.describe('Registration Page', () => {
  test('should display registration form', async ({ page }) => {
    await page.goto('/register');
    
    // Check if the registration form is displayed
    await expect(page.getByTestId('registration-form')).toBeVisible();
    await expect(page.getByText('Create an account')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('confirm-password-input')).toBeVisible();
    await expect(page.getByTestId('next-button')).toBeVisible();
  });

  test('should navigate through registration steps for SME', async ({ page }) => {
    await page.goto('/register');
    
    // Step 1: Fill account details
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('confirm-password-input').fill('password123');
    await page.getByTestId('next-button').click();
    
    // Step 2: Select role
    await expect(page.getByText('I am a...')).toBeVisible();
    await page.getByTestId('role-sme').click();
    
    // Step 3: Fill company details
    await expect(page.getByTestId('company-name-input')).toBeVisible();
    await page.getByTestId('company-name-input').fill('Test Company');
    await page.getByTestId('register-button').click();
    
    // Check if redirected to dashboard
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should navigate through registration steps for Service Provider', async ({ page }) => {
    await page.goto('/register');
    
    // Step 1: Fill account details
    await page.getByTestId('email-input').fill('provider@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('confirm-password-input').fill('password123');
    await page.getByTestId('next-button').click();
    
    // Step 2: Select role
    await expect(page.getByText('I am a...')).toBeVisible();
    await page.getByTestId('role-provider').click();
    
    // Step 3: Fill personal details
    await expect(page.getByTestId('full-name-input')).toBeVisible();
    await page.getByTestId('full-name-input').fill('Test Provider');
    await page.getByTestId('register-button').click();
    
    // Check if redirected to tasks
    await page.waitForURL('/tasks');
    await expect(page).toHaveURL('/tasks');
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.goto('/register');
    
    // Fill in mismatched passwords
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('confirm-password-input').fill('different');
    
    // Next button should be enabled but will show error after submission
    await page.getByTestId('next-button').click();
    
    // Continue with registration to trigger validation
    await page.getByTestId('role-sme').click();
    await page.getByTestId('company-name-input').fill('Test Company');
    await page.getByTestId('register-button').click();
    
    // Check if error message is displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('Passwords do not match');
  });
});