import { test, expect } from '@playwright/test';


test('Check Subscriptsion', async ({ page }) => {
  page.on('response', async (response) => {
    if (response.request().url().includes('api-staging.tenangaja.co.id/v1/subscriptions/active')) { 
      const responseBody = await response.json();
      console.log(responseBody);

      expect(responseBody.data.isPaid).toBe(true);
    }
  });
  await page.goto('https://nesya-staging.tenang.ai');
  await page.reload();
  await page.waitForLoadState('networkidle');


});