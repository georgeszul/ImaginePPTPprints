# Imagine PPTP Prints: Site Rebuild Design

**Date:** 2026-10-08
**Branch:** `rebuild-astro` (old site preserved at tag `legacy-php-site`)
**Status:** Approved in conversation, pending written-spec review

## 1. Goal

Rebuild the Imagine PPTP Prints website (custom printing shop, 840 N State St, Elgin, IL) so it:

- Turns visitors into quote requests (call, WhatsApp, quote form).
- Looks modern and on-brand, built from the penguin logo.
- Loads fast on phones.
- Serves English and Spanish speakers equally.
- Keeps all existing business information. Where old and new pages contradict each other, the owner's decisions in section 3 apply.

Success criteria:

- Every fact in the content inventory (section 4) appears on the new site, in both languages.
- Lighthouse on a phone profile: performance ≥ 90, accessibility ≥ 95, for Home and Services, in both themes.
- Quote form submissions (with files up to 8 MB) arrive by email at `imaginepttp@gmail.com`.
- Nothing on the site is invented: no fake reviews, stats, or claims.

## 2. Decisions

| Topic | Decision |
|---|---|
| Hosting | Not live yet. Static hosting on Netlify (free tier), auto-deploy from GitHub. |
| Stack | Astro static site. No PHP, no database. |
| Business name | "Imagine PPTP Prints" (logo artwork unchanged). |
| Visual direction | "Penguin pop": logo colors, friendly, rounded. |
| Dark mode | Yes, with a header toggle. Defaults to the OS setting and remembers the choice. |
| Language | Full English and Spanish versions with a header EN/ES switch. |
| Turnaround, minimums, hours | Newer facts: standard 24-48 hrs, same-day rush, large orders 2-3 days, no minimums, reachable any time. |
| Testimonials and stats | Removed (not real). Replaced with true facts and a link to the real Facebook reviews. |
| Mugs and drinkware | Not offered. Left out. |
| Price calculator | Keep current numbers. Fix the bug in section 6.3. |
| AI chat widget | Removed: keyword bot with answers that contradicted the site. Replaced by a floating call and WhatsApp button. |

## 3. Resolved content conflicts

| Item | Old/conflicting versions | Use |
|---|---|---|
| Standard turnaround | "24-48 hrs" (home, chat); "3-5 business days" (contact); "3-7 business days" (services) | 24-48 hours from artwork approval |
| Rush | "Same day" (home, calculator); "1-2 business days" (contact) | Same day available (+30% in calculator) |
| Large orders | "2-3 days" (chat); "5-7 business days" (contact) | 2-3 days |
| Minimums | "No minimums" (home, chat, calculator); "Shirts 12, Hoodies 6, Hats 12, Cards 100" (old contact FAQ) | No minimums. Business cards are printed in batches of 100 (calculator rule). |
| Hours | "Always open" (about, contact); "Mon-Fri 9-6, Sat 10-4, Sun by appointment" (chat) | Always open: call or text any time |
| Delivery step | "Delivered in 3-7 business days" (services step 4) | Ready in 24-48 hours, rush available |
| Contact details | README placeholders `info@imaginepptp.com`, `(555) 123-4567`, `123 Print Street` | Real values in section 4.1 only |
| Reviews | Two sets of invented testimonials; "Not yet rated (4 Reviews)" | Link: "See our reviews on Facebook" |
| Stats | 500 customers, 5,000 products, 10 years, 24 hr | Removed |

## 4. Content inventory (must survive)

Wording comes from the legacy pages at tag `legacy-php-site` (`*.php`) and from `backup_html_files/*.html` (older pages, partly gitignored, still on disk). Section 3 overrides both. Text may be tightened for clarity, but no fact is dropped unless it is listed in section 3 or 9.

### 4.1 Business facts (single source: `src/data/site.ts`)

