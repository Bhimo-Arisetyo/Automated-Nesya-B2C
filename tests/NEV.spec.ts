import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test('test', async () => {
  const audioFilePath = path.resolve(__dirname, '../Audio/Hi.wav');

  // Launch Chromium with fake audio device arguments
  const browser = await chromium.launch({
    args: [
      '--no-sandbox',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      `--use-file-for-fake-audio-capture=${audioFilePath}`
    ],
  });

  // Create a new context that allows microphone access
  const context = await browser.newContext({
    permissions: ['microphone']
  });

  // Create a new page from this context
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL!);
  await page.locator('app-sidebar').getByRole('button').nth(1).click();
  await expect(page.getByRole('heading')).toContainText('Kenalin Nesya Empathic Voice (NEV)');
  await page.getByRole('button', { name: 'Call Nesya' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('app-speech-session').getByRole('img', { name: 'Nesya' })).toBeVisible();
  await page.getByRole('button', { name: 'M' }).click();
  await expect(page.locator('app-chat-bubble > div > .flex-none').first()).toBeVisible();

  const awal = await page.locator('div.flex.flex-row.gap-x-3.mb-3').nth(0).innerText();
  expect(awal.length).toBeGreaterThan(0);
  
  
  const input = await page.locator('div.flex.flex-row-reverse.gap-x-3.mb-3').nth(0).innerText();
  expect(input.length).toBeGreaterThan(0);
  
  const balesnesya = await page.locator('div.flex.flex-row.gap-x-3.mb-3').nth(2).innerText();
  expect(balesnesya.length).toBeGreaterThan(0);
  
  await page.locator('app-speech-session').getByRole('button').nth(2).click();
  await expect(page.getByRole('heading')).toContainText('Kenalin Nesya Empathic Voice (NEV)');
});

