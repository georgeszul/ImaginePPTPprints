# Imagine PPTP Prints Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy PHP site with a fast, bilingual (EN/ES), light/dark Astro static site that keeps every real business fact and gets visitors to request quotes.

**Architecture:** Astro 5 static output. All page text lives in per-page JSON files per language (`src/i18n/{en,es}/*.json`) and is read through `t()`. Business facts live once in `src/data/site.ts`. Each page is a "view" component taking `lang`, mounted by one-line route files for `/` and `/es/`. Photos are optimized by `astro:assets`. The quote form posts natively to Netlify Forms. The only unit-tested logic (price calculator, translation key parity, internal links) runs on Node's built-in test runner and a small link-check script.

**Tech Stack:** Astro 5.18.2, TypeScript 5.9.3 (`astro check` only), `@fontsource/fredoka` 5.3.0, `@fontsource/nunito` 5.3.0, Node 24 (`node --test`), Netlify (hosting + Forms).

**Spec:** `docs/superpowers/specs/2026-10-08-site-rebuild-design.md`. Read it before starting. Section numbers below (§) refer to it.

## Deviations from the spec (deliberate, smaller)

| Spec says | Plan does | Why |
|---|---|---|
| `@astrojs/sitemap` | `src/pages/sitemap.xml.ts` endpoint (about 15 lines) | The current sitemap release (3.7.4) targets newer Astro and zod 4. A static 12-URL list doesn't need a dependency. |
| Astro `i18n` config | Manual route map in `src/i18n/routes.ts` | Spanish slugs (`/es/servicios/`) need a map anyway. Astro's helpers add nothing here. |
| `src/i18n/en.json`, `es.json` | `src/i18n/en/<page>.json`, `src/i18n/es/<page>.json` | One file per page per language, so each task owns its own files. `t()` still takes `"page.key"`. |
| Astro 7 (latest) | Astro **5.18.2** | 7.3.8 shipped today and 7.x is newer than the implementer's verified API knowledge. 5.18.2 is stable and the output is plain static HTML. Upgrading later is a separate task. |
| "if JS submission fails, show a message" | Native POST to Netlify (no JS submission) | Fewer moving parts. The thanks and contact pages always show phone and WhatsApp. |
| "design files / reference images" (multiple) | One `design_file` and one `reference_image` input | Netlify Forms' handling of `multiple` is not verified. Bigger batches go by WhatsApp or email (stated on the form). |

## Global Constraints

- Repo root: `C:\Users\georg\Desktop\ImaginePPTPprints` (Git Bash: `cd /c/Users/georg/Desktop/ImaginePPTPprints`). Branch: `rebuild-astro`. Never push. The owner pushes.
- Exact dependency versions: `astro@5.18.2`, `@fontsource/fredoka@5.3.0`, `@fontsource/nunito@5.3.0`. Dev: `@astrojs/check@0.9.10`, `typescript@5.9.3`. No other packages: no React, Tailwind, jQuery, or sitemap integration.
- Business name everywhere: **Imagine PPTP Prints**. Email: `imaginepttp@gmail.com`. Phone: `(331) 255-5330` / `tel:+13312555330`. WhatsApp: `https://wa.me/13312555330`.
- Facts: standard turnaround **24-48 hours**, rush **same day**, large orders **2-3 days**, **no minimums**, **always open**. Never write "3-5 business days", "3-7 business days", minimum quantities, or Mon-Fri hours.
- No invented testimonials, ratings, or stats anywhere.
- Every user-visible string comes from `src/i18n/{en,es}/*.json` through `t()`/`tRaw()`, except business facts from `src/data/site.ts` and brand names (Facebook, TikTok, WhatsApp).
- `en` and `es` JSON must have identical key sets (`npm test` enforces this).
- All routes end in `/` (`trailingSlash: 'always'`).
- Colors only through the CSS custom properties in `src/styles/global.css`. Exceptions: the fixed ink `#111` used for outlines and button text, and the error box colors.
- Every `localStorage` access is wrapped in try/catch.
- Commit messages end with: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

## Review Focus

These failure modes are implied by the spec but no unit test exercises them. Each one has a test step in the task that owns it.

1. **Storage blocked (private mode or strict settings):** the page still renders in the OS theme, the theme toggle still flips for the visit, and there are no console errors. *Pinned in Task 4, Step 9.*
2. **Odd calculator input** (empty, `0`, `-3`, `1e5`, `abc`, `12.7`): totals show real dollar amounts for quantity 1 or 10,000, never `NaN` or `$Infinity`. *Pinned in Task 2 tests (`clampQty`) and Task 8, Step 6.*
3. **Quote form with JS:** fields in hidden service groups never block submission or get sent, and attachments over 8 MB are stopped with a readable message before upload. *Pinned in Task 11, Step 8.*
4. **Broken internal links:** every `href`, `src`, `srcset`, `action`, and `#anchor` in the built site resolves, including each page's EN/ES switch and the home page's links to service anchors. *Pinned in Task 12, `scripts/check-links.mjs`.*
5. **Narrow phones (320px):** no horizontal scroll on any page, and the mobile bottom bar never covers the form's submit button or the footer. *Pinned in Task 13, Step 4.*

---

## File map (final state)

```
astro.config.mjs                 site URL + trailingSlash
netlify.toml                     build, Node 22, /es/* 404
package.json / package-lock.json
tsconfig.json
README.md
scripts/check-links.mjs          dist/ internal link checker
public/favicon.svg
src/
  assets/logo.jpg
  assets/photos/<category>/<slug>.jpg
  data/site.ts                   business facts
  data/photos.ts                 photo list + guard
  i18n/routes.ts                 page keys → EN/ES paths, Lang type
  i18n/t.ts                      t(), tRaw()
  i18n/{en,es}/common.json faq.json home.json services.json portfolio.json about.json contact.json thanks.json notfound.json
  lib/calc.js + calc.test.js     price estimate (pure)
  lib/i18n.test.js               en/es parity
  styles/global.css              tokens + base + utilities
  layouts/Base.astro             <head>, theme script, header/footer/floating contact
  components/Icon.astro ThemeToggle.astro LangSwitch.astro Header.astro Footer.astro FloatingContact.astro
             Photo.astro Cta.astro Faq.astro Marquee.astro PriceCalculator.astro Gallery.astro QuoteForm.astro
  views/Home.astro Services.astro Portfolio.astro About.astro Contact.astro Thanks.astro NotFound.astro
  pages/index.astro services.astro portfolio.astro about.astro contact.astro thanks.astro 404.astro
  pages/es/index.astro servicios.astro portafolio.astro nosotros.astro contacto.astro gracias.astro 404.astro
  pages/sitemap.xml.ts robots.txt.ts
```

---

### Task 1: Scaffold Astro and remove the legacy site from the tree

**Files:**
- Delete (git rm): every tracked file except `images/`, `docs/`, `.gitignore`
- Modify: `.gitignore`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `netlify.toml`, `src/pages/index.astro` (temporary, replaced in Task 7)

**Interfaces:**
- Produces: `npm run dev|build|preview|check|test` scripts. Later tasks add `check:links`.

- [ ] **Step 1: Remove legacy tracked files**

```bash
cd /c/Users/georg/Desktop/ImaginePPTPprints
git status --short   # expect empty (clean tree on rebuild-astro)
git rm -r -q -- . ':(exclude)images' ':(exclude)docs' ':(exclude).gitignore'
git status --short | head
```
Expected: many `D ` lines. `images/` and `docs/` untouched. Ignored files (`config/database.php`, `config/email.php`, `backup_html_files/`) stay on disk. That's intended.

- [ ] **Step 2: Replace `.gitignore`**

```gitignore
# build output and caches
node_modules/
dist/
.astro/
.netlify/

# env
.env
.env.*

# legacy files kept on disk only (old site lives at tag legacy-php-site)
backup_html_files/
config/

# OS / editor
Thumbs.db
Desktop.ini
.DS_Store
.vscode/
.idea/
*.log
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "imagine-pptp-prints",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "node --test \"src/lib/*.test.js\""
  },
  "dependencies": {
    "@fontsource/fredoka": "5.3.0",
    "@fontsource/nunito": "5.3.0",
    "astro": "5.18.2"
  },
  "devDependencies": {
    "@astrojs/check": "0.9.10",
    "typescript": "5.9.3"
  }
}
```

Run: `npm install`
Expected: completes, creates `package-lock.json` and `node_modules/`.

- [ ] **Step 4: Create `astro.config.mjs`, `tsconfig.json`, `netlify.toml`**

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';

// ponytail: placeholder production URL; replace with the real domain at launch.
export default defineConfig({
  site: 'https://imaginepptpprints.netlify.app',
  trailingSlash: 'always',
});
```

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

- [ ] **Step 5: Temporary home page so the build has output**

`src/pages/index.astro`:
```astro
---
---
<html lang="en">
  <head><meta charset="utf-8" /><title>Imagine PPTP Prints</title></head>
  <body><h1>Imagine PPTP Prints</h1></body>
</html>
```

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: `1 page(s) built`, and `dist/index.html` exists.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Astro project and remove legacy PHP site from tree

The PHP site remains available at tag legacy-php-site.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Price calculator logic (TDD)

**Files:**
- Create: `src/lib/calc.test.js`, `src/lib/calc.js`

**Interfaces:**
- Produces (used by Task 8):
  - `estimate({ product, quantity, method, colors, turnaround }) → { base, print, color, volumeDiscount, turnaroundCost, total, unit, effectiveQty }`. All money values are numbers rounded to cents. `volumeDiscount` is a fraction (0.05). `turnaroundCost` can be negative.
  - `clampQty(raw) → integer in [1, 10000]`
  - `volumeDiscount(qty) → 0 | 0.05 | 0.1 | 0.15`
  - `nextTier(qty) → { min, discount } | null`
  - `APPAREL: string[]` (`['tshirt','hoodie','hat']`), `PRODUCTS: string[]`

- [ ] **Step 1: Write the failing tests** (`src/lib/calc.test.js`)

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimate, clampQty, volumeDiscount, nextTier, APPAREL } from './calc.js';

const tee = { product: 'tshirt', method: 'screen', colors: '1', turnaround: 'standard' };

test('10 tees, screen, 1 color, standard', () => {
  const r = estimate({ ...tee, quantity: 10 });
  assert.equal(r.base, 80);
  assert.equal(r.print, 25);
  assert.equal(r.color, 0);
  assert.equal(r.total, 105);
  assert.equal(r.unit, 10.5);
});

test('rush adds 30%', () => {
  const r = estimate({ ...tee, quantity: 10, turnaround: 'rush' });
  assert.equal(r.total, 136.5);
  assert.equal(r.unit, 13.65);
  assert.equal(r.turnaroundCost, 31.5);
});

test('50 hoodies, DTG, 2 colors gets 10% volume discount', () => {
  const r = estimate({ product: 'hoodie', quantity: 50, method: 'dtg', colors: '2', turnaround: 'standard' });
  assert.equal(r.volumeDiscount, 0.1);
  assert.equal(r.total, 1215);
  assert.equal(r.unit, 24.3);
});

test('25 tees, extended turnaround: 5% volume then -10%', () => {
  const r = estimate({ ...tee, quantity: 25, turnaround: 'extended' });
  assert.equal(r.total, 224.44);
  assert.equal(r.unit, 8.98);
  assert.equal(r.turnaroundCost, -24.94);
});

test('business cards ignore print method and colors (bug fix)', () => {
  const r = estimate({ product: 'businesscard', quantity: 100, method: 'embroidery', colors: '4', turnaround: 'standard' });
  assert.equal(r.print, 0);
  assert.equal(r.color, 0);
  assert.equal(r.total, 21.25);
  assert.equal(r.unit, 0.21);
});

test('business cards print in batches of 100 (effective quantity)', () => {
  const r = estimate({ product: 'businesscard', quantity: 10, method: 'screen', colors: '1', turnaround: 'standard' });
  assert.equal(r.effectiveQty, 100);
  assert.equal(r.total, 21.25);
  assert.equal(r.unit, 0.21);
});

test('banner assumes 6 sq ft and ignores print/colors', () => {
  const r = estimate({ product: 'banner', quantity: 1, method: 'vinyl', colors: '3', turnaround: 'standard' });
  assert.equal(r.total, 21);
});

test('stickers ignore print/colors', () => {
  const r = estimate({ product: 'sticker', quantity: 10, method: 'dtg', colors: '2', turnaround: 'standard' });
  assert.equal(r.total, 15);
  assert.equal(r.unit, 1.5);
});

test('clampQty handles junk input', () => {
  assert.equal(clampQty(''), 1);
  assert.equal(clampQty(null), 1);
  assert.equal(clampQty('abc'), 1);
  assert.equal(clampQty('0'), 1);
  assert.equal(clampQty('-3'), 1);
  assert.equal(clampQty('12.7'), 12);
  assert.equal(clampQty('1e5'), 10000);
  assert.equal(clampQty(20000), 10000);
});

test('estimate never returns NaN for junk quantity', () => {
  const r = estimate({ ...tee, quantity: 'abc' });
  assert.equal(r.effectiveQty, 1);
  assert.ok(Number.isFinite(r.total) && Number.isFinite(r.unit));
});

test('volume tiers at the boundaries', () => {
  assert.equal(volumeDiscount(24), 0);
  assert.equal(volumeDiscount(25), 0.05);
  assert.equal(volumeDiscount(49), 0.05);
  assert.equal(volumeDiscount(50), 0.1);
  assert.equal(volumeDiscount(99), 0.1);
  assert.equal(volumeDiscount(100), 0.15);
});

test('nextTier points at the next discount', () => {
  assert.deepEqual(nextTier(10), { min: 25, discount: 0.05 });
  assert.deepEqual(nextTier(30), { min: 50, discount: 0.1 });
  assert.equal(nextTier(100), null);
});

test('only apparel gets print/color charges', () => {
  assert.deepEqual(APPAREL, ['tshirt', 'hoodie', 'hat']);
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module` … `calc.js`.

- [ ] **Step 3: Implement `src/lib/calc.js`**

```js
// Price estimate for the Services page calculator. Numbers come from the legacy
// js/price-calculator.js; print/color charges now apply to apparel only (spec §6.3).

export const PRODUCTS = ['tshirt', 'hoodie', 'hat', 'banner', 'businesscard', 'sticker'];
export const APPAREL = ['tshirt', 'hoodie', 'hat'];

const BASE = { tshirt: 8, hoodie: 22, hat: 12, banner: 3.5, businesscard: 0.25, sticker: 1.5 };
const METHOD = { screen: 2.5, dtg: 4, embroidery: 6, heat: 3, vinyl: 5 };
const COLOR = { 1: 0, 2: 1, 3: 2, 4: 3.5 };
const TURNAROUND = { standard: 1, rush: 1.3, extended: 0.9 };
const TIERS = [
  { min: 100, discount: 0.15 },
  { min: 50, discount: 0.1 },
  { min: 25, discount: 0.05 },
];
const BANNER_SQFT = 6;
const CARD_BATCH = 100;
const MAX_QTY = 10000;

const cents = (n) => Math.round(n * 100) / 100;

export function clampQty(raw) {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, MAX_QTY);
}

export function volumeDiscount(qty) {
  return TIERS.find((t) => qty >= t.min)?.discount ?? 0;
}

export function nextTier(qty) {
  return [...TIERS].reverse().find((t) => qty < t.min) ?? null;
}

export function estimate({ product, quantity, method, colors, turnaround }) {
  const qty = clampQty(quantity);
  const effectiveQty = product === 'businesscard' ? Math.max(qty, CARD_BATCH) : qty;
  const apparel = APPAREL.includes(product);
  const unitBase = (BASE[product] ?? 10) * (product === 'banner' ? BANNER_SQFT : 1);

  const base = unitBase * effectiveQty;
  const print = apparel ? (METHOD[method] ?? 0) * effectiveQty : 0;
  const color = apparel ? (COLOR[colors] ?? 0) * effectiveQty : 0;
  const discount = volumeDiscount(effectiveQty);
  const subtotal = (base + print + color) * (1 - discount);
  const total = subtotal * (TURNAROUND[turnaround] ?? 1);

  return {
    base: cents(base),
    print: cents(print),
    color: cents(color),
    volumeDiscount: discount,
    turnaroundCost: cents(total - subtotal),
    total: cents(total),
    unit: cents(total / effectiveQty),
    effectiveQty,
  };
}
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `npm test`
Expected: all 13 tests pass, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add src/lib/calc.js src/lib/calc.test.js
git commit -m "Add price estimate logic with apparel-only print charges

Ports legacy calculator numbers; business cards, stickers, and banners no
longer get per-item print/color charges, and cards print in batches of 100.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Business facts, routes, translation lookup, and shared text

**Files:**
- Create: `src/data/site.ts`, `src/i18n/routes.ts`, `src/i18n/t.ts`
- Create: `src/i18n/en/common.json`, `src/i18n/es/common.json`, `src/i18n/en/faq.json`, `src/i18n/es/faq.json`
- Test: `src/lib/i18n.test.js`

**Interfaces:**
- Produces:
  - `site` (const object): `name, phone, phoneHref, whatsapp, email, street, locality, region, postalCode, country, addressLine, mapsUrl, facebook, tiktok, shopify, promoCode`
  - `type Lang = 'en' | 'es'`, `langs: readonly Lang[]`, `other(lang): Lang`
  - `routes: Record<PageKey, Record<Lang, string>>`, `type PageKey = 'home'|'services'|'portfolio'|'about'|'contact'|'thanks'`
  - `t(lang, 'ns.key.path'): string` (throws if missing or not a string)
  - `tRaw<T>(lang, 'ns.key.path'): T` (throws if missing)

- [ ] **Step 1: Write the failing parity test** (`src/lib/i18n.test.js`)

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const root = new URL('../i18n/', import.meta.url);

function load(lang) {
  const dir = new URL(`${lang}/`, root);
  return Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => [f.slice(0, -5), JSON.parse(readFileSync(new URL(f, dir), 'utf8'))]),
  );
}

function leaves(node, prefix = '') {
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
  }
  return [[prefix, node]];
}

const en = leaves(load('en'));
const es = leaves(load('es'));

test('en and es define exactly the same keys', () => {
  assert.deepEqual(es.map(([k]) => k).sort(), en.map(([k]) => k).sort());
});

test('no empty strings in either language', () => {
  const empty = [...en, ...es].filter(([, v]) => typeof v === 'string' && v.trim() === '').map(([k]) => k);
  assert.deepEqual(empty, []);
});

test('no banned stale facts', () => {
  const banned = /3-5 business days|3-7 business days|Monday-Friday|12 pieces|555\) 123|info@imaginepptp/i;
  const hits = [...en, ...es].filter(([, v]) => typeof v === 'string' && banned.test(v)).map(([k]) => k);
  assert.deepEqual(hits, []);
});
```

- [ ] **Step 2: Run and verify it fails**

Run: `npm test`
Expected: FAIL with `ENOENT` (no `src/i18n/en/` directory).

- [ ] **Step 3: Create `src/data/site.ts`**

```ts
// Business facts (spec §4.1). Language-neutral; page text lives in src/i18n.
export const site = {
  name: 'Imagine PPTP Prints',
  phone: '(331) 255-5330',
  phoneHref: 'tel:+13312555330',
  whatsapp: 'https://wa.me/13312555330',
  email: 'imaginepttp@gmail.com',
  street: '840 N State St',
  locality: 'Elgin',
  region: 'IL',
  postalCode: '60123',
  country: 'US',
  addressLine: '840 N State St, Northeast Elgin, IL 60123',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=840+N+State+St%2C+Elgin%2C+IL+60123',
  facebook: 'https://www.facebook.com/profile.php?id=61558797091752',
  tiktok: 'https://www.tiktok.com/t/ZP8kGeyLB/',
  shopify: 'https://68da1e-18.myshopify.com/',
  promoCode: 'FIRST10',
} as const;
```

- [ ] **Step 4: Create `src/i18n/routes.ts`**

```ts
export const langs = ['en', 'es'] as const;
export type Lang = (typeof langs)[number];
export const other = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

export const routes = {
  home: { en: '/', es: '/es/' },
  services: { en: '/services/', es: '/es/servicios/' },
  portfolio: { en: '/portfolio/', es: '/es/portafolio/' },
  about: { en: '/about/', es: '/es/nosotros/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
  thanks: { en: '/thanks/', es: '/es/gracias/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof routes;
```

- [ ] **Step 5: Create `src/i18n/t.ts`**

