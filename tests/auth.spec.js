import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('valid credentials redirect to dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', process.env.TEST_EMAIL);
  await page.fill('input[name="password"]', process.env.TEST_PASSWORD);
  await page.click('button:text("Login")');
  await expect(page).toHaveURL(/dashboard/);
});

test('invalid credentials show error', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'wrong@example.com');
  await page.fill('input[name="password"]', 'badpass');
  await page.click('button:text("Login")');
  await expect(page.locator('.error')).toHaveText(/invalid/i);
});
