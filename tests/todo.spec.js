import { test, expect } from '@playwright/test';

test('user can add a todo item', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Add todo"]', 'Buy milk');
  await page.click('button:text("Add")');
  await expect(page.locator('li')).toContainText('Buy milk');
});

test('user can mark a todo as complete', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="Add todo"]', 'Walk dog');
  await page.click('button:text("Add")');
  await page.click('li:has-text("Walk dog") >> input[type="checkbox"]');
  await expect(page.locator('li:has-text("Walk dog")')).toHaveClass(/completed/);
});

// Bonus: API test
test('API should return todos', async ({ request }) => {
  const response = await request.get('/api/todos');
  expect(response.ok()).toBeTruthy();
  const todos = await response.json();
  expect(Array.isArray(todos)).toBeTruthy();
});
