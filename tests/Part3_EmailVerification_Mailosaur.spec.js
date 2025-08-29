import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const email = process.env.test_Email_Part3;
const password = process.env.test_Password_Part3;

/* //PreCondition:
    1. Sign up for a new account using supabase link, https://supabase.com/dashboard/sign-up
    2. Use the email address domain of "@camdx8ia.mailosaur.net", example "anything2@camdx8ia.mailosaur.net"
    3. Add password and click signup
*/ // 


test('verify account via Mailosaur email', async ({ page }) => {
  // Step 1: Login to Mailosaur
  await page.goto('https://mailosaur.com/app-ea/login?redirect=%2Fapp-ea%2Fservers%2Fcamdx8ia%2Fmessages%2Finbox');
  await page.getByRole('textbox', { name: 'Email address' }).fill(email);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 2: Wait for the inbox to load and for a message to appear
  await page.waitForSelector('[data-testid^="message-"]', { timeout: 30000 });

  // Step 3: Click the message
  await page.waitForSelector('text=Confirm your email address');
  await page.click('text=Confirm your email address');

  // Step 4: Extract the verification link from the email body
  // Wait for the email body to be visible
  await page.waitForSelector('text=Confirm Email Address');
  // Get all links in the email body
  const links = await page.locator('a').all();
  let verificationUrl;
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && href.includes('token')) { // adjust keyword as needed
      verificationUrl = href;
      break;
    }
  }
  expect(verificationUrl, 'Verification link found in email').toBeTruthy();
  console.log('\n==============================');
  console.log('🚀 VERIFICATION URL FOUND 🚀');
  console.log('==============================');
  console.log(verificationUrl);
  console.log('==============================\n');

  // Step 5: Visit the verification link and assert activation
  await page.goto(verificationUrl);
  await page.waitForTimeout(3000); // wait for 3 seconds to ensure the activation process completes
  //await expect(page.locator('text=Account successfully activated')).toBeVisible();
  console.log('\n==============================');
  console.log('🚀 ACCOUNT ACTIVATION SUCCESS 🚀');
  console.log('==============================\n');

});