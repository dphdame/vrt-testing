// @ts-check
const { test, expect } = require('@playwright/test');

const SITE_URL = 'https://beatwritersblock.com';
const SITE_NAME = 'beatwritersblock';

test.describe(`${SITE_NAME} Homepage Visual Regression`, () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(SITE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('full page screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot(`${SITE_NAME}-homepage-full.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('navbar/header layout', async ({ page }) => {
    const navbar = page.locator('nav, .navbar, .gh-head, header, .site-header').first();
    if (await navbar.count() > 0) {
      await expect(navbar).toHaveScreenshot(`${SITE_NAME}-navbar.png`, {
        animations: 'disabled',
      });
    }
  });

  test('hero/banner section', async ({ page }) => {
    const hero = page.locator('.hero, .gh-canvas, .site-main, [class*="hero"], .post-feed').first();
    if (await hero.count() > 0) {
      await expect(hero).toHaveScreenshot(`${SITE_NAME}-hero.png`, {
        animations: 'disabled',
      });
    }
  });

  test('footer section', async ({ page }) => {
    const footer = page.locator('footer, .footer, .gh-foot, .site-footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toHaveScreenshot(`${SITE_NAME}-footer.png`, {
        animations: 'disabled',
      });
    }
  });
});

test.describe(`${SITE_NAME} CSS Validation`, () => {

  test('CSS rules are being parsed correctly', async ({ page }) => {
    await page.goto(SITE_URL);
    await page.waitForLoadState('networkidle');

    const ruleCount = await page.evaluate(() => {
      return Array.from(document.styleSheets).reduce((acc, sheet) => {
        try { return acc + sheet.cssRules.length; } catch (e) { return acc; }
      }, 0);
    });

    expect(ruleCount).toBeGreaterThan(50);
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto(SITE_URL);
    await page.waitForLoadState('networkidle');

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasOverflow).toBe(false);
  });
});
