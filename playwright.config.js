// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const PORT = 8080;
const baseURL = `http://localhost:${PORT}`;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx http-server -p ${PORT} --silent`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
