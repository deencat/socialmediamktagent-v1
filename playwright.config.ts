import { PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    
    // Collect trace when a test fails. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
  },
  
  // Configure projects for browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  // Run local dev server before starting the tests
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   timeout: 120000,
  //   reuseExistingServer: !process.env.CI,
  // },
};

export default config; 