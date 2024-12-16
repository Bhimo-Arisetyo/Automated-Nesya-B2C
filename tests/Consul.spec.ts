import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { createHmac } from 'crypto';

test('test', async ({ page }) => {
  const angka= faker.number.int()
  const reqbody= '{"tenantId":"cae3228c-7209-41cc-8a67-34bfed27ed53","username":"automated'+ angka +'","userKey":"string","email":"automated'+ angka +'@teast.com","phoneNumber":"string","employersName":"string","insurersName":"string","policyNumber":"string","ip":"IP0","type":"CHAT"}';
  const secretKey = '1d7114ae5f032835a389d76e596d19d4deff85cfeca90aba8ab32537a9f9a64e';
  const hmac = createHmac('sha256', secretKey).update(reqbody).digest('hex');
  console.log(hmac);

  await page.goto(process.env.BASE_URL_B2B!);
  await page.getByLabel('post /chat-link', { exact: true }).click();
  await page.getByRole('button', { name: 'Try it out' }).click();
  await page.getByText('{ "tenantId": "string", "').click();
  await page.getByText('{ "tenantId": "string", "').press('ControlOrMeta+a');
  await page.getByText('{ "tenantId": "string", "').fill(reqbody);
  await page.getByPlaceholder('x-signature').click();
  await page.getByPlaceholder('x-signature').fill(hmac);
  await page.getByPlaceholder('x-api-key').dblclick();
  await page.getByPlaceholder('x-api-key').fill('519cc0771311f10ef7c22b1cee2cfc75d9629a9235ebe075acc97679bfbb548c');
  await page.getByRole('button', { name: 'Execute' }).click();
  let link = await page.getByText(process.env.URL_CONSUL!).innerText();
  link = link.replace(/^"|"$/g, '');
  await page.goto(link);
  await expect(page.getByText('Loading, mohon bertahan kamu')).toBeHidden({ timeout: 7000 });
  await expect(page.getByRole('heading', { name: 'Tautan di konfirmasi Tekan' })).toBeVisible();
  await page.getByRole('button', { name: 'Mulai sesi' }).click();
  const tncContent = page.locator('body > app-term-and-condition > app-tnc-modal > button > div > button > div.bg-white.px-4.pt-5.pb-4.sm\\:p-6.sm\\:pb-4 > div');
  await tncContent.hover();
  await tncContent.evaluate((element) => {
    element.scrollTo(0, element.scrollHeight);
    });
  await expect(page.getByLabel('Saya sudah membaca dan setuju')).toBeVisible();
  await page.getByRole('button', { name: 'Konfirmasi' }).click();
  await expect(page.locator('#chatContainer div').nth(3)).toBeVisible();
  for (let i = 0; i < 5; i++) {
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('hai nesya');
    await page.getByRole('textbox').press('Enter');
    
    // Adjust `nth` based on the loop iteration
    await expect(page.locator('div').filter({ hasText: /^hai nesya$/ }).nth(i + 1)).toBeVisible();
    await expect(page.locator('app-chat-bubble').nth(i + 2)).toBeVisible();
    await expect(page.locator('div:nth-child(2) > .flex > div:nth-child(2)')).toBeHidden();
    
    const balesnesya = await page.locator('app-chat-bubble').nth(i + 2).innerText();
    expect(balesnesya.length).toBeGreaterThan(0);
    await expect(page.getByRole('button', { name: 'Kirim' })).toBeEnabled();
  }
  await expect(page.getByText('Nilai pengalaman Anda 😡')).toBeVisible();
  await page.getByRole('button', { name: 'Perpanjang sesi' }).click();
  await expect(page.getByLabel('Perpanjang sesi')).toBeVisible();
  await page.getByRole('button', { name: 'Perpanjang sesi' }).click();
  await page.getByRole('button', { name: 'Perpanjang sesi' }).click();
  await page.getByRole('button', { name: 'Perpanjang sesi' }).click();
  await page.getByRole('button', { name: 'Perpanjang sesi' }).click();
  await page.getByRole('button', { name: 'Perpanjang sesi' }).click();
  await expect(page.getByLabel('Terjadi Kesalahan!')).toBeVisible();
  await page.getByLabel('Close this dialog').click();
  await expect(page.locator('countdown')).toContainText('01');
});