```ts
import type { Lang } from './routes';

type Tree = { [key: string]: unknown };

const modules = import.meta.glob<Tree>('./*/*.json', { eager: true, import: 'default' });
const dict: Record<Lang, Tree> = { en: {}, es: {} };
for (const [path, data] of Object.entries(modules)) {
  const m = path.match(/^\.\/(en|es)\/([\w-]+)\.json$/);
  if (m) dict[m[1] as Lang][m[2]] = data;
}

/** Any value (string, array, object) at a dotted key like "home.hero.title". Throws at build time if missing. */
export function tRaw<T = unknown>(lang: Lang, key: string): T {
  let node: unknown = dict[lang];
  for (const part of key.split('.')) {
    node = node !== null && typeof node === 'object' ? (node as Tree)[part] : undefined;
  }
  if (node === undefined) throw new Error(`Missing i18n key "${key}" for "${lang}"`);
  return node as T;
}

/** String at a dotted key. Throws if missing or not a string. */
export function t(lang: Lang, key: string): string {
  const value = tRaw(lang, key);
  if (typeof value !== 'string') throw new Error(`i18n key "${key}" for "${lang}" is not a string`);
  return value;
}
```

- [ ] **Step 6: Create `src/i18n/en/common.json`**

```json
{
  "skip": "Skip to content",
  "tagline": "Professional Printing Solutions",
  "spanish": "¡Hablamos español!",
  "nav": { "label": "Main", "home": "Home", "services": "Services", "portfolio": "Portfolio", "about": "About", "contact": "Contact", "menu": "Menu" },
  "cta": { "quote": "Get quote", "freeQuote": "Get free quote", "call": "Call now", "whatsapp": "Text on WhatsApp", "email": "Send email" },
  "theme": { "toggle": "Dark mode" },
  "lang": { "short": "ES", "label": "Ver en español" },
  "floating": { "label": "Quick contact", "call": "Call", "whatsapp": "WhatsApp", "quote": "Quote" },
  "ctaBlock": {
    "title": "Ready to Start Your Project?",
    "body": "Any questions? Feel free to text, call, or send an email. We're here to help!",
    "promo": "First-time customers get 10% off with code"
  },
  "footer": { "about": "Your trusted partner for professional printing solutions.", "links": "Quick links", "contact": "Contact info", "follow": "Follow us", "rights": "All rights reserved." },
  "social": { "shop": "Online store" }
}
```

- [ ] **Step 7: Create `src/i18n/es/common.json`**

```json
{
  "skip": "Saltar al contenido",
  "tagline": "Soluciones profesionales de impresión",
  "spanish": "¡Hablamos español!",
  "nav": { "label": "Principal", "home": "Inicio", "services": "Servicios", "portfolio": "Portafolio", "about": "Nosotros", "contact": "Contacto", "menu": "Menú" },
  "cta": { "quote": "Cotizar", "freeQuote": "Cotización gratis", "call": "Llama ahora", "whatsapp": "Escríbenos por WhatsApp", "email": "Envía un correo" },
  "theme": { "toggle": "Modo oscuro" },
  "lang": { "short": "EN", "label": "View in English" },
  "floating": { "label": "Contacto rápido", "call": "Llamar", "whatsapp": "WhatsApp", "quote": "Cotizar" },
  "ctaBlock": {
    "title": "¿Listo para empezar tu proyecto?",
    "body": "¿Tienes preguntas? Mándanos un mensaje, llámanos o envíanos un correo. ¡Estamos para ayudarte!",
    "promo": "Clientes nuevos obtienen 10% de descuento con el código"
  },
  "footer": { "about": "Tu socio de confianza para soluciones profesionales de impresión.", "links": "Enlaces rápidos", "contact": "Contacto", "follow": "Síguenos", "rights": "Todos los derechos reservados." },
  "social": { "shop": "Tienda en línea" }
}
```

- [ ] **Step 8: Create `src/i18n/en/faq.json`**

```json
{
  "title": "Frequently Asked Questions",
  "items": [
    { "q": "How fast can you deliver?", "a": "Our standard turnaround is 24-48 hours from artwork approval. Rush orders can be done the same day, so contact us if you're on a deadline." },
    { "q": "Do you have minimum orders?", "a": "No minimums! Whether you need 1 shirt or 1,000, we're here to help. Small orders are welcome." },
    { "q": "Can you help with design?", "a": "Absolutely! Send us your ideas, logos, or rough sketches and we'll create professional artwork for you at no extra charge." },
    { "q": "What's your pricing?", "a": "Pricing depends on the product, quantity, and design complexity. Try the price calculator on our Services page, or contact us for a free quote. We'll beat any competitor's price!" },
    { "q": "What file formats do you accept?", "a": "All the common ones: PNG, JPG, PDF, AI, EPS, PSD, and SVG. For the sharpest print, send vector files (AI, EPS, SVG, PDF) or images at 300 DPI. No design? No problem, we'll create one for you." },
    { "q": "Do you offer guarantees?", "a": "Yes! 100% satisfaction guaranteed. If you're not happy with the quality, we'll remake it or refund you. No questions asked." },
    { "q": "Can I see a proof before printing?", "a": "Absolutely. We send a digital proof for your approval before production starts, so you know exactly what you're getting." },
    { "q": "Do you ship nationwide?", "a": "Yes, we ship nationwide. We also offer local pickup at our Elgin location and contactless delivery for local customers." },
    { "q": "What payment methods do you accept?", "a": "We accept cash, credit cards, PayPal, Venmo, and Zelle. Payment is typically required before production begins, and payment plans are available for large orders." },
    { "q": "¿Hablan español?", "a": "¡Sí! Hablamos español y podemos ayudarte en tu idioma preferido. Yes! We speak Spanish and can help you in your preferred language." }
  ]
}
```

- [ ] **Step 9: Create `src/i18n/es/faq.json`**

```json
{
  "title": "Preguntas frecuentes",
  "items": [
    { "q": "¿Qué tan rápido entregan?", "a": "Nuestro tiempo estándar es de 24 a 48 horas después de aprobar el diseño. Los pedidos urgentes pueden estar listos el mismo día; contáctanos si tienes una fecha límite." },
    { "q": "¿Hay pedido mínimo?", "a": "¡Sin mínimos! Ya sea 1 camiseta o 1,000, estamos para ayudarte. Los pedidos pequeños son bienvenidos." },
    { "q": "¿Pueden ayudarme con el diseño?", "a": "¡Claro! Mándanos tus ideas, logotipos o bocetos y creamos un diseño profesional sin costo adicional." },
    { "q": "¿Cuánto cuesta?", "a": "El precio depende del producto, la cantidad y la complejidad del diseño. Prueba la calculadora de precios en nuestra página de Servicios o pide una cotización gratis. ¡Mejoramos el precio de cualquier competidor!" },
    { "q": "¿Qué formatos de archivo aceptan?", "a": "Los más comunes: PNG, JPG, PDF, AI, EPS, PSD y SVG. Para la mejor calidad, envía archivos vectoriales (AI, EPS, SVG, PDF) o imágenes a 300 DPI. ¿No tienes diseño? No hay problema, te creamos uno." },
    { "q": "¿Ofrecen garantía?", "a": "¡Sí! Satisfacción 100% garantizada. Si no te gusta la calidad, lo volvemos a hacer o te devolvemos tu dinero. Sin preguntas." },
    { "q": "¿Puedo ver una prueba antes de imprimir?", "a": "Claro. Te enviamos una prueba digital para que la apruebes antes de empezar la producción, así sabes exactamente lo que vas a recibir." },
    { "q": "¿Hacen envíos a todo el país?", "a": "Sí, enviamos a todo Estados Unidos. También puedes recoger tu pedido en nuestro local de Elgin, y ofrecemos entrega sin contacto para clientes locales." },
    { "q": "¿Qué formas de pago aceptan?", "a": "Aceptamos efectivo, tarjetas de crédito, PayPal, Venmo y Zelle. Normalmente el pago se hace antes de empezar la producción, y hay planes de pago para pedidos grandes." },
    { "q": "¿Hablan español?", "a": "¡Sí! Hablamos español y podemos ayudarte en tu idioma preferido." }
  ]
}
```

- [ ] **Step 10: Run tests and verify they pass**

Run: `npm test`
Expected: calc tests and 3 i18n tests pass.

- [ ] **Step 11: Commit**

```bash
git add src/data src/i18n src/lib/i18n.test.js
git commit -m "Add business facts, route map, translation lookup, and shared text

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Theme tokens, base layout, header, footer, floating contact

**Files:**
- Move: `images/mainLogo.jpg` → `src/assets/logo.jpg`, `images/favicon.svg` → `public/favicon.svg`
- Create: `src/styles/global.css`, `src/components/Icon.astro`, `src/components/ThemeToggle.astro`, `src/components/LangSwitch.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/FloatingContact.astro`, `src/layouts/Base.astro`
- Modify: `src/pages/index.astro` (temporary, uses Base until Task 7)

**Interfaces:**
- Consumes: `site`, `routes`, `langs`, `other`, `Lang`, `PageKey`, `t`
- Produces:
  - `<Base lang page title description noindex?>` with a default slot. `page: PageKey | null`; `null` means no canonical or hreflang (404).
  - `<Icon name size? label?>` with names `phone chat mail pin sun moon menu arrow clock truck check shop`
  - Global CSS classes: `.container .narrow .section .section--tint .page-head .lead .eyebrow .center .grid .card .btn .btn--primary .btn--ghost .btn-row .pill .checks .visually-hidden`
  - `<html>` gets `data-theme="light|dark"` and class `js` before paint.

- [ ] **Step 1: Move logo and favicon**

```bash
mkdir -p src/assets public
git mv images/mainLogo.jpg src/assets/logo.jpg
git mv images/favicon.svg public/favicon.svg
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
/* Theme tokens (spec §6.2). Light is the default; the inline script in Base.astro sets data-theme before paint. */
:root,
:root[data-theme='light'] {
  color-scheme: light;
  --bg: #ffffff;
  --surface: #eefafd;
  --surface-2: #ffffff;
  --ink: #111111;
  --ink-soft: #3b4652;
  --line: #111111;
  --line-soft: #d5e3ea;
  --brand: #22c3e6;
  --brand-deep: #2a7bc8;
  --link: #0e6694;
  --hero-bg: #22c3e6;
  --hero-ink: #111111;
  --accent: #ffd60a;
  --on-accent: #111111;
  --pop: #ff8a00;
  --focus: #0e6694;
  --shadow: 4px 4px 0 #111111;
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --bg: #0f1419;
  --surface: #18202a;
  --surface-2: #1f2933;
  --ink: #f2f5f7;
  --ink-soft: #b9c3cc;
  --line: #3a4a58;
  --line-soft: #2a3642;
  --brand: #22c3e6;
  --brand-deep: #5fb4ec;
  --link: #6fd6ef;
  --hero-bg: #0e3a4a;
  --hero-ink: #f2f5f7;
  --accent: #ffd60a;
  --on-accent: #111111;
  --pop: #ffa040;
  --focus: #6fd6ef;
  --shadow: 4px 4px 0 #000000;
}
/* ponytail: without JS the site stays light; add a prefers-color-scheme block if no-JS dark matters. */

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.65;
}
h1, h2, h3, h4 {
  font-family: 'Fredoka', 'Nunito', system-ui, sans-serif;
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 0.5em;
  letter-spacing: -0.01em;
}
h1 { font-size: clamp(2.1rem, 4vw + 1rem, 3.6rem); }
h2 { font-size: clamp(1.7rem, 2.5vw + 0.9rem, 2.5rem); }
h3 { font-size: 1.3rem; font-weight: 500; }
p { margin: 0 0 1em; }
a { color: var(--link); text-underline-offset: 0.15em; }
img { max-width: 100%; height: auto; display: block; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
main:focus { outline: none; }

.skip {
  position: absolute; left: 1rem; top: -4rem; z-index: 100;
  background: var(--accent); color: var(--on-accent);
  padding: 0.6rem 1rem; border: 2px solid #111; border-radius: 999px; font-weight: 700;
}
.skip:focus { top: 1rem; }

.container { width: min(1120px, 100% - 2rem); margin-inline: auto; }
.narrow { width: min(820px, 100% - 2rem); margin-inline: auto; }
.section { padding-block: clamp(3rem, 6vw, 5.5rem); }
.section--tint { background: var(--surface); }
.page-head {
  background: var(--hero-bg); color: var(--hero-ink);
  padding-block: clamp(2.5rem, 6vw, 4.5rem);
  border-bottom: 2px solid var(--line);
}
.page-head .lead { color: var(--hero-ink); }
.lead { font-size: 1.15rem; color: var(--ink-soft); max-width: 60ch; }
.eyebrow { font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.85rem; margin-bottom: 0.75rem; }
.center { text-align: center; }
.center .lead { margin-inline: auto; }

.grid { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); }
.card { background: var(--surface-2); border: 2px solid var(--line); border-radius: 20px; padding: 1.5rem; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  min-height: 48px; padding: 0.7rem 1.4rem;
  border: 2px solid #111; border-radius: 999px;
  font: 600 1.05rem/1 'Fredoka', system-ui, sans-serif;
  text-decoration: none; cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn--primary { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow); }