- Name: Imagine PPTP Prints. Tagline: Professional Printing Solutions.
- Phone: (331) 255-5330 (`tel:+13312555330`). WhatsApp: `https://wa.me/13312555330`.
- Email: `imaginepttp@gmail.com`.
- Address: 840 N State St, Northeast Elgin, IL 60123, United States.
- Facebook: `https://www.facebook.com/profile.php?id=61558797091752`
- TikTok: `https://www.tiktok.com/t/ZP8kGeyLB/`
- Shopify store: `https://68da1e-18.myshopify.com/` ("Shop 24/7")
- Promo: first-time customers get 10% off with code `FIRST10`.
- Spanish spoken ("¡Hablamos español!").
- 100% satisfaction guarantee: remake or refund if the customer is unhappy with quality.
- Free design help at no extra charge.
- Delivery: contactless delivery, local pickup in Elgin, nationwide shipping.
- Payment methods: cash, credit cards, PayPal, Venmo, Zelle. Payment before production; payment plans for large orders. **Owner to verify before launch** (old pages only).

### 4.2 Services (each with all bullets from `services.php`)

1. Custom Shirts: crew neck, v-neck, long sleeve; screen printing, embroidery, heat transfer; business logo, team, event shirts.
2. Custom Hoodies: pullover and zip-up; team, company, event; various colors and sizes.
3. Custom Hats: baseball caps, trucker hats, beanies; embroidery and screen printing.
4. Custom Banners and Large Format: weather-resistant vinyl, indoor fabric, up to 10 ft wide, installation, custom sizes, fast event turnaround.
5. Business Cards: premium stock, custom sizes and shapes, matte, glossy, semi-gloss, full color, foil stamping and embossing (from about page).
6. Stickers and Decals: custom vinyl for branding, vehicles, promotions.
7. Design to Print (process, shown with the services grid): send your design, we handle the rest.

### 4.3 Process

- Home, 3 steps: Send your design (all file formats accepted) → Choose your products → Fast delivery (24-48 hrs, rush available).
- Services, 4 steps: Submit design → Choose products → We print and quality check → Fast delivery.

### 4.4 Materials and size charts (from old services page; **owner to verify**)

- Materials: Premium Cotton (100% cotton, 180 GSM); Cotton Blend (50/50 cotton-polyester); Performance Fabric (moisture wicking); Heavyweight (300 GSM fleece).
- Shirts and hoodies (inches): XS 32-34 / 26 / 14; S 34-36 / 27 / 15; M 38-40 / 28 / 16; L 42-44 / 29 / 17; XL 46-48 / 30 / 18; 2XL 50-52 / 31 / 19 (chest / length / shoulder).
- Hats: S/M 21-22 in (6 7/8-7); M/L 22-23 (7-7 1/4); L/XL 23-24 (7 1/4-7 5/8); XL/XXL 24-25 (7 5/8-8).
- Old FAQ said "XS to 5XL for most products". The chart stops at 2XL. **Owner to confirm** which is right.

### 4.5 FAQ (one list, shown on Home and Contact)

1. How fast can you deliver? 24-48 hrs from approval; same-day rush.
2. Do you have minimum orders? No. 1 or 1,000.
3. Can you help with design? Yes, free.
4. What's your pricing? Depends on product, quantity, complexity; free quote; "we'll beat any competitor's price"; link to the calculator.
5. What file formats do you accept? PNG, JPG, PDF, AI, EPS, PSD, SVG. Vector or 300 DPI recommended. No design? We'll make one.
6. Do you offer guarantees? 100% satisfaction: remake or refund.
7. Can I see a proof before printing? Yes, a digital proof for approval.
8. Do you ship nationwide? Yes, plus local pickup in Elgin and contactless local delivery.
9. What payment methods do you accept? (section 4.1, pending verification)
10. ¿Hablan español? ¡Sí! (bilingual answer kept in both locales)

### 4.6 Quote form fields (restored from `backup_html_files/contact.html`)

Name*, email*, phone, preferred contact method (phone, email, text, WhatsApp), service* (shirts, hoodies, hats, banners, business cards, stickers, other).

