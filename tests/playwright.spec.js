const chai = require('chai');

const { expect } = chai;

let page;

// Tips :to run only one test  append '.only' after describe
describe('A first sample Playwright test', () => {
  before(async function () {
    page = await global.ctx.newPage();
  });

  after(async function () {
    return global.closePage(page);
  });

  it('Search Playwright documentation from Goggle', async () => {
    await page.goto('https://google.com?hl=en');
    const frames = page.frames();

    // Need to accept Google license when present as IFrame
    if (frames.length === 2) {
      await frames[1].click('"I agree"');
    }
    // Wait on input search, fill it and search
    await page
      .waitForSelector('input[name="q"]')
      .then((input) =>
        input.fill('Playwright doc').then(() => input.press('Enter'))
      );
    return Promise.all([
      page.waitForNavigation({ url: new RegExp('.*playwright.*') }), // The promise resolves after navigatin
      page.click('[role=main] >> text="Getting Started"')
    ]);
  });

  it('Navigate on Playwright documentation', async () => {
    expect(await page.title()).to.equal('Getting Started | Playwright');
    await page.fill('//input[@placeholder="Search"]', 'selector');
    await page.click('"Element selectors"');
    await page.click('"Basic text selectors"');
    expect(await page.title()).to.equal('Element selectors | Playwright');
  });

  it('Naviagte on release notes', async () => {
    // Click on the 'a' href rigth of the text 'API'
    await page.click('a:right-of(:text("API"))');
    await page.click('"All versions"');
    return Promise.all([
      page.waitForNavigation({ url: new RegExp('.*github.*') }), // The promise resolves after navigatin
      page.click('"Release Notes"')
    ]);
  });
});