.btn--primary:hover { box-shadow: 5px 5px 0 #111; }
.btn--ghost { background: var(--surface-2); color: var(--ink); border-color: var(--line); }
.btn:hover { transform: translate(-1px, -1px); }
.btn-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.center .btn-row { justify-content: center; }

.pill {
  display: inline-block; padding: 0.3rem 0.85rem;
  border: 2px solid var(--line); border-radius: 999px;
  background: var(--surface-2); color: var(--ink);
  font-weight: 700; font-size: 0.95rem;
}

.checks { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; }
.checks li { position: relative; padding-left: 1.75rem; }
.checks li::before {
  content: ''; position: absolute; left: 0.1rem; top: 0.45em;
  width: 0.9rem; height: 0.5rem;
  border-left: 3px solid var(--brand-deep); border-bottom: 3px solid var(--brand-deep);
  transform: rotate(-45deg);
}

.visually-hidden {
  position: absolute !important; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 3: Create `src/components/Icon.astro`**

```astro
---
// Outline icons (paths adapted from Lucide, ISC license).
const icons = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shop: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
} as const;

interface Props {
  name: keyof typeof icons;
  size?: number;
  label?: string;
}
const { name, size = 20, label } = Astro.props;
---
<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
  focusable="false"
  set:html={icons[name]}
/>
```

- [ ] **Step 4: Create `src/components/ThemeToggle.astro` and `src/components/LangSwitch.astro`**

`ThemeToggle.astro`:
```astro
---
import Icon from './Icon.astro';
import type { Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const label = t(lang, 'common.theme.toggle');
---
<button type="button" class="theme-toggle" data-theme-toggle aria-pressed="false" aria-label={label} title={label}>
  <span class="sun"><Icon name="sun" /></span>
  <span class="moon"><Icon name="moon" /></span>
</button>

<style>
  .theme-toggle {
    display: inline-grid; place-items: center; width: 44px; height: 44px;
    border: 2px solid var(--line); border-radius: 999px;
    background: var(--surface-2); color: var(--ink); cursor: pointer;
  }
  .sun { display: none; }
  .moon { display: inline-flex; }
  :global([data-theme='dark']) .sun { display: inline-flex; }
  :global([data-theme='dark']) .moon { display: none; }
</style>

<script>
  const root = document.documentElement;
  for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
    const sync = () => btn.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    sync();
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage blocked (private mode): the choice lasts for this page view only.
      }
      sync();
    });
  }
</script>
```

`LangSwitch.astro`:
```astro
---
import { routes, other, type Lang, type PageKey } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang; page: PageKey | null }
const { lang, page } = Astro.props;
const to = other(lang);
const href = routes[page ?? 'home'][to];
---
<a class="lang" href={href} hreflang={to} lang={to} aria-label={t(lang, 'common.lang.label')}>{t(lang, 'common.lang.short')}</a>

<style>
  .lang {
    display: inline-grid; place-items: center; min-width: 44px; height: 44px; padding: 0 0.6rem;
    border: 2px solid var(--line); border-radius: 999px;
    background: var(--surface-2); color: var(--ink);
    font: 600 0.95rem/1 'Fredoka', system-ui, sans-serif; text-decoration: none;
  }
</style>
```

- [ ] **Step 5: Create `src/components/Header.astro`**

```astro
---
import { Image } from 'astro:assets';
import logo from '../assets/logo.jpg';
import Icon from './Icon.astro';
import ThemeToggle from './ThemeToggle.astro';
import LangSwitch from './LangSwitch.astro';
import { site } from '../data/site';
import { routes, type Lang, type PageKey } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang; page: PageKey | null }
const { lang, page } = Astro.props;
const nav = (['home', 'services', 'portfolio', 'about', 'contact'] as const).map((key) => ({
  key,
  href: routes[key][lang],
  label: t(lang, `common.nav.${key}`),
}));
---
<header class="header">
  <div class="container bar">
    <a class="brand" href={routes.home[lang]}>
      <Image src={logo} alt="" width={48} height={48} densities={[1, 2]} loading="eager" />
      <span>{site.name}</span>
    </a>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="site-nav" data-menu-btn>
      <Icon name="menu" /><span class="visually-hidden">{t(lang, 'common.nav.menu')}</span>
    </button>
    <nav id="site-nav" class="nav" aria-label={t(lang, 'common.nav.label')}>
      <ul>
        {nav.map((item) => (
          <li><a href={item.href} aria-current={item.key === page ? 'page' : undefined}>{item.label}</a></li>
        ))}
      </ul>
      <div class="tools">
        <LangSwitch lang={lang} page={page} />
        <ThemeToggle lang={lang} />
        <a class="btn btn--primary" href={routes.contact[lang]}>{t(lang, 'common.cta.quote')}</a>
      </div>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky; top: 0; z-index: 50;
    background: var(--bg);
    background: color-mix(in srgb, var(--bg) 92%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 2px solid var(--line-soft);
  }
  .bar { position: relative; display: flex; align-items: center; gap: 1rem; min-height: 72px; }
  .brand {
    display: inline-flex; align-items: center; gap: 0.6rem; margin-right: auto;
    color: var(--ink); text-decoration: none; font: 600 1.15rem/1.1 'Fredoka', system-ui, sans-serif;
  }
  .brand img { border-radius: 50%; }
  .nav { display: flex; align-items: center; gap: 1rem; }
  .nav ul { display: flex; gap: 0.25rem; list-style: none; margin: 0; padding: 0; }
  .nav ul a { display: block; padding: 0.55rem 0.8rem; border-radius: 999px; color: var(--ink); text-decoration: none; font-weight: 700; }
  .nav ul a:hover { background: var(--surface); }
  .nav ul a[aria-current='page'] { background: var(--brand); color: #111; }
  .tools { display: flex; align-items: center; gap: 0.5rem; }
  .menu-btn { display: none; }

  @media (max-width: 960px) {
    .bar { flex-wrap: wrap; }
    .nav { flex-wrap: wrap; justify-content: flex-end; }
    :global(.js) .menu-btn {
      display: inline-grid; place-items: center; width: 44px; height: 44px;
      border: 2px solid var(--line); border-radius: 999px; background: var(--surface-2); color: var(--ink); cursor: pointer;
    }
    :global(.js) .nav {
      display: none; position: absolute; top: 72px; left: 0; right: 0;
      flex-direction: column; align-items: stretch; gap: 1rem; padding: 1rem;
      background: var(--bg); border: 2px solid var(--line); border-radius: 0 0 20px 20px;
    }
    :global(.js) .nav.open { display: flex; }
    :global(.js) .nav ul { flex-direction: column; }
  }
  @media (max-width: 380px) {
    .brand span { font-size: 1rem; }
  }
</style>

<script>
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    const setOpen = (open: boolean) => {
      btn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
  }
</script>
```

- [ ] **Step 6: Create `src/components/Footer.astro` and `src/components/FloatingContact.astro`**

`Footer.astro`:
```astro
---
import { site } from '../data/site';
import { routes, type Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container cols">
    <div>
      <p class="name">{site.name}</p>
      <p>{t(lang, 'common.footer.about')}</p>
      <p lang="es">{t(lang, 'common.spanish')}</p>
    </div>
    <nav aria-label={t(lang, 'common.footer.links')}>
      <h2>{t(lang, 'common.footer.links')}</h2>
      <ul>
        {(['services', 'portfolio', 'about', 'contact'] as const).map((k) => (
          <li><a href={routes[k][lang]}>{t(lang, `common.nav.${k}`)}</a></li>
        ))}
      </ul>
    </nav>
    <div>
      <h2>{t(lang, 'common.footer.contact')}</h2>
      <ul>
        <li><a href={site.phoneHref}>{site.phone}</a></li>
        <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
        <li><a href={site.mapsUrl} target="_blank" rel="noopener">{site.addressLine}</a></li>
      </ul>
    </div>
    <div>
      <h2>{t(lang, 'common.footer.follow')}</h2>
      <ul>
        <li><a href={site.facebook} target="_blank" rel="noopener">Facebook</a></li>
        <li><a href={site.tiktok} target="_blank" rel="noopener">TikTok</a></li>
        <li><a href={site.shopify} target="_blank" rel="noopener">{t(lang, 'common.social.shop')}</a></li>
      </ul>
    </div>
  </div>
  <div class="container bottom">
    <p>© {year} {site.name}. {t(lang, 'common.footer.rights')}</p>
  </div>
</footer>

<style>
  .footer { background: var(--surface); border-top: 2px solid var(--line); padding-top: 3rem; margin-top: 0; }
  .cols { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); }
  .name { font: 600 1.3rem/1.2 'Fredoka', system-ui, sans-serif; }
  h2 { font-size: 1.05rem; margin-bottom: 0.75rem; }
  ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.4rem; }
  a { color: var(--ink); }
  .bottom { border-top: 2px solid var(--line-soft); margin-top: 2rem; padding-block: 1.25rem; font-size: 0.95rem; color: var(--ink-soft); }
  .bottom p { margin: 0; }
</style>
```

`FloatingContact.astro`:
```astro
---
import Icon from './Icon.astro';
import { site } from '../data/site';
import { routes, type Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
---
<aside class="float" aria-label={t(lang, 'common.floating.label')}>
  <a class="fab" href={site.phoneHref}><Icon name="phone" /><span>{t(lang, 'common.floating.call')}</span></a>
  <a class="fab fab--wa" href={site.whatsapp} target="_blank" rel="noopener"><Icon name="chat" /><span>{t(lang, 'common.floating.whatsapp')}</span></a>
  <a class="fab fab--quote" href={routes.contact[lang]}><span>{t(lang, 'common.floating.quote')}</span></a>
</aside>

<style>
  .float { position: fixed; right: 1rem; bottom: 1rem; z-index: 40; display: flex; flex-direction: column; gap: 0.5rem; }
  .fab {
    display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;
    min-height: 48px; padding: 0.6rem 1rem;
    border: 2px solid #111; border-radius: 999px;
    background: var(--accent); color: #111;
    font: 600 1rem/1 'Fredoka', system-ui, sans-serif; text-decoration: none;
    box-shadow: 3px 3px 0 #111;
  }
  .fab--wa { background: var(--brand); }
  .fab--quote { display: none; }
  @media (max-width: 720px) {
    .float {
      left: 0; right: 0; bottom: 0; flex-direction: row; gap: 0.4rem;
      padding: 0.5rem; background: var(--bg); border-top: 2px solid var(--line);
    }
    .fab { flex: 1; box-shadow: none; padding-inline: 0.5rem; }
    .fab--quote { display: inline-flex; background: var(--surface-2); color: var(--ink); border-color: var(--line); }
    :global(body) { padding-bottom: 76px; }
  }
</style>
```

- [ ] **Step 7: Create `src/layouts/Base.astro`**

```astro
---
import '@fontsource/fredoka/500.css';
import '@fontsource/fredoka/600.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '../styles/global.css';
import { getImage } from 'astro:assets';
import logo from '../assets/logo.jpg';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FloatingContact from '../components/FloatingContact.astro';
import { site } from '../data/site';
import { routes, langs, type Lang, type PageKey } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props {
  lang: Lang;
  page: PageKey | null;
  title: string;
  description: string;
  noindex?: boolean;
}
const { lang, page, title, description, noindex = false } = Astro.props;
const abs = (path: string) => new URL(path, Astro.site).href;
const paths = page !== null && !noindex ? routes[page] : null;
const canonical = paths ? abs(paths[lang]) : undefined;
const og = await getImage({ src: logo, width: 1200, height: 1200, format: 'jpg' });
const jsonLd =
  page === 'home'
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: site.name,
        url: abs('/'),
        image: abs(og.src),
        telephone: '+1-331-255-5330',
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.street,
          addressLocality: site.locality,
          addressRegion: site.region,
          postalCode: site.postalCode,
          addressCountry: site.country,
        },
        openingHours: 'Mo-Su 00:00-23:59',
        knowsLanguage: ['en', 'es'],
        sameAs: [site.facebook, site.tiktok, site.shopify],
      }
    : null;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    {noindex && <meta name="robots" content="noindex" />}
    {canonical && <link rel="canonical" href={canonical} />}
    {paths && langs.map((l) => <link rel="alternate" hreflang={l} href={abs(paths[l])} />)}
    {paths && <link rel="alternate" hreflang="x-default" href={abs(paths.en)} />}
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#22c3e6" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={abs(og.src)} />
    <meta property="og:locale" content={lang === 'es' ? 'es_US' : 'en_US'} />
    {canonical && <meta property="og:url" content={canonical} />}
    <script is:inline>
      (function () {
        var root = document.documentElement;
        var theme = null;
        root.classList.add('js');
        try { theme = localStorage.getItem('theme'); } catch (e) {}
        if (theme !== 'light' && theme !== 'dark') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        root.setAttribute('data-theme', theme);
      })();
    </script>
    {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
  </head>
  <body>
    <a class="skip" href="#main">{t(lang, 'common.skip')}</a>
    <Header lang={lang} page={page} />
    <main id="main" tabindex="-1"><slot /></main>
    <Footer lang={lang} />
    <FloatingContact lang={lang} />
  </body>
</html>
```

- [ ] **Step 8: Point the temporary home page at Base, then build and check**

`src/pages/index.astro`:
```astro
---
import Base from '../layouts/Base.astro';
---
<Base lang="en" page="home" title="Imagine PPTP Prints" description="Temporary page until Task 7.">
  <section class="section"><div class="container"><h1>Imagine PPTP Prints</h1></div></section>
</Base>
```

Run:
```bash
npm run check && npm run build
grep -c 'data-theme' dist/index.html
grep -c 'application/ld+json' dist/index.html
```
Expected: `astro check` reports 0 errors; build succeeds; both greps print `1` or more.

- [ ] **Step 9: Browser check of theme, menu, and storage-blocked mode (Review Focus 1)**

Start the preview server in the background: `npm run preview` (serves `http://localhost:4321`). In the browser pane (`mcp__Claude_Browser__*` tools):

1. Navigate to `http://localhost:4321/`. Click the theme toggle. Expect `document.documentElement.dataset.theme === 'dark'` and `localStorage.theme === 'dark'`. Reload: still dark, with no light flash.
2. Run in the page:
   ```js
   Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
   document.querySelector('[data-theme-toggle]').click();
   document.documentElement.dataset.theme
   ```
   Expect the theme flips and no uncaught error appears in `read_console_messages`.
3. Resize to 375×812. Expect the menu button to be visible. Clicking it shows the nav, and Escape closes it and returns focus to the button.

Stop the preview server.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Add theme tokens, base layout, header, footer, and floating contact

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Photo library

**Files:**
- Move: product photos from `images/` → `src/assets/photos/<category>/<slug>.jpg`
- Delete: duplicates and thumbnails in `images/`
- Create: `src/data/photos.ts`, `src/components/Photo.astro`

**Interfaces:**
- Produces:
  - `type Category = 'shirts' | 'hoodies' | 'hats' | 'banners' | 'cards' | 'stickers'`
  - `interface Photo { src: ImageMetadata; category: Category; alt: { en: string; es: string }; featured?: boolean; cover?: boolean }`
  - `photos: Photo[]` in display order
  - `categories: Category[]`: only categories that have at least one photo, in the fixed order above
  - `coverFor(category): Photo | undefined`: the `cover: true` photo, otherwise the first in that category
  - `<Photo photo lang sizes eager? decorative? class?>`: AVIF/WebP `<picture>`, widths ≤ source width, JPG fallback

- [ ] **Step 1: Delete duplicates and unusable files**

These are byte-identical copies (verified by MD5) or tiny thumbnails:
```bash
git rm -q -r images/tshirts
git rm -q images/shirts/facebook_image_*.jpg
git rm -q "images/shirts/439051267_122099285990293236_5713654469248487068_n.jpeg"
git rm -q "images/banner/imgi_60_527334183_122198365886293236_6336333727270942028_n.jpeg"
git rm -q "images/shirts/539634838_122202397106293236_2065046746168162236_n.jpg"
ls -R images
```
Expected: `images/banner` has 1 file, `images/business cards` 5, `images/hoodies` 1, `images/shirts` 29, `images/stickers_` 7. That's **43 photos**. `539634838…` stays only in `hoodies/`. If viewing shows it is actually a shirt, place it in `shirts/` in Step 2.

- [ ] **Step 2: View each photo, then move it to its category with a descriptive slug**

For each of the 43 files, open it with the Read tool, decide:
- **category**: one of `shirts | hoodies | hats | banners | cards | stickers`, based on what the photo shows, not the folder name
- **slug**: lowercase-hyphenated description, unique (e.g. `tee-mexico-flag`, `banner-power-wash-van`)
- **alt.en / alt.es**: one sentence describing the product and design, in each language. Say what it is, its color, and what is printed on it. No "image of". Don't copy personal phone numbers or emails visible on customer work.
- **featured**: mark 12 strong, varied photos (mixed categories) `featured: true` for the home marquee
- **cover**: mark exactly one `cover: true` per category that has photos (the best representative)

Then move it:
```bash
mkdir -p src/assets/photos/{shirts,hoodies,hats,banners,cards,stickers}
git mv "images/<folder>/<file>" "src/assets/photos/<category>/<slug>.jpg"
```
(Keep `.jpg` as the extension even for `.jpeg` sources. The bytes are the same JPEG.)

Two are already identified:
- `images/shirts/540748072_122202402434293236_537020029792240004_n.jpg` → `shirts/tee-mexico-flag.jpg`. EN: "Black T-shirt printed with MEXICO in green, white, and red flag stripes and the eagle crest". ES: "Camiseta negra con MEXICO en franjas verde, blanca y roja y el escudo del águila". `featured`, `cover`.
- `images/banner/526524609_122198365964293236_9110283145285838337_n.jpg` → `banners/banner-power-wash-van.jpg`. EN: "Light-blue vinyl banner for a power wash and window cleaning business, mounted on a white van". ES: "Lona de vinil azul claro para un negocio de lavado a presión y limpieza de ventanas, colocada en una camioneta blanca". `featured`, `cover`.

Source list (all must end up under `src/assets/photos/`):
```
images/banner/526524609_122198365964293236_9110283145285838337_n.jpg
images/business cards/527979919_122199178190293236_5235865814956008456_n.jpg
images/business cards/528375755_122199177968293236_175638541641193936_n.jpg
images/business cards/528687307_122199178244293236_2834460709636963266_n.jpg
images/business cards/529234045_122199178148293236_8808661976772103967_n.jpg
images/business cards/529861076_122199178064293236_630406596597416380_n.jpg
images/hoodies/539634838_122202397106293236_2065046746168162236_n.jpg
images/shirts/515501507_122198526200293236_7607457180543503991_n.jpg
images/shirts/535425126_122202396836293236_3721365403696346718_n.jpg
images/shirts/536267457_122202402512293236_5916625451972462326_n.jpg
images/shirts/536267960_122202396878293236_3787262440824719255_n.jpg
images/shirts/536268068_122202402710293236_6046720143165808036_n.jpg
images/shirts/536268117_122202397010293236_2058466867356444882_n.jpg
images/shirts/536268491_122202402668293236_8113688650266670840_n.jpg
images/shirts/536270882_122202397520293236_7105880321075647519_n.jpg
images/shirts/536272747_122202396872293236_4789949311103324035_n.jpg
images/shirts/536272747_122202396902293236_7950217503672986740_n.jpg
images/shirts/536272764_122202397574293236_8296046152295572766_n.jpg
images/shirts/536273428_122202396704293236_4522561417970752719_n.jpg
images/shirts/536273519_122202397550293236_84984850446023139_n.jpg
images/shirts/536274150_122202402422293236_6376054713154628511_n.jpg
images/shirts/536276688_122202396734293236_3101851942421334847_n.jpg
images/shirts/536276805_122202396914293236_4210882850675972293_n.jpg
images/shirts/536283035_122202397160293236_4155407478648893138_n.jpg
images/shirts/536284750_122202402566293236_1502887189542089323_n.jpg
images/shirts/538700448_122202402572293236_3868410749720602649_n.jpg
images/shirts/538958290_122202397490293236_2227702217652836018_n.jpg
images/shirts/538987215_122202396896293236_6434286786111045305_n.jpg
images/shirts/539193412_122202397118293236_8536867528291169191_n.jpg
images/shirts/539269750_122202402734293236_6176046228327216125_n.jpg
images/shirts/539482495_122202397040293236_152716096225770613_n.jpg
images/shirts/539565489_122202397124293236_5997368702485755997_n.jpg
images/shirts/539586768_122202396788293236_2819796790172946060_n.jpg
images/shirts/539738239_122202396998293236_2183067847999368314_n.jpg
images/shirts/539786646_122202402428293236_5026657620272618721_n.jpg
images/shirts/540748072_122202402434293236_537020029792240004_n.jpg
images/stickers_/imgi_102_497739878_122188300244293236_3091937193068681794_n.jpeg
images/stickers_/imgi_109_495004997_122183165912293236_3804189171855020686_n.jpeg
images/stickers_/imgi_110_493010655_122183165894293236_2748275339439620463_n.jpeg
images/stickers_/imgi_111_494685260_122183165390293236_2179340367493550645_n.jpeg
images/stickers_/imgi_113_495172698_122183165306293236_8460771955240980678_n.jpeg
images/stickers_/imgi_114_494948491_122183165258293236_2979432160587199103_n.jpeg
images/stickers_/imgi_60_527334183_122198365886293236_6336333727270942028_n.jpeg
```
If two files show the same product from nearly the same angle, keep both (they are real work) but mark at most one `featured`.

- [ ] **Step 3: Write `src/data/photos.ts`**

Use this exact structure. Fill `photos` with one entry per moved file, in the order you want them to appear (best first within each category):

```ts
import type { ImageMetadata } from 'astro';

export type Category = 'shirts' | 'hoodies' | 'hats' | 'banners' | 'cards' | 'stickers';
export interface Photo {
  src: ImageMetadata;
  category: Category;
  alt: { en: string; es: string };
  featured?: boolean;
  cover?: boolean;
}

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*/*.jpg', { eager: true });

function img(path: string): ImageMetadata {
  const mod = files[`../assets/photos/${path}`];
  if (!mod) throw new Error(`photos.ts: no file src/assets/photos/${path}`);
  return mod.default;
}

export const photos: Photo[] = [
  {
    src: img('shirts/tee-mexico-flag.jpg'),
    category: 'shirts',
    alt: {
      en: 'Black T-shirt printed with MEXICO in green, white, and red flag stripes and the eagle crest',
      es: 'Camiseta negra con MEXICO en franjas verde, blanca y roja y el escudo del águila',
    },
    featured: true,
    cover: true,
  },
  {
    src: img('banners/banner-power-wash-van.jpg'),
    category: 'banners',
    alt: {
      en: 'Light-blue vinyl banner for a power wash and window cleaning business, mounted on a white van',
      es: 'Lona de vinil azul claro para un negocio de lavado a presión y limpieza de ventanas, colocada en una camioneta blanca',
    },
    featured: true,
    cover: true,
  },
  // …one entry per remaining file from Step 2, same shape.
];

// Guard: every file in src/assets/photos must be listed above (fails the build otherwise).
const listed = new Set(photos.map((p) => p.src));
const unlisted = Object.entries(files).filter(([, m]) => !listed.has(m.default)).map(([path]) => path);
if (unlisted.length) throw new Error(`photos.ts: files not listed: ${unlisted.join(', ')}`);

const ORDER: Category[] = ['shirts', 'hoodies', 'hats', 'banners', 'cards', 'stickers'];
export const categories: Category[] = ORDER.filter((c) => photos.some((p) => p.category === c));

export const coverFor = (category: Category): Photo | undefined =>
  photos.find((p) => p.category === category && p.cover) ?? photos.find((p) => p.category === category);
```

When you finish, the `// …one entry per remaining file` comment must be replaced by the real entries. The final file contains no comment placeholder.

- [ ] **Step 4: Create `src/components/Photo.astro`**

```astro
---
import { Picture } from 'astro:assets';
import type { Photo } from '../data/photos';
import type { Lang } from '../i18n/routes';

interface Props {
  photo: Photo;
  lang: Lang;
  sizes: string;
  eager?: boolean;
  decorative?: boolean;
  class?: string;
}
const { photo, lang, sizes, eager = false, decorative = false, class: className } = Astro.props;
const widths = [400, 800, 1200].filter((w) => w <= photo.src.width);
if (widths.length === 0) widths.push(photo.src.width);
---
<Picture
  src={photo.src}
  alt={decorative ? '' : photo.alt[lang]}
  widths={widths}
  sizes={sizes}
  formats={['avif', 'webp']}
  fallbackFormat="jpg"
  loading={eager ? 'eager' : 'lazy'}
  decoding="async"
  class={className}
/>
```

- [ ] **Step 5: Verify every photo is listed and the build passes**

```bash
find src/assets/photos -name '*.jpg' | wc -l      # expect 43
ls images 2>/dev/null | wc -l                      # expect 0 (folder empty or gone)
grep -c "featured: true" src/data/photos.ts        # expect 12
grep -c "cover: true" src/data/photos.ts           # expect one per category present (5 if no hats)
npm run check && npm run build
```
Expected: counts as noted. Build succeeds; the guard throws if any photo is unlisted. Then remove the empty folder: `rmdir images/* images 2>/dev/null; true`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Move product photos into optimized asset library with bilingual alt text

Removes byte-identical duplicates and low-res thumbnails.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Shared sections: CTA, FAQ, featured-work marquee

**Files:**
- Create: `src/components/Cta.astro`, `src/components/Faq.astro`, `src/components/Marquee.astro`
- Create: `src/i18n/en/home.json` and `src/i18n/es/home.json` with **only** the `work` block for now (Task 7 adds the rest)

**Interfaces:**
- Consumes: `site`, `routes`, `t`, `tRaw`, `photos`, `<Photo>`, `<Icon>`
- Produces: `<Cta lang>`, `<Faq lang>`, `<Marquee lang>`. Uses keys `common.ctaBlock.*`, `common.cta.*`, `faq.*`, `home.work.*`.

- [ ] **Step 1: Seed `home.json` files with the marquee keys**

`src/i18n/en/home.json`:
```json
{
  "work": { "title": "Featured Work", "all": "See all our work", "pause": "Pause slideshow", "play": "Play slideshow" }
}
```
`src/i18n/es/home.json`:
```json
{
  "work": { "title": "Trabajos destacados", "all": "Ver todos nuestros trabajos", "pause": "Pausar presentación", "play": "Reproducir presentación" }
}
```

- [ ] **Step 2: Create `src/components/Cta.astro`**

```astro
---
import Icon from './Icon.astro';
import { site } from '../data/site';
import type { Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
---
<section class="cta" aria-labelledby="cta-title">
  <div class="container center">
    <h2 id="cta-title">{t(lang, 'common.ctaBlock.title')}</h2>
    <p class="lead">{t(lang, 'common.ctaBlock.body')}</p>
    <p class="promo"><span>{t(lang, 'common.ctaBlock.promo')}</span> <strong class="code">{site.promoCode}</strong></p>
    <div class="btn-row">
      <a class="btn btn--primary" href={site.phoneHref}><Icon name="phone" />{t(lang, 'common.cta.call')}</a>
      <a class="btn btn--ghost" href={site.whatsapp} target="_blank" rel="noopener"><Icon name="chat" />{t(lang, 'common.cta.whatsapp')}</a>
      <a class="btn btn--ghost" href={`mailto:${site.email}`}><Icon name="mail" />{t(lang, 'common.cta.email')}</a>
    </div>
    <p class="es" lang="es">{t(lang, 'common.spanish')}</p>
  </div>
</section>

<style>
  .cta { background: var(--hero-bg); color: var(--hero-ink); border-block: 2px solid var(--line); padding-block: clamp(3rem, 6vw, 5rem); }
  .cta .lead { color: var(--hero-ink); }
  .promo { font-weight: 700; font-size: 1.1rem; }
  .code {
    display: inline-block; padding: 0.15rem 0.7rem; margin-left: 0.25rem;
    background: var(--accent); color: #111; border: 2px dashed #111; border-radius: 10px;
    font-family: 'Fredoka', system-ui, sans-serif; letter-spacing: 0.05em;
  }
  .es { margin: 1.25rem 0 0; font: 600 1.1rem 'Fredoka', system-ui, sans-serif; }
</style>
```

- [ ] **Step 3: Create `src/components/Faq.astro`**

```astro
---
import type { Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const items = tRaw<{ q: string; a: string }[]>(lang, 'faq.items');
---
<section class="section" aria-labelledby="faq-title">
  <div class="narrow">
    <h2 id="faq-title" class="center">{t(lang, 'faq.title')}</h2>
    <div class="faq">
      {items.map((item) => (
        <details>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>

<style>
  .faq { display: grid; gap: 0.75rem; margin-top: 2rem; }
  details { border: 2px solid var(--line); border-radius: 18px; background: var(--surface-2); }
  summary {
    cursor: pointer; list-style: none; padding: 1rem 3rem 1rem 1.25rem; position: relative;
    font: 500 1.15rem/1.3 'Fredoka', system-ui, sans-serif;
  }
  summary::-webkit-details-marker { display: none; }
  summary::after {
    content: '+'; position: absolute; right: 1.1rem; top: 50%; translate: 0 -50%;
    width: 1.8rem; height: 1.8rem; display: grid; place-items: center;
    border-radius: 50%; background: var(--accent); color: #111; border: 2px solid #111; font-weight: 700;
  }
  details[open] summary::after { content: '–'; }
  details p { padding: 0 1.25rem 1.1rem; margin: 0; color: var(--ink-soft); }
</style>
```

- [ ] **Step 4: Create `src/components/Marquee.astro`**

```astro
---
import Photo from './Photo.astro';
import { photos } from '../data/photos';
import { routes, type Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const featured = photos.filter((p) => p.featured);
const rows = [featured.filter((_, i) => i % 2 === 0), featured.filter((_, i) => i % 2 === 1)];
const sizes = '(max-width: 600px) 240px, 340px';
---
<section class="section marquee" aria-labelledby="work-title" data-marquee>
  <div class="container head">
    <h2 id="work-title">{t(lang, 'home.work.title')}</h2>
    <button type="button" class="btn btn--ghost toggle" data-marquee-toggle data-pause={t(lang, 'home.work.pause')} data-play={t(lang, 'home.work.play')}>
      {t(lang, 'home.work.pause')}
    </button>
  </div>
  {rows.map((row, r) => (
    <div class:list={['row', { reverse: r === 1 }]}>
      <ul class="track">
        {row.map((p) => <li class="item"><Photo photo={p} lang={lang} sizes={sizes} /></li>)}
        {row.map((p) => <li class="item dup" aria-hidden="true"><Photo photo={p} lang={lang} sizes={sizes} decorative /></li>)}
      </ul>
    </div>
  ))}
  <p class="container center all"><a class="btn btn--primary" href={routes.portfolio[lang]}>{t(lang, 'home.work.all')}</a></p>
</section>

<style>
  .head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .head h2 { margin: 0; }
  .toggle { display: none; }
  :global(.js) .toggle { display: inline-flex; }
  .row {
    overflow: hidden; margin-bottom: 1rem;
    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
  .track { display: flex; gap: 1rem; width: max-content; list-style: none; margin: 0; padding: 0.5rem 0; animation: scroll 55s linear infinite; }
  .reverse .track { animation-direction: reverse; animation-duration: 60s; }
  .row:hover .track, .paused .track { animation-play-state: paused; }
  .item {
    flex: 0 0 auto; width: clamp(220px, 28vw, 340px); aspect-ratio: 4 / 3;
    border: 2px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--surface);
  }
  .item :global(img) { width: 100%; height: 100%; object-fit: cover; }
  .all { margin-top: 1.5rem; }
  @keyframes scroll { to { transform: translateX(calc(-50% - 0.5rem)); } }
  @media (prefers-reduced-motion: reduce) {
    .row { overflow-x: auto; mask-image: none; }
    .dup, :global(.js) .toggle { display: none; }
  }
</style>

<script>
  for (const section of document.querySelectorAll<HTMLElement>('[data-marquee]')) {
    const btn = section.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
    if (!btn) continue;
    btn.addEventListener('click', () => {
      const paused = section.classList.toggle('paused');
      btn.textContent = (paused ? btn.dataset.play : btn.dataset.pause) ?? '';
    });
  }
</script>
```

- [ ] **Step 5: Check and test**

Run: `npm test && npm run check`
Expected: i18n parity passes (both `home.json` files have the same `work` keys) and `astro check` reports 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Cta.astro src/components/Faq.astro src/components/Marquee.astro src/i18n/en/home.json src/i18n/es/home.json
git commit -m "Add shared CTA, FAQ, and featured-work marquee sections

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Home page (EN + ES)

**Files:**
- Modify: `src/i18n/en/home.json`, `src/i18n/es/home.json` (full content)
- Create: `src/views/Home.astro`, `src/pages/es/index.astro`
- Modify: `src/pages/index.astro` (replace temporary page)

**Interfaces:**
- Consumes: `Base`, `Icon`, `Marquee`, `Faq`, `Cta`, `site`, `routes`, `t`, `tRaw`, `logo`
- Produces: `<Home lang>`. Links to `routes.services[lang] + '#<id>'` for ids `shirts hoodies hats banners cards stickers process` (Task 8 must create these ids).

- [ ] **Step 1: Write full `src/i18n/en/home.json`**

```json
{
  "meta": {
    "title": "Imagine PPTP Prints | Custom Shirts, Hoodies, Hats and Printing in Elgin, IL",
    "description": "Custom printed shirts, hoodies, hats, banners, business cards, and stickers in Elgin, IL. 24-48 hour turnaround, no minimums, free design help. ¡Hablamos español!"
  },
  "hero": {
    "eyebrow": "Custom printing in Elgin, IL",
    "title": "Transform Your Brand with Custom Printed Apparel",
    "subtitle": "From design to delivery in 24-48 hours. 100% satisfaction guaranteed.",
    "badges": ["24-48 hr turnaround", "100% satisfaction", "¡Hablamos español!"],
    "logoAlt": "Imagine Prints penguin logo"
  },
  "services": {
    "title": "Why Choose Imagine PPTP Prints?",
    "subtitle": "High quality printed shirts, hoodies, and hats for businesses, special occasions, you name it. Send us your design, we'll make the rest.",
    "items": [
      { "key": "shirts", "title": "Custom Shirts", "body": "High quality printed shirts for businesses and special occasions" },
      { "key": "hoodies", "title": "Custom Hoodies", "body": "Personalized hoodies with your design, perfect for teams and events" },
      { "key": "hats", "title": "Custom Hats", "body": "Professional hats and caps with your branding or custom designs" },
      { "key": "process", "title": "Design to Print", "body": "Send us your design, we'll handle the rest with quality results" },
      { "key": "banners", "title": "Custom Banners", "body": "Professional banners and signage for events and businesses" },
      { "key": "cards", "title": "Business Cards", "body": "High-quality business cards to make your first impression count" },
      { "key": "stickers", "title": "Stickers and Decals", "body": "Custom vinyl stickers and decals for branding, vehicles, and promotions" }
    ],
    "more": "See all services"
  },
  "how": {
    "title": "How It Works",
    "subtitle": "Get your custom apparel in 3 simple steps",
    "steps": [
      { "title": "Send Your Design", "body": "Upload your artwork or work with us to create one. We accept all file formats!" },
      { "title": "Choose Your Products", "body": "Select from shirts, hoodies, hats, banners, and more. We'll help you pick the perfect items." },
      { "title": "Fast Delivery", "body": "Receive your high-quality custom products in 24-48 hours. Rush orders available!" }
    ],
    "cta": "Start your order now"
  },
  "work": { "title": "Featured Work", "all": "See all our work", "pause": "Pause slideshow", "play": "Play slideshow" },
  "why": {
    "title": "The short version",
    "items": ["24-48 hour standard turnaround", "Same-day rush orders available", "No minimums: order 1 or 1,000", "Free design help", "¡Hablamos español!"]
  },
  "reviews": {
    "title": "Hear it from our customers",
    "body": "Read real reviews and see our latest projects on our Facebook page.",
    "cta": "Read our Facebook reviews"
  }
}
```

- [ ] **Step 2: Write full `src/i18n/es/home.json`**

```json
{
  "meta": {
    "title": "Imagine PPTP Prints | Camisetas, sudaderas, gorras e impresión personalizada en Elgin, IL",
    "description": "Camisetas, sudaderas, gorras, lonas, tarjetas de presentación y calcomanías personalizadas en Elgin, IL. Entrega en 24 a 48 horas, sin mínimos y ayuda con el diseño gratis."
  },
  "hero": {
    "eyebrow": "Impresión personalizada en Elgin, IL",
    "title": "Transforma tu marca con ropa personalizada",
    "subtitle": "Del diseño a la entrega en 24 a 48 horas. Satisfacción 100% garantizada.",
    "badges": ["Entrega en 24-48 h", "Satisfacción 100%", "¡Hablamos español!"],
    "logoAlt": "Logotipo de Imagine Prints con un pingüino"
  },
  "services": {
    "title": "¿Por qué elegir Imagine PPTP Prints?",
    "subtitle": "Camisetas, sudaderas y gorras impresas de alta calidad para negocios, ocasiones especiales y lo que necesites. Mándanos tu diseño y nosotros hacemos el resto.",
    "items": [
      { "key": "shirts", "title": "Camisetas personalizadas", "body": "Camisetas impresas de alta calidad para negocios y ocasiones especiales" },
      { "key": "hoodies", "title": "Sudaderas personalizadas", "body": "Sudaderas con tu diseño, perfectas para equipos y eventos" },
      { "key": "hats", "title": "Gorras personalizadas", "body": "Gorras profesionales con tu marca o diseño personalizado" },
      { "key": "process", "title": "Del diseño a la impresión", "body": "Mándanos tu diseño y nosotros nos encargamos del resto con resultados de calidad" },
      { "key": "banners", "title": "Lonas y pancartas", "body": "Lonas y letreros profesionales para eventos y negocios" },
      { "key": "cards", "title": "Tarjetas de presentación", "body": "Tarjetas de alta calidad para causar una gran primera impresión" },
      { "key": "stickers", "title": "Calcomanías", "body": "Calcomanías de vinil personalizadas para tu marca, vehículos y promociones" }
    ],
    "more": "Ver todos los servicios"
  },
  "how": {
    "title": "Cómo funciona",
    "subtitle": "Tu ropa personalizada en 3 pasos sencillos",
    "steps": [
      { "title": "Mándanos tu diseño", "body": "Sube tu diseño o trabaja con nosotros para crear uno. ¡Aceptamos todos los formatos!" },
      { "title": "Elige tus productos", "body": "Escoge entre camisetas, sudaderas, gorras, lonas y más. Te ayudamos a elegir lo ideal." },
      { "title": "Entrega rápida", "body": "Recibe tus productos personalizados en 24 a 48 horas. ¡También hacemos pedidos urgentes!" }
    ],
    "cta": "Empieza tu pedido"
  },
  "work": { "title": "Trabajos destacados", "all": "Ver todos nuestros trabajos", "pause": "Pausar presentación", "play": "Reproducir presentación" },
  "why": {
    "title": "En resumen",
    "items": ["Entrega estándar en 24 a 48 horas", "Pedidos urgentes el mismo día", "Sin mínimos: pide 1 o 1,000", "Ayuda con el diseño gratis", "¡Hablamos español!"]
  },
  "reviews": {
    "title": "Lo que dicen nuestros clientes",
    "body": "Lee reseñas reales y mira nuestros proyectos más recientes en nuestra página de Facebook.",
    "cta": "Leer reseñas en Facebook"
  }
}
```

- [ ] **Step 3: Create `src/views/Home.astro`**

```astro
---
import { Image } from 'astro:assets';
import logo from '../assets/logo.jpg';
import Base from '../layouts/Base.astro';
import Icon from '../components/Icon.astro';
import Marquee from '../components/Marquee.astro';
import Faq from '../components/Faq.astro';
import Cta from '../components/Cta.astro';
import { site } from '../data/site';
import { routes, type Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const badges = tRaw<string[]>(lang, 'home.hero.badges');
const services = tRaw<{ key: string; title: string; body: string }[]>(lang, 'home.services.items');
const steps = tRaw<{ title: string; body: string }[]>(lang, 'home.how.steps');
const why = tRaw<string[]>(lang, 'home.why.items');
const bands = ['var(--brand)', 'var(--accent)', 'var(--pop)', 'var(--brand-deep)'];
---
<Base lang={lang} page="home" title={t(lang, 'home.meta.title')} description={t(lang, 'home.meta.description')}>
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">{t(lang, 'home.hero.eyebrow')}</p>
        <h1>{t(lang, 'home.hero.title')}</h1>
        <p class="lead">{t(lang, 'home.hero.subtitle')}</p>
        <ul class="badges">{badges.map((b) => <li class="pill">{b}</li>)}</ul>
        <div class="btn-row">
          <a class="btn btn--primary" href={routes.contact[lang]}>{t(lang, 'common.cta.freeQuote')}<Icon name="arrow" /></a>
          <a class="btn btn--ghost" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
          <a class="btn btn--ghost" href={site.whatsapp} target="_blank" rel="noopener"><Icon name="chat" />{t(lang, 'common.cta.whatsapp')}</a>
        </div>
      </div>
      <Image
        class="hero-logo"
        src={logo}
        alt={t(lang, 'home.hero.logoAlt')}
        widths={[220, 340, 680]}
        sizes="(max-width: 860px) 200px, 340px"
        loading="eager"
        fetchpriority="high"
      />
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="center">
        <h2>{t(lang, 'home.services.title')}</h2>
        <p class="lead">{t(lang, 'home.services.subtitle')}</p>
      </div>
      <ul class="grid svc-grid">
        {services.map((s, i) => (
          <li>
            <a class="card svc" href={`${routes.services[lang]}#${s.key}`} style={`--band: ${bands[i % bands.length]}`}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </a>
          </li>
        ))}
      </ul>
      <p class="center more"><a class="btn btn--ghost" href={routes.services[lang]}>{t(lang, 'home.services.more')}<Icon name="arrow" /></a></p>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <div class="center">
        <h2>{t(lang, 'home.how.title')}</h2>
        <p class="lead">{t(lang, 'home.how.subtitle')}</p>
      </div>
      <ol class="grid steps">
        {steps.map((s, i) => (
          <li class="card step"><span class="num" aria-hidden="true">{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p></li>
        ))}
      </ol>
      <p class="center"><a class="btn btn--primary" href={routes.contact[lang]}>{t(lang, 'home.how.cta')}<Icon name="arrow" /></a></p>
    </div>
  </section>

  <Marquee lang={lang} />

  <section class="section section--tint">
    <div class="container center">
      <h2>{t(lang, 'home.why.title')}</h2>
      <ul class="why">{why.map((w) => <li class="pill"><Icon name="check" size={18} />{w}</li>)}</ul>
      <div class="card reviews">
        <h3>{t(lang, 'home.reviews.title')}</h3>
        <p>{t(lang, 'home.reviews.body')}</p>
        <a class="btn btn--primary" href={site.facebook} target="_blank" rel="noopener">{t(lang, 'home.reviews.cta')}</a>
      </div>
    </div>
  </section>

  <Faq lang={lang} />
  <Cta lang={lang} />
</Base>

<style>
  .hero { background: var(--hero-bg); color: var(--hero-ink); border-bottom: 2px solid var(--line); }
  .hero-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; align-items: center; padding-block: clamp(3rem, 7vw, 6rem); }
  .hero .lead { color: var(--hero-ink); }
  .badges { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; padding: 0; margin: 0 0 1.5rem; }
  .hero-logo {
    width: min(340px, 100%); height: auto; justify-self: center;
    border-radius: 50%; border: 3px solid #111; box-shadow: 8px 8px 0 #111; background: #fff;
  }
  @media (max-width: 860px) {
    .hero-grid { grid-template-columns: 1fr; }
    .hero-logo { width: 200px; grid-row: 1; }
  }
  .svc-grid { list-style: none; padding: 0; margin: 2rem 0; }
  .svc { position: relative; display: block; height: 100%; padding-top: 2rem; color: var(--ink); text-decoration: none; overflow: hidden; transition: transform 0.15s ease; }
  .svc::before { content: ''; position: absolute; inset: 0 0 auto 0; height: 12px; background: var(--band); border-bottom: 2px solid var(--line); }
  .svc:hover { transform: translateY(-3px); }
  .svc p { color: var(--ink-soft); margin: 0; }
  .more { margin: 0; }
  .steps { list-style: none; padding: 0; margin: 3rem 0 2rem; row-gap: 2.5rem; }
  .step { position: relative; padding-top: 2.5rem; }
  .step p { color: var(--ink-soft); margin: 0; }
  .num {
    position: absolute; top: -1.4rem; left: 1.5rem; width: 2.8rem; height: 2.8rem;
    display: grid; place-items: center; border-radius: 50%;
    background: var(--accent); color: #111; border: 2px solid #111;
    font: 600 1.3rem/1 'Fredoka', system-ui, sans-serif;
  }
  .why { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; list-style: none; padding: 0; margin: 1.5rem 0 2.5rem; }
  .why .pill { display: inline-flex; align-items: center; gap: 0.4rem; }
  .reviews { max-width: 560px; margin-inline: auto; }