Per service:

- Shirts: type (T-shirt, polo, long sleeve, tank top), sizes ("S:10, M:15"), quantity, design colors.
- Hoodies: type (pullover, zip-up, sweatshirt), sizes, quantity, colors.
- Hats: type (baseball cap, snapback, beanie, trucker), quantity, colors.
- Banners: size ("3ft x 6ft"), material (vinyl, fabric, mesh).
- Business cards: size (standard 3.5×2, square 2.5×2.5, mini 3×1.75), finish (matte, glossy, semi-gloss), quantity.
- Stickers and other: quantity, colors.

All services: needed-by date, design files, reference images, project details* (10+ characters), "I prefer to communicate in Spanish" checkbox.

### 4.7 Photos

All real product photos in `images/` (shirts, hoodies, business cards, banner, stickers). Rules:

- `images/tshirts/` duplicates other folders. Use one copy per file.
- `facebook_image_*.jpg` (6-11 KB thumbnails) are too low quality. Exclude them.
- Folder names are only a hint. During the build, view each photo to confirm its category and write real alt text. Example: `539634838…` sits in both `shirts/` and `hoodies/`.
- The legacy home page references `images/business cards/539586768…`, which doesn't exist. The real file is in `shirts/`.
- There are no hat photos, so there is no "Hats" filter until photos are added.

## 5. Pages

Routes: English at `/`, `/services/`, `/portfolio/`, `/about/`, `/contact/`, `/thanks/`; Spanish at `/es/`, `/es/servicios/`, `/es/portafolio/`, `/es/nosotros/`, `/es/contacto/`, `/es/gracias/`. Plus a 404 page in both languages.

- **Header (all pages):** logo and name, nav, EN/ES switch (links to the same page in the other locale), theme toggle, "Get quote" button. Collapses to a menu button on phones.
- **Floating contact (all pages):** call and WhatsApp buttons. On phones, a bottom bar: Call · WhatsApp · Quote.
- **Footer:** name, tagline, quick links, contact info, social links, © year.
- **Home:** hero ("Transform Your Brand with Custom Printed Apparel"; 24-48 hr · 100% satisfaction · ¡Hablamos español!; call, WhatsApp, Get free quote) → services grid (4.2) → how it works (3 steps) → featured-work marquee (2 rows, real photos, pauses on hover and focus, static when `prefers-reduced-motion`) → why us (true facts: 24-48 hr, same-day rush, no minimums, free design help, Spanish spoken) → Facebook reviews link → FAQ → CTA with FIRST10.
- **Services:** intro → 6 service sections, each with photo and full bullets → price calculator → 4-step process → materials and size charts → CTA.
- **Portfolio:** filter buttons (All plus categories that have photos) → responsive grid → click opens a full-size view in a native `<dialog>` (Esc closes it, focus returns to the photo). The filter works without JS: all photos show.
- **About:** story (2 paragraphs) → what we do → service cards → contact cards (address with "Get directions" link to Google Maps, phone, email, Shopify, TikTok, Facebook) → hours and delivery → CTA.
- **Contact:** intro ("Send us your design, we'll make the rest") → quote form (4.6) beside info panels (address, phone, email, hours; delivery and pickup; turnaround; follow us) → FAQ.
- **Thanks:** confirmation in the page's language, with phone and WhatsApp for anything urgent.

## 6. Architecture

### 6.1 Project layout

