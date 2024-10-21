import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nesya-staging.tenang.ai/voucher');
  await page.waitForLoadState('networkidle'); 
  await page.getByPlaceholder('Masukan Kode').click();
  await page.getByPlaceholder('Masukan Kode').fill('vcode04');
  await page.waitForLoadState('networkidle'); 
  await page.getByRole('button', { name: 'Cek Kode Voucher' }).click();
  await expect(page.getByText('Banner VCode04 Berlaku mulai 31 Jul 2024 - 31 Ags 2024Gratis Syarat & Ketentuan')).toBeVisible();
});