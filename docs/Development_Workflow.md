# Social Media Marketing Agent - Development Workflow

## Overview

This document outlines the development workflow for the Social Media Marketing Agent platform. It provides guidelines for day-to-day development activities, ensuring consistency and quality throughout the project.

## Daily Development Cycle

### 1. Planning

- Review the current phase in the Product Management Plan
- Select a specific component or feature to implement
- Define acceptance criteria for the component
- Create a task in the project management system (if applicable)

### 2. Development

- Create the component or feature
- Use dummy JSON data for any dynamic content
- Implement responsive design for all screen sizes
- Add interactivity using React hooks
- Ensure accessibility compliance

### 3. Testing

- Write Playwright tests for the component
- Test on multiple screen sizes
- Verify all interactions work as expected
- Check for any console errors or warnings
- Ensure the component meets accessibility standards

### 4. Review

- Self-review the code for quality and best practices
- Fix any issues identified during testing
- Document any decisions or trade-offs made
- Update the Product Management Plan if necessary

### 5. Integration

- Integrate the component into the main application
- Verify navigation between components works correctly
- Run the full Playwright test suite
- Fix any regression issues

## Component Development Guidelines

### Structure

```typescript
// Component file structure example
import React from 'react';
import { dummyData } from '@/data/dummy-data';

interface ComponentProps {
  // Define props here
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component implementation
  return (
    <div className="responsive-classes-here">
      {/* Component content */}
    </div>
  );
}
```

### Dummy Data

- Create JSON files in a `/data` directory
- Structure data to mimic expected API responses
- Include edge cases and error states
- Example:

```typescript
// Example dummy data structure
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

### Responsive Design

- Use Tailwind's responsive classes (sm:, md:, lg:, etc.)
- Test on mobile, tablet, and desktop viewports
- Implement different layouts for different screen sizes when necessary
- Use the following breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes when necessary
- Ensure sufficient color contrast
- Support keyboard navigation
- Test with screen readers

## Testing Guidelines

### Playwright Test Structure

```typescript
// Example Playwright test
import { test, expect } from '@playwright/test';

test.describe('Component Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
    await page.goto('/path-to-component');
  });

  test('should render correctly', async ({ page }) => {
    // Test rendering
    await expect(page.locator('.component-selector')).toBeVisible();
  });

  test('should handle interaction', async ({ page }) => {
    // Test interaction
    await page.click('.button-selector');
    await expect(page.locator('.result-selector')).toHaveText('Expected Result');
  });

  // More tests...
});
```

### Test Coverage Requirements

- **Rendering:** Verify the component renders correctly
- **Interactions:** Test all interactive elements
- **Responsive:** Verify behavior on different screen sizes
- **Edge Cases:** Test with empty data, error states, etc.
- **Accessibility:** Verify keyboard navigation and screen reader support

## Documentation Guidelines

### Code Documentation

- Use JSDoc comments for components and functions
- Document props, return values, and side effects
- Explain complex logic or algorithms
- Example:

```typescript
/**
 * TaskCard Component
 * 
 * Displays a task card with information about the task and actions to complete it.
 * 
 * @param {object} task - The task object containing task details
 * @param {function} onComplete - Callback function when task is completed
 * @returns {JSX.Element} The rendered task card
 */
export function TaskCard({ task, onComplete }: TaskCardProps) {
  // Implementation
}
```

### Component Documentation

- Create a README.md file for complex components
- Include usage examples
- Document props and their types
- Explain any special considerations or limitations

## Problem Resolution

### Common Issues

1. **Failing Playwright Tests**
   - Check for timing issues (add waits if necessary)
   - Verify selectors are correct and unique
   - Ensure the test environment is clean before each test

2. **Responsive Design Issues**
   - Use the browser's device emulation to test different screen sizes
   - Verify Tailwind classes are applied correctly
   - Check for overflow issues

3. **State Management Problems**
   - Use React DevTools to inspect component state
   - Verify data flow between components
   - Check for unnecessary re-renders

### Debugging Process

1. Identify the specific issue
2. Reproduce the issue consistently
3. Isolate the problem to a specific component or function
4. Use console.log or debugger statements to track values
5. Fix the issue and verify the solution
6. Add tests to prevent regression

## Continuous Improvement

- Regularly review and refactor code
- Share knowledge and best practices with the team
- Update documentation as the project evolves
- Collect feedback on the development workflow
- Adjust processes as needed to improve efficiency and quality

---

This workflow document should be reviewed and updated regularly to reflect the evolving needs of the project and the development team.