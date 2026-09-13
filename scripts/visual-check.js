// Visual QA helper: screenshots every page at mobile + desktop widths.
// Usage: node scripts/visual-check.js <outDir> [baseUrl] [prefix]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const pages = [
  '/', '/about-kailash/', '/about-maharaja/', '/anandam-london/',
  '/publications/', '/activities/', '/gallery/', '/contact-us/',
  '/donation/', '/news-and-update/', '/thank-you/',
];

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};

const outDir = process.argv[2] || 'test-evidence';
const baseUrl = process.argv[3] || 'http://localhost:8080';
const prefix = process.argv[4] || '';

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const [vpName, vp] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport: vp });
    for (const p of pages) {
      const url = baseUrl + p;
      const name = p === '/' ? 'home' : p.replace(/\//g, '');
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(400);
        const file = path.join(outDir, `${prefix}${vpName}-${name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`OK  ${vpName.padEnd(7)} ${url}`);
      } catch (e) {
        console.log(`FAIL ${vpName.padEnd(7)} ${url}: ${e.message}`);
      }
    }
    await page.close();
  }
  await browser.close();
})();
