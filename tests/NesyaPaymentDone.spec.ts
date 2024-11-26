import { test, expect } from '@playwright/test';

test('Payment and check if done', async ({ page }) => {
  await page.goto(process.env.BASE_URL! +'/packages');
  await page.locator('a').filter({ hasText: 'Starling 30 menit + 30 menit' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp5.900');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page2 = await page2Promise;
  await expect(page2.getByRole('cell')).toContainText('IDR 5.900');
  await page2.locator('[data-testid="simulate-button"]').waitFor({ state: 'visible' });
  await page2.locator('[data-testid="simulate-button"]').click();
  await expect(page2.getByText('Please wait until the process')).toBeHidden();
  await page2.reload();
  await page2.locator('[data-testid="success-description"]').waitFor({ state: 'visible' });
  await expect(page2.locator('[data-testid="success-description"]')).toHaveText(/Your order #[a-z0-9-]+ has been paid for successfully/);
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
  await page.locator('button:has-text("Confirm Payment")').click();
  await page.locator('.swal2-popup.swal2-show').isVisible();
  await page.waitForLoadState('networkidle')
  await page.goto('https://nesya-staging.tenang.ai/')
  await page.waitForLoadState('networkidle')

});

test('Payment Failed', async ({ page }) => {
  await page.goto(process.env.BASE_URL! + '/packages');
  await page.locator('a').filter({ hasText: 'Starling 30 menit + 30 menit' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp5.900');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page2 = await page2Promise;
  await expect(page2.getByRole('cell')).toContainText('IDR 5.900');
  await page.locator('button:has-text("Confirm Payment")').click();
  await expect(page.locator('.swal2-popup.swal2-show')).toContainText('Pastikan kamu sudah menyelesaikan pembayaran')
});

test('Check Subscriptsion', async ({ page }) => {
  page.on('response', async (response) => {
    if (response.request().url().includes('api-dev.tenang.ai/v1/subscriptions/active')) { 
      const responseBody = await response.json();
      console.log(responseBody);

      expect(responseBody.data.isPaid).toBe(true);
    }
  });
  await page.goto('https://nesya-staging.tenang.ai');
  await page.reload();
  await page.waitForLoadState('networkidle');


});