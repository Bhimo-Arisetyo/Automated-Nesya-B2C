import { test, expect } from '@playwright/test';
test.use({ userAgent: 'My user agent' });
const authFile = 'playwright/.auth/user.json';

test('test', async ({ page, browserName, isMobile}) => {
  //Masuk ke Nesya-dev
  await page.goto('https://tshi-dev.tenang.ai/');
  await page.waitForLoadState('networkidle');

  //Popup google
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'google logo Continue with' }).click();
  const page1 = await page1Promise;

  //Proses Login email dan password
  await page1.getByLabel('Email or phone').click();
  await page1.getByLabel('Email or phone').fill('testbhimo');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByLabel('Enter your password').fill('!@Test123');
  await page1.getByRole('button', { name: 'Next' }).click();

  // Check login 
  await page.waitForURL('https://tshi-dev.tenang.ai/');
  await expect(page.getByText('Hi, Test Bhimo!')).toBeVisible();
  await page.context().storageState({ path: authFile });
});
