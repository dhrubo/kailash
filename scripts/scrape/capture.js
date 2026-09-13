// One-off reference scraper for kailash-shivanandam.com
// Captures full-page screenshots (desktop) + header-only crops, collects every
// image URL referenced on each page (img/src, srcset, css background-image),
// and downloads them into scripts/scrape/downloaded/.
// Run: node scripts/scrape/capture.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE = 'https://kailash-shivanandam.com';
const PAGES = [
  { slug: 'home', url: `${BASE}/` },
  { slug: 'about-kailash', url: `${BASE}/about-kailash/` },
  { slug: 'anandam-london', url: `${BASE}/anandam-london/` },
  { slug: 'publications', url: `${BASE}/publications/` },
  { slug: 'activities', url: `${BASE}/activities/` },
  { slug: 'gallery', url: `${BASE}/gallery/` },
  { slug: 'contact-us', url: `${BASE}/contact-us/` },
  { slug: 'donation', url: `${BASE}/donation/` },
];

const OUT_SHOTS = path.join(__dirname, 'screenshots');
const OUT_DOWNLOADS = path.join(__dirname, 'downloaded');
const MANIFEST_PATH = path.join(__dirname, 'image-manifest.json');

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
    });
    req.on('error', reject);
  });
}

function filenameFromUrl(url) {
  try {
    const u = new URL(url);
    return decodeURIComponent(path.basename(u.pathname));
  } catch {
    return path.basename(url.split('?')[0]);
  }
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();

  const allImageUrls = new Set();
  const manifest = {};

  for (const { slug, url } of PAGES) {
    console.log(`\n=== ${slug} : ${url} ===`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    } catch (e) {
      console.log(`  goto warning: ${e.message}`);
    }
    await page.waitForTimeout(1500);

    // full page screenshot
    const shotPath = path.join(OUT_SHOTS, `${slug}-full.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    console.log(`  saved ${shotPath}`);

    // header-only crop
    try {
      const header = await page.$('header, .site-header, #header, [class*="header"]');
      if (header) {
        const headerShot = path.join(OUT_SHOTS, `${slug}-header.png`);
        await header.screenshot({ path: headerShot });
        console.log(`  saved ${headerShot}`);
      }
    } catch (e) {
      console.log(`  header crop skipped: ${e.message}`);
    }

    // collect image urls: <img src>, <img srcset>, <source srcset>, inline style background-image, <link rel="preload" as="image">
    const urls = await page.evaluate(() => {
      const found = new Set();
      document.querySelectorAll('img').forEach((img) => {
        if (img.src) found.add(img.src);
        if (img.srcset) {
          img.srcset.split(',').forEach((part) => {
            const u = part.trim().split(' ')[0];
            if (u) found.add(u);
          });
        }
        const dataSrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        if (dataSrc) found.add(dataSrc);
      });
      document.querySelectorAll('source').forEach((s) => {
        if (s.srcset) {
          s.srcset.split(',').forEach((part) => {
            const u = part.trim().split(' ')[0];
            if (u) found.add(u);
          });
        }
      });
      document.querySelectorAll('*').forEach((el) => {
        const bg = getComputedStyle(el).backgroundImage;
        if (bg && bg.includes('url(')) {
          const matches = bg.matchAll(/url\((['"]?)(.*?)\1\)/g);
          for (const m of matches) {
            if (m[2] && !m[2].startsWith('data:')) found.add(m[2]);
          }
        }
      });
      return Array.from(found);
    });

    const absUrls = urls.map((u) => {
      try {
        return new URL(u, location.href).href;
      } catch {
        return new URL(u, 'https://kailash-shivanandam.com/').href;
      }
    });

    manifest[slug] = absUrls;
    absUrls.forEach((u) => allImageUrls.add(u));
    console.log(`  found ${absUrls.length} image urls`);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written: ${MANIFEST_PATH} (${allImageUrls.size} unique images total)`);

  // download all unique images
  let ok = 0, fail = 0;
  for (const url of allImageUrls) {
    const fname = filenameFromUrl(url);
    const dest = path.join(OUT_DOWNLOADS, fname);
    try {
      await download(url, dest);
      ok++;
    } catch (e) {
      fail++;
      console.log(`  FAILED ${url}: ${e.message}`);
    }
  }
  console.log(`\nDownloaded ${ok} images, ${fail} failed.`);

  await browser.close();
})();
