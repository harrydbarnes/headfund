// @ts-check
const { test, expect } = require('@playwright/test');

const dynamicInvestments = [
    { id: 'val-vanguard', name: 'Vanguard Global' },
    { id: 'val-nvidia', name: 'Nvidia Stock' },
    { id: 'val-ftse', name: 'FTSE 100' },
    { id: 'val-sp500', name: 'S&P 500' },
    { id: 'val-amazon', name: 'Amazon Stock' },
    { id: 'val-wpp', name: 'WPP' },
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByText('Smart Stuff').click();
});

test('Cash ISA investment loads correctly', async ({ page }) => {
  const isaElement = page.locator('#val-isa');
  await expect(isaElement).toContainText(/£[\d,]+/);
});

for (const investment of dynamicInvestments) {
    test(`Dynamic investment for ${investment.name} loads correctly`, async ({ page }) => {
        const element = page.locator(`#${investment.id}`);
        await expect(element).toBeVisible();
        await expect(element).toContainText(/£[\d,]+/);
    });
}
