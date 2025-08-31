>>>🧪 Running Tests
a. Local execution
Run all Playwright tests:
npx playwright test

b. With MCP server
Start MCP for distributed execution:
npm run mcp:server

Then run:
npx playwright test


>>>Artifacts (HTML reports, traces, videos) are saved under:
/playwright-report
/test-results


>>>🔑 Authentication Handling
Storage state is used to persist login sessions (storageState.json).
Credentials are never hardcoded — loaded from .env or secrets.
Example:
await page.context().storageState({ path: 'storageState.json' });


>>>📧 Email Verification (Mailosaur) 
// I'm not using (Mailinator) due to need to subscripe to the plan for API usage

Tests include signup + email confirmation flows:
Register with a Mailosaur test email:
anything123@<server-id>.mailosaur.net


>>>Fetch latest email via Mailosaur API:
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


>>>🚀 CI/CD Integration
A GitHub Actions workflow is included in 
.github/workflows/playwright.yml.

