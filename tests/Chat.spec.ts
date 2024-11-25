import { test, expect } from '@playwright/test';

test('Chat With Nesya', async ({ page }) => {
  await page.goto('https://nesya-staging.tenang.ai/');

  await page.getByRole('button', { name: 'Percakapan Baru' }).click();
  // await expect(page.locator('app-chat-bubble')).toHaveText('');
  const textContent = await page.locator('app-chat-bubble').innerText();
  expect(textContent.length).toBeGreaterThan(0);
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('hai nesya');
  await page.getByRole('textbox').press('Enter');
  await expect(page.locator('div').filter({ hasText: /^hai nesya$/ }).nth(1)).toBeVisible();
  
  //   page.on('websocket', ws => {
  //     ws.on('framereceived', frame => {
  //       console.log('WebSocket frame received:', frame.payload);

  //       // Check if the message is the one we're waiting for
  //       if (frame.payload === '42["onThinkingStop","Nesya has stopped thinking..."]') {
  //         console.log('Expected message received, resolving promise.'); // Log when the expected message is received
  //         resolve(); // Resolve the Promise when the message is received
  //       }
  //     });
  //   });
  // });
  // await waitForWsMessage;
  await expect(page.locator('app-chat-bubble').nth(2)).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .flex > div:nth-child(2)').nth(1)).toBeHidden();
  const balesnesya = await page.locator('app-chat-bubble').nth(2).innerText();
  expect(balesnesya.length).toBeGreaterThan(0); 
});                        
                    

test('Check feedback visibility', async ({ page }) => {
  await page.goto('https://nesya-staging.tenang.ai/');
  await page.locator('app-card-room > a').first().click();
  for (let i = 0; i < 4; i++) {
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('hai nesya');
    await page.getByRole('textbox').press('Enter');
    
    // Adjust `nth` based on the loop iteration
    await expect(page.locator('div').filter({ hasText: /^hai nesya$/ }).nth(i + 2)).toBeVisible();
    await expect(page.locator('app-chat-bubble').nth(i + 2)).toBeVisible();
    await expect(page.locator('div:nth-child(2) > .flex > div:nth-child(2)').nth(1)).toBeHidden();
    
    const balesnesya = await page.locator('app-chat-bubble').nth(i + 3).innerText();
    expect(balesnesya.length).toBeGreaterThan(0); 
  }
  
});