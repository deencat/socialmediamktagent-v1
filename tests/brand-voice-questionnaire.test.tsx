import { test, expect } from '@playwright/test';

test.describe('Brand Voice Questionnaire', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the brand voice setup page
    await page.goto('/dashboard/brand-voice');
  });

  test('should display the initial question and progress correctly', async ({ page }) => {
    // Check initial state
    await expect(page.getByText('Brand Voice Setup')).toBeVisible();
    await expect(page.getByText('What is your brand name?')).toBeVisible();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25');
    await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  test('should navigate through questions when answering', async ({ page }) => {
    // Answer brand name question
    await page.getByPlaceholder('Type your answer here').fill('Test Brand');
    await page.getByRole('button', { name: 'Next' }).click();

    // Check second question (industry)
    await expect(page.getByText('What industry is your brand in?')).toBeVisible();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Technology' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Check third question (tone)
    await expect(page.getByText('What tone best describes your brand voice?')).toBeVisible();
    await page.getByLabel('Professional & Formal').click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Check final question (values)
    await expect(page.getByText('What are your brand\'s core values?')).toBeVisible();
    await page.getByPlaceholder('Type your answer here').fill('Innovation, Quality, Customer Focus');
    
    // Verify navigation buttons
    await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeEnabled();
  });

  test('should allow navigation back to previous questions', async ({ page }) => {
    // Fill first question
    await page.getByPlaceholder('Type your answer here').fill('Test Brand');
    await page.getByRole('button', { name: 'Next' }).click();

    // Go back to first question
    await page.getByRole('button', { name: 'Previous' }).click();

    // Verify we're back at the first question
    await expect(page.getByText('What is your brand name?')).toBeVisible();
    await expect(page.getByPlaceholder('Type your answer here')).toHaveValue('Test Brand');
  });

  test('should maintain answers when navigating between questions', async ({ page }) => {
    // Fill first question
    await page.getByPlaceholder('Type your answer here').fill('Test Brand');
    await page.getByRole('button', { name: 'Next' }).click();

    // Fill second question
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Technology' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Go back to second question
    await page.getByRole('button', { name: 'Previous' }).click();

    // Verify answer is maintained
    await expect(page.getByRole('combobox')).toHaveValue('tech');
  });

  test('should show correct progress throughout questionnaire', async ({ page }) => {
    // Check initial progress
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25');

    // Progress to second question
    await page.getByPlaceholder('Type your answer here').fill('Test Brand');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');

    // Progress to third question
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Technology' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');

    // Progress to final question
    await page.getByLabel('Professional & Formal').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
}); 