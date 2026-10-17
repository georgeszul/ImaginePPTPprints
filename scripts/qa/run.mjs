// QA against a running preview of dist/. Usage: npm run qa
// Env: QA_BASE (default http://localhost:4321), QA_PATHS (comma-separated subset of the page list).
import { createRequire } from 'node:module';
import { existsSync, readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = fileURLToPath(new URL('../../', import.meta.url));
const req = createRequire(join(process.env.APPDATA, 'npm/node_modules/@playwright/cli/package.json'));
const { chromium } = req('playwright-core');
const BASE = process.env.QA_BASE ?? 'http://localhost:4321';
const OUT = join(repo, 'qa-shots');
mkdirSync(OUT, { recursive: true });
const ALL = ['/', '/services/', '/portfolio/', '/about/', '/contact/', '/thanks/', '/privacy/', '/es/', '/es/servicios/', '/es/portafolio/', '/es/nosotros/', '/es/contacto/', '/es/gracias/', '/es/privacidad/', '/es/404/'];
const PATHS = process.env.QA_PATHS ? process.env.QA_PATHS.split(',') : ALL;
const problems = [];
const fail = (msg) => problems.push(msg);

// Strings only in English JSON: they must not appear on Spanish pages.
const leaves = (n) => (n && typeof n === 'object' ? Object.values(n).flatMap(leaves) : [n]);
const load = (lang) => readdirSync(join(repo, 'src/i18n', lang)).flatMap((f) => leaves(JSON.parse(readFileSync(join(repo, 'src/i18n', lang, f), 'utf8'))));
const es = new Set(load('es'));
const enOnly = load('en').filter((s) => typeof s === 'string' && s.length > 6 && !es.has(s));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const browser = await chromium.launch({ channel: 'chrome' });
async function open(path, { width = 1280, height = 800, theme = 'light', js = true } = {}) {
  const mobile = width < 768;
  const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, javaScriptEnabled: js, reducedMotion: 'reduce' });
  await ctx.addInitScript((t) => { try { localStorage.setItem('theme', t); } catch {} }, theme);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(BASE + path, { waitUntil: 'load' });
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 6000); }))));
    // Full-page captures skip images still decoding off-screen (decoding="async"); decode them first.
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  });
  return { page, ctx, errors };
}

// Matrix: every page at 1280 (light, dark), 375 (light, dark) and 320 (light).
for (const [width, theme] of [[1280, 'light'], [1280, 'dark'], [375, 'light'], [375, 'dark'], [320, 'light']]) {
  for (const path of PATHS) {
    const { page, ctx, errors } = await open(path, { width, height: width === 1280 ? 800 : 740, theme });
    const tag = `${width}/${theme}${path}`;
    const r = await page.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      overflow: document.documentElement.scrollWidth - innerWidth,
      wide: [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('[data-scroll-x], dialog')).slice(0, 5).map((e) => e.tagName + '.' + e.className),
      broken: [...document.images].filter((im) => im.complete && im.naturalWidth === 0 && im.getAttribute('src')).map((im) => im.src),
      unfilled: [...document.querySelectorAll('figure.fig img')].filter((im) => {
        const a = im.getBoundingClientRect(), b = im.closest('.frame').getBoundingClientRect();
        // cover crops and contain letterboxes; both keep the photo's proportions (never stretched).
        return !['cover', 'contain'].includes(getComputedStyle(im).objectFit) || Math.abs(a.width - b.width) > 1 || Math.abs(a.height - b.height) > 1;
      }).length,
      small: [...document.querySelectorAll('a, button, select, input:not([type=hidden]), summary')].filter((e) => {
        const b = e.getBoundingClientRect();
        return b.width > 0 && (b.width < 44 || b.height < 44) && !e.closest('p, li, dd, td, .inline-ok, .visually-hidden');
      }).slice(0, 5).map((e) => e.outerHTML.slice(0, 80)),
      text: document.body.innerText,
    }));
    if (r.theme !== theme) fail(`${tag}: theme ${r.theme}`);
    if (r.overflow > 0) fail(`${tag}: horizontal overflow ${r.overflow}px`);
    if (r.wide.length) fail(`${tag}: wider than viewport: ${r.wide.join(', ')}`);
    if (r.broken.length) fail(`${tag}: broken images ${r.broken.join(' ')}`);
    if (r.unfilled) fail(`${tag}: ${r.unfilled} figure photos do not fill their frame`);
    if (r.small.length) fail(`${tag}: touch targets under 44px: ${r.small.join(' | ')}`);
    if (path.startsWith('/es/')) {
      const leaked = enOnly.filter((s) => new RegExp(`(?<!\\p{L})${esc(s)}(?!\\p{L})`, 'u').test(r.text));
      if (leaked.length) fail(`${tag}: English text on Spanish page: ${leaked.slice(0, 5).join(' | ')}`);
    }
    if (errors.length) fail(`${tag}: console errors: ${[...new Set(errors)].join(' | ')}`);
    if (width !== 320) {
      const name = path.replace(/\//g, '_') || '_';
      await page.screenshot({ path: join(OUT, `${width}-${theme}${name}.jpeg`), fullPage: true, type: 'jpeg', quality: 60 });
    }
    await ctx.close();
  }
}

// Page-specific checks: one module per owning task in scripts/qa/checks/.
const dir = join(repo, 'scripts/qa/checks');
if (existsSync(dir)) {
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.mjs')).sort()) {
    const mod = await import(pathToFileURL(join(dir, f)).href);
    await mod.default({ open, fail, repo });
  }
}

await browser.close();
console.log(problems.length ? problems.join('\n') : 'QA: no problems found');
process.exitCode = problems.length ? 1 : 0;
