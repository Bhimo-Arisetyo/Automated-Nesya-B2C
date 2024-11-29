import { test, expect } from '@playwright/test';

test('LanguageSwitch', async ({ page }) => {
    // Masuk Ke Nesya
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

test('ThemeSwitch', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await page.waitForLoadState('networkidle');
    const locator = page.locator('body');
    //Check background for Light theme 
    await expect(locator).toHaveCSS('background-color', 'rgb(241, 245, 249)');
    //Change theme to dark theme and check for background to have certain rgb
    await page.locator('app-theme-switcher').getByRole('button').click();
    await expect(locator).toHaveCSS('background-color', 'rgb(24, 24, 27)');
    //Change theme to light theme and Check background for Light theme 
    await page.locator('app-theme-switcher').getByRole('button').click();
    await expect(locator).toHaveCSS('background-color', 'rgb(241, 245, 249)');
});

test('Voucher gagal', async ({ page }) => {
    await page.goto(process.env.BASE_URL! + '/voucher');
    await page.waitForLoadState('networkidle'); 
    await page.getByPlaceholder('Masukan Kode').click();
    await page.getByPlaceholder('Masukan Kode').fill('Asallll');
    await page.waitForLoadState('networkidle'); 
    await page.getByRole('button', { name: 'Cek Kode Voucher' }).click();
    await expect(page.locator('div.flex.flex-row.w-full.justify-start.text-start.items-stretch.text-sm.pt-2.text-red-400')).toBeVisible();
});
test('Voucher Berhasil', async ({ page }) => {
    await page.goto(process.env.BASE_URL! + '/voucher');
    await page.waitForLoadState('networkidle'); 
    await page.getByPlaceholder('Masukan Kode').click();
    await page.getByPlaceholder('Masukan Kode').fill(process.env.VOUCHER_NAME!);
    await page.waitForLoadState('networkidle'); 
    await page.getByRole('button', { name: 'Cek Kode Voucher' }).click();
    await expect(page.locator('img[src="assets/images/default_voucher_banner.png"]')).toBeVisible();
    await page.locator('app-voucher-page').getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Ya, Pakai Sekarang' }).click();
    await expect(page.getByText('×🎊Yay! Voucher berhasil')).toBeVisible();
});   
test.describe.serial('Packages and Payment ', () => {
    test('Check Harga', async ({ page }) => {
        //Check Starling
        await page.goto(process.env.BASE_URL! + '/packages');
        await page.locator('a').filter({ hasText: 'Starling 30 menit + 30 menit' }).click();
        await expect(page.locator('app-checkout')).toContainText('Rp5.900');
        const harganesya = await page.locator('div.flex-1.text-right.font-bold').innerText()
        const cleanharganesya = harganesya.replace(/[^\d.,]/g, '');  
        const page2Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Checkout' }).click();
        const page2 = await page2Promise;
        const hargaxen = await page2.locator('div.text-right.text-xl.lg\\:text-2xl.font-semibold').innerText();
        const cleanhargaxen = hargaxen.replace(/[^\d.,]/g, '');  
        await expect(cleanhargaxen).toContain(cleanharganesya);
        await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
        await page2.close();
    
        //Check gulaAren
        await page.goto(process.env.BASE_URL! + '/packages');
        await page.locator('a').filter({ hasText: 'Gula Aren 12 jam + 1 jam' }).getByRole('button').click();
        await expect(page.locator('app-checkout')).toContainText('Rp18.900');
        const harganesyagula = await page.locator('div.flex-1.text-right.font-bold').innerText()
        const cleanharganesyagula = harganesyagula.replace(/[^\d.,]/g, '');  
        const page3Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Checkout' }).click();
        const page3 = await page3Promise;
        const hargaxengula = await page3.locator('div.text-right.text-xl.lg\\:text-2xl.font-semibold').innerText();
        const cleanhargaxengula = hargaxengula.replace(/[^\d.,]/g, '');  
        await expect(cleanhargaxengula).toContain(cleanharganesyagula);
        await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
        await page3.close();
    
    
        // Check freeFlow
        await page.goto(process.env.BASE_URL! + '/packages');
        await page.locator('a').filter({ hasText: 'Free Flow Unlimited 1 bulan' }).click();
        await expect(page.locator('app-checkout')).toContainText('Rp199.000');
        const harganesyaff = await page.locator('div.flex-1.text-right.font-bold').innerText()
        const cleanharganesyaff= harganesyaff.replace(/[^\d.,]/g, '');  
        const page4Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Checkout' }).click();
        const page4 = await page4Promise;
        const hargaxenff = await page4.locator('div.text-right.text-xl.lg\\:text-2xl.font-semibold').innerText();
        const cleanhargaxenff = hargaxenff.replace(/[^\d.,]/g, '');  
        await expect(cleanhargaxenff).toContain(cleanharganesyaff);
        await expect(page.getByRole('heading', { name: 'Thank you! Your order' })).toBeVisible();
    });
    
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

    test('Chat With Nesya', async ({ page }) => {
        await page.goto(process.env.BASE_URL!);

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
        test('Chat Limit Room', async ({ page }) => {
            await page.goto(process.env.BASE_URL!);
            await page.getByRole('textbox').click();
            await page.getByRole('textbox').fill('hai nes');
            await expect(page.locator('#swal2-html-container')).toContainText('User limited to create new session');
        });                

});