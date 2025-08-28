import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('user signup triggers verification email', async ({ page, request }) => {
  const testEmail = `testuser${Date.now()}@mailinator.com`;
  const password = 'Password123!';

  // sign up flow
  await page.goto('/signup');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', password);
  await page.click('button:text("Sign up")');

  // fetch Mailinator inbox
  const res = await request.get(
    `https://api.mailinator.com/v2/domains/public/inboxes/${testEmail.split('@')[0]}?token=${process.env.MAILINATOR_TOKEN}`
  );
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  const messageId = data.messages[0].id;

  // fetch the email content
  const msgRes = await request.get(
    `https://api.mailinator.com/v2/domains/public/messages/${messageId}?token=${process.env.MAILINATOR_TOKEN}`
  );
  const msg = await msgRes.json();
  const link = msg.data.parts[0].body.match(/https?:\/\/\S+/)[0];

  // go to verification link
  await page.goto(link);
  await expect(page).toHaveURL(/verified/);
});
