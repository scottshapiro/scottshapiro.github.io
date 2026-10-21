const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    launchOptions: process.env.SITE_CHROMIUM ? { executablePath: process.env.SITE_CHROMIUM } : {},
  },
  webServer: { command: 'python3 scripts/serve_preview.py', port: 4173, reuseExistingServer: false },
});