```
astro.config.mjs        site URL, i18n (defaultLocale en, locales en/es, prefixDefaultLocale false), sitemap
netlify.toml            build command and publish dir
src/
  data/site.ts          business facts (4.1), language-neutral
  data/photos.ts        [{ file, category, alt: { en, es }, featured? }]
  i18n/en.json          all English UI and page text
  i18n/es.json          all Spanish text, same keys
  i18n/t.ts             t(lang, key) lookup and localized path helper
  lib/calc.js           pure estimate() function (6.3)
  lib/calc.test.js      node:test checks
  lib/i18n.test.js      en/es key-parity check
  assets/logo.jpg       optimized at build
  assets/photos/…       product photos, optimized at build
  layouts/Base.astro    <head> (meta, hreflang, JSON-LD, theme script), header, footer, floating contact
  components/           Faq, Cta, Marquee, Gallery, PriceCalculator, QuoteForm, ThemeToggle, LangSwitch
  views/                Home, Services, Portfolio, About, Contact, Thanks, NotFound (prop: lang)
  pages/                index.astro, services.astro, …; es/index.astro, es/servicios.astro, …; 404.astro
  styles/global.css     tokens (light and dark), base, layout utilities
public/favicon.svg
```

Route files are one line each (`<Home lang="es" />`). Views hold the page markup once for both languages.

Dependencies: `astro`, `@astrojs/sitemap`, `@fontsource/fredoka`, `@fontsource/nunito`. Nothing else.

### 6.2 Theming

- Tokens in `global.css` on `:root[data-theme="light"]` and `:root[data-theme="dark"]`.
- Light: white and pale-cyan surfaces, ink `#111`, brand cyan `#22c3e6` and blue `#2a7bc8` (from the logo gradient), button yellow `#ffd60a` with ink text, orange `#ff8a00` for small highlights only.
- Dark: near-black surfaces (`#0f1419` / `#18202a`), light ink, the same cyan, the same yellow buttons with ink text.
- All text and background pairs must meet WCAG AA in both themes. Check with Lighthouse and spot-check with a contrast tool.
- Inline script in `<head>`, run before paint: read `localStorage.theme` inside try/catch. Otherwise use `matchMedia('(prefers-color-scheme: dark)')`. Set `data-theme`.
- The toggle button (`aria-pressed`, labelled in both languages) flips the theme and saves the choice.
- Shape language: thick ink outlines (2px), pill buttons, 16-20px card radius, bubbly Fredoka headings, Nunito body text.

### 6.3 Price calculator

Port `js/price-calculator.js` into `lib/calc.js` as a pure `estimate({ product, quantity, method, colors, turnaround })` that returns `{ base, print, color, turnaroundCost, total, unit, volumeDiscount, effectiveQty }`. Keep every number:

- Base: tee 8.00, hoodie 22.00, hat 12.00, banner 3.50/sq ft × 6 sq ft assumed, business card 0.25 each, sticker 1.50.
- Print method per item: screen 2.50, DTG 4.00, embroidery 6.00, heat 3.00, vinyl 5.00.
- Colors per item: 1 → 0, 2 → 1.00, 3 → 2.00, 4+ → 3.50.
- Volume discount: 25+ → 5%, 50+ → 10%, 100+ → 15%.
- Turnaround: standard ×1.0, rush ×1.3, extended ×0.9.

**Bug fixes (owner approved):**

1. Print-method and color charges apply only to tee, hoodie and hat. For banner, business card and sticker they are 0. The calculator hides those two fields for those products.
2. Business cards: effective quantity is `max(quantity, 100)`, used for every line including unit price. The UI notes "printed in batches of 100".

Input guard: quantity is clamped to 1-10,000; non-numbers become 1. Every displayed amount is rounded to cents. The FIRST10 note and the "Estimate only" disclaimer stay.

Expected values (test cases):

| Input | Total | Unit |
|---|---|---|
| 10 tees, screen, 1 color, standard | 105.00 | 10.50 |
| 10 tees, screen, 1 color, rush | 136.50 | 13.65 |
| 50 hoodies, DTG, 2 colors, standard | 1215.00 | 24.30 |
| 100 business cards, standard (method/colors ignored) | 21.25 | 0.21 |
| 10 business cards → effective 100 | 21.25 | 0.21 |
| 1 banner, standard | 21.00 | 21.00 |
| 10 stickers, standard | 15.00 | 1.50 |
| 25 tees, screen, 1 color, extended | 224.44 | 8.98 |

### 6.4 Quote form

