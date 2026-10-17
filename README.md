# Imagine PPTP Prints website

Static site for Imagine PPTP Prints (Elgin, IL), built with Astro. English at `/`, Spanish at `/es/`, with light and dark themes.

## Run it

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # price calculator + translation checks
npm run build        # outputs dist/
npm run check:links  # every internal link in dist/ resolves
npm run check:seo    # one H1, titles, descriptions, canonicals, alt text, schema, CSP on every page
npm run qa           # browser checks at 1280/375/320 px, light and dark (needs `npm run preview` running)
```

## Edit content

- Phone, email, address, social links, promo code: `src/data/site.ts`
- Page text: `src/i18n/en/*.json` and `src/i18n/es/*.json`. Both languages must have the same keys; `npm test` fails if they drift.
- Photos: put the file (JPG, PNG, or WebP) in `src/assets/photos/<category>/`, then add an entry to `src/data/photos.ts`. The build fails if a photo isn't listed.
- Calculator prices: `src/lib/calc.js` (update `src/lib/calc.test.js` to match).

## Deploy

Netlify builds every push to `main` (see `netlify.toml`). The quote form uses Netlify Forms (form name `quote`). Turn on email notifications under Netlify → Forms → Form notifications.

## Before launch

- Native speaker review of the Spanish text.
- Read the three legal pages (`src/i18n/{en,es}/privacy.json`, `terms.json`, `refunds.json`) and confirm they match how the shop really works. They are plain-language drafts, not legal advice; have a lawyer look before relying on them. These points were written as sensible defaults and need the owner's OK:
  - Refunds: full refund if cancelled before proof approval; after printing starts, only the unprinted part; no refund for items that match an approved proof.
  - Shipping costs are added to the quote; turnaround times are usual times, not guarantees.
  - The shop can decline artwork that copies someone else's trademark or copyrighted work.
  - Data deletion requests are answered within 30 days. Illinois law governs the terms.
- Confirm business claims the site still makes but nobody has verified: "always open, every day" (also sent to Google as open 24 hours), payment plans for large orders, large format up to 10 ft wide, banner installation, foil stamping and embossing, material specs (180 GSM cotton, 300 GSM fleece), size range (chart stops at 2XL; an old FAQ said 5XL). The old "we'll beat any competitor's price" promise was removed.
- Data deletion: when a customer asks, delete their submission in Netlify (Forms → quote → submissions) and their emails and files in Gmail.
- Customer photos: make sure customers are fine with their orders (and logos) appearing in the portfolio. The terms promise to take a photo down on request.
- Reviews: add 2-3 real Facebook review quotes with the customer's name and permission. Never write them yourself.
- Cookie banner: not needed while the site sets no cookies and loads no analytics scripts, ads or pixels (checked October 2026). Netlify Analytics (below) counts visits on the server and sets no cookies. Add a consent banner before adding any tracking script.
- Analytics: turn on Netlify Analytics (Netlify → your site → Analytics). It reads server logs: no code change, no cookies, no banner. It is a paid add-on; check the current price.
- HTTPS: add the real domain in Netlify (Domain management). Netlify issues the certificate and redirects http:// to https:// on its own; `netlify.toml` adds HSTS and the other security headers. After the domain works, test it at https://securityheaders.com.
- Form alerts and spam: under Netlify → Forms, turn on email notifications to the shop inbox and keep spam filtering on. The form also has a hidden honeypot field.
- Backups: the code lives in git on GitHub, and Netlify keeps every deploy (Deploys → pick one → "Publish deploy" rolls back). There is no database. Export form submissions (Forms → quote → Download CSV) once a month if you want a copy outside Netlify.
- Search: verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://<domain>/sitemap.xml`. Create or claim the Google Business Profile with the same name, address and phone as the site. More in `docs/marketing/backlink-strategy.md`.
- Sharper sticker photos: the six sticker photos and the shooting-range tent banner are only 206 px wide, so the site shows them small. Larger originals would let them appear bigger.
- About page: add 2–3 real facts (who runs the shop, since when, what "PPTP" or the penguin stands for). The site does not invent them.
- Font and icon licenses are listed in `CREDITS.md`.
- Add hoodie and hat photos (`src/assets/photos/hoodies/`, `src/assets/photos/hats/`). Until then those services show a "Your design here" panel and the portfolio has no Hoodies or Hats filter.
- Set the real domain in `astro.config.mjs` (`site`).
- Check Netlify's current free-plan form limits; switch to Formspree if needed.

The previous PHP site is preserved at git tag `legacy-php-site`.
