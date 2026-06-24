import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'og-image.html');
const outPath  = resolve(__dirname, 'public', 'og-default.png');

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => document.fonts.ready);

const card = await page.$('#card');
await card.screenshot({ path: outPath, omitBackground: false });

await browser.close();
console.log(`Saved → ${outPath}`);