</style>
```

- [ ] **Step 4: Route files**

`src/pages/index.astro` (replace the temporary page entirely):
```astro
---
import Home from '../views/Home.astro';
---
<Home lang="en" />
```

`src/pages/es/index.astro`:
```astro
---
import Home from '../../views/Home.astro';
---
<Home lang="es" />
```

- [ ] **Step 5: Test, check, build, verify content**

```bash
npm test && npm run check && npm run build
grep -c "Transform Your Brand" dist/index.html          # 1
grep -c "Transforma tu marca" dist/es/index.html        # 1
grep -c 'href="/es/"' dist/index.html                   # ≥1 (language switch)
grep -ci "happy customers\|products printed\|years experience" dist/index.html   # 0: no invented stats
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Build bilingual home page

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Services page and price calculator UI

**Files:**
- Create: `src/i18n/en/services.json`, `src/i18n/es/services.json`, `src/components/PriceCalculator.astro`, `src/views/Services.astro`, `src/pages/services.astro`, `src/pages/es/servicios.astro`

**Interfaces:**
- Consumes: `estimate`, `APPAREL`, `nextTier` (Task 2), `coverFor`, `Category` (Task 5), `<Photo>`, `<Cta>`, `Base`
- Produces: element ids `shirts hoodies hats banners cards stickers process` on the services page (Task 7 links to them), and `#calculator`.

- [ ] **Step 1: Create `src/i18n/en/services.json`**

