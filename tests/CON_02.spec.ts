import { test, expect } from "@playwright/test";

// Test that the email address is a functional mailto link

test('The Email address is a functional mailto link', async ({ page }) => {
    await page.goto('http://railwayb2.somee.com/Page/Contact.cshtml');
    const emailLink = page.locator('a[href^="mailto:"]');
    await emailLink.waitFor({ state: 'visible' });
    const href = await emailLink.getAttribute('href');
    const text = await emailLink.textContent();
    expect(href).toMatch(/^mailto:/);
    expect(href).toContain(text?.trim() || '');
});
