import { test, expect } from '@playwright/test';

test('Payment and check if done', async ({ page }) => {
  await page.goto('https://nesya-staging.tenang.ai/packages');
  await page.locator('a').filter({ hasText: 'Starling 30 menit + 30 menit' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp5.900');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page2 = await page2Promise;
  await page2.waitForLoadState('networkidle')
  await expect(page2.getByRole('cell')).toContainText('IDR 5.900');
  await page2.locator('[data-testid="simulate-button"]').click();
  await page2.reload();
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
  await page.locator('button:has-text("Confirm Payment")').click();
  await page.locator('.swal2-popup.swal2-show').isVisible();
});
