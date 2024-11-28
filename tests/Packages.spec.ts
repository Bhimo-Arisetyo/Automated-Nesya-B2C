import { test, expect } from '@playwright/test';

test('Compare Screenshot packages', async ({ page }) => {
  await page.goto(process.env.BASE_URL! + '/packages');
  await expect(page).toHaveScreenshot();
});

test('Check Harga', async ({ page }) => {
  await page.goto(process.env.BASE_URL! + '/packages');
  await page.locator('a').filter({ hasText: 'Starling 30 menit + 30 menit' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp5.900');
  const harganesya = await page.locator('div.flex-1.text-right.font-bold').innerText()
  const cleanharganesya = harganesya.replace(/[^\d.,]/g, '');  // Removes all non-numeric characters
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page2 = await page2Promise;
  // await page2.waitForLoadState('networkidle')
  const hargaxen = await page2.locator('div.text-right.text-xl.lg\\:text-2xl.font-semibold').innerText();
  const cleanhargaxen = hargaxen.replace(/[^\d.,]/g, '');  // Removes all non-numeric characters
  await expect(cleanhargaxen).toContain(cleanharganesya);
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
  await page2.close();



  await page.goto(process.env.BASE_URL! + '/packages');
  await page.locator('a').filter({ hasText: 'Gula Aren 12 jam + 1 jam' }).getByRole('button').click();
  await expect(page.locator('app-checkout')).toContainText('Rp18.900');
  const harganesyagula = await page.locator('div.flex-1.text-right.font-bold').innerText()
  const cleanharganesyagula = harganesyagula.replace(/[^\d.,]/g, '');  // Removes all non-numeric characters
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page3 = await page3Promise;
  // await page3.waitForLoadState('networkidle')
  const hargaxengula = await page3.locator('div.text-right.text-xl.lg\\:text-2xl.font-semibold').innerText();
  const cleanhargaxengula = hargaxengula.replace(/[^\d.,]/g, '');  // Removes all non-numeric characters
  await expect(cleanhargaxengula).toContain(cleanharganesyagula);
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
  await page3.close();



  await page.goto(process.env.BASE_URL! + '/packages');
  await page.locator('a').filter({ hasText: 'Free Flow Unlimited 1 bulan' }).click();
  await expect(page.locator('app-checkout')).toContainText('Rp199.000');
  const harganesyaff = await page.locator('div.flex-1.text-right.font-bold').innerText()
  const cleanharganesyaff= harganesyaff.replace(/[^\d.,]/g, '');  // Removes all non-numeric characters
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Checkout' }).click();
  const page4 = await page4Promise;
  // await page4.waitForLoadState('networkidle')
  const hargaxenff = await page4.locator('div.text-right.text-xl.lg\\:text-2xl.font-semibold').innerText();
  const cleanhargaxenff = hargaxenff.replace(/[^\d.,]/g, '');  // Removes all non-numeric characters
  await expect(cleanhargaxenff).toContain(cleanharganesyaff);
  await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
});