```json
{
  "meta": {
    "title": "Our Services | Imagine PPTP Prints",
    "description": "Custom shirts, hoodies, hats, banners, business cards, and stickers in Elgin, IL. Instant price estimates, 24-48 hour turnaround, no minimums."
  },
  "title": "Our Services",
  "subtitle": "Custom printed apparel and accessories for businesses and special occasions",
  "weOffer": "We offer:",
  "noPhoto": "Photos coming soon",
  "items": [
    { "id": "shirts", "title": "Custom Shirts", "intro": "High quality printed shirts perfect for businesses, teams, and special occasions.", "bullets": ["Custom t-shirt printing with premium materials", "Business logo shirts for company branding", "Team uniforms and sports shirts", "Event and celebration shirts", "Screen printing, embroidery, and heat transfer options", "Various styles: crew neck, v-neck, long sleeve"] },
    { "id": "hoodies", "title": "Custom Hoodies", "intro": "Personalized hoodies perfect for teams, events, and branding.", "bullets": ["Custom hoodie printing with premium fabrics", "Team and company hoodies for branding", "Event and celebration hoodies", "Pullover and zip-up hoodie styles", "Screen printing, embroidery, and heat transfer", "Available in various colors and sizes"] },
    { "id": "hats", "title": "Custom Hats", "intro": "Professional hats and caps with your custom design or branding.", "bullets": ["Custom hat embroidery and printing", "Business logo hats for company branding", "Team and sports hats", "Event and promotional hats", "Baseball caps, trucker hats, beanies", "High-quality embroidery and screen printing"] },
    { "id": "banners", "title": "Custom Banners and Large Format", "intro": "Professional banners and large format printing for events and businesses.", "bullets": ["Weather-resistant vinyl banners for outdoor use", "Premium fabric banners for indoor displays", "Large format printing up to 10ft wide", "Professional installation services", "Custom sizing and material options", "Fast turnaround for event deadlines"] },
    { "id": "cards", "title": "Business Cards", "intro": "High-quality business cards with custom designs. Various finishes available.", "bullets": ["Premium card stock options", "Custom sizes and shapes", "Matte, glossy, and semi-gloss finishes", "Foil stamping and embossing", "Full-color printing", "Fast turnaround"] },
    { "id": "stickers", "title": "Stickers and Decals", "intro": "Custom vinyl stickers and decals for branding, vehicles, and promotional materials.", "bullets": [] }
  ],
  "calc": {
    "title": "Instant Price Calculator",
    "subtitle": "Get an estimate for your custom order in seconds",
    "product": "Product type",
    "products": { "tshirt": "T-Shirt", "hoodie": "Hoodie", "hat": "Hat/Cap", "banner": "Banner", "businesscard": "Business Cards", "sticker": "Stickers" },
    "quantity": "Quantity",
    "qtyHint": "No minimums! Order 1 or 1,000+",
    "method": "Print method",
    "methods": { "screen": "Screen Printing", "dtg": "Direct to Garment (DTG)", "embroidery": "Embroidery", "heat": "Heat Transfer", "vinyl": "Vinyl Print" },
    "colors": "Number of colors",
    "colorOptions": { "1": "1 Color", "2": "2 Colors", "3": "3 Colors", "4": "4+ Colors (Full Color)" },
    "turnaround": "Turnaround time",
    "turnarounds": { "standard": "Standard (24-48 hrs)", "rush": "Rush (Same Day) +30%", "extended": "Extended (3-5 days) -10%" },
    "cardNote": "Business cards print in batches of 100.",
    "bannerNote": "Banner estimate assumes about 6 sq ft. Tell us your size for an exact price.",
    "designNote": "Need design help? It's free.",
    "estimate": "Your estimate",
    "base": "Base price",
    "print": "Print method",
    "color": "Colors",
    "turnaroundLine": "Turnaround",
    "total": "Total estimate",
    "unit": "Per unit",
    "volApplied": "{pct}% volume discount applied!",
    "volNext": "Order {n} more to save {pct}%!",
    "promo": "First order discount: use code",
    "promoOff": "for 10% off!",
    "official": "Get official quote",
    "disclaimer": "*Estimate only. Final price may vary based on specific requirements. Contact us for an official quote."
  },
  "process": {
    "title": "How It Works",
    "subtitle": "From design to delivery in 4 simple steps",
    "steps": [
      { "title": "Submit Your Design", "body": "Send us your logo, artwork, or design concept. We accept AI, EPS, PNG, JPG, and more." },
      { "title": "Choose Your Products", "body": "Select from our range of shirts, hoodies, and hats. Pick colors, sizes, and quantities." },
      { "title": "We Print and Quality Check", "body": "Our expert team handles the printing process and performs quality control checks." },
      { "title": "Fast Delivery", "body": "Your custom order is ready in 24-48 hours, with same-day rush available." }
    ]
  },
  "materials": {
    "title": "Material Options",
    "items": [
      { "name": "Premium Cotton", "spec": "100% Cotton, 180 GSM" },
      { "name": "Cotton Blend", "spec": "50/50 Cotton-Polyester" },
      { "name": "Performance Fabric", "spec": "Moisture Wicking" },
      { "name": "Heavyweight", "spec": "300 GSM Fleece" }
    ]
  },
  "sizes": {
    "title": "Size Charts",
    "apparel": {
      "caption": "Shirts and hoodies (inches)",
      "head": ["Size", "Chest", "Length", "Shoulder"],
      "rows": [["XS", "32-34", "26", "14"], ["S", "34-36", "27", "15"], ["M", "38-40", "28", "16"], ["L", "42-44", "29", "17"], ["XL", "46-48", "30", "18"], ["2XL", "50-52", "31", "19"]]
    },
    "hats": {
      "caption": "Hats (inches)",
      "head": ["Size", "Circumference", "Fits"],
      "rows": [["S/M", "21-22", "6 7/8 - 7"], ["M/L", "22-23", "7 - 7 1/4"], ["L/XL", "23-24", "7 1/4 - 7 5/8"], ["XL/XXL", "24-25", "7 5/8 - 8"]]
    },
    "note": "Need a size that isn't listed? Ask us: custom sizing is available for special orders."
  }
}
```

- [ ] **Step 2: Create `src/i18n/es/services.json`**

```json
{
  "meta": {
    "title": "Nuestros servicios | Imagine PPTP Prints",
    "description": "Camisetas, sudaderas, gorras, lonas, tarjetas de presentación y calcomanías personalizadas en Elgin, IL. Precios estimados al instante, entrega en 24 a 48 horas y sin mínimos."
  },
  "title": "Nuestros servicios",
  "subtitle": "Ropa y accesorios impresos a tu medida para negocios y ocasiones especiales",
  "weOffer": "Ofrecemos:",
  "noPhoto": "Fotos próximamente",
  "items": [
    { "id": "shirts", "title": "Camisetas personalizadas", "intro": "Camisetas impresas de alta calidad, perfectas para negocios, equipos y ocasiones especiales.", "bullets": ["Impresión de camisetas con materiales premium", "Camisetas con el logotipo de tu negocio", "Uniformes para equipos y deportes", "Camisetas para eventos y celebraciones", "Serigrafía, bordado y transferencia térmica", "Varios estilos: cuello redondo, cuello en V, manga larga"] },
    { "id": "hoodies", "title": "Sudaderas personalizadas", "intro": "Sudaderas con tu diseño, perfectas para equipos, eventos y tu marca.", "bullets": ["Impresión de sudaderas con telas premium", "Sudaderas para equipos y empresas", "Sudaderas para eventos y celebraciones", "Estilos cerrados y con cierre", "Serigrafía, bordado y transferencia térmica", "Disponibles en varios colores y tallas"] },
    { "id": "hats", "title": "Gorras personalizadas", "intro": "Gorras profesionales con tu diseño o tu marca.", "bullets": ["Bordado e impresión de gorras", "Gorras con el logotipo de tu negocio", "Gorras para equipos y deportes", "Gorras para eventos y promociones", "Gorras de béisbol, gorras trucker y gorros tejidos", "Bordado y serigrafía de alta calidad"] },
    { "id": "banners", "title": "Lonas y gran formato", "intro": "Lonas e impresión de gran formato profesionales para eventos y negocios.", "bullets": ["Lonas de vinil resistentes a la intemperie para exteriores", "Lonas de tela premium para interiores", "Impresión de gran formato de hasta 10 pies de ancho", "Servicio de instalación profesional", "Tamaños y materiales a tu medida", "Entrega rápida para fechas de eventos"] },
    { "id": "cards", "title": "Tarjetas de presentación", "intro": "Tarjetas de presentación de alta calidad con diseño personalizado. Varios acabados disponibles.", "bullets": ["Cartulinas premium", "Tamaños y formas personalizados", "Acabado mate, brillante y semibrillante", "Estampado metálico y relieve", "Impresión a todo color", "Entrega rápida"] },
    { "id": "stickers", "title": "Calcomanías", "intro": "Calcomanías de vinil personalizadas para tu marca, vehículos y material promocional.", "bullets": [] }
  ],
  "calc": {
    "title": "Calculadora de precios",
    "subtitle": "Calcula un estimado de tu pedido en segundos",
    "product": "Tipo de producto",
    "products": { "tshirt": "Camiseta", "hoodie": "Sudadera", "hat": "Gorra", "banner": "Lona", "businesscard": "Tarjetas de presentación", "sticker": "Calcomanías" },
    "quantity": "Cantidad",
    "qtyHint": "¡Sin mínimos! Pide 1 o más de 1,000",
    "method": "Método de impresión",
    "methods": { "screen": "Serigrafía", "dtg": "Impresión directa (DTG)", "embroidery": "Bordado", "heat": "Transferencia térmica", "vinyl": "Vinil" },
    "colors": "Número de colores",
    "colorOptions": { "1": "1 color", "2": "2 colores", "3": "3 colores", "4": "4 o más (a todo color)" },
    "turnaround": "Tiempo de entrega",
    "turnarounds": { "standard": "Estándar (24-48 h)", "rush": "Urgente (mismo día) +30%", "extended": "Extendido (3-5 días) -10%" },
    "cardNote": "Las tarjetas se imprimen en paquetes de 100.",
    "bannerNote": "El estimado de lonas supone unos 6 pies cuadrados. Dinos tu medida para un precio exacto.",
    "designNote": "¿Necesitas ayuda con el diseño? Es gratis.",
    "estimate": "Tu estimado",
    "base": "Precio base",
    "print": "Método de impresión",
    "color": "Colores",
    "turnaroundLine": "Tiempo de entrega",
    "total": "Total estimado",
    "unit": "Por unidad",
    "volApplied": "¡Descuento por volumen del {pct}% aplicado!",
    "volNext": "¡Pide {n} más y ahorra {pct}%!",
    "promo": "Descuento en tu primer pedido: usa el código",
    "promoOff": "para 10% de descuento.",
    "official": "Pedir cotización oficial",
    "disclaimer": "*Solo es un estimado. El precio final puede variar según los detalles del pedido. Contáctanos para una cotización oficial."
  },
  "process": {
    "title": "Cómo funciona",
    "subtitle": "Del diseño a la entrega en 4 pasos sencillos",
    "steps": [
      { "title": "Envía tu diseño", "body": "Mándanos tu logotipo, arte o idea. Aceptamos AI, EPS, PNG, JPG y más." },
      { "title": "Elige tus productos", "body": "Escoge entre camisetas, sudaderas y gorras. Elige colores, tallas y cantidades." },
      { "title": "Imprimimos y revisamos", "body": "Nuestro equipo se encarga de la impresión y revisa la calidad de cada pieza." },
      { "title": "Entrega rápida", "body": "Tu pedido está listo en 24 a 48 horas, con opción urgente el mismo día." }
    ]
  },
  "materials": {
    "title": "Opciones de material",
    "items": [
      { "name": "Algodón premium", "spec": "100% algodón, 180 GSM" },
      { "name": "Mezcla de algodón", "spec": "50/50 algodón-poliéster" },
      { "name": "Tela deportiva", "spec": "Absorbe la humedad" },
      { "name": "Tela gruesa", "spec": "Felpa de 300 GSM" }
    ]
  },
  "sizes": {
    "title": "Tablas de tallas",
    "apparel": {
      "caption": "Camisetas y sudaderas (pulgadas)",
      "head": ["Talla", "Pecho", "Largo", "Hombros"],
      "rows": [["XS", "32-34", "26", "14"], ["S", "34-36", "27", "15"], ["M", "38-40", "28", "16"], ["L", "42-44", "29", "17"], ["XL", "46-48", "30", "18"], ["2XL", "50-52", "31", "19"]]
    },
    "hats": {
      "caption": "Gorras (pulgadas)",
      "head": ["Talla", "Circunferencia", "Medida"],
      "rows": [["S/M", "21-22", "6 7/8 - 7"], ["M/L", "22-23", "7 - 7 1/4"], ["L/XL", "23-24", "7 1/4 - 7 5/8"], ["XL/XXL", "24-25", "7 5/8 - 8"]]
    },
    "note": "¿Necesitas una talla que no aparece? Pregúntanos: hacemos tallas especiales en pedidos especiales."
  }
}
```

- [ ] **Step 3: Create `src/components/PriceCalculator.astro`**

```astro
---
import Icon from './Icon.astro';
import { estimate, APPAREL } from '../lib/calc.js';
import { site } from '../data/site';
import { routes, type Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const c = (key: string) => t(lang, `services.calc.${key}`);
const opts = (key: string) => Object.entries(tRaw<Record<string, string>>(lang, `services.calc.${key}`));
const locale = lang === 'es' ? 'es-US' : 'en-US';
const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
const defaults = { product: 'tshirt', quantity: 10, method: 'screen', colors: '1', turnaround: 'standard' };
const r = estimate(defaults);
---
<section id="calculator" class="section section--tint" aria-labelledby="calc-title">
  <div class="container">
    <div class="center">
      <h2 id="calc-title">{c('title')}</h2>
      <p class="lead">{c('subtitle')}</p>
    </div>
    <form class="calc" data-calc data-locale={locale} data-vol-applied={c('volApplied')} data-vol-next={c('volNext')}>
      <div class="card inputs">
        <div class="field">
          <label for="c-product">{c('product')}</label>
          <select id="c-product" name="product">
            {opts('products').map(([v, l]) => <option value={v} selected={v === defaults.product}>{l}</option>)}
          </select>
        </div>
        <div class="field">
          <label for="c-qty">{c('quantity')}</label>
          <input id="c-qty" name="quantity" type="number" min="1" max="10000" step="1" inputmode="numeric" value={defaults.quantity} aria-describedby="c-qty-hint" />
          <small id="c-qty-hint">{c('qtyHint')}</small>
        </div>
        <div class="field" data-group="method">
          <label for="c-method">{c('method')}</label>
          <select id="c-method" name="method">
            {opts('methods').map(([v, l]) => <option value={v}>{l}</option>)}
          </select>
        </div>
        <div class="field" data-group="colors">
          <label for="c-colors">{c('colors')}</label>
          <select id="c-colors" name="colors">
            {opts('colorOptions').map(([v, l]) => <option value={v}>{l}</option>)}
          </select>
        </div>
        <div class="field">
          <label for="c-turn">{c('turnaround')}</label>
          <select id="c-turn" name="turnaround">
            {opts('turnarounds').map(([v, l]) => <option value={v}>{l}</option>)}
          </select>
        </div>
        <p class="note" data-group="cardNote" hidden>{c('cardNote')}</p>
        <p class="note" data-group="bannerNote" hidden>{c('bannerNote')}</p>
        <p class="note">{c('designNote')}</p>
      </div>

      <div class="card result">
        <h3>{c('estimate')}</h3>
        <dl>
          <div><dt>{c('base')}</dt><dd><output data-out="base">{money.format(r.base)}</output></dd></div>
          <div data-group="printLine"><dt>{c('print')}</dt><dd><output data-out="print">{money.format(r.print)}</output></dd></div>
          <div data-group="colorLine"><dt>{c('color')}</dt><dd><output data-out="color">{money.format(r.color)}</output></dd></div>
          <div><dt>{c('turnaroundLine')}</dt><dd><output data-out="turnaround">{money.format(r.turnaroundCost)}</output></dd></div>
          <div class="total"><dt>{c('total')}</dt><dd><output data-out="total" aria-live="polite">{money.format(r.total)}</output></dd></div>
          <div><dt>{c('unit')}</dt><dd><output data-out="unit">{money.format(r.unit)}</output></dd></div>
        </dl>
        <p class="volume"><output data-out="volume"></output></p>
        <p class="promo">{c('promo')} <strong class="code">{site.promoCode}</strong> {c('promoOff')}</p>
        <div class="btn-row">
          <a class="btn btn--primary" href={routes.contact[lang]}>{c('official')}</a>
          <a class="btn btn--ghost" href={site.phoneHref}><Icon name="phone" />{t(lang, 'common.cta.call')}</a>
        </div>
        <p class="disclaimer">{c('disclaimer')}</p>
      </div>
    </form>
  </div>
</section>

<style>
  .calc { display: grid; gap: 1.5rem; grid-template-columns: 1fr 1fr; margin-top: 2rem; align-items: start; }
  @media (max-width: 860px) { .calc { grid-template-columns: 1fr; } }
  .inputs { display: grid; gap: 1rem; }
  .field { display: grid; gap: 0.35rem; }
  label { font-weight: 700; }
  select, input {
    width: 100%; min-height: 48px; padding: 0.6rem 0.85rem;
    border: 2px solid var(--line); border-radius: 14px; background: var(--surface-2); color: var(--ink); font: inherit;
  }
  small, .note { color: var(--ink-soft); font-size: 0.95rem; margin: 0; }
  [hidden] { display: none !important; }
  .result h3 { margin-bottom: 1rem; }
  dl { margin: 0; display: grid; gap: 0.4rem; }
  dl div { display: flex; justify-content: space-between; gap: 1rem; }
  dt { color: var(--ink-soft); }
  dd { margin: 0; font-weight: 700; font-variant-numeric: tabular-nums; }
  .total { border-top: 2px solid var(--line); padding-top: 0.6rem; margin-top: 0.4rem; font-size: 1.3rem; }
  .total dt { color: var(--ink); font-weight: 700; }
  .volume { min-height: 1.6em; margin: 0.75rem 0; font-weight: 700; color: var(--link); }
  .promo { font-weight: 700; }
  .code { background: var(--accent); color: #111; padding: 0.1rem 0.5rem; border: 2px dashed #111; border-radius: 8px; }
  .disclaimer { font-size: 0.9rem; color: var(--ink-soft); margin: 1rem 0 0; }
</style>

<script>
  import { estimate, APPAREL, nextTier } from '../lib/calc.js';

  const form = document.querySelector<HTMLFormElement>('[data-calc]');
  if (form) {
    const money = new Intl.NumberFormat(form.dataset.locale, { style: 'currency', currency: 'USD' });
    const out = (name: string) => form.querySelector<HTMLOutputElement>(`[data-out="${name}"]`)!;
    const group = (name: string) => form.querySelector<HTMLElement>(`[data-group="${name}"]`)!;
    const fill = (tpl: string, vars: Record<string, number>) => tpl.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k]));

    const update = () => {
      const data = new FormData(form);
      const product = String(data.get('product'));
      const r = estimate({
        product,
        quantity: data.get('quantity'),
        method: data.get('method'),
        colors: data.get('colors'),
        turnaround: data.get('turnaround'),
      });
      const apparel = APPAREL.includes(product);
      for (const g of ['method', 'colors', 'printLine', 'colorLine']) group(g).hidden = !apparel;
      group('cardNote').hidden = product !== 'businesscard';
      group('bannerNote').hidden = product !== 'banner';

      out('base').value = money.format(r.base);
      out('print').value = money.format(r.print);
      out('color').value = money.format(r.color);
      const sign = r.turnaroundCost > 0 ? '+' : r.turnaroundCost < 0 ? '−' : '';
      out('turnaround').value = sign + money.format(Math.abs(r.turnaroundCost));
      out('total').value = money.format(r.total);
      out('unit').value = money.format(r.unit);

      const next = nextTier(r.effectiveQty);
      out('volume').value =
        r.volumeDiscount > 0
          ? fill(form.dataset.volApplied!, { pct: Math.round(r.volumeDiscount * 100) })
          : next
            ? fill(form.dataset.volNext!, { n: next.min - r.effectiveQty, pct: Math.round(next.discount * 100) })
            : '';
    };

    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', (e) => e.preventDefault());
    update();
  }
</script>
```

