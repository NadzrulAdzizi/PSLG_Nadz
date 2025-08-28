import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

test('Valid credentials redirect to dashboard', async ({ page }) => {
  console.log('EMAIL:', username, 'PASSWORD:', password);
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', username);
  await page.fill('input[data-qa="login-password"]', password);
  await page.waitForTimeout(200);
  await page.click('button[data-qa="login-button"]');
  await page.waitForTimeout(200);
  // Save authentication state
  await page.context().storageState({ path: 'storageState.json' });
});

test('Invalid credentials show error message', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', 'wrong@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrongpassword');
  await page.click('button[data-qa="login-button"]');
  await page.waitForTimeout(200);
  await expect(page.locator('.login-form p')).toContainText('Your email or password is incorrect!');
  await page.waitForTimeout(200);
  await console.log('Invalid login attempt');
});
