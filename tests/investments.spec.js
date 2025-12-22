// @ts-check
const { test, expect } = require('@playwright/test');

test('investments load correctly', async ({ page }) => {
  await page.goto('/');

  // Click the LABEL for "Smart Stuff"
  await page.getByText('Smart Stuff').click();

  // Wait for the data to be populated.
  // We check the Cash ISA element first as it's static in HTML
  // Check that it contains "£" which implies it has been updated from "..."
  const isaElement = page.locator('#val-isa');
  await expect(isaElement).toContainText('£');

  // Now check one of the dynamic investments, e.g., 'val-vanguard'
  const vanguardElement = page.locator('#val-vanguard');
  await expect(vanguardElement).toBeVisible();
  await expect(vanguardElement).toContainText('£');
});
