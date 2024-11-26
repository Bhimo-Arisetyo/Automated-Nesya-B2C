import { test, expect } from '@playwright/test';
import fs from 'fs';


// const storageStatePath = process.env.USER_FILE_PATH;

// test.use({
//     storageState: storageStatePath,
// });

test('Themeswithcertest', async ({ page }) => {
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