- [ ] **Step 4: Create `src/views/Services.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Photo from '../components/Photo.astro';
import PriceCalculator from '../components/PriceCalculator.astro';
import Cta from '../components/Cta.astro';
import { coverFor, type Category } from '../data/photos';
import type { Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
type Service = { id: Category; title: string; intro: string; bullets: string[] };
type Table = { caption: string; head: string[]; rows: string[][] };
const items = tRaw<Service[]>(lang, 'services.items');
const steps = tRaw<{ title: string; body: string }[]>(lang, 'services.process.steps');
const materials = tRaw<{ name: string; spec: string }[]>(lang, 'services.materials.items');
const tables = [tRaw<Table>(lang, 'services.sizes.apparel'), tRaw<Table>(lang, 'services.sizes.hats')];
---
<Base lang={lang} page="services" title={t(lang, 'services.meta.title')} description={t(lang, 'services.meta.description')}>
  <section class="page-head">
    <div class="container">
      <h1>{t(lang, 'services.title')}</h1>
      <p class="lead">{t(lang, 'services.subtitle')}</p>
    </div>
  </section>

  <section class="section">
    <div class="container list">
      {items.map((s, i) => {
        const photo = coverFor(s.id);
        return (
          <article id={s.id} class:list={['service', { flip: i % 2 === 1 }]}>
            <div class="media">
              {photo ? (
                <Photo photo={photo} lang={lang} sizes="(max-width: 860px) 100vw, 520px" />
              ) : (
                <div class="tile"><span>{t(lang, 'services.noPhoto')}</span></div>
              )}
            </div>
            <div class="text">
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
              {s.bullets.length > 0 && (
                <>
                  <p class="offer">{t(lang, 'services.weOffer')}</p>
                  <ul class="checks">{s.bullets.map((b) => <li>{b}</li>)}</ul>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  </section>

  <PriceCalculator lang={lang} />

  <section id="process" class="section">
    <div class="container">
      <div class="center">
        <h2>{t(lang, 'services.process.title')}</h2>
        <p class="lead">{t(lang, 'services.process.subtitle')}</p>
      </div>
      <ol class="grid steps">
        {steps.map((s, i) => (
          <li class="card step"><span class="num" aria-hidden="true">{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p></li>
        ))}
      </ol>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <h2>{t(lang, 'services.materials.title')}</h2>
      <ul class="grid materials">
        {materials.map((m) => <li class="card"><h3>{m.name}</h3><p>{m.spec}</p></li>)}
      </ul>
      <h2 class="sizes-title">{t(lang, 'services.sizes.title')}</h2>
      <div class="tables">
        {tables.map((tb) => (
          <div class="card table-wrap">
            <table>
              <caption>{tb.caption}</caption>
              <thead><tr>{tb.head.map((h) => <th scope="col">{h}</th>)}</tr></thead>
              <tbody>{tb.rows.map((row) => <tr>{row.map((cell, j) => (j === 0 ? <th scope="row">{cell}</th> : <td>{cell}</td>))}</tr>)}</tbody>
            </table>
          </div>
        ))}
      </div>
      <p class="size-note">{t(lang, 'services.sizes.note')}</p>
    </div>
  </section>

  <Cta lang={lang} />
</Base>

<style>
  .list { display: grid; gap: clamp(2.5rem, 6vw, 4.5rem); }
  .service { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 4vw, 3rem); align-items: center; scroll-margin-top: 90px; }
  .flip .media { order: 2; }
  @media (max-width: 860px) { .service { grid-template-columns: 1fr; } .flip .media { order: 0; } }
  .media { border: 2px solid var(--line); border-radius: 22px; overflow: hidden; box-shadow: var(--shadow); aspect-ratio: 4 / 3; background: var(--surface); }
  .media :global(img) { width: 100%; height: 100%; object-fit: cover; }
  .tile { height: 100%; display: grid; place-items: center; background: var(--brand); color: #111; font: 600 1.3rem 'Fredoka', system-ui, sans-serif; }
  .offer { font-weight: 700; margin-bottom: 0.5rem; }
  #process { scroll-margin-top: 90px; }
  .steps { list-style: none; padding: 0; margin: 3rem 0 0; row-gap: 2.5rem; }
  .step { position: relative; padding-top: 2.5rem; }
  .step p { color: var(--ink-soft); margin: 0; }
  .num {
    position: absolute; top: -1.4rem; left: 1.5rem; width: 2.8rem; height: 2.8rem;
    display: grid; place-items: center; border-radius: 50%;
    background: var(--accent); color: #111; border: 2px solid #111;
    font: 600 1.3rem/1 'Fredoka', system-ui, sans-serif;
  }
  .materials { list-style: none; padding: 0; margin: 1.5rem 0 3rem; }
  .materials p { margin: 0; color: var(--ink-soft); }
  .tables { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); margin-top: 1.5rem; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  caption { text-align: left; font: 600 1.1rem 'Fredoka', system-ui, sans-serif; margin-bottom: 0.75rem; }
  th, td { padding: 0.5rem 0.6rem; text-align: left; border-bottom: 1px solid var(--line-soft); }
  thead th { border-bottom: 2px solid var(--line); }
  .size-note { margin-top: 1.25rem; color: var(--ink-soft); }
</style>
```

- [ ] **Step 5: Route files**

`src/pages/services.astro`:
```astro
---
import Services from '../views/Services.astro';
---
<Services lang="en" />
```

`src/pages/es/servicios.astro`:
```astro
---
import Services from '../../views/Services.astro';
---
<Services lang="es" />
```

- [ ] **Step 6: Test, build, and browser-check the calculator (Review Focus 2)**

```bash
npm test && npm run check && npm run build
for id in shirts hoodies hats banners cards stickers process calculator; do grep -c "id=\"$id\"" dist/services/index.html; done   # each prints 1
grep -c "3-7 business days" dist/services/index.html   # 0
```
Start `npm run preview` in the background. In the browser pane at `http://localhost:4321/services/#calculator`:
1. Default shows Total `$105.00`, Per unit `$10.50`.
2. Set product to Business Cards: the method and colors fields hide, the card note shows, and Total reads `$21.25`.
3. Set quantity to each of `''`, `0`, `-3`, `1e5`, `abc`, `12.7` (Business Cards, then T-Shirt). Every total is a dollar amount with no `NaN` or `Infinity`.
4. Check `/es/servicios/`: totals format as Spanish US currency and the labels are Spanish.

Stop the preview server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Build bilingual services page with price calculator, materials, and size charts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Portfolio page with filters and full-size viewer

**Files:**
- Create: `src/i18n/en/portfolio.json`, `src/i18n/es/portfolio.json`, `src/components/Gallery.astro`, `src/views/Portfolio.astro`, `src/pages/portfolio.astro`, `src/pages/es/portafolio.astro`

**Interfaces:**
- Consumes: `photos`, `categories`, `<Photo>`, `getImage`, `Base`, `Cta`

- [ ] **Step 1: Translation files**

`src/i18n/en/portfolio.json`:
```json
{
  "meta": {
    "title": "Portfolio | Imagine PPTP Prints",
    "description": "See real custom shirts, hoodies, business cards, banners, and stickers printed by Imagine PPTP Prints in Elgin, IL."
  },
  "title": "Our Portfolio",
  "subtitle": "Explore our collection of custom printing projects and see the quality of our work",
  "filterLabel": "Filter projects",
  "filters": { "all": "All Projects", "shirts": "Custom Shirts", "hoodies": "Custom Hoodies", "hats": "Custom Hats", "banners": "Banners", "cards": "Business Cards", "stickers": "Stickers" },
  "open": "View larger",
  "close": "Close"
}
```

`src/i18n/es/portfolio.json`:
```json
{
  "meta": {
    "title": "Portafolio | Imagine PPTP Prints",
    "description": "Mira camisetas, sudaderas, tarjetas de presentación, lonas y calcomanías reales impresas por Imagine PPTP Prints en Elgin, IL."
  },
  "title": "Nuestro portafolio",
  "subtitle": "Explora nuestros proyectos de impresión personalizada y mira la calidad de nuestro trabajo",
  "filterLabel": "Filtrar proyectos",
  "filters": { "all": "Todos", "shirts": "Camisetas", "hoodies": "Sudaderas", "hats": "Gorras", "banners": "Lonas", "cards": "Tarjetas", "stickers": "Calcomanías" },
  "open": "Ver en grande",
  "close": "Cerrar"
}
```

- [ ] **Step 2: Create `src/components/Gallery.astro`**

```astro
---
import { getImage } from 'astro:assets';
import Photo from './Photo.astro';
import { photos, categories } from '../data/photos';
import type { Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const items = await Promise.all(
  photos.map(async (p) => ({
    p,
    full: (await getImage({ src: p.src, width: Math.min(1600, p.src.width), format: 'webp' })).src,
  })),
);
---
<div class="filters" role="group" aria-label={t(lang, 'portfolio.filterLabel')} data-filters>
  <button type="button" aria-pressed="true" data-filter="all">{t(lang, 'portfolio.filters.all')}</button>
  {categories.map((c) => <button type="button" aria-pressed="false" data-filter={c}>{t(lang, `portfolio.filters.${c}`)}</button>)}
</div>

<ul class="gallery" data-gallery>
  {items.map(({ p, full }) => (
    <li data-category={p.category}>
      <button type="button" class="thumb" data-full={full} data-alt={p.alt[lang]} aria-label={`${t(lang, 'portfolio.open')}: ${p.alt[lang]}`}>
        <Photo photo={p} lang={lang} sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 280px" />
      </button>
    </li>
  ))}
</ul>

<dialog class="viewer" data-viewer aria-label={t(lang, 'portfolio.open')}>
  <button type="button" class="btn btn--primary close" data-close>{t(lang, 'portfolio.close')}</button>
  <img alt="" data-viewer-img />
</dialog>

<style>
  .filters { display: none; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 2rem; }
  :global(.js) .filters { display: flex; }
  .filters button {
    min-height: 44px; padding: 0.5rem 1rem; cursor: pointer;
    border: 2px solid var(--line); border-radius: 999px; background: var(--surface-2); color: var(--ink);
    font: 600 1rem/1 'Fredoka', system-ui, sans-serif;
  }
  .filters button[aria-pressed='true'] { background: var(--brand); color: #111; border-color: #111; }
  .gallery { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(240px, 45%), 1fr)); }
  .gallery li[hidden] { display: none; }
  .thumb {
    display: block; width: 100%; aspect-ratio: 1; padding: 0; cursor: zoom-in;
    border: 2px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--surface);
    transition: transform 0.15s ease;
  }
  .thumb:hover { transform: translateY(-3px); }
  .thumb :global(img) { width: 100%; height: 100%; object-fit: cover; }
  .viewer { max-width: min(92vw, 1100px); max-height: 92vh; padding: 0; border: 3px solid #111; border-radius: 20px; background: var(--surface-2); }
  .viewer::backdrop { background: rgb(0 0 0 / 0.75); }
  .viewer img { max-height: 84vh; width: auto; margin: 0 auto; }
  .close { position: absolute; top: 0.75rem; right: 0.75rem; }
</style>

<script>
  const filters = document.querySelector<HTMLElement>('[data-filters]');
  const items = [...document.querySelectorAll<HTMLElement>('[data-gallery] > li')];
  filters?.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    for (const b of filters.querySelectorAll('[data-filter]')) b.setAttribute('aria-pressed', String(b === btn));
    const f = btn.dataset.filter;
    for (const li of items) li.hidden = f !== 'all' && li.dataset.category !== f;
  });

  const viewer = document.querySelector<HTMLDialogElement>('[data-viewer]');
  const img = viewer?.querySelector<HTMLImageElement>('[data-viewer-img]');
  let opener: HTMLElement | null = null;
  if (viewer && img) {
    document.querySelector('[data-gallery]')?.addEventListener('click', (e) => {
      const btn = (e.target as Element).closest<HTMLButtonElement>('.thumb');
      if (!btn) return;
      opener = btn;
      img.src = btn.dataset.full ?? '';
      img.alt = btn.dataset.alt ?? '';
      viewer.showModal();
    });
    viewer.querySelector('[data-close]')?.addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
    viewer.addEventListener('close', () => opener?.focus());
  }
</script>
```

- [ ] **Step 3: Create `src/views/Portfolio.astro` and route files**

`src/views/Portfolio.astro`:
```astro
---
import Base from '../layouts/Base.astro';
import Gallery from '../components/Gallery.astro';
import Cta from '../components/Cta.astro';
import type { Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
---
<Base lang={lang} page="portfolio" title={t(lang, 'portfolio.meta.title')} description={t(lang, 'portfolio.meta.description')}>
  <section class="page-head">
    <div class="container">
      <h1>{t(lang, 'portfolio.title')}</h1>
      <p class="lead">{t(lang, 'portfolio.subtitle')}</p>
    </div>
  </section>
  <section class="section">
    <div class="container"><Gallery lang={lang} /></div>
  </section>
  <Cta lang={lang} />
</Base>
```

`src/pages/portfolio.astro`:
```astro
---
import Portfolio from '../views/Portfolio.astro';
---
<Portfolio lang="en" />
```

`src/pages/es/portafolio.astro`:
```astro
---
import Portfolio from '../../views/Portfolio.astro';
---
<Portfolio lang="es" />
```

- [ ] **Step 4: Test, build, browser-check**

```bash
npm test && npm run check && npm run build
grep -o 'data-category=' dist/portfolio/index.html | wc -l   # 43
```
With `npm run preview` running, in the browser pane at `/portfolio/`:
1. Click each filter: only that category shows and `aria-pressed` moves to it.
2. Click a photo: the dialog opens with a large image and its alt text. Escape closes it and focus returns to the clicked photo.
3. Check that no "Custom Hats" filter appears (no hat photos).

Stop the preview server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Build bilingual portfolio with category filters and full-size viewer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: About page

**Files:**
- Create: `src/i18n/en/about.json`, `src/i18n/es/about.json`, `src/views/About.astro`, `src/pages/about.astro`, `src/pages/es/nosotros.astro`

- [ ] **Step 1: Create `src/i18n/en/about.json`**

```json
{
  "meta": {
    "title": "About Us | Imagine PPTP Prints",
    "description": "Learn about Imagine PPTP Prints, your trusted partner for high-quality custom printing services in Elgin, IL."
  },
  "title": "About Imagine PPTP Prints",
  "subtitle": "Your trusted partner for high-quality custom printing services in Elgin, Illinois",
  "story": {
    "title": "Our Story",
    "paragraphs": [
      "Imagine PPTP Prints is your local printing service specializing in high-quality custom apparel and accessories. We serve businesses, teams, and individuals throughout the Elgin area and beyond.",
      "Our mission is to provide exceptional printing services with a focus on quality, customer satisfaction, and timely delivery. Whether you need custom shirts for your business, hoodies for your team, or hats for your special event, we've got you covered."
    ]
  },
  "what": { "title": "What We Do", "body": "We specialize in custom printing services! Hablamos español: we're proud to serve our Spanish-speaking community!" },
  "servicesTitle": "Our Services",
  "services": [
    { "title": "Custom Shirts and T-Shirts", "body": "High-quality custom printed apparel for businesses, teams, and events. Screen printing and heat transfer options available." },
    { "title": "Personalized Hoodies", "body": "Custom hoodies perfect for teams, events, and branding. Available in various styles, colors, and sizes." },
    { "title": "Custom Hats and Caps", "body": "Professional embroidered caps for business branding and promotional events. Multiple styles available." },
    { "title": "Business Cards", "body": "High-quality business cards with custom designs. Various finishes including foil stamping and embossing." },
    { "title": "Banners and Signage", "body": "Large format banners and signs for events and business promotion. Weather-resistant vinyl options." },
    { "title": "Stickers and Decals", "body": "Custom vinyl stickers and decals for branding, vehicles, and promotional materials." }
  ],
  "contactTitle": "Contact Information",
  "cards": {
    "address": "Address", "directions": "Get directions",
    "phone": "Phone", "phoneNote": "Call anytime!",
    "email": "Email", "emailNote": "We respond quickly!",
    "store": "Online Store", "storeLink": "Visit our Shopify store", "storeNote": "Shop 24/7",
    "social": "Social Media", "tiktokLink": "Follow us on TikTok", "socialNote": "See our latest work!",
    "reviews": "Customer Reviews", "reviewsLink": "Read our reviews on Facebook", "reviewsNote": "Real reviews from real customers"
  },
  "hours": {
    "title": "Business Hours",
    "body": "Always open. We're here when you need us!",
    "delivery": "We offer delivery and contactless delivery options for your convenience."
  }
}
```

- [ ] **Step 2: Create `src/i18n/es/about.json`**

```json
{
  "meta": {
    "title": "Nosotros | Imagine PPTP Prints",
    "description": "Conoce a Imagine PPTP Prints, tu socio de confianza para impresión personalizada de alta calidad en Elgin, IL."
  },
  "title": "Sobre Imagine PPTP Prints",
  "subtitle": "Tu socio de confianza para impresión personalizada de alta calidad en Elgin, Illinois",
  "story": {
    "title": "Nuestra historia",
    "paragraphs": [
      "Imagine PPTP Prints es tu imprenta local, especializada en ropa y accesorios personalizados de alta calidad. Atendemos a negocios, equipos y personas en toda el área de Elgin y más allá.",
      "Nuestra misión es ofrecer un servicio de impresión excepcional, enfocado en la calidad, la satisfacción del cliente y la entrega a tiempo. Ya sea que necesites camisetas para tu negocio, sudaderas para tu equipo o gorras para tu evento, nosotros te ayudamos."
    ]
  },
  "what": { "title": "Lo que hacemos", "body": "¡Nos especializamos en impresión personalizada! Hablamos español y estamos orgullosos de servir a nuestra comunidad hispana." },
  "servicesTitle": "Nuestros servicios",
  "services": [
    { "title": "Camisetas personalizadas", "body": "Ropa impresa de alta calidad para negocios, equipos y eventos. Serigrafía y transferencia térmica disponibles." },
    { "title": "Sudaderas personalizadas", "body": "Sudaderas perfectas para equipos, eventos y tu marca. Disponibles en varios estilos, colores y tallas." },
    { "title": "Gorras personalizadas", "body": "Gorras bordadas profesionales para tu marca y eventos promocionales. Varios estilos disponibles." },
    { "title": "Tarjetas de presentación", "body": "Tarjetas de alta calidad con diseño personalizado. Varios acabados, incluido estampado metálico y relieve." },
    { "title": "Lonas y letreros", "body": "Lonas y letreros de gran formato para eventos y promoción de negocios. Opciones de vinil resistente a la intemperie." },
    { "title": "Calcomanías", "body": "Calcomanías de vinil personalizadas para tu marca, vehículos y material promocional." }
  ],
  "contactTitle": "Información de contacto",
  "cards": {
    "address": "Dirección", "directions": "Cómo llegar",
    "phone": "Teléfono", "phoneNote": "¡Llama cuando quieras!",
    "email": "Correo", "emailNote": "¡Respondemos rápido!",
    "store": "Tienda en línea", "storeLink": "Visita nuestra tienda en Shopify", "storeNote": "Compra 24/7",
    "social": "Redes sociales", "tiktokLink": "Síguenos en TikTok", "socialNote": "¡Mira nuestros trabajos más recientes!",
    "reviews": "Reseñas", "reviewsLink": "Lee nuestras reseñas en Facebook", "reviewsNote": "Reseñas reales de clientes reales"
  },
  "hours": {
    "title": "Horario",
    "body": "Siempre abiertos. ¡Estamos aquí cuando nos necesites!",
    "delivery": "Ofrecemos entrega a domicilio y entrega sin contacto para tu comodidad."
  }
}
```

- [ ] **Step 3: Create `src/views/About.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Icon from '../components/Icon.astro';
import Cta from '../components/Cta.astro';
import { site } from '../data/site';
import type { Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const a = (key: string) => t(lang, `about.${key}`);
const paragraphs = tRaw<string[]>(lang, 'about.story.paragraphs');
const services = tRaw<{ title: string; body: string }[]>(lang, 'about.services');
const cards = [
  { icon: 'pin', title: a('cards.address'), href: site.mapsUrl, link: site.addressLine, note: a('cards.directions'), external: true },
  { icon: 'phone', title: a('cards.phone'), href: site.phoneHref, link: site.phone, note: a('cards.phoneNote'), external: false },
  { icon: 'mail', title: a('cards.email'), href: `mailto:${site.email}`, link: site.email, note: a('cards.emailNote'), external: false },
  { icon: 'shop', title: a('cards.store'), href: site.shopify, link: a('cards.storeLink'), note: a('cards.storeNote'), external: true },
  { icon: 'chat', title: a('cards.social'), href: site.tiktok, link: a('cards.tiktokLink'), note: a('cards.socialNote'), external: true },
  { icon: 'check', title: a('cards.reviews'), href: site.facebook, link: a('cards.reviewsLink'), note: a('cards.reviewsNote'), external: true },
] as const;
---
<Base lang={lang} page="about" title={a('meta.title')} description={a('meta.description')}>
  <section class="page-head">
    <div class="container">
      <h1>{a('title')}</h1>
      <p class="lead">{a('subtitle')}</p>
    </div>
  </section>

  <section class="section">
    <div class="narrow">
      <div class="card story">
        <h2>{a('story.title')}</h2>
        {paragraphs.map((p) => <p>{p}</p>)}
      </div>
      <div class="center what">
        <h2>{a('what.title')}</h2>
        <p class="lead">{a('what.body')}</p>
      </div>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <h2 class="center">{a('servicesTitle')}</h2>
      <ul class="grid plain">{services.map((s) => <li class="card"><h3>{s.title}</h3><p>{s.body}</p></li>)}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="center">{a('contactTitle')}</h2>
      <ul class="grid plain">
        {cards.map((c) => (
          <li class="card contact-card">
            <span class="icon"><Icon name={c.icon} size={24} /></span>
            <h3>{c.title}</h3>
            <p><a href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener' : undefined}>{c.link}</a></p>
            <p class="note">{c.note}</p>
          </li>
        ))}
      </ul>
      <div class="card hours">
        <h3><Icon name="clock" /> {a('hours.title')}</h3>
        <p>{a('hours.body')}</p>
        <p><Icon name="truck" /> {a('hours.delivery')}</p>
      </div>
    </div>
  </section>

  <Cta lang={lang} />
</Base>

<style>
  .story { margin-bottom: 3rem; }
  .what .lead { margin-inline: auto; }
  .plain { list-style: none; padding: 0; margin: 2rem 0 0; }
  .plain p { color: var(--ink-soft); margin-bottom: 0.4rem; }
  .contact-card { text-align: center; }
  .icon {
    display: inline-grid; place-items: center; width: 3rem; height: 3rem; margin-bottom: 0.75rem;
    border-radius: 50%; background: var(--brand); color: #111; border: 2px solid #111;
  }
  .note { font-size: 0.95rem; }
  .hours { margin-top: 2rem; text-align: center; }
  .hours h3, .hours p { display: flex; gap: 0.5rem; align-items: center; justify-content: center; }
</style>
```

