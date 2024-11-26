import { test, expect } from '@playwright/test';

test('Compare Screenshot packages', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  await expect(page).toHaveScreenshot();
});

test('Check Harga', async ({ page }) => {
  await page.goto(process.env.BASE_URL! + '/packages');
  await page.locator('a').filter({ hasText: 'Starling 30 menit + 30 menit' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp5.900');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page2 = await page2Promise;
  await page2.waitForLoadState('networkidle')
  await expect(page2.getByRole('cell')).toContainText('IDR 5.900');
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();


  await page.goto(process.env.BASE_URL!);
  await page.locator('a').filter({ hasText: 'Gula Aren 12 jam + 1 jam' }).getByRole('button').click();
  await expect(page.locator('app-checkout')).toContainText('Rp18.900');
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page3 = await page3Promise;
  await page3.waitForLoadState('networkidle')
  await expect(page3.getByRole('cell')).toContainText('IDR 18.900');
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();


  await page.goto(process.env.BASE_URL!);
  await page.locator('a').filter({ hasText: 'Free Flow Unlimited 1 bulan' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp199.000');
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page4 = await page4Promise;
  await page4.waitForLoadState('networkidle')
  await expect(page4.getByRole('cell')).toContainText('IDR 199.000');
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
});

