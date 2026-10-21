const { test, expect } = require('@playwright/test');

test('sidebar and overlay work on desktop and mobile with the candidate CSP', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.post-feed .post').first()).toBeVisible();
    await expect.poll(() => page.locator('#masthead .site-logo img').evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
    await page.locator('#sidebar-show').click();
    await expect(page.locator('body')).toHaveClass(/sidebar--opened/);
    await page.locator('#sidebar-hide').click();
    await expect(page.locator('body')).not.toHaveClass(/sidebar--opened/);
    if (width > 800) {
      await page.locator('#sidebar-show').click();
      await page.locator('#site-overlay').click({ position: { x: 5, y: 200 } });
      await expect(page.locator('body')).not.toHaveClass(/sidebar--opened/);
    }
  }
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => window.jQuery.fn.jquery)).toBe('3.7.1');
});

test('index and tag pagination preserve post lists and back links', async ({ page }) => {
  await page.goto('/');
  await page.locator('.pagination .older-posts').click();
  await expect(page).toHaveURL(/\/page2\//);
  await expect(page.locator('.post-feed .post')).toHaveCount(10);
  await page.goto('/tag/crypto/');
  await expect(page.locator('.post-feed .post').first()).toBeVisible();
  await page.locator('.pagination .older-posts').click();
  await expect(page).toHaveURL(/\/tag\/crypto\/page2\//);
  await expect(page.locator('.pagination .newer-posts')).toHaveAttribute('href', /\/tag\/crypto\/?$/);
});

test('no page errors or candidate CSP violations on representative pages', async ({ page }) => {
  await page.addInitScript(() => {
    window.siteCspViolations = [];
    document.addEventListener('securitypolicyviolation', event => {
      window.siteCspViolations.push(event.effectiveDirective + ': ' + event.blockedURI);
    });
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/', '/about', '/contact', '/Crypto-News-Podcast', '/I-left-Google-to-join-Coinbase']) {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response.status(), path).toBe(200);
    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => window.siteCspViolations), path).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('preview sends no GA page views and retains newsletter action', async ({ page }) => {
  const analyticsRequests = [];
  page.on('request', request => { if (/google-analytics\.com.*collect/.test(request.url())) analyticsRequests.push(request.url()); });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(analyticsRequests).toEqual([]);
  await expect(page.locator('.newsletter-box form')).toHaveAttribute('action', /scottshapiro\.us16\.list-manage\.com\/subscribe\/post/);
});

test('missing pages and leaked log return a real custom 404', async ({ request }) => {
  for (const path of ['/not-a-real-page', '/wp-content/uploads/mc4wp-debug-log.php']) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('Page not found');
  }
});

test('production initializes the retained GA4 property exactly once', async ({ page }) => {
  let loaders = 0;
  await page.route('https://www.googletagmanager.com/gtag/js?*', async route => {
    loaders += 1;
    await route.fulfill({ contentType: 'application/javascript', body: 'window.siteGaLoaded = true;' });
  });
  await page.route('https://scottshapiro.com/**', async route => {
    const url = new URL(route.request().url());
    const response = await route.fetch({ url: 'http://127.0.0.1:4173' + url.pathname + url.search });
    await route.fulfill({ response });
  });
  await page.goto('https://scottshapiro.com/', { waitUntil: 'domcontentloaded' });
  await expect.poll(() => page.evaluate(() => window.siteGaLoaded)).toBe(true);
  const configs = await page.evaluate(() => window.dataLayer.map(item => Array.from(item)).filter(item => item[0] === 'config'));
  expect(configs).toEqual([['config', 'G-RS9EXPE2CJ']]);
  expect(loaders).toBe(1);
});
