const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'https://dwildt.github.io/letshelpit/';
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'docs', 'screenshots');

// Viewports
const DESKTOP_VIEWPORT = { width: 1280, height: 800 };
const MOBILE_VIEWPORT = { width: 375, height: 667 };

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    // Desktop screenshots
    await captureDesktopScreenshots(browser);

    // Mobile screenshots
    await captureMobileScreenshots(browser);

    console.log('✅ All screenshots captured successfully!');
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function captureDesktopScreenshots(browser) {
  const page = await browser.newPage();
  await page.setViewport(DESKTOP_VIEWPORT);

  console.log('📸 Capturing desktop screenshots...');

  try {
    // 1. Home page
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'desktop', 'home-page.png'),
      fullPage: false
    });
    console.log('  ✓ home-page.png');
  } catch (error) {
    console.log('  ✗ home-page.png failed:', error.message);
  }

  try {
    // 2. Filters modal
    await page.click('button#filters-btn');
    await page.waitForSelector('#filters-modal:not(.hidden)', { timeout: 5000 });
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'desktop', 'filters-modal.png'),
      fullPage: false
    });
    console.log('  ✓ filters-modal.png');

    // Close modal
    await page.evaluate(() => closeFiltersModal());
    await page.waitForTimeout(500);
  } catch (error) {
    console.log('  ✗ filters-modal.png failed:', error.message);
  }

  await page.close();
}

async function captureMobileScreenshots(browser) {
  const page = await browser.newPage();
  await page.setViewport(MOBILE_VIEWPORT);
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15');

  console.log('📱 Capturing mobile screenshots...');

  try {
    // 1. Mobile home
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'mobile', 'mobile-home.png'),
      fullPage: true
    });
    console.log('  ✓ mobile-home.png');
  } catch (error) {
    console.log('  ✗ mobile-home.png failed:', error.message);
  }

  try {
    // 2. Mobile filters
    await page.click('button#filters-btn-mobile');
    await page.waitForSelector('#filters-modal:not(.hidden)', { timeout: 5000 });
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'mobile', 'mobile-filters.png'),
      fullPage: true
    });
    console.log('  ✓ mobile-filters.png');

    // Close modal
    await page.evaluate(() => closeFiltersModal());
    await page.waitForTimeout(500);
  } catch (error) {
    console.log('  ✗ mobile-filters.png failed:', error.message);
  }

  await page.close();
}

// Run
captureScreenshots().catch(console.error);
