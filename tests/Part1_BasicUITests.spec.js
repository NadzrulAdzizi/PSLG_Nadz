import { test, expect } from '@playwright/test';

test('user can add a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(200),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.waitForTimeout(200),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('First Task');
  await page.waitForTimeout(200),
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.waitForTimeout(200),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Second Task');
  await page.waitForTimeout(200),
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.waitForTimeout(200),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Third Task');
  await page.waitForTimeout(200),
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200),
  await console.log('Todo added');
});

test('user can mark a todo as complete', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(500),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.waitForTimeout(500),
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('To do Automation using Playwright');
  await page.waitForTimeout(500),
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500),
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.waitForTimeout(500),
  await console.log('Todo marked as complete');
});

// Bonus: API test
test('API should return todos', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/todos');
  expect(response.ok()).toBeTruthy();
  const todos = await response.json();
  expect(Array.isArray(todos)).toBeTruthy();
  expect(todos.length).toBeGreaterThan(0);
  await console.log(todos);
  await console.log('API returned todos successfully');

});