- [ ] **Step 4: Route files**

`src/pages/about.astro`:
```astro
---
import About from '../views/About.astro';
---
<About lang="en" />
```

`src/pages/es/nosotros.astro`:
```astro
---
import About from '../../views/About.astro';
---
<About lang="es" />
```

- [ ] **Step 5: Test, build, verify**

```bash
npm test && npm run check && npm run build
grep -c "Not yet rated" dist/about/index.html     # 0
grep -c "Always open" dist/about/index.html       # 1
grep -c "Siempre abiertos" dist/es/nosotros/index.html   # 1
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Build bilingual about page

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Contact page, quote form, thanks page

**Files:**
- Create: `src/i18n/en/contact.json`, `src/i18n/es/contact.json`, `src/i18n/en/thanks.json`, `src/i18n/es/thanks.json`
- Create: `src/components/QuoteForm.astro`, `src/views/Contact.astro`, `src/views/Thanks.astro`
- Create: `src/pages/contact.astro`, `src/pages/es/contacto.astro`, `src/pages/thanks.astro`, `src/pages/es/gracias.astro`

**Interfaces:**
- Produces: Netlify form named `quote` with fields `form-name, lang, bot-field, name, email, phone, contact_method, service, shirt_type, shirt_sizes, shirt_qty, shirt_colors, hoodie_type, hoodie_sizes, hoodie_qty, hoodie_colors, hat_type, hat_qty, hat_colors, banner_size, banner_material, card_size, card_finish, card_qty, other_qty, other_colors, deadline, design_file, reference_image, message, spanish`.

- [ ] **Step 1: Create `src/i18n/en/contact.json`**

```json
{
  "meta": {
    "title": "Contact Us | Imagine PPTP Prints",
    "description": "Get a free quote for custom shirts, hoodies, hats, banners, and business cards. Call, text, WhatsApp, or send your design. Located in Elgin, IL."
  },
  "title": "Contact Us",
  "intro": [
    "High quality printed shirts, hoodies, and hats for businesses, special occasions, you name it.",
    "Send us your design, we'll make the rest. Any questions? Feel free to text, call, or send an email."
  ],
  "formTitle": "Get In Touch",
  "form": {
    "name": "Full name", "email": "Email address", "phone": "Phone number",
    "method": "Preferred contact method", "methodPick": "Select preferred method",
    "methods": { "phone": "Phone", "email": "Email", "text": "Text message", "whatsapp": "WhatsApp" },
    "service": "Service interested in", "servicePick": "Select a service",
    "services": { "shirts": "Custom Shirts", "hoodies": "Custom Hoodies", "hats": "Custom Hats", "banners": "Custom Banners", "cards": "Business Cards", "stickers": "Stickers", "other": "Other" },
    "groups": { "shirts": "Shirt details", "hoodies": "Hoodie details", "hats": "Hat details", "banners": "Banner details", "cards": "Business card details", "other": "Order details (stickers and other)" },
    "type": "Type", "typePick": "Select type",
    "shirtTypes": { "tshirt": "T-Shirt", "polo": "Polo Shirt", "longsleeve": "Long Sleeve", "tank": "Tank Top" },
    "hoodieTypes": { "pullover": "Pullover Hoodie", "zip": "Zip-up Hoodie", "sweatshirt": "Sweatshirt" },
    "hatTypes": { "baseball": "Baseball Cap", "snapback": "Snapback", "beanie": "Beanie", "trucker": "Trucker Hat" },
    "sizes": "Sizes needed", "sizesPh": "S:10, M:15",
    "quantity": "Quantity needed",
    "colors": "Design colors", "colorsPh": "3 colors",
    "bannerSize": "Banner size", "bannerSizePh": "3ft x 6ft",
    "material": "Material preference", "materialPick": "Select material",
    "materials": { "vinyl": "Vinyl", "fabric": "Fabric", "mesh": "Mesh" },
    "cardSize": "Card size", "cardSizePick": "Select size",
    "cardSizes": { "standard": "Standard (3.5\" x 2\")", "square": "Square (2.5\" x 2.5\")", "mini": "Mini (3\" x 1.75\")" },
    "finish": "Finish preference", "finishPick": "Select finish",
    "finishes": { "matte": "Matte", "glossy": "Glossy", "semigloss": "Semi-Gloss" },
    "deadline": "Needed by (deadline)",
    "designFile": "Upload design file", "designHint": "Accepted formats: JPG, PNG, PDF, AI, EPS, PSD, SVG",
    "referenceFile": "Reference image", "referenceHint": "Upload any reference image or inspiration",
    "filesHint": "Up to 8 MB total. Bigger files? Send them on WhatsApp or by email.",
    "message": "Project details", "messagePh": "Tell us about your project...",
    "spanish": "I prefer to communicate in Spanish",
    "spanishAlt": "Prefiero comunicarme en español",
    "tooBig": "Those files are larger than 8 MB. Please send them on WhatsApp or by email instead, and submit the form without them.",
    "submit": "Send quote request",
    "honeypot": "Leave this field empty"
  },
  "info": { "title": "Contact Information", "address": "Address", "phone": "Phone", "email": "Email", "hours": "Business hours", "hoursValue": "Monday - Sunday, always open", "directions": "Get directions" },
  "delivery": { "title": "Delivery and Pickup", "items": ["Contactless delivery available", "Local pickup at our Elgin location", "Shipping available nationwide"] },
  "turnaround": { "title": "Turnaround Times", "items": ["Standard: 24-48 hours", "Rush: same day available", "Large orders: 2-3 days"] },
  "follow": { "title": "Follow Us", "shop": "Shop" }
}
```

- [ ] **Step 2: Create `src/i18n/es/contact.json`**

```json
{
  "meta": {
    "title": "Contacto | Imagine PPTP Prints",
    "description": "Pide una cotización gratis para camisetas, sudaderas, gorras, lonas y tarjetas de presentación. Llama, escribe por WhatsApp o envía tu diseño. Estamos en Elgin, IL."
  },
  "title": "Contáctanos",
  "intro": [
    "Camisetas, sudaderas y gorras impresas de alta calidad para negocios, ocasiones especiales y lo que necesites.",
    "Mándanos tu diseño y nosotros hacemos el resto. ¿Tienes preguntas? Escríbenos, llámanos o envíanos un correo."
  ],
  "formTitle": "Escríbenos",
  "form": {
    "name": "Nombre completo", "email": "Correo electrónico", "phone": "Teléfono",
    "method": "¿Cómo prefieres que te contactemos?", "methodPick": "Elige una opción",
    "methods": { "phone": "Llamada", "email": "Correo", "text": "Mensaje de texto", "whatsapp": "WhatsApp" },
    "service": "Servicio que te interesa", "servicePick": "Elige un servicio",
    "services": { "shirts": "Camisetas", "hoodies": "Sudaderas", "hats": "Gorras", "banners": "Lonas", "cards": "Tarjetas de presentación", "stickers": "Calcomanías", "other": "Otro" },
    "groups": { "shirts": "Detalles de camisetas", "hoodies": "Detalles de sudaderas", "hats": "Detalles de gorras", "banners": "Detalles de la lona", "cards": "Detalles de las tarjetas", "other": "Detalles del pedido (calcomanías y otros)" },
    "type": "Tipo", "typePick": "Elige el tipo",
    "shirtTypes": { "tshirt": "Camiseta", "polo": "Polo", "longsleeve": "Manga larga", "tank": "Sin mangas" },
    "hoodieTypes": { "pullover": "Sudadera con capucha", "zip": "Sudadera con cierre", "sweatshirt": "Sudadera sin capucha" },
    "hatTypes": { "baseball": "Gorra de béisbol", "snapback": "Snapback", "beanie": "Gorro tejido", "trucker": "Gorra trucker" },
    "sizes": "Tallas", "sizesPh": "S:10, M:15",
    "quantity": "Cantidad",
    "colors": "Colores del diseño", "colorsPh": "3 colores",
    "bannerSize": "Medida de la lona", "bannerSizePh": "3 pies x 6 pies",
    "material": "Material", "materialPick": "Elige el material",
    "materials": { "vinyl": "Vinil", "fabric": "Tela", "mesh": "Malla" },
    "cardSize": "Tamaño de tarjeta", "cardSizePick": "Elige el tamaño",
    "cardSizes": { "standard": "Estándar (3.5\" x 2\")", "square": "Cuadrada (2.5\" x 2.5\")", "mini": "Mini (3\" x 1.75\")" },
    "finish": "Acabado", "finishPick": "Elige el acabado",
    "finishes": { "matte": "Mate", "glossy": "Brillante", "semigloss": "Semibrillante" },
    "deadline": "Fecha límite",
    "designFile": "Sube tu diseño", "designHint": "Formatos: JPG, PNG, PDF, AI, EPS, PSD, SVG",
    "referenceFile": "Imagen de referencia", "referenceHint": "Sube una imagen de referencia o inspiración",
    "filesHint": "Hasta 8 MB en total. ¿Archivos más grandes? Mándalos por WhatsApp o correo.",
    "message": "Detalles del proyecto", "messagePh": "Cuéntanos sobre tu proyecto...",
    "spanish": "Prefiero comunicarme en español",
    "spanishAlt": "I prefer to communicate in Spanish",
    "tooBig": "Los archivos pesan más de 8 MB. Mándalos por WhatsApp o por correo y envía el formulario sin ellos.",
    "submit": "Enviar solicitud de cotización",
    "honeypot": "Deja este campo vacío"
  },
  "info": { "title": "Información de contacto", "address": "Dirección", "phone": "Teléfono", "email": "Correo", "hours": "Horario", "hoursValue": "Lunes a domingo, siempre abiertos", "directions": "Cómo llegar" },
  "delivery": { "title": "Entrega y recogida", "items": ["Entrega sin contacto disponible", "Recoge en nuestro local de Elgin", "Envíos a todo el país"] },
  "turnaround": { "title": "Tiempos de entrega", "items": ["Estándar: 24 a 48 horas", "Urgente: el mismo día", "Pedidos grandes: 2 a 3 días"] },
  "follow": { "title": "Síguenos", "shop": "Tienda" }
}
```

- [ ] **Step 3: Create thanks translations**

`src/i18n/en/thanks.json`:
```json
{
  "meta": { "title": "Thank You | Imagine PPTP Prints", "description": "Your quote request was sent." },
  "title": "Thank you!",
  "body": "We've received your message and will contact you soon.",
  "urgent": "In a hurry? Call or WhatsApp us:",
  "back": "Back to home"
}
```

`src/i18n/es/thanks.json`:
```json
{
  "meta": { "title": "Gracias | Imagine PPTP Prints", "description": "Tu solicitud de cotización fue enviada." },
  "title": "¡Gracias!",
  "body": "Hemos recibido tu mensaje y te contactaremos pronto.",
  "urgent": "¿Tienes prisa? Llámanos o escríbenos por WhatsApp:",
  "back": "Volver al inicio"
}
```

- [ ] **Step 4: Create `src/components/QuoteForm.astro`**

```astro
---
import { routes, other, type Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const f = (key: string) => t(lang, `contact.form.${key}`);
const options = (key: string) => Object.entries(tRaw<Record<string, string>>(lang, `contact.form.${key}`));
const MAX_BYTES = 8 * 1024 * 1024;
---
<form
  class="quote"
  name="quote"
  method="POST"
  action={routes.thanks[lang]}
  enctype="multipart/form-data"
  data-netlify="true"
  netlify-honeypot="bot-field"
  data-quote
  data-max-bytes={MAX_BYTES}
  data-too-big={f('tooBig')}
>
  <input type="hidden" name="form-name" value="quote" />
  <input type="hidden" name="lang" value={lang} />
  <p class="visually-hidden" aria-hidden="true">
    <label>{f('honeypot')} <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
  </p>

  <div class="row">
    <div class="field">
      <label for="q-name">{f('name')} <span class="req" aria-hidden="true">*</span></label>
      <input id="q-name" name="name" required minlength="2" autocomplete="name" />
    </div>
    <div class="field">
      <label for="q-email">{f('email')} <span class="req" aria-hidden="true">*</span></label>
      <input id="q-email" name="email" type="email" required autocomplete="email" />
    </div>
    <div class="field">
      <label for="q-phone">{f('phone')}</label>
      <input id="q-phone" name="phone" type="tel" autocomplete="tel" />
    </div>
    <div class="field">
      <label for="q-method">{f('method')}</label>
      <select id="q-method" name="contact_method">
        <option value="">{f('methodPick')}</option>
        {options('methods').map(([v, l]) => <option value={v}>{l}</option>)}
      </select>
    </div>
  </div>

  <div class="field">
    <label for="q-service">{f('service')} <span class="req" aria-hidden="true">*</span></label>
    <select id="q-service" name="service" required>
      <option value="">{f('servicePick')}</option>
      {options('services').map(([v, l]) => <option value={v}>{l}</option>)}
    </select>
  </div>

  <fieldset data-for="shirts">
    <legend>{f('groups.shirts')}</legend>
    <div class="row">
      <div class="field">
        <label for="q-shirt-type">{f('type')}</label>
        <select id="q-shirt-type" name="shirt_type"><option value="">{f('typePick')}</option>{options('shirtTypes').map(([v, l]) => <option value={v}>{l}</option>)}</select>
      </div>
      <div class="field"><label for="q-shirt-sizes">{f('sizes')}</label><input id="q-shirt-sizes" name="shirt_sizes" placeholder={f('sizesPh')} /></div>
      <div class="field"><label for="q-shirt-qty">{f('quantity')}</label><input id="q-shirt-qty" name="shirt_qty" type="number" min="1" inputmode="numeric" /></div>
      <div class="field"><label for="q-shirt-colors">{f('colors')}</label><input id="q-shirt-colors" name="shirt_colors" placeholder={f('colorsPh')} /></div>
    </div>
  </fieldset>

  <fieldset data-for="hoodies">
    <legend>{f('groups.hoodies')}</legend>
    <div class="row">
      <div class="field">
        <label for="q-hoodie-type">{f('type')}</label>
        <select id="q-hoodie-type" name="hoodie_type"><option value="">{f('typePick')}</option>{options('hoodieTypes').map(([v, l]) => <option value={v}>{l}</option>)}</select>
      </div>
      <div class="field"><label for="q-hoodie-sizes">{f('sizes')}</label><input id="q-hoodie-sizes" name="hoodie_sizes" placeholder={f('sizesPh')} /></div>
      <div class="field"><label for="q-hoodie-qty">{f('quantity')}</label><input id="q-hoodie-qty" name="hoodie_qty" type="number" min="1" inputmode="numeric" /></div>
      <div class="field"><label for="q-hoodie-colors">{f('colors')}</label><input id="q-hoodie-colors" name="hoodie_colors" placeholder={f('colorsPh')} /></div>
    </div>
  </fieldset>

  <fieldset data-for="hats">
    <legend>{f('groups.hats')}</legend>
    <div class="row">
      <div class="field">
        <label for="q-hat-type">{f('type')}</label>
        <select id="q-hat-type" name="hat_type"><option value="">{f('typePick')}</option>{options('hatTypes').map(([v, l]) => <option value={v}>{l}</option>)}</select>
      </div>
      <div class="field"><label for="q-hat-qty">{f('quantity')}</label><input id="q-hat-qty" name="hat_qty" type="number" min="1" inputmode="numeric" /></div>
      <div class="field"><label for="q-hat-colors">{f('colors')}</label><input id="q-hat-colors" name="hat_colors" placeholder={f('colorsPh')} /></div>
    </div>
  </fieldset>

  <fieldset data-for="banners">
    <legend>{f('groups.banners')}</legend>
    <div class="row">
      <div class="field"><label for="q-banner-size">{f('bannerSize')}</label><input id="q-banner-size" name="banner_size" placeholder={f('bannerSizePh')} /></div>
      <div class="field">
        <label for="q-banner-material">{f('material')}</label>
        <select id="q-banner-material" name="banner_material"><option value="">{f('materialPick')}</option>{options('materials').map(([v, l]) => <option value={v}>{l}</option>)}</select>
      </div>
    </div>
  </fieldset>

  <fieldset data-for="cards">
    <legend>{f('groups.cards')}</legend>
    <div class="row">
      <div class="field">
        <label for="q-card-size">{f('cardSize')}</label>
        <select id="q-card-size" name="card_size"><option value="">{f('cardSizePick')}</option>{options('cardSizes').map(([v, l]) => <option value={v}>{l}</option>)}</select>
      </div>
      <div class="field">
        <label for="q-card-finish">{f('finish')}</label>
        <select id="q-card-finish" name="card_finish"><option value="">{f('finishPick')}</option>{options('finishes').map(([v, l]) => <option value={v}>{l}</option>)}</select>
      </div>
      <div class="field"><label for="q-card-qty">{f('quantity')}</label><input id="q-card-qty" name="card_qty" type="number" min="1" inputmode="numeric" /></div>
    </div>
  </fieldset>

  <fieldset data-for="stickers other">
    <legend>{f('groups.other')}</legend>
    <div class="row">
      <div class="field"><label for="q-other-qty">{f('quantity')}</label><input id="q-other-qty" name="other_qty" type="number" min="1" inputmode="numeric" /></div>
      <div class="field"><label for="q-other-colors">{f('colors')}</label><input id="q-other-colors" name="other_colors" placeholder={f('colorsPh')} /></div>
    </div>
  </fieldset>

  <div class="row">
    <div class="field"><label for="q-deadline">{f('deadline')}</label><input id="q-deadline" name="deadline" type="date" /></div>
  </div>
  <div class="row">
    <div class="field">
      <label for="q-design">{f('designFile')}</label>
      <input id="q-design" name="design_file" type="file" accept=".jpg,.jpeg,.png,.pdf,.ai,.eps,.psd,.svg" aria-describedby="q-design-hint q-files-hint" />
      <small id="q-design-hint">{f('designHint')}</small>
    </div>
    <div class="field">
      <label for="q-ref">{f('referenceFile')}</label>
      <input id="q-ref" name="reference_image" type="file" accept="image/*" aria-describedby="q-ref-hint q-files-hint" />
      <small id="q-ref-hint">{f('referenceHint')}</small>
    </div>
  </div>
  <p class="hint" id="q-files-hint">{f('filesHint')}</p>

  <div class="field">
    <label for="q-message">{f('message')} <span class="req" aria-hidden="true">*</span></label>
    <textarea id="q-message" name="message" rows="5" required minlength="10" placeholder={f('messagePh')}></textarea>
  </div>

  <label class="check">
    <input type="checkbox" name="spanish" value="yes" />
    <span>{f('spanish')} <span class="alt" lang={other(lang)}>· {f('spanishAlt')}</span></span>
  </label>

  <p class="error" role="alert" data-error hidden></p>
  <button type="submit" class="btn btn--primary submit">{f('submit')}</button>
</form>

<style>
  .quote { display: grid; gap: 1.1rem; }
  .row { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); }
  .field { display: grid; gap: 0.35rem; align-content: start; }
  label { font-weight: 700; }
  input:not([type='checkbox']), select, textarea {
    width: 100%; min-height: 48px; padding: 0.65rem 0.85rem;
    border: 2px solid var(--line); border-radius: 14px; background: var(--surface-2); color: var(--ink); font: inherit;
  }
  input[type='file'] { padding: 0.55rem; }
  textarea { min-height: 8rem; resize: vertical; }
  fieldset { border: 2px dashed var(--line-soft); border-radius: 18px; padding: 1rem 1.25rem 1.25rem; margin: 0; }
  fieldset[hidden] { display: none; }
  legend { font: 600 1.05rem 'Fredoka', system-ui, sans-serif; padding: 0 0.4rem; }
  small, .hint { color: var(--ink-soft); font-size: 0.92rem; margin: 0; }
  .req { color: var(--link); }
  .check { display: flex; gap: 0.6rem; align-items: flex-start; font-weight: 400; }
  .check input { width: 1.3rem; height: 1.3rem; margin-top: 0.2rem; accent-color: var(--brand-deep); }
  .alt { color: var(--ink-soft); }
  .error { margin: 0; padding: 0.75rem 1rem; border: 2px solid #b42318; border-radius: 14px; background: #fde8e6; color: #7a1a12; font-weight: 700; }
  .error[hidden] { display: none; }
  .submit { justify-self: start; }
</style>

<script>
  const form = document.querySelector<HTMLFormElement>('[data-quote]');
  if (form) {
    const service = form.querySelector<HTMLSelectElement>('select[name="service"]')!;
    const groups = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-for]')];
    const error = form.querySelector<HTMLElement>('[data-error]')!;

    const sync = () => {
      for (const g of groups) {
        const active = (g.dataset.for ?? '').split(' ').includes(service.value);
        g.hidden = !active;
        g.disabled = !active; // disabled fieldsets are not submitted
      }
    };
    service.addEventListener('change', sync);
    sync();

    form.addEventListener('change', () => { error.hidden = true; });
    form.addEventListener('submit', (e) => {
      const bytes = [...form.querySelectorAll<HTMLInputElement>('input[type="file"]')]
        .flatMap((input) => [...(input.files ?? [])])
        .reduce((sum, file) => sum + file.size, 0);
      if (bytes > Number(form.dataset.maxBytes)) {
        e.preventDefault();
        error.textContent = form.dataset.tooBig ?? '';
        error.hidden = false;
      }
    });
  }
