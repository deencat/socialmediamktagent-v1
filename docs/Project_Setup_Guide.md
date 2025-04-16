# Social Media Marketing Agent - Project Setup Guide

## Overview

This document provides step-by-step instructions for setting up the Social Media Marketing Agent project for development. Follow these instructions to create a consistent development environment.

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## Initial Setup

### 1. Clone the Repository

```bash
git clone [repository-url]
cd social-media-marketing-agent
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

The project follows a feature-based structure:

```
src/
  u251cu2500u2500 app/              # Next.js App Router
  u2502   u251cu2500u2500 (auth)/        # Authentication routes
  u2502   u251cu2500u2500 dashboard/     # Dashboard routes
  u2502   u251cu2500u2500 tasks/         # Task management routes
  u2502   u251cu2500u2500 rewards/       # Rewards marketplace routes
  u2502   u251cu2500u2500 settings/      # User settings routes
  u2502   u251cu2500u2500 layout.tsx     # Root layout
  u2502   u2514u2500u2500 page.tsx       # Landing page
  u251cu2500u2500 components/       # Shared components
  u2502   u251cu2500u2500 ui/           # Base UI components
  u2502   u251cu2500u2500 dashboard/     # Dashboard-specific components
  u2502   u251cu2500u2500 tasks/         # Task-related components
  u2502   u251cu2500u2500 rewards/       # Reward-related components
  u2502   u2514u2500u2500 ...            # Other component categories
  u251cu2500u2500 hooks/            # Custom React hooks
  u251cu2500u2500 lib/              # Utility functions and libraries
  u251cu2500u2500 data/             # Dummy data for prototyping
  u251cu2500u2500 styles/           # Global styles and Tailwind config
  u2514u2500u2500 types/            # TypeScript type definitions
tests/                # Playwright tests
public/               # Static assets
```

## Development Workflow

### Starting the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the Next.js development server at http://localhost:3000.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Production Build Locally

```bash
npm run start
# or
yarn start
```

### Running Tests

```bash
# Run all tests
npm run test
# or
yarn test

# Run tests with UI
npm run test:ui
# or
yarn test:ui
```

## Setting Up Tailwind CSS and Shadcn UI

### 1. Tailwind CSS Configuration

The project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... other shades
          900: '#0c4a6e',
        },
        // ... other color definitions
      },
      // ... other theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ... other plugins
  ],
};
```

### 2. Shadcn UI Components

The project uses Shadcn UI for base components. To add a new Shadcn UI component:

```bash
npx shadcn-ui@latest add button
# Replace 'button' with the component you want to add
```

## Creating Dummy Data

Create JSON files in the `src/data` directory to simulate API responses:

```typescript
// src/data/dummy-tasks.ts
export const dummyTasks = [
  {
    id: '1',
    title: 'Like Instagram Post',
    description: 'Like the latest post from Brand X',
    points: 5,
    status: 'available',
    deadline: '2023-06-30T12:00:00Z',
  },
  // More dummy tasks...
];
```

## Setting Up Playwright Tests

### 1. Install Playwright

```bash
npm init playwright@latest
# or
yarn create playwright
```

Follow the prompts to complete the setup.

### 2. Configure Playwright

Update the `playwright.config.ts` file:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### 3. Create Test Utilities

Create helper functions for common test operations:

```typescript
// tests/utils/auth-helpers.ts
import { Page } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', email);
  await page.fill('[data-testid="password-input"]', password);
  await page.click('[data-testid="login-button"]');
  await page.waitForURL('/dashboard');
}
```

## Git Workflow

### Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fix branches: `fix/bug-name`
- Documentation branches: `docs/doc-name`

### Commit Message Format

Follow the conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

Example: `feat(dashboard): add analytics widget`

## Troubleshooting

### Common Issues

1. **Next.js Build Errors**
   - Check for missing dependencies
   - Verify import paths are correct
   - Look for TypeScript errors

2. **Playwright Test Failures**
   - Check if the application is running
   - Verify selectors are correct
   - Look for timing issues

3. **Tailwind CSS Not Working**
   - Verify the content paths in tailwind.config.js
   - Check if the Tailwind directives are in the global CSS file
   - Clear the Next.js cache: `rm -rf .next`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## Next Steps

1. Set up the project structure
2. Configure Tailwind CSS and Shadcn UI
3. Create dummy data files
4. Implement the first components
5. Set up Playwright tests