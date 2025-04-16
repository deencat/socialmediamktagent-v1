import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');
    
    // Check if the login form is displayed
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in invalid credentials
    await page.getByTestId('email-input').fill('wrong@example.com');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();
    
    // Check if error message is displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('Invalid credentials');
  });

  test('should login as SME user and redirect to dashboard', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in valid SME credentials
    await page.getByTestId('email-input').fill('sme@example.com');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    
    // Check if redirected to dashboard
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should login as Service Provider and redirect to tasks', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in valid Service Provider credentials
    await page.getByTestId('email-input').fill('provider@example.com');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    
    // Check if redirected to tasks
    await page.waitForURL('/tasks');
    await expect(page).toHaveURL('/tasks');
  });
});