</script>
```

- [ ] **Step 5: Create `src/views/Contact.astro` and `src/views/Thanks.astro`**

`src/views/Contact.astro`:
```astro
---
import Base from '../layouts/Base.astro';
import Icon from '../components/Icon.astro';
import QuoteForm from '../components/QuoteForm.astro';
import Faq from '../components/Faq.astro';
import { site } from '../data/site';
import type { Lang } from '../i18n/routes';
import { t, tRaw } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
const c = (key: string) => t(lang, `contact.${key}`);
const intro = tRaw<string[]>(lang, 'contact.intro');
const delivery = tRaw<string[]>(lang, 'contact.delivery.items');
const turnaround = tRaw<string[]>(lang, 'contact.turnaround.items');
---
<Base lang={lang} page="contact" title={c('meta.title')} description={c('meta.description')}>
  <section class="page-head">
    <div class="container">
      <h1>{c('title')}</h1>
      {intro.map((p) => <p class="lead">{p}</p>)}
      <p class="pill" lang="es">{t(lang, 'common.spanish')}</p>
    </div>
  </section>

  <section class="section">
    <div class="container layout">
      <div class="card">
        <h2>{c('formTitle')}</h2>
        <QuoteForm lang={lang} />
      </div>
      <aside class="info">
        <div class="card">
          <h2>{c('info.title')}</h2>
          <ul class="facts">
            <li><Icon name="pin" /><div><strong>{c('info.address')}</strong><br /><a href={site.mapsUrl} target="_blank" rel="noopener">{site.addressLine}</a><br /><a href={site.mapsUrl} target="_blank" rel="noopener">{c('info.directions')}</a></div></li>
            <li><Icon name="phone" /><div><strong>{c('info.phone')}</strong><br /><a href={site.phoneHref}>{site.phone}</a></div></li>
            <li><Icon name="mail" /><div><strong>{c('info.email')}</strong><br /><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
            <li><Icon name="clock" /><div><strong>{c('info.hours')}</strong><br />{c('info.hoursValue')}</div></li>
          </ul>
        </div>
        <div class="card">
          <h3><Icon name="truck" /> {c('delivery.title')}</h3>
          <ul class="checks">{delivery.map((d) => <li>{d}</li>)}</ul>
        </div>
        <div class="card">
          <h3><Icon name="clock" /> {c('turnaround.title')}</h3>
          <ul class="checks">{turnaround.map((d) => <li>{d}</li>)}</ul>
        </div>
        <div class="card">
          <h3>{c('follow.title')}</h3>
          <div class="btn-row">
            <a class="btn btn--ghost" href={site.tiktok} target="_blank" rel="noopener">TikTok</a>
            <a class="btn btn--ghost" href={site.facebook} target="_blank" rel="noopener">Facebook</a>
            <a class="btn btn--ghost" href={site.shopify} target="_blank" rel="noopener">{c('follow.shop')}</a>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <Faq lang={lang} />
</Base>

<style>
  .layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; align-items: start; }
  @media (max-width: 960px) { .layout { grid-template-columns: 1fr; } }
  .info { display: grid; gap: 1.25rem; }
  .info h3 { display: flex; align-items: center; gap: 0.5rem; }
  .facts { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
  .facts li { display: grid; grid-template-columns: auto 1fr; gap: 0.75rem; align-items: start; }
  .facts :global(svg) { margin-top: 0.2rem; color: var(--brand-deep); }
  .page-head .pill { margin-top: 0.5rem; }
</style>
```

`src/views/Thanks.astro`:
```astro
---
import Base from '../layouts/Base.astro';
import Icon from '../components/Icon.astro';
import { site } from '../data/site';
import { routes, type Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
---
<Base lang={lang} page="thanks" title={t(lang, 'thanks.meta.title')} description={t(lang, 'thanks.meta.description')} noindex>
  <section class="section">
    <div class="narrow center">
      <h1>{t(lang, 'thanks.title')}</h1>
      <p class="lead">{t(lang, 'thanks.body')}</p>
      <p>{t(lang, 'thanks.urgent')}</p>
      <div class="btn-row">
        <a class="btn btn--primary" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
        <a class="btn btn--ghost" href={site.whatsapp} target="_blank" rel="noopener"><Icon name="chat" />WhatsApp</a>
        <a class="btn btn--ghost" href={routes.home[lang]}>{t(lang, 'thanks.back')}</a>
      </div>
    </div>
  </section>
</Base>
```

- [ ] **Step 6: Route files**

`src/pages/contact.astro`:
```astro
---
import Contact from '../views/Contact.astro';
---
<Contact lang="en" />
```
`src/pages/es/contacto.astro`:
```astro
---
import Contact from '../../views/Contact.astro';
---
<Contact lang="es" />
```
`src/pages/thanks.astro`:
```astro
---
import Thanks from '../views/Thanks.astro';
---
<Thanks lang="en" />
```
`src/pages/es/gracias.astro`:
```astro
---
import Thanks from '../../views/Thanks.astro';
---
<Thanks lang="es" />
```

- [ ] **Step 7: Test, build, verify markup**

```bash
npm test && npm run check && npm run build
grep -c 'data-netlify="true"' dist/contact/index.html dist/es/contacto/index.html   # 1 each
grep -c 'action="/thanks/"' dist/contact/index.html                                 # 1
grep -c 'action="/es/gracias/"' dist/es/contacto/index.html                         # 1
grep -c 'name="robots" content="noindex"' dist/thanks/index.html                    # 1
grep -c "3-5 business days" dist/contact/index.html                                 # 0
```

- [ ] **Step 8: Browser-check form behavior (Review Focus 3)**

With `npm run preview` running, in the browser pane at `/contact/`:
1. On load, every `fieldset[data-for]` is hidden and disabled. Choose "Custom Banners": only the banner fieldset shows. Choose "Stickers", then "Other": the "stickers and other" fieldset shows for both.
2. Run:
   ```js
   const f = document.querySelector('[data-quote]');
   document.querySelector('#q-service').value = 'banners';
   document.querySelector('#q-service').dispatchEvent(new Event('change'));
   [...new FormData(f).keys()]
   ```
   Expected: keys include `banner_size`, `banner_material`. They contain no `shirt_*`, `hoodie_*`, `hat_*`, `card_*`, or `other_*`.
3. Simulate an oversized file:
   ```js
   const input = document.querySelector('#q-design');
   const dt = new DataTransfer();
   dt.items.add(new File([new Uint8Array(9 * 1024 * 1024)], 'big.png', { type: 'image/png' }));
   input.files = dt.files;
   ['#q-name','#q-email','#q-message'].forEach((s, i) => document.querySelector(s).value = ['Test','t@example.com','Ten chars plus'][i]);
   const ev = new Event('submit', { cancelable: true });
   f.dispatchEvent(ev);
   [ev.defaultPrevented, document.querySelector('[data-error]').hidden, document.querySelector('[data-error]').textContent]
   ```
   Expected: `[true, false, "Those files are larger than 8 MB…"]`.
4. Do **not** actually submit (there is no Netlify endpoint locally).

Stop the preview server.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Build bilingual contact page with Netlify quote form and thanks pages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: 404 pages, sitemap, robots, and internal link checker

**Files:**
- Create: `src/i18n/en/notfound.json`, `src/i18n/es/notfound.json`, `src/views/NotFound.astro`, `src/pages/404.astro`, `src/pages/es/404.astro`
- Create: `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `scripts/check-links.mjs`
- Modify: `netlify.toml`, `package.json` (add `check:links`)

- [ ] **Step 1: Write the link checker first** (`scripts/check-links.mjs`)

```js
// Fails when an internal href/src/srcset/action in dist/*.html points to a missing file or #id.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
})(dist);

const targetFile = (path) => {
  const clean = decodeURI(path);
  return clean.endsWith('/') ? join(dist, clean, 'index.html') : join(dist, clean);
};

const problems = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src|action)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const url of urls) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const [beforeHash, hash] = url.split('#');
    const file = targetFile(beforeHash.split('?')[0]);
    const where = page.slice(dist.length);
    if (!existsSync(file)) {
      problems.push(`${where}: ${url} (no file)`);
    } else if (hash && file.endsWith('.html') && !readFileSync(file, 'utf8').includes(`id="${hash}"`)) {
      problems.push(`${where}: ${url} (no #${hash})`);
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`OK: ${pages.length} pages, all internal links resolve.`);
```

Add to `package.json` scripts: `"check:links": "node scripts/check-links.mjs"`.

- [ ] **Step 2: Prove the checker catches a broken link, then run it for real**

Temporarily add `<a href="/missing/">x</a>` and `<a href="/services/#nope">y</a>` inside the `<section>` of `src/views/Thanks.astro`, then run `npm run build && npm run check:links`.
Expected: exit code 1, with output listing `/missing/ (no file)` and `/services/#nope (no #nope)`.
Remove both links, rebuild, and run `npm run check:links` again.
Expected: `OK: …`. If it lists real problems, fix them before continuing.

- [ ] **Step 3: 404 translations and view**

`src/i18n/en/notfound.json`:
```json
{
  "meta": { "title": "Page Not Found | Imagine PPTP Prints", "description": "This page doesn't exist." },
  "title": "Page not found",
  "body": "Sorry, we couldn't find that page. It may have moved.",
  "home": "Go to the home page",
  "contact": "Contact us"
}
```
`src/i18n/es/notfound.json`:
```json
{
  "meta": { "title": "Página no encontrada | Imagine PPTP Prints", "description": "Esta página no existe." },
  "title": "Página no encontrada",
  "body": "Lo sentimos, no encontramos esa página. Es posible que se haya movido.",
  "home": "Ir al inicio",
  "contact": "Contáctanos"
}
```

`src/views/NotFound.astro`:
```astro
---
import Base from '../layouts/Base.astro';
import { routes, type Lang } from '../i18n/routes';
import { t } from '../i18n/t';

interface Props { lang: Lang }
const { lang } = Astro.props;
---
<Base lang={lang} page={null} title={t(lang, 'notfound.meta.title')} description={t(lang, 'notfound.meta.description')} noindex>
  <section class="section">
    <div class="narrow center">
      <p class="code" aria-hidden="true">404</p>
      <h1>{t(lang, 'notfound.title')}</h1>
      <p class="lead">{t(lang, 'notfound.body')}</p>
      <div class="btn-row">
        <a class="btn btn--primary" href={routes.home[lang]}>{t(lang, 'notfound.home')}</a>
        <a class="btn btn--ghost" href={routes.contact[lang]}>{t(lang, 'notfound.contact')}</a>
      </div>
    </div>
  </section>
</Base>

<style>
  .code { font: 600 clamp(4rem, 15vw, 8rem)/1 'Fredoka', system-ui, sans-serif; color: var(--brand-deep); margin: 0; }
</style>
```

`src/pages/404.astro`:
```astro
---
import NotFound from '../views/NotFound.astro';
---
<NotFound lang="en" />
```
`src/pages/es/404.astro`:
```astro
---
import NotFound from '../../views/NotFound.astro';
---
<NotFound lang="es" />
```

Append to `netlify.toml`:
```toml

[[redirects]]
  from = "/es/*"
  to = "/es/404/"
  status = 404
```

- [ ] **Step 4: Sitemap and robots endpoints**

`src/pages/sitemap.xml.ts`:
```ts
import type { APIRoute } from 'astro';
import { routes, langs, type PageKey } from '../i18n/routes';

const pages = (Object.keys(routes) as PageKey[]).filter((k) => k !== 'thanks');

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const urls = pages.flatMap((page) =>
    langs.map((lang) =>
      [
        '  <url>',
        `    <loc>${abs(routes[page][lang])}</loc>`,
        ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(routes[page][l])}"/>`),
        '  </url>',
      ].join('\n'),
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
```

`src/pages/robots.txt.ts`:
```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
```

- [ ] **Step 5: Build and run every check**

```bash
npm test && npm run check && npm run build && npm run check:links
ls dist/404.html dist/es/404/index.html dist/sitemap.xml dist/robots.txt
grep -c "<loc>" dist/sitemap.xml        # 10 (5 pages × 2 languages)
```
Expected: all pass; `check:links` prints `OK: <n> pages…`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add localized 404 pages, sitemap, robots, and internal link checker

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Full verification, reviews, README

**Files:**
- Create: `README.md`
- Modify: any file needed to fix findings from this task

- [ ] **Step 1: Clean full run**

```bash
rm -rf dist .astro
npm test && npm run check && npm run build && npm run check:links
```
Expected: all green.

- [ ] **Step 2: Screenshot matrix**

Run `npm run preview` in the background. In the browser pane, for each path in `/ /services/ /portfolio/ /about/ /contact/ /thanks/ /es/ /es/servicios/ /es/portafolio/ /es/nosotros/ /es/contacto/ /es/gracias/ /es/404/`:
- at 1280×800 and 375×812 (`resize_window`)
- in light and dark (click the theme toggle once, then check `data-theme`)

Take a screenshot of each combination. Look for overlapping elements, unreadable text, broken images, and English text on Spanish pages. Fix anything wrong, rebuild, and re-check that page.

- [ ] **Step 3: Content audit against spec §4**

```bash
for s in "24-48" "FIRST10" "imaginepttp@gmail.com" "(331) 255-5330" "840 N State St" "Shopify" "TikTok" "Facebook" "Venmo" "Zelle" "10ft" "Foil stamping" "300 GSM"; do
  printf "%-24s %s\n" "$s" "$(grep -rl -- "$s" dist --include=*.html | wc -l)"
done
```
Expected: every term appears in at least 1 page. Then confirm the banned terms are absent:
```bash
grep -rlE "3-5 business days|3-7 business days|Monday-Friday|Happy Customers|TechCorp|StartupXYZ|Maria G\.|Not yet rated" dist --include=*.html | wc -l   # 0
```

- [ ] **Step 4: Narrow phones (Review Focus 5)**

In the browser pane at 320×640, for every path from Step 2, run:
```js
[document.documentElement.scrollWidth <= window.innerWidth, location.pathname]
```
Expected: `true` for every page. On `/contact/`, scroll to the bottom and run:
```js
const b = document.querySelector('.submit').getBoundingClientRect();
const bar = document.querySelector('.float').getBoundingClientRect();
b.bottom <= bar.top || b.top >= bar.bottom
```
Scroll so the submit button sits just above the bar. Expected: `true`, so the button is visible and not covered. Fix overflow (usually a `min-width` or long word) if any page fails.

- [ ] **Step 5: Lighthouse**

Use the chrome-devtools MCP tools (`mcp__plugin_ecc_chrome-devtools__navigate_page`, `…__emulate`, `…__lighthouse_audit`) against `http://localhost:4321/` and `/services/` with a mobile profile:
- Light: run the audit.
- Dark: run `localStorage.setItem('theme','dark')` on the page, reload, and audit again.

Targets: performance ≥ 90, accessibility ≥ 95 for all four runs. Fix the listed issues (common ones: contrast, missing label, image size) and re-run until the targets are met.

Stop the preview server.

- [ ] **Step 6: Independent reviews**

Dispatch in parallel:
- `ecc:a11y-architect`: "Review the Astro site in C:\Users\georg\Desktop\ImaginePPTPprints (branch rebuild-astro, diff legacy-php-site..HEAD, src/ only) for WCAG 2.2 AA: focus order, labels, contrast in both data-theme values, reduced motion, dialog behavior, form errors. Report file:line findings only."
- `ecc:code-reviewer`: "Review src/, scripts/, astro.config.mjs, netlify.toml in C:\Users\georg\Desktop\ImaginePPTPprints (diff legacy-php-site..HEAD) for correctness bugs, broken i18n keys, Netlify Forms mistakes, and anything contradicting docs/superpowers/specs/2026-10-08-site-rebuild-design.md. Report file:line findings only."

Verify each finding against the code. Fix the confirmed ones. Re-run Step 1.

- [ ] **Step 7: Write `README.md`**

````markdown
# Imagine PPTP Prints website

Static site for Imagine PPTP Prints (Elgin, IL), built with Astro. English at `/`, Spanish at `/es/`, with light and dark themes.

## Run it

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # price calculator + translation checks
npm run build        # outputs dist/
npm run check:links  # every internal link in dist/ resolves
```

## Edit content

- Phone, email, address, social links, promo code: `src/data/site.ts`
- Page text: `src/i18n/en/*.json` and `src/i18n/es/*.json`. Both languages must have the same keys; `npm test` fails if they drift.
- Photos: put the file in `src/assets/photos/<category>/`, then add an entry to `src/data/photos.ts`. The build fails if a photo isn't listed.
- Calculator prices: `src/lib/calc.js` (update `src/lib/calc.test.js` to match).

## Deploy

Netlify builds every push to `main` (see `netlify.toml`). The quote form uses Netlify Forms (form name `quote`). Turn on email notifications under Netlify → Forms → Form notifications.

## Before launch

- Native speaker review of the Spanish text.
- Confirm payment methods, size range (chart stops at 2XL; an old FAQ said 5XL), and material specs.
- Set the real domain in `astro.config.mjs` (`site`).
- Check Netlify's current free-plan form limits; switch to Formspree if needed.

The previous PHP site is preserved at git tag `legacy-php-site`.
````

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "Verify rebuild, fix review findings, and document the new site

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git log --oneline legacy-php-site..HEAD
```

---

## Spec coverage map

| Spec § | Task |
|---|---|
| 1 Goals and success criteria | 7-11 (content), 13 (Lighthouse, audit) |
| 2 Decisions | 1 (stack), 4 (theme, EN/ES), 7 (reviews link), 8 (calculator), 11 (form) |
| 3 Resolved conflicts | 3 (banned-term test), 7-11 (copy), 13 Step 3 |
| 4.1 Facts | 3 (`site.ts`), 4 (footer, JSON-LD) |
| 4.2 Services | 7 (grid), 8 (detail), 10 (about cards) |
| 4.3 Process | 7 (3 steps), 8 (4 steps) |
| 4.4 Materials and sizes | 8 |
| 4.5 FAQ | 3 (JSON), 6 (component), 7 + 11 (placement) |
| 4.6 Quote form | 11 |
| 4.7 Photos | 5 |
| 5 Pages | 4, 7-12 |
| 6.1 Layout | all (deviations listed above) |
| 6.2 Theming | 4 |
| 6.3 Calculator | 2, 8 |
| 6.4 Quote form | 11 |
| 6.5 Images | 5 |
| 6.6 SEO | 4 (meta, hreflang, JSON-LD, OG), 12 (sitemap, robots) |
| 6.7 Accessibility | 4, 6, 9, 11, 13 |
| 7 Error handling | 2, 3 (`t` throws), 4, 11, 12 |
| 8 Testing | 2, 3, 12, 13 |
| 9 Removals | 1, 5 |
| 10 Launch | README (13) |
