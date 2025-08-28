import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.use({ storageState: 'storageState.json' });

test('Store and reuse authentication state with storageState.json', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');  
  await page.waitForTimeout(200);
  await page.getByRole('link', { name: ' Products' }).click();
  await page.waitForTimeout(200);
  await console.log('User is logged in and can access products page');
  await page.waitForTimeout(200);

});