- Netlify Forms: `data-netlify="true"`, `netlify-honeypot="bot-field"`, `enctype="multipart/form-data"`, `action` set to the locale's thanks page. Form name `quote`, with a hidden `lang` field.
- Per-service field groups are `<fieldset>`s. JS shows only the selected one. Without JS, all of them show. Hidden fieldsets are `disabled` so they don't submit.
- Validation: native `required`/`type`/`minlength`, plus a JS check that rejects files over 8 MB total, with a localized message: "too large: send it on WhatsApp or by email."
- Netlify posts submissions. The owner turns on email notifications to `imaginepttp@gmail.com` in the Netlify UI.
- Netlify's free-plan form limits changed in 2025. Verify them at deploy time. If they're too tight, switch to Formspree. Only the `action` and attributes change.

### 6.5 Images

- `<Picture>` from `astro:assets`: AVIF and WebP, widths 400/800/1200, `loading="lazy"` except the hero.
- The logo is rendered at its display size.
- No video background.

### 6.6 SEO and metadata

- Title and description per page per locale.
- `<link rel="alternate" hreflang>` for en, es and x-default. Canonical URLs.
- `LocalBusiness` JSON-LD with name, address, phone, URL, `sameAs` (Facebook, TikTok, Shopify).
- Sitemap via `@astrojs/sitemap`. Open Graph tags using the logo.

### 6.7 Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus rings, labelled controls, real alt text in both languages, `prefers-reduced-motion` honored (marquee stops, no smooth-scroll jumps), and 44px touch targets.

## 7. Error handling

- **Form:** native validation first; file size check; honeypot; if JS submission fails, show a message with the phone number and WhatsApp link.
- **Theme and language storage:** all `localStorage` access in try/catch. On failure, fall back to the OS theme and the URL's language.
- **Calculator:** clamped inputs, no NaN reaching the screen.
- **Missing translation:** `t()` throws at build time, so a missing Spanish key fails the build instead of shipping a blank.
- **404:** localized page with links home and to contact.

## 8. Testing

- `node --test src/lib/` runs `calc.test.js` (the cases in 6.3) and `i18n.test.js` (identical key sets in en and es).
- `npx astro check` and `npx astro build` pass with zero errors.
- **Browser pass** (Playwright CLI against `astro preview`): screenshots at 375px and 1280px, light and dark, EN and ES, for every page. Check the theme toggle, language switch, portfolio filter and dialog, calculator updates, form field switching, and the oversized-file message.
- **Lighthouse** (phone): Home and Services, both themes. Performance ≥ 90, accessibility ≥ 95.
- **Review:** `ecc:code-reviewer` and `ecc:a11y-architect` review before the work is called done.

## 9. Removed from the old site

PHP pages, includes, `api/`, `config/`, `database/`, `install.php`, `test-db.php`, the `*.bat`/`*.ps1`/`*.py` helper scripts, the service worker and clear-site-data pages, all `assets/css/*` fix layers, `css/main.css`, all `js/*`, jQuery, reCAPTCHA (test key), the 51 MB background video, the snow and paint-splat effects, header search, the AI chat widget, the invented testimonials and stats, the README placeholders, and the stray files `tash pop` and `tart contact.html`.

All of it remains in git at tag `legacy-php-site`. `backup_html_files/` stays on disk (gitignored) until launch is confirmed.

## 10. Launch (owner steps)

1. Review the Spanish copy with a native speaker. Verify payment methods, size range and materials (sections 4.1 and 4.4).
2. Push `rebuild-astro` and merge it to `main` (Claude pushes only when asked).
3. Netlify: sign in, "Import from Git", choose `georgeszul/ImaginePPTPprints`. Build `npm run build`, publish `dist`.
4. Netlify → Forms → enable form detection and add an email notification to `imaginepttp@gmail.com`.
5. Optional: a custom domain.

## 11. Out of scope

Online checkout (Shopify covers it), blog, CMS, analytics, embedded reviews feed, mugs. Each can be added later without restructuring.
