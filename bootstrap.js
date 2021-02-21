const { chromium, firefox, webkit } = require('playwright');

before(async function () {
  if (global.browser === undefined) {
    const browserName = process.env.BROWSER || 'chromium';
    const browserType = {
      undefined: chromium,
      chromium,
      firefox,
      webkit
    }[browserName];
    global.browser = await browserType.launch({
      headless: process.env.HEAD !== 'true' /* ,devtools: true */
    });
    const version = global.browser.version();
    console.log(`Test running on ${browserName} ${version}`);
    global.ctx = await global.browser.newContext();
    // Default timeout of 5 seconds
    global.ctx.setDefaultTimeout(20_000);
  }
});

after(async function () {
  // Don't close the browser on watch mode
  if (process.env.WATCH !== 'true') {
    await global.browser.close();
  }
});

global.closePage = async function (page) {
  // Don't close page on watch mode
  if (page !== undefined && process.env.WATCH !== 'true') {
    await page.close();
  }
};
