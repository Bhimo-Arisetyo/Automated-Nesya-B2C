import { test, expect } from '@playwright/test';

test('Voucher gagal', async ({ page }) => {
  await page.goto('https://nesya-dev.tenang.ai/voucher');
  await page.waitForLoadState('networkidle'); 
  await page.getByPlaceholder('Masukan Kode').click();
  await page.getByPlaceholder('Masukan Kode').fill('Asallll');
  await page.waitForLoadState('networkidle'); 
  await page.getByRole('button', { name: 'Cek Kode Voucher' }).click();
  await expect(page.locator('div.flex.flex-row.w-full.justify-start.text-start.items-stretch.text-sm.pt-2.text-red-400')).toBeVisible();

});

test('Voucher Berhasil', async ({ page }) => {
  await page.goto('https://nesya-dev.tenang.ai/voucher');
  await page.waitForLoadState('networkidle'); 
  await page.getByPlaceholder('Masukan Kode').click();
  await page.getByPlaceholder('Masukan Kode').fill('testgulaaren');
  await page.waitForLoadState('networkidle'); 
  await page.getByRole('button', { name: 'Cek Kode Voucher' }).click();
  await expect(page.locator('img[src="assets/images/default_voucher_banner.png"]')).toBeVisible();
  await page.locator('app-voucher-page').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Ya, Pakai Sekarang' }).click();
  await expect(page.getByText('×🎊Yay! Voucher berhasil')).toBeVisible();
});