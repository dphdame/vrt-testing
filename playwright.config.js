// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Visual Regression Testing Configuration
 * Tests all Victoria's websites: unstoppable.ink, beatwritersblock.com, tooearlytosay.com, caphegroup.org
 */
module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
    toMatchSnapshot: {
      // Allow 5% pixel difference for cross-platform font rendering
      maxDiffPixelRatio: 0.05,
    },
  },

  // Use platform-agnostic snapshot names for CI compatibility
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Desktop Full HD
    {
      name: 'desktop-1920',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Desktop Medium
    {
      name: 'desktop-1280',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
    // Tablet
    {
      name: 'tablet',
      use: {
        browserName: 'chromium',
        viewport: { width: 768, height: 1024 },
      },
    },
    // Mobile
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 },
        isMobile: true,
      },
    },
  ],

  outputDir: 'test-results/',
});
