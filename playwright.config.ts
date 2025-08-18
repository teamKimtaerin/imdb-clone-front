import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/test/e2e',
  /* You can turn this on to record traces for failed tests. */
  use: {
    baseURL: 'http://localhost:3000', // allow page.goto('/')
    trace: 'on-first-retry',
  },
  /* Start Next.js app before tests. For CI you can switch to build+start. */
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  /* Keep it fast to begin with: Chromium only. Add Firefox/WebKit later if needed. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
