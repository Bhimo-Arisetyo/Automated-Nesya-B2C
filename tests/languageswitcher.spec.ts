import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // Masuk Ke Tshi-dev.nesya
  await page.goto(process.env.BASE_URL!);
  await page.waitForLoadState('networkidle');
    //Ganti bahasa ke inggris dan check text
  await page.getByRole('main').locator('label div').nth(2).click();
  await expect(page.locator('#tooltip1')).toContainText('How to use Nesya AI:');
  await expect(page.locator('#tooltip1')).toContainText('Feel free to choose the language you want to use while chatting with Nesya. If you want to change the language, make sure to start the conversation from the beginning.');
  await expect(page.locator('app-sidemenu')).toContainText('New Conversation');
  //Ganti bahasa ke indonesia dan check text
  await page.getByRole('main').locator('label div').nth(2).click();
  await expect(page.locator('#tooltip1')).toContainText('Cara guna Nesya AI:');
  await expect(page.locator('#tooltip1')).toContainText('Silakan pilih bahasa yang mau kamu gunakan selama ngobrol dengan Nesya; jika mau mengganti bahasa, PASTIKAN kamu memulai conversation dari awal lagi.');
  await expect(page.locator('app-sidemenu')).toContainText('Percakapan Baru');
});